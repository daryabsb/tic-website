"""StreamField blocks of the home page (proposal 01 §5.2, design DirectionB.dc.html) and
of the About page.

Each block renders one section of the drop. Editors reorder or remove sections; they
cannot change colour, type or spacing (the locked block library, master plan 04).
"""

from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class ProofItemBlock(blocks.StructBlock):
    """One column of the proof strip: a body, what it says about TIC, the number, a
    register link. Every item must have a number and a link (brand rule: no mark
    without its number)."""

    body = blocks.CharBlock(label=_("body"), max_length=40, help_text=_("e.g. ANAB"))
    line_1 = blocks.CharBlock(label=_("line 1"), max_length=80, help_text=_("Standard or scheme"))
    line_2 = blocks.CharBlock(label=_("line 2"), max_length=80, help_text=_("Number and validity"))
    link_label = blocks.CharBlock(label=_("link label"), max_length=40, default="View register")
    link_url = blocks.URLBlock(label=_("register link"))

    class Meta:
        icon = "success"
        label = _("Proof item")


class ProofStripBlock(blocks.StructBlock):
    items = blocks.ListBlock(ProofItemBlock(), min_num=1, max_num=4, label=_("items"))

    class Meta:
        icon = "list-ul"
        label = _("Proof strip")
        template = "pages/blocks/proof_strip.html"


class CardBlock(blocks.StructBlock):
    """A photo card: caption bar on the photo, a title, one sentence, a link."""

    image = ImageChooserBlock(label=_("photo"), required=False)
    caption = blocks.CharBlock(label=_("caption bar"), max_length=40, required=False)
    title = blocks.CharBlock(label=_("title"), max_length=80)
    text = blocks.TextBlock(label=_("text"), max_length=240, required=False)
    page = blocks.PageChooserBlock(label=_("links to"), required=False)

    class Meta:
        icon = "image"
        label = _("Card")


class CardsBlock(blocks.StructBlock):
    """ "What do you need?": the six service cards (or any set of photo cards)."""

    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="What do you need?")
    link_label = blocks.CharBlock(label=_("link label"), max_length=40, required=False)
    link_page = blocks.PageChooserBlock(label=_("link page"), required=False)
    cards = blocks.ListBlock(CardBlock(), min_num=1, max_num=8, label=_("cards"))

    class Meta:
        icon = "grip"
        label = _("Photo cards")
        template = "pages/blocks/cards.html"


class FigureBlock(blocks.StructBlock):
    """A figure in the dark "Why TIC" band. A figure without an owner does not render
    (nothing invented: the owner is the person who can source it)."""

    value = blocks.CharBlock(label=_("value"), max_length=20, help_text=_("e.g. 2020, 12, 17020"))
    label = blocks.CharBlock(label=_("label"), max_length=80)
    owner = blocks.CharBlock(
        label=_("owner"),
        max_length=80,
        required=False,
        help_text=_("Who sourced this number. Blank: the figure is not shown."),
    )
    highlight = blocks.BooleanBlock(label=_("in red"), required=False, default=False)

    class Meta:
        icon = "order"
        label = _("Figure")


class DarkBandBlock(blocks.StructBlock):
    """ "Why TIC": a dark band with the tile pattern, a text and up to four figures."""

    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="Why TIC")
    text = blocks.TextBlock(label=_("text"), max_length=400)
    link_label = blocks.CharBlock(label=_("link label"), max_length=60, required=False)
    link_page = blocks.PageChooserBlock(label=_("link page"), required=False)
    figures = blocks.ListBlock(FigureBlock(), min_num=0, max_num=4, label=_("figures"))

    class Meta:
        icon = "doc-full-inverse"
        label = _("Dark band with figures")
        template = "pages/blocks/dark_band.html"


class LinkRowBlock(blocks.StructBlock):
    label = blocks.CharBlock(label=_("label"), max_length=80)
    page = blocks.PageChooserBlock(label=_("page"), required=False)

    class Meta:
        icon = "link"
        label = _("Link")


class LinkListBlock(blocks.StructBlock):
    """ "Who do you serve?": a ruled list of links beside a heading and a sentence."""

    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="Who do you serve?")
    text = blocks.TextBlock(label=_("text"), max_length=300, required=False)
    links = blocks.ListBlock(LinkRowBlock(), min_num=1, max_num=12, label=_("links"))

    class Meta:
        icon = "list-ol"
        label = _("Ruled link list")
        template = "pages/blocks/link_list.html"


