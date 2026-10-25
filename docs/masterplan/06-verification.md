<!-- TIC Website — Engineering Master Plan, part 06 of 16. -->

# 06 Certificate verification

The single most valuable addition (proposal 03 §6). A customs officer, bank, importer or regulator types a certificate number or scans the QR code printed in the certificate's security panel (brand book) and sees, within a second, whether it exists and whether it is still valid. Design: `B-Verify.dc.html`.

## The page

- URL `/<lang>/verify/`; the QR code on a certificate opens `/verify/?n=<number>&t=<qr_token>` which lands on the same page with the number filled in and the lookup already done.
- One input, one button. Result card: **found · status** (black label; red for superseded / suspended / withdrawn), then number, type, status, issue date, expiry date, issuing office with its phone and WhatsApp. "Checked at [time] against TIC's records" and "something does not match? call the issuing office" box. Not found: "No certificate with this number was found", the fraud-warning line from `VerifyPage`, the head-office contact, and never a nearby number.
- Shown fields are exactly D9; a masked client name and the product line are a later option behind P-14 (`VERIFY_SHOW_CLIENT_MASKED = False` setting, off).
- Works without JavaScript (plain POST); HTMX swaps the result card in place when present.
- Arabic version is an Arabic-first page (08).

## Data

`Certificate` table (03). V1 loader: `manage.py import_certificates <csv>` — columns `number,type,status,issue_date,expiry_date,issuing_office,qr_token?`; idempotent on `number`; rows missing from a full export are marked `withdrawn` only when `--full` is passed; a report of counts and rejects is printed and mailed to the Quality Manager. Later loaders implement the same `CertificateSource` interface: a nightly sync from TIC's records system (03 §6.4 option 2, run by a platform timer) or a live API (option 3, queried on lookup with the table as cache). The public page never changes between the three.

QR: the certificate template prints `https://<host>/verify/?n=<number>&t=<token>`; `qr_token` is 16 random characters generated on import, so a URL cannot be walked. Numbers that are sequential today still cannot be browsed: a lookup without the token is allowed (people type numbers) but rate-limited and captcha-gated, and the result never links to another record.

## Safety rules (03 §6.3)

- Number-only lookup. No list, no search by company, no API beyond the page.
- Rate limit per IP: 10 lookups per minute, 60 per hour (django-ratelimit, core setting); after three not-found results in a session an hCaptcha is required (D8).
- Every lookup written to `Lookup` (number hash, found, IP hash, user agent, locale); kept 90 days; a daily count by result in the admin.
- No files served. The tool answers from the database; certificate PDFs are never on the public site.
- Cloudflare: the `/verify/` path is cached for 0 seconds; a WAF rate rule mirrors the application limit.
- Audit: `import_certificates` writes a `Lookup`-style import log row with counts and the operator.

## Who owns it

The Quality/Accreditation Manager owns the data (P-8 decides the source); the Baghdad office answers "does not match" calls for Iraq certificates, the issuing office for the others. The Verify page's own text is a `VerifyPage` the Content Manager edits.
