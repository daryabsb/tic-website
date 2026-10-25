<!-- TIC Website — Engineering Master Plan, part 07 of 16. -->

# 07 Forms, routing and messaging

Every service, program and office page ends with a form of five to seven fields; the contact page has the same form; complaints, applications and course registrations are the same machinery with another schema (03). All of it is the core `requests` app with TIC schemas, templates from the drop, and one new generic core piece: routing by answer values.

## The quote form

Fields: name, company, email, phone or WhatsApp, **country** (select, structured), **service group** (select, structured), destination country (programs), message, consent tick with the one-line privacy notice. Steps in HTMX where the page is a program (route questions first, then details); a single form elsewhere; plain POST always works. hCaptcha, honeypot and minimum fill time from the core (D8). Uploads (complaints, applications) go to `private/` and are served only by signed links, as Zeneonix D25.

## Routing (core `requests.routing`, data in `RoutingRule`)

| Match | Recipient |
| --- | --- |
| country = Iraq | Baghdad |
| country = Egypt | Cairo |
| country = China | Guangzhou |
| country = Jordan | Amman; Saudi Arabia → Riyadh; India → Noida; Pakistan → Lahore; Sri Lanka → Maharagama; Thailand → Bangkok; Malaysia → Kuala Lumpur; Brazil → São Paulo; UAE → Dubai |
| service group = training | head office (training owner) |
| anything else | Dubai (head office) |

Rules are rows in the admin with a priority; office managers change them without a developer (P-7 collects the real table). The resolved office is stored on the submission; the office's `contact_recipient_email` and hours are read from its `OfficePage`.

## What the visitor experiences (03 §7)

1. Sent screen names the receiving office and its staffed hours, shows the code (`TIC-2026-0041`) and a WhatsApp link to that office with the code pre-filled.
2. Auto-reply email in the request's language with the code and the office's phone and WhatsApp (branded HTML as in Zeneonix D36, plain-text part kept).
3. Office alert email within a minute with every answer, the files as signed links, the admin link. A deputy address per office may be added.
4. Reply promise: "a named person within one working day" from `SiteSettings`; an office may publish a faster promise on its own page.

Waiting time is recorded: `first_response_at` on the submission (set when status leaves `new`), shown per office in the Requests admin so a manager can see where cover is needed (a tool for the office, not a league table).

## Email

Resend through django-anymail, sending domain decided with P-1 (`ticqc.com` or `ticqc.ae`), SPF, DKIM and DMARC set before the first alert. Senders: `no-reply@`, reply-to = the office's own mailbox. Review-by reminders (09) and import reports (06) use the same channel. Office mailboxes stay where TIC's mail already is; the site only sends.

## Messaging

- **WhatsApp:** a wa.me button on every page in the CTA band, the number of the office the page belongs to (head office elsewhere), staffed hours beside it. Phase 1 lines: Dubai, Baghdad, Cairo, Riyadh (P-7). No Business API in V1.
- **WeChat:** the Guangzhou office page shows a WeChat ID and QR image and a China phone number; wa.me is never rendered on that page (template rule, tested).
- **Phone:** a real local number on every office page; on phones the header carries the current office's number where a page belongs to one.
- **No live chat, no chatbot** in V1 (proposal D15).
- Numbers without `+` get the office's country code in links (core `default_country_code` per office, not one site-wide value).
