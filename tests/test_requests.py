"""T17: the quote form, routing and emails (master plan 07; D39, D41)."""

import pytest
from django.core import mail
from wagtail.models import Page
from zeneon_cms.contact import spam
from zeneon_cms.requests.models import RequestSchema, RoutingRule, Submission

from apps.services.intake import office_for, routing_facts, topic_pages
from apps.services.models import ServiceGroupPage, ServicePage


@pytest.fixture
def psi(seeded_home):
    return ServicePage.objects.get(slug="pre-shipment-inspection", locale__language_code="en")


@pytest.fixture
def passed_captcha(monkeypatch):
    monkeypatch.setattr(spam, "verify_turnstile", lambda request: spam.Turnstile.PASSED)
    monkeypatch.setattr("zeneon_cms.notify.delivery.in_background", lambda: False)


def quote(client, topic, country="iraq", **extra):
    data = {
        "step": "3",
        "action": "next",
        "topic": str(topic.pk),
        "q_country": country,
        "message": "200 cartons of tiles to Basra",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "ts": "9000",
        "website": "",
        **extra,
    }
    return client.post("/en/request/", data, HTTP_ORIGIN="http://testserver")


def test_every_topic_has_the_quote_questions(psi):
    topics = [*ServiceGroupPage.objects.filter(locale__language_code="en"), psi, None]
    for topic in topics:
        schema = RequestSchema.for_page(topic)
        keys = [block.value["key"] for block in schema.questions]
        assert keys == ["country", "destination"], topic
    country = RequestSchema.for_page(psi).questions[0].value
    assert country["required"] and "iraq" in [option["key"] for option in country["options"]]


def test_the_routing_table_is_seeded_without_invented_addresses(seeded_home):
    rules = {rule.name: rule for rule in RoutingRule.objects.all()}
    baghdad = rules["Baghdad office"]
    assert [(c.field, c.value) for c in baghdad.conditions.all()] == [("country", "iraq")]
    assert baghdad.email == ""  # offices.yaml still has "[office email]"
    fallback = RoutingRule.objects.order_by("-priority").first()
    assert (fallback.email, fallback.conditions.count()) == ("info@ticqc.com", 0)
    assert rules["Head office, Dubai (training)"].conditions.get().value == "training"


def test_a_second_seed_run_changes_no_request_data(seeded_home):
    from django.core.management import call_command

    before = (RequestSchema.objects.count(), RoutingRule.objects.count())
    call_command("seed_site", verbosity=0)
    assert (RequestSchema.objects.count(), RoutingRule.objects.count()) == before


def test_step_one_offers_groups_then_their_services(psi):
    pages = topic_pages()
    inspection = pages.index(psi.get_parent().specific)
    assert pages[inspection + 1] == psi
    assert all(page.live and page.locale.language_code == "en" for page in pages)


def test_the_service_page_opens_the_form_on_its_topic(client, psi):
    html = client.get(psi.url).content.decode()
    assert f'href="/en/request/?topic={psi.pk}"' in html
    form = client.get(f"/en/request/?topic={psi.pk}").content.decode()
    assert "Your country" in form and 'name="q_country"' in form
    assert 'class="page-head page-head--band"' in form


def test_a_quote_from_iraq_reaches_the_baghdad_address(
    client, psi, passed_captcha, django_capture_on_commit_callbacks
):
    RoutingRule.objects.filter(name="Baghdad office").update(email="baghdad@example.com")
    with django_capture_on_commit_callbacks(execute=True):
        response = quote(client, psi)
    assert response.status_code == 303
    submission = Submission.objects.get()
    assert (submission.routed_to, submission.routed_email) == (
        "Baghdad office",
        "baghdad@example.com",
    )
    by_to = {message.to[0]: message for message in mail.outbox}
    staff, client_mail = by_to["baghdad@example.com"], by_to["sara@example.com"]
    assert staff.to == ["baghdad@example.com"] and submission.code in staff.subject
    assert client_mail.to == ["sara@example.com"]
    html = client_mail.alternatives[0][0]
    assert submission.code in html and "Baghdad office" in html and "tic-logo-480.png" in html
    assert "Baghdad office" in client_mail.body
    sent = client.get(response["Location"]).content.decode()
    assert submission.code in sent and "Baghdad office" in sent


def test_without_an_office_address_the_head_office_gets_it(
    client, psi, passed_captcha, django_capture_on_commit_callbacks
):
    with django_capture_on_commit_callbacks(execute=True):
        quote(client, psi)
    submission = Submission.objects.get()
    assert (submission.routed_to, submission.routed_email) == (
        "Head office, Dubai",
        "info@ticqc.com",
    )
    assert office_for(submission).name == "Head office, Dubai"


def test_training_goes_to_the_head_office_whatever_the_country(psi):
    training = ServiceGroupPage.objects.get(slug="training", locale__language_code="en")
    submission = Submission(topic=Page.objects.get(pk=training.pk), answers={"country": "iraq"})
    assert routing_facts(submission) == {"service_group": "training"}
    assert routing_facts(Submission(topic=psi.page_ptr)) == {"service_group": "inspection"}
    assert routing_facts(Submission(topic=None)) == {}


def test_a_post_without_the_country_stays_on_the_form(client, psi, passed_captcha):
    response = quote(client, psi, country="")
    assert response.status_code == 200
    assert not Submission.objects.exists()
    assert "field--error" in response.content.decode()
