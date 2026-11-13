"""``manage.py purge_lookups``: delete Verify lookups older than 90 days (master plan 06).
Run daily by the platform timer."""

from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.verify.models import Lookup


class Command(BaseCommand):
    help = "Delete Verify lookups older than TIC_VERIFY['lookup_retention_days']."

    def handle(self, *args, **options):
        days = settings.TIC_VERIFY.get("lookup_retention_days", 90)
        cut = timezone.now() - timedelta(days=days)
        count, _ = Lookup.objects.filter(created_at__lt=cut).delete()
        self.stdout.write(f"purge_lookups: {count} older than {days} days deleted")
