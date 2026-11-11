"""Production. Every value without a default must be set in the stack .env.

Proxy, secure-cookie and silenced-check settings come from the CMS core
(`zeneon_cms.settings.production`).
"""

from decouple import Csv
from zeneon_cms.settings.production import *  # noqa: F403
from zeneon_cms.settings.production import csrf_trusted_origins

from tic.settings.components import config
from tic.settings.components.static_media import site_storages

DEBUG = False

SECRET_KEY = config("SECRET_KEY")
ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())
WAGTAILADMIN_BASE_URL = config("WAGTAILADMIN_BASE_URL")

# Caddy terminates TLS and forwards X-Forwarded-Proto (SECURE_PROXY_SSL_HEADER, core).
CSRF_TRUSTED_ORIGINS = csrf_trusted_origins(ALLOWED_HOSTS)

# The real spam-check widget keys; never the test keys outside development and tests.
# hCaptcha (D8, D33).
ZENEON_CMS["contact"]["hcaptcha_site_key"] = config("HCAPTCHA_SITE_KEY")  # noqa: F405
ZENEON_CMS["contact"]["hcaptcha_secret_key"] = config("HCAPTCHA_SECRET_KEY")  # noqa: F405

STORAGES = site_storages(manifest=True)

# The languages visitors can reach. English from day one; Arabic goes live after the
# named reviewer signs off (master plan 08): add "ar" to SITE_PUBLIC_LANGUAGES in .env,
# restart, purge the Cloudflare cache.
ZENEON_CMS["i18n"]["public_languages"] = config(  # noqa: F405
    "SITE_PUBLIC_LANGUAGES", default="en", cast=Csv()
)
