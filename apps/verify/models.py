"""Certificate verification (master plan 06; D9; design B-Verify).

- ``Certificate``: one row per certificate TIC issued, loaded by ``import_certificates``
  from CSV (V1, proposal 03 §6.4 option 1). Only the D9 fields: number, type, status,
  dates, issuing office. Never a client or a product (P-14).
- ``Lookup``: one row per check, with hashes only (never the number or the IP as typed);
  kept 90 days (``purge_lookups``).
- ``ImportLog``: one row per import, with the counts and the operator (06 "Audit").
- ``VerifyPage``: the page text the Content Manager edits; the check itself is
  ``apps.verify.lookup``.
"""

import secrets
import string

from django.db import models
from django.template.response import TemplateResponse
from django.utils import timezone
from django.utils.cache import add_never_cache_headers
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.models import Page
from wagtail.search import index
from zeneon_cms.core.text import ScriptNormalisationMixin

from apps.pages.models import _translatable

STATUSES = [
    ("valid", _("Valid")),
    ("expired", _("Expired")),
    ("superseded", _("Superseded")),
    ("suspended", _("Suspended")),
    ("withdrawn", _("Withdrawn")),
]
# Shown with the red label (06 "The page").
WARNING_STATUSES = {"superseded", "suspended", "withdrawn"}

SOURCES = [("csv", _("CSV import")), ("sync", _("Nightly sync")), ("api", _("Live API"))]

TOKEN_ALPHABET = string.ascii_letters + string.digits
TOKEN_LENGTH = 16


def new_token() -> str:
    """16 random letters and digits: the QR link cannot be walked (06 "QR")."""
    return "".join(secrets.choice(TOKEN_ALPHABET) for _ in range(TOKEN_LENGTH))


class Certificate(models.Model):
    number = models.CharField(_("certificate number"), max_length=40, help_text=_("As printed."))
    number_key = models.CharField(
        _("number key"),
        max_length=40,
        unique=True,
        editable=False,
        help_text=_("The number in capitals without spaces; a lookup matches on it."),
    )
    type = models.CharField(_("type"), max_length=120)
    status = models.CharField(_("status"), max_length=12, choices=STATUSES)
    issue_date = models.DateField(_("date of issue"))
    expiry_date = models.DateField(_("valid until"), null=True, blank=True)
    issuing_office = models.SlugField(
        _("issuing office"),
        max_length=40,
        help_text=_("The office slug of seed/offices.yaml, e.g. 'baghdad'."),
    )
    qr_token = models.CharField(_("QR token"), max_length=TOKEN_LENGTH, unique=True, editable=False)
    source = models.CharField(_("source"), max_length=8, choices=SOURCES, default="csv")
    imported_at = models.DateTimeField(_("imported at"), default=timezone.now)

    class Meta:
        verbose_name = _("certificate")
        verbose_name_plural = _("certificates")
        ordering = ["number_key"]

    def __str__(self):
        return self.number

    def save(self, *args, **kwargs):
        from apps.verify.lookup import normalise

        self.number_key = normalise(self.number)
        if not self.qr_token:
            self.qr_token = new_token()
        super().save(*args, **kwargs)

    @property
    def shown_status(self) -> str:
        """The status a visitor sees: a valid row past its expiry date reads "expired"."""
        if self.status == "valid" and self.expiry_date and self.expiry_date < timezone.localdate():
            return "expired"
        return self.status

    @property
    def shown_status_label(self):
        return dict(STATUSES)[self.shown_status]

    @property
    def is_warning(self) -> bool:
        return self.shown_status in WARNING_STATUSES

    @property
    def office_page(self):
        """The live office page with this slug, in the active language if it has one."""
        from django.utils.translation import get_language

        from apps.offices.models import OfficePage

        pages = OfficePage.objects.live().filter(slug=self.issuing_office)
        return pages.filter(locale__language_code=get_language()).first() or pages.first()

    @property
    def office_label(self) -> str:
        """The office page's title ('Baghdad office'), else one made from the slug."""
        page = self.office_page
        if page is not None:
            return page.title
        return _("%(city)s office") % {"city": self.issuing_office.replace("-", " ").title()}

    @property
    def qr_path(self) -> str:
        """What the certificate's QR code prints after the host (06 "QR")."""
        from urllib.parse import urlencode

        return "/verify/?" + urlencode({"n": self.number, "t": self.qr_token})


class Lookup(models.Model):
    number_hash = models.CharField(_("number hash"), max_length=64, db_index=True)
    found = models.BooleanField(_("found"))
    ip_hash = models.CharField(_("IP hash"), max_length=64)
    user_agent = models.CharField(_("user agent"), max_length=200, blank=True)
    locale = models.CharField(_("language"), max_length=8, blank=True)
    by_qr = models.BooleanField(_("by QR link"), default=False)
    created_at = models.DateTimeField(_("checked at"), default=timezone.now, db_index=True)

    class Meta:
        verbose_name = _("lookup")
        verbose_name_plural = _("lookups")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.created_at:%Y-%m-%d %H:%M} {'found' if self.found else 'not found'}"


