"""T19: Verify a certificate (master plan 06; D8, D9; design B-Verify)."""

from datetime import date, timedelta
from pathlib import Path

import pytest
from django.conf import settings
from django.core import mail
from django.core.management import call_command
from django.core.management.base import CommandError
from zeneon_cms.contact import spam

from apps.verify.importer import import_file
from apps.verify.lookup import normalise
from apps.verify.models import Certificate, ImportLog, Lookup, VerifyPage

SAMPLE = Path(settings.BASE_DIR) / "seed" / "certificates-sample.csv"
VALID = "SAMPLE-IQ-2026-000001"


@pytest.fixture
def verify(seeded_home):
    import_file(SAMPLE, operator="test", file_name=SAMPLE.name)
    return VerifyPage.objects.get(locale__language_code="en")


def check(client, number, **headers):
    return client.post("/en/verify/", {"n": number}, **headers)


def write_csv(tmp_path, rows, name="export.csv"):
    path = tmp_path / name
    head = "number,type,status,issue_date,expiry_date,issuing_office\n"
    path.write_text(head + "".join(f"{row}\n" for row in rows), encoding="utf-8")
    return path


# -- the page --------------------------------------------------------------------------


def test_the_seed_makes_the_page_and_no_certificates(seeded_home):
    page = VerifyPage.objects.get(locale__language_code="en")
    assert page.url_path.endswith("/verify/") and page.live
    assert len(page.answer_lines) == 3 and page.fraud_warning
    assert not Certificate.objects.exists()


def test_the_page_shows_one_input_and_is_never_cached(client, verify):
    response = client.get("/en/verify/")
    html = response.content.decode()
    assert response.status_code == 200
    assert html.count('name="n"') == 1 and "data-verify-form" in html
    assert "no-store" in response["Cache-Control"]
    assert "h-captcha" not in html
    assert "js/verify.js" in html


def test_a_number_shows_the_d9_fields_only(client, verify):
    response = check(client, VALID)
    html = response.content.decode()
    assert response.status_code == 200
    assert "Certificate found · Valid" in html
    for text in (VALID, "Iraq Certificate of Conformity", "1 October 2026", "31 March 2027"):
        assert text in html
    assert "TIC Quality Control · Baghdad office" in html
    assert "SampleQrToken001" not in html  # the token is never shown


def test_a_typed_number_is_matched_without_spaces_case_or_arabic_digits(client, verify):
    assert normalise(" sample-iq-2026-٠٠٠٠٠١ ") == VALID
    assert "Certificate found" in check(client, "sample-iq-2026- 000001").content.decode()


def test_the_qr_link_opens_the_page_with_the_lookup_done(client, verify):
    cert = Certificate.objects.get(number=VALID)
    assert cert.qr_path == f"/verify/?n={VALID}&t=SampleQrToken001"
    response = client.get(cert.qr_path)
    assert response.status_code == 302
    assert response["Location"] == f"/en/verify/?n={VALID}&t=SampleQrToken001"
    response = client.get(response["Location"])
    html = response.content.decode()
    assert "Certificate found · Valid" in html and f'value="{VALID}"' in html
    assert Lookup.objects.get().by_qr


def test_not_found_never_names_a_nearby_number(client, verify):
    html = check(client, "SAMPLE-IQ-2026-000009").content.decode()
    assert "No certificate with the number SAMPLE-IQ-2026-000009 was found." in html
    assert verify.fraud_warning in html and "Head office, Dubai" in html
    for cert in Certificate.objects.all():
        assert cert.number not in html


def test_statuses_read_as_the_visitor_needs(client, verify):
    html = check(client, "SAMPLE-IQ-2026-000002").content.decode()
    assert "Certificate found · Superseded" in html and "verify__label-found--warn" in html
    html = check(client, "SAMPLE-IQ-2025-000003").content.decode()  # valid, but past its date
    assert "Certificate found · Expired" in html
    html = check(client, "SAMPLE-AE-2026-000004").content.decode()
    assert "Withdrawn" in html and "No end date in this scheme" in html


def test_htmx_gets_the_block_only(client, verify):
    response = check(client, VALID, HTTP_HX_REQUEST="true")
    html = response.content.decode()
    assert 'id="verify"' in html and "Certificate found" in html
    assert "<html" not in html


def test_without_javascript_a_plain_post_works(client, verify):
    response = check(client, VALID)
    assert "<html" in response.content.decode() and "Certificate found" in response.content.decode()


# -- the safety rules -------------------------------------------------------------------


def test_every_lookup_is_logged_with_hashes_only(client, verify):
    check(client, VALID, HTTP_USER_AGENT="Customs scanner")
    check(client, "NOPE-1")
    found, missed = Lookup.objects.order_by("created_at")
    assert (found.found, missed.found) == (True, False)
    assert found.user_agent == "Customs scanner" and found.locale == "en"
    for row in (found, missed):
        assert len(row.number_hash) == 64 and VALID not in row.number_hash
        assert "127.0.0.1" not in row.ip_hash
    assert found.number_hash != missed.number_hash


