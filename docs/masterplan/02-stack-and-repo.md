<!-- TIC Website — Engineering Master Plan, part 02 of 16. -->

# 02 Stack and repository layout

Two repositories change: `zeneon-cms` gains the small generic pieces TIC needs (on a branch, pinned by SHA, tagged with the next core release); `tic-website` is a new client repo created from the Zeneonix layout. Versions are the core's: Python 3.12, Django 5.2 LTS, Wagtail 7.4 LTS, wagtail-localize, PostgreSQL 16.

| Layer | Choice | Comes from |
| --- | --- | --- |
| CMS, pages, i18n, RTL, SEO tags, caching, security headers, admin skin, translation sheets, proofreader hook | zeneon-cms (pinned SHA) | Core (exists) |
| Structured requests: schemas, submissions, attachments, events, Requests admin, sent screen | `zeneon_cms.requests` | Core (exists) |
| Email delivery with retries, delivery log | `zeneon_cms.notify` (email channel only) | Core (exists) |
| News / insights / regulatory updates | `zeneon_cms.news` with a `kind` field | Core (exists; `kind` is new) |
| hCaptcha spam provider | `zeneon_cms.contact.spam` provider setting | Core (new, small) |
| Routing a request to an office by country and service | `requests.routing` hook + `RoutingRule` model | Core (new, generic: "route to a recipient by answer values") |
| Review-by date mixin and reminder command | `zeneon_cms.pages.ReviewByMixin`, `send_review_reminders` | Core (new, generic) |
| TIC page types, templates, theme, seed data, redirects, Verify | this repo | Client |
| Form steps, verify result | HTMX partials, plain form posts work without it | Client templates over core views |
| Email sending | Resend through django-anymail; SPF, DKIM, DMARC on the sending domain | Core settings |
| Analytics | Self-hosted Umami, first-party `/stats/`, after consent | Core SEO tag + consent banner |
| Errors, uptime | Django `ADMINS` mail, Better Stack on `/healthz/`, Healthchecks.io on every timer | Platform |
| CI/CD | `ci.yml` and `deploy.yml` copied from Zeneonix: ruff, pytest, migrations check, `.po` check, Docker smoke test, image to GHCR, forced-command SSH deploy to staging on `main`, production on `v*` tags | Client repo |

```
tic-website/
  apps/
    pages/        # HomePage, AboutPage, ContentPage (policy/legal), ContactPage, SearchView, 404
    services/     # ServiceIndexPage, ServiceGroupPage, ServicePage (11 parts)
    industries/   # IndustryIndexPage, IndustryPage
    programs/     # ProgramIndexPage, ProgramPage (12 parts), RegulatoryUpdate (news kind), routes helper
    offices/      # OfficeIndexPage, OfficePage, RoutingRule admin, WhatsApp/WeChat links
    trust/        # AccreditationsPage + Accreditation snippet, Person snippet (leadership), GroupPage
    resources/    # DownloadsPage + Document snippet, TrainingIndexPage + CoursePage, QAPage, news templates
    verify/       # Certificate, Lookup log, import_certificates, the /verify/ view, QR URL
  tic/
    settings/     # django-split-settings components + environments, as zeneonix/settings
    urls.py       # core urls, seo urls, admin, requests urls, verify urls, i18n_patterns(wagtail)
  templates/      # base.html, includes/ (header, footer, page_head, cta_band — from the drop's shared parts), one folder per app, zeneon/requests overrides
  static/         # css/site.css (from the drop), fonts/ (Saira, Open Sans, Cairo — self-hosted), icons sprite, img (logo, favicon, admin logo)
  locale/ar       # UI strings (frame, forms, verify, emails)
  seed/           # site.yaml, en.yaml, ar.yaml, schemas.yaml, routing.yaml, accreditations.yaml, offices.yaml, redirects.csv, certificates.sample.csv, media/
  deploy/         # Dockerfile, compose.yaml, compose.staging.yaml, compose.dev.yaml, caddy/, healthcheck.py, server-*.sh (copied from Zeneonix)
  docs/           # this plan, the design, the proposal, the research, runbook, editor guide
  e2e/, tests/, requirements/, scripts/   # as Zeneonix
```

**Why these apps and not one.** Each app owns one page type family and its seed loader, so an office editor's permissions can be scoped by app and the Wayfinder tickets map one to one. `verify` stays a client app: no other client needs a certificate register, and its data source will be TIC's own.

**What is copied, not written.** From Zeneonix: settings layout, `deploy/`, both workflows, `scripts/lock.sh`, `conftest.py`, the seed loader pattern (`fill blanks only`), the request templates and the upload module, the font build script. From the brand kit: `tic-colours.css` tokens (`../design/guideline/`).
