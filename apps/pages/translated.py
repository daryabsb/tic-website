"""The pages that are translated first, and their text (master plan 08; T29, D81).

``seed/<code>.yaml`` (today: ``ar.yaml``) names the pages by their English path and
gives the text as rows ``{en: ..., <code>: ...}``. One English text has one translation
on every page it is on. ``seed_site`` makes the translated pages from it; the texts are
drafts until the reviewer of the language approves them in the review sheet (P-5).

A text is written as a reader sees it: plain text with its line breaks, or, for a
paragraph with inline tags (``<b>``, ``<a id="a1">``), as wagtail-localize stores it.
A text under ``same`` stays as it is (a mark, a key the site reads); a text with no
letter (a number) needs no row.
"""

from __future__ import annotations

from pathlib import Path

import yaml
from django.conf import settings
from wagtail.models import Locale, Page


def seed_file(code: str) -> dict:
    path = Path(settings.BASE_DIR) / "seed" / f"{code}.yaml"
    if not path.exists():
        return {}
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def strings(code: str) -> dict[str, str]:
    """``{English text: its translation}``; a row with no translation yet is left out."""
    rows = seed_file(code).get("strings") or []
    return {row["en"]: row[code] for row in rows if row.get(code)}


def same(code: str) -> set[str]:
    """The texts that stay as they are in the language: marks, keys the site reads,
    notes no visitor sees."""
    return set(seed_file(code).get("same") or [])


def pages(code: str) -> list[tuple[str, Page]]:
    """``(path, default-language page)`` for every page the file names, in file order
    (a parent before its children). A path with no page is left out."""
    home = Page.objects.filter(locale=Locale.get_default(), depth=2).first()
    found = []
    if home is None:
        return found
    for path in seed_file(code).get("pages") or []:
        path = path.strip("/")
        url_path = f"{home.url_path}{path}/" if path else home.url_path
        page = Page.objects.filter(url_path=url_path).specific().first()
        if page is not None:
            found.append((path, page))
    return found


def missing_texts(code: str) -> dict[str, list[str]]:
    """``{path: [English texts of that page with no translation in the file]}``.
    Reads the pages; it makes no translated page."""
    from wagtail_localize.models import StringSegment, TranslationSource
    from zeneon_cms.translation.catalog import segment_display

    known = set(strings(code)) | same(code)
    missing = {}
    for path, page in pages(code):
        source, _created = TranslationSource.update_or_create_from_instance(page)
        segments = StringSegment.objects.filter(source=source).select_related("string")
        texts = [segment_display(s.string.data)[0] for s in segments.order_by("order")]
        gaps = [
            text
            for text in dict.fromkeys(texts)
            if text not in known and any(letter.isalpha() for letter in text)  # not "12"
        ]
        if gaps:
            missing[path or "home"] = gaps
    return missing
