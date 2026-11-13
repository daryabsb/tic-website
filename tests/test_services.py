"""T10 Services: the hub, the groups and the service page from seed; the publish rule
(all eleven parts in order; the partner laboratory on testing pages); the Person card
(D26)."""

from io import StringIO

import pytest
from django.core.management import call_command
from wagtail.models import Page
from wagtail.test.utils.form_data import inline_formset, nested_form_data, streamfield

from apps.people.models import Person
from apps.services.blocks import PART_NAMES
from apps.services.models import Partner, ServiceGroupPage, ServiceIndexPage, ServicePage
from apps.services.rules import service_page_problems

pytestmark = pytest.mark.django_db

PSI_URL = "/en/services/inspection/pre-shipment-inspection/"


@pytest.fixture
def psi(seeded_home):
    return ServicePage.objects.get(slug="pre-shipment-inspection", locale__language_code="en")


def _complete(psi, *, office):
    """The PSI parts with the three things the seed leaves for a director: the named
    contact, the review date and the owning office."""
    person = Person.objects.create(name="A. Inspector", title="Head of inspection services")
    raw = psi.parts.raw_data
    for block in raw:
        if block["type"] == "contact":
            block["value"]["person"] = person.pk
        if block["type"] == "reviewed":
            block["value"]["date"] = "2026-11-11"
            block["value"]["office"] = office.pk
    psi.parts = list(raw)
    psi.save()
    return ServicePage.objects.get(pk=psi.pk)


# -- seed and templates ---------------------------------------------------------------


def test_seed_builds_the_hub_seven_groups_and_the_psi_page(seeded_home):
    index = ServiceIndexPage.objects.get(locale__language_code="en")
    groups = list(index.get_children().specific())

    assert index.live and index.show_in_menus
    assert [g.group for g in groups] == [
        "inspection",
        "testing",
        "certification",
        "programs",
        "audits",
        "training",
        "sustainability",
    ]
    assert all(g.live for g in groups)
    psi = ServicePage.objects.get(slug="pre-shipment-inspection")
    assert psi.live
    assert [block.block_type for block in psi.parts] == PART_NAMES


def test_other_services_are_seeded_as_drafts(seeded_home):
    drafts = ServicePage.objects.filter(live=False)

    assert drafts.filter(slug="loading-and-discharge-supervision").exists()
    assert drafts.count() == 20


def test_seed_is_idempotent_with_services(seeded_home):
    out = StringIO()
    call_command("seed_site", stdout=out)

    assert "0 change(s)" in out.getvalue()


def test_hub_lists_groups_and_live_services_only(client, seeded_home):
    html = client.get("/en/services/").content.decode()

    assert "Inspection" in html and "Government &amp; Trade Programs" in html
    assert 'href="/en/services/inspection/pre-shipment-inspection/"' in html
    assert "Loading and discharge supervision" not in html  # a draft
    assert "All inspection services" in html


def test_services_hub_is_in_the_main_menu(client, seeded_home):
    html = client.get("/en/").content.decode()

    assert 'href="/en/services/"' in html


def test_group_page_shows_cards_and_how_it_is_done(client, seeded_home):
    html = client.get("/en/services/inspection/").content.decode()

    assert "Pre-shipment Inspection (PSI)" in html
    assert "How inspection is done at TIC" in html
    assert "ANAB certificate AI-3314" in html


def test_service_page_renders_the_parts_and_the_contents_list(client, psi):
    response = client.get(PSI_URL)
    html = response.content.decode()

    assert response.status_code == 200
    for anchor in ("what_it_is", "how_it_works", "standards", "qa", "form"):
        assert f'id="{anchor}"' in html
        assert f'href="#{anchor}"' in html
    assert "ISO 2859-1" in html
    assert "Request an inspection" in html


def test_contents_list_is_built_from_the_parts_present(client, psi):
    psi.parts = [b for b in psi.parts.raw_data if b["type"] != "standards"]
    psi.save_revision().publish()

    html = client.get(PSI_URL).content.decode()

    assert 'href="#standards"' not in html
    assert 'href="#what_it_is"' in html


def test_unconfirmed_facts_stay_bracketed(client, psi):
    """Nothing invented: no named contact, review date or owning office until a director
    supplies them."""
    html = client.get(PSI_URL).content.decode()

    assert "[Named contact]" in html
    assert "Last reviewed [date]" in html
    assert "[office]" in html


def test_person_name_shown_only_when_agreed(client, psi, home):
    psi = _complete(psi, office=home)
    psi.save_revision().publish()
    person = Person.objects.get(name="A. Inspector")

    assert "A. Inspector" not in client.get(PSI_URL).content.decode()

    person.agreed_to_be_named = True
    person.save()
    html = client.get(PSI_URL).content.decode()
    assert "A. Inspector" in html
    assert "Head of inspection services" in html


