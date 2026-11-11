"""Industries (master plan 03; proposal 01 §5.4; design B-Industries, B-Industry-Food).

A second door into the same services (D2, D3): an industry page lists the services and
programs that matter to its sector, why traders use TIC, and where the work is done.

- ``IndustryIndexPage``: the hub, one per language under Home; the industries as photo
  cards.
- ``IndustryPage``: the head, the service cards, the dark "why" band with up to three
  figures (a figure without an owner does not render), and "where we do it".

D29: "where" is a list of text rows until T20 builds ``OfficePage``; the insights
column waits for the news app (T25); programs are service cards (to the Programs group
until T18), not a separate list.
"""

from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.blocks import FigureBlock
from apps.pages.models import _translatable
from apps.services.models import ServiceGroupPage, _header_panel, _HeaderFields


class ServiceCardBlock(blocks.StructBlock):
    """A card to a service, a service group or a program. The small red line above the
    title is the page's service group."""

    page = blocks.PageChooserBlock(
        label=_("page"),
        page_type=["services.ServicePage", "services.ServiceGroupPage"],
    )
    title = blocks.CharBlock(
        label=_("title"), max_length=80, required=False, help_text=_("Blank: the page title.")
    )
    text = blocks.CharBlock(label=_("text"), max_length=200)

    class Meta:
        icon = "link"
        label = _("Service card")


class IndustryIndexPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    heading = models.CharField(
        _("list heading"), max_length=80, blank=True, help_text=_("e.g. 'Eight industries'.")
    )

    parent_page_types = ["pages.HomePage"]
    subpage_types = ["industries.IndustryPage"]
    max_count_per_parent = 1
    template = "industries/industry_index.html"

    override_translatable_fields = _translatable(
        "intro", "header_image_alt", "header_caption", "heading", synchronised=("header_image",)
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        FieldPanel("heading"),
    ]

    class Meta:
        verbose_name = _("industry index")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["industries"] = self.get_children().live().public().specific()
        return context


class IndustryPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    summary = models.CharField(
        _("summary"), max_length=240, blank=True, help_text=_("One sentence on the hub card.")
    )
    card_caption = models.CharField(
        _("card caption"),
        max_length=40,
        blank=True,
        help_text=_("Caption bar on the hub card photo, e.g. 'Marine'."),
    )
    services_heading = models.CharField(
        _("services heading"),
        max_length=120,
        blank=True,
        help_text=_("e.g. 'Services for food and agricultural trade'."),
    )
    services = StreamField(
        [("card", ServiceCardBlock())], blank=True, verbose_name=_("service cards")
    )
    why_heading = models.CharField(_("'why' heading"), max_length=120, blank=True)
    why_text = models.TextField(_("'why' text"), max_length=400, blank=True)
    figures = StreamField(
        [("figure", FigureBlock())],
        blank=True,
        max_num=3,
        verbose_name=_("figures"),
        help_text=_("Up to three. A figure without an owner is not shown."),
    )
    where_heading = models.CharField(
        _("'where' heading"), max_length=80, blank=True, default="Where we do it"
    )
    where_points = StreamField(
        [("point", blocks.CharBlock(label=_("point"), max_length=240))],
        blank=True,
        verbose_name=_("'where' points"),
        help_text=_("e.g. 'Origin: Lahore, Bangkok'. Office links come with the office pages."),
    )

    parent_page_types = ["industries.IndustryIndexPage"]
    subpage_types = []
    template = "industries/industry_page.html"

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "summary",
        "card_caption",
        "services_heading",
        "services",
        "why_heading",
        "why_text",
        "figures",
        "where_heading",
        "where_points",
        synchronised=("header_image",),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        MultiFieldPanel(
            [FieldPanel("summary"), FieldPanel("card_caption")], heading=_("On the industries hub")
        ),
        MultiFieldPanel(
            [FieldPanel("services_heading"), FieldPanel("services")], heading=_("Services")
        ),
        MultiFieldPanel(
            [FieldPanel("why_heading"), FieldPanel("why_text"), FieldPanel("figures")],
            heading=_("Why TIC (dark band)"),
        ),
        MultiFieldPanel(
            [FieldPanel("where_heading"), FieldPanel("where_points")], heading=_("Where")
        ),
    ]

    class Meta:
        verbose_name = _("industry page")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["cards"] = [card for card in map(service_card, self.services) if card]
        context["shown_figures"] = [f.value for f in self.figures if f.value.get("owner")]
        return context


def service_card(block):
    """``(href page, eyebrow, title, text)`` for a card, or None when its page is gone.
    A service page that is not live yet sends the visitor to its live group page."""
    page = block.value["page"]
    if page is None:
        return None
    page = page.specific
    group = page if isinstance(page, ServiceGroupPage) else page.get_parent().specific
    target = page if page.live else group
    if not target.live:
        return None
    if isinstance(target, ServiceGroupPage):
        target = target.hub_link
    eyebrow = group.get_group_display() if isinstance(group, ServiceGroupPage) else ""
    title = block.value["title"] or page.title
    return target, eyebrow, title, block.value["text"]
