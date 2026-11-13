"""T21: About, Leadership, Our group (master plan 03; designs B-About, B-Leadership,
B-Group; P-16 placeholders)."""

import pytest
from django.core.exceptions import ValidationError

from apps.pages.models import AboutPage, GroupPage, LeadershipPage
from apps.people.models import Person


@pytest.fixture
def about(seeded_home):
    return AboutPage.objects.get(locale__language_code="en")


def test_the_three_pages_render_from_the_seed(client, about):
    assert about.url_path.endswith("/about/")
    for path, text in (
        ("/en/about/", "What we do, in one paragraph"),
        ("/en/about/leadership/", "Directors and service heads"),
        ("/en/about/group/", "Independence, in one sentence"),
    ):
        response = client.get(path)
        assert response.status_code == 200, path
        assert text in response.content.decode(), path


def test_about_links_only_to_pages_that_exist(client, about):
    html = client.get("/en/about/").content.decode()
    assert 'href="/en/about/leadership/"' in html
    assert 'href="/en/about/group/"' in html
    assert "Accreditations and approvals" in html  # a card without a link until T22
    assert "COSQC contract of 22 May 2024" in html
    assert "[n]" in html and "Certificates issued in 2025" in html


def test_leadership_shows_placeholders_until_people_agree(client, about):
    html = client.get("/en/about/leadership/").content.decode()
    assert html.count("[Name]") == 8  # the CEO, three directors, four office managers
    assert "Director, Inspection Services" in html
    assert "Office manager · Guangzhou" in html

    person = Person.objects.get(title="Director, Inspection Services")
    person.name = "Jane Example"
    person.save()
    assert "Jane Example" not in client.get("/en/about/leadership/").content.decode()

    person.agreed_to_be_named = True
    person.save()
    html = client.get("/en/about/leadership/").content.decode()
    assert "Jane Example" in html and html.count("[Name]") == 7


def test_group_shows_three_companies_and_the_supplied_logo(client, about):
    html = client.get("/en/about/group/").content.decode()
    for name in ("TIC Quality Control", "Seacorr", "LOX"):
        assert name in html
    assert "img/logo/tic-logo-480" in html  # the logo file, never redrawn
    assert "[Seacorr logo]" in html
    assert "TIC remains responsible for the result" in html


def test_group_page_needs_the_independence_sentence(about):
    page = GroupPage(title="Our group 2", slug="group-2", independence="")
    with pytest.raises(ValidationError) as error:
        page.full_clean()
    assert "independence" in error.value.message_dict


def test_footer_lists_the_about_children(client, about):
    html = client.get("/en/").content.decode()
    assert 'href="/en/about/leadership/"' in html and 'href="/en/about/group/"' in html


def test_one_leadership_page_per_about(about):
    assert LeadershipPage.objects.child_of(about).count() == 1
    assert not LeadershipPage.can_create_at(about)
