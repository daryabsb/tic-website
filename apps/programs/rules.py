"""The publish rule of a program page (master plan 03 and 05: "all twelve + review_by").

``program_page_problems`` returns the reasons a page may not be published, in the
editor's words; an empty list means it may. The admin form calls it on publish and on
submit for review, never on "save draft" (D26).

The status word is the regulator's own word (appointed, registered, designation in
progress). "Accredited" is refused in the intro, the summary and part 01: a regulator
appoints or registers TIC; only an accreditation body accredits (proposal 01 §5.5).
"""

from __future__ import annotations

import re

from django.utils.translation import gettext as _
from django.utils.translation import gettext_lazy as _l

from apps.programs.blocks import PART_NAMES
from apps.services.rules import _lines, _rows, _text

ACCREDITED = re.compile(r"\baccredit", re.IGNORECASE)


def _routes(value) -> list:
    return [
        q
        for q in value.get("questions") or []
        if _text(q.get("question")) and _rows(q.get("answers"), "answer")
    ]


def _fees(value) -> bool:
    mode = value.get("mode")
    if mode == "table":
        return bool(_rows(value.get("rows"), "item", "fee"))
    if mode == "download":
        return value.get("document") is not None
    return mode == "on_request"


PART_CHECKS = {
    "appointment": [
        (
            lambda v: _text(v.get("text")),
            _l("01 The regulator and our appointment: write the text."),
        ),
    ],
    "who_must_comply": [
        (
            lambda v: _rows(v.get("products"), "group"),
            _l("02 Who must comply: add at least one product group."),
        ),
        (
            lambda v: v.get("product_list_date"),
            _l("02 Who must comply: set the date of the product list shown."),
        ),
    ],
    "routes": [
        (lambda v: _routes(v), _l("03 Routes: add at least one question with its answers.")),
    ],
    "steps": [
        (
            lambda v: _rows(v.get("steps"), "title", "text"),
            _l("04 Step by step: add at least one step with a title and a text."),
        ),
    ],
    "checklist": [
        (lambda v: _lines(v.get("items")), _l("05 Document checklist: add at least one document.")),
        (lambda v: _text(v.get("schema")), _l("05 Document checklist: name the request form.")),
    ],
    "labelling": [
        (
            lambda v: _lines(v.get("items")),
            _l("06 Testing, inspection and labelling: add at least one point."),
        ),
    ],
    "fees": [
        (
            _fees,
            _l(
                "07 Fees: choose how fees are shown, then fill the table or choose the "
                "fee structure document."
            ),
        ),
    ],
    "qa": [
        (
            lambda v: _rows(v.get("questions"), "question", "answer"),
            _l("08 Questions and answers: add at least one question with its answer."),
        ),
    ],
    "contacts": [
        (
            lambda v: [
                row
                for row in v.get("offices") or []
                if (row.get("office") or _text(row.get("office_name"))) and _text(row.get("role"))
            ],
            _l("10 Contacts: add at least one office with its role."),
        ),
    ],
    "reviewed": [
        (lambda v: _text(v.get("disclaimer")), _l("12 Last reviewed: write the disclaimer.")),
    ],
}


def _part_problems(name: str, value) -> list[str]:
    return [str(message) for check, message in PART_CHECKS.get(name, []) if not check(value)]


def program_page_problems(
    *,
    intro: str,
    summary: str = "",
    parts,
    regulator_name: str,
    regulator_abbreviation: str,
    appointment_status: str,
    owning_office,
    reviewed,
    review_by,
) -> list[str]:
    problems = []
    if not _text(intro):
        problems.append(_("Intro: write the one sentence under the title."))
    if not (_text(regulator_name) and _text(regulator_abbreviation)):
        problems.append(_("Regulator: give its name and its abbreviation."))
    if not appointment_status:
        problems.append(_("Appointment: choose the regulator's status word."))
    if owning_office is None:
        problems.append(_("Owning office: choose the office that owns this page."))
    if reviewed is None:
        problems.append(_("Last reviewed: set the date."))
    if review_by is None:
        problems.append(_("Review by: set the date this page is checked again."))

    present = [block.block_type for block in parts or []]
    missing = [name for name in PART_NAMES if name not in present]
    if missing:
        numbers = ", ".join(
            str(n + 1).zfill(2) for n, name in enumerate(PART_NAMES) if name in missing
        )
        problems.append(_("Add the missing parts: %(parts)s.") % {"parts": numbers})
    elif present != PART_NAMES:
        problems.append(_("Put the parts in their fixed order, 01 to 12."))

    texts = [intro, summary]
    for block in parts or []:
        problems.extend(_part_problems(block.block_type, block.value))
        if block.block_type == "appointment":
            texts += [block.value.get("heading"), block.value.get("text")]
    if any(ACCREDITED.search(_text(text)) for text in texts):
        problems.append(
            _(
                "Appointment: a regulator appoints or registers TIC. Use the regulator's "
                "own word, not 'accredited'."
            )
        )
    return problems
