"""T22: Accreditations table and policy pages (master plan 03; proposal 01 §5.6; designs
B-Accreditations, B-Impartiality; D51)."""

import pytest
from django.core.exceptions import ValidationError

from apps.trust.models import Accreditation, ContentPage, content_page_problems

ACCR_URL = "/en/about/accreditations/"


@pytest.fixture
def seeded(seeded_home):
    return seeded_home


def test_the_table_shows_the_five_verified_rows_only(client, seeded):
    hidden = Accreditation.objects.create(
        body="EIAC",
        standard_or_scheme="ISO/IEC 17020",
        entity_and_sites="[entity]",
        status="active",
    )
    html = client.get(ACCR_URL).content.decode()
    rows = list(Accreditation.objects.public().values_list("body", flat=True))
    assert rows == ["ANAB", "GOEIC", "COSQC", "TIC Council", "GAFTA"]
    for body in rows:
        assert f"<b>{body}</b>" in html
    assert html.count("<tr>") == 1 + 5  # the head row and five rows
    assert hidden.body not in html
    assert "AI-3314" in html and "17 Oct 2028" in html
    assert "No public list" in html  # COSQC has no register
    assert "[date]" in html  # never checked yet


def test_footer_marks_match_the_permitted_marks(client, seeded):
    marks = list(Accreditation.objects.marks().values_list("body", flat=True))
    assert marks == ["ANAB", "GOEIC", "TIC Council"]
    html = client.get("/en/").content.decode()
    footer = html[html.index("<footer") :]
    for mark in Accreditation.objects.marks():
        assert f'href="{mark.register_url}"' in footer and mark.mark_line in footer
    assert "<b>GAFTA</b>" not in footer and "<b>COSQC</b>" not in footer


def test_a_mark_needs_a_register_link():
    row = Accreditation(
        body="X",
        standard_or_scheme="Y",
        entity_and_sites="Z",
        status="active",
        is_public=True,
        show_mark=True,
    )
    with pytest.raises(ValidationError):
        row.clean()


def test_policy_pages_with_their_facts_are_live(client, seeded):
    for slug, code in (
        ("impartiality", "TIC-IMS-IMP-A-25-10"),
        ("certificate-and-logo-use", "TIC-UCM-01"),
    ):
        page = ContentPage.objects.get(slug=slug)
        assert page.live and page.pdf and page.document_owner
        html = client.get(page.url).content.decode()
        assert code in html and page.pdf.url in html
        assert 'href="#s1"' in html
    html = client.get("/en/about/impartiality/").content.decode()
    assert "TIC-PY-02" in html  # the India entity's policy as the second PDF
    assert "QULAITY" not in html


def test_policy_pages_without_their_facts_stay_drafts(client, seeded):
    for slug in ("subcontracting", "privacy", "terms"):
        page = ContentPage.objects.get(slug=slug)
        assert not page.live, slug
        assert client.get(f"/en/about/{slug}/").status_code == 404


def test_publish_rule_names_the_missing_facts():
    problems = content_page_problems({"document_code": "TIC-X", "version": "Issue 0"})
    assert set(problems) == {"effective_date", "document_owner"}


def test_about_and_home_link_to_the_trust_pages(client, seeded):
    about = client.get("/en/about/").content.decode()
    for path in ("accreditations", "impartiality", "certificate-and-logo-use"):
        assert f'href="/en/about/{path}/"' in about
    assert 'href="/en/about/subcontracting/"' not in about  # a draft
    assert 'href="/en/about/accreditations/"' in client.get("/en/").content.decode()
