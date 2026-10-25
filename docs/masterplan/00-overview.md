<!-- TIC Website — Engineering Master Plan, part 00 of 16. -->

# 00 Overview and principles

We are building ticqc.com: the TIC Quality Control company site, an English-first, phone-first Wagtail site on the **zeneon-cms** core (the core behind the Zeneonix and MLP sites), whose job is to make a customs officer, a bank, an exporter or an importer trust TIC in the first minute and reach the right office in the second. It replaces a 2024 page-builder site that has no Arabic, no way to check a certificate, no page per office, and nine accreditation logos of which three can be checked.

The site is governance made visible: one template per page type, a locked block library, office-scoped editing with approval, review-by dates on program pages, and a rule that no mark is shown without its number and register link.

**What V1 is:** the public site in English (home, seven service groups and their service pages, eight industries, five program pages and the regulatory-updates feed, About and the trust pages, Resources, fourteen office pages, Contact), the certificate verification tool, the quote form routed by country to an office with email alerts and a reference code, the Wagtail admin with six roles and the approval workflow, the Arabic frame and the Arabic-first pages, the redirect map from the old site, and one more stack under the server-platform contract.

**What V1 is not:** no client area (Phase 3), no CRM (routing lives in the admin until one exists), no chat widget or chatbot, no WhatsApp Business API, no `.cn` site, no Chinese, Hindi or Portuguese pages until an office requests them, no headless front end.

**Principles that decide trade-offs:**

1. *The content proposal is the master.* Every page type carries exactly the parts proposal 01 lists (eleven for a service, twelve for a program). The templates refuse to publish without the required fields (03 §5.2). Nothing on the site is invented: a fact the proposal marks "to be confirmed" is a bracketed placeholder until a director supplies it.
2. *The core first.* zeneon-cms rule 6: anything not TIC-specific goes into the core — the hCaptcha provider, routing by country in `requests`, review-by dates. The client repo keeps TIC's page types, templates, theme, seed and config.
3. *Verifiable over decorative.* The proof strip, the accreditations table and the certificate tool are the product. A logo without a number does not ship.
4. *Two languages are one site.* English is the base; Arabic is a full version of every translated page, in Cairo, `dir="rtl"`, logical CSS, Western digits, isolated codes. The frame is translated before the first Arabic page goes live.
5. *Phone first, cheap phone first.* Pages are measured on a mid-range Android on 4G; Core Web Vitals "good" at the 75th percentile is the bar.
6. *Reachable from the mainland.* No Google Fonts, Tag Manager, Analytics, Maps, reCAPTCHA or YouTube embeds on exporter-facing pages; fonts and scripts self-hosted; hCaptcha; WeChat on the Guangzhou page.
7. *The platform contract.* Only `web` joins the shared `edge` network, no published ports, every service with restart, healthcheck and limits, backups through `bin/backup-stack`.
8. *Alerts never block a request.* A quote, complaint or application is stored first; email is sent after commit and retried by a timer, the way the core already does.
9. *Boring tools.* Everything the core provides is reused. The novelty budget is spent on Verify, routing and the program page. Engineering starts with a Wayfinder grilling session on this plan, and the plan is corrected before code.
