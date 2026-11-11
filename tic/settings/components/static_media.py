"""Static files (WhiteNoise), public media and private request attachments."""

from zeneon_cms.settings.static_media import MEDIA_URL, STATIC_URL, storages  # noqa: F401

from tic.settings.components import BASE_DIR, config

STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]

MEDIA_ROOT = BASE_DIR / "media"

# Request attachments (zeneon_cms.requests, D25): the "private" storage alias, outside
# MEDIA_ROOT so Caddy never serves them; the core hands them out by signed links only.
PRIVATE_ROOT = config("PRIVATE_ROOT", default=str(BASE_DIR / "private"))


def site_storages(*, manifest: bool) -> dict:
    """The core's STORAGES plus the "private" alias for request attachments."""
    return {
        **storages(manifest=manifest),
        "private": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
            "OPTIONS": {"location": PRIVATE_ROOT, "base_url": None},
        },
    }


# Plain storage so tests and runserver work without collectstatic; staging and
# production switch to WhiteNoise's hashed + compressed storage.
STORAGES = site_storages(manifest=False)
