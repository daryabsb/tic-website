"""T18: programs, the twelve parts, the regulatory-updates feed, the route helper and
the Iraq seed (master plan 05; D44)."""

import datetime

import pytest
from wagtail.contrib.redirects.models import Redirect
from zeneon_cms.contact import spam
from zeneon_cms.requests.models import RequestSchema, RoutingRule, Submission

from apps.news.models import NewsPage
from apps.programs.blocks import PART_NAMES
from apps.programs.models import ProgramIndexPage, ProgramPage, RegulatoryUpdatesPage
from apps.programs.rules import program_page_problems
from apps.services.intake import routing_facts, topic_pages
from apps.services.models import ServiceGroupPage

IRAQ_URL = "/en/programs/iraq-certificate-of-conformity/"


@pytest.fixture
def iraq(seeded_home):
    return ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )


def problems(page, **override):
    values = {
        "intro": page.intro,
        "summary": page.summary,
        "parts": page.parts,
        "regulator_name": page.regulator_name,
        "regulator_abbreviation": page.regulator_abbreviation,
        "appointment_status": page.appointment_status,
        "owning_office": page.owning_office,
        "reviewed": page.reviewed,
        "review_by": page.review_by,
    }
    values.update(override)
    return program_page_problems(**values)


def _complete_parts(page):
    raw = page.parts.raw_data
    for block in raw:
        if block["type"] == "who_must_comply":
            block["value"]["product_list_date"] = "2026-01-01"
    return raw


# -- seed ---------------------------------------------------------------------------------


def test_seed_builds_the_index_the_feed_and_the_iraq_page(iraq):
    index = iraq.get_parent().specific
    assert isinstance(index, ProgramIndexPage) and index.live
    assert index.url_path.endswith("/programs/")
    assert RegulatoryUpdatesPage.objects.child_of(index).live().exists()
    assert iraq.live and iraq.appointment_status == "appointed"
    assert iraq.appointment_date == datetime.date(2024, 5, 22)
    assert [block.block_type for block in iraq.parts] == PART_NAMES
    qa = next(block.value for block in iraq.parts if block.block_type == "qa")
    assert len(qa["questions"]) == 24  # the 23 of /iraq-coc/ and one from the Gujarat page


def test_the_seeded_page_lacks_only_what_baghdad_owes(iraq):
    assert problems(iraq) == [
        "Owning office: choose the office that owns this page.",
        "Last reviewed: set the date.",
        "Review by: set the date this page is checked again.",
        "02 Who must comply: set the date of the product list shown.",
    ]


def test_seed_is_idempotent_with_programs(iraq):
    from io import StringIO

    from django.core.management import call_command

    out = StringIO()
    call_command("seed_site", stdout=out)
    assert "0 change(s)" in out.getvalue()


def test_the_services_programs_card_goes_to_the_programs_section(iraq):
    group = ServiceGroupPage.objects.get(group="programs", locale__language_code="en")
    assert group.see_also.specific == iraq.get_parent().specific


def test_old_iraq_pages_redirect_to_the_one_program_page(iraq, client):
    for old in ("/iraq-coc/", "/iraq-verification-of-conformity-program/", "/iraq-coc-gujarat/"):
        redirect = Redirect.objects.get(old_path=old.rstrip("/"))
        assert redirect.is_permanent and redirect.link == IRAQ_URL
    assert (
        Redirect.objects.get(old_path="/government-services-programs-gsp").link == "/en/programs/"
    )


# -- the publish rule --------------------------------------------------------------------


def test_a_complete_page_may_be_published(iraq, home):
    page = iraq
    page.parts = _complete_parts(page)
    assert (
        problems(
            page,
            parts=page.parts,
            owning_office=home,
            reviewed=datetime.date(2026, 11, 1),
            review_by=datetime.date(2027, 5, 1),
        )
        == []
    )


def test_accredited_is_refused_in_the_appointment(iraq, home):
    complete = {
        "owning_office": home,
        "reviewed": datetime.date(2026, 11, 1),
        "review_by": datetime.date(2027, 5, 1),
    }
    iraq.parts = _complete_parts(iraq)
    found = problems(iraq, intro="TIC is accredited by COSQC.", **complete)
    assert len(found) == 1 and "not 'accredited'" in found[0]


def test_missing_and_misordered_parts(iraq):
    raw = iraq.parts.raw_data
    iraq.parts = [b for b in raw if b["type"] not in ("fees", "contacts")]
    assert "Add the missing parts: 07, 10." in problems(iraq, parts=iraq.parts)
    iraq.parts = [raw[1], raw[0], *raw[2:]]
    assert "Put the parts in their fixed order, 01 to 12." in problems(iraq, parts=iraq.parts)


# -- pages --------------------------------------------------------------------------------


