"""T11 Industries: the hub and eight industry pages from seed, Agriculture & Food filled;
service cards go to a live page; a figure without an owner is not shown (D29)."""

import pytest

from apps.industries.models import IndustryIndexPage, IndustryPage
from apps.services.models import ServicePage

pytestmark = pytest.mark.django_db

HUB_URL = "/en/industries/"
FOOD_URL = "/en/industries/agriculture-and-food/"


def test_seed_builds_the_hub_and_eight_live_industries(seeded_home):
    index = IndustryIndexPage.objects.get(locale__language_code="en")
    industries = list(index.get_children().specific())

    assert index.live and index.show_in_menus
    assert len(industries) == 8
    assert all(isinstance(page, IndustryPage) and page.live for page in industries)
    assert industries[0].slug == "agriculture-and-food"


def test_the_hub_lists_the_eight_industries(seeded_home, client):
    response = client.get(HUB_URL)
    html = response.content.decode()

    assert response.status_code == 200
    assert "Eight industries" in html
    assert html.count('class="svc svc--sm"') == 8
    assert FOOD_URL in html
    assert "Government &amp; Public Sector" in html


def test_the_food_page_renders_its_parts(seeded_home, client):
    response = client.get(FOOD_URL)
    html = response.content.decode()

    assert response.status_code == 200
    assert "Services for food and agricultural trade" in html
    assert html.count('class="svc svc--text"') == 6
    assert "Why food traders use TIC" in html
    assert "Transit and testing: Guangzhou, Maharagama" in html
    assert "Kandla · Rice loading" in html


def test_cards_link_a_live_service_or_its_group(seeded_home, client):
    """PSI is live; GAFTA superintendence is a draft, so its card goes to Inspection."""
    html = client.get(FOOD_URL).content.decode()

    assert 'href="/en/services/inspection/pre-shipment-inspection/"' in html
    assert 'href="/en/services/inspection/gafta-superintendence/"' not in html
    assert 'href="/en/services/inspection/"' in html
    assert (
        '<span class="eyebrow">Inspection</span><b class="svc__title">Pre-shipment inspection'
        in html
    )


def test_a_card_to_a_live_service_uses_the_service_page(seeded_home, client):
    gafta = ServicePage.objects.get(slug="gafta-superintendence", locale__language_code="en")
    gafta.save_revision().publish()

    html = client.get(FOOD_URL).content.decode()
    assert 'href="/en/services/inspection/gafta-superintendence/"' in html


def test_a_figure_without_an_owner_is_not_shown(seeded_home, client):
    html = client.get(FOOD_URL).content.decode()

    assert "GAFTA</b><span>Approved superintendent, India" in html
    assert "17020</b>" in html
    assert "Food shipments inspected in 2025" not in html


def test_a_short_industry_page_renders_its_head(seeded_home, client):
    response = client.get("/en/industries/marine-and-shipping/")

    assert response.status_code == 200
    assert "Marine &amp; Shipping" in response.content.decode()
