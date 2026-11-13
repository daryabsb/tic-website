"""Load certificates from a CSV export (master plan 06 "Data", V1 loader).

Columns: ``number,type,status,issue_date,expiry_date,issuing_office,qr_token`` (the last
is optional; a new row gets a random one). Dates are ``YYYY-MM-DD``. The load is
idempotent on the number: a row that is already there is updated only where a value
changed. With ``full=True`` the file is the whole register, so a stored certificate
missing from it is marked "withdrawn". A rejected row never stops the others.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass, field
from datetime import date

from django.db import transaction
from django.utils import timezone

from apps.verify.lookup import NUMBER_SHAPE, normalise
from apps.verify.models import STATUSES, TOKEN_LENGTH, Certificate, ImportLog

REQUIRED = ("number", "type", "status", "issue_date", "issuing_office")
FIELDS = ("number", "type", "status", "issue_date", "expiry_date", "issuing_office")
STATUS_KEYS = {key for key, _label in STATUSES}


@dataclass
class Report:
    created: int = 0
    updated: int = 0
    unchanged: int = 0
    withdrawn: int = 0
    rejects: list[str] = field(default_factory=list)

    def lines(self) -> list[str]:
        out = [
            f"created {self.created}, updated {self.updated}, unchanged {self.unchanged}, "
            f"withdrawn {self.withdrawn}, rejected {len(self.rejects)}"
        ]
        out += [f"  rejected: {reject}" for reject in self.rejects]
        return out


def _date(value: str, name: str, required: bool) -> date | None:
    value = (value or "").strip()
    if not value:
        if required:
            raise ValueError(f"{name} is empty")
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        raise ValueError(f"{name} {value!r} is not YYYY-MM-DD") from None


def clean_row(row: dict) -> dict:
    """The row as model values, or ValueError with the reason."""
    missing = [name for name in REQUIRED if not (row.get(name) or "").strip()]
    if missing:
        raise ValueError(f"missing {', '.join(missing)}")
    number = " ".join(row["number"].split())
    if not NUMBER_SHAPE.match(normalise(number)) or len(number) > 40:
        raise ValueError(f"number {number!r} has characters other than A-Z, 0-9, - / .")
    status = row["status"].strip().lower()
    if status not in STATUS_KEYS:
        raise ValueError(f"status {status!r} is not one of {', '.join(sorted(STATUS_KEYS))}")
    values = {
        "number": number,
        "type": row["type"].strip()[:120],
        "status": status,
        "issue_date": _date(row.get("issue_date"), "issue_date", True),
        "expiry_date": _date(row.get("expiry_date"), "expiry_date", False),
        "issuing_office": row["issuing_office"].strip().lower(),
    }
    token = (row.get("qr_token") or "").strip()
    if token:
        if len(token) != TOKEN_LENGTH or not token.isalnum():
            raise ValueError("qr_token must be 16 letters and digits")
        values["qr_token"] = token
    return values


@transaction.atomic
def import_rows(rows, *, full: bool = False, operator: str = "", file_name: str = "") -> Report:
    report = Report()
    seen = set()
    for line, row in enumerate(rows, start=2):  # line 1 is the header
        try:
            values = clean_row(row)
        except ValueError as exc:
            report.rejects.append(f"line {line}: {exc}")
            continue
        key = normalise(values["number"])
        if key in seen:
            report.rejects.append(f"line {line}: number {values['number']} appears twice")
            continue
        seen.add(key)
        certificate = Certificate.objects.filter(number_key=key).first()
        if certificate is None:
            Certificate(**values, source="csv").save()
            report.created += 1
            continue
        changed = [name for name in (*FIELDS, "qr_token") if name in values]
        changed = [name for name in changed if getattr(certificate, name) != values[name]]
        if not changed:
            report.unchanged += 1
            continue
        for name in changed:
            setattr(certificate, name, values[name])
        certificate.imported_at = timezone.now()
        certificate.save()
        report.updated += 1
    if full:
        gone = Certificate.objects.exclude(number_key__in=seen).exclude(status="withdrawn")
        report.withdrawn = gone.update(status="withdrawn", imported_at=timezone.now())
    ImportLog.objects.create(
        operator=operator[:80],
        file_name=file_name[:200],
        full=full,
        created=report.created,
        updated=report.updated,
        unchanged=report.unchanged,
        withdrawn=report.withdrawn,
        rejected=len(report.rejects),
    )
    return report


def import_file(path, **kwargs) -> Report:
    with open(path, newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        header = [name.strip() for name in reader.fieldnames or []]
        missing = [name for name in REQUIRED if name not in header]
        if missing:
            raise ValueError(f"the header has no {', '.join(missing)} column")
        reader.fieldnames = header
        return import_rows(reader, **kwargs)
