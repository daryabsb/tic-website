# Tickets — the first Wayfinder map

Created on GitHub Nov 10, 2026: the map is issue #2, each row is an issue titled "T<n> <name>" (D23). One ticket at a time, many per session (D28). Each ticket names its gate, what it blocks, and how it is demonstrated. Decisions taken on a ticket go to `DECISIONS.md` the same day.

## Map (#1)

Destination: ticqc.com live on the new stack, five gates passed. Open, unblocked tickets first.

## Gate 0 · Scaffold

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 2 | ✅ (Nov 10, closed as done: D19–D22) **Grilling session on the plan** — Wayfinder on `docs/masterplan/`; every correction written as a D-row | all | DECISIONS.md updated; plan parts carry "Corrections" notes |
| 3 | ✅ (Nov 10) **Client project from the Zeneonix layout** — `tic/settings`, `apps/pages`, `templates/base.html`, `requirements/` with the core pinned by SHA, `deploy/`, `scripts/lock.sh`, `conftest.py`, pytest green locally | 4–8 | `manage.py runserver` shows an empty home; `pytest` green |
| 4 | ✅ (Nov 10) **Fonts and CSS** — build Saira, Open Sans, Cairo self-hosted (split by script) with `scripts/build_fonts.py`; `static/css/site.css` from the drop's shared styles; brand tokens from `tic-colours.css` | 5 | No external font request; tokens test green |
| 5 | ✅ (Nov 10) **Shared parts as includes** — header (with language `<select>`), footer, page head (two variants), CTA band from the four drop files; logo files in `static/img/logo/` | 9+ | Rendered on the empty home in EN and AR shells |
| 6 | ✅ (Nov 11, D25: the gate is `scripts/ci.sh` on stms-data; staging deploy moves to T7) **CI and deploy workflows** — `ci.yml`, `deploy.yml`, Dependabot, GHCR image, forced-command SSH deploy to staging | 7 | CI green on `main` |
| 7 | ✅ (Nov 11, D27: on stms-data at `https://staging.ticqc.ae` behind a Cloudflare tunnel; weekly backup to the NAS pings Healthchecks) **Staging stack on zeneon-1** — `/srv/stacks/tic/staging/`, Caddy file with basic auth, `.env`, backup timer, Healthchecks, Better Stack (Task: Darya for sudo and DNS) | 1 | `https://tic-staging.…/en/` answers behind basic auth; backup check pings |
| 8 | ✅ (Nov 11: `offices.yaml` with the fourteen rows, empty `redirects.csv`, redirect loader; 0 changes on two staging runs) **Seed skeleton** — `seed_site` command (fill blanks only), `site.yaml` with settings, the fourteen offices as placeholder rows, `redirects.csv` empty | 10+ | Idempotent run on staging |

## Gate 1 · Sell

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 9 | ✅ (Nov 12, D37: links to the hubs by path; no `#` links) **HomePage** — the nine sections from `DirectionB.dc.html`; `Figure` and `Accreditation` snippets; proof strip from `is_public` rows | 1 | Home from seed on a phone; placeholders bracketed |
| 10 | ✅ (Nov 11, D26: `Person` built here; office links any page until T20) **Services** — `ServiceIndexPage`, `ServiceGroupPage`, `ServicePage` with the eleven blocks and validation; seed for the seven groups and the PSI page; `Partner` snippet required on testing | 1 | The three service templates render from seed; publish refused without a required part |
| 11 | ✅ (Nov 11, D29: cards to live pages; where as text until T20; insights wait for T25) **Industries** — index and page; seed for eight industries with Agriculture & Food filled | 1 | Renders from seed |
| 12 | ✅ (Nov 11, D31: pages, documents, questions; the "Iraq certificate" demo repeats at gate 2) **Search and 404** — Wagtail search over pages, documents, questions; the 404 page from the drop | 1 | A search for "Iraq certificate" returns program, insight, download, question, office |
| 13 | ✅ (Nov 12, D38: perf 98–99, LCP 2.1 s, ~107 KB) **Lighthouse on staging** — Home and a service page on mobile; numbers in DECISIONS | gate 1 | Written down |

