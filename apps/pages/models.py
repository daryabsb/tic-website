"""Client page types (master plan 03): HomePage, AboutPage and its Leadership and Our
group children (T21).

HomePage is the root of each language tree. Its hero is four fields (one photo, one
sentence, two buttons — proposal 01 §5.2 item 1); the rest of the home page is one
StreamField, ``sections``. Every other page type of master plan 03 (services, industries,
programs, offices, leadership, policy pages, resources, news, verify) is a TIC app that
follows in gate 1 to 3 (D22); the core supplies the admin and the plumbing only.
"""

from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, PageChooserPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from wagtail_localize.fields import SynchronizedField, TranslatableField
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.blocks import ABOUT_SECTIONS, HOME_SECTIONS, CompanyBlock, PeopleGroupBlock


def _image(verbose_name, help_text=""):
    return models.ForeignKey(
        "wagtailimages.Image",
        verbose_name=verbose_name,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=help_text,
    )


def _translatable(*translated, synchronised=()):
    """``override_translatable_fields``: the page's own text translated, the slug and the
    images kept the same in every language."""
    return [
        *(TranslatableField(name) for name in ("title", "seo_title", "search_description")),
        *(TranslatableField(name) for name in translated),
        SynchronizedField("slug"),
        *(SynchronizedField(name) for name in synchronised),
    ]


class HomePage(ScriptNormalisationMixin, Page):
    hero_image = _image(
        _("hero photo"),
        _(
            "One real photograph of our inspectors at work (brand book 16). "
            "Blank shows the grey plate with the caption until a photo arrives."
        ),
    )
    hero_image_alt = models.CharField(_("hero photo alt text"), max_length=200, blank=True)
    hero_caption = models.CharField(
        _("hero caption"),
        max_length=80,
        blank=True,
        help_text=_("The red caption bar: place and subject, e.g. 'Umm Qasr · Discharge survey'."),
    )
    hero_eyebrow = models.CharField(
        _("eyebrow"),
        max_length=80,
        blank=True,
        default="Testing · Inspection · Certification",
    )
    hero_heading = models.CharField(
        _("heading"),
        max_length=120,
        default="Independent proof, wherever your cargo goes.",
    )
    hero_sentence = models.TextField(
        _("the one sentence"),
        max_length=300,
        default=(
            "We inspect, test and certify goods for exporters, importers and governments "
            "from offices in 12 countries — and every report we issue can be checked."
        ),
    )
    sections = StreamField(
        HOME_SECTIONS,
        blank=True,
        verbose_name=_("sections"),
        help_text=_("The home page below the hero, in the order of proposal 01 §5.2."),
    )
    og_image = _image(_("share image"), _("1200 x 630. Blank uses the site's default share image."))

    parent_page_types = ["wagtailcore.Page"]
    # The index pages of the TIC apps are added here as each app lands (gate 1 to 3).
    subpage_types = [
        "pages.AboutPage",
        "services.ServiceIndexPage",
        "industries.IndustryIndexPage",
        "programs.ProgramIndexPage",
        "news.NewsIndexPage",
        "offices.OfficeIndexPage",
        "verify.VerifyPage",
        "training.TrainingIndexPage",
        "resources.ResourcesPage",
        "resources.DownloadsPage",
        "resources.QAPage",
    ]

    override_translatable_fields = _translatable(
        "hero_image_alt",
        "hero_caption",
        "hero_eyebrow",
        "hero_heading",
        "hero_sentence",
        "sections",
        synchronised=("hero_image", "og_image"),
    )

    content_panels = [
        *Page.content_panels,
        MultiFieldPanel(
            [
                FieldPanel("hero_image"),
                FieldPanel("hero_image_alt"),
                FieldPanel("hero_caption"),
                FieldPanel("hero_eyebrow"),
                FieldPanel("hero_heading"),
                FieldPanel("hero_sentence"),
            ],
            heading=_("Hero: one photo, one sentence"),
        ),
        FieldPanel("sections"),
    ]
    promote_panels = [*Page.promote_panels, FieldPanel("og_image")]

    class Meta:
        verbose_name = _("home page")