def test_the_iraq_page_renders_all_twelve_parts(iraq, client):
    html = client.get(IRAQ_URL).content.decode()
    assert html.count('class="sec') == 11  # parts 01–11; 12 is the closing line
    assert "Appointed" in html and "Central Organization for Standardization" in html
    assert "22 May 2024" in html
    assert "Typical: [n] working days — to be agreed" in html
    assert "Who manages the COSQC ICIGI CoC Program?" in html
    assert "Last reviewed [date]" in html and "Owned by Baghdad office" in html
    assert "TICQC" not in html and "Programme" not in html


def test_route_answers_open_the_form_on_their_route(iraq, client):
    html = client.get(IRAQ_URL).content.decode()
    assert f"/en/request/?topic={iraq.pk}&amp;q_route=registration" in html
    page = client.get(f"/en/request/?topic={iraq.pk}&q_route=registration")
    flow = page.context["flow"]
    assert flow.step == 2 and flow.job_form.data["q_route"] == "registration"
    assert "Your route" in page.content.decode()


def test_the_program_page_lists_its_updates(iraq, client):
    html = client.get(IRAQ_URL).content.decode()
    assert "TIC and LOX begin issuing certificates" in html
    assert "Sep 2024" in html


def test_the_index_shows_status_words_and_the_pending_card(iraq, client):
    html = client.get("/en/programs/").content.decode()
    assert "Appointed · COSQC, 2024" in html
    assert "Saudi Arabia SFDA" in html and "Designation in progress" in html
    assert ProgramPage.objects.filter(title__icontains="SFDA").count() == 0  # never a program
    assert "We add a page only where we hold an appointment" in html


def test_the_feed_filters_by_program_and_year(iraq, client, home):
    index = iraq.get_parent().specific
    other = index.add_child(
        instance=ProgramPage(title="Egypt Certificate of Inspection", slug="egypt", country="Egypt")
    )
    other.save_revision().publish()
    news = NewsPage.objects.get(slug="iraqi-quality-mark").get_parent()
    news.add_child(
        instance=NewsPage(
            title="GOEIC notice",
            slug="goeic-notice",
            kind="regulatory_update",
            date=datetime.date(2025, 6, 30),
            program=other,
        )
    ).save_revision().publish()

    feed = "/en/programs/updates/"
    every = client.get(feed).content.decode()
    assert "GOEIC notice" in every and "Iraqi Quality Mark" in every
    egypt = client.get(f"{feed}?program={other.pk}").content.decode()
    assert "GOEIC notice" in egypt and "Iraqi Quality Mark" not in egypt
    year = client.get(f"{feed}?year=2024").content.decode()
    assert "GOEIC notice" not in year and "Iraqi Quality Mark" in year
    assert client.get(f"{feed}?program=abc&year=x").status_code == 200


def test_news_of_another_kind_is_not_an_update(iraq, client):
    news = NewsPage.objects.get(slug="iraqi-quality-mark").get_parent()
    news.add_child(
        instance=NewsPage(
            title="New office", slug="new-office", kind="news", date=datetime.date(2024, 10, 1)
        )
    ).save_revision().publish()
    assert "New office" not in client.get("/en/programs/updates/").content.decode()


# -- the request form ---------------------------------------------------------------------


def test_programs_follow_their_group_in_step_one(iraq):
    pages = [page.specific for page in topic_pages()]
    group = next(p for p in pages if isinstance(p, ServiceGroupPage) and p.group == "programs")
    assert pages[pages.index(group) + 1] == iraq


def test_the_program_schema_has_the_route_question(iraq):
    schema = RequestSchema.objects.get(topic=iraq.page_ptr)
    keys = [block.value["key"] for block in schema.questions]
    assert keys == ["country", "destination", "route"]


def test_a_program_request_from_iraq_reaches_baghdad(
    iraq, client, monkeypatch, django_capture_on_commit_callbacks
):
    monkeypatch.setattr(spam, "verify_turnstile", lambda request: spam.Turnstile.PASSED)
    monkeypatch.setattr("zeneon_cms.notify.delivery.in_background", lambda: False)
    RoutingRule.objects.filter(name="Baghdad office").update(email="baghdad@example.com")
    data = {
        "step": "3",
        "action": "next",
        "topic": str(iraq.pk),
        "q_country": "iraq",
        "q_destination": "Iraq",
        "q_route": "unregistered",
        "message": "Tiles to Basra",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "ts": "9000",
        "website": "",
    }
    with django_capture_on_commit_callbacks(execute=True):
        response = client.post("/en/request/", data, HTTP_ORIGIN="http://testserver")
    assert response.status_code == 303
    submission = Submission.objects.get()
    assert submission.routed_email == "baghdad@example.com"
    assert submission.answers["route"] == "unregistered"
    assert routing_facts(submission) == {
        "service_group": "programs",
        "program": "iraq-certificate-of-conformity",
    }
