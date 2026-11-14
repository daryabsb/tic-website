"""TIC's news pages (master plan 03; D22: TIC's own app, not the core's).

T18 builds what the programs need: ``NewsIndexPage`` and ``NewsPage`` with ``kind``
(news / insight / regulatory update), the program and office it belongs to, a named
author, the date and the standfirst. The regulatory-updates feed and each program's
part 09 list the pages of kind "regulatory update". T25 (D56) adds the index tabs
(kind) and filters (program, office), the featured article, 12 per page, and the
article: contents from its H2 headings, read time, updated date, author box, related
articles.
"""

import re

from django.core.paginator import Paginator
from django.db import models
from django.utils.html import strip_tags
from django.utils.safestring import mark_safe
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel, PageChooserPanel
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.rich_text import expand_db_html
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

KINDS = [
    ("news", _("News")),
    ("insight", _("Insight")),
    ("regulatory_update", _("Regulatory update")),
]


TAB_KINDS = ("news", "insight")  # regulatory updates have their own page (T18)
PER_PAGE = 12
WORDS_PER_MINUTE = 200
H2 = re.compile(r"<h2([^>]*)>(.*?)</h2>", re.S)


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

    def articles(self, kind="", program="", office=""):
        rows = NewsPage.objects.child_of(self).live().public().order_by("-date", "-pk")
        if kind in TAB_KINDS:
            rows = rows.filter(kind=kind)
        if program.isdigit():
            rows = rows.filter(program_id=int(program))
        if office.isdigit():
            rows = rows.filter(office_id=int(office))
        return rows

    def get_context(self, request, *args, **kwargs):
        from apps.offices.models import OfficePage
        from apps.programs.models import ProgramPage, RegulatoryUpdatesPage

        context = super().get_context(request, *args, **kwargs)
        chosen = {name: request.GET.get(name, "") for name in ("kind", "program", "office")}
        rows = self.articles(chosen["kind"], chosen["program"], chosen["office"])
        filtered = any(chosen.values())
        featured = None if filtered else rows.filter(featured=True).first()
        if featured is not None:
            rows = rows.exclude(pk=featured.pk)
        page_number = request.GET.get("page", "1")
        context.update(
            chosen=chosen,
            tabs=[("", _("All")), *[(k, label) for k, label in KINDS if k in TAB_KINDS]],
            updates_page=RegulatoryUpdatesPage.objects.live().filter(locale=self.locale).first(),
            programs=ProgramPage.objects.live().filter(locale=self.locale).order_by("title"),
            offices=OfficePage.objects.live().filter(locale=self.locale).order_by("title"),
            featured=featured,
            articles=Paginator(rows, PER_PAGE).get_page(page_number),
            filter_query="&".join(f"{k}={v}" for k, v in chosen.items() if v),
        )
        return context


class NewsPage(ScriptNormalisationMixin, Page):  # noqa: DJ008 (Page gives __str__)
    kind = models.CharField(_("kind"), max_length=20, choices=KINDS, default="news")
    date = models.DateField(_("date"))
    updated = models.DateField(
        _("updated"), null=True, blank=True, help_text=_("Only when the text changed.")
    )
    featured = models.BooleanField(
        _("featured"), default=False, help_text=_("Shown large at the top of the list.")
    )
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
        synchronised=("kind", "date", "updated", "featured", "program", "office", "author"),
    )

    content_panels = [
        *Page.content_panels,
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("kind"), FieldPanel("date"), FieldPanel("updated")]),
                FieldPanel("featured"),
                PageChooserPanel("program", "programs.ProgramPage"),
                PageChooserPanel("office", "offices.OfficePage"),
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

    def _sections(self) -> tuple[str, list[tuple[str, str]]]:
        html = expand_db_html(self.body or "")
        toc = []

        def number(match):
            title = strip_tags(match.group(2)).strip()
            anchor = f"s{len(toc) + 1}-{slugify(title)[:40]}"
            toc.append((anchor, title))
            return f'<h2 id="{anchor}"{match.group(1)}>{match.group(2)}</h2>'

        return H2.sub(number, html), toc

    @property
    def body_html(self) -> str:
        """The text with an id on every H2, for the contents list."""
        return mark_safe(self._sections()[0])  # noqa: S308 (editor rich text, expanded)

    @property
    def contents(self) -> list[tuple[str, str]]:
        return self._sections()[1]

    @property
    def read_minutes(self) -> int:
        words = len(strip_tags(self.body or "").split()) + len(self.standfirst.split())
        return max(1, round(words / WORDS_PER_MINUTE))

    def related(self, count=3):
        siblings = NewsPage.objects.sibling_of(self, inclusive=False).live().public()
        if self.program_id:
            first = list(siblings.filter(program_id=self.program_id).order_by("-date")[:count])
        else:
            first = list(siblings.filter(kind=self.kind).order_by("-date")[:count])
        more = siblings.exclude(pk__in=[p.pk for p in first]).order_by("-date")
        return (first + list(more[: count - len(first)]))[:count]

    @property
    def program_label(self) -> str:
        """The red eyebrow: "Iraq · COSQC"."""
        program = self.program
        if program is None:
            return ""
        return " · ".join(p for p in (program.country, program.regulator_abbreviation) if p)
