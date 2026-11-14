"""Government & Trade Programs (master plan 03, 05; proposal 01 §5.5; design
B-Programs, B-Program-Iraq, B-Regulatory-Updates).

- ``ProgramIndexPage``: one per language under Home. Every live program as a card
  (status word, regulator, "last updated · office"), the programs still in progress as
  dated cards that are not programs (SFDA), the D4 rule line, the newest updates.
- ``ProgramPage``: the twelve parts (``apps.programs.blocks``). Publishing is refused
  until every part is filled in order, the review dates are set and no "accredited"
  appears in the appointment (``apps.programs.rules``).
- ``RegulatoryUpdatesPage``: the feed, news pages of kind "regulatory update"
  (``apps.news``), filtered by program and year.
"""

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.forms import WagtailAdminPageForm
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel, PageChooserPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.mixins import ReviewByMixin
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable
from apps.programs.blocks import PART_BLOCK_COUNTS, PART_TITLES, PROGRAM_PARTS
from apps.programs.rules import program_page_problems
from apps.services.models import _header_panel, _HeaderFields

STATUSES = [
    ("appointed", _("Appointed")),
    ("registered", _("Registered")),
    ("in_progress", _("Designation in progress")),
]


def regulatory_updates(locale, program=None):
    """Live news pages of kind "regulatory update" in ``locale``, newest first."""
    from apps.news.models import NewsPage

    pages = NewsPage.objects.live().public().filter(locale=locale, kind="regulatory_update")
    if program is not None:
        pages = pages.filter(program=program)
    return pages.order_by("-date", "-pk")


class PendingProgramBlock(blocks.StructBlock):
    """A program TIC does not run yet (SFDA): a dated card, never a program page."""

    country = blocks.CharBlock(label=_("country"), max_length=60)
    title = blocks.CharBlock(label=_("title"), max_length=120)
    status = blocks.CharBlock(label=_("status"), max_length=80, default="Designation in progress")
    status_date = blocks.CharBlock(
        label=_("status date"), max_length=40, required=False, help_text=_("e.g. 'May 2026'")
    )
    text = blocks.TextBlock(label=_("text"), max_length=300)
    note = blocks.CharBlock(label=_("note"), max_length=160, required=False)


class ProgramIndexPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    heading = models.CharField(_("cards heading"), max_length=80, default="Programs we run")
    pending = StreamField(
        [("pending", PendingProgramBlock())],
        blank=True,
        verbose_name=_("programs in progress"),
        help_text=_("Shown as dated cards after the programs; not program pages (D4)."),
    )
    rule_line = models.CharField(
        _("rule line"),
        max_length=300,
        blank=True,
        help_text=_("Under the cards: when TIC adds a program page (D4)."),
    )
    updates_heading = models.CharField(
        _("updates heading"), max_length=80, default="Regulatory updates"
    )
    updates_text = models.CharField(_("updates text"), max_length=300, blank=True)
    ask_heading = models.CharField(_("question heading"), max_length=120, blank=True)
    ask_text = models.CharField(_("question text"), max_length=300, blank=True)

    parent_page_types = ["pages.HomePage"]
    subpage_types = ["programs.ProgramPage", "programs.RegulatoryUpdatesPage"]
    max_count_per_parent = 1
    template = "programs/program_index.html"

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "heading",
        "pending",
        "rule_line",
        "updates_heading",
        "updates_text",
        "ask_heading",
        "ask_text",
        synchronised=("header_image",),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        FieldPanel("heading"),
        FieldPanel("pending"),
        FieldPanel("rule_line"),
        MultiFieldPanel(
            [FieldPanel("updates_heading"), FieldPanel("updates_text")],
            heading=_("Regulatory updates"),
        ),
        MultiFieldPanel(
            [FieldPanel("ask_heading"), FieldPanel("ask_text")],
            heading=_("Not sure which program applies"),
        ),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("program index")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["programs"] = ProgramPage.objects.child_of(self).live().public().order_by("path")
        context["updates"] = regulatory_updates(self.locale)[:3]
        context["feed"] = RegulatoryUpdatesPage.objects.child_of(self).live().public().first()
        return context


