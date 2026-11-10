"""Core Django settings: apps, middleware, templates.

App lists, middleware and the TEMPLATES shape come from the CMS core
(`zeneon_cms.settings`); this site adds only its own apps and template dir.
"""

from decouple import Csv
from zeneon_cms.settings.apps import MIDDLEWARE as CORE_MIDDLEWARE
from zeneon_cms.settings.apps import installed_apps
from zeneon_cms.settings.templates import build_templates

from tic.settings.components import BASE_DIR, config

DEBUG = False

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="", cast=Csv())

# noindex everywhere until the production host is live (master plan 10, P-1).
SITE_INDEXABLE = config("SITE_INDEXABLE", default=False, cast=bool)

# Site apps first (their templates win), then the zeneon-cms core, Wagtail, Django, axes.
# TIC uses the core's services, locations (offices), people (leadership), legal (policy
# pages) and news (news, insights, regulatory updates): D19. The MCP server is not
# mounted for TIC in V1 (master plan 16).
INSTALLED_APPS = installed_apps(
    ["apps.pages"],
    exclude=["zeneon_cms.mcp"],
)

MIDDLEWARE = list(CORE_MIDDLEWARE)

ROOT_URLCONF = "tic.urls"
WSGI_APPLICATION = "tic.wsgi.application"

TEMPLATES = build_templates([BASE_DIR / "templates"])

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
