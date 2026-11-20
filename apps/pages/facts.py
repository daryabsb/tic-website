"""The facts bar (Round 3, rules board parts 3 and 7; T39, D77).

Four fixed cells under the head of a service, industry, program, office, About and
contact page. The cells are data, not copy: each page type builds its own list from its
fields and its linked pages (``facts`` on the page). A field cell without a value keeps
its bracket until its owner fills it. A counted cell with nothing to count is left out,
so the bar has three cells (``.fb.c3``).

Template: ``includes/facts_bar.html`` with ``facts``.
"""

from dataclasses import dataclass

from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel


@dataclass(frozen=True)
class Fact:
    label: str
    value: str
    note: str = ""


def fact_cell(label, value, placeholder, note="") -> Fact:
    """A field cell: the value, else the bracketed placeholder (nothing invented)."""
    value = (value or "").strip()
    return Fact(str(label), value or f"[{placeholder}]", (note or "").strip())


def value_field(verbose_name):
    return models.CharField(
        verbose_name, max_length=60, blank=True, help_text=_("Short. Blank shows a bracket.")
    )


def note_field(verbose_name):
    return models.CharField(verbose_name, max_length=120, blank=True)


def facts_panel(*names: str):
    return MultiFieldPanel(
        [FieldPanel(name) for name in names],
        heading=_("Facts bar"),
        help_text=_("The cells under the head. A blank value shows a bracket on the page."),
    )
