"""TIC's offices (master plan 03 OfficePage; 07 "WhatsApp"; D11; design
B-Office-Baghdad).

- ``OfficeIndexPage``: /<lang>/offices/, every live office, head office first.
- ``OfficePage``: one office. Channels, address, hours with the time zone, legal entity,
  languages, the reply promise, what is sold and delivered from it, the people who agreed
  to be named. Its numbers drive the red CTA band on its own page and on the pages it
  owns (``apps.offices.channels``).

A value in square brackets is a placeholder an office still owes (P-17): it is shown as
text, never turned into a ``tel:``, ``mailto:`` or ``wa.me`` link.

The WeChat rule (D11): an office in China never has a WhatsApp number, so its page and
its CTA band never show wa.me; it shows the WeChat ID (and QR) and a China phone.
"""

from datetime import datetime
from zoneinfo import ZoneInfo, available_timezones

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.admin.forms import WagtailAdminPageForm
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _image, _translatable
from apps.services.models import _header_panel, _HeaderFields

NO_WHATSAPP_COUNTRIES = {"China"}  # D11: WeChat and a China phone instead


def is_placeholder(value: str) -> bool:
    value = (value or "").strip()
    return not value or value.startswith("[")


class SoldHereBlock(blocks.StructBlock):
    page = blocks.PageChooserBlock(label=_("page"))
    eyebrow = blocks.CharBlock(label=_("eyebrow"), max_length=40, required=False)
    text = blocks.CharBlock(label=_("line"), max_length=120, required=False)

    class Meta:
        label = _("Sold here")
        icon = "link"


class OfficeIndexPage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    template = "offices/office_index.html"
    parent_page_types = ["pages.HomePage"]
    subpage_types = ["offices.OfficePage"]
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro", "header_image_alt", "header_caption", synchronised=("header_image",)
    )
    content_panels = [*Page.content_panels, FieldPanel("intro"), _header_panel()]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("office index")

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["offices"] = offices_of(self)
        return context


def offices_of(index_page):
    """Live office pages under ``index_page``, head office first, then by title."""
    return list(
        OfficePage.objects.child_of(index_page).live().public().order_by("-is_head_office", "title")
    )


class OfficeForm(WagtailAdminPageForm):
    def clean(self):
        cleaned = super().clean()
        problems = office_problems(
            country=cleaned.get("country", ""),
            whatsapp=cleaned.get("whatsapp", ""),
            address=cleaned.get("address", ""),
            phone=cleaned.get("phone", ""),
            email=cleaned.get("email", ""),
            hours=cleaned.get("hours", ""),
            timezone=cleaned.get("timezone", ""),
        )
        for field, message in problems:
            self.add_error(field, message)
        return cleaned


def office_problems(*, country, whatsapp, address, phone, email, hours, timezone):
    """The publish rules of 03 (address, phone or email, hours, time zone) and D11."""
    problems = []
    if country in NO_WHATSAPP_COUNTRIES and (whatsapp or "").strip():
        problems.append(
            ("whatsapp", _("An office in China has no WhatsApp number; use the WeChat ID."))
        )
    if not (address or "").strip():
        problems.append(("address", _("The address is required.")))
    if not ((phone or "").strip() or (email or "").strip()):
        problems.append(("phone", _("A phone number or an email address is required.")))
    if not (hours or "").strip():
        problems.append(("hours", _("The opening days and hours are required.")))
    if timezone not in available_timezones():
        problems.append(("timezone", _("Use a time zone name such as 'Asia/Baghdad'.")))
    return problems