class ProgramPageForm(WagtailAdminPageForm):
    """Refuses publish and submit-for-review while the page breaks the publish rule.
    "Save draft" runs with deferred validation and is always allowed (D26)."""

    def clean(self):
        cleaned = super().clean()
        if self.is_deferred_validation:
            return cleaned
        problems = program_page_problems(
            intro=cleaned.get("intro"),
            summary=cleaned.get("summary"),
            parts=cleaned.get("parts"),
            regulator_name=cleaned.get("regulator_name"),
            regulator_abbreviation=cleaned.get("regulator_abbreviation"),
            appointment_status=cleaned.get("appointment_status"),
            owning_office=cleaned.get("owning_office"),
            reviewed=cleaned.get("reviewed"),
            review_by=cleaned.get("review_by"),
        )
        if problems:
            raise ValidationError(problems)
        return cleaned


class ProgramPage(ScriptNormalisationMixin, ReviewByMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    country = models.CharField(
        _("country"),
        max_length=60,
        blank=True,
        help_text=_("Card caption and feed filter, e.g. 'Iraq', 'Kurdistan Region of Iraq'."),
    )
    summary = models.CharField(
        _("summary"), max_length=240, blank=True, help_text=_("One sentence on the card.")
    )
    regulator_name = models.CharField(_("regulator"), max_length=160, blank=True)
    regulator_abbreviation = models.CharField(
        _("regulator abbreviation"), max_length=20, blank=True, help_text=_("e.g. COSQC")
    )
    regulator_url = models.URLField(_("regulator website"), blank=True)
    appointment_status = models.CharField(
        _("status word"),
        max_length=20,
        choices=STATUSES,
        blank=True,
        help_text=_("The regulator's own word for TIC's standing. Never 'accredited'."),
    )
    appointment_date = models.DateField(_("appointment date"), null=True, blank=True)
    appointment_reference = models.CharField(
        _("register reference"),
        max_length=60,
        blank=True,
        help_text=_("Shown after the status on the card, e.g. 'record 73'."),
    )
    appointment_document = models.ForeignKey(
        "wagtaildocs.Document",
        verbose_name=_("appointment letter"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    owning_office = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("owning office"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("The office page that owns this program (T20: office pages)."),
    )
    owning_office_name = models.CharField(
        _("owning office name"),
        max_length=60,
        blank=True,
        help_text=_("Shown while no office page is chosen, e.g. 'Baghdad office'."),
    )
    reviewed = models.DateField(_("last reviewed"), null=True, blank=True)
    request_label = models.CharField(
        _("first button"), max_length=60, blank=True, default="Request a certificate"
    )
    talk_label = models.CharField(
        _("second button"),
        max_length=60,
        blank=True,
        help_text=_("To the owning office page, e.g. 'Talk to the Baghdad office'."),
    )
    parts = StreamField(
        PROGRAM_PARTS,
        block_counts=PART_BLOCK_COUNTS,
        blank=True,
        verbose_name=_("the twelve parts"),
        help_text=_("Each part once, in order 01 to 12. All twelve are needed to publish."),
    )

    parent_page_types = ["programs.ProgramIndexPage"]
    subpage_types = []
    template = "programs/program_page.html"
    base_form_class = ProgramPageForm

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "country",
        "summary",
        "regulator_name",
        "owning_office_name",
        "request_label",
        "talk_label",
        "parts",
        synchronised=(
            "header_image",
            "regulator_abbreviation",
            "regulator_url",
            "appointment_status",
            "appointment_date",
            "appointment_reference",
            "appointment_document",
            "owning_office",
            "reviewed",
            "review_by",
        ),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        MultiFieldPanel(
            [FieldPanel("country"), FieldPanel("summary")], heading=_("On the program cards")
        ),
        MultiFieldPanel(
            [
                FieldPanel("regulator_name"),
                FieldRowPanel([FieldPanel("regulator_abbreviation"), FieldPanel("regulator_url")]),
                FieldRowPanel([FieldPanel("appointment_status"), FieldPanel("appointment_date")]),
                FieldPanel("appointment_reference"),
                FieldPanel("appointment_document"),
            ],
            heading=_("Regulator and appointment"),
        ),
        MultiFieldPanel(
            [FieldPanel("request_label"), FieldPanel("talk_label")], heading=_("Buttons")
        ),
        FieldPanel("parts"),
        MultiFieldPanel(
            [
                PageChooserPanel("owning_office", "offices.OfficePage"),
                FieldPanel("owning_office_name"),
                FieldRowPanel([FieldPanel("reviewed"), ReviewByMixin.review_panel()]),
            ],
            heading=_("Ownership and review"),
        ),
    ]

    search_fields = [
        *Page.search_fields,
        index.SearchField("intro"),
        index.SearchField("summary"),
        index.SearchField("regulator_name"),
        index.SearchField("regulator_abbreviation"),
        index.SearchField("parts"),
    ]

    class Meta:
        verbose_name = _("program page")

    def review_recipients(self) -> list[str]:
        """The review-by reminder goes to the owning office's editors and reviewers
        (master plan 09; T24, D54); without them, the core default (owner, else the
        contact address)."""
        from django.contrib.auth import get_user_model

        from apps.offices.access import group_name, office_of, reviewer_group_name

        office = office_of(self)
        if office is not None:
            names = (group_name(office), reviewer_group_name(office))
            emails = (
                get_user_model()
                .objects.filter(is_active=True, groups__name__in=names)
                .exclude(email="")
                .order_by("email")
                .values_list("email", flat=True)
                .distinct()
            )
            if emails:
                return list(emails)
        return super().review_recipients()

    @property
    def office_label(self) -> str:
        if self.owning_office_id and self.owning_office.live:
            return self.owning_office.title
        return self.owning_office_name

    @property
    def status_line(self) -> str:
        """The card's status: "Appointed · COSQC, 2024", "Registered · GOEIC record 73"."""
        parts = [str(self.get_appointment_status_display())] if self.appointment_status else []
        regulator = self.regulator_abbreviation
        if self.appointment_date:
            regulator = f"{regulator}, {self.appointment_date.year}" if regulator else ""
        if self.appointment_reference:
            regulator = f"{regulator} {self.appointment_reference}".strip()
        if regulator:
            parts.append(regulator)
        return " · ".join(parts)

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["toc"] = [
            (block.block_type, PART_TITLES[block.block_type])
            for block in self.parts
            if block.block_type in PART_TITLES
        ]
        context["updates"] = regulatory_updates(self.locale, self)[:3]
        index_page = self.get_parent().specific
        context["feed"] = RegulatoryUpdatesPage.objects.child_of(index_page).live().first()
        context["others"] = (
            ProgramPage.objects.sibling_of(self, inclusive=False).live().public().order_by("path")
        )
        from apps.trust.models import ComplaintsPage

        context["complaints_page"] = (
            ComplaintsPage.objects.live().public().filter(locale=self.locale).first()
        )
        office = self.owning_office if self.owning_office_id and self.owning_office.live else None
        context["office_href"] = office.url if office else ""
        context["talk_label"] = self.talk_label if office else ""
        return context


class RegulatoryUpdatesPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    """The feed (design B-Regulatory-Updates): ``?program=<page id>&year=<yyyy>``."""

    parent_page_types = ["programs.ProgramIndexPage"]
    subpage_types = []
    max_count_per_parent = 1
    template = "programs/regulatory_updates.html"

    override_translatable_fields = _translatable(
        "intro", "header_image_alt", "header_caption", synchronised=("header_image",)
    )
    content_panels = [*Page.content_panels, FieldPanel("intro"), _header_panel()]

    class Meta:
        verbose_name = _("regulatory updates feed")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        updates = regulatory_updates(self.locale)
        programs = ProgramPage.objects.live().public().filter(locale=self.locale).order_by("path")
        years = sorted({d.year for d in updates.values_list("date", flat=True) if d}, reverse=True)
        program = programs.filter(pk=_int(request.GET.get("program"))).first()
        year = _int(request.GET.get("year"))
        if program is not None:
            updates = updates.filter(program=program)
        if year in years:
            updates = updates.filter(date__year=year)
        else:
            year = None
        context.update(
            updates=updates[:100],
            programs=programs,
            years=years,
            selected_program=program,
            selected_year=year,
        )
        return context


def _int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None
