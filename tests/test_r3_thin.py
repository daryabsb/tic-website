"""Round 3 thin pages (T41, D80; drop R3-Industry-Marine, rules part 5): the industry body
fills from linked data in the order services, offices, programs, updates; an empty one is
not drawn; one or two sit in two columns; the red contact band never follows the head."""

import re

import pytest

pytestmark = pytest.mark.django_db


def _get(client, url):
    response = client.get(url)
    assert response.status_code == 200, url
    return response.content.decode()


def _sections(html):
    return re.findall(r'<section class="thin__sec" aria-labelledby="ind-([a-z]+)">', html)


def _marine():
    from apps.industries.models import IndustryPage

    return IndustryPage.objects.get(locale__language_code="en", slug="marine-and-shipping")


def test_marine_shows_its_seeded_service_in_two_columns(client, seeded_home):
    html = _get(client, "/en/industries/marine-and-shipping/")

    assert _sections(html) == ["services"]
    assert '<div class="wrap thin thin--two">' in html
    assert "Marine and cargo surveys" in html


def test_the_sections_keep_their_order_and_drop_when_empty(client, seeded_home):
    html = _get(client, "/en/industries/agriculture-and-food/")

    assert _sections(html) == ["services", "programs", "updates"]  # no offices chosen
    assert '<div class="wrap thin">' in html  # three sections: one column
    assert '<a class="ct" href="/en/programs/iraq-certificate-of-conformity/">' in html


def test_chosen_offices_come_after_the_services(client, seeded_home):
    from apps.offices.models import OfficePage

    marine = _marine()
    dubai = OfficePage.objects.get(locale__language_code="en", slug="dubai")
    marine.offices = [("office", dubai)]
    marine.save_revision().publish()
    html = _get(client, marine.url)

    assert _sections(html) == ["services", "offices"]
    assert '<h2 class="h2" id="ind-offices">Offices</h2>' in html


def test_with_nothing_linked_the_office_list_stands_between_head_and_band(client, seeded_home):
    marine = _marine()
    marine.services = []
    marine.why_text = ""  # T43 gave Marine the current site's text: take it away again
    marine.where_points = []
    marine.save_revision().publish()
    html = _get(client, marine.url)

    assert _sections(html) == ["offices"]
    assert '<h2 class="h2" id="ind-offices">Our offices</h2>' in html
    head_end = html.index('<div class="fb')
    band = html.index('class="cta', head_end)
    assert html.index('class="wrap thin', head_end) < band
