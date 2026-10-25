# 03. The new TIC Quality Control website: how it will be built and run. Technology proposal.

**From:** Darya Ibrahim, web lead, TIC Quality Control
**To:** the CEO, directors and head office; IT, Finance and Legal readers; office managers (sections 1, 5, 7, 8 and 9 need your answers)
**Date:** 22 October 2026
**Status:** proposal for comment. Nothing here is decided, designed or built.

**Reading time.** Section 1 takes five minutes and is written for non-technical readers. Sections 5, 7, 8 and 9 take about 15 minutes and are the ones offices should read. The full document takes about an hour and is mainly for the CEO, head office, IT, Finance and Legal.

**What I need from you (CEO and head office):** read section 1, then section 16 (the decisions and who takes them), and tell me which decisions you can take now and which need more information. At the end of section 1 there is a box for three quick answers: which option you lean to, which budget band, and what worries you.

**If you run an office:** read section 1 (five minutes), then sections 7, 8 and 9 (15 minutes). I need four things from you: who in your office will own the web pages and who deputises; whether your office can staff a WhatsApp line, in which hours, with what reply time; which countries' enquiries should come to you; and, for Baghdad and Cairo, the Arabic scheme terms you use. Write them in the comment boxes or email me.

**How to reply.** Write in the shared Word copy at [location, as in the cover email], or email me (address in the cover email) with the document and section number in the subject line, for example "03, section 8". A two-line reply is enough. Please reply by [deadline to be set by Darya], the deadline in the cover email (document 00; the target is 12 November 2026), so I can merge replies with the content proposal before any design work starts.

**Two markers appear throughout.** **Working assumption (Darya)** means: this is what I will go with unless you tell me otherwise, so please object if you disagree. **Decision needed** means: I cannot go further without an answer from the person named. Each decision carries the ID it has in the decision log (document 00, section C.2), so one reference works across all the documents.

This is the technology half of the proposal. The content half (document 01, 01-Content-Proposal-for-Directors-and-Managers.md: what the site says, which pages, who owns what) is separate. The reading order and the decision log are in document 00, 00-README-Cover-Note-and-Decision-Log.md. Content decisions come first; the choices here serve them.

---

## 1. Summary for non-technical readers

**Where we are.** ticqc.ae runs on a third-party page-builder platform, with many add-ons, built around June 2024. The server runtime stopped receiving security fixes in November 2022. The home page weighs 9 MB, 8.3 MB of it images, and scores 53 to 64 out of 100 on mobile in Google's Lighthouse speed test (two runs; scores vary by 5 to 10 points between runs). A list of our five user accounts is publicly readable and the login page is open to anyone. Nobody in-house maintains it.

**What we recommend.** We rebuild on a system that gives us fixed page layouts (templates), a check-before-publish step (approval), and a record of every change, built in rather than bolted on through extra add-ons (small third-party programs that extend a platform and are the usual source of security holes). The company works in Python and Django, so both options are built on **Wagtail**, a free, open-source content system written in Python (a programming language) whose templates, roles, approvals, permissions and change history are included, so there is nothing to license. Two ways to run it:

- **Option A**: Wagtail as a conventional website. One system both stores the content and serves the public pages. This is the recommendation.
- **Option B**: Wagtail in "headless" mode. Wagtail stores and edits the content, and a separate modern front end (the part visitors see, built with a tool such as Next.js or Astro) reads it through Wagtail's data interface. Two pieces of software instead of one.

My recommendation is **Option A, with Option B held in reserve for the day a separate front end is genuinely needed, for example for a client area or a mobile app**. In short: the things we most need (templates, roles, approvals, history, office-scoped editing, an accessible admin) come built into Wagtail with nothing to license, in either mode. Option A is simpler to build, host and maintain; Option B adds a second codebase and a second maintainer skill set for a benefit we do not yet need. Wagtail is designed so that a conventional site can later expose the same content to a separate front end, so choosing A now does not close the door on B.

**The final pick between the two modes is not made here.** It is made after the content proposal is approved and after the CEO and I agree how many hours a week I can give this for the two months. That one fact changes how much we build in-house and how much an agency builds.

**Cost, roughly.** Published agency guides put the build of a multilingual group site of our size at **AED 90,000 to 250,000 (about USD 25,000 to 68,000)**. My own addition of the researched running-cost lines (hosting, customer-records system, maintenance, content and translation) gives roughly **AED 60,000 to 180,000 a year**; section 14 shows the lines and three budget bands.

**Time.** The whole plan fits inside **two months from approval**: Phase 1 launches **about six weeks from an approved brief**. Phase 1 is the site in English, the only required language, built so that any further language can be switched on later. Phase 2, in weeks six to eight, adds the languages that offices request, each with a named reviewer in that office, as the Brazil office has done for Portuguese; Arabic, Indian or Chinese versions follow the same rule, as in the content proposal. What stretches the timeline is content arriving late from offices, not technology.

**Growing later.** Whatever we choose, adding a new service, program, office, language or training course after launch is a job for a content editor, not a designer or developer. Section 5.5 says how.

**Decisions needed** (section 16): Wagtail in conventional or headless mode; agency, in-house or a mix; budget band; ticqc.ae or ticqc.com; hosting region; customer-records system; who staffs WhatsApp and when; where our certificate records live so a verification tool can read them; which languages, if any, offices request, each with a named reviewer; and, from each office, a page owner and deputy.

**Not decided here:** the visual design, the vendor, or the exact list of software components. Section 17 explains why.

Three quick answers would help me most: which option you lean to (A or B), which budget band (lean, recommended or full, section 14.4), and what worries you. Also: does this summary match how you see the current site from your office? Is anything missing that your clients complain about?

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 2. Where we are today

Facts as I observed them on 21 and 22 October 2026. This describes the site, not the people who built it.

### 2.1 The stack

| Layer | Today | Note |
|---|---|---|
| Content system | A third-party page-builder platform with many add-ons | Layouts hand-built per page; nobody in-house maintains it |
| Forms | A generic form add-on | One generic form; no online application for any program |
| Search settings | A search-settings add-on | Generates the sitemap |
| Cookie banner | A consent add-on | Renders correctly for visitors ("Manage Consent"); template placeholders ({title}, {vendor_count}) are visible in the raw HTML before the page scripts run, which is untidy but not user-facing. Text and categories are the generic defaults |
| Languages | Two language add-ons, both installed | The /pt/ site is an English shell with no content; /ar/ returns page-not-found; one add-on rewrites the English page on the fly with machine translation |
| Analytics | Google Tag Manager, container GTM-5KRPQDSK | No analytics ID visible in the page; it may sit inside the container (to be confirmed) |
| Network | Cloudflare in front | DNS, caching and a basic firewall can be reused |
| Server runtime | A version that stopped receiving security fixes in November 2022 | End of life for almost four years |
| Hosting provider | Not visible behind Cloudflare | (to be confirmed with whoever holds the hosting account) |

