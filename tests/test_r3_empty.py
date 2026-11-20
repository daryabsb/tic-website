"""Round 3 empty places (T40, D79; drop docs/design/drops/polish-2026-11-18/, rules part 4):
card grids all photos or all text cards, program cards as country tiles, the address plate
in place of a map, no empty photo plates, no empty sections."""

import re

import pytest

from apps.pages.templatetags.tic import after_country, all_photos

pytestmark = pytest.mark.django_db


def _get(client, url):
    response = client.get(url)
    assert response.status_code == 200, url
    return response.content.decode()


def _image():
    import io

    from django.core.files.images import ImageFile
    from PIL import Image as PILImage
    from wagtail.images import get_image_model

    buffer = io.BytesIO()
    PILImage.new("RGB", (80, 40), "grey").save(buffer, "JPEG")
    buffer.seek(0)
    image = get_image_model()(title="Test photo")
    image.file.save("t40.jpg", ImageFile(buffer, name="t40.jpg"), save=False)
    image.save()
    return image


def test_all_photos_is_true_only_for_a_full_set():
    assert all_photos([{"image": 1}, {"image": 2}], "image")
    assert not all_photos([{"image": 1}, {"image": None}], "image")
    assert not all_photos([], "image")


def test_after_country_drops_the_leading_country():
    assert after_country("Iraq Certificate of Conformity", "Iraq") == "Certificate of Conformity"
    assert after_country("Egypt · GOEIC", "Egypt") == "GOEIC"
    assert after_country("Saudi Arabia SFDA", "Saudi Arabia") == "SFDA"
    assert after_country("Certificate", "Iraq") == "Certificate"


def test_industries_hub_shows_text_cards_until_every_industry_has_a_photo(client, seeded_home):
    from apps.industries.models import IndustryPage

    html = _get(client, "/en/industries/")
    assert html.count('class="tcard"') == 8 and 'class="photo"' not in html.split("<footer")[0]

    image = _image()
    for industry in IndustryPage.objects.filter(locale__language_code="en").live():
        industry.header_image = image
        industry.save_revision().publish()
    html = _get(client, "/en/industries/")
    assert html.count('class="svc svc--sm"') == 8 and 'class="tcard"' not in html


def test_programs_hub_cards_are_country_tiles(client, seeded_home):
    html = _get(client, "/en/programs/")

    tile = re.search(r'<a class="ct" id="iraq-certificate-of-conformity".*?</a>', html, re.S)
    assert tile, "Iraq is a country tile"
    assert '<span class="ct__c">Iraq</span>' in tile.group(0)
    assert '<span class="ct__n">Certificate of Conformity</span>' in tile.group(0)
    assert '<div class="ct" id="soon-1">' in html  # in progress: a tile, not a link
    assert "ct__st--pending" in html
    assert "<img" not in html.split('class="cards"')[1].split("</div>\n")[0]


def test_home_program_cards_are_tiles_with_the_country(client, seeded_home):
    html = _get(client, "/en/")

    assert html.count('class="ct"') == 5
    assert '<span class="ct__c">Egypt</span><span class="ct__n">GOEIC</span>' in html
    assert "prog-grid" not in html


def test_the_seed_fills_a_blank_tile_country_and_keeps_an_editors(seeded_home):
    from django.core.management import call_command

    from apps.pages.models import HomePage

    home = HomePage.objects.get(pk=seeded_home.pk)
    raw = [dict(block) for block in home.sections.raw_data]
    block = next(b for b in raw if b["type"] == "programs")
    cards = [card.get("value", card) for card in block["value"]["cards"]]
    cards[1]["caption"] = ""  # Egypt, blank
    cards[2]["caption"] = "Botswana (BOBS)"  # an editor's caption
    home.sections = raw
    home.save_revision().publish()

    call_command("seed_site", verbosity=0)
    home = HomePage.objects.get(pk=seeded_home.pk)
    block = next(b for b in home.sections.raw_data if b["type"] == "programs")
    captions = [c.get("value", c)["caption"] for c in block["value"]["cards"]]
    assert captions[1] == "Egypt" and captions[2] == "Botswana (BOBS)"


def test_office_page_has_the_address_plate_and_no_empty_team_plate(client, seeded_home):
    html = _get(client, "/en/offices/dubai/")

    plate = re.search(r'<div class="addr">.*?</div>', html, re.S).group(0)
    assert '<span class="addr__city">Dubai</span>' in plate
    assert "Clover Bay Tower" in plate
    assert "office__map" not in html
    assert "office__team" not in html  # no team photo in the seed: no plate


def test_home_where_we_are_uses_the_head_office_photo(client, seeded_home):
    from apps.offices.models import OfficePage

    html = _get(client, "/en/")
    assert "offices__map" not in html  # no head-office photo yet: the text takes the width

    dubai = OfficePage.objects.get(locale__language_code="en", slug="dubai")
    dubai.header_image = _image()
    dubai.header_caption = "Dubai · Business Bay"
    dubai.save_revision().publish()
    html = _get(client, "/en/")
    assert '<a class="photo offices__map" href="/en/offices/dubai/">' in html
    assert "Dubai · Business Bay" in html


def test_home_news_section_is_not_drawn_when_nothing_is_published(client, seeded_home):
    html = _get(client, "/en/")  # latest_articles is empty until the news feed is wired
    assert "Regulatory updates and news" not in html
    assert "No updates published yet." not in html


def test_program_page_has_no_empty_updates_part(client, seeded_home):
    html = _get(client, "/en/programs/iraq-certificate-of-conformity/")

    assert "No changes published yet." not in html
    for anchor in re.findall(r'<a href="#([a-z_]+)"><span>\d\d</span>', html):
        assert f'id="{anchor}"' in html, anchor  # the table of contents follows the parts


def test_a_person_without_a_photo_gets_no_plate(client, seeded_home):
    html = _get(client, "/en/services/inspection/pre-shipment-inspection/")
    for person in re.findall(r'<div class="person">.*?</div>\s*</div>', html, re.S):
        assert 'class="photo"' not in person
