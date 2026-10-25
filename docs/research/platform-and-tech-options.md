# Platform and technology options for the TIC Quality Control website rebuild

Research date: 2026-10-21. All prices USD unless stated; all "fetched" claims refer to pages retrieved on this date. Fingerprints of competitor sites were taken by downloading each homepage with curl and grepping headers and HTML; results are evidence of what the public HTML exposes, not vendor confirmation.

Scope reminder: approx 100-400 pages, English + Arabic (RTL) at minimum, ~13 offices contributing content, forms with routing, certificate-verification lookup, possible client portal, news/blog, downloads. Current site: WordPress. In-house web lead does not know WordPress; likely stronger in Python/Django and modern JS (unconfirmed, treated as a variable throughout).

---

## 1. What the current ticqc.ae site runs on

### Takeaway
ticqc.ae is WordPress 6.8 behind Cloudflare, served by PHP 7.4.33. The PHP version is the single most urgent technical fact: it is several years past end-of-life, regardless of what platform is chosen next.

### Cited Findings
- Response headers from https://ticqc.ae on 2026-10-21: `Server: cloudflare`, `X-Powered-By: PHP/7.4.33`, `Link: <https://ticqc.ae/wp-json/>; rel="https://api.w.org/"`; HTML contains `<meta name="generator" content="WordPress 6.8">` and 104 references to `wp-content` — own curl fetch of [ticqc.ae](https://ticqc.ae)
- The WordPress REST API (`/wp-json/`) is publicly exposed, which is the WordPress default — own curl fetch of [ticqc.ae](https://ticqc.ae)

### Inferences
- PHP 7.4 stopped receiving security fixes at the end of 2022 (PHP project's published support schedule; not re-fetched this session). Whatever the rebuild decision, the current host should be moved to a supported PHP version as an interim risk measure.
- Cloudflare is already in front of the site, so the DNS/CDN/WAF layer is partly in place and can be reused with any platform.

### Gaps
- Could not determine the hosting provider behind Cloudflare, the theme/page-builder in use, or the plugin inventory (requires admin access or a plugin-enumeration scan, which was out of scope).

---

## 2. What the global TIC majors run on (CMS fingerprints)

### Takeaway
The large TIC players run enterprise/mid-enterprise CMSs — Sitecore (SGS, TÜV SÜD), Optimizely/Episerver (Intertek, DNV, probably Kiwa), Drupal 11 (Bureau Veritas), Magnolia (Applus) — several with a Next.js/React front-end and an enterprise CDN/WAF (Akamai, Cloudflare, CloudFront, Imperva). None of the ten was found running WordPress; Cotecna runs an agency's proprietary engine and QIMA a custom Next.js build.

### Cited Findings
Own curl fetches, 2026-10-21 (headers + HTML grep):
- **Bureau Veritas** (group.bureauveritas.com): `X-Generator: Drupal 11 (https://www.drupal.org)`, Varnish + CloudFront CDN — [group.bureauveritas.com](https://group.bureauveritas.com)
- **SGS** (sgs.com): Akamai CDN (`Server-Timing: ak_p`), HTML contains `sitecore` (10x) and `_next/static` (18x) + `__NEXT_DATA__` — Sitecore CMS with a Next.js front-end — [sgs.com](https://www.sgs.com)
- **Intertek** (intertek.com): Cloudflare; HTML contains `EPiServer` (3x), `/siteassets/`, `/contentassets/`, `/globalassets/` (Episerver/Optimizely CMS asset conventions) — [intertek.com](https://www.intertek.com)
- **DNV** (dnv.com): Cloudflare; HTML contains `optimizely` (15x), `/siteassets/` (63x), `/contentassets/` (15x), React — Optimizely CMS — [dnv.com](https://www.dnv.com)
- **Applus+** (applus.com): Imperva WAF/CDN (`X-CDN: Imperva`); HTML contains `magnolia` (5x), `/.rest/` and `/dam/` (61x) — Magnolia CMS — [applus.com](https://www.applus.com)
- **Kiwa** (kiwa.com): Cloudflare; HTML contains `/globalassets/` (28x), `/contentassets/`, `/siteassets/`, React — asset paths match Optimizely/Episerver conventions, no explicit vendor string — [kiwa.com](https://www.kiwa.com)
- **Cotecna** (cotecna.com): `Server: Vox Teneo Web Engine V2` on `Microsoft-IIS/10.0` — proprietary engine of the agency Vox Teneo — [cotecna.com](https://www.cotecna.com)
- **QIMA** (qima.com): CloudFront; HTML contains `_next/static` (150x) — Next.js — [qima.com](https://www.qima.com)
- **TÜV Rheinland** (tuv.com): `Server: AkamaiGHost`; page loads Cookiebot consent and links to certipedia.com; no CMS string exposed — [tuv.com](https://www.tuv.com)
- **TÜV SÜD** (tuvsud.com): direct fetch blocked by a Cloudflare managed challenge (HTTP 403, `Cf-Mitigated: challenge`). BuiltWith reports Sitecore CMS and Sitecore XM Cloud, Next.js, ASP.NET, Microsoft Azure (Europe West) hosting, Cloudflare CDN, OneTrust consent, Adobe Analytics; "Last technology detected on Wednesday, October 21, 2026" — [BuiltWith: tuvsud.com](https://builtwith.com/tuvsud.com)
- A Sitecore partner (netzkern) lists TÜV SÜD among reference clients for Sitecore work (date unknown) — search result cited in [Microsoft-hosted partner sheet](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4L9g1)

### Inferences
- The pattern among the majors is "structured enterprise CMS + decoupled/React front-end + enterprise CDN", not page-builder WordPress. For credibility, TIC does not need the same licence tier, but it does need the same visible qualities: structured service/industry taxonomy, country/office selector, certificate lookup, consent management, and a fast CDN-fronted front-end.
- Two of the ten (SGS, TÜV SÜD) have adopted Next.js in front of Sitecore, which is consistent with the "headless CMS + modern front-end" option being a mainstream enterprise pattern in this sector.

### Gaps
- TÜV Rheinland's CMS could not be identified from HTML (Akamai strips most clues). Kiwa's CMS is inferred from asset-path conventions only.
- No Wappalyzer data was obtained (no API key); BuiltWith was used only for TÜV SÜD.

---

## 3. Platform options and fit

### Takeaway
Five realistic families exist. For a 100-400 page multilingual corporate site with distributed editors, the strongest fits on evidence are (a) a modern WordPress stack on managed hosting, (b) a headless/structured CMS with a Next.js or Astro front-end, and (c) Wagtail (Django) if the in-house team is Python-first. Hosted builders are cheapest to run but weakest on Arabic/RTL evidence and approval workflow; enterprise DXPs are what the majors use but licence costs are opaque and typically five to six figures per year.

### Cited Findings

**(a) WordPress stack**
- 91% of new WordPress vulnerabilities in 2025 were in plugins, 9% in themes, and only 6 were in core; 11,334 new vulnerabilities were reported in 2025, up 42% on 2024; 46% had no patch at disclosure — [Patchstack State of WordPress Security 2026](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) (figures via search summary of the whitepaper page)
- WPML (multilingual plugin) pricing: Multilingual Blog €39, Multilingual CMS €99 (3 production sites, 22,500 AI-translation words, Translation Management + Advanced Translation Editor), Multilingual Agency €199 (unlimited sites, 45,000 words); one year of support/updates; DeepL, Google Translate and Microsoft Translator can be used — [app.wpml.org/purchase](https://app.wpml.org/purchase)
- ACF PRO list prices 2026: Personal $49/yr (1 site), Freelancer $149/yr (10 sites), Agency $249/yr — third-party tracker [Vendr: ACF](https://www.vendr.com/marketplace/advanced-custom-fields)
- Gravity Forms: $59/yr Basic, $159/yr Pro, $259/yr Elite (sources agree on tiers, differ slightly on prices) — [Listicler](https://listicler.com/blog/gravity-forms-pricing-breakdown-is-the-license-worth-it-in-2026), [Capterra](https://www.capterra.com/p/206381/Gravity-Forms/)
- WP Engine: Essential from $28/mo billed annually (first-year/coupon price for new customers; 25k-400k visits), Business $400/mo billed annually, Enterprise custom; Layer 3/4 DDoS included; managed WAF/advanced DDoS is a paid add-on on Essential — [wpengine.com/plans](https://wpengine.com/plans/)
- Kinsta: single-site plans $35/mo ($30 annual) to $375/mo; WP 5 (5 installs) $115/mo; Enterprise from $500/mo ($417 annual) with up to 99.99% SLA; managed WAF + Cloudflare Enterprise DDoS, SAML SSO included on all plans; 260+ CDN PoPs — [kinsta.com/plans](https://kinsta.com/plans/)
- Third-party comparison: WP Engine WAF is an add-on on Essential while Kinsta includes it on every plan — [InstaWP comparison](https://instawp.com/kinsta-wpengine-wordpress-hosting-compared/) (competitor-published, weigh accordingly)

**(b) Headless / structured CMS + Next.js/Astro**
- Sanity: Free $0 (20 seats, 2 roles, 10k documents), Growth $15/seat/mo (50 seats, 5 roles, scheduled drafts, 90-day change history, comments/tasks), Enterprise custom (custom roles, SSO, audit trail, content releases, SLA); unlimited locales on all plans; overages e.g. $1 per 250k CDN requests, $0.30/GB bandwidth; Dedicated Support add-on $799/mo — [sanity.io/pricing](https://www.sanity.io/pricing)
- Storyblok: Starter free (2 locales), Growth $99/mo ($90.75 annual; 5 seats; 2 locales, extra locales $20 each), Growth Plus $349/mo (15 seats, 10 locales), Premium/Elite custom; custom workflows and custom roles only from Premium; 99.9% SLA Premium, 99.99% Elite; SSO/SCIM Elite — [storyblok.com/pricing](https://www.storyblok.com/pricing)
- Contentful: official pricing page returned HTTP 429 on two attempts. Secondary sources put the free tier at $0 and the entry paid plan at about $300/mo, Enterprise custom; one source says enterprise pricing rose ~30% year on year — [FocusReactive on Contentful pricing](https://focusreactive.com/blog/contentful-pricing/), [Attract Group comparison](https://attractgroup.com/blog/headless-cms-comparison/) (both agency blogs)
- Strapi self-hosted: Community free (MIT, RBAC, REST/GraphQL), Growth $45/mo (3 users, +$15/user; Live Preview, Releases, 14-day Content History), Enterprise custom (SSO, review workflows, audit logs, SOC 2); SSO add-on on Growth $150/mo — [strapi.io/pricing-self-hosted](https://strapi.io/pricing-self-hosted)
- Payload CMS: GitHub licence `MIT`, 45,396 stars, last push 2026-10-21 — [GitHub API: payloadcms/payload](https://api.github.com/repos/payloadcms/payload). Payload's site says it "remains a self-hosted solution", that Figma is "committed to maintaining and investing in Payload's open source core", and lists SSO, Publishing Workflows, Visual Editor and A/B testing as Enterprise features; no USD prices shown — [payloadcms.com/cloud-pricing](https://payloadcms.com/cloud-pricing)
- Directus: GitHub reports `NOASSERTION` licence (i.e. not a standard OSI SPDX id; Directus uses its own BSL-style licence), 38,644 stars — [GitHub API: directus/directus](https://api.github.com/repos/directus/directus)
- Strapi GitHub also reports `NOASSERTION` at repo level while the pricing page says Community is MIT — [GitHub API: strapi/strapi](https://api.github.com/repos/strapi/strapi) vs [strapi.io/pricing-self-hosted](https://strapi.io/pricing-self-hosted)

**(c) Wagtail (Django)**
- Wagtail features page: StreamField block editing; multi-language via Wagtail Localize; customizable moderation workflows; fine-grained permissions; revision comparison and rollback; scheduled publish and expiry; site history (audit) reports; admin targets WCAG 2.2 AA and ATAG 2.0 with built-in accessibility checker; named users include Children's Health Ireland and UC Berkeley — [wagtail.org/features](https://wagtail.org/features/)
- Licence: `BSD-3-Clause`, 20,581 stars, last push 2026-10-21 — [GitHub API: wagtail/wagtail](https://api.github.com/repos/wagtail/wagtail)
- Clutch lists 154 companies in its "Top Wagtail Developers" directory (ratings updated 29 Jul 2026) — [clutch.co/developers/wagtail](https://www.clutch.co/developers/wagtail)

**(d) Hosted builders**
- Webflow pricing page: "Webflow Localization — translate your full site or individual elements using machine learning. Add more locales for a separate fee"; localization is priced "based on # of locales" — [webflow.com/pricing](https://webflow.com/pricing) (raw HTML; plan prices were not reliably extractable, see Gaps)
- Third-party listings: Webflow entry ~$15-18/mo, Framer ~$10/mo (annual) — [cut-the-saas Webflow vs Framer](https://cut-the-saas.com/guides/webflow-vs-framer), [Capterra](https://www.capterra.ca/compare/136159/201318/webflow/vs/hubspot-cms)
- HubSpot Content Hub Starter listed at $20/mo per core seat on G2; official pricing page is JavaScript-rendered and returned no prices to the fetcher — [G2: Framer vs HubSpot Content Hub](https://www.g2.com/compare/framer-vs-hubspot-content-hub)
- None of the builder sources found mention Arabic/RTL support — [search summary](https://www.g2.com/compare/framer-vs-hubspot-content-hub)

**(e) Enterprise DXPs**
- Adobe Experience Manager Sites: "Contact Us" only, no public price — [G2 pricing listing](https://www.g2.com/products/joomla/pricing)
- Sitecore: a UK agency says annual licence fees "typically range from £50,000 to £80,000 before development", negotiated under NDA; another blog puts Sitecore at up to $750K+/year — [Kayo Digital: Umbraco vs Sitecore](https://www.kayo.digital/kayo-how/umbraco-at-battle-choose-your-fighter-umbraco-vs-sitecore/), [ClonePartner](https://clonepartner.com/blog/xperience-by-kentico-alternatives-2026-features-migration-tco.md) (both third-party, unverified)
- Kentico Xperience 13 Business: from $12,500 per licence per year on G2 (older edition; current Xperience by Kentico not priced publicly in results) — [Kentico comparison page](https://www.kentico.com/compare/sitecore-alternative)
- Umbraco CMS core is free/open source; Umbraco Cloud "starts from a few hundred pounds per month" (Kayo); the official Umbraco Cloud pricing page returned HTTP 403 to the fetcher and a 5 KB JS shell to curl — [Kayo Digital](https://www.kayo.digital/kayo-how/umbraco-at-battle-choose-your-fighter-umbraco-vs-sitecore/)
- Drupal: Bureau Veritas runs Drupal 11 (see section 2); Drupal itself is GPL open source (no licence fee) — own fetch of [group.bureauveritas.com](https://group.bureauveritas.com)

### Inferences
- Editor-friendliness for non-technical office staff: WordPress block editor and Webflow/HubSpot are the most familiar; Storyblok and Sanity offer visual/real-time editing; Wagtail's StreamField is editor-oriented and its admin is the only one here that documents WCAG 2.2 AA conformance. Strapi and Payload are developer-first and need a front-end preview integration to feel editor-friendly.
- Approval workflow and audit log are gated behind the top paid tier in most SaaS CMSs (Storyblok Premium, Strapi Enterprise, Sanity Enterprise). Wagtail ships moderation workflows, permissions and site-history audit at no licence cost; WordPress needs a plugin (PublishPress) for approval workflow.
- Lock-in: self-hosted open source (WordPress, Wagtail, Payload, Strapi Community, Drupal) can be moved between hosts; SaaS CMS (Sanity, Contentful, Storyblok, Webflow, HubSpot) hold the content store and editor, with export APIs but no self-hosting path. Directus's non-OSI licence is a consideration for commercial use.
- Developer availability: WordPress and Drupal agencies are abundant in both UAE and India (vendor listicles only, see Gaps); Wagtail has a smaller but global pool (154 Clutch-listed firms). A Python/Django in-house lead reduces dependence on the vendor pool for Wagtail or Payload-style stacks but does not remove the need for a front-end specialist.
- Platform cost ranges (licence + hosting only, excluding build): WordPress on managed hosting $600-5,000/yr plus ~$400-700/yr plugins (WPML, ACF, forms); headless SaaS $1,200-4,200/yr at Growth tiers, rising to five figures for Enterprise/workflow tiers, plus front-end hosting; Wagtail/Payload/Strapi self-hosted $0 licence plus $600-6,000/yr hosting; DXPs five to six figures/yr.

### Gaps
- Contentful, HubSpot Content Hub, Umbraco Cloud and Webflow official price tables could not be fetched (429 / 403 / JS-rendered). Figures above for those are secondary.
- PublishPress (WordPress editorial workflow) pricing page was JS-rendered; no price captured.
- Strapi i18n tier availability: comparison table markers did not render; believed to be in Community but unconfirmed.
- No reliable count of WordPress/Drupal/Django agencies in UAE or India was found; Clutch directory totals need a manual look at the filtered directory pages.

---

## 4. Certificate verification feature

### Takeaway
Every major in the sector runs a public lookup by certificate number and/or company name, increasingly with QR codes printed on the certificate that resolve to a record in a central database; the safe pattern is lookup-by-exact-identifier with rate limiting, no listing/enumeration, and a data feed from the internal certification system.

### Cited Findings
- SGS: "Verify the status of any SGS issued management system or process certificate with our certified client directory"; searchable by client name, certificate number and/or product name; separate Certified Components & Products directory and an Audited Supplier Verification database searchable by report number — [sgs.com certified clients and products](https://www.sgs.com/en-us/certified-clients-and-products)
- DNV: public certificate checker "will only list the first 15 entries"; if a company does not appear, certification may be pending — [certificatechecker.dnv.com](https://certificatechecker.dnv.com/)
- TÜV Rheinland Certipedia: public database; "the QR code or ID number on the certification mark can be used to verify it on Certipedia"; personnel certificates verified by request via contact form — [TÜV Rheinland France PDF](https://origin.tuv.com/content-media-files/france/pdfs/systems-accreditation-downloads/tuv-rheinland_information-statut-de-certification_v.240223.pdf), [TÜV Academy: certificate database verification](https://academy-global.tuv.com/personnel-certification/certificate-database-verification)
- TÜV SÜD: "The QR code gives quick access to certificate information in TÜV SÜD's central database" so verifiers can check validity periods — [tuvsud.com certificates with QR code](https://www.tuvsud.com/en-id/resource/certificate-finder/certificates-with-qr-code)
- Bureau Veritas marine digital certificates: authenticity verified "via a secure online portal using a QR code, URL or search via the certificate's unique identification number" — [BV slide deck (nsweek.com)](https://2020.nsweek.com/wp-content/uploads/2018/10/BOZZETTI_BUREAU-VERITAS.pdf)
- Intertek: a Bahrain regulator's list links to an Intertek business-assurance certificate validation form — [NHRA QAC verification links](https://www.nhra.bh/Departments/MDR/Useful%20Resources/Quality%20Assurance%20Certificates/QAC%20Verification%20Websites%20Links)
- A compiled list of notified-body online certificate checkers exists (TEAM-NB, 2020) — [TEAM-NB PDF](https://team-nb.org/wp-content/uploads/2025/02/TEAM-NB-List-of-on-line-check-for-validity-of-certificates-20200623.pdf)
- Security guidance (verification-flow context, not certificate-specific): enumeration is listed as a threat ("using verification endpoints to check whether identifiers exist"); rate limiting is "the first line of defense" and should be applied "at multiple layers" — [Telnyx Verify security best practices](https://developers.telnyx.com/docs/identity/verify/security-best-practices); per-IP limits via django-ratelimit suggested in [django-phone-verify security docs](https://django-phone-verify.readthedocs.io/en/latest/security.html)
- Signed-QR model with revocation check: DIVOC verifies the signature on a QR-coded certificate, then calls a revocation API, with offline revocation lists supported — [DIVOC docs](https://divoc.digit.org/platform/divocs-verifiable-certificate-features-2.0/verifying-a-divoc-certificate)

### Inferences
- Design options, in rising order of effort: (1) CSV/Excel upload by an admin into the CMS (simplest; fits any platform); (2) nightly sync from the internal certification/ERP database via a small API or export job; (3) real-time API. Option 2 is the usual target for a company with ~13 offices issuing certificates.
- Safety rules to specify: lookup requires the full certificate number (plus optionally company name) — never a browse/list view; return only status, holder name, scope, validity dates; apply per-IP rate limiting and a CAPTCHA/Turnstile after N attempts; use unguessable certificate IDs or a signed QR token so the URL cannot be iterated; log lookups; QR on the printed certificate links to the exact record.
- The DNV "first 15 entries" behaviour shows the industry accepts partial listing by company name; a stricter number-only lookup is defensible for a smaller body and reduces enumeration risk.

### Gaps
- No standard or guideline specifically for certificate-number lookup portals was found (OWASP guidance on enumeration would be the next place to look).
- The internal source system at TIC (where certificate records live) is unknown; the sync design depends on it.

---

## 5. Interactive messaging for B2B (live chat, WhatsApp, AI with handoff)

### Takeaway
WhatsApp is the dominant business channel in the Gulf (85% of UAE residents prefer it for dealing with companies), Meta bills per delivered message by category and country with a free 1,000 service messages/month per number, and chat tools range from free (tawk.to) to $29-132 per seat (Intercom). Human handoff matters: nine in ten UAE respondents prefer a human over AI.

### Cited Findings
- Meta WhatsApp Business Platform: per-message pricing since 1 July 2025, charged only for business-initiated messages once delivered; categories Marketing, Utility, Authentication (templates) and Service (free-form inside the 24-hour window); first 1,000 service messages per business phone number per month free; from 1 October 2026 Meta resumes charging for service messages beyond the free tier and for utility messages inside the window; rate cards are per country (CSV/PDF); UAE, Saudi Arabia and "Rest of Middle East" marketing rates increase from 1 Oct 2026; Iraq moved to a standalone market with lower utility/authentication rates; Meta Business Agent $2.00 per 1M tokens — [Meta WhatsApp pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)
- Third-party example rates: German base rate €0.0456 per utility/authentication/service message and €0.1131 per marketing message; marketing rates run from under 1 US cent to over 8-9 cents by market (unverified against the rate card) — [meetergo](https://help.meetergo.com/en/integrations/automation/whatsapp-pricing), [QuickReply](https://www.quickreply.ai/whatsapp-automation/whatsapp-business-api-pricing)
- Intercom: Essential $29, Advanced $85, Expert $132 per seat/month; Fin AI agent $0.99 per outcome; WhatsApp available as a pay-as-you-go channel charged per conversation; multilingual Help Center on Advanced/Expert; Copilot $29/agent/mo — [intercom.com/pricing](https://www.intercom.com/pricing)
- Crisp: Free (2 seats), Mini $45/mo (4 seats), Essentials $95/mo (10 seats, WhatsApp omnichannel inbox, AI chatbot with $25 credits), Plus $295/mo (20+ seats, AI agent); extra seats $10/mo; "Multilingual AI (50+ languages)" listed — [crisp.chat/en/pricing](https://crisp.chat/en/pricing/)
- tawk.to: core live chat free; removing branding $29/month; hired chat agents "from as little as $29/month" / "$1/hour" — [tawk.to/pricing](https://www.tawk.to/pricing/) (raw HTML)
- HubSpot: outcome-based AI pricing from 14 April 2026 at $0.50 per resolved conversation (third-party report) — [rework.com HubSpot vs Zoho](https://resources.rework.com/tools/crm/hubspot-vs-zoho-crm)
- UAE consumer poll (Zbooni/YouGov, 1,000 residents, 2024): 85% prefer WhatsApp to interact with companies; 65% used it for a product/service enquiry in the past year vs 55% call centre, 48% email; nine in ten prefer genuine human support over chatbots/AI — [Communicate Online](https://communicateonline.me/news/85-percent-of-uae-residents-want-businesses-to-use-whatsapp/), [SeamlessXtra](https://seamlessxtra.com/survey-nine-out-of-ten-uae-consumers-prefer-real-human-customer-support-not-ai/)
- Regional WhatsApp usage (Analysys Mason consumer survey, 2022): 77% UAE, 69% Saudi Arabia, 71% Oman, 65% Kuwait — [Analysys Mason PDF](https://www.analysysmason.com/contentassets/245eaea0cc564ea2bd04916bfa9a71af/analysys_mason_ott_comms_middleeast_sample_oct2022_rdmv0.pdf)

### Inferences
- For a B2B TIC company the realistic stack is: a "click to WhatsApp" button per office (free, no API needed) plus a web-form fallback, optionally upgraded later to WhatsApp Business Platform via a BSP (Twilio, 360dialog, Infobip etc.) feeding a shared inbox (Crisp/Intercom/HubSpot). Inbound-led usage keeps Meta costs near zero because user-initiated service conversations stay inside the free tier at TIC's likely volumes.
- Any AI assistant should be scoped to FAQs (services, office contacts, certificate lookup) with a visible "talk to a person" path, given the human-preference data.
- Office-hours coverage across 13 time zones is an operational question, not a tooling one; the proposal should ask who staffs the inbox.

### Gaps
- No 2025 B2B-specific messaging preference data for Saudi Arabia, India or Pakistan was found.
- Meta's per-country USD rate card (CSV) was not downloaded; UAE/KSA/India exact per-message prices are not recorded here.

---

## 6. Forms, CRM and lead routing; email deliverability

### Takeaway
Zoho CRM is materially cheaper per seat than HubSpot and now has UAE data centres (opened January 2026), while HubSpot bundles forms, chat and CMS into one suite at a higher price. Whatever CRM is chosen, the website's transactional email must pass SPF, DKIM and DMARC or Gmail will junk it.

### Cited Findings
- Zoho CRM editions: Free (3 users), Standard, Professional, Enterprise, Ultimate; assignment rules and web forms from Standard; territory management from Enterprise; 28 languages supported; KSA-hosted data centres available for Enterprise/Ultimate — [zoho.com/crm pricing](https://www.zoho.com/crm/zohocrm-pricing.html) (prices not rendered in fetch)
- Zoho per-user prices (third-party, 2026): Standard $14 annual/$20 monthly, Professional $23/$35, Enterprise ~$40, Ultimate $52/$65; HubSpot Sales Hub Starter ~$7-20/seat, Professional $90-100/seat + $1,500 onboarding, Enterprise $150/seat + $3,500 onboarding — [rework.com](https://resources.rework.com/tools/crm/hubspot-vs-zoho-crm), [automationatlas](https://automationatlas.io/answers/zoho-crm-pricing-explained-2026/)
- Zoho opened data centres in Dubai and Abu Dhabi on 13 January 2026 (AED 100m investment; Dubai Electronic Security Center CSP certificate; ISO 27001/22301/27017); India DCs in Mumbai (primary) and Chennai — [ManageEngine news](https://www.manageengine.com/news/zohocorporation-opens-datacentres-in-uae.html), [Gulf Business](https://gulfbusiness.com/zoho-opens-1st-uae-data-centres-in-dubai-abudhabi/), [Zoho Know Your Datacenter](https://prezohoweb.zoho.com/know-your-datacenter.html)
- Google sender requirements (effective 1 Feb 2024): all senders need SPF or DKIM, valid PTR, TLS, spam rate below 0.3%; bulk senders (5,000+/day) need SPF and DKIM and DMARC (policy may be `none`), From-domain alignment, one-click unsubscribe (`List-Unsubscribe-Post`) for marketing mail; DKIM keys at least 1024 bits, 2048 recommended — [Google: Email sender guidelines](https://support.google.com/a/answer/81126)

### Inferences
- Routing by country/office is a CRM assignment-rule feature (Zoho Standard+; HubSpot Professional+ for advanced routing) and does not need custom code on the website; the form only needs to capture country/office/service as structured fields.
- A single transactional-email provider (e.g. Amazon SES, Postmark, SendGrid, Mailjet) with SPF/DKIM/DMARC on ticqc.ae should be specified regardless of CMS, because WordPress/PHP `mail()` from shared hosting is the common cause of lost enquiries.
- Microsoft Dynamics and Salesforce were not costed; both exceed Zoho on per-seat price and are usually chosen when the company already runs Microsoft 365/Dynamics for finance.

### Gaps
- Official Zoho and HubSpot USD prices were not captured from vendor pages (JS-rendered); only third-party figures.
- Whether Zoho CRM specifically is served from the UAE DC for a UAE-signup account was not confirmed.
- Salesforce and Dynamics pricing not researched (budget of calls).

---

## 7. Hosting, performance, security, UAE data residency and PDPL

### Takeaway
Both AWS (me-central-1, Dubai, 3 AZs) and Azure (UAE North, Dubai, 3 AZs) offer in-country hosting; Vercel/Cloudflare-style edge hosting is cheaper and simpler for a static/Next.js front-end but is not UAE-resident. The UAE PDPL (Federal Decree-Law 45/2021, in force 2 Jan 2022) regulates cross-border transfer but does not, on the primary government page, mandate in-country hosting of a corporate website.

### Cited Findings
- AWS Middle East (UAE) region has three Availability Zones — [AWS News Blog](https://aws.amazon.com/tw/blogs/aws/now-open-aws-region-in-the-united-arab-emirates-uae/); a third-party aggregator ranks me-central-1 30th of 36 regions on average hourly price (~$0.286) — [cloudprice.net](https://cloudprice.net/aws/region/me-central-1)
- Azure UAE North (Dubai) has availability zones ("three unique physically separated locations"); UAE Central (Abu Dhabi) is access-restricted for in-country DR — [Microsoft regions list](https://learn.microsoft.com/azure/reliability/regions-list), [Azure update: UAE North AZs](https://azure.microsoft.com/en-gb/updates/generally-available-uae-north-availability-zones/), [Microsoft Gulf trusted cloud FAQ](https://www.microsoft.com/gulf/uae/trustedcloud/faq)
- Vercel: Hobby $0, Pro $20/mo per developer seat (1 TB transfer, 10M edge requests, overage $0.15/GB and from $2 per 1M requests), Enterprise custom; DDoS mitigation on all plans; WAF custom rules 3/40/1,000; managed OWASP ruleset Enterprise only; prices exclude VAT — [vercel.com/pricing](https://vercel.com/pricing)
- Cloudflare: Workers free plan 100,000 requests/day; Pages free 500 builds/month; Workers Paid $5/mo for 10M requests then $0.30 per extra million; Cloudflare Pro $20/mo annual or $25 monthly (secondary blogs, June 2026) — [eastondev](https://eastondev.com/blog/es/posts/dev/20260526-cloudflare-free-limits/), [temps.sh](https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026); official plans page fetched showed only compute pricing — [cloudflare.com/plans](https://www.cloudflare.com/plans/)
- Managed WordPress hosting security inclusions: see section 3 (Kinsta includes WAF/DDoS/SSO on all plans; WP Engine Essential WAF is an add-on) — [kinsta.com/plans](https://kinsta.com/plans/), [wpengine.com/plans](https://wpengine.com/plans/)
- UAE PDPL: Federal Decree-Law No. 45 of 2021, effective 2 January 2022; covers processing "inside or outside the country"; prohibits processing without the data owner's consent (with public-interest/legal exceptions); requires companies to secure personal data; data owners may request correction and restrict processing; the law "sets requirements for transferring and sharing personal data across borders"; regulator is the UAE Data Office (Federal Decree-Law 44/2021), which issues implementation guidelines; page last updated 04 Dec 2025 — [u.ae Data protection laws](https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws)
- Cross-border transfer is governed by Articles 22-23 (some commentators add 24); conditions "parallel, but do not identically mirror" GDPR Chapter V — [Modulos UAE PDPL summary](https://docs.modulos.ai/frameworks/uae-pdpl/security-breaches-dpia-and-cross-border-transfers), [China Briefing](https://www.china-briefing.com/china-outbound-news/uae-data-protection-obligations-and-cross-border-data-transfer-for-businesses)
- Sources conflict on whether the PDPL Executive Regulations have been issued (one says not issued; another says regulations followed in 2022-2023) — [Centraleyes](https://www.centraleyes.com/privacy-laws/uae/) vs [Modulos](https://docs.modulos.ai/frameworks/uae-pdpl)

### Inferences
- A corporate marketing site collects little personal data (contact forms, chat, newsletter). The practical PDPL posture is: privacy notice + consent on forms/cookies, a documented processor list (CRM, chat, analytics vendors), and a data-transfer basis for any non-UAE SaaS. In-country hosting becomes a harder requirement only if a client portal stores client inspection data or if government-programme contracts (Iraq/Egypt CoC) specify it — that question belongs in the questionnaire for the directors.
- Hosting options by platform: WordPress → Kinsta/WP Engine (no Gulf data centre confirmed) or self-managed on AWS me-central-1/Azure UAE North; headless → CMS SaaS (vendor region) + front-end on Vercel/Cloudflare or Azure Static Web Apps; Wagtail/Payload → container on AWS/Azure UAE regions behind Cloudflare.
- Backups, WAF, DDoS and uptime SLA are included by managed WordPress hosts and Vercel; on raw cloud they must be built and costed (roughly one to two days of DevOps plus monitoring tooling).

### Gaps
- No Kinsta or WP Engine data-centre list was captured (page did not render locations); Middle East presence unconfirmed.
- Primary text of PDPL Articles 22-24 and the Data Office transfer guidance were not fetched; executive-regulation status unresolved.
- Azure UAE North and AWS me-central-1 official price tables not pulled.

---

## 8. Multilingual: Arabic RTL, fonts, translation workflow, hreflang

### Takeaway
Google requires one URL per language, bidirectional hreflang that lists every variant including itself, and no automatic IP-based redirects; for Arabic, open-licence Google fonts (Cairo, Tajawal, Noto Naskh/Kufi Arabic, IBM Plex Sans Arabic) are the normal corporate choice, and headless CMSs differ sharply on locale pricing (Sanity unlimited, Storyblok $20 per extra locale, WPML per-site licence).

### Cited Findings
- Google: "recommends using different URLs for each language version of a page"; avoid automatic redirection based on assumed language — link to the alternatives instead; keep one language per page; Google "ignores locational meta tags"; "IP location analysis is difficult and generally not reliable" — [Google: managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- hreflang: three equivalent methods (HTML link, HTTP header, sitemap); "If two pages don't both point to each other, the tags will be ignored"; x-default for unmatched users; ISO 639-1 language + ISO 3166-1 alpha-2 region, country code cannot stand alone; translated pages are not duplicates, template-only translations may be — [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Arabic fonts: Cairo and Tajawal "highly recommended for corporate use", Cairo "highly suited for web design due to its clean proportions and versatile weight range"; Amiri for traditional Naskh; common practice mixes Naskh for body and Kufi for headings; most open Arabic fonts are OFL; use WOFF/WOFF2 — [BlackBox Operations Arabic font guide](https://erp.blackboxoperations.com/blog/arabic-font-styles) (vendor blog); a type foundry stresses "achieving harmony with the Latin and maintaining a balance of weight, style, point size and legibility" when pairing — [Boutros Fonts](https://www.boutrosfonts.com/-Custom-Fonts-)
- Dubai agency estimate: Arabic RTL support adds a 15-25% premium to corporate site builds — [Kolonell: Arabic RTL corporate website cost Dubai 2026](https://kolonell.com/en/blog/arabic-rtl-corporate-website-cost-dubai-2026) (agency blog)
- Locale limits by CMS: Sanity unlimited locales on all plans — [sanity.io/pricing](https://www.sanity.io/pricing); Storyblok 2 locales on Growth (+$20 each), 10 on Growth Plus — [storyblok.com/pricing](https://www.storyblok.com/pricing); WPML CMS €99 with 22,500 AI words — [app.wpml.org/purchase](https://app.wpml.org/purchase); Wagtail via Wagtail Localize — [wagtail.org/features](https://wagtail.org/features/)
- Translation tooling (secondary, 2026): Lokalise from $144/mo and moved to word-based billing; Crowdin from ~$50-59/mo; DeepL Pro from ~$8.74-10.49/user/mo with API tiers; Weglot is the most-cited no-code website translator; Smartling/Smartcat add human linguists — [dupple AI localization tools](https://dupple.com/learn/best-ai-localization-tools), [rework AI translation tools](https://resources.rework.com/tools/ai-tools/best-ai-translation-tools-2026)

### Inferences
- Recommended structure on evidence: subdirectories (`ticqc.com/en/`, `/ar/`) with hreflang + x-default and a visible language switcher, not auto-redirect; office/country pages can carry `en-ae`, `ar-ae`, `en-iq`, `ar-iq` etc. only if content genuinely differs.
- Workflow: machine translation (DeepL/Google via CMS plugin) into a draft Arabic locale, then review by an Arabic-speaking office editor before publish — supported natively by WPML (AI words), Storyblok (field-level translation workflows at Premium), Sanity (document- or field-level with plugins), Wagtail Localize (sync + machine translation hooks).
- RTL is mainly a front-end concern (CSS logical properties, mirrored icons, Arabic numerals policy, bidirectional text in mixed strings such as certificate numbers); none of the CMSs block it, but Webflow/Framer evidence for RTL is absent.

### Gaps
- No primary comparison of Noto Naskh Arabic vs IBM Plex Sans Arabic was found; the font recommendations above are from vendor blogs.
- Webflow/Framer/HubSpot RTL support not evidenced either way.

---

## 9. Migration from the old WordPress site, SEO preservation, domain (.ae vs .com)

### Takeaway
Google's own guidance: map every old URL, use server-side 301/308 redirects kept "generally at least 1 year", verify all domain variants and use Change of Address only for a domain change, and expect temporary ranking fluctuation. On domains, Google treats a ccTLD (.ae) as a strong single-country signal, which cuts against a company with 13 offices; a gTLD (.com) with subdirectories is Google's low-maintenance option.

### Cited Findings
- "It's important to map your old site's URLs to the URLs for the new site"; build the list from sitemaps, server logs, analytics and the CMS, including images/PDFs; set self-referencing canonicals and update hreflang — [Google: site move with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- "Use server side permanent redirects if technically possible" (301/308); client-side only "as a last resort"; avoid chains; "Keep the redirects for as long as possible", "generally at least 1 year" — same source
- Change of Address tool only for domain/subdomain changes; "You don't need it for HTTP to HTTPS moves"; submit for every verified variant (subdomains, www/non-www); submit the new sitemap; "Expect temporary fluctuation in site ranking during the move"; medium sites "can take a few weeks or more" — same source
- ccTLD vs gTLD: country-code domains are a strong geotargeting signal; "Some countries have restrictions on who can use ccTLDs"; a ccTLD "can target only one country"; subdirectories are "simple to set up; low maintenance on one host" but geotarget is harder to read from the URL; targeting a single country "can improve your page rankings in the target country, but at the expense of results in other locales or languages" — [Google: managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- Current state: ticqc.com redirects to ticqc.ae (background brief); ticqc.ae exposes WordPress REST API and sitemap-capable `wp-json` endpoints usable for content export — own fetch of [ticqc.ae](https://ticqc.ae)

### Inferences
- Content export from WordPress is low-risk whichever platform is chosen: WXR export or the REST API (`/wp-json/wp/v2/pages`, `/posts`, `/media`) gives structured pages, posts and media. The hard part is re-structuring page-builder HTML into structured fields, which is editorial work, not engineering.
- Domain decision framing for directors: keep ticqc.ae as the primary if the business is UAE-led and SEO in the Gulf matters most; move to ticqc.com (with .ae redirecting) if the goal is a global brand and per-country pages. Either way, the redirect from the losing domain must be permanent and kept for years, and both must be verified in Search Console before launch.
- A pre-launch SEO baseline (Search Console export of top queries/pages, backlink list) is cheap and avoids disputes later about "lost traffic".

### Gaps
- No independent evidence (beyond Google's general statement) quantifying ccTLD vs gTLD performance for a multi-country B2B company.
- Current ticqc.ae organic traffic, backlink profile and indexed page count were not measured.

---

## 10. Accessibility and compliance (WCAG 2.2 AA, cookie consent)

### Takeaway
WCAG 2.2 (5 Oct 2023) adds nine criteria, six at A/AA that a corporate site must meet (focus not obscured, dragging alternatives, 24px target size, consistent help, no redundant entry, accessible authentication); cookie consent tools run from free/≈$100-700 per year (Cookiebot) to a ~$10,000/yr floor (OneTrust).

### Cited Findings
- WCAG 2.2 became a W3C Recommendation on 5 October 2023; new criteria: 2.4.11 Focus Not Obscured (Min) AA, 2.4.12 Focus Not Obscured (Enhanced) AAA, 2.4.13 Focus Appearance AAA, 2.5.7 Dragging Movements AA, 2.5.8 Target Size (Min) AA, 3.2.6 Consistent Help A, 3.3.7 Redundant Entry A, 3.3.8 Accessible Authentication (Min) AA, 3.3.9 Accessible Authentication (Enhanced) AAA; 4.1.1 Parsing removed — [W3C: What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- Wagtail admin targets WCAG 2.2 AA and ATAG 2.0 with a built-in accessibility checker — [wagtail.org/features](https://wagtail.org/features/)
- Cookiebot (per domain, by subpage count; USD as of June 2026, secondary): Free up to 50 subpages, Premium Lite $8/mo, Premium Small $16-34/mo, higher tiers $34-56/mo; base Premium price roughly doubled in August 2025 — [Secure Privacy comparison](https://secureprivacy.ai/blog/cookiebot-vs-onetrust-vs-secure-privacy), [Enzuzo](https://www.enzuzo.com/blog/onetrust-vs-cookiebot) (competitor-published)
- OneTrust: no public prices; effective floor ~ $10,000/yr; median buyer spend ~$11,500-11,800 (Vendr procurement data); 2-3 year lock-ins with 5-10% escalators reported — [pii.ai OneTrust pricing guide](https://www.pii.ai/blog/onetrust-cookie-consent-pricing-the-complete-2025-guide), [Enzuzo](https://www.enzuzo.com/blog/onetrust-vs-cookiebot)
- Majors' consent tooling observed: TÜV SÜD uses OneTrust/Optanon — [BuiltWith tuvsud.com](https://builtwith.com/tuvsud.com); TÜV Rheinland loads Cookiebot (`consent.cookiebot.eu/uc.js`) — own fetch of [tuv.com](https://www.tuv.com)
- UAE PDPL cookie-consent commentary exists but is vendor-published — [FlexyConsent UAE PDPL cookie guide](https://flexyconsent.com/blog/uae-pdpl-cookie-consent-guide/)

### Inferences
- A WCAG 2.2 AA target is achievable on any platform; it is a design-system and QA requirement (contrast, focus states, target sizes, forms without redundant entry) and should be written into the agency contract with an audit at launch.
- For a site of this size a Cookiebot-class CMP (or an open-source CMP such as Klaro/Cookie Consent) is proportionate; OneTrust is enterprise overkill unless group policy mandates it.

### Gaps
- No source found on WCAG conformance of specific consent banners.
- No primary PDPL guidance on cookies was located (vendor blogs only).

---

## 11. Budget and timeline benchmarks (UAE, Europe, India; phases; yearly running costs)

### Takeaway
Published 2026 agency guides put a standard corporate site in Dubai at AED 15,000-55,000, a multi-entity/multilingual corporate site at AED 70,000-250,000 (≈$19,000-68,000), a London-agency corporate site at £60,000-80,000 (regional UK £25,000-45,000), and an Indian agency corporate CMS site at $2,500-8,000 (Western agencies 2-3x higher). Typical full redesigns run 12-20 weeks; late content and slow approvals are the top delay causes.

### Cited Findings
**UAE**
- Corporate website AED 15,000-55,000 for up to ~75 pages — [DubaiMonsters](https://dubaimonsters.com/?p=11095); AED 15,000-40,000 — [Element8](https://www.element8.ae/blogs/website-development-cost-dubai); AED 15,000-45,000 — [Redberries 2026 guide](https://redberries.ae/web-design-dubai-price/); AED 12,000-55,000 corporate/SME — [Digital Gravity](https://www.digitalgravity.ae/blog/?p=9425)
- Group site with several subsidiaries AED 70,000-180,000 (2026); maintenance AED 2,500-6,000/month — [Kolonell: corporate group website cost Dubai 2026](https://kolonell.com/en/blog/corporate-group-website-cost-dubai-2026)
- Trilingual Arabic/English/French corporate site AED 90,000-250,000; RTL premium 15-25%; multilingual editorial updates AED 20,000-55,000/yr — [Kolonell: Arabic RTL corporate website cost Dubai 2026](https://kolonell.com/en/blog/arabic-rtl-corporate-website-cost-dubai-2026)
- All UAE figures are agency marketing content; one summary notes some 2026-dated posts "look inconsistent" — search summary of the above

**Europe/UK**
- "A corporate website that a London agency quotes at £60,000-£80,000 will often be scoped for £25,000-£45,000 by an equally capable agency in Belfast, Manchester, Birmingham, or Edinburgh"; regional agencies 30-50% below London — [ProfileTree UK website design costs](https://profiletree.com/uk-website-design-costs/)
- Agency small-business site £5,000-10,000; feature-rich £10,000-25,000; large bespoke platform £25,000-100,000+; maintenance £500-3,000/yr — [Mapletree Studio 2026 guide](https://mapletree.studio/blog/how-much-does-a-website-cost-uk-2026/), [Kwiboo 2026 breakdown](https://www.kwiboo.com/blog/How-much-does-a-website-cost-in-the-UK-A-2026-breakdown)
- Custom corporate sites in US/UK/Western Europe USD 5,000-25,000 (one global comparison) — [PerfectionGeeks](https://www.perfectiongeeks.com/blogs/web-development-cost-2026)

**India**
- Agency business website with CMS Rs 50,000-2,00,000 — [Fuzen](https://www.fuzen.io/posts/website-development-cost-in-india); corporate site with CMS & blog $2,500-8,000, 4-8 weeks, "US/EU agencies typically run 2-3x higher" — [eCarter 2026](https://ecarter.co/blogs/development/website-development-cost-2026); fixed quotes Rs 50,000-5,00,000+ — [upGrowth](https://upgrowth.in/website-design-cost-guide-in-india/); Western agency hourly $150-250, Indian freelancers Rs 500-2,000/hr — [Codingclave](https://codingclave.com/blog/how-much-does-a-website-cost-in-india-2026)

**Timelines**
- Full redesign 12-20 weeks; small sites ~8 weeks; complex platforms beyond 6 months — [LowCode Agency: website redesign timeline](https://www.lowcode.agency/blog/website-redesign-timeline)
- Phase pattern: Discovery 2-4 weeks (stakeholder interviews, analytics audit, competitor review, sitemap), Design 3-6 weeks (wireframes, design system, hi-fi mockups), Build 4-8 weeks (CMS setup, templates, integrations, content load), QA 1-2 weeks — [Solved Consulting: timelines by complexity](https://www.solvedconsulting.com/blog/website-redesign-timelines-by-project-complexity); enterprise projects 18-30 weeks — [F22 Labs](https://f22labs.com/blogs/how-long-does-it-take-to-redesign-a-website)
- Late content is "the most common delay"; delayed approvals the top cause of overruns; 30-90 days post-launch monitoring treated as part of the project — [Blend B2B](https://www.blendb2b.com/blog/how-long-does-a-b2b-website-redesign-take), [LowCode Agency stages](https://www.lowcode.agency/blog/website-redesign-project-stages-with-agency)

### Inferences
- A realistic bracket for TIC's scope (100-400 pages, EN+AR, 13 offices, certificate lookup, CRM/chat integrations, migration) is the "group/multilingual" band, not the "standard corporate" band: roughly AED 90,000-250,000 ($25,000-68,000) with a UAE agency, £40,000-80,000 ($50,000-100,000) with a UK/EU agency, or $15,000-35,000 with an Indian agency of comparable scope (Indian low-end figures assume simpler sites; multiply the $2.5-8k corporate figure by 3-5x for this scope). An in-house build with a Python/JS lead plus a contracted designer and front-end developer would fall between the Indian and UAE bands in cash cost but carries schedule risk if the lead is part-time.
- Ongoing yearly cost model (platform-agnostic): hosting $600-6,000; CMS/plugin licences $400-5,000 (WordPress/Wagtail/Payload) or $1,200-15,000+ (SaaS CMS tiers with workflow); CRM $2,000-12,000 for ~10 seats; chat $0-5,000; consent $0-700; translation tooling $0-2,000; maintenance/retainer AED 30,000-72,000 ($8,000-20,000) if outsourced. Content production in two languages is the largest recurring line and is usually under-budgeted (AED 20,000-55,000/yr per the UAE source).
- Realistic calendar for TIC: 2-3 weeks of discovery/questionnaire (this proposal phase), 4-6 weeks design, 8-10 weeks build, 3-4 weeks content migration and Arabic review in parallel, 2 weeks QA/launch — about 5-6 months from approved brief, longer if office contributors are slow with content.

### Gaps
- No independent (non-agency) price survey for UAE or India was found; all benchmarks are vendor-published.
- No benchmark specific to TIC/testing-and-certification websites; the 100-400 page multilingual scope had to be mapped onto generic "group/multilingual" bands.

---

## 12. "Fully structured" admin: roles, approval, audit, media, components, templates, scheduling, preview, versions

### Takeaway
The role model TIC wants (global admin, office editor, reviewer) with approval, audit log, scheduling, preview and version history is built into Wagtail at no licence cost, available in WordPress core only partially (roles, revisions, scheduling) with plugins for approval/audit, and sold as a top-tier feature by most SaaS CMSs (Storyblok Premium, Strapi Enterprise, Sanity Enterprise for custom roles/audit).

### Cited Findings
- Wagtail: customizable moderation workflows; fine-grained permissions for who can moderate, review, publish; revision comparison and rollback; scheduled publish/expiry; site-history reports (who changed what, when) — [wagtail.org/features](https://wagtail.org/features/)
- Sanity: Growth adds Editor/Developer/Contributor roles, scheduled drafts, comments/tasks, 90-day change review; custom roles, full audit trail/History API, SSO, content releases are Enterprise — [sanity.io/pricing](https://www.sanity.io/pricing)
- Storyblok: custom workflows (2), custom roles (10), pipeline stages and field-level translation workflows only from Premium; Growth/Growth Plus have standard workflows and 2 scheduled stories — [storyblok.com/pricing](https://www.storyblok.com/pricing)
- Strapi: RBAC in Community; Releases and Content History (14 days) in Growth; review workflows and audit logs Enterprise only — [strapi.io/pricing-self-hosted](https://strapi.io/pricing-self-hosted)
- Payload: Publishing Workflows listed as an Enterprise feature; Access Control and Localization listed as general features — [payloadcms.com/cloud-pricing](https://payloadcms.com/cloud-pricing)
- WordPress: approval workflow plugin pricing (PublishPress) could not be captured; ACF PRO (structured fields/blocks) $49-249/yr — [Vendr: ACF](https://www.vendr.com/marketplace/advanced-custom-fields)
- Kinsta includes SAML SSO and just-in-time provisioning for the hosting dashboard (not the WordPress admin) — [kinsta.com/plans](https://kinsta.com/plans/)

### Inferences
- A concrete role model to put in the proposal: Global Admin (IT/web lead), Content Manager (marketing HQ, can publish anything), Office Editor (edit pages/news scoped to their office and language, cannot publish), Reviewer/Approver (regional director, approves office submissions), Translator (Arabic locale only), Viewer. Each candidate platform should be scored on whether this can be done without custom code: Wagtail yes (groups + page-tree permissions + workflows); WordPress with PublishPress + a scoping plugin; Storyblok/Sanity/Strapi only at the top tier.
- Reusable components and page templates are native to all candidates (Gutenberg blocks/patterns, StreamField blocks, Storyblok bloks, Sanity portable text, Payload blocks). The difference is whether non-technical editors can assemble pages from them without breaking design — which argues for a locked set of 15-25 approved blocks rather than a free-form page builder.
- Media library with per-office folders, alt-text enforcement (WCAG) and image optimisation should be a stated requirement; most platforms meet it but WordPress needs an image-CDN plugin or managed-host CDN for optimisation.

### Gaps
- PublishPress and other WordPress workflow/audit plugin prices and capabilities not captured.
- No hands-on comparison of editor UX was possible; the proposal should include a 1-hour demo of 2-3 finalists with an actual office editor.

---

## 13. Agency vs in-house, and where the in-house skill profile matters

### Takeaway
The evidence does not point to one answer; it points to three coherent packages, and the choice depends on two unknowns the questionnaire must resolve: how much time the in-house lead can commit over 6 months, and whether the company wants vendor independence or a single accountable supplier.

### Cited Findings
- Wagtail developer pool: 154 Clutch-listed companies (global) — [clutch.co/developers/wagtail](https://www.clutch.co/developers/wagtail); Django/Python directory exists with many pages of firms — [clutch.co/developers/python-django](https://clutch.co/developers/python-django.md)
- WordPress agencies in Dubai and India are numerous per vendor listicles (no independent count) — [Seahawk Media: WordPress companies in Dubai](https://seahawkmedia.com/wordpress/wordpress-development-companies-in-dubai/), [WPWeb Elite UAE list](https://www.wpwebelite.com/blog/wordpress-development-companies-uae)
- Managed WordPress hosts bundle security/WAF/backups (Kinsta all plans) which reduces the operational skill needed — [kinsta.com/plans](https://kinsta.com/plans/)
- Headless SaaS vendors sell dedicated support only at high tiers (Sanity $799/mo add-on; Storyblok Premium SLA) — [sanity.io/pricing](https://www.sanity.io/pricing), [storyblok.com/pricing](https://www.storyblok.com/pricing)

### Inferences
- Package A — "Modern WordPress, outsourced": UAE or Indian WordPress agency builds a block theme with ACF/WPML/Gravity Forms on Kinsta/WP Engine; lowest build cost, biggest vendor pool, highest plugin-security upkeep; the in-house lead's lack of WordPress knowledge means a maintenance retainer is mandatory.
- Package B — "Headless CMS + Next.js/Astro": content in Sanity/Storyblok/Payload, front-end on Vercel/Cloudflare/Azure; best performance and front-end freedom, matches what SGS/TÜV SÜD/QIMA do architecturally; needs a JS-capable developer on retainer or in-house; workflow/audit features cost extra on SaaS tiers (Payload self-hosted avoids that).
- Package C — "Wagtail (Django)": one codebase the in-house lead can own if Python is their strength; built-in workflows, permissions, audit, scheduling, accessibility; smaller agency pool (but global and includes India); hosting on AWS/Azure UAE regions is straightforward. Risk is key-person dependency on the in-house lead.
- Hosted builders (Webflow/Framer/HubSpot) are viable only if directors accept weaker RTL/approval evidence and SaaS lock-in in exchange for the lowest operating burden; enterprise DXPs are not proportionate for a ~13-office company at the licence levels reported.

### Gaps
- The in-house lead's actual Python/JS depth and available hours are unknown; this is the single most important unknown for the agency-vs-in-house decision.
- No vendor was contacted for quotes; all costs are published list prices or agency blog ranges.

---

## URLs visited this session (fetched successfully unless marked)

Own curl fingerprints: https://ticqc.ae · https://group.bureauveritas.com · https://www.tuvsud.com (403 Cloudflare challenge; robots.txt also challenged) · https://www.tuv.com · https://www.sgs.com · https://www.intertek.com · https://www.dnv.com · https://www.applus.com · https://www.kiwa.com · https://www.cotecna.com · https://www.qima.com

Primary pages fetched: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing · https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes · https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites · https://developers.google.com/search/docs/specialty/international/localized-versions · https://support.google.com/a/answer/81126 · https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ · https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws · https://wpengine.com/plans/ · https://kinsta.com/plans/ · https://www.sanity.io/pricing · https://www.storyblok.com/pricing · https://strapi.io/pricing-self-hosted · https://payloadcms.com/cloud-pricing · https://wagtail.org/features/ · https://app.wpml.org/purchase · https://www.intercom.com/pricing · https://crisp.chat/en/pricing/ · https://www.zoho.com/crm/zohocrm-pricing.html (prices not rendered) · https://vercel.com/pricing · https://www.cloudflare.com/plans/ (compute pricing only) · https://builtwith.com/tuvsud.com · https://api.github.com/repos/{payloadcms/payload, wagtail/wagtail, strapi/strapi, directus/directus} · https://webflow.com/pricing (raw HTML, partial) · https://www.tawk.to/pricing/ (raw HTML)

Blocked or unusable: https://www.contentful.com/pricing/ (HTTP 429 twice) · https://www.hubspot.com/pricing/content-hub (404 via fetcher; JS shell via curl) · https://www.hubspot.com/pricing/content (nav only) · https://umbraco.com/products/umbraco-cloud/pricing/ (403 / JS shell) · https://payloadcms.com/pricing (404) · https://publishpress.com/pricing/ (JS-rendered, no prices)

Search summaries used (secondary): see inline citations in each section.
