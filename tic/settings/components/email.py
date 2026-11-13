"""Email in staging/production: Microsoft 365 when MS365_TENANT_ID is set (TIC's own
mail; zeneon_cms.notify.graph, D43), else Resend through django-anymail (ticket #9).

Development prints mail to the console (environments/development.py). Variable names
follow deploy/.env.example.
"""

from email.utils import getaddresses

from tic.settings.components import config

MS365_GRAPH = {
    "TENANT_ID": config("MS365_TENANT_ID", default=""),
    "CLIENT_ID": config("MS365_CLIENT_ID", default=""),
    "CLIENT_SECRET": config("MS365_CLIENT_SECRET", default=""),
}
if MS365_GRAPH["TENANT_ID"]:
    EMAIL_BACKEND = "zeneon_cms.notify.graph.GraphEmailBackend"
else:
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
