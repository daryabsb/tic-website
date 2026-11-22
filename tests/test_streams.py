"""T29: seeded StreamField data is stored in the form the page editor stores (D81).

The seed writes plain lists and leaves optional text out. wagtail-localize translates a
list only in the editor's form (each row with its id), and fails on a text block that
holds nothing. ``apps.pages.streams`` puts the data in the editor's form; ``seed_site``
runs it over every page, so every seeded page can be translated.
"""

import pytest
from django.apps import apps
from django.core.management import call_command
from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.models import Locale, Page
from wagtail_localize.segments import StringSegmentValue
from wagtail_localize.segments.extract import extract_segments

from apps.pages import streams
from apps.pages.models import AboutPage
from apps.programs.models import ProgramIndexPage, ProgramPage

PARTS = ProgramPage._meta.get_field("parts").stream_block
SEEDED_PARTS = [
    {
        "type": "steps",
        "value": {
            "heading": "How it works",
            "steps": [{"title": "Application", "text": "You send the request."}],
        },
    },
    {"type": "checklist", "value": {"heading": "What you give us", "items": ["Packing list"]}},
    {"type": "updates", "value": None},
]


def _english(model, slug):
    return model.objects.get(slug=slug, locale=Locale.get_default())


def _rows(value):
    return {child["type"]: child["value"] for child in value}


def test_a_seeded_list_gets_the_editors_form():
    value = _rows(streams.editor_form(PARTS, SEEDED_PARTS))

    step = value["steps"]["steps"][0]
    assert step["type"] == "item" and step["id"]
    assert step["value"]["title"] == "Application"
    item = value["checklist"]["items"][0]
    assert item["type"] == "item" and item["id"] and item["value"] == "Packing list"


def test_text_the_seed_left_out_is_empty_text_not_nothing():
    value = _rows(streams.editor_form(PARTS, SEEDED_PARTS))

    assert value["checklist"]["text"] == ""  # a text block the seed does not name
    assert value["steps"]["steps"][0]["value"]["text"] == "You send the request."
    assert value["updates"] is None  # a block with no fields keeps no value


def test_a_block_default_is_kept():
    value = _rows(streams.editor_form(PARTS, SEEDED_PARTS))

    assert value["checklist"]["form_label"] == "Start the request form"


def test_the_editors_form_is_stable():
    once = streams.editor_form(PARTS, SEEDED_PARTS)
    twice = streams.editor_form(PARTS, once)

    assert twice == once  # the ids are made once


def _lists_out_of_reach(block, inside_struct=False, path=""):
    """Paths of StructBlocks that hold a list, sit directly inside another StructBlock
    and do not give wagtail-localize their rows (``ListsInsideMixin``)."""
    found = []
    if isinstance(block, blocks.StructBlock):
        holds_list = any(isinstance(c, blocks.ListBlock) for c in block.child_blocks.values())
        if inside_struct and holds_list and not hasattr(block, "get_translatable_segments"):
            found.append(path)
        for name, child in block.child_blocks.items():
            found += _lists_out_of_reach(child, True, f"{path}.{name}")
    elif isinstance(block, blocks.ListBlock):
        found += _lists_out_of_reach(block.child_block, False, f"{path}[]")
    elif isinstance(block, blocks.StreamBlock):
        for name, child in block.child_blocks.items():
            found += _lists_out_of_reach(child, False, f"{path}.{name}")
    return found


def test_no_list_is_out_of_reach_of_the_translators():
    found = []
    for model in apps.get_models():
        if not issubclass(model, Page):
            continue
        for field in model._meta.get_fields():
            if isinstance(field, StreamField):
                label = f"{model.__name__}.{field.name}"
                found += _lists_out_of_reach(field.stream_block, path=label)

    assert not found, found


@pytest.mark.django_db
def test_every_seeded_stream_is_in_the_editors_form(seeded_home):
    for page in Page.objects.filter(depth__gte=2, locale=Locale.get_default()).specific():
        assert not streams.put_in_editor_form(page), page.url_path


@pytest.mark.django_db
def test_every_seeded_page_can_be_translated(seeded_home):
    """No page makes wagtail-localize fail (the Programs index did: a text block that
    held nothing)."""
    for page in Page.objects.filter(depth__gte=2, locale=Locale.get_default()).specific():
        extract_segments(page)


@pytest.mark.django_db
def test_the_text_inside_seeded_lists_can_be_translated(seeded_home):
    def texts(page):
        segments = extract_segments(page)
        return {s.string.render_text() for s in segments if isinstance(s, StringSegmentValue)}

    iraq = texts(_english(ProgramPage, "iraq-certificate-of-conformity"))
    assert "What is the Iraq CoC Program?" in iraq  # a question in a list
    assert "Packing list" in iraq  # a plain list row
    assert "Application and documents" in iraq  # a step title
    assert "Founded in Dubai" in texts(_english(AboutPage, "about"))  # a list in a part
    assert "Saudi Arabia SFDA" in texts(_english(ProgramIndexPage, "programs"))


@pytest.mark.django_db
def test_the_review_sheet_can_be_made(seeded_home, tmp_path):
    """The core's review sheet reads every live page; it must not fail on a seeded one."""
    call_command("export_translation_sheet", locale="ar", out=str(tmp_path), verbosity=0)

    assert [sheet for sheet in tmp_path.glob("*.xlsx") if sheet.stat().st_size]


@pytest.mark.django_db
def test_an_editors_draft_is_kept(seeded_home):
    page = _english(AboutPage, "about")
    page.intro = "An editor's draft"
    page.save_revision()  # a draft: not published

    call_command("seed_site", verbosity=0)

    page.refresh_from_db()
    assert page.get_latest_revision_as_object().intro == "An editor's draft"
    assert page.live and page.has_unpublished_changes
