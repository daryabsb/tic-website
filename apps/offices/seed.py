"""The office rows of ``seed/offices.yaml`` as pages (``seed_site`` and ``add_office``).

The seed fills blanks only and never overwrites an editor's text (D15). Placeholders in
square brackets stay as they are (P-17).
"""

from __future__ import annotations

from pathlib import Path

import yaml
from django.conf import settings

from apps.offices.models import OfficePage

FIELDS = (
    "city",
    "country",
    "legal_entity",
    "address",
    "phone",
    "wechat_id",
    "email",
    "timezone",
    "languages",
)


def office_rows() -> dict:
    path = Path(settings.BASE_DIR) / "seed" / "offices.yaml"
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return {row["slug"]: row for row in data.get("offices", [])}


def title_for(row: dict) -> str:
    return f"{row['city']} head office" if row.get("is_head_office") else f"{row['city']} office"


def values(row: dict) -> dict:
    out = {name: row[name] for name in FIELDS if row.get(name)}
    out["is_head_office"] = bool(row.get("is_head_office"))
    return out


def create_office(index, row: dict) -> OfficePage:
    page = OfficePage(title=title_for(row), slug=row["slug"], live=True, **values(row))
    index.add_child(instance=page)
    page.save_revision().publish()
    return OfficePage.objects.get(pk=page.pk)


def fill_office(page: OfficePage, row: dict) -> bool:
    """Blank fields, and fields that still hold a bracketed placeholder, from the row
    (an editor's own text has no brackets and is never overwritten). True when
    something changed (then publish)."""
    changed = False
    for name, value in values(row).items():
        if name == "is_head_office":
            continue
        current = getattr(page, name)
        if value and value != current and (not current or "[" in str(current)):
            setattr(page, name, value)
            changed = True
    if changed:
        page.save_revision().publish()
    return changed