def test_the_eleventh_check_in_a_minute_gets_429(client, verify):
    for _ in range(10):
        assert check(client, VALID).status_code == 200
    response = check(client, VALID)
    assert response.status_code == 429
    assert "Too many checks" in response.content.decode()
    assert Lookup.objects.count() == 10  # a refused check is not a lookup


def test_after_three_misses_a_check_needs_the_hcaptcha(client, verify, monkeypatch):
    for number in ("NOPE-1", "NOPE-2", "NOPE-3"):
        check(client, number)
    html = check(client, VALID).content.decode()
    assert "h-captcha" in html and "Certificate found" not in html
    assert Lookup.objects.count() == 3
    monkeypatch.setattr(spam, "verify_captcha", lambda request: spam.Turnstile.FAILED)
    assert "did not pass" in check(client, VALID).content.decode()
    monkeypatch.setattr(spam, "verify_captcha", lambda request: spam.Turnstile.PASSED)
    assert "Certificate found" in check(client, VALID).content.decode()


def test_the_qr_token_skips_the_hcaptcha(client, verify):
    for number in ("NOPE-1", "NOPE-2", "NOPE-3"):
        check(client, number)
    html = client.get(f"/en/verify/?n={VALID}&t=SampleQrToken001").content.decode()
    assert "Certificate found" in html
    html = client.get(f"/en/verify/?n={VALID}&t=WrongTokenWrong1").content.decode()
    assert "Certificate found" not in html and "h-captcha" in html


def test_purge_lookups_keeps_ninety_days(verify):
    from django.utils import timezone

    old = Lookup.objects.create(number_hash="a", found=False, ip_hash="b")
    Lookup.objects.filter(pk=old.pk).update(created_at=timezone.now() - timedelta(days=91))
    Lookup.objects.create(number_hash="c", found=True, ip_hash="d")
    call_command("purge_lookups", verbosity=0)
    assert list(Lookup.objects.values_list("number_hash", flat=True)) == ["c"]


# -- the import -------------------------------------------------------------------------


def test_the_import_is_idempotent_on_the_number(verify):
    tokens = dict(Certificate.objects.values_list("number", "qr_token"))
    report = import_file(SAMPLE, operator="test", file_name=SAMPLE.name)
    assert (report.created, report.updated, report.unchanged) == (0, 0, 4)
    assert dict(Certificate.objects.values_list("number", "qr_token")) == tokens
    assert ImportLog.objects.count() == 2


def test_a_new_row_gets_a_random_token_and_rejects_never_stop_the_rest(db, tmp_path):
    path = write_csv(
        tmp_path,
        [
            "TIC-1,Inspection certificate,valid,2026-01-01,,dubai",
            "TIC-2,Inspection certificate,maybe,2026-01-01,,dubai",
            "TIC-3,Inspection certificate,valid,01/02/2026,,dubai",
            "tic-1,Inspection certificate,valid,2026-01-01,,dubai",  # the same number
            ",Inspection certificate,valid,2026-01-01,,dubai",
        ],
    )
    report = import_file(path)
    assert report.created == 1 and len(report.rejects) == 4
    token = Certificate.objects.get().qr_token
    assert len(token) == 16 and token.isalnum()


def test_full_export_withdraws_missing_rows_partial_does_not(verify, tmp_path):
    path = write_csv(tmp_path, ["SAMPLE-IQ-2026-000001,X [sample],valid,2026-10-01,,baghdad"])
    import_file(path)
    assert Certificate.objects.filter(status="withdrawn").count() == 1  # only the sample's own
    report = import_file(path, full=True)
    assert report.withdrawn == 2
    assert Certificate.objects.get(number=VALID).type == "X [sample]"
    assert Certificate.objects.exclude(status="withdrawn").count() == 1


def test_the_command_prints_logs_and_mails_the_quality_manager(db, settings, capsys):
    settings.TIC_VERIFY = {**settings.TIC_VERIFY, "report_email": "quality@example.com"}
    call_command("import_certificates", str(SAMPLE), "--operator", "QM")
    out = capsys.readouterr().out
    assert "created 4, updated 0, unchanged 0, withdrawn 0, rejected 0" in out
    assert ImportLog.objects.get().operator == "QM"
    assert mail.outbox[0].to == ["quality@example.com"] and "4 new" in mail.outbox[0].subject
    with pytest.raises(CommandError):
        call_command("import_certificates", "no-such-file.csv")


def test_no_client_or_product_field_exists():
    names = {f.name for f in Certificate._meta.get_fields()}
    assert not names & {"client", "client_name", "product", "products", "company"}


def test_the_expiry_date_is_read_today(verify):
    cert = Certificate.objects.get(number=VALID)
    cert.expiry_date = date.today() - timedelta(days=1)
    assert cert.shown_status == "expired"


def test_the_admin_report_lists_daily_counts(admin_client, verify):
    check(admin_client, VALID)
    response = admin_client.get("/admin/verify/lookups/")
    assert response.status_code == 200
    assert "certificates-sample.csv" in response.content.decode()
