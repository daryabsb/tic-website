"""T12 Search and 404: pages, documents and questions in one list with tabs; drafts and
other languages left out; the 404 page carries the search box (D31)."""

import pytest
from django.core.files.base import ContentFile
from wagtail.documents import get_document_model

pytestmark = pytest.mark.django_db

SEARCH = "/en/search/"


def _html(client, **params):
    response = client.get(SEARCH, params)
    assert response.status_code == 200
    return response.content.decode()


def test_the_empty_search_page_has_the_form_and_the_verify_note(seeded_home, client):
    html = _html(client)

    assert 'name="q"' in html
    assert 'href="/en/verify/"' in html
    assert '<meta name="robots" content="noindex">' in html
    assert 'class="res"' not in html


def test_a_service_page_is_found_with_its_section(seeded_home, client):
    html = _html(client, q="pre-shipment")

    assert 'href="/en/services/inspection/pre-shipment-inspection/"' in html
    assert '<span class="eyebrow">Service</span><b>Pre-shipment Inspection (PSI)</b>' in html
    assert "<em>Services › Inspection</em>" in html


def test_text_in_the_page_body_is_found(seeded_home, client):
    """"Superintend" is only in the Agriculture & Food intro, not in a title."""
    html = _html(client, q="superintend")

    assert 'href="/en/industries/agriculture-and-food/"' in html
    assert '<span class="eyebrow">Industry</span>' in html


def test_drafts_are_not_found(seeded_home, client):
    html = _html(client, q="GAFTA superintendence")

    assert 'href="/en/services/inspection/gafta-superintendence/"' not in html


def test_a_question_is_found_and_links_to_its_part(seeded_home, client):
    html = _html(client, q="goods fail")

    assert '<span class="eyebrow">Question</span><b>What if the goods fail?</b>' in html
    assert 'href="/en/services/inspection/pre-shipment-inspection/#qa"' in html


def test_a_document_is_found_under_downloads(seeded_home, client):
    get_document_model().objects.create(
        title="Iraq CoC regulated product list", file=ContentFile(b"%PDF-1.4", name="list.pdf")
    )
    html = _html(client, q="regulated product list")

    assert '<span class="eyebrow">Download</span><b>Iraq CoC regulated product list</b>' in html


def test_the_tabs_filter_the_results(seeded_home, client):
    html = _html(client, q="inspection", type="questions")
    assert '<span class="eyebrow">Service</span>' not in html
    assert 'class="tab on" href="?q=inspection&amp;type=questions"' in html

    html = _html(client, q="inspection", type="services")
    assert '<span class="eyebrow">Service</span>' in html

    html = _html(client, q="inspection", type="nonsense")
    assert 'class="tab on" href="?q=inspection"' in html


def test_nothing_found_says_so(seeded_home, client):
    html = _html(client, q="zzzqqq")

    assert "0 results" in html
    assert "Nothing found" in html


def test_the_search_is_in_the_language_of_the_path(seeded_home, client):
    """No Arabic pages are seeded yet, so an English word finds nothing under /ar/."""
    response = client.get("/ar/search/", {"q": "pre-shipment"})

    assert response.status_code == 200
    assert "/en/services/" not in response.content.decode()


def test_the_404_page_has_the_search_box_and_the_four_links(client):
    response = client.get("/en/nothing-here/")
    html = response.content.decode()

    assert response.status_code == 404
    assert 'action="/en/search/"' in html
    for path in ("programs/", "services/", "verify/", "contact/"):
        assert f'href="/en/{path}"' in html
