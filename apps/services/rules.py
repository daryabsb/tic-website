"""The publish rule of a service page (master plan 03: "all eleven; partner_lab for
testing").

``service_page_problems`` returns the reasons a page may not be published, in the
editor's words; an empty list means it may. The admin form calls it on publish and on
submit for review, never on "save draft" (D26).
"""

from __future__ import annotations

from django.utils.html import strip_tags
from django.utils.translation import gettext as _
from django.utils.translation import gettext_lazy as _l

from apps.services.blocks import PART_NAMES


def _text(value) -> str:
    """Plain text of a CharBlock, TextBlock or RichText value."""
    if value is None:
        return ""
    source = getattr(value, "source", value)
    return strip_tags(str(source)).strip()


def _rows(rows, *fields) -> list:
    """Rows of a ListBlock that have every one of ``fields`` filled."""
    return [row for row in rows or [] if all(_text(row.get(f)) for f in fields)]


def _lines(items) -> list:
    return [item for item in items or [] if _text(item)]


# Per part: (the test a filled part passes, the message when it fails).
PART_CHECKS = {
    "what_it_is": [
        (
            lambda v: _text(v.get("heading")) and _text(v.get("text")),
            _l("What it is: write a heading and the text."),
        )
    ],
    "who_needs_it": [
        (lambda v: _lines(v.get("items")), _l("Who needs it: add at least one case."))
    ],
    "how_it_works": [
        (
            lambda v: _rows(v.get("steps"), "title", "text"),
            _l("How it works: add at least one step with a title and a text."),
        )
    ],
    "documents": [
        (lambda v: _lines(v.get("items")), _l("What you give us: add at least one document."))
    ],
    "what_you_get": [
        (
            lambda v: _lines(v.get("items")),
            _l("What you get: say what the report or certificate contains."),
        )
    ],
    "standards": [
        (
            lambda v: _rows(v.get("standards"), "number"),
            _l("Standards we work to: add at least one standard by number."),
        )
    ],
    "where": [
        (
            lambda v: _text(v.get("text")) or list(v.get("offices") or []),
            _l("Where we do it: name the offices or write where."),
        )
    ],
    "related": [
        (
            lambda v: [page for page in v.get("pages") or [] if page],
            _l("Related services: choose at least one page."),
        )
    ],
    "qa": [
        (
            lambda v: _rows(v.get("questions"), "question", "answer"),
            _l("Questions and answers: add at least one question with its answer."),
        )
    ],
    "contact": [
        (lambda v: v.get("person"), _l("Contact: choose the named contact.")),
        (lambda v: _text(v.get("schema")), _l("Contact: name the request form.")),
    ],
    "reviewed": [
        (
            lambda v: v.get("date") and v.get("office"),
            _l("Last reviewed: set the date and the owning office."),
        )
    ],
}


def _part_problems(name: str, value) -> list[str]:
    return [str(message) for check, message in PART_CHECKS.get(name, []) if not check(value)]


def service_page_problems(*, intro: str, parts, group: str | None, partner_lab) -> list[str]:
    problems = []
    if not _text(intro):
        problems.append(_("Intro: write the one sentence under the title."))

    present = [block.block_type for block in parts or []]
    missing = [name for name in PART_NAMES if name not in present]
    if missing:
        titles = ", ".join(
            str(n + 1).zfill(2) for n, name in enumerate(PART_NAMES) if name in missing
        )
        problems.append(_("Add the missing parts: %(parts)s.") % {"parts": titles})
    elif present != PART_NAMES:
        problems.append(_("Put the parts in their fixed order, 01 to 11."))

    for block in parts or []:
        problems.extend(_part_problems(block.block_type, block.value))

    if group == "testing" and partner_lab is None:
        problems.append(
            _("Testing pages name the partner laboratory: choose it under 'Partner laboratory'.")
        )
    return problems
