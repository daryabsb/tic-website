# Tickets — the first Wayfinder map

Paste into GitHub as issues; #1 is the map. One ticket per session. Each ticket names its gate, what it blocks, and how it is demonstrated. Decisions taken on a ticket go to `DECISIONS.md` the same day.

## Map (#1)

Destination: ticqc.com live on the new stack, five gates passed. Open, unblocked tickets first.

## Gate 0 · Scaffold

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 2 | **Grilling session on the plan** — Wayfinder on `docs/masterplan/`; every correction written as a D-row | all | DECISIONS.md updated; plan parts carry "Corrections" notes |
| 3 | **Client project from the Zeneonix layout** — `tic/settings`, `apps/pages`, `templates/base.html`, `requirements/` with the core pinned by SHA, `deploy/`, `scripts/lock.sh`, `conftest.py`, pytest green locally | 4–8 | `manage.py runserver` shows an empty home; `pytest` green |
| 4 | **Fonts and CSS** — build Saira, Open Sans, Cairo self-hosted (split by script) with `scripts/build_fonts.py`; `static/css/site.css` from the drop's shared styles; brand tokens from `tic-colours.css` | 5 | No external font request; tokens test green |
| 5 | **Shared parts as includes** — header (with language `<select>`), footer, page head (two variants), CTA band from the four drop files; logo files in `static/img/logo/` | 9+ | Rendered on the empty home in EN and AR shells |
| 6 | **CI and deploy workflows** — `ci.yml`, `deploy.yml`, Dependabot, GHCR image, forced-command SSH deploy to staging | 7 | CI green on `main` |
| 7 | **Staging stack on zeneon-1** — `/srv/stacks/tic/staging/`, Caddy file with basic auth, `.env`, backup timer, Healthchecks, Better Stack (Task: Darya for sudo and DNS) | 1 | `https://tic-staging.…/en/` answers behind basic auth; backup check pings |
| 8 | **Seed skeleton** — `seed_site` command (fill blanks only), `site.yaml` with settings, the fourteen offices as placeholder rows, `redirects.csv` empty | 10+ | Idempotent run on staging |

## Gate 1 · Sell

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 9 | **HomePage** — the nine sections from `DirectionB.dc.html`; `Figure` and `Accreditation` snippets; proof strip from `is_public` rows | 1 | Home from seed on a phone; placeholders bracketed |
| 10 | **Services** — `ServiceIndexPage`, `ServiceGroupPage`, `ServicePage` with the eleven blocks and validation; seed for the seven groups and the PSI page; `Partner` snippet required on testing | 1 | The three service templates render from seed; publish refused without a required part |
| 11 | **Industries** — index and page; seed for eight industries with Agriculture & Food filled | 1 | Renders from seed |
| 12 | **Search and 404** — Wagtail search over pages, documents, questions; the 404 page from the drop | 1 | A search for "Iraq certificate" returns program, insight, download, question, office |
| 13 | **Lighthouse on staging** — Home and a service page on mobile; numbers in DECISIONS | gate 1 | Written down |

## Gate 2 · Prove

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 14 | **Core: hCaptcha provider** (`zeneon-cms` branch) — spam provider setting with Turnstile and hCaptcha; pinned here | 17, 19 | Core tests green; pin moved |
| 15 | **Core: routing hook** — `RoutingRule` and `requests.routing` resolve a recipient from answer values; pinned here | 17 | Core tests green; pin moved |
| 16 | **Core: review-by mixin** — `ReviewByMixin`, `send_review_reminders`, "past review" report; pinned here | 18, 24 | Core tests green; pin moved |
| 17 | **Quote form, routing, emails** — schemas `quote`, `program_request`; routing seed; office alert and client auto-reply (branded HTML + text); sent screen with office, hours, code, WhatsApp link | 1 | A quote from the Iraq page reaches the Baghdad address; auto-reply received; JS-off path works |
| 18 | **Programs** — index, `ProgramPage` with the twelve parts and validation, feed page, route helper, Iraq seed with its questions; redirects for the three Iraq pages | 1 | Iraq page complete from seed; feed filters |
| 19 | **Verify** — `verify` app: models, `import_certificates`, view, HTMX result, QR URL, rate limit, captcha after three, lookup log; `VerifyPage`; sample CSV | 1 | Demonstrated by number, by QR URL, not found, 429 |
| 20 | **Offices** — index and page from `B-Office-Baghdad.dc.html`; `add_office` command (group, collection); WeChat rule on Guangzhou; CTA band office-aware | 17 | Fourteen office pages from seed; Guangzhou shows no wa.me (test) |

## Gate 3 · Trust and the rest

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 21 | **About, Leadership, Group** — pages and seed with placeholders; `Person` snippet | 1 | Render from seed |
| 22 | **Accreditations table and policy pages** — `AccreditationsPage`, `ContentPage` with document code/version/date/owner for Impartiality, Subcontracting, Certificate and logo use, Privacy, Terms | 1 | Table shows the five verified rows only; footer marks match |
| 23 | **Complaints, Careers, course registration** — schemas with files in `private/`; `CareersPage` with openings; `CoursePage` + index with the full field set | 1 | A complaint with a file and an application with a CV reach the Quality Manager / HR addresses |
| 24 | **Roles, groups, workflows** — six groups, per-office groups, Review and Light workflows, re-approval rule, review-by reminders live on staging | 1 | An office editor submits, a reviewer publishes; reminder email for a test page |
| 25 | **Resources** — `NewsPage.kind`, filters, article template, Downloads with `Document` snippets, Training catalogue, Q&A aggregation | 1 | All five resource pages from seed |
| 26 | **Contact page and consent** — contact page with head-office channels; consent banner and Umami after consent | 1 | No cookie before consent; Umami event on a quote |
| 27 | **Editor guide** — `docs/editor-guide.md` with staging screenshots | launch | Sent to one office manager for a read |

## Gate 4 · Arabic and the move

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 28 | **Arabic frame** — `locale/ar` complete; core msgids listed and translated; emails, consent, 404, search; the test that every visible msgid has `ar` | 29 | Test green; Arabic shell on a phone |
| 29 | **Arabic-first pages** — `ar.yaml` for Verify, six office pages, Complaints, Impartiality, Privacy, About, Accreditations, Iraq/Kurdistan/Egypt programs; drafts marked until the reviewer signs | 1 | Rendered RTL; reviewer's sign-off recorded |
| 30 | **Redirect map and news import** — `redirects.csv` from the audit's URL list; `import_old_news`; downloads with owners | 1 | lychee over the old URL list: 0 broken on staging |
| 31 | **Production server and stack** (Task: Darya, TIC IT) — host per P-11 set up with server-platform; prod stack on a hidden hostname; backups to the TIC bucket; restore drill on staging | launch | Prod answers on the hidden hostname; restore drill RTO in the runbook |
| 32 | **Security and performance sign-off** — Observatory A+, CSP, Lighthouse written down, mainland test by Guangzhou | launch | Numbers in DECISIONS |
| 33 | **Launch checklist** — `15-launch-checklist.md` worked line by line on the ticket | launch | Every line ticked or blocked by a named P-row |

## Launch

| # | Ticket | Done when |
| --- | --- | --- |
| 34 | **Cut-over** (Task: Darya, TIC IT) — DNS, redirects, Search Console, old site frozen then off after 30 days | The directors open the site on their phones; launch date in the gates table |
