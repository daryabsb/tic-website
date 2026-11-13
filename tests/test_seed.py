"""T8 Seed skeleton: `seed_site` fills blanks only and a second run changes nothing; the
redirect loader; the fourteen office rows and the empty redirect map (D11, D15)."""

import csv
from io import StringIO
from pathlib import Path
from zoneinfo import ZoneInfo

import pytest
import yaml
from django.conf import settings
from django.core.management import call_command
from wagtail.contrib.redirects.models import Redirect

from apps.pages.management.commands import seed_site
from apps.pages.models import HomePage

SEED = Path(settings.BASE_DIR) / "seed"


def _seed(**options) -> str:
    out = StringIO()
    call_command("seed_site", stdout=out, stderr=out, **options)
    return out.getvalue()


# -- idempotence and editors' text ---------------------------------------------------


@pytest.mark.django_db
def test_second_run_changes_nothing(seeded_home):
    assert "seed_site: 0 change(s)" in _seed()


@pytest.mark.django_db
def test_seed_keeps_an_editors_text(seeded_home):
    seeded_home.hero_heading = "An editor's heading"
    seeded_home.save_revision().publish()

    assert "seed_site: 0 change(s)" in _seed()
    assert HomePage.objects.get(pk=seeded_home.pk).hero_heading == "An editor's heading"


# -- redirects -----------------------------------------------------------------------


@pytest.fixture
def redirect_seed(tmp_path, monkeypatch):
    """A seed folder with only a redirects.csv in it."""

    def write(*rows):
        with (tmp_path / "redirects.csv").open("w", encoding="utf-8", newline="") as handle:
            writer = csv.writer(handle)
            writer.writerow(["old_path", "new_path"])
            writer.writerows(rows)

    monkeypatch.setattr(seed_site, "SEED_DIR", tmp_path)
    return write


@pytest.mark.django_db
def test_redirects_to_a_page_and_to_a_url(seeded_home, redirect_seed, client):
    redirect_seed(
        ("/old-services/", "/en/services/"),
        ("/old-brochure.pdf", "https://example.org/brochure.pdf"),
    )
    _seed()

    page_redirect = Redirect.objects.get(old_path="/old-services")
    assert page_redirect.redirect_page.slug == "services"
    assert page_redirect.is_permanent and page_redirect.site is None
    assert Redirect.objects.get(old_path="/old-brochure.pdf").link == (
        "https://example.org/brochure.pdf"
    )
    response = client.get("/old-services/")
    assert response.status_code == 301
    assert response["Location"].endswith("/en/services/")


@pytest.mark.django_db
def test_redirects_are_idempotent_and_keep_an_editors_change(seeded_home, redirect_seed):
    redirect_seed(("/about-us/", "/en/services/"))
    _seed()
    edited = Redirect.objects.get(old_path="/about-us")
    edited.redirect_page = None
    edited.redirect_link = "https://example.org/"
    edited.save()

    assert "seed_site: 0 change(s)" in _seed()
    assert Redirect.objects.get(old_path="/about-us").link == "https://example.org/"


@pytest.mark.django_db
def test_a_redirect_to_a_missing_page_is_reported_and_skipped(seeded_home, redirect_seed):
    redirect_seed(("/gone/", "/en/no-such-page/"))

    assert "redirect /gone: no page at /en/no-such-page/" in _seed()
    assert not Redirect.objects.filter(old_path="/gone").exists()


def test_the_redirect_map_holds_only_the_iraq_rows_until_t30():
    """T18 (D44) moves the three Iraq pages, the GSP page and three Iraq posts; T30
    brings the rest of the map."""
    with (SEED / "redirects.csv").open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        assert reader.fieldnames == ["old_path", "new_path"]
        rows = list(reader)
    assert len(rows) == 7
    assert all(row["new_path"].startswith(("/en/programs/", "/en/news/")) for row in rows)


# -- the fourteen offices ------------------------------------------------------------


@pytest.fixture(scope="module")
def offices():
    with (SEED / "offices.yaml").open(encoding="utf-8") as handle:
        return yaml.safe_load(handle)["offices"]


def test_fourteen_offices_with_unique_slugs(offices):
    slugs = [o["slug"] for o in offices]
    assert len(offices) == 14
    assert len(set(slugs)) == 14
    assert [o["slug"] for o in offices if o.get("is_head_office")] == ["dubai"]


def test_every_office_has_the_required_parts(offices):
    """03 OfficePage: address, phone or email, timezone (placeholders count). No opening
    hours (D49): TIC answers around the clock."""
    for office in offices:
        assert office["city"] and office["country"] and office["address"], office["slug"]
        assert office.get("phone") or office.get("email"), office["slug"]
        assert "hours" not in office and "whatsapp" not in office, office["slug"]
        ZoneInfo(office["timezone"])


def test_guangzhou_has_wechat_and_no_whatsapp(offices):
    """D11: wa.me is never shown on the Guangzhou page."""
    guangzhou = next(o for o in offices if o["slug"] == "guangzhou")
    assert not guangzhou.get("whatsapp")
    assert guangzhou["wechat_id"]
