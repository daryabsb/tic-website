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


def test_a_stock_photo_comes_from_the_stock_folder_with_its_credit(seeded_home, tmp_path):
    from PIL import Image as PILImage

    stock = tmp_path / "stock" / "unsplash"
    stock.mkdir(parents=True)
    PILImage.new("RGB", (40, 20), "blue").save(stock / "abc.jpg")
    row = {
        **HERO,
        "file": "unsplash/abc.jpg",
        "source": "unsplash",
        "credit": "A Person, https://unsplash.com/photos/abc",
    }
    source = _source(tmp_path, [row])

    call_command("import_old_photos", source=source, images=tmp_path / "none")
    assert not HomePage.objects.get(pk=seeded_home.pk).hero_image_id

    call_command("import_old_photos", source=source, images=tmp_path / "none", stock=stock.parent)
    image = HomePage.objects.get(pk=seeded_home.pk).hero_image
    assert image.title.endswith("(Unsplash: A Person, https://unsplash.com/photos/abc)")


def test_the_repository_rows_name_seeded_pages_and_fields(seeded_home):
    with open(seed_site.SEED_DIR / "old-photos.json", encoding="utf-8") as handle:
        rows = json.load(handle)["photos"]
    with open(seed_site.SEED_DIR / "current-pages.json", encoding="utf-8") as handle:
        articles = {post["slug"] for post in json.load(handle)["posts"]}
    home = HomePage.objects.get(pk=seeded_home.pk)
    assert len(rows) >= 30
    for row in rows:
        page = find_page(home, row["page"])
        if page is None and row["page"].startswith("news/"):  # from import_old_news (T43)
            assert row["page"].removeprefix("news/") in articles, row["page"]
            assert row["field"] == "image", row["page"]
            continue
        assert page is not None, row["page"]
        assert hasattr(page, f"{row['field']}_id"), (row["page"], row["field"])
        if row.get("source") == "unsplash":  # D68: placeholders carry their credit
            assert row["file"].startswith("unsplash/")
            assert "https://unsplash.com/photos/" in row["credit"]
        elif row.get("source") == "tic":
            assert row["file"].startswith("tic/")
        elif row.get("source") == "design":  # T40, D79: the design drop's photo, not in git
            assert row["file"].startswith("design/")
        else:
            assert row["file"].startswith("files/")
        assert 0 < len(row["alt"]) <= 200
        assert "TICQC" not in row["alt"] and "TIC QC" not in row["alt"]


def test_a_row_replaces_only_the_photo_it_names(seeded_home, tmp_path):
    """T40, D79: Business Bay swaps the Dubai stock photo, never an editor's photo."""
    from PIL import Image as PILImage

    from apps.offices.models import OfficePage

    stock = tmp_path / "stock"
    (stock / "unsplash").mkdir(parents=True)
    (stock / "design").mkdir()
    PILImage.new("RGB", (40, 20), "grey").save(stock / "unsplash" / "OLDSTEM.jpg")
    PILImage.new("RGB", (40, 20), "blue").save(stock / "design" / "bay.jpg")
    old = {
        "page": "offices/dubai",
        "field": "header_image",
        "file": "unsplash/OLDSTEM.jpg",
        "alt": "Old",
        "source": "unsplash",
        "credit": "X, https://unsplash.com/photos/x",
    }
    new = {
        "page": "offices/dubai",
        "field": "header_image",
        "file": "design/bay.jpg",
        "alt": "Business Bay",
        "caption": "Dubai · Business Bay",
        "source": "design",
        "replaces": "OLDSTEM",
    }
    none = tmp_path / "none"
    call_command("import_old_photos", source=_source(tmp_path, [old]), images=none, stock=stock)
    call_command("import_old_photos", source=_source(tmp_path, [new]), images=none, stock=stock)
    dubai = OfficePage.objects.get(locale__language_code="en", slug="dubai")
    assert dubai.header_image.title == "Business Bay"
    assert dubai.header_caption == "Dubai · Business Bay"

    call_command("import_old_photos", source=_source(tmp_path, [new]), images=none, stock=stock)
    assert OfficePage.objects.get(pk=dubai.pk).header_image_id == dubai.header_image_id
