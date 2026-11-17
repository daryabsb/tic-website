"""The page description for search engines and link previews (T13, T32).

The core's seo head (``zeneon_cms.seo.meta.page_description``) reads a page's
``meta_description``, else its ``search_description``. ``DescribedPage`` gives every
TIC page type the same order: the editor's search description, else the first of the
page's own lead texts that is filled in. So no live page ships a blank description;
``tests/test_china_rules.py`` checks it with the core's ``pages_without_description``.
"""

from django.utils.html import strip_tags

LEAD_FIELDS = ("summary", "standfirst", "intro", "hero_sentence")


def lead_text(page) -> str:
    for name in LEAD_FIELDS:
        value = getattr(page, name, "")
        if value:
            return " ".join(strip_tags(str(value)).split())
    return ""


class DescribedPage:
    @property
    def meta_description(self) -> str:
        return self.search_description or lead_text(self) or self.fallback_description()

    def fallback_description(self) -> str:
        return ""
