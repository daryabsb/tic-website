"""T43: the current site's content in the new pages (D82).

Darya, Nov 22, 2026: the data of ticqc.ae is true and genuine. Its text is in four seed
files (service pages, courses, industry pages, program pages) and one articles file. Only
the current site's content: where it says nothing, a part is empty and is not drawn.
"""

import json
import re
from io import StringIO
from pathlib import Path

import pytest
import yaml
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from wagtail.models import Locale

from apps.industries.models import IndustryPage
from apps.news.models import NewsPage
from apps.pages.management.commands import seed_site
from apps.programs.models import ProgramPage
from apps.services.models import ServiceGroupPage, ServicePage
from apps.services.rules import part_has_content

SEED = Path(settings.BASE_DIR) / "seed"
MOVED = ("service-pages.yaml", "courses.yaml", "industry-pages.yaml", "program-pages.yaml")
OLD_NAME = re.compile(r"\bTIC\s?-?QC\b|\bTICQC\b|[Pp]rogramme")
PLACEHOLDER = re.compile(r"\[[^\[\]]+\]")
TAG = re.compile(r"<[^>]+>")


def _load(name):
    return yaml.safe_load((SEED / name).read_text(encoding="utf-8"))


def _english(model, slug):
    return model.objects.get(slug=slug, locale=Locale.get_default())


# -- the files -------------------------------------------------------------------------


@pytest.mark.parametrize("name", [*MOVED, "current-pages.json"])
def test_the_moved_text_keeps_the_house_words(name):
    text = (SEED / name).read_text(encoding="utf-8")
    text = text.replace("ticqc.ae", "")  # the address of the current site is not page text

    assert not OLD_NAME.search(text), OLD_NAME.search(text).group(0)


@pytest.mark.parametrize("name", MOVED)
def test_the_moved_text_has_no_placeholder(name):
    """A fact the current site does not give is left out, not written in brackets."""
    text = (SEED / name).read_text(encoding="utf-8")
    body = "\n".join(line for line in text.splitlines() if not line.lstrip().startswith("#"))

    assert not PLACEHOLDER.search(body), PLACEHOLDER.search(body).group(0)


def test_every_moved_page_names_its_source_and_has_its_main_text():
    pages = _load("service-pages.yaml")["service_pages"]

    assert len(pages) == 16
    for slug, page in pages.items():
        assert page["source"] and all(s.startswith("https://ticqc.ae/") for s in page["source"])
        assert [part["type"] for part in page["parts"]][0] == "what_it_is", slug
        assert len(TAG.sub("", page["parts"][0]["value"]["text"])) >= 200, slug
    assert len(_load("courses.yaml")["courses"]) == 10
    assert [p["slug"] for p in _load("program-pages.yaml")["program_pages"]] == [
        "egypt-certificate-of-conformity",
        "botswana-certificate-of-conformity",
        "libya-certificate-of-inspection",
    ]


# -- the pages -------------------------------------------------------------------------


@pytest.mark.django_db
def test_a_moved_service_page_is_live_and_draws_only_the_parts_with_text(client, seeded_home):
    page = _english(ServicePage, "marine-and-cargo-surveys")
    html = client.get(page.url).content.decode()

    assert page.live and page.url == "/en/services/inspection/marine-and-cargo-surveys/"
    assert "Draft Survey" in html or "draft survey" in html  # the current site's text
    assert 'id="what_it_is"' in html and 'id="form"' in html
    drawn = {
        block.block_type for block in page.parts if part_has_content(block.block_type, block.value)
    }
    for name in ("documents", "standards", "qa", "who_needs_it"):
        if name not in drawn:
            assert f'id="{name}"' not in html, name
    assert "documents" not in drawn  # the current site lists no documents for this service
    assert 'class="fb' not in html  # no fact is known: no facts bar with four brackets
    assert len(page.parts) == 11  # the eleven parts stay, for the editor


@pytest.mark.django_db
def test_the_testing_group_is_not_empty(client, seeded_home):
    """Darya's example: ticqc.ae/testing/ was full, the new Testing page had a title only."""
    group = _english(ServiceGroupPage, "testing")
    html = client.get(group.url).content.decode()

    assert group.intro
    for slug in (
        "food-and-agricultural-testing",
        "consumer-product-testing",
        "oil-gas-and-petroleum-testing",
        "minerals-and-metals-testing",
    ):
        assert f'href="/en/services/testing/{slug}/"' in html
    food = client.get("/en/services/testing/food-and-agricultural-testing/").content.decode()
    assert "Microbiological" in food


@pytest.mark.django_db
def test_the_program_pages_of_the_current_site_are_live(client, seeded_home):
    egypt = _english(ProgramPage, "egypt-certificate-of-conformity")
    libya = _english(ProgramPage, "libya-certificate-of-inspection")

    assert egypt.live and egypt.appointment_status == "registered"  # the register's word
    assert libya.live and libya.appointment_status == "appointed"
    assert not ProgramPage.objects.filter(slug="saudi-arabia-sfda").exists()  # held (P-13)
    index = client.get("/en/programs/").content.decode()
    for page in (egypt, libya, _english(ProgramPage, "botswana-certificate-of-conformity")):
        assert client.get(page.url).status_code == 200
        assert f'href="{page.url}"' in index


