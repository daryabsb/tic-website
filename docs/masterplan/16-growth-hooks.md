<!-- TIC Website — Engineering Master Plan, part 16 of 16. -->

# 16 Growth hooks

Things V1 is built to take without a redesign, in the order the proposal expects them. Each is a content task, a configuration or a small app — never a new platform.

| Hook | What V1 leaves in place | What it takes later |
| --- | --- | --- |
| **Full Arabic site** (Phase 2) | The frame, the Arabic-first pages, the workflow, the reviewer role | Translating the remaining pages through the sheet; no code |
| **Chinese, Hindi, Portuguese** | Locale mechanism, font slots, digit and `<bdi>` rules | Switch on the locale, add the Noto family, translate the frame, name a reviewer (03 §9) |
| **New program (Saudi SABER, Kuwait, Kenya…)** | `ProgramPage` with twelve parts, feed, routing rows | A page and a routing row; "advisory support" label where no appointment exists (proposal D4) |
| **New office** | `add_office` command: group, collection, routing fallback | One command, one page, WhatsApp/WeChat entry |
| **Certificate feed** | `CertificateSource` interface, import log, QR scheme | A sync command against TIC's records system (option 2) or a live API adapter (option 3) — public page unchanged |
| **Masked client name on Verify** | `VERIFY_SHOW_CLIENT_MASKED` setting, fields present but empty | Legal, the Quality Manager and the Programs director agree (P-14); the import maps the column |
| **CRM** | Routing resolved before alerting; submissions carry country, service, office, code | A notify channel that posts the submission to Zoho/HubSpot (or the group ERP), routing table moved there (proposal Q-16) |
| **WhatsApp Business API, shared inbox** | wa.me per office with the code pre-filled | A provider channel in notify; the code links the two |
| **Client area** (Phase 3) | Django auth, `/login/` design, private storage, request codes, certificate records | A `portal` app: status by code, certificate downloads, invoices (needs the invoicing connection); reopens the hosting-region question (12) |
| **Headless front end** (proposal Option B) | Wagtail's API is part of the product | Only if a client area or app needs it; the same content, no migration |
| **`.cn` site with ICP filing** | China rules already met on the global site; WeChat on Guangzhou | Guangzhou's entity status and demand (03 §10.3) |
| **MCP server for TIC** | The core `mcp` app exists (Zeneonix) | Mount it with a token if head office wants Claude reading requests and drafting replies; not planned for TIC in V1 |
| **Content editor / proofreader** | The core's proofreader hook | Install `zeneon-proofreader` for Darya's own text passes, as on the Zeneonix site |
| **Training registration and payment** | `course_register` schema, course pages with price | Online payment only if the training owner asks; a provider in a later release |
| **Landing pages for events** | `LandingPage` with expiry | Content work |
