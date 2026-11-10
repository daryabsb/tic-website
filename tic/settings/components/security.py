"""Security settings shared by every environment, from the CMS core.

Cookies, password validators, django-axes keyed on CF-Connecting-IP. Caddy owns the
response headers; production.py turns on the secure-cookie and proxy settings.
"""

from zeneon_cms.settings.security import *  # noqa: F403