class AboutPage(ScriptNormalisationMixin, Page):
    """About — Our story (master plan 03). Leadership, Our group, Accreditations, the
    policy pages, Complaints and Careers are its children (#21, #22, TIC apps)."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    header_image = _image(_("header photo"))
    header_image_alt = models.CharField(_("header photo alt text"), max_length=200, blank=True)
    header_caption = models.CharField(_("header caption"), max_length=80, blank=True)
    sections = StreamField(ABOUT_SECTIONS, blank=True, verbose_name=_("sections"))
    og_image = _image(_("share image"))

    parent_page_types = ["pages.HomePage"]
    subpage_types = [
        "pages.LeadershipPage",
        "pages.GroupPage",
        "trust.AccreditationsPage",
        "trust.ContentPage",
        "trust.ComplaintsPage",
        "careers.CareersPage",
    ]

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "sections",
        synchronised=("header_image", "og_image"),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel(
            [
                FieldPanel("header_image"),
                FieldPanel("header_image_alt"),
                FieldPanel("header_caption"),
            ],
            heading=_("Page header"),
        ),
        FieldPanel("sections"),
    ]
    promote_panels = [*Page.promote_panels, FieldPanel("og_image")]
    search_fields = [*Page.search_fields, index.SearchField("intro"), index.SearchField("sections")]

    class Meta:
        verbose_name = _("about page")


class LeadershipPage(ScriptNormalisationMixin, Page):
    """Leadership (B-Leadership): the CEO quote, then groups of ``Person`` rows. A person
    who has not agreed to be named shows "[Name]" and the title (P-16 default:
    placeholders) until the CEO answers; then editors remove the rows of those who say
    no (their office page represents them)."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    ceo = models.ForeignKey(
        "people.Person",
        verbose_name=_("CEO"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    ceo_quote = models.TextField(
        _("CEO quote"),
        max_length=500,
        blank=True,
        help_text=_("Two or three sentences in the CEO's own words."),
    )
    groups = StreamField(
        [("group", PeopleGroupBlock())], blank=True, verbose_name=_("groups of people")
    )
    note = models.CharField(_("note under the cards"), max_length=240, blank=True)

    parent_page_types = ["pages.AboutPage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro", "ceo_quote", "groups", "note", synchronised=("ceo",)
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel([FieldPanel("ceo"), FieldPanel("ceo_quote")], heading=_("CEO")),
        FieldPanel("groups"),
        FieldPanel("note"),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("leadership page")


class GroupPage(ScriptNormalisationMixin, Page):
    """Our group (B-Group): one card per company, then the independence sentence on the
    dark band (required, proposal 01 §5.6)."""

    intro = models.TextField(_("intro"), max_length=600, blank=True)
    companies = StreamField([("company", CompanyBlock())], blank=True, verbose_name=_("companies"))
    independence_heading = models.CharField(
        _("independence heading"), max_length=80, default="Independence, in one sentence"
    )
    independence = models.TextField(_("independence sentence"), max_length=400)
    independence_link_label = models.CharField(
        _("link label"), max_length=80, blank=True, default="How we keep decisions impartial"
    )
    independence_link_page = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("link page"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("The Impartiality page (T22)."),
    )

    parent_page_types = ["pages.AboutPage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro",
        "companies",
        "independence_heading",
        "independence",
        "independence_link_label",
        synchronised=("independence_link_page",),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        FieldPanel("companies"),
        MultiFieldPanel(
            [
                FieldPanel("independence_heading"),
                FieldPanel("independence"),
                FieldPanel("independence_link_label"),
                PageChooserPanel("independence_link_page"),
            ],
            heading=_("Independence"),
        ),
    ]
    search_fields = [
        *Page.search_fields,
        index.SearchField("intro"),
        index.SearchField("independence"),
    ]

    class Meta:
        verbose_name = _("group page")
