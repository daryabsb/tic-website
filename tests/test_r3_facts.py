"""Round 3 facts bar and jump row (T39, D77; drop docs/design/drops/polish-2026-11-18/,
rules board parts 3, 6 and 7)."""

import re

import pytest

pytestmark = pytest.mark.django_db


def _bar(html):
    start = html.index('<div class="fb')
    return html[start : html.index("</div></div>", start) + 12]


def _cells(html):
    """[(label, value, note)] of the facts bar."""
    bar = _bar(html)
    out = []
    for cell in re.findall(r'<div class="fb__f">(.*?)</div>', bar):
        label = re.search(r'<span class="lbl">(.*?)</span>', cell).group(1)
        value = re.search(r'<span class="fb__v"><bdi>(.*?)</bdi>', cell).group(1)
        note = re.search(r'<span class="fb__s"><bdi>(.*?)</bdi>', cell)
        out.append((label, value, note.group(1) if note else ""))
    return out


def _get(client, url):
    response = client.get(url)
    assert response.status_code == 200, url
    return response.content.decode()


def test_service_page_has_where_on_site_report_standards(client, seeded_home):
    html = _get(client, "/en/services/inspection/pre-shipment-inspection/")

    assert [c[0] for c in _cells(html)] == ["Where", "On site", "Report", "Standards"]
    cells = {c[0]: c[1:] for c in _cells(html)}
    assert cells["Where"][0] == "10 offices"
    assert cells["On site"] == ("[days on site]", "Typical, by order size")  # bracket stays
    assert cells["Standards"] == ("ISO 2859-1", "ISO/IEC 17020 · ANAB AI-3314")
    # The bar follows the head, before the body.
    assert html.index("</h1>") < html.index('<div class="fb">') < html.index("<footer")
    # A long intro becomes the first paragraph under the bar, not above it (the drop).
    assert html.index('<div class="fb">') < html.index('class="wrap ph-more"')
    assert "style=" not in _bar(html)


def test_industry_counts_services_and_programs_from_its_cards(client, seeded_home):
    html = _get(client, "/en/industries/agriculture-and-food/")
    cells = _cells(html)

    assert [c[0] for c in cells] == ["Services", "Programs", "Where", "Contact"]
    assert cells[0][1] == "5 services"
    assert "Iraq" in cells[1][1]  # the card to the Programs group counts every live program
    assert cells[2][1] == "[ports and offices]" and cells[3][1] == "[named contact]"


def test_industry_with_no_program_has_three_cells(client, seeded_home):
    from apps.industries.models import IndustryPage
    from apps.services.models import ServicePage

    marine = IndustryPage.objects.get(locale__language_code="en", slug="marine-and-shipping")
    html = _get(client, marine.url)
    assert '<div class="fb fb--c2">' in html  # nothing linked yet: Where and Contact only

    psi = ServicePage.objects.get(locale__language_code="en", slug="pre-shipment-inspection")
    marine.services = [("card", {"page": psi, "title": "Draft survey", "text": "Draft."})]
    marine.save_revision().publish()
    html = _get(client, marine.url)

    assert '<div class="fb fb--c3">' in html
    assert _cells(html)[0] == ("Services", "1 service", "Draft survey")
    assert [c[0] for c in _cells(html)] == ["Services", "Where", "Contact"]


def test_program_page_has_regulator_appointed_status_office(client, seeded_home):
    html = _get(client, "/en/programs/iraq-certificate-of-conformity/")
    cells = _cells(html)

    regulator = "Central Organization for Standardization and Quality Control"
    assert cells[0] == ("Regulator", "COSQC", regulator)
    assert cells[1] == ("Appointed", "22 May 2024", "With LOX · contract no. 5")
    assert cells[2] == ("Status", "Appointed", "Certificates issued since 5 September 2024")
    assert cells[3][:2] == ("Office", "Baghdad")


def test_office_page_shows_the_time_zone_not_opening_hours(client, seeded_home):
    html = _get(client, "/en/offices/dubai/")
    cells = _cells(html)

    assert [c[0] for c in cells] == ["Phone and WhatsApp", "Email", "Time zone", "Languages"]
    assert cells[0][1:] == ("+971 4 225 5555", "Call · WhatsApp")
    assert cells[2][1:] == ("UTC+4", "Asia/Dubai")  # D49: no opening hours (D77)
    assert "Opening hours" not in html


def test_office_in_china_shows_phone_and_never_whatsapp(client, seeded_home):
    html = _get(client, "/en/offices/guangzhou/")

    assert _cells(html)[0][0] == "Phone"
    assert "WhatsApp" not in _bar(html)


def test_contact_page_bar_is_the_head_office_with_the_reply_promise(client, seeded_home):
    html = _get(client, "/en/contact/")
    cells = _cells(html)

    assert [c[0] for c in cells] == ["Phone and WhatsApp", "Email", "Time zone", "Reply promise"]
    assert cells[0][1] == "+971 4 225 5555"


def test_about_page_bar_reads_offices_accreditations_and_programs(client, seeded_home):
    html = _get(client, "/en/about/")
    cells = _cells(html)

    assert [c[0] for c in cells] == ["Founded", "Addresses", "Accredited", "Programs"]
    assert cells[0][1:] == ("[2020]", "Dubai, United Arab Emirates")
    assert cells[1][1] == "14" and cells[1][2] == "In 12 countries"
    assert "ANAB" in cells[2][2]


def test_service_group_page_has_no_bar_and_no_jump_row(client, seeded_home):
    html = _get(client, "/en/services/inspection/")

    assert 'class="fb' not in html and 'class="jump"' not in html


@pytest.mark.parametrize(
    ("url", "label"),
    [
        ("/en/services/", "Groups"),
        ("/en/industries/", "Industries"),
        ("/en/programs/", "Countries"),
    ],
)
def test_hub_jump_row_links_to_every_section_on_the_page(client, seeded_home, url, label):
    html = _get(client, url)
    start = html.index('<nav class="jump"')
    row = html[start : html.index("</nav>", start)]

    assert f'<span class="lbl">{label}</span>' in row
    anchors = re.findall(r'href="#([^"]+)"', row)
    assert len(anchors) >= 2  # programs: Iraq and one in progress
    for anchor in anchors:
        assert f'id="{anchor}"' in html, anchor
    if 'class="wrap ph-more"' in html:
        assert start < html.index('class="wrap ph-more"')  # the row sits right under the head


def test_home_proof_strip_is_the_facts_bar_with_links(client, seeded_home):
    html = _get(client, "/en/")

    assert '<section class="fb fb--proof"' in html
    assert '<a class="fb__f" href="https://anab.ansi.org/"' in html
    assert "proof-strip" not in html


@pytest.mark.parametrize(
    "url",
    [
        "/en/services/inspection/pre-shipment-inspection/",
        "/en/industries/agriculture-and-food/",
        "/en/programs/iraq-certificate-of-conformity/",
        "/en/offices/dubai/",
        "/en/offices/guangzhou/",
        "/en/contact/",
        "/en/about/",
    ],
)
def test_every_page_draws_the_facts_bar_once(client, seeded_home, url):
    """The office head draws the general head, which draws the bar: never a second one."""
    assert _get(client, url).count('<div class="fb') == 1
