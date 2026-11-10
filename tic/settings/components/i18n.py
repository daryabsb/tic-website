"""Languages and time (master plan 08, D6).

English is the base language: `/` answers 301 to `/en/`. Arabic is the first full second
language; it is in Django's LANGUAGES_BIDI, so {% get_current_language_bidi %} gives
dir="rtl". Chinese, Hindi and Portuguese are added here only when an office requests one
and names a reviewer (proposal 03 §9).
"""

from zeneon_cms.settings.i18n import FORMAT_MODULE_PATH, languages  # noqa: F401

from tic.settings.components import BASE_DIR

LANGUAGE_CODE = "en"
# [("en", "English"), ("ar", "العربية")]
LANGUAGES = languages("en", "ar")
# UI string catalogs (ar) arrive with the templates that need them (#28).
LOCALE_PATHS = [BASE_DIR / "locale"]
USE_I18N = True

WAGTAIL_I18N_ENABLED = True
WAGTAIL_CONTENT_LANGUAGES = LANGUAGES

TIME_ZONE = "Asia/Dubai"  # head office; the server itself runs in UTC
USE_TZ = True
