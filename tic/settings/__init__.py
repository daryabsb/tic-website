"""TIC settings: django-split-settings, environment chosen by DJANGO_ENV.

Components load first, in order; the environment file loads last and may read or
override anything a component defined. DJANGO_ENV is one of ENVIRONMENTS and
defaults to "development". Same layout as MLP (mlp/settings).
"""

import os

from split_settings.tools import include

ENVIRONMENTS = ("development", "test", "staging", "production")

DJANGO_ENV = os.environ.get("DJANGO_ENV") or "development"
if DJANGO_ENV not in ENVIRONMENTS:
    raise RuntimeError(f"DJANGO_ENV must be one of {ENVIRONMENTS}, got {DJANGO_ENV!r}")

include(
    "components/base.py",
    "components/database.py",
    "components/i18n.py",
    "components/wagtail.py",
    "components/email.py",
    "components/security.py",
    "components/caching.py",
    "components/static_media.py",
    "components/logging.py",
    "components/zeneon.py",
    f"environments/{DJANGO_ENV}.py",
)
