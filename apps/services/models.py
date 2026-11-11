"""Services (master plan 03; proposal 01 §5.3, §6; design B-Services*, B-Service-PSI).

- ``ServiceIndexPage``: the hub, one per language under Home. Lists each group with its
  live services.
- ``ServiceGroupPage``: one of the seven groups, its service cards and the "how it is
  done" band.
- ``ServicePage``: the eleven parts (``apps.services.blocks``). Publishing is refused
  until every part is filled in order, and on a testing page until the partner
  laboratory is named (``apps.services.rules``; D26).
- ``Partner``: a partner laboratory or subcontractor, named on every testing page
  (proposal 01 §5.3 note 1).
"""

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.forms import WagtailAdminPageForm
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, PageChooserPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.snippets.models import register_snippet
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _image, _translatable
from apps.services.blocks import PART_BLOCK_COUNTS, PART_TITLES, SERVICE_PARTS
from apps.services.rules import service_page_problems


class Partner(models.Model):
    """A partner laboratory or subcontractor. Every field is required: a testing page
    names the laboratory, where it is, and under which accreditation number."""

    name = models.CharField(_("name"), max_length=160)
    location = models.CharField(_("location"), max_length=120, help_text=_("City, country"))
    accreditation_body = models.CharField(
        _("accreditation body"), max_length=80, help_text=_("e.g. NABL, EIAC")
    )
    accreditation_number = models.CharField(_("accreditation number"), max_length=60)
    scope = models.CharField(
        _("scope"), max_length=240, help_text=_("What they test for us, e.g. 'Food chemistry'")
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("location"),
        FieldPanel("accreditation_body"),
        FieldPanel("accreditation_number"),
        FieldPanel("scope"),
    ]

    class Meta:
        verbose_name = _("partner laboratory")
        verbose_name_plural = _("partner laboratories")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}, {self.location}"


register_snippet(Partner)


GROUPS = [
    ("inspection", _("Inspection")),
    ("testing", _("Testing")),
    ("certification", _("Certification")),
    ("programs", _("Government & Trade Programs")),
    ("audits", _("Audits")),
    ("training", _("Training")),
    ("sustainability", _("Sustainability")),
]


def _header_panel():
    return MultiFieldPanel(
        [FieldPanel("header_image"), FieldPanel("header_image_alt"), FieldPanel("header_caption")],
        heading=_("Page header"),
    )


