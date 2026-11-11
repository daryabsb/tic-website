"""Caches.

- DatabaseCache from the CMS core, used for rate limits (the core's post_migrate
  creates the table).
- Cloudflare frontend-cache purge: the API token (Zone > Cache Purge only) and zone id
  come from the environment. Without them nothing is purged.
"""

from zeneon_cms.settings.caching import CACHES, frontend_cache  # noqa: F401

from tic.settings.components import config

WAGTAILFRONTENDCACHE = frontend_cache(
    cloudflare_token=config("CLOUDFLARE_API_TOKEN", default=""),
    cloudflare_zone_id=config("CLOUDFLARE_ZONE_ID", default=""),
)