class ProgramCardBlock(blocks.StructBlock):
    image = ImageChooserBlock(label=_("photo"), required=False)
    caption = blocks.CharBlock(label=_("caption bar"), max_length=40, required=False)
    eyebrow = blocks.CharBlock(label=_("eyebrow"), max_length=60, required=False)
    title = blocks.CharBlock(label=_("title"), max_length=80)
    meta = blocks.CharBlock(
        label=_("meta line"),
        max_length=80,
        required=False,
        help_text=_("e.g. 'Last updated: [date] · Baghdad office'"),
    )
    page = blocks.PageChooserBlock(label=_("links to"), required=False)

    class Meta:
        icon = "doc-empty"
        label = _("Program card")


class ProgramsBlock(blocks.StructBlock):
    """Export programs: one large card and up to four small ones."""

    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="Export programs")
    link_label = blocks.CharBlock(label=_("link label"), max_length=60, required=False)
    link_page = blocks.PageChooserBlock(label=_("link page"), required=False)
    featured = ProgramCardBlock(label=_("large card"))
    cards = blocks.ListBlock(ProgramCardBlock(), min_num=0, max_num=4, label=_("small cards"))

    class Meta:
        icon = "globe"
        label = _("Program cards")
        template = "pages/blocks/programs.html"


class OfficesBlock(blocks.StructBlock):
    """ "Where we are": map plate, text, the office list from the core's locations."""

    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="Where we are")
    text = blocks.TextBlock(label=_("text"), max_length=300, required=False)
    map_image = ImageChooserBlock(label=_("map image"), required=False)
    caption = blocks.CharBlock(label=_("caption bar"), max_length=40, required=False)
    link_label = blocks.CharBlock(label=_("link label"), max_length=60, required=False)
    link_page = blocks.PageChooserBlock(label=_("link page"), required=False)

    class Meta:
        icon = "site"
        label = _("Where we are")
        template = "pages/blocks/offices.html"


class NewsBlock(blocks.StructBlock):
    """The newest three articles of the active language (regulatory updates and news)."""

    heading = blocks.CharBlock(
        label=_("heading"), max_length=80, default="Regulatory updates and news"
    )
    link_label = blocks.CharBlock(label=_("link label"), max_length=60, default="All updates")
    link_page = blocks.PageChooserBlock(label=_("link page"), required=False)

    class Meta:
        icon = "doc-full"
        label = _("Latest news")
        template = "pages/blocks/news.html"


class ContactBandBlock(blocks.StructBlock):
    """The one red block per page: talk to the office nearest you."""

    heading = blocks.CharBlock(
        label=_("heading"), max_length=80, default="Talk to the office nearest you"
    )
    text = blocks.TextBlock(label=_("text"), max_length=300, required=False)

    class Meta:
        icon = "mail"
        label = _("Contact band")
        template = "pages/blocks/contact_band.html"


class ParagraphBlock(blocks.RichTextBlock):
    class Meta:
        icon = "pilcrow"
        label = _("Text")
        template = "pages/blocks/paragraph.html"


class TimelineRowBlock(blocks.StructBlock):
    year = blocks.CharBlock(label=_("year"), max_length=12)
    title = blocks.CharBlock(label=_("title"), max_length=80)
    text = blocks.CharBlock(label=_("text"), max_length=160, required=False)

    class Meta:
        icon = "date"
        label = _("Timeline row")


class TimelineBlock(blocks.StructBlock):
    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="A short, dated timeline")
    rows = blocks.ListBlock(TimelineRowBlock(), min_num=1, max_num=12, label=_("rows"))

    class Meta:
        icon = "date"
        label = _("Timeline")
        template = "pages/blocks/timeline.html"


class SectionLinksBlock(blocks.StructBlock):
    heading = blocks.CharBlock(label=_("heading"), max_length=80, default="In this section")
    links = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("title", blocks.CharBlock(label=_("title"), max_length=80)),
                ("text", blocks.CharBlock(label=_("text"), max_length=160, required=False)),
                ("page", blocks.PageChooserBlock(label=_("page"), required=False)),
            ]
        ),
        min_num=1,
        max_num=12,
        label=_("links"),
    )

    class Meta:
        icon = "list-ul"
        label = _("Section links")
        template = "pages/blocks/section_links.html"


HOME_SECTIONS = [
    ("proof_strip", ProofStripBlock()),
    ("cards", CardsBlock()),
    ("dark_band", DarkBandBlock()),
    ("link_list", LinkListBlock()),
    ("programs", ProgramsBlock()),
    ("offices", OfficesBlock()),
    ("news", NewsBlock()),
    ("contact_band", ContactBandBlock()),
]

ABOUT_SECTIONS = [
    ("paragraph", ParagraphBlock(features=["bold", "italic", "link", "ul", "ol"])),
    ("timeline", TimelineBlock()),
    ("dark_band", DarkBandBlock()),
    ("section_links", SectionLinksBlock()),
    ("contact_band", ContactBandBlock()),
]
