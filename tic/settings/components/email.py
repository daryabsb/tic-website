"""Email: Resend through django-anymail in staging/production (ticket #9).

Development prints mail to the console (environments/development.py). Variable names
follow deploy/.env.example.
"""

from email.utils import getaddresses

from tic.settings.components import config

EMAIL_BACKEND = "anymail.backends.resend.EmailBackend"
ANYMAIL = {"RESEND_API_KEY": config("RESEND_API_KEY", default="")}

DEFAULT_FROM_EMAIL = config(
    "DEFAULT_FROM_EMAIL", default="TIC Quality Control <no-reply@localhost>"
)
SERVER_EMAIL = config("SERVER_EMAIL", default="errors@localhost")
# ADMINS="Name <a@example.com>, b@example.com"
ADMINS = [
    (name or addr, addr) for name, addr in getaddresses([config("ADMINS", default="")]) if addr
]
