"""TIC's hooks into the core request form (master plan 07; D39, D41).

- ``topic_pages(request)``: the step-1 choices, ``ZENEON_CMS["requests"]["topic_pages"]``.
  The live service groups of the active language, each followed by its services, in
  menu order; the Programs group is followed by the live program pages (T18). A service
  or program page links to the form with ``?topic=<its id>``. The complaints, careers
  and course pages (T23, D53) are topics only when the form was opened from them
  (``topic`` in the query or the post): step 1 of a quote does not offer them.
- ``routing_facts(submission)``: ``ZENEON_CMS["requests"]["routing_facts"]``. Adds
  ``service_group`` (the slug of the topic's group, in the default language) so a rule
  can match "service_group = training", and for a program page ``program`` (its slug in
  the default language). The country comes from the ``country`` answer. A form page
  adds ``form`` (complaint, application, course); a course is also ``service_group =
  training``.
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

from apps.offices.models import OfficePage
from apps.programs.models import ProgramPage
from apps.services.models import ServiceGroupPage, ServicePage


def _locale():
    try:
        return Locale.get_active()
    except Locale.DoesNotExist:
        return Locale.get_default()


def form_kind(page) -> str:
    """``complaint``, ``application`` or ``course`` for a form page (T23); else ""."""
    from apps.careers.models import CareersPage
    from apps.training.models import CoursePage
    from apps.trust.models import ComplaintsPage

    page = page.specific if page is not None else None
    for model, kind in (
        (ComplaintsPage, "complaint"),
        (CareersPage, "application"),
        (CoursePage, "course"),
    ):
        if isinstance(page, model):
            return kind
    return ""


def _form_page(request, locale):
    """The live form page named by ``topic`` in the request (query or post), or None."""
    if request is None:
        return None
    value = request.POST.get("topic") or request.GET.get("topic") or ""
    if not value.isdigit():
        return None
    page = Page.objects.live().public().filter(pk=int(value), locale=locale).first()
    return page.specific if page is not None and form_kind(page) else None


def topic_pages(request=None) -> list[Page]:
    locale = _locale()
    groups = ServiceGroupPage.objects.live().filter(locale=locale).order_by("path")
    services = ServicePage.objects.live().filter(locale=locale)
    programs = ProgramPage.objects.live().filter(locale=locale).order_by("path")
    pages: list[Page] = []
    for group in groups:
        pages.append(group)
        pages.extend(services.child_of(group).order_by("path"))
        if group.group == "programs":
            pages.extend(programs)
    form_page = _form_page(request, locale)
    if form_page is not None:
        pages.append(form_page)
    return pages


def group_of(page) -> ServiceGroupPage | None:
    if page is None:
        return None
    page = page.specific
    if isinstance(page, ServiceGroupPage):
        return page
    if isinstance(page, ProgramPage):
        return ServiceGroupPage.objects.filter(locale=page.locale, group="programs").first()
    return ServiceGroupPage.objects.ancestor_of(page).first()


def _default_slug(page) -> str:
    return (page.get_translation_or_none(Locale.get_default()) or page).slug


def routing_facts(submission) -> dict:
    kind = form_kind(submission.topic)
    if kind == "course":
        return {"form": kind, "service_group": "training"}
    if kind:
        return {"form": kind}
    group = group_of(submission.topic)
    if group is None:
        return {}
    facts = {"service_group": _default_slug(group)}
    topic = submission.topic.specific
    if isinstance(topic, ProgramPage):
        facts["program"] = _default_slug(topic)
    return facts


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
    if isinstance(page, OfficePage):
        # The office's own values; a placeholder is not a number, and an office in
        # China has no WhatsApp, never the head office's instead (D11).
        office.hours = ""  # no opening hours: TIC answers around the clock (D49)
        office.phone = page.phone_number or office.phone
        office.whatsapp = (
            (page.whatsapp_number or site.whatsapp_number) if page.whatsapp_allowed else ""
        )
    elif page is not None:
        office.hours = getattr(page, "hours", "") or ""
        office.phone = getattr(page, "phone", "") or office.phone
        office.whatsapp = getattr(page, "whatsapp", "") or office.whatsapp
    if office.whatsapp:
        text = _("Hello, I just sent request %(code)s.") % {"code": submission.code}
        office.whatsapp_link = whatsapp_url(office.whatsapp, text)
    return office
