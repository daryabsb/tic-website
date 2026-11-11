"""WSGI entry point for gunicorn (`gunicorn tic.wsgi:application`)."""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tic.settings")

application = get_wsgi_application()
