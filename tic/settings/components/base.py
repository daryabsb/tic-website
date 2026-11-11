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
# The core is the admin and the plumbing only (requests, notify, seo, security,
# translation, review, caching, admin skin). Every TIC page type is a TIC app, as
# master plan 03 lists them (D22): the core's generic page-type apps are excluded. The
# MCP server is not mounted for TIC in V1 (master plan 16).
INSTALLED_APPS = installed_apps(
    ["apps.pages"],
    exclude=[
        "zeneon_cms.services",
        "zeneon_cms.locations",
        "zeneon_cms.people",
        "zeneon_cms.legal",
        "zeneon_cms.news",
        "zeneon_cms.mcp",
    ],
)

MIDDLEWARE = list(CORE_MIDDLEWARE)

ROOT_URLCONF = "tic.urls"
WSGI_APPLICATION = "tic.wsgi.application"

TEMPLATES = build_templates([BASE_DIR / "templates"])

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
