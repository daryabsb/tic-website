"""``{% load tic %}``: the TIC site's own template tags.

- `{% site_nav as items %}`: the live, in-menu pages under the active language's home.
- `{% home_page as home %}`: the live home page of the active language.
- `{% whatsapp_url "text" as url %}`: wa.me link to SiteSettings.whatsapp_number ("" when
  blank). Per-office numbers come with the offices work (#20).
- `{% request_url as url %}`: the quote form of the active language;
  `{% request_url page as url %}` opens it on that page as the topic (step 1 skipped).
- `{% request_head flow as head %}`: the request page's heading and lead for the
  form's topic: a quote, or a complaint, an application, a course registration (T23).
- `{% absolute_static 'img/x.png' %}`: a static file's full URL (emails).
- `{% request_office submission as office %}`: the office that received a request (T17).
- `{% latest_articles 3 as articles %}`: newest live articles of the active language.
- `{% public_marks as marks %}`: the accreditation marks we may show (T22; footer).
- `{{ page|is_within:item }}`: True when ``page`` is ``item`` or one of its descendants.
"""

from django import template
from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse
from django.utils.translation import get_language, gettext
from zeneon_cms.core.models import SiteSettings
from zeneon_cms.requests.links import whatsapp_url as build_whatsapp_url

register = template.Library()


def _home():
    from apps.pages.models import HomePage

    homes = HomePage.objects.live()
    return (
        homes.filter(locale__language_code=get_language()).first()
        or homes.filter(locale__language_code=settings.LANGUAGE_CODE).first()
    )


@register.simple_tag
def home_page():
    return _home()


@register.simple_tag
def site_nav():
    """Live, in-menu pages directly under the active language's home page."""
    home = _home()
    if home is None:
        return []
    return list(home.get_children().live().public().in_menu().specific())


@register.simple_tag
def whatsapp_url(text=""):
    return build_whatsapp_url(SiteSettings.load().whatsapp_number, text)


@register.simple_tag
def request_url(page=None):
    url = reverse("zeneon_requests_form:request")
    return f"{url}?topic={page.pk}" if page is not None and page.pk else url


@register.simple_tag
def request_head(flow):
    from apps.services.intake import form_kind

    page = flow.topic_page if flow is not None else None
    kind = form_kind(page)
    if kind == "complaint":
        return {
            "title": gettext("Complaints and appeals"),
            "lead": gettext(
                "Tell us what happened. A person who was not involved in the work reads it "
                "and answers you in writing."
            ),
        }
    if kind == "application":
        return {
            "title": gettext("Apply"),
            "lead": gettext(
                "Tell us about you and add your CV (PDF or Word). HR and the hiring office read it."
            ),
        }
    if kind == "course":
        return {"title": gettext("Register for a course"), "lead": page.title}
    return {
        "title": gettext("Request a quote"),
        "lead": gettext(
            "One form for quotes and questions. We send it to the office that handles your "
            "country and service."
        ),
    }


@register.simple_tag
def absolute_static(path):
    """A static file's full URL, for emails (the public base URL + the static URL)."""
    base = getattr(settings, "WAGTAILADMIN_BASE_URL", "").rstrip("/")
    return base + static(path)


@register.simple_tag
def request_office(submission):
    from apps.services.intake import office_for

    return office_for(submission)


@register.simple_tag
def latest_articles(count=3):
    """The newest articles of the active language. Empty until the TIC news app (#23)."""
    return []


@register.filter
def is_within(page, item):
    if page is None or item is None or not hasattr(page, "path"):
        return False
    return page.pk == item.pk or page.path.startswith(item.path)


@register.simple_tag
def office_list():
    """Live office pages of the active language, head office first (T20)."""
    from apps.offices.models import OfficePage

    home = _home()
    if home is None:
        return []
    return list(
        OfficePage.objects.descendant_of(home).live().public().order_by("-is_head_office", "title")
    )


@register.simple_tag
def office_index_url():
    """The active language's office index URL, or "" (T20)."""
    from apps.offices.models import OfficeIndexPage

    home = _home()
    index = OfficeIndexPage.objects.child_of(home).live().first() if home else None
    return index.url if index else ""


@register.simple_tag
def cta_channels(page=None):
    """The numbers of the CTA band: the page's office, else the head office (T20)."""
    from apps.offices.channels import channels_for

    return channels_for(page)


@register.simple_tag
def public_marks():
    """The marks we may show (T22): public Accreditation rows with ``show_mark``."""
    from apps.trust.models import Accreditation

    return list(Accreditation.objects.marks())


@register.simple_tag
def resources_tabs(page):
    """The resource pages of the page's language for the tab strip (T25, D56)."""
    from apps.resources.tabs import resource_pages

    return [(item, item.pk == page.pk) for item in resource_pages(page.locale)]
