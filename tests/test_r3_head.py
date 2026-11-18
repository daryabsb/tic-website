"""Round 3 head and header (T38, D70, D71; drop docs/design/drops/polish-2026-11-18/)."""

from io import BytesIO

import pytest

pytestmark = pytest.mark.django_db


def _image():
    from django.core.files.images import ImageFile
    from PIL import Image as PILImage
    from wagtail.images import get_image_model

    buf = BytesIO()
    PILImage.new("RGB", (1800, 1200), "grey").save(buf, "JPEG")
    image = get_image_model()(title="Hull inspection")
    image.file.save("hull.jpg", ImageFile(buf, name="hull.jpg"), save=False)
    image.save()
    return image


def _publish(page, **fields):
    for name, value in fields.items():
        setattr(page, name, value)
    page.save_revision().publish()


def _marine():
    from apps.industries.models import IndustryPage

    return IndustryPage.objects.get(locale__language_code="en", slug="marine-and-shipping")


def test_header_is_one_row_with_the_logo_alone(client, seeded_home):
    html = client.get("/en/").content.decode()

    assert "hdr__name" not in html and "hdr__sep" not in html
    assert '<span class="sr-only">TIC Quality Control</span>' in html  # D70: hidden, not gone
    menu = html[html.index('<nav class="menu"') :]
    assert "/en/client-area/" in menu[: menu.index("</nav>")]  # Client area moves into the menu
    assert 'class="util__end"' in html


def test_a_page_with_a_photo_puts_the_text_beside_it_with_focal_point_crops(client, seeded_home):
    page = _marine()
    _publish(page, header_image=_image(), header_image_alt="An inspector at a ship's bow",
             header_caption="Dry dock · Hull inspection")

    html = client.get(page.url).content.decode()
    start = html.index('<div class="ph">')
    head = html[start : html.index("Dry dock · Hull inspection</div>", start) + 40]

    assert 'class="ph__tx"' in head and 'class="ph__im"' in head
    assert '<source media="(max-width: 860px)"' in head  # 3:2 under 860 px
    assert ".fill-1600x800" in head and ".fill-1200x800" in head  # crops follow the focal point
    assert '<div class="cap">Dry dock · Hull inspection</div>' in head
    assert "style=" not in head  # no inline styles


def test_a_page_without_a_photo_gets_the_band_head(client, seeded_home):
    page = _marine()
    html = client.get(page.url).content.decode()

    assert '<div class="ph band"><div class="wrap">' in html
    assert 'class="ph__im"' not in html


def test_a_short_intro_stays_in_the_head_and_a_long_one_moves_under_it(client, seeded_home):
    page = _marine()
    _publish(page, intro="Draft, ullage, bunker, on/off hire and cleanliness surveys.")
    html = client.get(page.url).content.decode()
    assert '<p class="ph__intro">Draft, ullage, bunker' in html
    assert "ph-more" not in html

    long = "x" * 161
    _publish(page, intro=long)
    html = client.get(page.url).content.decode()
    assert f'<p class="ph__intro">{long}' not in html  # D71: 160 characters at most in the head
    assert f'<div class="wrap ph-more"><p class="lead">{long}</p></div>' in html


def test_the_home_hero_has_the_photo_beside_the_text(client, seeded_home):
    html = client.get("/en/").content.decode()
    assert '<section class="ph hero band"' in html  # no photo yet: the band head

    _publish(seeded_home, hero_image=_image(), hero_image_alt="A container terminal")
    html = client.get("/en/").content.decode()
    assert '<section class="ph hero"' in html
    assert ".fill-1480x1040" in html and 'fetchpriority="high"' in html
