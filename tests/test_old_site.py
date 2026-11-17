"""T30: the old site's addresses and posts (master plan 10; D62)."""

import csv
import json

import pytest
from django.core.management import call_command
from wagtail.contrib.redirects.models import Redirect

from apps.news import oldsite
from apps.news.models import NewsPage
from apps.pages.management.commands import seed_site
from apps.services.models import ServicePage

# -- cleaning ------------------------------------------------------------------------


def test_titles_lose_math_letters_emoji_and_the_wrong_name():
    raw = "TICQC CEO 𝐑𝐚𝐧𝐝 elected 🇧🇷 &amp; the Programme 🎉"

    assert oldsite.clean_title(raw) == "TIC Quality Control CEO Rand elected & the Program"


def test_the_old_abbreviation_in_brackets_goes():
    """The house words would make "TIC Quality Control (TICQC)" say the name twice."""
    raw = (
        '<p><strong><a href="https://ticqc.ae/">TIC Quality Control</a> (TICQC)</strong>'
        " took part.</p>"
    )

    assert oldsite.clean_html(raw) == '<p><b><a href="/">TIC Quality Control</a></b> took part.</p>'
    assert oldsite.clean_title("Why TIC Quality Control (TICQC)") == "Why TIC Quality Control"
    assert oldsite.standfirst("TIC Quality Control (TICQC) is here. More.", 200) == (
        "TIC Quality Control is here."
    )


def test_html_keeps_the_body_features_only():
    raw = (
        '<h1 class="x"><strong>Title</strong></h1><p>A <strong>bold</strong> '
        '<a href="https://ticqc.ae/iraq-coc/">link</a> by TICQC.</p>'
        '<figure><img src="a.jpg"/><figcaption>cap</figcaption></figure><hr/>'
        "<h4>Small</h4><ul><li>one</li></ul>"
        "<table><tr><th>Item</th><th>Fee</th></tr><tr><td>CoC</td><td>[n]</td></tr></table>"
        "<script>x()</script><div><p>last</p></div>"
    )

    assert oldsite.clean_html(raw) == (
        '<h2>Title</h2><p>A <b>bold</b> <a href="/iraq-coc/">link</a> by TIC Quality '
        "Control.</p><h3>Small</h3><ul><li>one</li></ul><p>Item · Fee</p><p>CoC · [n]</p>"
        "<p>last</p>"
    )


def test_the_standfirst_is_the_first_sentence():
    excerpt = "<p>Egypt grows fast. Exporters must test. [&hellip;]</p>"

    assert oldsite.standfirst(excerpt, 300) == "Egypt grows fast."
    assert oldsite.standfirst("<p>" + "word " * 100 + "</p>", 40).endswith("…")
    joined = "<p>Why Egypt grows Egypt has become a market. More.</p>"
    clean = "<h2>Why Egypt grows</h2><p>Egypt has become a market. More.</p>"
    assert oldsite.standfirst(joined, 300, clean) == "Egypt has become a market."


# -- news import ---------------------------------------------------------------------


def _source(tmp_path):
    path = tmp_path / "old-news.json"
    path.write_text(
        json.dumps(
            {
                "posts": [
                    {
                        "old_path": "/iraqi-quality-mark/",
                        "slug": "iraqi-quality-mark",
                        "seeded": True,
                        "title": "Iraqi Quality Mark",
                        "date": "2024-09-26",
                        "excerpt": "",
                        "html": "",
                    },
                    {
                        "old_path": "/battery-export-egypt-compliance-testing/",
                        "slug": "batteries-export-to-egypt",
                        "seeded": False,
                        "title": "Batteries export to Egypt",
                        "date": "2026-04-29",
                        "excerpt": "<p>Egypt grows. More.</p>",
                        "html": "<h2>Why</h2><p>Text.</p>",
                        "image_file": "files/2026/04/battery.png",
                        "image_alt": "Batteries on a pallet",
                    },
                ]
            }
        ),
        encoding="utf-8",
    )
    return path


