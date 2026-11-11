"""The eleven parts of a service page (proposal 01 §6; master plan 03, 04).

``SERVICE_PARTS`` is one StreamField with one block per part, each allowed once. The
order is fixed: the admin refuses to publish a page whose parts are missing, out of
order or empty (``apps.services.rules``). Inside a part every field is optional so a
half-written draft can always be saved; the publish check says what is missing.

The page's left column ("On this page") is built from the parts present.
"""

from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

RICH = ["bold", "italic", "link", "ul"]


def _heading(default=""):
    return blocks.CharBlock(label=_("heading"), max_length=120, required=False, default=default)


class WhatItIsBlock(blocks.StructBlock):
    heading = _heading()
    text = blocks.RichTextBlock(
        label=_("text"),
        features=RICH,
        required=False,
        help_text=_("Two or three sentences a non-specialist understands."),
    )

    class Meta:
        icon = "doc-full"
        label = _("01 What it is")
        template = "services/parts/what_it_is.html"


class WhoNeedsItBlock(blocks.StructBlock):
    heading = _heading()
    items = blocks.ListBlock(
        blocks.CharBlock(max_length=240),
        label=_("cases"),
        default=[],
        help_text=_("When it is required or wise, one case per line."),
    )

    class Meta:
        icon = "group"
        label = _("02 Who needs it")
        template = "services/parts/who_needs_it.html"


class StepBlock(blocks.StructBlock):
    title = blocks.CharBlock(label=_("title"), max_length=60, required=False)
    text = blocks.TextBlock(label=_("text"), max_length=400, required=False)
    typical = blocks.CharBlock(
        label=_("typical time"),
        max_length=80,
        required=False,
        help_text=_("e.g. 'Typical: 1 day on site'. Blank if we cannot say."),
    )


class HowItWorksBlock(blocks.StructBlock):
    """``step_list`` of master plan 04: numbered black squares."""

    heading = _heading()
    steps = blocks.ListBlock(StepBlock(), label=_("steps"), default=[])

    class Meta:
        icon = "list-ol"
        label = _("03 How it works")
        template = "services/parts/how_it_works.html"


class DocumentsBlock(blocks.StructBlock):
    """``document_checklist`` of master plan 04: square boxes, one line each."""

    heading = _heading()
    items = blocks.ListBlock(blocks.CharBlock(max_length=200), label=_("documents"), default=[])

    class Meta:
        icon = "doc-empty"
        label = _("04 What you give us")
        template = "services/parts/documents.html"


class WhatYouGetBlock(blocks.StructBlock):
    heading = _heading()
    sample_image = ImageChooserBlock(
        label=_("sample"),
        required=False,
        help_text=_("A real sample report or certificate, numbers blacked out."),
    )
    sample_caption = blocks.CharBlock(
        label=_("sample caption"), max_length=40, required=False, default="Sample report"
    )
    items = blocks.ListBlock(blocks.CharBlock(max_length=240), label=_("contents"), default=[])

    class Meta:
        icon = "doc-full-inverse"
        label = _("05 What you get")
        template = "services/parts/what_you_get.html"


class StandardBlock(blocks.StructBlock):
    number = blocks.CharBlock(
        label=_("number"), max_length=60, required=False, help_text=_("e.g. ISO 2859-1")
    )
    name = blocks.CharBlock(label=_("what it is"), max_length=120, required=False)


class StandardsBlock(blocks.StructBlock):
    heading = _heading()
    standards = blocks.ListBlock(StandardBlock(), label=_("standards"), default=[])

    class Meta:
        icon = "tasks"
        label = _("06 Standards we work to")
        template = "services/parts/standards.html"


class WhereBlock(blocks.StructBlock):
    """Offices are page choosers on any page until ``OfficePage`` exists (D26, T20)."""

    heading = _heading()
    text = blocks.RichTextBlock(label=_("text"), features=RICH, required=False)
    offices = blocks.ListBlock(
        blocks.PageChooserBlock(), label=_("offices"), default=[], required=False
    )

    class Meta:
        icon = "site"
        label = _("07 Where we do it")
        template = "services/parts/where.html"


class RelatedBlock(blocks.StructBlock):
    pages = blocks.ListBlock(
        blocks.PageChooserBlock(), label=_("related pages"), default=[], max_num=4
    )

    class Meta:
        icon = "link"
        label = _("08 Related services")
        template = "services/parts/related.html"


class QuestionBlock(blocks.StructBlock):
    question = blocks.CharBlock(label=_("question"), max_length=160, required=False)
    answer = blocks.RichTextBlock(label=_("answer"), features=RICH, required=False)


class QABlock(blocks.StructBlock):
    """``qa`` of master plan 04: a ``<details>`` list, the first one open."""

    questions = blocks.ListBlock(QuestionBlock(), label=_("questions"), default=[])

    class Meta:
        icon = "help"
        label = _("09 Questions and answers")
        template = "services/parts/qa.html"


class ContactBlock(blocks.StructBlock):
    """The named contact (left column) and the request form at the end. The form is the
    core request form named by ``schema``; until T17 the part links to it."""

    person = SnippetChooserBlock("people.Person", label=_("named contact"), required=False)
    action_label = blocks.CharBlock(
        label=_("action"), max_length=60, required=False, default="Request a quote"
    )
    heading = _heading()
    schema = blocks.CharBlock(
        label=_("form"),
        max_length=40,
        default="quote",
        help_text=_("Request schema key, e.g. 'quote'."),
    )

    class Meta:
        icon = "mail"
        label = _("10 Contact and request form")
        template = "services/parts/contact.html"


class ReviewedBlock(blocks.StructBlock):
    date = blocks.DateBlock(label=_("last reviewed"), required=False)
    office = blocks.PageChooserBlock(label=_("owning office"), required=False)
    owner = blocks.CharBlock(
        label=_("owner"),
        max_length=120,
        required=False,
        help_text=_("Role of the person who owns the page, e.g. 'Inspection services head'."),
    )

    class Meta:
        icon = "date"
        label = _("11 Last reviewed")
        template = "services/parts/reviewed.html"


SERVICE_PARTS = [
    ("what_it_is", WhatItIsBlock()),
    ("who_needs_it", WhoNeedsItBlock()),
    ("how_it_works", HowItWorksBlock()),
    ("documents", DocumentsBlock()),
    ("what_you_get", WhatYouGetBlock()),
    ("standards", StandardsBlock()),
    ("where", WhereBlock()),
    ("related", RelatedBlock()),
    ("qa", QABlock()),
    ("contact", ContactBlock()),
    ("reviewed", ReviewedBlock()),
]

PART_NAMES = [name for name, _block in SERVICE_PARTS]

# The "On this page" titles (proposal 01 §6). "reviewed" is the closing line, not listed.
PART_TITLES = {
    "what_it_is": _("What it is"),
    "who_needs_it": _("Who needs it"),
    "how_it_works": _("How it works"),
    "documents": _("What you give us"),
    "what_you_get": _("What you get"),
    "standards": _("Standards we work to"),
    "where": _("Where we do it"),
    "related": _("Related services"),
    "qa": _("Questions and answers"),
    "contact": _("Your contact and request form"),
}

PART_BLOCK_COUNTS = {name: {"max_num": 1} for name in PART_NAMES}
