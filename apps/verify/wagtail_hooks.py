"""Verify in the admin (master plan 06): the certificate register (read and search by
number), and a report with the daily count of lookups by result (last 30 days) and the
latest imports."""

from datetime import timedelta

from django.db.models import Count, Q
from django.db.models.functions import TruncDate
from django.shortcuts import render
from django.urls import path, reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from wagtail.admin.viewsets.model import ModelViewSet

from apps.verify.models import Certificate, ImportLog, Lookup

REPORT_DAYS = 30


class CertificateViewSet(ModelViewSet):
    model = Certificate
    icon = "doc-full"
    menu_label = _("Certificates")
    menu_order = 260
    add_to_admin_menu = True
    list_display = ["number", "type", "status", "issue_date", "expiry_date", "issuing_office"]
    list_filter = ["status", "issuing_office"]
    search_fields = ["number", "number_key"]
    form_fields = ["number", "type", "status", "issue_date", "expiry_date", "issuing_office"]
    inspect_view_enabled = True
    inspect_view_fields = [*form_fields, "qr_token", "source", "imported_at"]


@hooks.register("register_admin_viewset")
def register_certificates():
    return CertificateViewSet("verify_certificates")


def daily_counts(days: int = REPORT_DAYS):
    since = timezone.now() - timedelta(days=days)
    return (
        Lookup.objects.filter(created_at__gte=since)
        .annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(
            n_found=Count("id", filter=Q(found=True)), n_missed=Count("id", filter=Q(found=False))
        )
        .order_by("-day")
    )


def lookups_report(request):
    """Wrapped by Wagtail's admin access check (``register_admin_urls``)."""
    context = {
        "rows": daily_counts(),
        "days": REPORT_DAYS,
        "imports": ImportLog.objects.all()[:20],
    }
    return render(request, "verify/admin/lookups.html", context)


@hooks.register("register_admin_urls")
def verify_urls():
    return [path("verify/lookups/", lookups_report, name="verify_lookups")]


@hooks.register("register_reports_menu_item")
def lookups_menu_item():
    return MenuItem(
        _("Verify lookups"), reverse("verify_lookups"), icon_name="tick-inverse", order=900
    )
