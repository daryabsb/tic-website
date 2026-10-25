# Decisions (Oct 25, 2026)

Where a plan part and this file disagree, this file wins; each affected part carries a "Corrections" note pointing here. The Wayfinder map is issue #1 in this repo (created from `TICKETS.md`).

Two kinds of decision live here. **D-rows** are engineering decisions taken on this repo. **P-rows** are the content-proposal decisions the directors still owe (the proposal's own IDs, `A-`, `Q-`, `D1`–`D19`, are kept in the "Proposal ID" column); the build runs on the proposal's working assumption until a reply arrives, and a reply becomes a new D-row the day it lands.

## Facts the plan is built on

- The content proposal (01) is the master for what every page says and contains; this plan does not restate it. Proposal 03 chose Wagtail as a conventional server-rendered site (Option A).
- The current site is ticqc.ae on a page-builder platform; its content inventory, URL list and the five accounts are in `../research/`. It stays up until launch day; two interim security fixes on it are outside this repo (proposal D-04).
- The design (Direction B, "Field") is done: 29 page artboards and 4 shared parts, in `../design/drops/direction-b-2026-10-25/`. Directors see the same canvas with the proposal.
- The brand book fixes colour, type, logo use and the web rules (`../design/guideline/`). The logo file is the primary colour version; it sits on white or on a white plate, never on a dark or coloured ground.
- `zeneon-cms` tip of `main` (as pinned by the Zeneonix site) carries `requests`, `notify`, `mcp`, caching, security, SEO, translation admin and the proofreader hook. The MLP and Zeneonix repos are the layout to copy.

## Engineering decisions

| # | Decision | Replaces |
| --- | --- | --- |
| D1 | Scope of V1 is the content proposal's Phase 1 plus the office pages (Phase 2 in the proposal), because the office pages are the routing targets and the design has them. Full Arabic is Phase 2; the Arabic-first set ships in V1 (08). | proposal A-03 |
| D2 | Client repo `tic-website`, created from the Zeneonix layout; core `zeneon-cms` pinned by SHA (the Zeneonix pin or newer). Core changes needed for TIC — hCaptcha as a spam provider, `requests` routing by country, review-by dates on pages — go to the core on a branch and are pinned here (rule 6). | — |
| D3 | The old Nuxt site is kept on `legacy/nuxt-2023` and tag `nuxt-site-final`; `main` restarts from an orphan commit holding only docs. Nothing from the old repo is reused. | — |
| D4 | No React, no SPA. Django templates, HTMX for the quote-form steps and the verify result, one plain-JS module for uploads. The design drop's HTML and CSS are taken as they are. | — |
| D5 | Page types are client apps (`services`, `industries`, `programs`, `offices`, `trust`, `resources`, `pages`); the certificate tool is a client app `verify`; forms use the core `requests` app with TIC schemas; the core `news` app is used for News/Insights/Updates with a `kind` field. | — |
| D6 | Languages: English default at `/en/`, Arabic at `/ar/`, order en, ar; `/` answers 301 to `/en/`. Chinese, Hindi, Portuguese are locales switched on only when an office requests one and names a reviewer (proposal 03 §9). | — |
| D7 | Fonts self-hosted: Saira (headings), Open Sans (body), Cairo (Arabic), split Latin/Arabic, `font-display: swap`. Never Google Fonts at runtime. | — |
| D8 | Spam: hCaptcha on every form and on Verify after three failed lookups; honeypot, minimum fill time and rate limits from the core. Not Turnstile (proposal 03 §10: Cloudflare says Turnstile is not available in the mainland). | core default Turnstile |
| D9 | Verify V1 answers from a `Certificate` table loaded by `import_certificates` from CSV (proposal 03 §6.4 option 1), designed so a nightly sync or a live API replaces the loader without changing the page. Fields shown: number, type, status, issue date, expiry date, issuing office. No client names, no products, no browse. | — |
| D10 | Quote routing: a `RoutingRule` table (country, service group → office; Dubai fallback) edited in the admin; the request's office receives the email; the sent screen names the office and its hours; the client gets an auto-reply in the request's language with the code. No CRM in V1; the routing table moves to the CRM when one exists (proposal Q-16). | proposal 03 §7 "routing table in the CRM" |
| D11 | Alerts: email only in V1 (Resend through django-anymail, one sender domain). No Telegram for TIC. WhatsApp is a wa.me link per office; WeChat and a China phone on the Guangzhou page; wa.me never shown on the Guangzhou page. | — |
| D12 | Hosting: staging on the zeneon-1 Hetzner server now (a third tenant under the server-platform contract) so engineering starts today; production on a server TIC owns under the same contract, region per proposal Q-15 (Dubai region behind Cloudflare, or Europe with the Etisalat-exit plan). Cloudflare in front in every case. Decided by P-15 before gate 4. | proposal 03 §11.1 |
| D13 | Domain: production hostname decided by P-1 (ticqc.com per the brand book, or ticqc.ae as today). Until then everything (hreflang, canonical, sitemaps, emails) reads the hostname from one setting; the redirect map covers both. | — |
| D14 | Analytics: self-hosted Umami on the platform, first-party path, loaded only after consent; no Google Tag Manager or Analytics anywhere. Search Console on both domains. | — |
| D15 | Content: the proposal's facts are seeded as written; every "to be confirmed" item is a bracketed placeholder in `seed/` and renders as such on staging, so directors see exactly what their office owes. The seed fills blanks only and never overwrites an editor's text (as Zeneonix D30). | — |
| D16 | Photos: no stock. Grey plates with a caption bar until an office supplies a photograph; the Media library has one folder per office. | — |
| D17 | Five gates in order, no calendar dates; each gate gets its date in the table below when it passes. | — |
| D18 | Report language: ASD-STE100 Simplified Technical English, short. Tickets in English; Arabic content reviewed by the office named in P-17. | — |

## Proposal decisions the build waits on (P-rows)

The build runs on the working assumption in the right-hand column. A reply replaces it with a D-row.

| # | Proposal ID | Question | Owner | Working assumption used in the build |
| --- | --- | --- | --- | --- |
| P-1 | 03 §13.1 | Domain: ticqc.com or ticqc.ae | CEO, IT | ticqc.com (brand book), ticqc.ae redirects |
| P-2 | A-01, D1 | Menu: six items with "Verify" in the utility bar | Directors | Six items (design built on it) |
| P-3 | A-02, D2, D3 | Service and industry names | Directors, offices | Names in 01 §5.3–5.4 |
| P-4 | A-03, D17 | Phases | CEO | D1 above |
| P-5 | A-04, Q-11, Q-17, Q-18 | Arabic first; reviewer; scheme terms | Offices, CEO | Arabic on; reviewer in Baghdad; terms as drafted |
| P-6 | Q-04 | Owner and deputy per office, hours | Office managers | One account per office seeded as placeholder users |
| P-7 | Q-06, D14, D15 | WhatsApp staffing, reply promise, no chatbot | Office managers | Dubai, Baghdad, Cairo, Riyadh on WhatsApp; one working day; no chat widget |
| P-8 | Q-08, D12 | Where certificate records live; unique numbers; QR | Quality Manager, IT | CSV import (D9) |
| P-9 | Q-09 | Confirm Wagtail, conventional | CEO, IT | Yes (03 §4.3 recommendation) |
| P-10 | Q-16 | CRM | CEO, Finance, IT | None in V1 (D10) |
| P-11 | Q-15, 02 B2.8 | Hosting region; data-residency clauses in program contracts | CEO, IT, Legal | D12 |
| P-12 | Q-26 | The office count (12 / 14 / 20+) | Head office | "offices in 12 countries", "14 addresses" |
| P-13 | D4, D5, D6 | Which programs; what fees and turnaround may be published; merge the three Iraq pages | Programs director, Baghdad | Five programs + SFDA "in progress"; fees and days as placeholders; one Iraq page |
| P-14 | D11, D12 | Verify shows masked client name? QR on certificates | Quality Manager, Legal | No; QR yes |
| P-15 | 01 §5.6, 02 B3 | Accreditation numbers for every mark; EIAC/EGAC | Quality Manager | Only the five verified rows shown |
| P-16 | 01 §5.6 | Leadership names and photos | CEO | Placeholders |
| P-17 | 02 Part D | Office inventory (addresses, phones, hours, entities) | Office managers | Today's footer addresses; phones and hours as placeholders |

## Gates

| Gate | What is demonstrated | Passed on |
| --- | --- | --- |
| 0 | Repo clean, scaffold runs locally and on staging, the design's shared parts render | — |
| 1 | Home, Services, Industries pages from seed, English frame, Lighthouse on staging written down | — |
| 2 | Programs (Iraq, all twelve parts), Verify with imported records, quote form routed to an office with email alerts | — |
| 3 | About, trust pages, Resources, Offices, Careers, Complaints; all seed content in; review-by dates mailing | — |
| 4 | Arabic frame and the Arabic-first pages, redirect map, migration of the 34 posts and downloads, launch checklist green | — |
| Launch | DNS cut-over, old site redirected, Search Console, monitoring | — |
