"""Local development: runserver against a local Postgres 16 (deploy/compose.dev.yaml)."""

from decouple import Csv

from tic.settings.components import config

DEBUG = True

# Development only; staging and production read a real key from the environment.
SECRET_KEY = config("SECRET_KEY", default="django-insecure-development-only")

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1,[::1]", cast=Csv())

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
