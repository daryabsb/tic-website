"""TIC's configuration of the CMS core: labels, request intake, SEO, analytics, admin
skin.

Keys and defaults: zeneon_cms/conf.py in daryabsb/zeneon-cms. Master plan 02 and 07.
"""

from django.utils.translation import gettext_lazy as _

from tic.settings.components import config

# The core's spam check is Cloudflare Turnstile. TIC needs hCaptcha (D8: Turnstile is not
# available in mainland China); that is core ticket #14. Until it lands, development and
# tests use Turnstile's always-pass test keys and staging reads real keys from .env.
TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"
TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA"  # noqa: S105 - public test key

ZENEON_CMS = {
    # What TIC calls the core's generic page types (master plan 03, D19).
    "labels": {
        "service": {"singular": "Service", "plural": "Services"},
        "person": {"singular": "Person", "plural": "Leadership"},
        "location": {"singular": "Office", "plural": "Our offices"},
        "article": {"singular": "Article", "plural": "News and insights"},
    },
    "contact": {
        "recipient_fallback": "info@ticqc.com",
        "turnstile_site_key": config("TURNSTILE_SITE_KEY", default=TURNSTILE_TEST_SITE_KEY),
        "turnstile_secret_key": config("TURNSTILE_SECRET_KEY", default=TURNSTILE_TEST_SECRET_KEY),
    },
    # Request intake (master plan 07). Codes "TIC-2026-0001". Country and service group
    # are the structured answers routing acts on (#15, #17).
    "requests": {
        "code_prefix": "TIC",
        # Head office: a number typed without + or 00 gets +971 in wa.me and tel: links.
        # Per-office codes come with the routing work (#17).
        "default_country_code": "971",
        "required_fields": ["name", "email"],
        "contact_prefs": [
            ("whatsapp", _("WhatsApp")),
            ("phone", _("Phone call")),
            ("email", _("Email")),
        ],
        "alert_from_email": config("REQUESTS_FROM_EMAIL", default=""),
        "client_reply_to": config("REPLY_TO_EMAIL", default=""),
    },
    # Email only for TIC (D11): the Telegram channel is left out.
    "notify": {
        "channels": ["zeneon_cms.notify.channels.EmailChannel"],
        "prefix": config("NOTIFY_PREFIX", default=""),
    },
    # Edge cache: purged URLs use the public host.
    "cache": {
        "purge_base_urls": [config("WAGTAILADMIN_BASE_URL", default="http://localhost:8000")],
    },
    # Wagtail groups created by the core's data migration (master plan 09). The six TIC
    # roles are built on these three plus the per-office groups (#24).
    "security": {
        "groups": {
            "editors": "Content managers",
            "admins": "Site admins",
            "translators": "Translators: ar",
        },
        "translator_languages": ["ar"],
    },
    # Policy pages (Impartiality, Complaints, Privacy, Terms...) live under About (#22).
    "legal": {"parent_page_types": ["pages.HomePage", "pages.AboutPage"]},
    "locations": {"index_parent_page_types": ["pages.HomePage"]},
    "people": {"index_parent_page_types": ["pages.HomePage", "pages.AboutPage"]},
    "news": {
        "index_parent_page_types": ["pages.HomePage"],
        "per_page": 12,
        "body_help_text": "Plain English. A named author and a date on every article.",
    },
    "seo": {
        "organisation_type": "Organization",
        "logo": "img/logo/tic-logo-512.png",
        "area_served": [
            "United Arab Emirates",
            "Iraq",
            "Egypt",
            "Saudi Arabia",
            "Jordan",
            "India",
            "China",
            "Pakistan",
            "Sri Lanka",
            "Thailand",
            "Malaysia",
            "Brazil",
            "Botswana",
            "Libya",
        ],
        "address_country": "AE",
        "og_locales": {"en": "en_GB", "ar": "ar_AE"},
        "robots_disallow": ["/admin/", "/django-admin/", "/*/request/", "/*/verify/"],
    },
    # Umami, first-party, after consent (master plan 11, D14). The tag appears only once
    # SiteSettings.umami_website_id is set.
    "analytics": {
        "umami_script_url": "/stats/script.js",
        "umami_host_url": "/stats",
        "umami_domains": ["ticqc.com", "www.ticqc.com", "ticqc.ae"],
    },
    # The utility-bar <select> shows the languages' own names (design: English, العربية).
    "i18n": {
        "switcher_labels": {"en": "English", "ar": "العربية"},
    },
    "admin_skin": {
        "logo": "img/logo/tic-logo-primary.png",
        "logo_alt": "TIC Quality Control",
        "favicon": "img/logo/favicon.svg",
        "title": "TIC Quality Control",
        "login_message": "TIC staff sign-in. Each person uses their own account.",
        # Brand: TIC Black and TIC Red (brand book 10, 11).
        "colors": {"primary": "#1E1E1E", "secondary": "#BD2130"},
    },
}