class ImportLog(models.Model):
    created_at = models.DateTimeField(_("imported at"), default=timezone.now)
    operator = models.CharField(_("operator"), max_length=80)
    file_name = models.CharField(_("file"), max_length=200)
    full = models.BooleanField(_("full export"), default=False)
    created = models.PositiveIntegerField(_("created"), default=0)
    updated = models.PositiveIntegerField(_("updated"), default=0)
    unchanged = models.PositiveIntegerField(_("unchanged"), default=0)
    withdrawn = models.PositiveIntegerField(_("withdrawn"), default=0)
    rejected = models.PositiveIntegerField(_("rejected"), default=0)

    class Meta:
        verbose_name = _("certificate import")
        verbose_name_plural = _("certificate imports")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.created_at:%Y-%m-%d %H:%M} {self.file_name}"


class VerifyPage(ScriptNormalisationMixin, Page):  # noqa: DJ008 (Page gives __str__)
    """/<lang>/verify/: one input, one button, the result card (design B-Verify)."""

    intro = models.TextField(_("intro"), max_length=400, blank=True)
    input_label = models.CharField(
        _("input label"), max_length=60, blank=True, default="Certificate number"
    )
    button_label = models.CharField(_("button"), max_length=30, blank=True, default="Check")
    answers_heading = models.CharField(
        _("'what this page answers' heading"), max_length=60, blank=True
    )
    answers = models.TextField(
        _("what this page answers"), blank=True, help_text=_("One per line.")
    )
    answers_note = models.CharField(_("note under the list"), max_length=200, blank=True)
    mismatch_heading = models.CharField(_("'does not match' heading"), max_length=60, blank=True)
    mismatch_text = models.TextField(_("'does not match' text"), max_length=300, blank=True)
    fraud_warning = models.TextField(
        _("fraud warning"),
        max_length=300,
        blank=True,
        help_text=_("Shown when no certificate is found."),
    )
    head_office_contact = models.CharField(
        _("head-office contact"),
        max_length=120,
        blank=True,
        help_text=_("Shown when no certificate is found, e.g. 'Head office, Dubai · +971 …'."),
    )
    shown_note = models.CharField(_("note under the result"), max_length=200, blank=True)

    parent_page_types = ["pages.HomePage"]
    subpage_types = []
    max_count_per_parent = 1

    override_translatable_fields = _translatable(
        "intro",
        "input_label",
        "button_label",
        "answers_heading",
        "answers",
        "answers_note",
        "mismatch_heading",
        "mismatch_text",
        "fraud_warning",
        "head_office_contact",
        "shown_note",
    )

    content_panels = [
        *Page.content_panels,
        FieldPanel("intro"),
        MultiFieldPanel(
            [FieldPanel("input_label"), FieldPanel("button_label")], heading=_("The form")
        ),
        MultiFieldPanel(
            [
                FieldPanel("shown_note"),
                FieldPanel("fraud_warning"),
                FieldPanel("head_office_contact"),
            ],
            heading=_("The result"),
        ),
        MultiFieldPanel(
            [FieldPanel("mismatch_heading"), FieldPanel("mismatch_text")],
            heading=_("Something does not match"),
        ),
        MultiFieldPanel(
            [FieldPanel("answers_heading"), FieldPanel("answers"), FieldPanel("answers_note")],
            heading=_("What this page answers"),
        ),
    ]
    search_fields = [*Page.search_fields, index.SearchField("intro")]

    class Meta:
        verbose_name = _("verify page")

    @property
    def answer_lines(self) -> list[str]:
        return [line.strip() for line in self.answers.splitlines() if line.strip()]

    def serve(self, request, *args, **kwargs):
        """GET shows the form; GET with ``?n=`` (the QR link, ``&t=``) or a POST runs the
        check. HTMX (or verify.js, which sends the same header) gets the swapped block
        only. Never cached: every answer is read from the table at that moment."""
        from zeneon_cms.contact import spam

        from apps.verify.lookup import captcha_needed, check

        result = None
        if request.method == "POST":
            result = check(request, request.POST.get("n", ""))
        elif "n" in request.GET:
            result = check(request, request.GET.get("n", ""), token=request.GET.get("t", ""))
        context = self.get_context(request, *args, **kwargs)
        context["result"] = result
        if result is not None and result.certificate is not None:
            from apps.offices.channels import channels_for

            office = result.certificate.office_page
            context["office_channels"] = channels_for(office) if office else None
        # The next check needs the hCaptcha (after three not-found results, D8).
        if captcha_needed(request):
            context["captcha_site_key"] = spam.site_key()
            context["captcha_field"] = spam.provider().token_field
        partial = request.headers.get("HX-Request") == "true"
        template = "verify/verify_block.html" if partial else self.get_template(request)
        status = result.http_status if result else 200
        response = TemplateResponse(request, template, context, status=status)
        add_never_cache_headers(response)
        return response
