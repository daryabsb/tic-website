"""Careers (master plan 03; proposal 01 §5.11; design B-Careers; T23).

``CareersPage`` under About: the open roles (``opening`` rows: title, office, type,
closing date), "what we look for", and the apply button. The application is the core
request form with this page as the topic (RequestSchema "application", seeded; D53):
the role is a question, filled in from the role's "Apply" link (``?q_role=``), and the
CV is the form's upload, kept in the private storage. Routed by ``form=application`` to
the HR rule. A role whose closing date has passed is not shown.
"""

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _image, _translatable

JOB_TYPES = [
    ("full_time", _("Full time")),
    ("part_time", _("Part time")),
    ("contract", _("Contract")),
]


class OpeningBlock(blocks.StructBlock):
    title = blocks.CharBlock(label=_("role title"), max_length=120)
    office = blocks.PageChooserBlock(
        label=_("office"), page_type="offices.OfficePage", required=False
    )
    job_type = blocks.ChoiceBlock(label=_("type"), choices=JOB_TYPES, default="full_time")
    closing = blocks.DateBlock(
        label=_("closing date"), required=False, help_text=_("Not shown after this date.")
    )
    summary = blocks.TextBlock(label=_("summary"), max_length=400, required=False)

    class Meta:
        icon = "user"
        label = _("Open role")


class CareersPage(ScriptNormalisationMixin, Page):
    intro = models.TextField(_("intro"), max_length=600, blank=True)
    header_image = _image(_("header photo"))
    header_image_alt = models.CharField(_("header photo alt text"), max_length=200, blank=True)
    header_caption = models.CharField(_("header caption"), max_length=80, blank=True)
    openings_heading = models.CharField(_("roles heading"), max_length=80, default="Open roles")
    openings = StreamField([("opening", OpeningBlock())], blank=True, verbose_name=_("open roles"))
    openings_note = models.TextField(_("note under the roles"), max_length=400, blank=True)
    no_openings_text = models.TextField(_("text when no role is open"), max_length=400, blank=True)
    look_for_heading = models.CharField(
        _("'what we look for' heading"), max_length=80, default="What we look for"
    )
    look_for = models.TextField(_("what we look for"), blank=True, help_text=_("One per line."))
    photo = _image(_("photo"))
    photo_alt = models.CharField(_("photo alt text"), max_length=200, blank=True)
    photo_caption = models.CharField(_("photo caption"), max_length=80, blank=True)
    apply_heading = models.CharField(_("apply heading"), max_length=80, default="Apply")
    apply_text = models.TextField(_("apply text"), max_length=600, blank=True)
    button_label = models.CharField(_("button label"), max_length=40, default="Apply")
    privacy_note = models.TextField(_("note under the button"), max_length=400, blank=True)

    parent_page_types = ["pages.AboutPage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "openings_heading",
        "openings",
        "openings_note",
        "no_openings_text",
        "look_for_heading",
        "look_for",
        "photo_alt",
        "photo_caption",
        "apply_heading",
        "apply_text",
        "button_label",
        "privacy_note",
        synchronised=("header_image", "photo"),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel(
            [
                FieldPanel("header_image"),
                FieldPanel("header_image_alt"),
                FieldPanel("header_caption"),
            ],
            heading=_("Page header"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("openings_heading"),
                FieldPanel("openings"),
                FieldPanel("openings_note"),
                FieldPanel("no_openings_text"),
            ],
            heading=_("Open roles"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("look_for_heading"),
                FieldPanel("look_for"),
                FieldPanel("photo"),
                FieldPanel("photo_alt"),
                FieldPanel("photo_caption"),
            ],
            heading=_("What we look for"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("apply_heading"),
                FieldPanel("apply_text"),
                FieldPanel("button_label"),
                FieldPanel("privacy_note"),
            ],
            heading=_("Apply"),
        ),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro"), index.SearchField("look_for")]

    class Meta:
        verbose_name = _("careers page")

    def open_roles(self, today=None) -> list[dict]:
        """The roles whose closing date has not passed: ``title``, ``office`` (a live
        office page or None), ``job_type`` (its label), ``closing``, ``summary`` and
        ``answer`` (what the "Apply" link puts in the role question)."""
        today = today or timezone.localdate()
        labels = dict(JOB_TYPES)
        roles = []
        for block in self.openings:
            value = block.value
            if value["closing"] and value["closing"] < today:
                continue
            office = value["office"]
            office = office.specific if office is not None and office.live else None
            answer = f"{value['title']}, {office.title}" if office else value["title"]
            roles.append(
                {
                    "title": value["title"],
                    "office": office,
                    "job_type": labels.get(value["job_type"], ""),
                    "closing": value["closing"],
                    "summary": value["summary"],
                    "answer": answer,
                }
            )
        return roles

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["roles"] = self.open_roles()
        context["look_for_lines"] = [
            line.strip() for line in self.look_for.splitlines() if line.strip()
        ]
        return context
