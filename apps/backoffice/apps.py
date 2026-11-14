from django.apps import AppConfig


class BackofficeConfig(AppConfig):
    name = "apps.backoffice"
    label = "backoffice"
    verbose_name = "TIC back office"
    default_auto_field = "django.db.models.BigAutoField"

    def ready(self):
        from wagtail.signals import page_published

        from apps.offices.access import sync_program_scope

        page_published.connect(sync_program_scope, dispatch_uid="tic-program-scope")
