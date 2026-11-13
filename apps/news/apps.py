from django.apps import AppConfig


class NewsConfig(AppConfig):
    name = "apps.news"
    label = "news"
    verbose_name = "TIC news"
    default_auto_field = "django.db.models.BigAutoField"
