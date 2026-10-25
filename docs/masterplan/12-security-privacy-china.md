<!-- TIC Website — Engineering Master Plan, part 12 of 16. -->

# 12 Security, privacy and China reachability

## Security baseline (03 §11.3, the core's defaults)

- Admin on a non-guessable path, behind Cloudflare Access for staff plus Django two-factor (`django-otp`, core option) until single sign-on with TIC's mail system (V2). Rate-limited login; no public user listing (Wagtail has none); the API is off.
- The core's security headers (CSP with self-hosted assets and the hCaptcha and Umami hosts only, HSTS, frame-ancestors DENY, Referrer-Policy, Permissions-Policy) served by Caddy from the server-platform `headers_public`; MDN Observatory A+ written down at gate 4.
- Secrets in the stack `.env` only (Resend key, hCaptcha keys, Cloudflare purge token, Umami id), documented in `deploy/.env.example`; never in the admin, never in docs.
- Containers `read_only`, `cap_drop ALL`, resource limits; PostgreSQL on the internal network only; automatic base-image updates through Dependabot and a monthly patch window; a quarterly external vulnerability scan written into the maintenance arrangement (03 §11.3).
- Uploads: file type and size checks from the core; CVs and complaint files in `private/`, signed links of 15 minutes, never under `media/`.
- Verify: rate limits, captcha after failures, lookup log, no files (06).

## Privacy (03 §11.2, §11.6)

- Data collected: request forms (name, company, email, phone, country, message, files), complaint and application forms, certificate lookups (hashed), analytics after consent. A privacy policy (`ContentPage`, document code, version, effective date, owner = Legal) says what, why, how long, and how to ask for deletion.
- Retention: requests kept as long as the office needs the enquiry and purged by a command on request; `Lookup` rows 90 days; applications 6 months after a role closes ([n] in the policy until Legal confirms); backups per the platform schedule.
- Hosting region and any data-residency clauses in the Iraq, Egypt, Botswana, Libya or SFDA contracts are P-11; the plan assumes none forbids a global CDN with an origin in the UAE or Europe. If a future client area stores inspection data, the question is reopened (16).
- Consent: the banner (11); form consent tick with the one-line notice; no marketing email without a separate opt-in (the updates subscription is opt-in by definition).

## China reachability (03 §10, tested 21 Oct 2026)

Rules the build follows, tested by a `tests/test_china_rules.py` that scans rendered pages for forbidden hosts:

1. No `fonts.googleapis.com`, `fonts.gstatic.com`, Google Tag Manager, Analytics, Maps, reCAPTCHA, YouTube embeds or LinkedIn widgets on any public page. Fonts and scripts self-hosted (cdnjs or jsDelivr allowed as a fallback, not used in V1).
2. hCaptcha, not Turnstile (D8). Challenges load from hCaptcha's hosts, which loaded from all five mainland test points.
3. Maps as static images (generated once, stored in media) with a link out; on the Guangzhou page an Amap or Baidu link, never a Google Maps embed.
4. The Guangzhou page shows WeChat and a China phone number; `wa.me` links are not rendered on it (07).
5. Production is never on a `vercel.app` or `pages.dev` hostname; the real production hostname is tested from the mainland (China Mobile, Telecom, Unicom) by a colleague in Guangzhou before launch, and the result written in DECISIONS.
6. Cloudflare global edge in front of the origin, as the current site has today (it loaded from all five points).

A `.cn` site with ICP filing is deferred (16) until Guangzhou confirms its entity status and demand.
