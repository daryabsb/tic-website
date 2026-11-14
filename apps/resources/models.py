"""Resources (master plan 03, 04; designs B-News, B-Downloads, B-QA; T25, D56).

The header's "Resources" item is ``ResourcesPage`` (/<lang>/resources/): a hub with one
card for each resource page. The resource pages stay where they are, direct children of
the home page (/news/, /downloads/, /training/, /questions/), and share a tab strip
(``resources_tabs``) so a visitor moves between them.

- ``Download``: a snippet, one current file or link with its type, program or service,
  version, date, owner and languages (master plan 09: "there is only ever one current
  copy"). A row needs a document or a link.
- ``DownloadsPage``: the library, filtered by words, type, program or service, language.
- ``QAPage``: every question of the live program and service pages of its language,
  grouped by page with its owner (``apps.resources.qa``), filtered by words.
"""

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel, PageChooserPanel
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

DOWNLOAD_KINDS = [
    ("form", _("Form")),
    ("product_list", _("Product list")),
    ("fee_structure", _("Fee structure")),
    ("policy", _("Policy")),
    ("brochure", _("Brochure")),
    ("certificate", _("Certificate or letter")),
    ("register", _("Register entry")),
]
LANGUAGES = [("en", "EN"), ("ar", "AR"), ("zh", "ZH")]


class Download(index.Indexed, models.Model):
    title = models.CharField(_("title"), max_length=160)
    kind = models.CharField(_("type"), max_length=20, choices=DOWNLOAD_KINDS)
    document = models.ForeignKey(
        "wagtaildocs.Document",
        verbose_name=_("file"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    link = models.URLField(
        _("link"), blank=True, help_text=_("Instead of a file: the page where it is kept.")
    )
    topic = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("program or service"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    topic_name = models.CharField(
        _("program or service name"),
        max_length=60,
        blank=True,
        help_text=_("Shown in the list, e.g. 'Iraq CoC'."),
    )
    version = models.CharField(_("version"), max_length=30, blank=True)
    date = models.DateField(_("date"), null=True, blank=True)
    owner = models.CharField(
        _("owner"), max_length=60, blank=True, help_text=_("Office or role, e.g. 'Baghdad'.")
    )
    languages = models.CharField(
        _("languages"),
        max_length=20,
        default="en",
        help_text=_("Language codes, comma separated: en, ar, zh."),
    )
    sort_order = models.PositiveIntegerField(_("order"), default=100)

    panels = [
        FieldPanel("title"),
        FieldRowPanel([FieldPanel("kind"), FieldPanel("sort_order")]),
        MultiFieldPanel(
            [FieldPanel("document"), FieldPanel("link")],
            heading=_("File or link (one is needed)"),
        ),
        MultiFieldPanel(
            [PageChooserPanel("topic"), FieldPanel("topic_name")],
            heading=_("Program or service"),
        ),
        FieldRowPanel([FieldPanel("version"), FieldPanel("date")]),
        FieldRowPanel([FieldPanel("owner"), FieldPanel("languages")]),
    ]
    search_fields = [index.SearchField("title"), index.AutocompleteField("title")]

    class Meta:
        verbose_name = _("download")
        verbose_name_plural = _("downloads")
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title

    def clean(self):
        super().clean()
        if not self.document_id and not self.link:
            raise ValidationError({"document": _("Choose a file or give a link.")})
        codes = self.language_codes
        unknown = [code for code in codes if code not in dict(LANGUAGES)]
        if unknown or not codes:
            raise ValidationError({"languages": _("Use en, ar or zh, comma separated.")})

    @property
    def language_codes(self) -> list[str]:
        return [code.strip().lower() for code in self.languages.split(",") if code.strip()]

    @property
    def language_text(self) -> str:
        return " · ".join(code.upper() for code in self.language_codes)

    @property
    def url(self) -> str:
        return self.document.url if self.document_id else self.link

    @property
    def file_type(self) -> str:
        if not self.document_id:
            return "LINK"
        extension = self.document.file_extension or ""
        return extension.upper() or "FILE"

    @property
    def topic_text(self) -> str:
        return self.topic_name or (self.topic.title if self.topic_id else "")


class _ResourcePage(ScriptNormalisationMixin, Page):
    intro = models.TextField(_("intro"), max_length=600, blank=True)

    parent_page_types = ["pages.HomePage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable("intro")
    content_panels = [*Page.content_panels, FieldPanel("intro")]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        abstract = True


class ResourcesPage(_ResourcePage):
    class Meta:
        verbose_name = _("resources hub")

    def get_context(self, request, *args, **kwargs):
        from apps.resources.tabs import resource_pages

        context = super().get_context(request, *args, **kwargs)
        context["cards"] = [page for page in resource_pages(self.locale) if page.pk != self.pk]
        return context


class DownloadsPage(_ResourcePage):
    note = models.TextField(_("note under the list"), max_length=400, blank=True)

    override_translatable_fields = _translatable("intro", "note")
    content_panels = [*Page.content_panels, FieldPanel("intro"), FieldPanel("note")]

    class Meta:
        verbose_name = _("downloads library")

    def downloads(self, words="", kind="", topic="", language=""):
        rows = Download.objects.select_related("document", "topic")
        if kind:
            rows = rows.filter(kind=kind)
        if topic:
            rows = rows.filter(topic_name=topic)
        rows = list(rows)
        if language:
            rows = [row for row in rows if language in row.language_codes]
        for word in words.lower().split():
            rows = [row for row in rows if word in f"{row.title} {row.topic_text}".lower()]
        return rows

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        topics = sorted(
            set(Download.objects.exclude(topic_name="").values_list("topic_name", flat=True))
        )
        chosen = {
            "q": request.GET.get("q", "").strip()[:80],
            "type": request.GET.get("type", ""),
            "topic": request.GET.get("topic", ""),
            "lang": request.GET.get("lang", ""),
        }
        chosen["type"] = chosen["type"] if chosen["type"] in dict(DOWNLOAD_KINDS) else ""
        chosen["topic"] = chosen["topic"] if chosen["topic"] in topics else ""
        chosen["lang"] = chosen["lang"] if chosen["lang"] in dict(LANGUAGES) else ""
        context.update(
            chosen=chosen,
            kinds=DOWNLOAD_KINDS,
            topics=topics,
            languages=LANGUAGES,
            rows=self.downloads(chosen["q"], chosen["type"], chosen["topic"], chosen["lang"]),
        )
        return context


class QAPage(_ResourcePage):
    class Meta:
        verbose_name = _("questions and answers")

    def get_context(self, request, *args, **kwargs):
        from apps.resources.qa import question_groups

        context = super().get_context(request, *args, **kwargs)
        words = request.GET.get("q", "").strip()[:80]
        groups = question_groups(self.locale, words)
        context.update(q=words, groups=groups, total=sum(len(g.questions) for g in groups))
        return context
