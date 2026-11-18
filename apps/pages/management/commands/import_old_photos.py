"""Put the old site's photos on the pages (T36, D32).

    python manage.py import_old_photos --images DIR [--stock DIR] [--source seed/old-photos.json]

Each row of ``seed/old-photos.json`` names a page (its path under the English home,
"" for the home page), a photo field, a file in the old site's media folder
(``fetch_old_media.py``, on stms-data), its alt text and, optionally, a caption. Each
photo was chosen by sight. A field that already has a photo is left alone, so an
editor's choice stays and the command can run again. The alt text and the caption are
set only with the photo: a caption that names a place the photo does not show is
cleared ("" in the row). A live page without a draft stays without a draft; a page
with a draft gets the photo in its draft. Photos go to the "Pages" collection.

A row with ``"source": "unsplash"`` is a stock photo (D68): a staging placeholder until
TIC sends its own. Its file is under ``--stock`` (``~/tic/stock`` on stms-data, not in
git), and the image title carries its ``credit`` (photographer and photo page), so the
placeholders are easy to find in the Images library and swap before launch. A row with
``"source": "tic"`` is TIC's own new photo (for example one Darya took), also under
``--stock``.
"""

import json
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from wagtail.images import get_image_model
from wagtail.models import Collection, Locale

from apps.pages.models import HomePage

COLLECTION = "Pages"
STOCK_SOURCES = ("unsplash", "tic")  # files under --stock, not in the old site
CAPTION_FIELDS = {
    "hero_image": "hero_caption",
    "header_image": "header_caption",
    "photo": "photo_caption",
    "team_photo": "team_caption",
}


def pages_collection() -> Collection:
    root = Collection.get_first_root_node()
    found = root.get_children().filter(name=COLLECTION).first()
    return found or root.add_child(name=COLLECTION)


def find_page(home, path: str):
    page = home
    for slug in [part for part in path.split("/") if part]:
        page = page.get_children().filter(slug=slug).first()
        if page is None:
            return None
    return page.specific


class Command(BaseCommand):
    help = "Put the old site's photos on pages whose photo field is empty (idempotent)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--source", type=Path, default=Path(settings.BASE_DIR) / "seed" / "old-photos.json"
        )
        parser.add_argument("--images", type=Path, required=True)
        parser.add_argument("--stock", type=Path, default=None)

    def handle(self, *args, source: Path, images: Path, stock: Path | None, **options):
        rows = json.loads(source.read_text(encoding="utf-8"))["photos"]
        home = HomePage.objects.filter(locale=Locale.get_default()).first()
        if home is None:
            raise CommandError("no home page in the default language")
        added = kept = missing = 0
        for row in rows:
            page = find_page(home, row["page"])
            if page is None:
                self.stderr.write(f"{row['page'] or '/'}: no page")
                missing += 1
                continue
            current = page.get_latest_revision_as_object() if page.has_unpublished_changes else page
            if getattr(current, f"{row['field']}_id"):
                kept += 1
                continue
            base = stock if row.get("source") in STOCK_SOURCES else images
            if base is None:
                self.stderr.write(f"{row['page'] or '/'}: stock photo, no --stock")
                missing += 1
                continue
            path = base / row["file"]
            if not path.is_file():
                self.stderr.write(f"{row['page'] or '/'}: no file {path}")
                missing += 1
                continue
            self.add_photo(page, current, row, path)
            added += 1
        self.stdout.write(
            f"old photos: {added} added, {kept} kept (already set), {missing} missing, "
            f"{len(rows)} row(s) in the source"
        )

    def add_photo(self, page, current, row, path: Path) -> None:
        Image = get_image_model()
        with path.open("rb") as handle:
            title = row["alt"]
            if row.get("source") == "unsplash" and row.get("credit"):
                title = f"{title} (Unsplash: {row['credit']})"
            image = Image(title=title[:255], collection=pages_collection())
            image.file.save(path.name, File(handle), save=False)
            image.save()
        clean_live = page.live and not page.has_unpublished_changes
        field = row["field"]
        setattr(current, field, image)
        if hasattr(current, f"{field}_alt"):
            setattr(current, f"{field}_alt", row["alt"])
        caption = CAPTION_FIELDS.get(field)
        if caption and "caption" in row and hasattr(current, caption):
            setattr(current, caption, row["caption"])
        revision = current.save_revision()
        if clean_live:  # a live page with no draft keeps no draft: the photo goes live
            revision.publish()
