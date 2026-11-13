"""The check behind the Verify page (master plan 06 "Safety rules").

``check(request, number, token)`` applies, in order:

1. the rate limit per client IP (``TIC_VERIFY["rates"]``, 10 a minute and 60 an hour):
   over it, HTTP 429 and no lookup;
2. the human check: after three not-found results in a session, a lookup needs a passed
   hCaptcha (D8), unless it carries the certificate's own QR token;
3. the lookup through the source (``CertificateSource``; V1 the table), written to
   ``Lookup`` with hashes only.

A number is matched exactly after ``normalise`` (capitals, no spaces, Western digits):
never a nearby number, never a list.
"""

from __future__ import annotations

import hashlib
import hmac
import re
import secrets
from dataclasses import dataclass, field
from datetime import datetime

from django.conf import settings
from django.utils import timezone
from django.utils.translation import get_language
from zeneon_cms.contact import spam
from zeneon_cms.core.ip import client_ip

from apps.verify.models import Certificate, Lookup

RATELIMIT_GROUP = "tic_verify"
SESSION_MISSES = "tic_verify_misses"
MAX_NUMBER = 40
NUMBER_SHAPE = re.compile(r"^[A-Z0-9][A-Z0-9/.\-]*$")
# Arabic-Indic and Persian digits typed on an Arabic or Kurdish keyboard.
DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹", "01234567890123456789")


def options() -> dict:
    return {"rates": ["10/m", "60/h"], "misses_before_captcha": 3, **settings.TIC_VERIFY}


def normalise(number: str) -> str:
    return "".join((number or "").translate(DIGITS).split()).upper()[:MAX_NUMBER]


def _hash(value: str) -> str:
    return hmac.new(
        settings.SECRET_KEY.encode(), f"tic-verify:{value}".encode(), hashlib.sha256
    ).hexdigest()


class CertificateSource:
    """Where certificates come from. V1 reads the table that ``import_certificates``
    fills; a nightly sync fills the same table; a live API would subclass this and keep
    the table as its cache (06 "Data"). The page never changes between them."""

    def find(self, number_key: str) -> Certificate | None:
        return Certificate.objects.filter(number_key=number_key).first()


source = CertificateSource()


@dataclass
class Result:
    state: str  # found | not_found | captcha | limited | empty
    number: str = ""
    certificate: Certificate | None = None
    checked_at: datetime = field(default_factory=timezone.now)
    captcha_failed: bool = False

    @property
    def http_status(self) -> int:
        return 429 if self.state == "limited" else 200

    @property
    def captcha(self) -> bool:
        return self.state == "captcha"


def misses(request) -> int:
    return int(request.session.get(SESSION_MISSES, 0))


def captcha_needed(request) -> bool:
    return misses(request) >= options()["misses_before_captcha"]


def check(request, number: str, token: str = "") -> Result:
    typed = " ".join((number or "").split())[:MAX_NUMBER]
    key = normalise(number)
    if not key:
        return Result("empty")
    if spam.rate_limited(request, group=RATELIMIT_GROUP, rates=options()["rates"]):
        return Result("limited", typed)
    certificate = source.find(key) if NUMBER_SHAPE.match(key) else None
    by_qr = bool(
        token and certificate is not None and secrets.compare_digest(token, certificate.qr_token)
    )
    if not by_qr and captcha_needed(request):
        if request.method != "POST":
            return Result("captcha", typed)
        if spam.verify_captcha(request) is spam.Turnstile.FAILED:
            return Result("captcha", typed, captcha_failed=True)
    found = certificate is not None
    Lookup.objects.create(
        number_hash=_hash(key),
        found=found,
        ip_hash=_hash(client_ip(request) or ""),
        user_agent=request.headers.get("User-Agent", "")[:200],
        locale=(get_language() or "")[:8],
        by_qr=by_qr,
    )
    if not found:
        request.session[SESSION_MISSES] = misses(request) + 1
        return Result("not_found", typed)
    return Result("found", certificate.number, certificate)
