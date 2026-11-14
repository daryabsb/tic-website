from django.apps import AppConfig


class TrainingConfig(AppConfig):
    name = "apps.training"
    label = "training"
    verbose_name = "TIC training catalogue"
    default_auto_field = "django.db.models.BigAutoField"