class OfficePage(ScriptNormalisationMixin, _HeaderFields, Page):  # noqa: DJ008 (Page gives __str__)
    city = models.CharField(_("city"), max_length=60)
    country = models.CharField(_("country"), max_length=60)
    is_head_office = models.BooleanField(_("head office"), default=False)
    legal_entity = models.CharField(_("legal entity"), max_length=160, blank=True)
    address = models.TextField(_("address"), max_length=300)
    latitude = models.DecimalField(
        _("latitude"), max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        _("longitude"), max_digits=9, decimal_places=6, null=True, blank=True
    )
    map_image = _image(_("map image"), help_text=_("A static map; no map scripts (China rule)."))
    phone = models.CharField(_("phone"), max_length=60, blank=True)
    whatsapp = models.CharField(
        _("WhatsApp"),
        max_length=60,
        blank=True,
        help_text=_("Never for an office in China (D11)."),
    )
    wechat_id = models.CharField(_("WeChat ID"), max_length=60, blank=True)
    wechat_qr = _image(_("WeChat QR code"))
    email = models.CharField(_("email"), max_length=120, blank=True)
    mailbox_owner = models.CharField(_("mailbox owner"), max_length=120, blank=True)
    hours = models.CharField(_("opening days and hours"), max_length=160)
    timezone = models.CharField(_("time zone"), max_length=40, default="Asia/Dubai")
    languages = models.CharField(_("languages"), max_length=160, blank=True)
    reply_promise = models.CharField(
        _("reply promise"),
        max_length=200,
        blank=True,
        default="A named person answers within one working day.",
    )
    team_photo = _image(_("team photo"))
    team_caption = models.CharField(_("team photo caption"), max_length=80, blank=True)
    sold_here = StreamField(
        [("item", SoldHereBlock())], blank=True, verbose_name=_("sold and delivered from here")
    )
    reviewed = models.DateField(_("last reviewed"), null=True, blank=True)

    base_form_class = OfficeForm
    parent_page_types = ["offices.OfficeIndexPage"]
    subpage_types = []

    override_translatable_fields = _translatable(
        "intro",
        "header_image_alt",
        "header_caption",
        "city",
        "country",
        "address",
        "hours",
        "languages",
        "reply_promise",
        "team_caption",
        "sold_here",
        synchronised=(
            "header_image",
            "is_head_office",
            "legal_entity",
            "latitude",
            "longitude",
            "map_image",
            "phone",
            "whatsapp",
            "wechat_id",
            "wechat_qr",
            "email",
            "mailbox_owner",
            "timezone",
            "team_photo",
            "reviewed",
        ),
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        _header_panel(),
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("city"), FieldPanel("country")]),
                FieldPanel("is_head_office"),
                FieldPanel("legal_entity"),
                FieldPanel("address"),
                FieldRowPanel([FieldPanel("latitude"), FieldPanel("longitude")]),
                FieldPanel("map_image"),
            ],
            heading=_("Where"),
        ),
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("phone"), FieldPanel("whatsapp")]),
                FieldRowPanel([FieldPanel("wechat_id"), FieldPanel("wechat_qr")]),
                FieldRowPanel([FieldPanel("email"), FieldPanel("mailbox_owner")]),
                FieldRowPanel([FieldPanel("hours"), FieldPanel("timezone")]),
                FieldPanel("languages"),
                FieldPanel("reply_promise"),
            ],
            heading=_("Reach the office"),
        ),
        FieldPanel("sold_here"),
        MultiFieldPanel(
            [FieldPanel("team_photo"), FieldPanel("team_caption"), FieldPanel("reviewed")],
            heading=_("Team and review"),
        ),
    ]
    search_fields = [
        *Page.search_fields,
        index.SearchField("city"),
        index.SearchField("country"),
        index.SearchField("address"),
        index.SearchField("intro"),
    ]

    class Meta:
        verbose_name = _("office page")

    def clean(self):
        super().clean()
        problems = office_problems(
            country=self.country,
            whatsapp=self.whatsapp,
            address=self.address,
            phone=self.phone,
            email=self.email,
            hours=self.hours,
            timezone=self.timezone,
        )
        if problems:
            raise ValidationError(dict(problems))

    # -- what the templates and the CTA band read -----------------------------------

    @property
    def whatsapp_allowed(self) -> bool:
        return self.country not in NO_WHATSAPP_COUNTRIES

    @property
    def whatsapp_number(self) -> str:
        """The number a wa.me link may use: "" for China and for a placeholder."""
        if not self.whatsapp_allowed or is_placeholder(self.whatsapp):
            return ""
        return self.whatsapp

    @property
    def whatsapp_link(self) -> str:
        from zeneon_cms.requests.links import whatsapp_url

        return whatsapp_url(self.whatsapp_number) if self.whatsapp_number else ""

    @property
    def phone_number(self) -> str:
        return "" if is_placeholder(self.phone) else self.phone

    @property
    def email_address(self) -> str:
        return "" if is_placeholder(self.email) or "@" not in self.email else self.email

    @property
    def routing_email(self) -> str:
        """The core's routing reads this when a rule has no address of its own."""
        return self.email_address

    @property
    def utc_offset(self) -> str:
        """'UTC+3' for the time zone today (it follows daylight saving)."""
        try:
            offset = datetime.now(ZoneInfo(self.timezone)).utcoffset()
        except (KeyError, ValueError):
            return ""
        minutes = int(offset.total_seconds() // 60)
        sign = "+" if minutes >= 0 else "-"
        hours, rest = divmod(abs(minutes), 60)
        return f"UTC{sign}{hours}" + (f":{rest:02d}" if rest else "")

    @property
    def map_url(self) -> str:
        """OpenStreetMap, not Google Maps: the page must load in mainland China."""
        if self.latitude is None or self.longitude is None:
            return ""
        return (
            f"https://www.openstreetmap.org/?mlat={self.latitude}&mlon={self.longitude}"
            f"#map=17/{self.latitude}/{self.longitude}"
        )

    def get_context(self, request, *args, **kwargs):
        from apps.people.models import Person
        from apps.programs.models import ProgramPage

        context = super().get_context(request, *args, **kwargs)
        context["office"] = self
        context["people"] = Person.objects.filter(
            office=self, agreed_to_be_named=True, locale=self.locale
        )
        context["programs"] = (
            ProgramPage.objects.live().public().filter(owning_office=self).order_by("title")
        )
        return context
