"""Site search (design B-Search.dc.html; master plan 04): ``/<lang>/search/?q=…&type=…``.

One list over four sources, in the language of the path:

- pages, through Wagtail search (each TIC page type lists its text in ``search_fields``);
  the tab of a page comes from its app (``KIND_BY_APP``), so the programs, news and
  offices apps of later tickets join the right tab without a change here;
- documents of the Wagtail library ("Downloads");
- questions: every question of a ``qa`` part that holds all the words searched for,
  linked to the part on its page.

Certificates are not searchable: the page sends the visitor to Verify (D9). At most
``LIMIT`` results per source; no paging in V1 (D31).
"""

from __future__ import annotations

from dataclasses import dataclass

from django.shortcuts import render
from django.utils.html import strip_tags
from django.utils.text import Truncator
from django.utils.translation import gettext_lazy as _
from wagtail.documents import get_document_model
from wagtail.models import Locale, Page

LIMIT = 50

TABS = [
    ("all", _("All")),
    ("programs", _("Programs")),
    ("services", _("Services")),
    ("news", _("Updates and news")),
    ("downloads", _("Downloads")),
    ("questions", _("Questions")),
    ("offices", _("Offices")),
]
EYEBROWS = {
    "programs": _("Program"),
    "services": _("Service"),
    "industries": _("Industry"),
    "news": _("Update"),
    "downloads": _("Download"),
    "questions": _("Question"),
    "offices": _("Office"),
    "pages": _("Page"),
}
# The tab of a page, by the app of its page type. Industries show under "All" only.
KIND_BY_APP = {
    "programs": "programs",
    "services": "services",
    "industries": "industries",
    "news": "news",
    "resources": "news",
    "offices": "offices",
}
ORDER = ["programs", "services", "industries", "news", "downloads", "questions", "offices", "pages"]


@dataclass
class Result:
    kind: str
    title: str
    url: str
    text: str = ""
    meta: str = ""

    @property
    def eyebrow(self):
        return EYEBROWS[self.kind]


def search(request):
    query = request.GET.get("q", "").strip()[:200]
    tab = request.GET.get("type", "all")
    if tab not in dict(TABS):
        tab = "all"
    results = []
    if query:
        locale = Locale.get_active()
        results = [*page_results(query, locale), *document_results(query)]
        results += question_results(query, locale)
        results.sort(key=lambda r: ORDER.index(r.kind))
    shown = results if tab == "all" else [r for r in results if r.kind == tab]
    return render(
        request,
        "pages/search.html",
        {"query": query, "tab": tab, "tabs": TABS, "results": shown, "count": len(shown)},
    )


def _snippet(text) -> str:
    return Truncator(strip_tags(str(text or ""))).chars(220)


def _trail(page) -> str:
    """The section a page sits in: its ancestors below the home page."""
    return " › ".join(p.title for p in page.get_ancestors().filter(depth__gt=2))


def page_results(query: str, locale) -> list[Result]:
    found = Page.objects.live().public().filter(locale=locale, depth__gt=2).search(query)
    results = []
    for page in found[:LIMIT]:
        page = page.specific
        kind = KIND_BY_APP.get(page._meta.app_label, "pages")
        text = page.search_description or getattr(page, "intro", "") or getattr(page, "summary", "")
        results.append(Result(kind, page.title, page.url, _snippet(text), _trail(page)))
    return results


def document_results(query: str) -> list[Result]:
    found = get_document_model().objects.all().search(query)
    return [
        Result("downloads", doc.title, doc.url, meta=str(_("Downloads library")))
        for doc in found[:LIMIT]
    ]


def question_results(query: str, locale) -> list[Result]:
    """Questions of the live program and service pages that hold every word searched
    for (``apps.resources.qa``, shared with the Q&A page)."""
    from apps.resources.qa import question_groups

    results = []
    for group in question_groups(locale, query):
        for item in group.questions:
            meta = f"{_('Questions and answers')} · {group.page.title}"
            results.append(
                Result(
                    "questions", item.question, f"{group.page.url}#qa", _snippet(item.text), meta
                )
            )
            if len(results) >= LIMIT:
                return results
    return results
