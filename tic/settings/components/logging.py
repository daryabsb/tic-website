"""Logging from the CMS core: stdout for `docker compose logs`; request errors also
mailed to ADMINS."""

from zeneon_cms.settings.logging import build_logging

from tic.settings.components import config

LOGGING = build_logging(config("LOG_LEVEL", default="INFO"))
