from django.apps import AppConfig


class ServicesConfig(AppConfig):
    name = "apps.services"
    label = "services"
    verbose_name = "TIC services"
    default_auto_field = "django.db.models.BigAutoField"
