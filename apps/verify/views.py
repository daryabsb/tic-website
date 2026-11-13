"""The QR link a certificate prints, ``/verify/?n=<number>&t=<token>`` (master plan 06),
has no language prefix: it opens the default language's Verify page with the same
query, where the lookup runs."""

from django.conf import settings
from django.http import HttpResponseRedirect
from django.views.decorators.cache import never_cache


@never_cache
def qr_link(request):
    target = f"/{settings.LANGUAGE_CODE}/verify/"
    query = request.META.get("QUERY_STRING", "")
    return HttpResponseRedirect(f"{target}?{query}" if query else target)