@pytest.mark.django_db
def test_an_industry_page_has_the_current_sites_text(client, seeded_home):
    page = _english(IndustryPage, "oil-gas-and-petrochemicals")
    html = client.get(page.url).content.decode()

    assert page.intro and page.why_text
    assert 'href="/en/services/testing/oil-gas-and-petroleum-testing/"' in html


@pytest.mark.django_db
def test_the_product_pages_become_insight_articles(client, seeded_home):
    out = StringIO()
    source = SEED / "current-pages.json"

    call_command("import_old_news", source=source, publish=True, stdout=out)
    call_command("import_old_news", source=source, publish=True, stdout=out)  # again: no copy

    posts = json.loads(source.read_text(encoding="utf-8"))["posts"]
    pages = NewsPage.objects.filter(slug__in=[post["slug"] for post in posts])
    assert pages.count() == len(posts) == 15
    assert all(page.live and page.kind == "insight" for page in pages)
    tiles = pages.get(slug="ceramic-and-porcelain-tile-inspection")
    html = client.get(tiles.url).content.decode()
    assert "Frequently Asked Questions" in html
    assert "ticqc.ae" not in html and "Elementor" not in html


# -- the seed tools --------------------------------------------------------------------


@pytest.mark.django_db
def test_a_page_a_person_saved_is_not_filled(seeded_home):
    """The seed fills a draft only while every revision is its own."""
    page = _english(ServicePage, "gafta-superintendence")  # a draft: no text to move
    command = seed_site.Command()

    assert command.may_fill(page)
    editor = get_user_model().objects.create_user("editor", "editor@example.com", "x")
    page.save_revision(user=editor)

    assert not command.may_fill(page)


@pytest.mark.django_db
def test_a_part_with_a_placeholder_takes_the_seeds_better_part(seeded_home):
    iraq = _english(ProgramPage, "iraq-certificate-of-conformity")
    command = seed_site.Command()
    command.changes = 0
    fees = next(block for block in iraq.parts.raw_data if block["type"] == "fees")
    assert "[" in json.dumps(fees["value"])  # the fees are a placeholder today

    better = [
        {"type": "fees", "value": {"heading": "What it costs", "mode": "on_request", "note": ""}}
    ]
    assert command.refresh_parts(iraq, better)
    iraq.refresh_from_db()
    fees = next(block for block in iraq.parts.raw_data if block["type"] == "fees")
    assert "[" not in json.dumps(fees["value"])
    assert not command.refresh_parts(iraq, better)  # no placeholder left: not touched again


@pytest.mark.django_db
def test_a_list_with_a_placeholder_row_takes_the_seeds_list(seeded_home):
    """The stored form of a list has brackets of its own (rows, ids): only the texts
    count. On staging the Iraq checklist kept "[Any further item …]" for this reason."""
    iraq = _english(ProgramPage, "iraq-certificate-of-conformity")
    command = seed_site.Command()
    command.changes = 0
    stored = [dict(block) for block in iraq.parts.raw_data]
    checklist = next(block for block in stored if block["type"] == "checklist")
    seeded = json.loads(json.dumps(checklist["value"]))
    rows = [row["value"] if isinstance(row, dict) else row for row in seeded["items"]]
    assert "Client declaration form, completed and signed by the exporter" in rows
    checklist["value"]["items"][-1]["value"] = "[Any further item the Baghdad office confirms]"
    iraq.parts = stored
    iraq.save_revision().publish()

    assert command.holes(checklist["value"]) == 1
    assert command.refresh_parts(iraq, [{"type": "checklist", "value": {**seeded, "items": rows}}])
    iraq.refresh_from_db()
    text = json.dumps(next(b for b in iraq.parts.raw_data if b["type"] == "checklist"))
    assert "Client declaration form" in text and "Any further item" not in text


@pytest.mark.django_db
def test_an_earlier_seed_text_is_replaced_and_an_editors_text_is_kept(
    seeded_home, tmp_path, monkeypatch
):
    group = _english(ServiceGroupPage, "audits")
    earlier = group.summary
    (tmp_path / "replaced.yaml").write_text(
        yaml.safe_dump({"replaced": [{"was": earlier, "now": "The current site's line."}]}),
        encoding="utf-8",
    )
    monkeypatch.setattr(seed_site, "SEED_DIR", tmp_path)
    command = seed_site.Command()
    command.reset, command.changes = False, 0

    command.seed_replaced()
    group.refresh_from_db()
    assert group.summary == "The current site's line."

    group.summary = "An editor's line."
    group.save_revision().publish()
    command.seed_replaced()
    group.refresh_from_db()
    assert group.summary == "An editor's line."
