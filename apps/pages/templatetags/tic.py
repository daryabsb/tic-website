"""``{% load tic %}``: the TIC site's own template tags.

- `{% site_nav as items %}`: the live, in-menu pages under the active language's home.
- `{% home_page as home %}`: the live home page of the active language.
- `{% whatsapp_url "text" as url %}`: wa.me link to SiteSettings.whatsapp_number ("" when
  blank). Per-office numbers come with the offices work (#20).
- `{% request_url as url %}`: the quote form of the active language;
  `{% request_url page as url %}` opens it on that page as the topic (step 1 skipped).
- `{% absolute_static 'img/x.png' %}`: a static file's full URL (emails).
- `{% request_office submission as office %}`: the office that received a request (T17).
- `{% latest_articles 3 as articles %}`: newest live articles of the active language.
- `{{ page|is_within:item }}`: True when ``page`` is ``item`` or one of its descendants.
"""

from django import template
from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse
from django.utils.translation import get_language
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
    """Live office pages of the active language, head office first. Empty until
    OfficePage (#20)."""
    return []
