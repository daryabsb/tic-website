"""apps.pages: the HomePage, its sections and the shared parts (gate 0)."""

import pytest
from wagtail.models import Site

from apps.pages.blocks import HOME_SECTIONS
from apps.pages.models import HomePage

pytestmark = pytest.mark.django_db


def test_fresh_database_has_a_home_page_as_the_site_root(home):
    site = Site.objects.get(is_default_site=True)

    assert site.root_page.specific == home
    assert home.live
    assert len(home.sections) == 0


def test_home_page_exists_in_both_languages():
    codes = set(HomePage.objects.values_list("locale__language_code", flat=True))

    assert codes == {"en", "ar"}


def test_root_redirects_to_english(client):
    response = client.get("/")

    assert response.status_code == 301
    assert response["Location"].endswith("/en/")


@pytest.mark.parametrize(("language", "direction"), [("en", "ltr"), ("ar", "rtl")])
def test_home_answers_in_each_language_with_its_direction(client, language, direction):
    response = client.get(f"/{language}/")

    assert response.status_code == 200
    html = response.content.decode()
    assert f'<html lang="{language}" dir="{direction}">' in html


def test_home_sections_follow_the_proposal_order():
    """Proposal 01 §5.2 items 2 to 8, after the hero fields."""
    assert [name for name, _ in HOME_SECTIONS] == [
        "proof_strip",
        "cards",
        "dark_band",
        "link_list",
        "programs",
        "offices",
        "news",
        "contact_band",
    ]


def test_hero_renders_the_one_sentence_and_two_buttons(client, home):
    html = client.get("/en/").content.decode()

    assert home.hero_heading in html
    assert "Request a quote" in html
    assert "Verify a certificate" in html
    # No photo yet: the grey plate with the note, never a stock image.
    assert "to be supplied by the office" in html


def test_seed_fills_the_home_page_and_is_idempotent(client, seeded_home):
    from io import StringIO

    from django.core.management import call_command

    assert seeded_home.hero_caption == "Umm Qasr · Discharge survey"
    assert [block.block_type for block in seeded_home.sections] == [
        name for name, _ in HOME_SECTIONS
    ]

    html = client.get("/en/").content.decode()
    assert "AI-3314" in html  # the proof strip
    assert "What do you need?" in html
    assert "Why TIC" in html
    assert "Export programs" in html

    out = StringIO()
    call_command("seed_site", stdout=out)
    assert "0 change(s)" in out.getvalue()


def test_a_figure_without_an_owner_is_not_rendered(client, home):
    """Nothing invented: a number nobody sourced does not appear."""
    home.sections = [
        {
            "type": "dark_band",
            "value": {
                "heading": "Why TIC",
                "text": "x",
                "figures": [
                    {"value": "999", "label": "Unsourced", "owner": ""},
                    {"value": "12", "label": "Sourced", "owner": "Proposal"},
                ],
            },
        }
    ]
    home.save_revision().publish()

    html = client.get("/en/").content.decode()

    assert "Unsourced" not in html
    assert "Sourced" in html


def test_language_select_offers_english_first_and_selected(client):
    html = client.get("/en/").content.decode()

    assert '<select id="lang"' in html
    assert "selected>English</option>" in html
    assert ">العربية</option>" in html
    assert html.index(">English</option>") < html.index(">العربية</option>")


def test_header_uses_the_official_logo_file_and_footer_ends_with_the_tagline_band(client):
    html = client.get("/en/").content.decode()

    assert 'class="hdr__logo" src="/static/img/logo/tic-logo-primary.png"' in html
    assert html.rstrip().endswith("</html>")
    body = html[html.index("<footer") :]
    assert "tic-tagline-bar.png" in body
    assert body.index("tic-tagline-bar.png") > body.index("foot__bottom")


def test_not_found_page_is_branded_and_in_the_language_of_the_path(client):
    response = client.get("/ar/nothing-here/")

    assert response.status_code == 404
    html = response.content.decode()
    assert '<html lang="ar" dir="rtl">' in html
    assert "404" in html
