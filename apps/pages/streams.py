"""StreamField data in the form the page editor stores (T29, D81).

The seed writes plain data: a list as a plain list, an optional text left out. The page
editor stores more: each list row with its own id, and an empty text as "". The site
shows both forms the same way, but wagtail-localize does not: it translates a list only
in the editor's form, and it fails on a text block that holds nothing. So a seeded page
could not be translated, in the admin or from the review sheet.

``editor_form`` gives the editor's form of raw stream data; ``put_in_editor_form`` does
it for every StreamField of a page. The content does not change, and data that is
already in the editor's form comes back as it is (ids are made once).
"""

from __future__ import annotations

import copy

from wagtail import blocks
from wagtail.fields import StreamField

TEXT_BLOCKS = (blocks.CharBlock, blocks.TextBlock, blocks.RichTextBlock, blocks.BlockQuoteBlock)


def _empty_text(block, raw):
    """``raw`` with "" in every text block that holds nothing."""
    if isinstance(block, blocks.StreamBlock):
        for child in raw or []:
            child_block = block.child_blocks.get(child["type"])
            if child_block is not None:
                child["value"] = _empty_text(child_block, child.get("value"))
        return raw or []
    if isinstance(block, blocks.StructBlock):
        raw = raw if isinstance(raw, dict) else {}
        for name, child_block in block.child_blocks.items():
            raw[name] = _empty_text(child_block, raw.get(name))
        return raw
    if isinstance(block, blocks.ListBlock):
        for item in raw or []:
            item["value"] = _empty_text(block.child_block, item.get("value"))
        return raw or []
    if raw is None and isinstance(block, TEXT_BLOCKS):
        return ""
    return raw


def editor_form(stream_block, raw_data) -> list:
    """``raw_data`` (the stored value of a StreamField) as the page editor stores it."""
    value = stream_block.to_python(copy.deepcopy(list(raw_data)))
    list(value)  # reads every block: a block that is not read is stored as it came
    return _empty_text(stream_block, stream_block.get_prep_value(value))


def put_in_editor_form(page) -> list[str]:
    """Put every StreamField of ``page`` in the editor's form. Returns the names of the
    fields that changed; the caller saves the page."""
    changed = []
    for field in page._meta.get_fields():
        if not isinstance(field, StreamField):
            continue
        stored = list(getattr(page, field.name).raw_data)
        wanted = editor_form(field.stream_block, stored)
        if wanted != stored:
            setattr(page, field.name, wanted)
            changed.append(field.name)
    return changed
