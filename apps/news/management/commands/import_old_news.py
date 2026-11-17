"""Import the old site's posts as draft news pages (master plan 10; T30, D62).

    python manage.py import_old_news [--source seed/old-news.json]

Each post of ``seed/old-news.json`` (read from the old site's REST API by
``scripts/fetch_old_site.py``) becomes a ``NewsPage`` of kind "news" under the English
news index, with its original date, a clean title and slug, a one-sentence standfirst
and the text cleaned to the news body's features (``apps.news.oldsite``). Posts marked
``seeded`` already have their page (T18). A slug that exists is left alone, so the
command can run again.

The pages are drafts: a content manager reads each one against the accreditation rules
(D51) and publishes it. Until then the old address redirects to the news index
(``seed/redirects.csv``, fallback column). No author is set (people are named only when
they agree, P-16); the old posts' images are not imported (the news page has no image).
"""

import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from wagtail.models import Locale

from apps.news import oldsite
from apps.news.models import NewsIndexPage, NewsPage

STANDFIRST_LIMIT = NewsPage._meta.get_field("standfirst").max_length


class Command(BaseCommand):
    help = "Import the old site's posts as draft news pages (idempotent)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--source", type=Path, default=Path(settings.BASE_DIR) / "seed" / "old-news.json"
        )

    def handle(self, *args, source: Path, **options):
        posts = json.loads(source.read_text(encoding="utf-8"))["posts"]
        index = NewsIndexPage.objects.get(locale=Locale.get_default())
        existing = set(NewsPage.objects.child_of(index).values_list("slug", flat=True))
        made = 0
        for post in posts:
            if post.get("seeded") or post["slug"] in existing:
                continue
            page = NewsPage(
                title=post["title"],
                slug=post["slug"],
                kind="news",
                date=post["date"],
                standfirst=oldsite.standfirst(post["excerpt"], STANDFIRST_LIMIT),
                body=oldsite.clean_html(post["html"]),
                live=False,
            )
            index.add_child(instance=page)
            page.save_revision()
            existing.add(page.slug)
            made += 1
        self.stdout.write(f"old news: {made} draft(s) made, {len(posts)} post(s) in the source")
