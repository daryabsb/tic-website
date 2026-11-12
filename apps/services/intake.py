"""TIC's hooks into the core request form (master plan 07; D39, D41).

- ``topic_pages(request)``: the step-1 choices, ``ZENEON_CMS["requests"]["topic_pages"]``.
  The live service groups of the active language, each followed by its services, in
  menu order. A service page links to the form with ``?topic=<its id>``.
- ``routing_facts(submission)``: ``ZENEON_CMS["requests"]["routing_facts"]``. Adds
  ``service_group`` (the slug of the topic's group, in the default language) so a rule
  can match "service_group = training". The country comes from the ``country`` answer.
- ``office_for(submission)``: what the sent screen and the emails say about the office
  that received the request: name, hours, phone, WhatsApp. The routed rule's page (an
  ``OfficePage`` from T20) gives its own values; until then the site settings do.
"""

from __future__ import annotations

from dataclasses import dataclass

from django.utils.translation import gettext as _
from wagtail.models import Locale, Page
from zeneon_cms.core.models import SiteSettings
from zeneon_cms.requests.links import whatsapp_url

from apps.services.models import ServiceGroupPage, ServicePage


def _locale():
    try:
        return Locale.get_active()
    except Locale.DoesNotExist:
        return Locale.get_default()


def topic_pages(request=None) -> list[Page]:
    locale = _locale()
    groups = ServiceGroupPage.objects.live().filter(locale=locale).order_by("path")
    services = ServicePage.objects.live().filter(locale=locale)
    pages: list[Page] = []
    for group in groups:
        pages.append(group)
        pages.extend(services.child_of(group).order_by("path"))
    return pages


def group_of(page) -> ServiceGroupPage | None:
    if page is None:
        return None
    page = page.specific
    if isinstance(page, ServiceGroupPage):
        return page
    return ServiceGroupPage.objects.ancestor_of(page).first()


def routing_facts(submission) -> dict:
    group = group_of(submission.topic)
    if group is None:
        return {}
    default = group.get_translation_or_none(Locale.get_default()) or group
    return {"service_group": default.slug}


@dataclass
class Office:
    name: str
    hours: str
    phone: str
    whatsapp: str
    whatsapp_link: str = ""


def office_for(submission) -> Office:
    site = SiteSettings.load()
    office = Office(
        name=submission.routed_to or _("TIC Quality Control, head office in Dubai"),
        hours="",
        phone=site.main_phone,
        whatsapp=site.whatsapp_number,
    )
    rule = submission.routed_rule
    page = rule.page.specific if rule is not None and rule.page_id else None
    if page is not None:
        office.hours = getattr(page, "hours", "") or ""
        office.phone = getattr(page, "phone", "") or office.phone
        office.whatsapp = getattr(page, "whatsapp", "") or office.whatsapp
    if office.whatsapp:
        text = _("Hello, I just sent request %(code)s.") % {"code": submission.code}
        office.whatsapp_link = whatsapp_url(office.whatsapp, text)
    return office
