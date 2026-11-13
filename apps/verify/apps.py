from django.apps import AppConfig


class VerifyConfig(AppConfig):
    name = "apps.verify"
    label = "verify"
    verbose_name = "TIC certificate verification"
    default_auto_field = "django.db.models.BigAutoField"