def test_partner_laboratory_is_named_on_the_page(client, psi):
    lab = Partner.objects.create(
        name="Example Lab",
        location="Noida, India",
        accreditation_body="NABL",
        accreditation_number="TC-0000",
        scope="Food chemistry",
    )
    psi.partner_lab = lab
    psi.save_revision().publish()

    html = client.get(PSI_URL).content.decode()

    assert "Example Lab, Noida, India" in html
    assert "NABL, number TC-0000" in html


# -- the publish rule -------------------------------------------------------------------


def test_seeded_psi_lacks_only_what_a_director_owes(psi):
    problems = service_page_problems(
        intro=psi.intro, parts=psi.parts, group="inspection", partner_lab=None
    )

    assert problems == [
        "Contact: choose the named contact.",
        "Last reviewed: set the date and the owning office.",
    ]


def test_complete_page_may_be_published(psi, home):
    psi = _complete(psi, office=home)

    assert (
        service_page_problems(
            intro=psi.intro, parts=psi.parts, group="inspection", partner_lab=None
        )
        == []
    )


def test_missing_parts_are_named_by_number(psi):
    psi.parts = [b for b in psi.parts.raw_data if b["type"] not in ("documents", "qa")]

    problems = service_page_problems(
        intro=psi.intro, parts=psi.parts, group="inspection", partner_lab=None
    )

    assert "Add the missing parts: 04, 09." in problems


def test_parts_must_keep_their_order(psi, home):
    psi = _complete(psi, office=home)
    raw = psi.parts.raw_data
    psi.parts = [raw[1], raw[0], *raw[2:]]

    problems = service_page_problems(
        intro=psi.intro, parts=psi.parts, group="inspection", partner_lab=None
    )

    assert problems == ["Put the parts in their fixed order, 01 to 11."]


def test_testing_pages_need_the_partner_laboratory(psi, home):
    psi = _complete(psi, office=home)

    problems = service_page_problems(
        intro=psi.intro, parts=psi.parts, group="testing", partner_lab=None
    )

    assert len(problems) == 1
    assert "partner laboratory" in problems[0]


# -- the admin: save draft allowed, publish refused --------------------------------------


@pytest.fixture
def admin_client(client, django_user_model):
    user = django_user_model.objects.create_superuser("editor", "editor@example.com", "x")
    client.force_login(user)
    return client


def _post_new_service(admin_client, group, **extra):
    from django.urls import reverse

    url = reverse("wagtailadmin_pages:add", args=("services", "servicepage", group.pk))
    data = nested_form_data(
        {
            "title": "Draft service",
            "slug": "draft-service",
            "intro": "",
            "header_image_alt": "",
            "header_caption": "",
            "summary": "",
            "card_caption": "",
            "talk_label": "",
            "parts": streamfield([]),
            "comments": inline_formset([]),
        }
    )
    data.update(extra)
    return admin_client.post(url, data)


def test_admin_saves_an_incomplete_draft(admin_client, seeded_home):
    group = ServiceGroupPage.objects.get(slug="inspection", locale__language_code="en")

    response = _post_new_service(admin_client, group)

    assert response.status_code == 302
    page = Page.objects.get(slug="draft-service")
    assert not page.live


def test_admin_refuses_to_publish_an_incomplete_page(admin_client, seeded_home):
    group = ServiceGroupPage.objects.get(slug="inspection", locale__language_code="en")

    response = _post_new_service(admin_client, group, **{"action-publish": "action-publish"})

    assert response.status_code == 200
    assert not Page.objects.filter(slug="draft-service").exists()
    assert "Add the missing parts" in response.content.decode()


def test_review_date_renders(client, psi, home):
    psi = _complete(psi, office=home)
    psi.save_revision().publish()

    html = client.get(PSI_URL).content.decode()

    assert "Last reviewed 11 Nov 2026" in html


@pytest.mark.parametrize(
    "path",
    [
        "/en/services/",
        "/en/services/inspection/pre-shipment-inspection/",
        "/en/industries/agriculture-and-food/",
    ],
)
def test_hub_pages_have_a_meta_description_from_their_summary(client, seeded_home, path):
    """T13 (Lighthouse SEO): no blank meta description; the summary or intro stands in."""
    html = client.get(path).content.decode()

    marker = '<meta name="description" content="'
    start = html.index(marker) + len(marker)
    assert len(html[start : html.index('"', start)]) > 40


def test_search_description_wins_over_the_summary(seeded_home):
    psi = ServicePage.objects.get(slug="pre-shipment-inspection")
    psi.search_description = "Own description."

    assert psi.meta_description == "Own description."
