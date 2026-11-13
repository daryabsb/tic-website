"""Which office's numbers a page shows (master plan 04 CTA band, 07 "WhatsApp").

An office page shows its own; a page with an ``owning_office`` (a program) shows that
office's; every other page shows the head office's from the site settings. An office in
China gives no WhatsApp at all, never the head office's instead (D11).
"""

from __future__ import annotations

from dataclasses import dataclass

from zeneon_cms.core.models import SiteSettings
from zeneon_cms.requests.links import whatsapp_url


@dataclass
class Channels:
    office: object = None  # the OfficePage, or None for the head office
    whatsapp_link: str = ""
    phone: str = ""
    wechat_id: str = ""
    hours: str = ""


def office_of(page):
    from apps.offices.models import OfficePage

    if page is None or not hasattr(page, "specific_class"):
        return None
    specific = page.specific  # the page itself when it is already specific
    if isinstance(specific, OfficePage):
        return specific
    owner = getattr(specific, "owning_office", None)
    if owner is not None and owner.live:
        owner = owner.specific
        if isinstance(owner, OfficePage):
            return owner
    return None


def channels_for(page, text: str = "") -> Channels:
    office = office_of(page)
    site = SiteSettings.load()
    if office is None:
        return Channels(
            whatsapp_link=whatsapp_url(site.whatsapp_number, text) if site.whatsapp_number else "",
            phone=site.main_phone,
        )
    from apps.offices.models import is_placeholder

    # The office's own numbers; while one is a placeholder, the head office's. Never a
    # WhatsApp for an office in China (D11).
    number = (office.whatsapp_number or site.whatsapp_number) if office.whatsapp_allowed else ""
    return Channels(
        office=office,
        whatsapp_link=whatsapp_url(number, text) if number else "",
        phone=office.phone_number or site.main_phone,
        wechat_id="" if is_placeholder(office.wechat_id) else office.wechat_id,
        hours="" if is_placeholder(office.hours) else office.hours,
    )
