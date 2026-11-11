"""pytest and CI. DATABASE_URL points at a Postgres 16 service."""

DEBUG = False

SECRET_KEY = "django-insecure-test-only"  # noqa: S105 - not a secret, tests only

ALLOWED_HOSTS = ["testserver", "localhost"]

EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# Fast hashing keeps user fixtures quick; never used outside tests.
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

# Serve static files from the finders; no collectstatic needed for tests.
WHITENOISE_AUTOREFRESH = True
WHITENOISE_USE_FINDERS = True

WAGTAILSEARCH_BACKENDS = {
    "default": {"BACKEND": "wagtail.search.backends.database", "AUTO_UPDATE": False},
}
