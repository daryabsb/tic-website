<!-- TIC Website — Engineering Master Plan, part 03 of 16. -->

# 03 Data model

Pages are Wagtail pages (translatable through wagtail-localize); shared facts are snippets; records that are not content (certificates, lookups, routing) are plain models. Every page type lists exactly the parts the proposal gives it; required fields are enforced in `clean()` so the admin refuses to publish without them (03 §5.2).

## Pages

| Page | Parent | Fields beyond title and body | Required to publish |
| --- | --- | --- | --- |
| `HomePage` | root | hero (photo, sentence, two buttons), proof strip (Accreditation snippets, max 4), services (6 cards), industries, programs (5), offices block, news (3), contact block | hero photo + sentence |
| `ServiceIndexPage` | Home | intro | — |
| `ServiceGroupPage` | ServiceIndex | group (choice: inspection, testing, certification, programs, audits, training, sustainability), intro, photo, "how it is done" list | group |
| `ServicePage` | ServiceGroup | the eleven parts as StreamField blocks with fixed order: what_it_is, who_needs_it, how_it_works (steps with typical days), documents (checklist), what_you_get (+ sample image), standards (name + number rows), where (Office M2M), related (Page M2M), qa (question/answer), contact (Person + schema key), reviewed (date + owning Office). `partner_lab` (Partner snippet) required when group = testing | all eleven; `partner_lab` for testing |
| `IndustryIndexPage` / `IndustryPage` | Home / IndustryIndex | summary, photo, services (Page M2M), programs (M2M), figures (max 3), where (Office M2M), insights | summary, services |
| `ProgramIndexPage` | Home | intro, feed settings | — |
| `ProgramPage` | ProgramIndex | see 05: regulator, appointment document + date, status word (appointed / registered / designation in progress), product table, routes (3 questions), steps, checklist, inspection and labelling, fees block, qa, updates (query), contacts (Office + Person rows), appeals link, review_by, reviewed, owning Office | all twelve + review_by |
| `OfficeIndexPage` / `OfficePage` | Home / OfficeIndex | city, country, legal_entity, address, map (lat/long, static image), phone, whatsapp, wechat_id, wechat_qr, email, mailbox_owner, hours, timezone, languages, services (M2M), programs (M2M), people (Person rows), photo, is_head_office | address, phone or email, hours, timezone |
| `AboutPage` | Home | story, timeline (year, title, text rows), figures, section links | story |
| `LeadershipPage` | About | CEO quote block, Person rows grouped | — |
| `GroupPage` | About | three company cards (name, legal, founded, does, accreditation, link), independence sentence | independence sentence |
| `AccreditationsPage` | About | intro, rule list, marks shown (Accreditation M2M) — the table itself is rendered from all Accreditation snippets with `is_public` | — |
| `ContentPage` | About | document code, version, effective date, owner (Person), pdf, sections — used for Impartiality, Subcontracting, Certificate and logo use, Privacy, Terms | code, version, effective date, owner |
| `ComplaintsPage` | About | the two definitions, four steps with days, schema key for the form | schema |
| `CareersPage` | About | openings (JobOpening rows: title, office, type, closing), "what we look for", schema key (CV upload) | — |
| `NewsIndexPage` | Home (Resources) | core `news` index; filters by kind, program, office | — |
| `NewsPage` (core) | NewsIndex | + `kind` (news / insight / regulatory_update), `program` FK, `office` FK, author (Person), updated date, standfirst, contents | author, date |
| `DownloadsPage` | Resources | renders Document snippets with filters | — |
| `TrainingIndexPage` / `CoursePage` | Resources | standard, level, duration, format, city, dates (rows), price + currency + tax note, certificate text + issuer, trainer, prerequisites, impartiality note (fixed text), register schema key | price, dates, certificate, issuer |
| `QAPage` | Resources | aggregates qa blocks from every page by owner | — |
| `ContactPage` | Home | intro, schema key, head-office channels, reply promise | — |
| `VerifyPage` | Home | intro, "what this page answers", fraud warning line | — |
| `LandingPage` | anywhere | expiry date (unpublishes itself) | expiry |

## Snippets (translatable where they carry text)

- `Accreditation` — body, standard_or_scheme, entity_and_sites, number, status, valid_until, register_url, certificate_file, last_checked, owner, is_public, symbol_image. The footer and the proof strip read `is_public` rows only.
- `Person` — name, title, office FK, photo, bio (2 sentences), agreed_to_be_named, email, whatsapp.
- `Partner` — partner laboratory or subcontractor: name, location, accreditation body + number, scope. Named on every testing page (03 §5.3 note 1).
- `Document` — title, type (form / product list / fee structure / policy / brochure / certificate), program or service FK, version, date, owner, languages, file. Superseded versions are deleted, not kept.
- `Figure` — label, value, source, owner (for the "Why TIC" bands; a figure without an owner does not render).

## Plain models

- `RoutingRule` (core, generic) — match on answer values: `country`, `service_group` → recipient (Office page), priority, active. Fallback = head office. Resolved in the `requests` submit hook.
- `Certificate` (verify) — number (unique, indexed, as printed), type (choice), status (valid / expired / superseded / suspended / withdrawn), issue_date, expiry_date, issuing_office FK, qr_token (random, unique), source (csv / sync / api), imported_at. Never a client or product field in V1 (D9; P-14).
- `Lookup` (verify) — number_hash, found, ip_hash, user_agent, locale, created_at. Kept 90 days.
- `ReviewReminder` (core) — page, review_by, reminded_at, flagged (03 §5.4).
- `Redirect` — Wagtail contrib; seeded from `seed/redirects.csv` (10).

## Request schemas (core `requests`, data in `seed/schemas.yaml`)

`quote` (name, company, email, phone/WhatsApp, country*, service group*, destination, message, consent), `complaint` (kind: complaint/appeal, name optional, contact, certificate number, what happened), `application` (name, email, phone, role/office, CV upload, note), `program_request` (quote + route questions from 05), `course_register` (course, name, company, email, phone, seats). Starred fields are structured for routing. Codes start `TIC`.
