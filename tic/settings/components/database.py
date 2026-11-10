"""Database: one PostgreSQL 16 per stack, read from DATABASE_URL."""

from zeneon_cms.settings.database import parse_database_url

from tic.settings.components import config

DATABASES = {"default": parse_database_url(config("DATABASE_URL"))}
