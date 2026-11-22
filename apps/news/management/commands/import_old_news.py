"""Import the old site's posts as news pages (master plan 10; T30, D62).

    python manage.py import_old_news [--source seed/old-news.json] [--images DIR] [--publish]

Each post of ``seed/old-news.json`` (``scripts/build_old_news.py``) becomes a
``NewsPage`` of kind "news" under the English news index, with its original date, a
clean title and slug, a one-sentence standfirst and the text cleaned to the news body's
features (``apps.news.oldsite``). Posts marked ``seeded`` already have their page (T18).
A page that exists is not made again, so the command can run again.

``--images DIR``: the old site's media folder (``fetch_old_media.py``, D32). A page
without a photo gets its post's main photo, in the "News" collection; this includes the
seeded pages. A page whose photo has no alt text gets its post's alt text (T33).

``--source seed/current-pages.json`` (T43, D82): the current site's product pages
(``scripts/build_current_pages.py``), each as an article of kind "insight".

``--publish``: publish the imported pages. Without it they are drafts. On staging Darya
publishes them all (Nov 17, 2026); for the launch a content manager decides (D62).
No author is set (people are named only when they agree, P-16).
"""

import json
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from wagtail.images import get_image_model
from wagtail.models import Collection, Locale

from apps.news import oldsite
from apps.news.models import NewsIndexPage, NewsPage

STANDFIRST_LIMIT = NewsPage._meta.get_field("standfirst").max_length
COLLECTION = "News"


def news_collection() -> Collection:
    root = Collection.get_first_root_node()
    found = root.get_children().filter(name=COLLECTION).first()
    return found or root.add_child(name=COLLECTION)


class Command(BaseCommand):
    help = "Import the old site's posts as news pages (idempotent)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--source", type=Path, default=Path(settings.BASE_DIR) / "seed" / "old-news.json"
        )
        parser.add_argument("--images", type=Path, default=None)
        parser.add_argument("--publish", action="store_true")

    def handle(self, *args, source: Path, images: Path | None, publish: bool, **options):
        posts = json.loads(source.read_text(encoding="utf-8"))["posts"]
        index = NewsIndexPage.objects.get(locale=Locale.get_default())
        pages = {page.slug: page for page in NewsPage.objects.child_of(index).specific()}
        made = photos = alts = published = 0
        for post in posts:
            page = pages.get(post["slug"])
            if page is None and post.get("seeded"):
                continue
            if page is None:
                body = oldsite.clean_html(post["html"])
                page = NewsPage(
                    title=post["title"],
                    slug=post["slug"],
                    kind=post.get("kind", "news"),  # "insight": a product page (T43)
                    date=post["date"],
                    standfirst=oldsite.standfirst(post["excerpt"], STANDFIRST_LIMIT, body),
                    body=body,
                    live=False,
                )
                index.add_child(instance=page)
                page.save_revision()
                made += 1
            page.refresh_from_db()
            current = page.get_latest_revision_as_object() if page.has_unpublished_changes else page
            if images and not current.image_id and post.get("image_file"):
                photos += self.add_photo(page, post, images)
                page.refresh_from_db()
            elif current.image_id and not current.image_alt and post.get("image_alt"):
                alts += self.add_alt(page, post)
                page.refresh_from_db()
            pending = not page.live or page.has_unpublished_changes
            if publish and not post.get("seeded") and pending:
                page.get_latest_revision().publish()
                published += 1
        self.stdout.write(
            f"old news: {made} page(s) made, {photos} photo(s) added, {alts} alt text(s) added, "
            f"{published} published, "
            f"{len(posts)} post(s) in the source"
        )

    def add_photo(self, page, post, images: Path) -> int:
        path = images / post["image_file"]
        if not path.is_file():
            self.stderr.write(f"{post['slug']}: no file {path}")
            return 0
        Image = get_image_model()
        with path.open("rb") as handle:
            image = Image(title=post["title"][:255], collection=news_collection())
            image.file.save(path.name, File(handle), save=False)
            image.save()
        clean_live = page.live and not page.has_unpublished_changes
        page = page.get_latest_revision_as_object() if page.has_unpublished_changes else page
        page.image = image
        page.image_alt = post.get("image_alt") or ""
        revision = page.save_revision()
        if clean_live:  # a live page with no draft keeps no draft: the photo goes live
            revision.publish()
        return 1

    def add_alt(self, page, post) -> int:
        """Give a photo with no alt text its post's alt text (T33). An editor's text stays."""
        clean_live = page.live and not page.has_unpublished_changes
        page = page.get_latest_revision_as_object() if page.has_unpublished_changes else page
        page.image_alt = post["image_alt"]
        revision = page.save_revision()
        if clean_live:  # same rule as the photo: a live page with no draft keeps no draft
            revision.publish()
        return 1
