"""TIC's news pages (master plan 03; D22: TIC's own app, not the core's).

T18 builds what the programs need: ``NewsIndexPage`` and ``NewsPage`` with ``kind``
(news / insight / regulatory update), the program and office it belongs to, a named
author, the date and the standfirst. The regulatory-updates feed and each program's
part 09 list the pages of kind "regulatory update". T25 adds the kind and office
filters on the index and the full article template (design B-Article, B-News).
"""

from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel, PageChooserPanel
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

KINDS = [
    ("news", _("News")),
    ("insight", _("Insight")),
    ("regulatory_update", _("Regulatory update")),
]


class NewsIndexPage(ScriptNormalisationMixin, Page):  # noqa: DJ008 (Page gives __str__)
    intro = models.TextField(_("intro"), max_length=600, blank=True)

    parent_page_types = ["pages.HomePage"]
    subpage_types = ["news.NewsPage"]
    max_count_per_parent = 1
    template = "news/news_index.html"

    override_translatable_fields = _translatable("intro")
    content_panels = [*Page.content_panels, FieldPanel("intro")]

    class Meta:
        verbose_name = _("news index")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["articles"] = (
            NewsPage.objects.child_of(self).live().public().order_by("-date", "-pk")[:50]
        )
        return context


class NewsPage(ScriptNormalisationMixin, Page):  # noqa: DJ008 (Page gives __str__)
    kind = models.CharField(_("kind"), max_length=20, choices=KINDS, default="news")
    date = models.DateField(_("date"))
    standfirst = models.CharField(
        _("standfirst"),
        max_length=300,
        blank=True,
        help_text=_("One sentence: what changed and from when."),
    )
    body = RichTextField(
        _("text"), features=["h2", "h3", "bold", "italic", "link", "ul", "ol"], blank=True
    )
    program = models.ForeignKey(
        "programs.ProgramPage",
        verbose_name=_("program"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="news",
        help_text=_("Regulatory updates name their program."),
    )
    office = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("office"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("The office that signs it (T20: office pages)."),
    )
    office_name = models.CharField(
        _("office name"),
        max_length=60,
        blank=True,
        help_text=_("Shown while no office page is chosen, e.g. 'Baghdad office'."),
    )
    author = models.ForeignKey(
        "people.Person",
        verbose_name=_("author"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    parent_page_types = ["news.NewsIndexPage"]
    subpage_types = []
    template = "news/news_page.html"

    override_translatable_fields = _translatable(
        "standfirst",
        "body",
        "office_name",
        synchronised=("kind", "date", "program", "office", "author"),
    )

    content_panels = [
        *Page.content_panels,
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("kind"), FieldPanel("date")]),
                PageChooserPanel("program", "programs.ProgramPage"),
                PageChooserPanel("office"),
                FieldPanel("office_name"),
                FieldPanel("author"),
            ],
            heading=_("About this article"),
        ),
        FieldPanel("standfirst"),
        FieldPanel("body"),
    ]

    search_fields = [
        *Page.search_fields,
        index.SearchField("standfirst"),
        index.SearchField("body"),
        index.FilterField("kind"),
    ]

    class Meta:
        verbose_name = _("news page")

    @property
    def meta_description(self) -> str:
        return self.search_description or self.standfirst

    @property
    def signed_by(self) -> str:
        """ "Named author, office", as much of it as is known."""
        office = self.office.title if self.office_id and self.office.live else self.office_name
        author = self.author.name if self.author_id and self.author.agreed_to_be_named else ""
        return ", ".join(part for part in (author, office) if part)

    @property
    def program_label(self) -> str:
        """The red eyebrow: "Iraq · COSQC"."""
        program = self.program
        if program is None:
            return ""
        return " · ".join(p for p in (program.country, program.regulator_abbreviation) if p)
