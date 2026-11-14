"""T26: the contact page, the consent banner and the quote event (master plan 11; D57)."""

import pytest
from zeneon_cms.contact import spam
from zeneon_cms.core.models import SiteSettings

from apps.offices.models import ContactPage, OfficePage
from apps.programs.models import ProgramPage
from apps.trust.models import ContentPage


@pytest.fixture
def seeded(seeded_home):
    return seeded_home


@pytest.fixture
def umami(seeded):
    row = SiteSettings.load()
    row.umami_website_id = "tic-test-site"
    row.save()
    return row


def html(client, url):
    response = client.get(url)
    assert response.status_code == 200, url
    return response.content.decode()


def test_the_contact_page_comes_from_the_seed(client, seeded):
    page = ContactPage.objects.get(locale__language_code="en")
    assert page.url == "/en/contact/" and page.show_in_menus
    body = html(client, page.url)
    assert '<a href="/en/contact/"' in html(client, "/en/")  # the header item
    assert 'href="/en/request/"' in body and "Request a quote" in body
    dubai = OfficePage.objects.get(is_head_office=True, locale__language_code="en")
    assert "Head office · Dubai" in body and dubai.address in body
    offices = OfficePage.objects.live().filter(locale__language_code="en")
    assert body.count('class="office-card"') == offices.count()
    assert 'href="/en/verify/"' in body


def test_no_analytics_before_consent(client, umami):
    response = client.get("/en/")
    body = response.content.decode()
    assert not response.cookies  # no cookie on a public page
    assert '<script defer src="/stats/script.js"' not in body  # Umami waits for "Accept"
    assert "zeneon/seo/consent.js" in body and 'data-website-id="tic-test-site"' in body
    assert '<div class="consent" data-consent hidden' in body
    assert "data-consent-open" in body  # the footer link to change the choice
    # The privacy page is a draft until Legal supplies it: no link to a missing page.
    assert "/en/about/privacy/" not in body.split('class="consent"')[1]
    ContentPage.objects.get(slug="privacy", locale__language_code="en").save_revision().publish()
    banner = html(client, "/en/").split('class="consent"')[1]
    assert 'href="/en/about/privacy/"' in banner


def test_without_a_website_id_there_is_no_banner(client, seeded):
    body = html(client, "/en/")
    assert "consent.js" not in body and 'class="consent"' not in body
    assert "data-consent-open" not in body


def test_a_sent_quote_carries_its_umami_event(
    client, umami, monkeypatch, django_capture_on_commit_callbacks
):
    monkeypatch.setattr(spam, "verify_turnstile", lambda request: spam.Turnstile.PASSED)
    monkeypatch.setattr("zeneon_cms.notify.delivery.in_background", lambda: False)
    iraq = ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )
    data = {
        "step": "3",
        "action": "next",
        "topic": str(iraq.pk),
        "q_country": "iraq",
        "q_destination": "Iraq",
        "q_route": "unregistered",
        "message": "Two containers of tiles.",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "ts": "9000",
        "website": "",
    }
    with django_capture_on_commit_callbacks(execute=True):
        response = client.post("/en/request/", data, HTTP_ORIGIN="http://testserver")
    assert response.status_code == 303
    sent = html(client, response["Location"])
    assert 'data-umami-track="quote-sent"' in sent
    assert 'data-umami-data-office="Baghdad office"' in sent
    assert 'data-umami-data-service-group="programs"' in sent
    assert "data-request-event" not in sent  # one event only