[Sources: own fetches of https://ticqc.ae on 21 October 2026; notes ticqc-current-site-audit.md and visual-design-benchmark.md]

### 2.2 Performance

- Home page: **9.07 MB** over 112 requests; images **8.33 MB**, JavaScript 0.76 MB. One hero JPEG is 3.6 MB. Four accreditation logos are scans over 2,000 pixels wide shown at about 200.
- Lighthouse mobile performance, local run: **53** (home), **58** (Iraq Certificate of Conformity, CoC), **62** (contact). Google's own PageSpeed run the same night gave **64** for the home page. Single runs vary by 5 to 10 points, so treat these as bands. Mobile Largest Contentful Paint (time until the main image is on screen) measured 22 to 30 seconds in the lab.
- Google's Chrome User Experience Report holds **no field data** for ticqc.ae: too few Chrome visitors to measure.

[Sources: Lighthouse 12.8.2 local and https://pagespeed.web.dev/analysis/https-ticqc-ae/qzfa090qnl?form_factor=mobile (Lighthouse 13.5.0); note visual-design-benchmark.md]

### 2.3 Security exposure

- A public address on the site lists our five user accounts with names (the platform's default), which hands anyone a username list to try passwords against.
- The login page is reachable by anyone (whether login attempts are rate-limited was not tested: to be confirmed). The platform's remote-publishing interface is blocked (good).
- The server runtime has had no security patches for almost four years.

### 2.4 Accessibility

The Iraq CoC page has **204 colour-contrast failures**, nearly all from one choice: grey text at reduced opacity on navy. Four of 22 home images have no alt text (the words a screen reader speaks instead of the image); the header logo's alt text is empty.

### 2.5 Content inventory and domains

- Sitemap: **49 pages and 34 posts** (83 URLs). About 20 pages are in the menu; roughly 25 are reachable only through search engines or body links.
- The home page "Government Services Programs" card and a footer link on every page point to `/verification-of-conformity/`, which returns page-not-found.
- **ticqc.com** redirects permanently (301) to ticqc.ae. Before TIC held it, ticqc.com was an unrelated Arabic online-games site (2019 and 2020 captures), so its search history is not an asset. The search equity sits on ticqc.ae.

### 2.6 Interim fixes on the current site, now

These do not wait for the rebuild and sit outside the project budget. This is the single list; the content proposal (01, section 11) and the decision log (D-04) refer to it.

| Fix | Who | By when |
|---|---|---|
| Move the server to a supported runtime version | Current host, asked by Darya | Within two weeks of this proposal going out |
| Hide the public user listing | Current host or Darya | Same |
| Rate-limit the login page (after checking whether it already is) | Current host or Darya | Same |
| Repair the page-not-found link on the home page card and footer | Darya | This week |
| Retitle the page published under a page-builder placeholder title | Darya | This week |
| Correct the footer and address typos | Darya, with offices confirming addresses | Two weeks |
| Configure the cookie banner's text and categories | Darya | Two weeks |

**Working assumption (Darya):** I go ahead with these without waiting for replies, unless someone objects.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 3. Requirements the content proposal creates

Each thing the content proposal asks for is a technical requirement. Every platform in section 4 is judged against this list.

| # | Requirement | Technically |
|---|---|---|
| R1 | English required; any other language optional, added when an office requests it and names a reviewer | One URL per language; a real edition of each page in the added language (right-to-left for Arabic, Devanagari or other Indian scripts, Chinese characters), not a translate button that rewrites the English page on the fly as one of today's add-ons does; any number of languages without re-licensing |
| R2 | Office contributors with approvals | Office staff edit their own pages but cannot publish; a reviewer approves; head office publishes anything |
| R3 | Program template with dated downloads | One template for Iraq, Egypt, Botswana, Libya, Kurdistan Region of Iraq vehicles and future programs; managed downloads with version and date; a review-by date on every page |
| R4 | Certificate verification | Public lookup answering "is this number real and valid" from TIC's own records (section 6) |
| R5 | Routed forms | Short forms routed to the right office by country, Dubai as fallback (section 7) |
| R6 | WhatsApp and WeChat | Click-to-chat per office; a WeChat entry for Guangzhou (section 8) |
| R7 | Training catalogue | Courses with date, price, format, issuer, register button |
| R8 | News | Dated posts, named authors, categories |
| R9 | Downloads library | One managed place for forms, product lists and policies, with version and date |
| R10 | Client area, later | Login for status, certificates, invoices; not in the first build, but the platform must not block it |
| R11 | China reachability | No dependency on hosts that do not load from the mainland (section 10) |
| R12 | Performance and accessibility | Core Web Vitals "good" and WCAG 2.2 AA (section 11) |
| R13 | Privacy law | Consent banner and privacy policy for UAE PDPL, Saudi PDPL and GDPR (section 11) |
| R14 | Locked design | A fixed block library, so every page shares one look and no page can be styled on its own |
| R15 | Audit trail | Who changed what, when; version history; rollback |
| R16 | Careers applications | A form with CV upload, routed to HR (01, section 5.11) |
| R17 | Accreditation table and policy register | Each accreditation row with body, number, entity, status, valid-until and register link; each policy document with code, version and effective date |
| R18 | Site search | Search across pages and downloads, in English and in every added language |
| R19 | Regulatory updates feed | Dated updates per program, shown on the program page and in one combined feed (01, Phase 2) |
| R20 | Office pages with a map | A map on each office page that does not depend on Google Maps, which does not load from China |

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 4. Platform options

If you are not technical, read 4.3 (the recommendation) and skip the rest of section 4.

### 4.1 What the majors run, and why it matters less than it seems

The big international firms (SGS, Bureau Veritas, Intertek, TÜV SÜD, DNV, Applus+ and others) use enterprise systems. Sitecore licences are reported by a UK agency at GBP 50,000 to 80,000 a year before development; Optimizely and Adobe Experience Manager publish no prices and are in the same class [https://www.kayo.digital/kayo-how/umbraco-at-battle-choose-your-fighter-umbraco-vs-sitecore/]. The mid-size firms closest to us mostly use off-the-shelf page-builder platforms or a custom build. [Own fingerprints, 21 October 2026; note platform-and-tech-options.md]

Enterprise systems are not a pattern for a company of our size and are not considered further. Page-builder platforms with add-on ecosystems are what we are leaving, and the company's development skills are in Python and Django, so platforms written in other languages are not considered either. We copy what the majors show (clear service lists, office pages, certificate lookup, consent, speed), not the software they buy.

### 4.2 The two options

Both options are built on **Wagtail**, a free, open-source content system built on Django (a Python web framework). Published features: block-based editing, customisable approval workflows, fine-grained permissions for who edits, reviews and publishes (so an office can be given its own pages and nothing else), version comparison and rollback, scheduled publish and expiry, site-history reports, languages via Wagtail Localize, a built-in API for feeding content to other software, and an admin interface targeting WCAG 2.2 AA with a built-in accessibility checker [https://wagtail.org/features/]. It is BSD-licensed: nothing to license, in either mode. Clutch lists 154 Wagtail firms [https://www.clutch.co/developers/wagtail]. The difference between the two options is how the public pages are served. Product names and list prices behind each option are in Appendix A1.

**Option A. Wagtail as a conventional server-rendered site.** One application stores the content, runs the admin and renders the public pages from its own templates. Editors preview exactly what visitors see. Forms, the certificate verification tool and any future logged-in area live in the same Django codebase.
For: one codebase, one host, one skill set (Python and Django); the templates, locked block library, roles, approvals, change history and office-scoped editing from section 5 all come with Wagtail and need no second system; the simplest to cache behind Cloudflare; the cheapest to build and maintain.
Against: the public pages are rendered by the same server that runs the admin, so a very heavy traffic spike touches both (Cloudflare caching absorbs this at our volumes); a separate native app or a second site would have to call the API anyway.

**Option B. Wagtail in headless mode.** The same Wagtail admin, storing the same content, but the public pages are built by a separate front end (Next.js or Astro, for example) that reads Wagtail's API. This is, in structure, what SGS, TÜV SÜD and QIMA do with their own content systems.
For: the front end can be reworked without touching the content system; the same content can feed a client-area application or a mobile app; the front end can be served from an edge host of our choosing.
Against: two codebases and two deployments; preview has to be wired up between the two; a JavaScript-capable maintainer is needed alongside the Python one; two popular front-end hosts (Vercel, Cloudflare Pages) did not load from mainland China on their default domains (section 10). Nothing in the content proposal needs this today.

One caveat that applies to both: Wagtail's 2026 roadmap lists "flawless RTL support" for right-to-left editing screens as a goal, not a finished feature (seen in search summaries only; what exactly is covered is to be confirmed in a demo). The public site is unaffected, because text direction and script support on the public pages are a front-end matter on every platform and are fully in our hands, but editors working in Arabic may find the editing screens less polished than the pages they produce. Indian-language and Chinese editing screens are not affected, since those scripts run left-to-right.

### 4.3 Recommendation

**Primary: Option A, Wagtail as a conventional site. Option B, Wagtail in headless mode, only if and when a separate front end is needed for a client area or an app.**

Why Wagtail at all. The content proposal is really a governance proposal: templates, locked blocks, office-scoped editing, approvals with review-by dates, an audit trail. Wagtail ships all of it, with nothing to license, and its admin documents WCAG 2.2 AA, which matters when editors across our 14 locations in 12 countries use it. It is written in Python on Django, which is what the company's development work is already in, so in-house ownership is realistic from day one. And a client area (R10) is a logged-in application, which Django is designed for.

Why conventional first. Option A is one codebase, one deployment and one skill set. Everything in sections 5, 6 and 7 can be built in it without a second system, and Cloudflare caching gives it the performance we need (section 11). Choosing A does not close the door on B: Wagtail's API is part of the same product, so if a client area or app later needs a separate front end, it can read the same content without a migration.

Why headless is held in reserve. Option B adds a second codebase, a second deployment, a preview bridge between the two and a second maintainer skill set, for front-end freedom that nothing in the content proposal currently needs. It becomes sensible when a separate front end is genuinely required, not before.

**Working assumption (Darya):** my own work is in Python and Django, which is why both options are realistic for in-house ownership. The open question is hours, not skills: I will agree with the CEO, in person and before the final pick, how many hours a week I can give this for the two months. I think this is the single most important unknown. If the answer is "few hours", an agency builds Option A and we maintain it (the hybrid in Q-10); the platform does not change.

**Decision needed (Q-09, CEO and IT):** confirm Wagtail, and whether in conventional or headless mode (A or B), taken after the content proposal is approved and after the in-house hours conversation. Not before.

**Decision needed (Q-10, CEO):** one accountable external supplier, in-house code ownership, or a hybrid (agency builds, we maintain).

Before the final pick: a one-hour demo of Wagtail with one real office editor, editing a real program page.

### 4.4 Comparison on TIC's criteria

Ratings are my reading of the published evidence, not vendor claims. Strong = included and documented; Adequate = possible with extra work or a second component; Weak = not available or depends on a third party. Rows where the two options are identical are marked "Same", because the content system is the same Wagtail in both.

| Criterion | A. Wagtail, conventional | B. Wagtail, headless |
|---|---|---|
| Editor-friendliness for office staff | Reported strong; live preview of the real page is built in; to be confirmed in a demo with a real office editor | Same admin; preview must be wired up between Wagtail and the front end |
| Roles and approval workflow | Strong (built in) | Same |
| Audit log and version history | Strong (built in) | Same |
| Multilingual: Arabic (right-to-left), Indian languages, Chinese | Strong (Wagtail Localize; one URL per language; public-page direction, scripts and fonts are ours to set in the templates; right-to-left editing screens on the roadmap) | Same content side; public-page direction, scripts and fonts handled in the front end |
| Forms and routing | Adequate (Django forms; routing in the CRM) | Adequate (forms posted to Wagtail or the CRM from the front end) |
| Security track record | Strong (Django's security record; no add-on marketplace) | Strong, with a second deployment to patch |
| Performance | Strong (cached behind Cloudflare) | Strong (static or edge-rendered front end) |
| Licence and hosting per year | USD 0 licence plus USD 600 to 6,000 hosting | USD 0 licence plus USD 600 to 6,000 hosting plus front-end hosting (USD 0 to 1,200) |
| Agencies in UAE and India | Adequate (global pool; Django strong in India) | Adequate (same pool, plus front-end skills) |
| Lock-in | Low (open source, standard hosting) | Low |
| Fit with in-house skills | Strong (Python and Django) | Adequate (Python plus a JavaScript-capable maintainer) |
| Client area later (R10) | Strong (Django is built for logged-in applications) | Strong (the same API feeds it) |
| Complexity to build and run | One codebase, one deployment | Two codebases, two deployments |

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 5. Admin structure: a fully structured back office

Whatever platform wins, the back office is set up the same way. This is the part of the document that most affects daily life in the offices: who can edit what, and what happens before a page goes live.

### 5.1 Six roles

| Role | Who | Edits | Publishes | Scope | Other rights |
|---|---|---|---|---|---|
| Global Admin | Web lead plus one deputy | Everything | Everything | Whole site, all languages | Users, roles, templates, block library, integrations |
| Content Manager | Head-office marketing or communications | Everything | Everything | Whole site | Approves any submission; fallback reviewer for every office; owns downloads library and media folders |
| Office Editor | Named owner and deputy per office | Own office page, office news, assigned program pages | No | Own office, assigned languages | Submits for review; sees own drafts and history |
| Reviewer | Regional director or service head | Comments and edits on submissions in scope | Yes, after review | Region or service line | Approves or returns; sets the review-by date |
| Translator | The reviewer named by the office that requested a language (for example Portuguese, named by the Brazil office; Arabic, Indian or Chinese reviewers named by their offices in the same way) | Translated versions only | No | One language | Cannot change the source page |
| Viewer | Directors, quality manager | Nothing | No | Whole site | Reads drafts, history, audit log; comments |

Rules: every office names an owner and a deputy with hours committed (the content proposal and questionnaire 02, Part C, ask for this). A reviewer who makes substantive edits asks another reviewer or the Content Manager to approve; typo fixes by a reviewer may be self-approved and are logged. Head office's Content Manager is the fallback reviewer for every office, so a small office is never blocked. Accounts are personal; the shared "TIC" user that exists today is retired. Single sign-on with our email system is desirable, not required in the first build (to be confirmed which email system TIC uses company-wide).

**Decision needed from each office manager (Q-04):** name your owner and deputy and roughly how many hours a month each can give (two to four is realistic for most offices; more for offices that run programs).

### 5.2 Page templates, one per type

Mirrors 01, sections 5 and 6; the content proposal is the master for what each page contains. This table says which fields the system refuses to publish without.

| Template | Used for | Required fields (cannot publish without them) |
|---|---|---|
| Service | Each inspection, testing, certification or survey service | What it is, who needs it, how it works, documents needed, what you get, standards named, where we do it, related services, questions and answers, named contact and form, last-reviewed date and owning office |
| Industry | Oil and gas, marine, food, commodities, consumer products, vehicles, and the others in 01 | Summary, services, related programs, contact |
| Program | Iraq, Egypt, Botswana, Libya, Kurdistan Region vehicles, future programs | The twelve parts in 01, section 5.5: regulator and appointment status, dated product list, routes, process with timeline, document checklist, online request form, fees or fee basis, FAQ, regulatory updates, office contacts, complaints and appeals link, plus **review-by date** and last-reviewed date |
| Office | Each of our 14 locations in 12 countries | Legal entity, address, map, local phone and email, WhatsApp or WeChat, hours and time zone, services sold, named manager (if agreed), local language |
| Course | Each training course | Title, dates, price, format, certificate issuer, register button, impartiality note |
| News | Announcements | Date, named author, category, one image with alt text |
| Policy | Impartiality, complaints and appeals, privacy, terms, mark use, subcontracting | Document code, version, effective date, owner, PDF |
| Landing | Campaign or event pages | Expiry date (the page unpublishes itself) |

### 5.3 A locked library of blocks

Editors assemble pages from an approved set of building blocks and cannot change colours, fonts or spacing. Illustrative; the final set is agreed in the design phase. The ten that matter for governance: step list, document checklist, download list, regulatory notice, contact card, office card, form, questions and answers, table, call-to-action bar. Around them sit the ordinary ones (heading, paragraph, image with caption, two-column text, quote, map, video link rather than embed on exporter pages, related pages).

The point: pages will all share one look. Today the Iraq page uses its own navy styling because the tool allowed it; the new system simply will not offer that choice, so nobody has to police it.

### 5.4 Workflow, history and publishing

- **Approval workflow:** draft, submitted, changes requested, approved, published. Program and policy pages always go through review; office news can take a lighter one-step review.
- **Review-by dates:** every program page carries a date by which its owner re-confirms the content; the system emails owner and reviewer two weeks before and flags the page after.
- **Version history:** every save kept; any two versions compared; any version restored.
- **Scheduled publishing and expiry**, and **preview** of the real page in the real design and language direction before submitting.
- **Media library:** folders per office; alt text required on upload; images converted and resized automatically (WebP, sized to display). The India office's blueprint sets a useful rule here, one lightweight image per page under 100 KB, which the templates enforce rather than ask for.
- **Audit log:** who did what, when, on which page, including logins and role changes.
- **Translation workflow:** English page marked ready; machine draft created in the requested language; the Translator for that language corrects it; the requesting office's Reviewer signs off; only then publish. The same steps apply whether the language is Portuguese, Arabic, an Indian language or Chinese. The English page shows which translations are current and which are behind.

Wagtail has all of 5.4 built in, in either mode (section 4), with nothing to license.

### 5.5 Adding things later without a redesign

The templates and the block library are what make the site expandable (the log's A-05). After launch:

- **A new service or industry:** the Content Manager creates a page from the Service or Industry template; it appears in the menu, the related-services lists and the site search automatically.
- **A new program (for example Saudi SABER):** the Program template, same twelve parts; it joins the Government & Trade Programs menu and the regulatory-updates feed.
- **A new office:** the Office template, plus a row in the routing table (section 7) and a WhatsApp or WeChat entry (section 8). No developer.
- **A new language:** when an office requests it and names a reviewer, switch on the locale, translate the frame first (navigation, footer, forms, banner, emails), then pages follow through the translation workflow in 5.4. No new licence under either option.
- **A new training course:** the Course template; it appears in the catalogue.
- **A new regulatory update:** a dated entry on the program page; the feed updates itself.

Adding a new template type (for example a product page, if Phase 3 needs one) is a small developer job, a few days, not a redesign. The design (colours, type, layout) is fixed once and reused by every new page.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 6. Certificate verification tool

Every competitor that matters has one: SGS, Bureau Veritas, Intertek, the TÜVs, DNV, Lloyd's Register, Kiwa, Cotecna, HQTS, Sunchine, QIMA. DNV and Bureau Veritas print a QR code on the certificate that opens the record. Our only verification link returns page-not-found. The India blueprint proposed this feature, and my September guide to it called it probably the single most valuable addition; I still think so. [https://certificatechecker.dnv.com/; https://www.sgs.com/en-us/certified-clients-and-products]

### 6.1 For the visitor

1. Type the full certificate number, or scan the QR code printed on the certificate, which opens the same page with the number filled in.
2. See the result, in English or in any language the site offers, within a second.
3. If not found, the page says so, gives the issuing office's contact and a fraud-warning line, and never suggests nearby numbers.

### 6.2 Fields shown

Follows 01, section 5.9: no client names, no product details, no way to browse.

| Field | Shown | Note |
|---|---|---|
| Certificate number | Yes | As typed |
| Type | Yes | Iraq CoC, Egypt CoI, inspection report, and so on |
| Status | Yes | Valid, expired, superseded, suspended, withdrawn |
| Issue date, expiry date | Yes | |
| Issuing office | Yes | City and country, with a phone or WhatsApp number if something does not match |
| Consignee | No | A masked form ("A*** Trading LLC") is a later option, only if the Quality/Accreditation Manager, the Government & Trade Programs director and Legal agree (Q-23) |
| Scope or product line | No | Same: a later option, only where the program contract allows |

### 6.3 Safety rules

- **Number-only lookup.** No browse, no list, no search by company name. DNV lists the first 15 company matches; a stricter rule is defensible for a body our size and prevents harvesting our client list.
- **Nobody can type numbers one after another to harvest records:** certificate numbers are not sequential, or the QR code carries a code that cannot be guessed, so the web address cannot be walked through.
- **Rate limiting** per visitor address at several layers; after a few failed attempts, a "prove you are human" box (hCaptcha; we use this one rather than Google's because Google's version does not load in China).
- **Logging** of every lookup with time, result and source.
- **No files served.** The tool answers from a database, not by handing out PDFs. The India blueprint's external file storage is better applied to brochures and forms than to certificates.

### 6.4 Where the data comes from

| Option | Effort | Fits when |
|---|---|---|
| 1. CSV upload by the programs team | Lowest | Records are in spreadsheets per office; a daily or weekly upload is acceptable |
| 2. Nightly sync from TIC's records system | Medium (the usual target) | Records live in one database or ERP that can export on a schedule |
| 3. Live API | Highest | The records system answers queries in real time and the program needs minute-level status |

**Decision needed (Q-08, Quality/Accreditation Manager with IT):** where do certificate records live today (which system, which offices, which numbering scheme), and is a QR or numbering scheme already in use? Question B3.7 in the questionnaire (document 02, sent with this proposal) asks this, and the log's Q-14 asks whether every certificate carries a unique number and can carry a QR code. The answers decide which option is possible and what the tool costs.

**Working assumption (Darya):** start with option 1 or 2, and design the database so option 3 can replace it without changing the public page.

### 6.5 Client area, later

A logged-in area for request status, certificate downloads and invoices (what SGS's Exporter Portal, Verigates and myQIMA do) is the next step, Phase 3 in the content proposal. It depends on the same data source plus an invoicing connection, so it is scoped after the verification tool proves the data flow. If it ever stores client inspection data, the hosting-region question in section 11 becomes stricter.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 7. Forms, lead routing, CRM and email

**Forms.** Every service, program and office page ends with a form of **five to seven fields** (name, company, email, phone, country, service or program, message). Country and service are structured fields so routing can act on them. Each form carries a one-line privacy notice and a consent tick box.

**Routing.** Iraq goes to Baghdad, Egypt to Cairo, China to Guangzhou, and so on; anything unmatched goes to Dubai. The routing table lives in the customer-records system, not in website code, so office managers can change it without a developer. Each office tells us what reply time it can promise (for example, same working day). The system records how long enquiries actually wait, so we can see where an office needs cover or a form is sending enquiries to the wrong place; it is a tool for the office, not a league table.

**What the visitor experiences.**

1. On sending, an on-page confirmation naming the receiving office and its hours.
2. An auto-reply email in the visitor's language with a reference number and the office's phone and WhatsApp.
3. The enquiry visible to the office in the customer-records system within a minute, with the reference number.
4. The reference number can be quoted on WhatsApp, so the two channels join up.

**Decision needed (routing, part of Q-06, each office manager):** which countries' enquiries should come to your office, and which services. Questionnaire 02, B2.7, B2.11 and B5.6, collect this.

**CRM** (customer relationship management system: a shared record of every enquiry, its owner and what happened).

First question: does any company in the group (TIC, Seacorr, LOX) already run a CRM, or an ERP with a sales module? If yes, the website feeds that, and the table below is irrelevant. Questionnaire 02, B5.4, asks how enquiries are handled today; I will put the CRM question directly to head office and finance as well.

If nothing exists, the fallback options are:

| Option | Price (2026, published or third-party) | Note |
|---|---|---|
| Zoho CRM | Standard about USD 14 to 20 per user a month; Professional 23 to 35; Enterprise about 40 | Assignment rules and web forms from Standard. Zoho opened data centres in Dubai and Abu Dhabi on 13 January 2026; Saudi hosting on Enterprise and Ultimate [https://www.manageengine.com/news/zohocorporation-opens-datacentres-in-uae.html] |
| HubSpot | Sales Hub Starter about USD 7 to 20 per seat; Professional 90 to 100 per seat plus USD 1,500 onboarding | Bundles forms, chat and content; advanced routing needs Professional |

For about ten seats: **USD 2,000 to 12,000 a year**. Microsoft Dynamics and Salesforce were not costed; they are usually chosen when finance already runs on them.

**Decision needed (Q-16, CEO, Finance and IT):** the CRM: an existing group system if there is one, otherwise Zoho or HubSpot.

**Transactional email.** Form notifications, auto-replies and verification messages go through a dedicated sending service (Amazon SES, Postmark, SendGrid or Mailjet) with **SPF, DKIM and DMARC** set on ticqc.ae: three DNS records that tell receiving servers our mail is genuine. Google's sender rules since February 2024 require SPF or DKIM for everyone and all three for bulk senders [https://support.google.com/a/answer/81126]. Sending from the web server's own mail function, as the current site most likely does, is the common cause of enquiries landing in spam (to be confirmed by checking our current DNS records).

**Spam control.** hCaptcha (the "prove you are human" box; we use this one because Google's reCAPTCHA did not load from any mainland China test point, hCaptcha did, and our current security header already allows it) or server-side checks: hidden trap fields that only robots fill in, time-on-form, rate limits.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 8. Messaging: WhatsApp, WeChat and live chat

**Evidence.** A 2024 Zbooni/YouGov poll of 1,000 UAE residents found **85 percent prefer WhatsApp** for dealing with companies and **nine in ten prefer a real human** to a chatbot [https://communicateonline.me/news/85-percent-of-uae-residents-want-businesses-to-use-whatsapp/]. A SurveyMonkey/Reddit 2026 B2B study found only **18 percent of decision-makers use chatbots** in research; inaccurate (41 percent) and conflicting (40 percent) answers are the top complaints; **39 percent trust chatbots** against 55 percent for vendor websites [https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/]. WhatsApp use is about 90 percent in the UAE, and a combined 75 percent of nationals across seven Arab countries including Egypt, Saudi Arabia and the UAE; Chinese exporters use WeChat and rarely check email. Among competitors, only QIMA publishes a WhatsApp link; nobody publishes a human-staffed line with hours.

| Option | Cost | What you get |
|---|---|---|
| Click-to-WhatsApp link per office (wa.me) | Free | Opens a chat with a pre-filled message; no history, routing or analytics |
| WhatsApp Business Platform via a provider (Twilio, 360dialog, Infobip) | Per-message pricing since July 2025; **1,000 free service messages a month per business number**; from October 2026 Meta charges for service messages beyond that; business-initiated template messages charged by country | Shared inbox, history, routing, reporting; inbound enquiries at our volumes likely stay in the free tier [https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing] |
| Live chat tools | tawk.to free (USD 29 a month without branding); Crisp USD 0 to 295 a month; Intercom USD 29 to 132 per seat a month | A website widget, optionally connected to WhatsApp; AI agents at extra cost |

**Recommendation.** A **human-staffed WhatsApp line per office that offers it, with published hours and a stated reply time**, starting with the free link. Upgrade to the Business Platform and a shared inbox only when an office needs history and routing across several staff. No chatbot in the first build; if one is ever added it answers only office contacts, service summaries and the certificate lookup, with a visible "talk to a person" path.

One rule from the China tests: wa.me did not load from the mainland, so the Guangzhou page shows WeChat, not WhatsApp. A **WeChat Official Account** (Service type) can be opened by an overseas company for a reported **USD 99 a year** verification fee (vendor-reported; Tencent's own page shows no fee text) [https://appinchina.co/blog/how-to-open-a-wechat-official-account-step-by-step-guide/]. Whether Guangzhou is a registered mainland entity decides whether the account sits under it or under the UAE company (to be confirmed by Guangzhou).

**Decision needed from each office manager (Q-06):** can your office answer a WhatsApp line in working hours? If yes, which hours (local time), and what reply time can you promise (for example, within two working hours)? If no, say so; a plain phone number and form is fine. I have assumed Dubai, Baghdad, Cairo and Riyadh will say yes; please correct me. Questionnaire 02, Part D2, asks this for each office.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 9. Languages

English is the only required language. Every other language is optional, and is added only when an office requests it and names a reviewer in that office who will sign off the translated pages. The Brazil office has done this for Portuguese. Arabic, Indian or Chinese versions are added by exactly the same rule, at the request of the offices concerned, and none of them ranks above another. What Phase 1 delivers for languages is the technical readiness: the site is built from day one so that any language can be switched on without rebuilding anything.

### 9.1 Any added language is a full version, not an overlay

I looked at how the sector handles languages other than English. SGS, Intertek, Cotecna and Bureau Veritas have no Arabic web pages for Egypt or Saudi Arabia. TÜV Rheinland's UAE Arabic page is a partial subset with a visible "Translation missing" string and no right-to-left declaration on the document. QIMA, HQTS, V-Trust and Pro QC run real Arabic sites, and **none loads a typeface designed for the script**. The Chinese sites of the majors are separate full sites (section 10.3). The lesson is the same for every language: a half-translated overlay looks broken; a full version of each page, in a typeface made for its script, does not. [Note arabic-and-china-readiness.md; https://www.sfda.gov.sa/ar; https://ar.hqts.com/]

Our rules, which apply to whichever language an office requests, drawn from the W3C internationalisation layout requirements [https://www.w3.org/TR/alreq/] and the best local references in each market:

1. **Document-level language and direction:** every page declares its language (`lang="ar"`, `lang="hi"`, `lang="zh-Hans"`, `lang="pt-BR"` and so on). Arabic pages also declare `dir="rtl"` and the layout is mirrored through CSS logical properties; Indian-language, Chinese and Portuguese pages run left-to-right like English. Wagtail supports any of these through the same locale mechanism.
2. **A self-hosted typeface designed for the script.** The brand book names Cairo (open-licence) as the companion for Arabic headings and body, paired with Saira and Open Sans on the Latin side. For Indian languages such as Hindi, and for Chinese, a suitable **Noto family** is chosen with the requesting office (Noto is an open-licence family that covers Devanagari, other Indian scripts and Chinese characters). All fonts are served from our domain, not Google Fonts (which did not load from China). See 9.5.
3. **Numbers left-to-right, Western digits everywhere**, matching SFDA, GOEIC body text and every competitor; certificate numbers, phone numbers and product codes isolated so they do not flip inside right-to-left sentences. Indian-language and Chinese pages use Western digits too, so certificate numbers look the same in every version.
4. **Mirror only direction-bearing icons** on right-to-left pages (arrows, next and back); logos, clocks and phone icons stay. Left-to-right languages need no mirroring.
5. **One URL per language** (`/en/…`, `/ar/…`, `/hi/…`, `/zh/…`, `/pt/…`), reciprocal hreflang tags (the tags that tell Google which page is the translation of which) listing every language including the page's own, plus `x-default`; a visible switcher, no redirect by visitor location [https://developers.google.com/search/docs/specialty/international/localized-versions]. The India blueprint rightly calls for hreflang; in the revised version we would link each page only to its own translations rather than to other countries' pages, which is what Google expects. (A small adjustment to the blueprint's example, which I will raise with the India office directly.)
6. **Everything that frames the page is translated:** navigation, footer, cookie banner, form labels, error and confirmation messages, auto-reply emails. Partial translation here is where competitors look broken.
7. **Native review in the requesting office**, with the scheme and regulatory terms confirmed by the offices that use them before any page is written. For Arabic that means Modern Standard Arabic reviewed in Amman, Cairo or Baghdad; for Indian languages such as Hindi, the India office's reviewer; for Simplified Chinese, Guangzhou's reviewer; for Portuguese, the Brazil office's reviewer.

**Action for Baghdad and Cairo (Q-18):** if your offices request Arabic, then before any Arabic page is written, please send me the Arabic terms your clients and the regulator actually use for CoC, CoI, ICIGI, destination inspection and conformity certificate (for example شهادة المطابقة). One email is enough; it stops us publishing the wrong word on every page. The same request goes to any office that requests a language: send the terms your clients and regulator use.

### 9.2 Cost and workflow, per requested language

Dubai agency rates for English to Arabic are **AED 0.30 to 0.40 per word** [https://lingo.ae/how-much-does-a-translation-agency-charge/]; rates for Indian languages, Chinese and Portuguese are in a similar band and will be confirmed by quote when an office requests the language. About **20,000 words** (40 to 60 pages) is **AED 6,000 to 8,000** for translation per language, before review cycles, plus 15 to 30 percent a year to keep current. Workflow as in 5.4: English source, machine draft, professional review, native sign-off in the requesting office, publish.

### 9.3 Which pages an office translates first when it requests a language

Mirrors 01, section 5.12; the content proposal is the master. The list is the same for every language. When an office requests a language and names a reviewer, these pages are translated first, then the rest of the site follows page by page as the office's reviewer has capacity.

| Translated first, in any requested language | Then, as capacity allows |
|---|---|
| Verify a certificate (page and result) | Program guides and document checklists for exporters and importers |
| Office contacts for the requesting office | Product-scope lists and request forms |
| Complaints and appeals; Impartiality; Privacy | Commodities and GAFTA pages |
| About and the Accreditations table | Training and testing catalogues; news |
| The program pages the requesting office runs | Remaining service and industry pages |

Whatever the page, the frame (home, navigation, footer, forms, consent banner, auto-reply emails) is translated in full before the first page in a new language goes live.

### 9.4 Languages not requested

Any language no office has requested stays English, as at Bureau Veritas, SGS and Intertek for most of their markets. Nothing is lost by waiting: the locale is switched on in a day when a request and a reviewer arrive. Chinese has one extra technical dependency, the reachability questions for Guangzhou in section 10, which concern whether the site loads inside China and not which language it is in.

Which languages are requested is decision Q-11 in the log (office managers, with the CEO), stated in the content proposal; it is not restated here. **Decision needed (Q-17, each office manager that requests a language):** name the reviewer in your office who writes that language formally and well, and confirm the hours they can give.

### 9.5 Brand assets on the web

The TIC Brand Guidelines 2026 (Edition 1, October 2026; section 19 covers the website) and the brand kit that goes with them settle the following, so the build simply implements them:

- **Fonts.** Saira (headings) and Open Sans (body) are open-licence fonts and are self-hosted from our own domain with `font-display: swap`. Cairo, the brand book's Arabic companion, is added only when an office requests Arabic; a Noto family chosen with the requesting office is added in the same way for Indian languages such as Hindi, and for Chinese. None is loaded from Google Fonts, which is blocked in mainland China (section 10).
- **Colours.** CSS colour tokens come from the brand kit file `tic-colours.css` (TIC Red #EE3124, TIC Black, Steel, Charcoal, Ink, Body Grey, Hairline, Light Grey); no colour is hard-coded in templates.
- **Logo.** SVG from the kit, never redrawn: the horizontal lockup with the words "TIC QUALITY CONTROL", 48 px high on desktop; the Mark only on mobile. Favicon: the Mark at 32 px and the i-dot alone at 16 px.
- **Navigation and buttons.** Nav in Saira SemiBold capitals, 14 px. Buttons TIC Red with white Saira capitals, square corners.
- **Type sizes.** Body Open Sans 17 to 18 px with line height 1.6; web headings H1 48 px, H2 32 px, H3 22 px, in Saira capitals.
- **Footer.** A dark band (TIC Black or Charcoal) with the tile pattern at low opacity, with the tagline band (TESTING | INSPECTION | CERTIFICATION, supplied artwork, never rebuilt) as the last element on every page.
- **Devices.** Red diamond bullets, red triangle step markers, square corners, no shadows, no gradients other than the supplied tagline band.

Two open items from the brand kit notes: the accreditation marks (ANAB, EIAC, EGAC, TIC Council, ISO) still need vector versions before they can go on the site at the required quality, which ties into 13.3 and Q-07; and the kit excludes LOX, which would need its own kit if LOX material is ever shown on this site.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 10. China reachability

### 10.1 What we tested

On 21 October 2026 I ran each host through a five-location mainland test (Beijing, Shenzhen, Inner Mongolia, Heilongjiang, Yunnan), cross-checked against GreatFire's published measurements.

| Loaded from all five points | Did not load |
|---|---|
| ticqc.ae itself | Google Fonts (fonts.googleapis.com, fonts.gstatic.com) |
| cdnjs.cloudflare.com | Google Tag Manager, Google Analytics, Google Maps |
| cdn.jsdelivr.net | reCAPTCHA |
| unpkg.com | YouTube |
| hCaptcha | LinkedIn (site and widgets) |
| challenges.cloudflare.com (Turnstile) | wa.me (WhatsApp links)* |
| | vercel.app, vercel.com, pages.dev |
| | AWS me-central-1 storage endpoint; Azure UAE North management endpoint |

*wa.me: blocked from Beijing on the five-point test (the other four points gave no result); GreatFire records it as 100 percent blocked (test of 9 October 2026).

Two caveats: GreatFire's tests disagree on Google Fonts and Tag Manager ("not blocked" in mid-October 2026), so treat those as unreliable rather than dead; and Cloudflare states Turnstile and Pages are not available in the mainland even though Turnstile's host resolved, so hCaptcha is the safer choice. [https://developers.cloudflare.com/china-network/faq/; https://en.greatfire.org/https/fonts.googleapis.com]

### 10.2 Rules that follow

1. Self-host all fonts and scripts, or load from cdnjs or jsDelivr.
2. No Google Tag Manager, Analytics, Maps or reCAPTCHA on exporter-facing pages; a static map image or an Amap/Baidu embed on the Guangzhou page; hCaptcha or server-side spam checks.
3. No YouTube embeds (link out); no LinkedIn widgets (a plain link is fine).
4. The Guangzhou page shows WeChat and a China phone number, not wa.me.
5. Never deploy production on vercel.app or pages.dev default domains. A custom domain on either was not tested, so whatever edge we pick is tested from the mainland **with the real production hostname**, on China Mobile, China Telecom and China Unicom, ideally by a colleague in Guangzhou.
6. Our current site behind Cloudflare loaded from all five points, so a Cloudflare global edge with the origin in Dubai, Hong Kong or Singapore is a reasonable start.

### 10.3 ICP filing and a .cn site

An ICP filing (a Chinese ministry registration number shown in the footer) is required **only for websites whose domain resolves to servers inside the mainland** or that use a mainland CDN; a site served from Hong Kong, Singapore or Dubai needs none [https://www.alibabacloud.com/product/icp-filing]. Every major with a Chinese site (Bureau Veritas, SGS, TÜV SÜD, Intertek, Cotecna) runs a separate `.cn` domain with ICP and public-security numbers in the footer; most use Baidu analytics instead of Google, several publish a 400 hotline, Bureau Veritas and Intertek show a WeChat official account, and most are hosted inside the mainland.

**Working assumption (Darya):** phase one is one global site hosted outside the mainland, built to the rules above, with WeChat and a China phone line on the Guangzhou page. A `.cn` site with ICP filing and mainland hosting is deferred until Guangzhou confirms whether it is a registered mainland entity with a business licence (needed to hold the filing) and how much demand comes from Chinese exporters.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 11. Hosting, security, performance, accessibility and privacy

### 11.1 Hosting

Whichever mode we choose, hosting must include a content delivery network (copies of the site near visitors), a web application firewall, denial-of-service protection, daily off-server backups, a staging copy, and automatic certificate renewal. Cloudflare in front of the origin supplies the CDN, firewall and denial-of-service layer; a managed Django host (for example Divio, which is run by Wagtail's own ecosystem partners, or Render) bundles backups and staging; on raw cloud it is set up and costed, roughly one to two days of engineering plus monitoring.

| Option | Hosting pattern |
|---|---|
| A. Wagtail, conventional | One container on AWS me-central-1 or Azure UAE North (both Dubai, three availability zones), or a managed Django host, behind Cloudflare |
| B. Wagtail, headless | Wagtail as in A; the front end on Cloudflare Workers, Azure Static Web Apps or similar, tested from China with the production hostname |

The Dubai regions failed the mainland test only at their raw endpoints; visitors never reach the origin directly because Cloudflare serves the site, which is how ticqc.ae loads from China today. The production hostname is still tested from the mainland before launch (10.2, point 5).

### 11.2 Hosting region and privacy law

Neither the UAE PDPL (Federal Decree-Law 45 of 2021, in force 2 January 2022) nor the Saudi PDPL mandates in-country hosting for a corporate marketing site; the UAE law regulates cross-border transfer and requires consent and security measures [https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws]. What needs checking is whether the **Iraq, Egypt, Botswana, Libya or SFDA program contracts** carry data-residency clauses, and whether a future client area storing inspection data changes the picture. Questionnaire 02, B2.8, asks the Government & Trade Programs director this; Legal should see the answer.

**Decision needed (Q-15, CEO, IT and Legal, after the Government & Trade Programs director answers 02 B2.8):** hosting region (UAE region, or any region behind a global CDN).

### 11.3 Security baseline

Admin login behind single sign-on or two-factor authentication, on a non-guessable path, with rate limiting. No public user listing; no public API beyond what the site needs. Automatic platform security updates and a monthly patch window for everything else. Secrets in a vault, never in code or shared documents. A quarterly external vulnerability scan written into the maintenance contract.

### 11.4 Performance targets

Google's Core Web Vitals "good" thresholds at the 75th percentile of real page loads, mobile and desktop: **LCP 2.5 seconds, INP 200 milliseconds, CLS 0.1** [https://web.dev/articles/vitals]. Kiwa is the only benchmark site whose real visitors pass (LCP 1.1 seconds); SGS, Intertek, Cotecna, HQTS and QIMA fail. Design rules that get us there: one static hero sized to display in WebP, self-hosted fonts with `font-display: swap`, lazy-loaded images below the fold, no carousels or animated counters, JavaScript kept small. Because ticqc.ae has no field data today, Search Console's Core Web Vitals report will stay empty for a while after launch; lab tests remain the measure until traffic grows.

### 11.5 Accessibility target

**WCAG 2.2 Level AA** (W3C, October 2023). The 2.2 additions that affect us: focus not obscured, no drag-only actions, 24-pixel minimum target size, consistent help placement, no redundant data entry, accessible login [https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/]. In practice: contrast checked in the design system before any page is built, visible focus outlines, skip links, alt text required on upload, labelled forms, and an audit at launch written into the contract.

### 11.6 Cookie consent and privacy policy

The site has no privacy policy, terms or copyright line today, and the current cookie banner is a generic template whose text and categories have not been configured. The rebuild needs an opt-in banner for non-essential cookies satisfying GDPR, UAE PDPL and Saudi PDPL (follow the stricter GDPR pattern, since UAE cookie rules are not yet spelled out in executive regulations), in English and in every language an office has requested.

| Tool | Price (2026, third-party) | Fit |
|---|---|---|
| Cookiebot | Free up to 50 sub-pages; Premium USD 8 to 56 a month | Proportionate for us; used by TÜV Rheinland |
| OneTrust | No public price; about USD 10,000 a year floor, multi-year contracts | Enterprise scale; used by TÜV SÜD; overkill unless group policy requires it |
| Open-source banner (Klaro, Cookie Consent) | Free | Configured and maintained by us |

A privacy policy, terms, a processor list (CRM, chat, analytics vendors) and a transfer basis for any non-UAE service are required pages. Legal review is needed (to be confirmed who provides it; questionnaire 02, B7.4, asks).

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 12. Analytics and measurement

**Tools.** GA4 is free, but Google Analytics did not load from China and its data leaves the region. A privacy-friendly tool (Plausible, Matomo or similar, self-hosted or EU-hosted) avoids both and needs a lighter consent banner. **Working assumption (Darya):** a privacy-friendly tool as primary, GA4 kept only if marketing needs it for advertising (to be confirmed with whoever runs LinkedIn and any paid campaigns). Also: Search Console on ticqc.ae and ticqc.com with all variants verified before launch; Baidu Webmaster Tools only if a Chinese site exists (registration reportedly needs a Chinese mobile number); uptime and error monitoring with alerts.

**KPIs for a B2B site.** Visitor counts are not the measure.

| KPI | Source | Why |
|---|---|---|
| Enquiries per month by office and program | CRM | Which pages and offices the site works for |
| How long enquiries wait for a first reply, by office | CRM | Shows where an office needs cover or a form routes wrongly; a tool for the office, not a league table |
| Verification lookups per month, and failed lookups | Tool log | Adoption by banks, brokers and customs; failures flag fraud or data gaps |
| Program pages past review-by date | Admin report | Freshness |
| Core Web Vitals pass rate; accessibility audit failures | Lab tests, quarterly scan | Standing targets |
| Translated pages behind the English source, per language | Translation report | Stops any language version drifting from the English |

Before anything changes, we export **12 months of GA4 and Search Console data** so there is a baseline and no later dispute about "lost traffic".

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 13. Migration and domain

### 13.1 Domain

**Working assumption (Darya):** we keep **ticqc.ae**. All search equity sits on it (an archive history going back to September 2021 and regular crawls since 2024); ticqc.com's earlier life as an unrelated Arabic games site means its history is not an asset; and Google treats a country-code domain as a strong signal for that country, which suits a UAE-led business. The same signal works against us outside the UAE: Google says a country-code domain can target only one country, and better rankings there come at the expense of other markets. That is the case for ticqc.com and why this is a decision, not a foregone conclusion. The India blueprint names both domains but uses ticqc.com in every example URL; the case for moving is a global brand with per-country pages, and Google warns that a domain move brings temporary ranking fluctuation that for a medium site "can take a few weeks or more" [https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes; https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites]. Either way the losing domain redirects permanently to the winner for years, and both are verified in Search Console before launch. One more consideration: the TIC Brand Guidelines 2026 print www.ticqc.com and info@ticqc.com as the official addresses on the letterhead, the email signature and the back cover, so the decision also affects stationery, email signatures and the brand book, whichever way it goes.

**Decision needed (Q-01, CEO):** ticqc.ae or ticqc.com as the primary domain.

### 13.2 Redirect map

Every one of the **83 sitemap URLs** (49 pages, 34 posts), the four author and four category archives, and every uploaded file linked from the Iraq, Egypt, Halal and CSUAS pages and the footer policies gets a server-side permanent redirect. Google says keep redirects "generally at least 1 year"; we keep them for the life of the site. No chains. Two post URLs contain encoded emoji and bold Unicode letters; they are mapped like any other.

### 13.3 Content migration

Exporting from the current platform is low-risk (its export file and its data interface give structured pages, posts and media). The hard part is editorial: page-builder HTML must be re-cut into the template fields of 5.2. That is content work by the content owners with my help, and the step most likely to slip; the content proposal's per-office inventory feeds it. To carry over: program workflows, document lists, product scopes and FAQs (Iraq 23, Egypt 8, Botswana 8, CSUAS 8, Gujarat 10); the Libya fee rule and Egypt turnaround times; the 14 addresses in 12 countries after correction; accreditation marks re-supplied as vector files with certificate numbers (the brand kit lists these as an open item, so Marketing & Design and the Quality/Accreditation Manager source them together); the GTM container if kept; author accounts; the LinkedIn link without its admin-view parameter.

### 13.4 Launch checklist (abridged)

1. GA4 and Search Console exports stored.
2. Redirect map tested against every old URL, including uploads.
3. Staging tested from mainland China with the production hostname.
4. Native review pass on every page in each requested language, including banner, forms and emails.
5. Lighthouse and accessibility audit on the most-visited templates.
6. SPF, DKIM and DMARC verified; a test enquiry from each routed country lands with the right office.
7. Verification tool tested with real, invalid and rapidly repeated numbers.
8. Privacy policy, terms, banner and copyright line live in English and in every requested language.
9. Both domains verified; new sitemap submitted; change-of-address only if the domain changes.
10. Thirty to ninety days of post-launch monitoring treated as part of the project.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 14. Costs and timeline

### 14.1 Sources

All figures are published agency guides or vendor list prices, not quotes. UAE guides put a standard corporate site at AED 15,000 to 55,000, a group site with subsidiaries at AED 70,000 to 180,000 (maintenance AED 2,500 to 6,000 a month), and a trilingual Arabic/English/French corporate site at **AED 90,000 to 250,000** with a 15 to 25 percent premium for right-to-left and **AED 20,000 to 55,000 a year** for multilingual updates [https://kolonell.com/en/blog/arabic-rtl-corporate-website-cost-dubai-2026; https://kolonell.com/en/blog/corporate-group-website-cost-dubai-2026]. A London agency's corporate site runs GBP 60,000 to 80,000, regional UK agencies 30 to 50 percent lower [https://profiletree.com/uk-website-design-costs/]. Indian agencies quote USD 2,500 to 8,000 for a corporate site with a content system, which for our scope multiplies by three to five [https://ecarter.co/blogs/development/website-development-cost-2026]. Our scope (100 to 400 pages, English plus the languages offices request, 14 locations in 12 countries, verification tool, CRM and messaging, migration) sits in the group-multilingual band.

Paid add-ons, packages and images are allowed where they replace work or risk; each is listed with its price before purchase.

### 14.2 Build

| Supplier type | Build range | Note |
|---|---|---|
| UAE agency | AED 90,000 to 250,000 (USD 25,000 to 68,000) | Reference band for this document |
| UK or EU agency | GBP 40,000 to 80,000 (USD 50,000 to 100,000) | Only if a specialist is wanted |
| Indian agency | USD 15,000 to 35,000 | For comparable scope |
| In-house lead plus contracted designer and front-end developer | Between the Indian and UAE bands in cash | Schedule risk if the lead is part-time |

### 14.3 Yearly running costs

| Line | Per year | Note |
|---|---|---|
| Hosting | USD 600 to 6,000 | Cloud or managed Django host with CDN; Option B adds USD 0 to 1,200 for front-end hosting |
| Platform licence | USD 0 | Wagtail is open source in either mode; nothing to license |
| CRM, about ten seats | USD 2,000 to 12,000 | Zoho low end, HubSpot Professional high end; nil if a group system exists |
| Messaging and chat | USD 0 to 5,000 | Free links up to a shared inbox |
| Consent tool; translation tooling | USD 0 to 700; USD 0 to 2,000 | |
| Agency maintenance retainer, optional | AED 30,000 to 72,000 (USD 8,000 to 20,000) | Optional; needed only if in-house hours are not available |
| Content and translation, per requested language | AED 20,000 to 55,000 | The largest recurring line and the most often under-budgeted; scales with the number of languages offices request |
| Photography and imagery (mostly year one) | Licensed stock USD 500 to 1,500, or AED 10,000 to 25,000 for one day of photography per two or three key offices (my estimate; to be confirmed by quotes) | Lean: stock only; Recommended: stock plus photography of two or three offices; Full: photography of all key offices |

### 14.4 Three budget scenarios

**Working assumption (Darya):** these split the researched ranges into bands. They are planning figures, replaced by real quotes from two or three suppliers after the content proposal is approved. Phases follow the content proposal (01, section 11) and the log's A-03, and the whole plan fits inside two months from approval: Phase 1 is the core English site, technically ready for any language; Phase 2, in weeks six to eight, is the office pages, the languages offices have requested with their named reviewers, the training catalogue and regulatory updates; Phase 3, after launch as offices commit content, is the client area, further requested languages and deeper product pages.

| | Lean | Recommended | Full |
|---|---|---|---|
| Phase 1 scope | Core site in English, ready for any language; verification by CSV upload; free WhatsApp links; Cookiebot; licensed stock images | Core site in English, ready for any language; verification with nightly sync; CRM routing; shared WhatsApp inbox for two or three offices; WeChat account; privacy-friendly analytics and consent; photography of two or three offices | Recommended, plus external accessibility audit, WhatsApp Business Platform for all staffed offices, photography of all key offices |
| Phase 2 scope | Office pages; requested languages as budget allows, page by page | Office pages; requested languages with their named reviewers; training catalogue; regulatory updates feed | Same as Recommended |
| Phase 3 scope | Not budgeted | Scoped after Phase 2 | Further requested languages, deeper product pages and client area phase one budgeted now |
| Build (UAE agency band) | AED 90,000 to 130,000 | AED 130,000 to 190,000 | AED 190,000 to 250,000 |
| Running cost, year one | AED 60,000 to 90,000 | AED 90,000 to 130,000 | AED 130,000 to 180,000 |
| Timeline to Phase 1 launch | 5 to 6 weeks | About 6 weeks | 7 to 8 weeks |
| Platform fit | Wagtail, conventional | Wagtail, conventional | Wagtail, conventional or headless |

### 14.5 Timeline

| Phase | Duration | What moves it |
|---|---|---|
| Discovery (this round, questionnaire, office inventories) | 1 week | Reply speed from offices |
| Design (templates, block library) | 1 to 2 weeks | Number of approval rounds |
| Build (platform, templates, verification tool, forms, messaging) | 3 weeks | Certificate data source; CRM choice |
| Content migration (parallel with build) | 3 weeks, alongside the build | Content from offices |
| QA and Phase 1 launch | Week 6 | China test results; accessibility fixes |
| **Phase 1 total** | **About six weeks from approved brief** | Content arriving late from offices is the main risk; delayed approvals the next |
| Phase 2: office pages, any languages offices requested, training catalogue, regulatory updates | Weeks 6 to 8, within the two months | Reviewer capacity in the offices that requested a language; office inventories |
| Phase 3: client area, deeper product pages, further requested languages | After launch, as offices commit content | Certificate data flow proven; Guangzhou's answers in section 10 |

**Decision needed (Q-03, CEO and Finance):** the budget band (lean, recommended or full). The band decides scope, not quality.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 15. Risks and how we reduce them

| Risk | If it lands | How we reduce it |
|---|---|---|
| Content not delivered by offices | Empty templates; launch slips; the new site has the old gaps | Named owner and deputy per office with hours committed before design; per-office inventory with "please attach" fields; launch with the pages that are ready, placeholders hidden |
| Accreditation and approval claims | A buyer, bank or regulator runs the same register searches we did and finds a mismatch | The accreditation page is a table where every row needs body, number, entity, status, valid-until and a register link. Logos without both a number and a link do not go on the new site. The request to our Quality/Accreditation Manager is in section 16 (Q-07) |
| Third-party component security | The site is compromised through an unpatched component | Wagtail has workflow and permissions built in, so no add-on marketplace is needed; a short, reviewed list of Python packages pinned to known versions; automatic security updates; monthly patch window; quarterly scan; edge firewall |
| Losing search rankings in migration | Enquiries drop after launch | Full redirect map of all 83 URLs and uploads; 12-month data export first; both domains verified; keep ticqc.ae; monitor 90 days |
| Translation quality in any requested language | Mixed-language footers, flipped numbers on right-to-left pages, wrong characters or fonts, untranslated banners | A language is switched on only when the requesting office has named a reviewer; terminology from the offices that use it; QA pass on every translated page before publish; translation report shows pages behind |
| Headless mode chosen too early | Two codebases to maintain for a benefit not yet needed | Build Option A; move to B only when a client area or app actually needs a separate front end, which Wagtail's API allows without migration |
| China blocking | Chinese exporters see a half-loaded site and a form that fails | Section 10 rules; staging tested from the mainland with the production hostname on three carriers; WeChat on the Guangzhou page |
| Single-person dependency on me | If I am unavailable, nobody can change the site | A named deputy Global Admin; written setup documentation; a supplier on retainer who knows the codebase even under in-house ownership; platform chosen partly for its agency pool |
| Certificate data source unresolved | The tool is built with nothing to read | Resolve 6.4 before build; fall back to CSV upload rather than delay launch |
| Scope growth | Everything proposed so far lands in Phase 1: the India blueprint's deep structure of 1,000-word pages (potentially several hundred, by my September guide's estimate), its video hub, and the client area suggested in my guide and seen on competitor sites | Phase it as in 14.4: core English site and verification first; office pages, requested languages and training pages second; client area, further languages and deep product pages third, written gradually by the offices that sell them |

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 16. Decisions needed, and who takes them

IDs are those of the decision log in document 00, section C.2, so one reference works everywhere. Q-18 (scheme terms in a requested language) is raised in section 9.1 of this document.

| Log ID | Decision | Who answers | Options | Working assumption (Darya) | When |
|---|---|---|---|---|---|
| Q-09 | Confirm Wagtail, conventional or headless mode | CEO and IT | A (conventional) or B (headless) (section 4) | A; B only when a client area or app needs a separate front end | After content approval and the in-house hours conversation |
| Q-10 | Agency, in-house or hybrid | CEO | One accountable supplier; in-house ownership; agency builds, we maintain | Hybrid, if my hours allow | With Q-09 |
| Q-03 | Budget band | CEO and Finance | Lean, recommended, full (14.4) | Recommended | Before supplier quotes |
| Q-01 | Primary domain | CEO | ticqc.ae or ticqc.com | ticqc.ae | Before design |
| Q-15 | Hosting region | CEO, IT and Legal, after the Government & Trade Programs director answers 02 B2.8 | UAE region behind a global CDN, or any region | UAE if program contracts require it; otherwise any, behind Cloudflare | After contracts are checked |
| Q-16 | CRM | CEO, Finance and IT | An existing group system; otherwise Zoho or HubSpot | Zoho, unless the group already runs something | Before build |
| Q-06 | WhatsApp staffing and enquiry routing | Each office manager | Which offices, hours, reply time; which countries come to you | Dubai, Baghdad, Cairo, Riyadh first; WeChat for Guangzhou; one working day reply | Before office pages are written |
| Q-08 | Certificate data source | Quality/Accreditation Manager, with IT | CSV, nightly sync or live API, from which system (02 B3.7) | Nightly sync if records live in one system; CSV if not | Before build |
| Q-04 | Named owner and deputy per office, with hours | Each office manager | Names and hours per month (02 Part C) | Two to four hours a month; more for program offices | Before design |
| Q-11 | Which languages, if any, offices request, each with a named reviewer | Each office manager, with the CEO | English is required; any other language (Arabic, Indian languages such as Hindi, Chinese, Portuguese, or another) on request | English only until an office requests a language and names a reviewer; Brazil has requested Portuguese | Before Phase 2 scope is fixed |
| Q-17 | Reviewer for each requested language | The office manager that requests the language | Name the person in your office who writes the language formally and well | To be named by the requesting office; no language is switched on without one | Before translation |
| Q-18 | Scheme terms in a requested language | The offices that use the language with their regulator (for Arabic, Baghdad and Cairo) | One email with the terms you and the regulator use (section 9.1) | None; I will not guess them | Before any page in that language is written |
| Q-07 | Accreditation numbers | Quality/Accreditation Manager | For every logo we display today: the certificate number and the register link, or the instruction to remove it (02 B3.1) | Logos without both come off the new site | By [deadline to be set by Darya], the reply deadline in the cover email (target 12 November 2026) |
| Q-14 | Certificate numbering and QR code | Quality/Accreditation Manager, with Operations | Does every certificate carry a unique number, and can the template carry a QR code? | Yes to both (to be confirmed) | Before build |
| D-04 | Interim fixes on the current site (2.6) | Darya, with the current host | Supported server runtime; hide user listing; login rate limit; link, title, typo and banner fixes | Yes, now, outside the project budget | Now |

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## 17. What this document does not decide, and why

- **The visual design.** Layout, page composition and the block library are a design brief written after the content proposal is approved. The TIC Brand Guidelines 2026 already fix colours, type, photography rules and the graphic devices (section 9.5), so the brief applies them rather than choosing them. Deciding layout now would lock in choices before we know which pages exist.
- **The vendor.** No agency has been contacted for a quote; all costs here are published guides. Quotes come from two or three suppliers once scope is approved, compared on the criteria in 4.4. An agency brief will be derived from sections 3, 5 and 6 after approval; this document itself is internal and is not sent to suppliers.
- **The exact component list.** The platform is Wagtail; which Python packages, hosting provider and front-end tooling (if headless mode is chosen, Q-09) sit around it depends on the supplier's stack. What this document fixes is the requirement list (section 3) and the admin specification (section 5), which any supplier must meet.
- **Which languages beyond English**, which is for the offices to request (Q-11), and **a separate .cn site** and **the client area**, for the reasons in sections 10 and 6.

The order is deliberate: content, then governance, then platform, then design, then build. I would rather we spend the first week agreeing what the site must do than six weeks building the wrong thing well.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

---

## Appendix A1. Products and list prices behind the options

For technical readers. All prices are vendor list prices read in October 2026; none is a quote.

| Option | Product | Role | List price |
|---|---|---|---|
| A and B | Wagtail, with Wagtail Localize | Content system, workflow, permissions, history, languages, API | BSD licence, free [https://wagtail.org/features/] |
| A and B | AWS me-central-1 or Azure UAE North | Hosting (Dubai) | Usage-based; roughly USD 600 to 6,000 a year for our size, behind Cloudflare |
| A and B | Managed Django host (Divio, Render or similar) | Alternative hosting with backups and staging bundled | Roughly USD 25 to 300 a month depending on tier; region to be confirmed per provider |
| A and B | Cloudflare | CDN, firewall, denial-of-service protection, DNS | Free to Pro USD 20 a month; already in front of ticqc.ae |
| B | Cloudflare Workers | Front-end hosting | From USD 5 a month; Pages is stated by Cloudflare to be unavailable in the mainland |
| B | Vercel | Front-end hosting | Pro USD 20 per seat a month; vercel.app default domains did not load from mainland China [https://vercel.com/pricing] |
| Both | Zoho CRM or HubSpot | CRM and lead routing | See section 7 |
| Both | Cookiebot, or an open-source banner | Consent tool | Free to USD 56 a month; see 11.6 |
| Both | Translation tooling (machine-draft service plus Wagtail Localize) | Translation workflow, per requested language | USD 0 to 2,000 a year |
| Both | WhatsApp Business Platform provider; WeChat Official Account | Messaging | See section 8 |
| Both | Amazon SES, Postmark, SendGrid or Mailjet | Transactional email | Low hundreds of USD a year at our volumes |

---

## Sources

Every figure here is sourced in the full research report (reports folder); the notes behind each section are listed there. Sources for platforms that are no longer under consideration (page-builder platforms and non-Python headless products) have been dropped from this document and remain only in the research report. The India office's September 2026 blueprint supplied the certificate verification idea, the image-weight rule, PDF offloading, dual sitemaps and breadcrumbs, all of which carry into this proposal.
