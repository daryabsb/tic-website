"""Wagtail. Frontend cache purging: components/caching.py."""

from tic.settings.components import config

WAGTAIL_SITE_NAME = "TIC Quality Control"
WAGTAILADMIN_BASE_URL = config("WAGTAILADMIN_BASE_URL", default="http://localhost:8000")

WAGTAILSEARCH_BACKENDS = {
    "default": {"BACKEND": "wagtail.search.backends.database"},
}

# Every submitted page waits for an approver before it goes live (master plan 09): a
# reviewer who made substantive edits asks another approver.
WAGTAIL_WORKFLOW_REQUIRE_REAPPROVAL_ON_EDIT = True
