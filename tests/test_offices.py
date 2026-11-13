"""T20: Offices (master plan 03, 07, 09; D11; design B-Office-Baghdad)."""

import pytest
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError
from django.core.management import call_command
from django.core.management.base import CommandError
from wagtail.models import Collection, GroupPagePermission
from zeneon_cms.core.models import SiteSettings
from zeneon_cms.requests.models import RoutingRule

from apps.offices.channels import channels_for
from apps.offices.models import OfficeIndexPage, OfficePage
from apps.pages.templatetags.tic import office_list
from apps.programs.models import ProgramPage

SITE_WHATSAPP = "+971 50 000 0000"


@pytest.fixture
def offices(seeded_home):
    return {page.slug: page for page in OfficePage.objects.filter(locale__language_code="en")}


@pytest.fixture
def site_numbers(seeded_home):
    site = SiteSettings.load()
    site.whatsapp_number = SITE_WHATSAPP
    site.main_phone = "+971 4 225 5555"
    site.save()
    return site


def test_fourteen_office_pages_from_the_seed(client, offices):
    assert len(offices) == 14
    index = OfficeIndexPage.objects.get(locale__language_code="en")
    assert index.url_path.endswith("/offices/")
    html = client.get("/en/offices/").content.decode()
    for page in offices.values():
        assert page.live and page.title in html
    assert offices["dubai"].title == "Dubai head office" and offices["dubai"].is_head_office
    assert offices["baghdad"].title == "Baghdad office"


def test_the_office_list_starts_with_the_head_office(offices):
    pages = office_list()
    assert len(pages) == 14 and pages[0].slug == "dubai"


def test_every_office_page_renders(client, offices):
    for page in offices.values():
        response = client.get(page.url)
        assert response.status_code == 200, page.slug
        assert page.address.split(",")[0] in response.content.decode()


def test_guangzhou_shows_no_wa_me(client, offices, site_numbers):
    html = client.get(offices["guangzhou"].url).content.decode()
    assert "wa.me" not in html
    assert "WeChat" in html and "[WeChat ID]" in html
    assert channels_for(offices["guangzhou"]).whatsapp_link == ""


def test_one_number_is_the_phone_and_the_whatsapp_but_never_in_china(client, offices):
    baghdad = client.get(offices["baghdad"].url).content.decode()
    assert baghdad.count("+964 770 250 2017") == 1  # shown once (D49)
    assert 'href="tel:+9647702502017"' in baghdad and "wa.me/9647702502017" in baghdad
    guangzhou = offices["guangzhou"]
    assert guangzhou.phone_number and guangzhou.whatsapp_number == ""
    assert 'href="tel:+8618149707740"' in client.get(guangzhou.url).content.decode()


def test_an_office_needs_an_address_and_a_phone_or_email(offices):
    page = offices["bangkok"]
    page.phone, page.email = "", ""
    with pytest.raises(ValidationError) as caught:
        page.full_clean()
    assert "phone" in caught.value.message_dict


def test_a_placeholder_is_never_a_link(client, offices):
    html = client.get(offices["bangkok"].url).content.decode()
    assert "[phone]" in html and 'href="tel:[' not in html
    assert 'href="mailto:info@ticqc.com"' in html  # one email for every office (D49)
    assert "wa.me" not in html  # no office number and no head-office number set


def test_the_cta_band_carries_the_office_numbers(client, offices, site_numbers):
    noida = client.get(offices["noida"].url).content.decode()
    assert 'href="tel:+919211711993"' in noida  # Noida's own phone
    assert "wa.me/919211711993" in noida  # the same number is its WhatsApp (D49)
    iraq = ProgramPage.objects.get(slug="iraq-certificate-of-conformity")
    assert iraq.owning_office.specific == offices["baghdad"]
    assert channels_for(iraq).office == offices["baghdad"]
    home = channels_for(iraq.get_parent().get_parent())
    assert home.office is None and home.phone == "+971 4 225 5555"


def test_the_office_page_lists_what_it_sells(client, offices):
    html = client.get(offices["baghdad"].url).content.decode()
    assert "Sold and delivered from Baghdad" in html
    assert "Iraq Certificate of Conformity" in html


def test_routing_rules_point_to_the_office_pages(offices):
    rule = RoutingRule.objects.get(name="Baghdad office")
    assert rule.page.specific == offices["baghdad"]
    assert RoutingRule.objects.get(name="Guangzhou office").page.specific == offices["guangzhou"]


def test_a_request_routed_to_guangzhou_offers_no_whatsapp(offices, site_numbers):
    from types import SimpleNamespace

    from apps.services.intake import office_for

    rule = RoutingRule.objects.get(name="Guangzhou office")
    submission = SimpleNamespace(routed_to=rule.name, routed_rule=rule, code="TIC-2026-0009")
    office = office_for(submission)
    assert office.whatsapp == "" and office.whatsapp_link == ""


def test_add_office_makes_the_group_and_the_collection_once(offices):
    baghdad = offices["baghdad"]
    group = Group.objects.get(name="Baghdad office editors")
    assert Collection.objects.get(name="Baghdad").get_parent().name == "Offices"
    codenames = set(
        GroupPagePermission.objects.filter(group=group, page=baghdad).values_list(
            "permission__codename", flat=True
        )
    )
    assert codenames == {"add_page", "change_page"}  # the reviewer publishes (T24)
    call_command("add_office", "baghdad", verbosity=0)
    assert Group.objects.filter(name="Baghdad office editors").count() == 1
    assert Collection.objects.filter(name="Baghdad").count() == 1


def test_add_office_makes_a_missing_page_from_its_row(offices):
    offices["amman"].delete()
    call_command("add_office", "amman", verbosity=0)
    assert OfficePage.objects.get(slug="amman").title == "Amman office"
    with pytest.raises(CommandError):
        call_command("add_office", "atlantis")


def test_a_second_seed_run_changes_no_office(offices):
    from io import StringIO

    out = StringIO()
    call_command("seed_site", stdout=out)
    assert "seed_site: 0 change(s)" in out.getvalue()


def test_verify_names_the_issuing_office_page(client, offices):
    from apps.verify.models import Certificate

    Certificate(
        number="SAMPLE-1",
        type="Sample",
        status="valid",
        issue_date="2026-01-01",
        issuing_office="baghdad",
    ).save()
    html = client.post("/en/verify/", {"n": "SAMPLE-1"}).content.decode()
    assert f'href="{offices["baghdad"].url}"' in html and "All offices" in html
