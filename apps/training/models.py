"""Training catalogue (master plan 03; proposal 01 §5.7; design B-Training; T23).

``TrainingIndexPage`` lists the live ``CoursePage`` children, filtered by kind
(awareness, internal auditor) or format (classroom, online) with plain links. A course
carries the fields of proposal 01 §5.7: standard, level, duration, format and city,
dates (rows), price with currency and tax note, what the certificate says and who issues
it, trainer, prerequisites; the impartiality sentence is fixed text in the template.

Publish and submit are refused without price, dates, certificate text and issuer (as
the policy pages, D51); "save draft" always works. So the ten courses of the old site
are seeded as drafts until the training owner gives these facts (D53). Only dates from
today on are shown ("expired dates archive themselves").

"Register" opens the core request form with the course as the topic (RequestSchema
"course_register", seeded for every course; D53). The rules see ``service_group =
training``, so the head office (training owner) receives it.
"""

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.forms import WagtailAdminPageForm
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

KINDS = [
    ("awareness", _("Awareness")),
    ("internal_auditor", _("Internal auditor")),
    ("other", _("Other")),
]
FORMATS = [
    ("classroom", _("Classroom")),
    ("online", _("Online")),
    ("both", _("Classroom and online")),
]
FILTERS = (
    ("", _("All courses")),
    ("awareness", _("Awareness")),
    ("internal_auditor", _("Internal auditor")),
    ("online", _("Online")),
    ("classroom", _("Classroom")),
)


class TrainingIndexPage(ScriptNormalisationMixin, Page):
    intro = models.TextField(_("intro"), max_length=800, blank=True)
    empty_text = models.TextField(_("text when no course is published"), max_length=400, blank=True)
    note = models.TextField(_("note under the list"), max_length=400, blank=True)

    parent_page_types = ["pages.HomePage"]
    subpage_types = ["training.CoursePage"]
    max_count_per_parent = 1

    override_translatable_fields = _translatable("intro", "empty_text", "note")

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        FieldPanel("empty_text"),
        FieldPanel("note"),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("training catalogue")

    def courses(self, show: str = ""):
        courses = CoursePage.objects.child_of(self).live().public().order_by("path")
        if show in ("awareness", "internal_auditor"):
            courses = courses.filter(kind=show)
        elif show == "online":
            courses = courses.filter(course_format__in=("online", "both"))
        elif show == "classroom":
            courses = courses.filter(course_format__in=("classroom", "both"))
        return courses

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        show = request.GET.get("show", "")
        show = show if show in dict(FILTERS) else ""
        context["show"] = show
        context["filters"] = FILTERS
        context["courses"] = self.courses(show)
        return context


class DateBlock(blocks.StructBlock):
    start = blocks.DateBlock(label=_("first day"))
    end = blocks.DateBlock(label=_("last day"), required=False)
    place = blocks.CharBlock(
        label=_("where"), max_length=80, required=False, help_text=_("City, or Online.")
    )

    class Meta:
        icon = "date"
        label = _("Date")


# A course is published only with these facts (master plan 03).
COURSE_REQUIRED = ("price", "dates", "certificate_text", "certificate_issuer")


def course_problems(values: dict) -> dict:
    problems = {}
    for name in COURSE_REQUIRED:
        value = values.get(name)
        if value is None or value == "" or (name == "dates" and not len(value)):
            problems[name] = _("Needed to publish a course.")
    return problems


class CoursePageForm(WagtailAdminPageForm):
    """Refuses publish and submit-for-review without price, dates, certificate text and
    issuer; "save draft" is always allowed (as the policy pages, D51)."""

    def clean(self):
        cleaned = super().clean()
        if self.is_deferred_validation:
            return cleaned
        problems = course_problems(cleaned)
        if problems:
            raise ValidationError(problems)
        return cleaned


class CoursePage(ScriptNormalisationMixin, Page):
    kind = models.CharField(_("kind"), max_length=20, choices=KINDS, default="awareness")
    summary = models.TextField(
        _("summary"), max_length=400, blank=True, help_text=_("Who it is for, what it covers.")
    )
    standard = models.CharField(
        _("standard"), max_length=80, blank=True, help_text=_("For example: ISO 9001:2015")
    )
    level = models.CharField(_("level"), max_length=60, blank=True)
    duration = models.CharField(_("duration"), max_length=60, blank=True)
    course_format = models.CharField(_("format"), max_length=20, choices=FORMATS, blank=True)
    city = models.CharField(
        _("classroom city"), max_length=80, blank=True, help_text=_("For a classroom course.")
    )
    dates = StreamField([("date", DateBlock())], blank=True, verbose_name=_("dates"))
    price = models.DecimalField(_("price"), max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(
        _("currency"), max_length=3, blank=True, help_text=_("For example: AED")
    )
    tax_note = models.CharField(
        _("tax note"), max_length=80, blank=True, help_text=_("For example: incl. 5% VAT")
    )
    certificate_text = models.CharField(
        _("what the certificate says"),
        max_length=160,
        blank=True,
        help_text=_("For example: Certificate of attendance"),
    )
    certificate_issuer = models.CharField(_("certificate issued by"), max_length=120, blank=True)
    trainer = models.CharField(_("trainer"), max_length=120, blank=True)
    prerequisites = models.CharField(_("prerequisites"), max_length=240, blank=True)
    body = models.TextField(_("what the course covers"), blank=True)

    base_form_class = CoursePageForm
    parent_page_types = ["training.TrainingIndexPage"]
    subpage_types = []

    override_translatable_fields = _translatable(
        "summary",
        "level",
        "duration",
        "city",
        "tax_note",
        "certificate_text",
        "certificate_issuer",
        "prerequisites",
        "body",
        synchronised=(
            "kind",
            "standard",
            "course_format",
            "dates",
            "price",
            "currency",
            "trainer",
        ),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("kind"),
        FieldPanel("summary"),
        MultiFieldPanel(
            [
                FieldPanel("standard"),
                FieldRowPanel([FieldPanel("level"), FieldPanel("duration")]),
                FieldRowPanel([FieldPanel("course_format"), FieldPanel("city")]),
                FieldPanel("trainer"),
                FieldPanel("prerequisites"),
            ],
            heading=_("Course"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("dates"),
                FieldRowPanel(
                    [FieldPanel("price"), FieldPanel("currency"), FieldPanel("tax_note")]
                ),
                FieldPanel("certificate_text"),
                FieldPanel("certificate_issuer"),
            ],
            heading=_("Dates, price and certificate (needed to publish)"),
        ),
        FieldPanel("body"),
    ]
    search_fields = [
        *Page.search_fields,
        index.SearchField("summary"),
        index.SearchField("standard"),
        index.SearchField("body"),
    ]

    class Meta:
        verbose_name = _("course")

    def next_dates(self, today=None) -> list[dict]:
        """The dates from today on, first first."""
        today = today or timezone.localdate()
        rows = [block.value for block in self.dates]
        rows = [row for row in rows if (row["end"] or row["start"]) >= today]
        return sorted(rows, key=lambda row: row["start"])

    @property
    def format_text(self) -> str:
        label = dict(FORMATS).get(self.course_format, "")
        if self.city and self.course_format in ("classroom", "both"):
            return f"{label}, {self.city}"
        return str(label)
