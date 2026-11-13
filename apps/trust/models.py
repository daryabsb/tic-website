"""Trust pages (master plan 03; T22): the ``Accreditation`` snippet, the Accreditations
page and ``ContentPage`` for the policy pages (Impartiality, Subcontracting, Certificate
and logo use, Privacy, Terms).

The rule of proposal 01 §5.6: a mark appears only with its number and a link to the
register that issued it. The table shows every ``is_public`` row; the footer and the
"marks we are permitted to show" list show the ``is_public`` rows with ``show_mark``.
"""

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.forms import WagtailAdminPageForm
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

STATUSES = [
    ("active", _("Active")),
    ("registered", _("Registered")),
    ("appointed", _("Appointed")),
    ("member", _("Member")),
    ("approved", _("Approved")),
    ("in_progress", _("Designation in progress")),
]


def _document(verbose_name, help_text=""):
    return models.ForeignKey(
        "wagtaildocs.Document",
        verbose_name=verbose_name,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=help_text,
    )


class AccreditationQuerySet(models.QuerySet):
    def public(self):
        return self.filter(is_public=True)

    def marks(self):
        """The marks we may show: public rows with a register link (clean() checks)."""
        return self.public().filter(show_mark=True)


class Accreditation(models.Model):
    body = models.CharField(_("body"), max_length=40, help_text=_("e.g. ANAB"))
    body_name = models.CharField(
        _("body, full name"),
        max_length=160,
        blank=True,
        help_text=_("e.g. ANSI National Accreditation Board, USA"),
    )
    standard_or_scheme = models.CharField(_("standard or scheme"), max_length=160)
    entity_and_sites = models.CharField(_("entity and sites"), max_length=240)
    number = models.CharField(
        _("number"), max_length=120, blank=True, help_text=_("Blank shows a dash.")
    )
    status = models.CharField(_("status"), max_length=20, choices=STATUSES)
    valid_until = models.DateField(_("valid until"), null=True, blank=True)
    register_url = models.URLField(_("register link"), blank=True)
    register_label = models.CharField(_("register link label"), max_length=40, default="Register")
    register_note = models.CharField(
        _("note when there is no register"),
        max_length=60,
        blank=True,
        help_text=_("For example: No public list"),
    )
    certificate_url = models.URLField(_("certificate link"), blank=True)
    certificate_file = _document(_("certificate file"))
    certificate_label = models.CharField(
        _("certificate link label"), max_length=40, default="Certificate PDF"
    )
    last_checked = models.DateField(
        _("last checked"), null=True, blank=True, help_text=_("Blank shows [date].")
    )
    owner = models.ForeignKey(
        "people.Person",
        verbose_name=_("owner"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    is_public = models.BooleanField(
        _("shown on the site"),
        default=False,
        help_text=_("Only rows the Quality Manager has verified against the register."),
    )
    show_mark = models.BooleanField(
        _("show the mark"),
        default=False,
        help_text=_("In the footer and in the list of marks we are permitted to show."),
    )
    mark_line = models.CharField(
        _("line under the mark"),
        max_length=60,
        blank=True,
        help_text=_("For example: ISO/IEC 17020 · AI-3314"),
    )
    symbol_image = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name=_("symbol"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("As supplied by the body. Blank shows the body's name."),
    )
    sort_order = models.PositiveSmallIntegerField(_("order"), default=0)

    objects = AccreditationQuerySet.as_manager()

    panels = [
        MultiFieldPanel(
            [FieldPanel("body"), FieldPanel("body_name"), FieldPanel("sort_order")],
            heading=_("Body"),
        ),
        FieldPanel("standard_or_scheme"),
        FieldPanel("entity_and_sites"),
        FieldPanel("number"),
        FieldPanel("status"),
        FieldPanel("valid_until"),
        MultiFieldPanel(
            [
                FieldPanel("register_url"),
                FieldPanel("register_label"),
                FieldPanel("register_note"),
                FieldPanel("certificate_url"),
                FieldPanel("certificate_file"),
                FieldPanel("certificate_label"),
            ],
            heading=_("Links"),
        ),
        FieldPanel("last_checked"),
        FieldPanel("owner"),
        MultiFieldPanel(
            [
                FieldPanel("is_public"),
                FieldPanel("show_mark"),
                FieldPanel("mark_line"),
                FieldPanel("symbol_image"),
            ],
            heading=_("Shown on the site"),
        ),
    ]

    class Meta:
        verbose_name = _("accreditation")
        verbose_name_plural = _("accreditations")
        ordering = ["sort_order", "body"]

    def __str__(self):
        return f"{self.body}: {self.standard_or_scheme}"

    def clean(self):
        # The brand rule (proposal 01 §5.6): no mark without its register link.
        if self.show_mark and not self.register_url:
            raise ValidationError({"show_mark": _("A mark needs a register link.")})
        if self.show_mark and not self.is_public:
            raise ValidationError({"show_mark": _("A mark needs a row shown on the site.")})

    @property
    def certificate_href(self):
        if self.certificate_file:
            return self.certificate_file.url
        return self.certificate_url


register_snippet(Accreditation)


class AccreditationsPage(ScriptNormalisationMixin, Page):
    """Accreditations and approvals (B-Accreditations): the table of every public row,
    the rule list, the marks we may show."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    table_heading = models.CharField(
        _("table heading"),
        max_length=80,
        default="Accreditations, registrations and memberships",
    )
    table_note = models.TextField(_("note under the table"), max_length=600, blank=True)
    rules_heading = models.CharField(_("rules heading"), max_length=80, default="Our rule")
    rules = models.TextField(_("rules"), blank=True, help_text=_("One rule per line."))
    marks_heading = models.CharField(
        _("marks heading"), max_length=80, default="Marks we are permitted to show"
    )
    marks_note = models.TextField(_("note under the marks"), max_length=400, blank=True)

    parent_page_types = ["pages.AboutPage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro",
        "table_heading",
        "table_note",
        "rules_heading",
        "rules",
        "marks_heading",
        "marks_note",
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel([FieldPanel("table_heading"), FieldPanel("table_note")], _("Table")),
        MultiFieldPanel([FieldPanel("rules_heading"), FieldPanel("rules")], _("Rules")),
        MultiFieldPanel([FieldPanel("marks_heading"), FieldPanel("marks_note")], _("Marks")),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("accreditations page")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["rows"] = Accreditation.objects.public().select_related("certificate_file")
        context["marks"] = Accreditation.objects.marks()
        context["rule_lines"] = [line.strip() for line in self.rules.splitlines() if line.strip()]
        return context


class SectionBlock(blocks.StructBlock):
    heading = blocks.CharBlock(label=_("heading"), max_length=120)
    body = blocks.RichTextBlock(
        label=_("text"), features=["bold", "italic", "link", "ul", "ol", "document-link"]
    )

    class Meta:
        icon = "doc-full"
        label = _("Section")
        template = "trust/section.html"


# A policy page is published only with its document facts (master plan 03).
CONTENT_PAGE_REQUIRED = ("document_code", "version", "effective_date", "document_owner")


def content_page_problems(values: dict) -> dict:
    return {
        name: _("Needed to publish a policy page.")
        for name in CONTENT_PAGE_REQUIRED
        if not values.get(name)
    }


class ContentPageForm(WagtailAdminPageForm):
    """Refuses publish and submit-for-review without the document facts; "save draft"
    is always allowed (as the service page, D26)."""

    def clean(self):
        cleaned = super().clean()
        if self.is_deferred_validation:
            return cleaned
        problems = content_page_problems(cleaned)
        if problems:
            raise ValidationError(problems)
        return cleaned


class ContentPage(ScriptNormalisationMixin, Page):
    """A policy page (B-Impartiality): the document facts, the PDF, numbered sections
    with a table of contents, related pages."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    document_code = models.CharField(_("document code"), max_length=40, blank=True)
    version = models.CharField(
        _("issue and revision"), max_length=40, blank=True, help_text=_("For example: Issue 0")
    )
    effective_date = models.DateField(_("effective date"), null=True, blank=True)
    document_owner = models.ForeignKey(
        "people.Person",
        verbose_name=_("document owner"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    issuing_entity = models.CharField(
        _("issued by"),
        max_length=120,
        blank=True,
        help_text=_("The legal entity whose document this is."),
    )
    pdf = _document(_("PDF"))
    other_pdf = _document(_("second PDF"), _("For example, the same policy of another TIC entity."))
    other_pdf_label = models.CharField(_("second PDF label"), max_length=120, blank=True)
    sections = StreamField([("section", SectionBlock())], blank=True, verbose_name=_("sections"))
    related = StreamField(
        [("page", blocks.PageChooserBlock(label=_("page")))],
        blank=True,
        verbose_name=_("related pages"),
    )

    base_form_class = ContentPageForm
    parent_page_types = ["pages.AboutPage"]
    subpage_types = []

    override_translatable_fields = _translatable(
        "intro",
        "version",
        "issuing_entity",
        "other_pdf_label",
        "sections",
        synchronised=(
            "document_code",
            "effective_date",
            "document_owner",
            "pdf",
            "other_pdf",
            "related",
        ),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel(
            [
                FieldPanel("document_code"),
                FieldPanel("version"),
                FieldPanel("effective_date"),
                FieldPanel("document_owner"),
                FieldPanel("issuing_entity"),
                FieldPanel("pdf"),
                FieldPanel("other_pdf"),
                FieldPanel("other_pdf_label"),
            ],
            heading=_("Document (code, issue, date and owner are needed to publish)"),
        ),
        FieldPanel("sections"),
        FieldPanel("related"),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro"), index.SearchField("sections")]

    class Meta:
        verbose_name = _("policy page")
