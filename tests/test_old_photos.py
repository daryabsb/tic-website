"""The old site's photos on the pages (T36, D32)."""

import json

import pytest
from django.core.management import call_command

from apps.pages.management.commands import seed_site
from apps.pages.management.commands.import_old_photos import find_page
from apps.pages.models import HomePage

pytestmark = pytest.mark.django_db


def _images(tmp_path):
    from PIL import Image as PILImage

    folder = tmp_path / "old-site" / "files" / "2024" / "06"
    folder.mkdir(parents=True)
    PILImage.new("RGB", (40, 20), "grey").save(folder / "port.jpg")
    return tmp_path / "old-site"


def _source(tmp_path, rows):
    path = tmp_path / "old-photos.json"
    path.write_text(json.dumps({"photos": rows}), encoding="utf-8")
    return path


HERO = {
    "page": "",
    "field": "hero_image",
    "file": "files/2024/06/port.jpg",
    "alt": "A container ship at a port",
    "caption": "",
}


def test_an_empty_hero_gets_the_photo_alt_and_caption_and_stays_live(seeded_home, tmp_path):
    home = HomePage.objects.get(pk=seeded_home.pk)
    assert home.hero_caption and not home.hero_image_id
    source, images = _source(tmp_path, [HERO]), _images(tmp_path)

    call_command("import_old_photos", source=source, images=images)
    call_command("import_old_photos", source=source, images=images)

    home = HomePage.objects.get(pk=seeded_home.pk)
    assert home.hero_image.collection.name == "Pages"
    assert home.hero_image_alt == "A container ship at a port"
    assert home.hero_caption == ""
    assert home.live and not home.has_unpublished_changes
    from wagtail.images import get_image_model

    assert get_image_model().objects.count() == 1


def test_a_photo_an_editor_chose_stays(seeded_home, tmp_path):
    from wagtail.images import get_image_model
    from wagtail.images.tests.utils import get_test_image_file

    chosen = get_image_model().objects.create(title="Editor's", file=get_test_image_file())
    home = HomePage.objects.get(pk=seeded_home.pk)
    home.hero_image = chosen
    home.save_revision().publish()

    call_command("import_old_photos", source=_source(tmp_path, [HERO]), images=_images(tmp_path))

    assert HomePage.objects.get(pk=seeded_home.pk).hero_image_id == chosen.pk


def test_the_repository_rows_name_seeded_pages_and_fields(seeded_home):
    with open(seed_site.SEED_DIR / "old-photos.json", encoding="utf-8") as handle:
        rows = json.load(handle)["photos"]
    home = HomePage.objects.get(pk=seeded_home.pk)
    assert len(rows) >= 30
    for row in rows:
        page = find_page(home, row["page"])
        assert page is not None, row["page"]
        assert hasattr(page, f"{row['field']}_id"), (row["page"], row["field"])
        assert row["file"].startswith("files/")
        assert 0 < len(row["alt"]) <= 200
        assert "TICQC" not in row["alt"] and "TIC QC" not in row["alt"]