def test_old_posts_become_draft_news_pages_once(seeded_home, tmp_path):
    source = _source(tmp_path)
    call_command("import_old_news", source=source)
    call_command("import_old_news", source=source)

    page = NewsPage.objects.get(slug="batteries-export-to-egypt")
    assert not page.live and page.has_unpublished_changes
    assert page.kind == "news" and str(page.date) == "2026-04-29"
    assert page.standfirst == "Text."
    assert page.body == "<h2>Why</h2><p>Text.</p>"
    assert page.author is None
    assert NewsPage.objects.filter(slug="iraqi-quality-mark").count() == 1


def test_photos_come_from_the_old_media_folder_and_publish_goes_live(seeded_home, tmp_path):
    from PIL import Image as PILImage

    folder = tmp_path / "old-site" / "files" / "2026" / "04"
    folder.mkdir(parents=True)
    PILImage.new("RGB", (40, 20), "grey").save(folder / "battery.png")
    source = _source(tmp_path)

    call_command("import_old_news", source=source, images=tmp_path / "old-site", publish=True)
    call_command("import_old_news", source=source, images=tmp_path / "old-site", publish=True)

    page = NewsPage.objects.get(slug="batteries-export-to-egypt")
    assert page.live and not page.has_unpublished_changes
    assert page.image.collection.name == "News"
    assert page.image_alt == "Batteries on a pallet"
    assert page.image.width == 40


def test_the_repository_source_covers_every_old_post():
    with open(seed_site.SEED_DIR / "old-news.json", encoding="utf-8") as handle:
        posts = json.load(handle)["posts"]
    with open(seed_site.SEED_DIR / "redirects.csv", encoding="utf-8") as handle:
        rows = {row["old_path"]: row for row in csv.DictReader(handle)}

    assert len(posts) == 38
    assert all(post["image_file"] for post in posts)
    for post in posts:
        assert rows[post["old_path"]]["new_path"] == f"/en/news/{post['slug']}/"
        assert "TICQC" not in oldsite.clean_title(post["title"])


def test_every_old_address_has_a_redirect_row():
    from urllib.parse import unquote, urlsplit

    with open(seed_site.SEED_DIR / "old-urls.txt", encoding="utf-8") as handle:
        paths = {unquote(urlsplit(line.strip()).path) for line in handle if line.strip()}
    with open(seed_site.SEED_DIR / "redirects.csv", encoding="utf-8") as handle:
        rows = {row["old_path"] for row in csv.DictReader(handle)}

    assert paths - rows == {"/"}  # the core sends / to /en/


# -- redirects with a fallback -------------------------------------------------------


@pytest.fixture
def fallback_seed(tmp_path, monkeypatch):
    with (tmp_path / "redirects.csv").open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["old_path", "new_path", "fallback"])
        writer.writerow(
            [
                "/testing-oil-gas/",
                "/en/services/testing/oil-gas-and-petroleum-testing/",
                "/en/services/testing/",
            ]
        )
    monkeypatch.setattr(seed_site, "SEED_DIR", tmp_path)


def test_a_redirect_waits_on_the_fallback_until_the_page_is_live(
    seeded_home, fallback_seed, client
):
    target = ServicePage.objects.get(slug="oil-gas-and-petroleum-testing")
    assert not target.live
    call_command("seed_site", verbosity=0)

    redirect = Redirect.objects.get(old_path="/testing-oil-gas")
    assert redirect.redirect_page.slug == "testing"
    assert client.get("/testing-oil-gas/")["Location"].endswith("/en/services/testing/")

    type(target).objects.filter(pk=target.pk).update(live=True)
    call_command("seed_site", verbosity=0)

    redirect.refresh_from_db()
    assert redirect.redirect_page_id == target.pk


def test_an_edited_redirect_is_left_alone(seeded_home, fallback_seed):
    call_command("seed_site", verbosity=0)
    redirect = Redirect.objects.get(old_path="/testing-oil-gas")
    redirect.redirect_page = seeded_home
    redirect.save()
    ServicePage.objects.filter(slug="oil-gas-and-petroleum-testing").update(live=True)

    call_command("seed_site", verbosity=0)

    redirect.refresh_from_db()
    assert redirect.redirect_page_id == seeded_home.pk