class _HeaderFields(models.Model):
    """The page head of PageHead.dc.html: a real photo (or the grey plate) with its red
    caption bar, and the intro sentence."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    header_image = _image(_("header photo"))
    header_image_alt = models.CharField(_("header photo alt text"), max_length=200, blank=True)
    header_caption = models.CharField(
        _("header caption"),
        max_length=80,
        blank=True,
        help_text=_("The red caption bar: place and subject, e.g. 'Sharjah · Container loading'."),
    )

    class Meta:
        abstract = True


class ServiceIndexPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    parent_page_types = ["pages.HomePage"]
    subpage_types = ["services.ServiceGroupPage"]
    max_count_per_parent = 1
    template = "services/service_index.html"

    override_translatable_fields = _translatable(
        "intro", "header_image_alt", "header_caption", synchronised=("header_image",)
    )

    content_panels = [*Page.content_panels, FieldPanel("intro"), _header_panel()]

    class Meta:
        verbose_name = _("service index")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["groups"] = [
            (group, group.get_children().live().public().specific())
            for group in self.get_children().live().public().specific()
        ]
        return context


class ServiceGroupPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    group = models.CharField(_("group"), max_length=20, choices=GROUPS)
    summary = models.CharField(
        _("summary"),
        max_length=300,
        blank=True,
        help_text=_("One sentence on the services hub."),
    )
    link_label = models.CharField(
        _("link label"),
        max_length=60,
        blank=True,
        help_text=_("On the hub, e.g. 'All inspection services'."),
    )
    see_also = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("link to"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_(
            "Programs and Training have their own sections: the hub link goes there. "
            "Blank: it goes to this page."
        ),
    )
    how_heading = models.CharField(
        _("'how it is done' heading"),
        max_length=120,
        blank=True,
        help_text=_("e.g. 'How inspection is done at TIC'."),
    )
    how_points = StreamField(
        [("point", blocks.CharBlock(label=_("point"), max_length=240))],
        blank=True,
        verbose_name=_("'how it is done' points"),
    )

    parent_page_types = ["services.ServiceIndexPage"]
    subpage_types = ["services.ServicePage"]
    template = "services/service_group.html"

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "summary",
        "link_label",
        "how_heading",
        "how_points",
        synchronised=("header_image", "group", "see_also"),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("group"),
        FieldPanel("intro"),
        _header_panel(),
        MultiFieldPanel(
            [FieldPanel("summary"), FieldPanel("link_label"), PageChooserPanel("see_also")],
            heading=_("On the services hub"),
        ),
        MultiFieldPanel(
            [FieldPanel("how_heading"), FieldPanel("how_points")],
            heading=_("How it is done"),
        ),
    ]

    class Meta:
        verbose_name = _("service group")

    @property
    def hub_link(self):
        return self.see_also or self

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["services"] = self.get_children().live().public().specific()
        return context


class ServicePageForm(WagtailAdminPageForm):
    """Refuses publish and submit-for-review while the page breaks the publish rule.
    "Save draft" runs with deferred validation and is always allowed (D26)."""

    def clean(self):
        cleaned = super().clean()
        if self.is_deferred_validation:
            return cleaned
        parent = self.parent_page.specific if self.parent_page else None
        problems = service_page_problems(
            intro=cleaned.get("intro"),
            parts=cleaned.get("parts"),
            group=getattr(parent, "group", None),
            partner_lab=cleaned.get("partner_lab"),
        )
        if problems:
            raise ValidationError(problems)
        return cleaned


class ServicePage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    summary = models.CharField(
        _("summary"),
        max_length=240,
        blank=True,
        help_text=_("One sentence on the group's service cards."),
    )
    card_caption = models.CharField(
        _("card caption"),
        max_length=40,
        blank=True,
        help_text=_("Caption bar on the card photo, e.g. 'Factory'."),
    )
    talk_label = models.CharField(
        _("second button"),
        max_length=60,
        blank=True,
        default="Talk to an inspector",
        help_text=_("Dark button under the intro, to the contact page. Blank: no button."),
    )
    partner_lab = models.ForeignKey(
        Partner,
        verbose_name=_("partner laboratory"),
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="service_pages",
        help_text=_("Required on testing pages: who does the analysis."),
    )
    parts = StreamField(
        SERVICE_PARTS,
        block_counts=PART_BLOCK_COUNTS,
        blank=True,
        verbose_name=_("the eleven parts"),
        help_text=_("Each part once, in order 01 to 11. All eleven are needed to publish."),
    )

    parent_page_types = ["services.ServiceGroupPage"]
    subpage_types = []
    template = "services/service_page.html"
    base_form_class = ServicePageForm

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "summary",
        "card_caption",
        "talk_label",
        "parts",
        synchronised=("header_image", "partner_lab"),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        MultiFieldPanel(
            [FieldPanel("summary"), FieldPanel("card_caption"), FieldPanel("talk_label")],
            heading=_("Cards and buttons"),
        ),
        FieldPanel("partner_lab"),
        FieldPanel("parts"),
    ]

    class Meta:
        verbose_name = _("service page")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["toc"] = [
            (block.block_type, PART_TITLES[block.block_type])
            for block in self.parts
            if block.block_type in PART_TITLES
        ]
        context["contact"] = next(
            (block.value for block in self.parts if block.block_type == "contact"), None
        )
        # The contact page of this language (T26). The home page is the locale root.
        home = self.get_ancestors().filter(depth=2).first()
        context["contact_href"] = f"{home.url}contact/" if home else ""
        return context
