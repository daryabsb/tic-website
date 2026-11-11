"""Staging runs the production settings; Caddy adds basic auth and noindex.

Staging shares prod's Resend key, so every message it sends carries a prefix:
NOTIFY_PREFIX, or "[staging]" when it is blank or missing.
"""

from split_settings.tools import include

from tic.settings.components import config

include("production.py")

# Staging shows every language: the Arabic reviewer and Darya review here.
ZENEON_CMS["i18n"]["public_languages"] = []  # noqa: F821

ZENEON_CMS["notify"]["prefix"] = config("NOTIFY_PREFIX", default="") or "[staging]"  # noqa: F821
