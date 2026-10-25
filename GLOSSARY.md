# Glossary

Terms of the TIC Quality Control website. Implementation lives elsewhere; the content proposal (`docs/proposal/01-…`) is the master for what each page says.

## Core
The reusable Wagtail package `zeneon-cms` that every Zeneon client site installs. Anything not specific to one client belongs there (rule 6). This repo is a client site; Zeneonix and MLP are others.

## TIC
TIC Quality Control L.L.C., Dubai: a testing, inspection and certification company with fourteen addresses in twelve countries. Written "TIC Quality Control" on first use, then "TIC"; never "TICQC". The group also holds Seacorr (NDT and technical inspection) and LOX (partner in the Iraq program).

## Service
One thing TIC sells, in one of seven groups: Inspection, Testing, Certification, Government & Trade Programs, Audits, Training, Sustainability. A `ServicePage` under a `ServiceGroupPage`; adding one is content work, not a deploy. Every service page has the eleven parts of proposal 01 §6.

## Industry
One of eight sectors (Agriculture & Food, Oil & Gas, Marine, Consumer Products, Vehicles, Industrial Equipment, Construction, Government). A second door into the same service pages. An `IndustryPage`.

## Program
A government inspection program TIC is appointed or registered for: Iraq CoC (COSQC/ICIGI), Kurdistan Region vehicle CoC, Egypt CoI (GOEIC), Botswana CoC (BOBS), Libya CoI (CBL). A `ProgramPage` with the twelve parts of proposal 01 §5.5 and a **review-by date**. SFDA is "designation in progress", not a program, until TIC appears on the SFDA list.

## CoC / CoI
Certificate of Conformity / Certificate of Inspection: the document an importing country requires before customs clearance. The regulator's own word is used on each program page ("registered" for GOEIC, "appointed" for COSQC and BOBS); never "accredited" unless an accreditation body says so.

## Regulator
The authority that runs a program: COSQC (Iraq), GOEIC (Egypt), BOBS (Botswana), the Central Bank of Libya, SFDA (Saudi Arabia). Each program page names its regulator and shows the appointment document.

## Regulatory update
A dated notice of a change in a program (new product list, route, fee, document), signed by the owning office. Listed on the program page and in the site-wide feed.

## Office
One of TIC's fourteen staffed addresses. An `OfficePage` with legal entity, address, local phone, WhatsApp or WeChat, staffed hours and time zone, services and programs sold, named people. Every office has an **owner** and a **deputy** editor.

## Routing
The rule that sends a quote request to one office by destination country and service (Iraq → Baghdad, Egypt → Cairo, China → Guangzhou, anything else → Dubai). Data in the admin, not code.

## Request
One sent quote, complaint, appeal or job application: a typed record with a code, stored before any alert is sent. Built on the core `requests` app. Also "enquiry".

## Code
The human-readable number of a request, such as `TIC-2026-0041`, shown on the sent screen and quoted on WhatsApp.

## Certificate record
One row the verification tool answers from: number, type, status (valid, expired, superseded, suspended, withdrawn), issue and expiry dates, issuing office. Never a client name or a product line. Loaded by import or sync from TIC's records; never served as a file.

## Verify
The page that answers a certificate number or a scanned QR code with its record. Number-only; no browse, no search by company; rate-limited; every lookup logged.

## Accreditation
A mark TIC may show only with its number and a register link: ANAB ISO/IEC 17020 (AI-3314), GOEIC record 73, COSQC appointment, TIC Council membership, GAFTA approval. A row in the accreditations table with a "last checked" date and an owner.

## Review-by date
The date by which a program or policy page's owner re-confirms its content. The system mails owner and reviewer two weeks before and flags the page after.

## Frame
Everything on a page that is not the page's own content: header, footer, menus, forms, consent banner, error and confirmation messages, emails. The frame is translated in full before the first page in a new language goes live.

## Arabic-first pages
The pages translated first when Arabic is switched on: Verify, office contacts, Complaints and appeals, Impartiality, Privacy, About and the accreditations table, then the program pages the requesting office runs (proposal 03 §9.3).

## Shared part
A piece of the design every page imports: header, footer, page header (photo or band variant), contact band. In the drop they are `Header.dc.html`, `Footer.dc.html`, `PageHead.dc.html`, `CTABand.dc.html`; in Django they are `templates/includes/`.