## Gate 2 · Prove

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 14 | ✅ (Nov 11, D33: core PR #23, pin `e13a20a`) **Core: hCaptcha provider** (`zeneon-cms` branch) — spam provider setting with Turnstile and hCaptcha; pinned here | 17, 19 | Core tests green; pin moved |
| 15 | ✅ (Nov 12, D39) **Core: routing hook** — `RoutingRule` and `requests.routing` resolve a recipient from answer values; pinned here | 17 | Core tests green; pin moved |
| 16 | ✅ (Nov 12, D40) **Core: review-by mixin** — `ReviewByMixin`, `send_review_reminders`, "past review" report; pinned here | 18, 24 | Core tests green; pin moved |
| 17 | ✅ (Nov 13, D41, D42, D45: email check moved to gate 2) **Quote form, routing, emails** — schemas `quote`, `program_request`; routing seed; office alert and client auto-reply (branded HTML + text); sent screen with office, hours, code, WhatsApp link | 1 | A quote from the Iraq page reaches the Baghdad address; auto-reply received; JS-off path works |
| 18 | ✅ (Nov 13, D44: core PR #30, pin `feb7d2e`) **Programs** — index, `ProgramPage` with the twelve parts and validation, feed page, route helper, Iraq seed with its questions; redirects for the three Iraq pages | 1 | Iraq page complete from seed; feed filters |
| 19 | ✅ (Nov 13, D46) **Verify** — `verify` app: models, `import_certificates`, view, HTMX result, QR URL, rate limit, captcha after three, lookup log; `VerifyPage`; sample CSV | 1 | Demonstrated by number, by QR URL, not found, 429 |
| 20 | ✅ (Nov 13, D48) **Offices** — index and page from `B-Office-Baghdad.dc.html`; `add_office` command (group, collection); WeChat rule on Guangzhou; CTA band office-aware | 17 | Fourteen office pages from seed; Guangzhou shows no wa.me (test) |

## Gate 3 · Trust and the rest

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 21 | ✅ (Nov 13, D50: people are "[Name]" until they agree, P-16) **About, Leadership, Group** — pages and seed with placeholders; `Person` snippet | 1 | Render from seed |
| 22 | ✅ (Nov 13, D51: policy text from the old-site PDFs; Subcontracting, Privacy, Terms drafts) **Accreditations table and policy pages** — `AccreditationsPage`, `ContentPage` with document code/version/date/owner for Impartiality, Subcontracting, Certificate and logo use, Privacy, Terms | 1 | Table shows the five verified rows only; footer marks match |
| 23 | ✅ (Nov 14, D53: the core request form with the page as the topic; addresses wait in Routing) **Complaints, Careers, course registration** — schemas with files in `private/`; `CareersPage` with openings; `CoursePage` + index with the full field set | 1 | A complaint with a file and an application with a CV reach the Quality Manager / HR addresses |
| 24 | ✅ (Nov 14, D54) **Roles, groups, workflows** — six groups, per-office groups, Review and Light workflows, re-approval rule, review-by reminders live on staging | 1 | An office editor submits, a reviewer publishes; reminder email for a test page |
| 25 | ✅ (Nov 14, D56: a hub in the menu, four resource pages beside it) **Resources** — `NewsPage.kind`, filters, article template, Downloads with `Document` snippets, Training catalogue, Q&A aggregation | 1 | All five resource pages from seed |
| 26 | ✅ (Nov 14, D57: Umami only after Accept, choice in localStorage) **Contact page and consent** — contact page with head-office channels; consent banner and Umami after consent | 1 | No cookie before consent; Umami event on a quote |
| 27 | 🟡 (Nov 17, D58: guide and pictures merged; waits for one office manager's read) **Editor guide** — `docs/editor-guide.md` with staging screenshots | launch | Sent to one office manager for a read |
| 35 | 🟡 (Nov 17, D59: guide merged; waits for Darya to do one task from it alone) **Admin docs for beginners** (Darya, Nov 14) — every admin process step by step in plain words, a staging screenshot per step, every publish error explained; T27 becomes its first page | launch | Every process has its page in `docs/admin-guide/`; Darya does one task from it alone |
| 36 | 🟡 (Nov 18, D68: 30 old-site and 22 Unsplash photos seeded) **Photos from the old site on every page** (Darya, Nov 18) — a photo in every place that has a fitting one; Unsplash placeholders for the rest on staging | launch | Staging shows a photo in every place that has one; Darya looks at the home page and two section pages |
| 37 | ✅ (Nov 18, D69–D74: brief and 175 screenshots; Round 3 drop committed, prototype on staging approved by Darya; build in T38–T41) in `docs/design/briefs/polish-2026-11/`) **Design polish brief** (Darya, Nov 18) — the page head hides the photo; fix the page-head and photo logic, polish the rest | launch | The brief is in the repo; Darya hands it to the designer |
| 38 | **R3 head and header** (#92, D70, D71) — `R3-Header`; the page head (`.ph`, `.hero`, `.band`) on every page type; `object-position` from the Wagtail focal point; container queries as media queries at 860 and 1180 px | launch | Staging matches the Round 3 drop at 1440 and 390 in English, plus one right-to-left look on an Arabic page (D75), green gate; screenshots of the eight redrawn pages in `docs/design/briefs/polish-2026-11/after/` |
| 39 | **R3 facts bar and jump row** (#93) — four fixed cells per page type (rules board part 3), as fields, not free copy; a cell with no value keeps its bracket | launch | Staging matches the Round 3 drop at 1440 and 390 in English, plus one right-to-left look on an Arabic page (D75), green gate; screenshots of the eight redrawn pages in `docs/design/briefs/polish-2026-11/after/` |
| 40 | **R3 empty places** (#94, D72–D74) — text cards, country tiles, the address plate in place of the office map; empty photo places and empty sections not rendered; Dubai head photo `dubai-business-bay.jpg`; home "Where we are" uses the head office photo | launch | Staging matches the Round 3 drop at 1440 and 390 in English, plus one right-to-left look on an Arabic page (D75), green gate; screenshots of the eight redrawn pages in `docs/design/briefs/polish-2026-11/after/` |
| 41 | **R3 thin pages** (#95) — the fill order of rules board part 5; the contact band never directly under the head | launch | Staging matches the Round 3 drop at 1440 and 390 in English, plus one right-to-left look on an Arabic page (D75), green gate; screenshots of the eight redrawn pages in `docs/design/briefs/polish-2026-11/after/` |

## Gate 4 · Arabic and the move

| # | Ticket | Blocks | Done when |
| --- | --- | --- | --- |
| 28 | ✅ (Nov 17, D60: 366 visible msgids in Arabic, drafts until P-5 review) **Arabic frame** — `locale/ar` complete; core msgids listed and translated; emails, consent, 404, search; the test that every visible msgid has `ar` | 29 | Test green; Arabic shell on a phone |
| 29 | 🟡 (Nov 22, D81: 16 pages and 374 Arabic drafts on staging, right to left; waits for the reviewer's sign-off, P-5, and for the Egypt and Kurdistan pages, P-13) **Arabic-first pages** — `ar.yaml` for Verify, six office pages, Complaints, Impartiality, Privacy, About, Accreditations, Iraq/Kurdistan/Egypt programs; drafts marked until the reviewer signs | 1 | Rendered RTL; reviewer's sign-off recorded |
| 30 | ✅ (Nov 17, D62: 103 redirects, lychee 104/104 OK on staging; 35 old posts imported with 38 photos) **Redirect map and news import** — `redirects.csv` from the audit's URL list; `import_old_news`; downloads with owners | 1 | lychee over the old URL list: 0 broken on staging |
| 31 | 🟡 (Nov 18, D66: Etisalat DC Dubai, next to stms-data, same deploy as staging; waits for TIC IT to create Darya's user) **Production server and stack** (Task: Darya, TIC IT) — host per P-11 set up with server-platform; prod stack on a hidden hostname; backups to the TIC bucket; restore drill on staging | launch | Prod answers on the hidden hostname; restore drill RTO in the runbook |
| 32 | 🟡 (Nov 17, D63: staging pre-check A+ and Lighthouse 98–99; waits for the production hostname and the Guangzhou test) **Security and performance sign-off** — Observatory A+, CSP, Lighthouse written down, mainland test by Guangzhou | launch | Numbers in DECISIONS |
| 33 | ✅ (Nov 18, D67: every line ticked or blocked by a named P-row; 38 article alt texts, PR #87; review-by mail walked) **Launch checklist** — `15-launch-checklist.md` worked line by line on the ticket | launch | Every line ticked or blocked by a named P-row |
| 43 | 🟡 (Nov 22, D82: 51 of the 56 current pages moved; Saudi SFDA stays "in progress" until the proof is shown, D83) **Move the current site's content** (Darya, Nov 22) — the text of ticqc.ae in the service, course, industry and program pages, the product pages as articles, single facts; a map of all 56 pages | launch | Staging shows the current site's text on every page that has a source page; the inventory is in the repo; the gap list is made again |

## Launch

| # | Ticket | Done when |
| --- | --- | --- |
| 34 | **Cut-over** (Task: Darya, TIC IT) — DNS, redirects, Search Console, old site frozen then off after 30 days | The directors open the site on their phones; launch date in the gates table |
