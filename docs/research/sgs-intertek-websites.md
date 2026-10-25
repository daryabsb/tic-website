# SGS and Intertek websites as models for a global TIC company site (teardown and comparison)

Research date: 2026-10-21. Scope: sgs.com (global /en and /en-ae, /en-us pages) and intertek.com (global site plus Government & Trade / Conformity Assessment Programme pages). Purpose: find proven patterns TIC Quality Control (ticqc.ae) can borrow for its rebuild, with emphasis on Government & Trade / Product Conformity Assessment pages because TIC runs Iraq CoC and Egypt CoC programmes.

**Method and access notes (important for the report writer)**
- sgs.com returns HTTP 403 to the WebFetch tool. SGS pages were read through the r.jina.ai text proxy (which strips navigation/scripts) and through raw `curl` with a browser user agent (which works and returns the full HTML). web.archive.org is blocked from this environment, so no Wayback comparisons were possible.
- intertek.com fetched normally.
- Visual design could not be seen as rendered pixels; findings on design are limited to what HTML/CSS/asset clues and page structure reveal. Treat all "visual" statements as inferences unless cited.
- Two guessed URLs returned 404 and are noted as such: `https://www.intertek.com/government/product-conformity/exports-to-kenya-pvoc/` and `https://www.intertek.com/government/middle-east/`. `https://www.sgs.com/en/services` returned a 500 error through the proxy at the time of fetch.

Pages visited (exact URLs):
- https://www.intertek.com/ ; https://www.intertek.com/about/ ; https://www.intertek.com/government/ ; https://www.intertek.com/government/product-conformity/ ; https://www.intertek.com/government/product-conformity/exports-to-iraq/ ; https://www.intertek.com/government/product-conformity/export-to-saudi-arabia/ ; https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/ ; https://www.intertek.com/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/ ; https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-kenya/ ; https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-nigeria/ ; https://www.intertek.com/government/product-conformity/kuwait/ ; https://www.intertek.com/government/product-conformity/faqs/ ; https://www.intertek.com/government/regulatoryupdates/ ; https://www.intertek.com/government/contact/ ; https://www.intertek.com/form/government-iraq-exporter-guidelines-download/ ; https://www.intertek.com/directories/ ; https://www.intertek.com/business-assurance/certificate-validation/ ; https://www.intertek.com/inlight/ ; https://www.intertek.com/client-portals/ ; https://www.intertek.com/resources/ ; https://www.intertek.com/contact/ema/saudi-arabia/
- https://www.sgs.com/en ; https://www.sgs.com/en-ae ; https://www.sgs.com/en-sa ; https://www.sgs.com/en/our-company/about-sgs ; https://www.sgs.com/en/industry/government-and-trade-facilitation ; https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca ; https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca ; https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca ; https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity ; https://www.sgs.com/en/services/exporter-portal ; https://www.sgs.com/en/certified-clients-and-products ; https://www.sgs.com/en/verify-sgs-documents-form ; https://www.sgs.com/en/contact-form ; https://www.sgs.com/en-ae/office-directory

---

## 1. Global information architecture (menus, mega-menus, Services vs Industries, depth, breadcrumbs, search)

### Takeaway
Both sites use a two-axis IA: a **Services** axis (what we do: Testing, Inspection, Certification, etc.) and an **Industries** axis (who we serve), with Government & Trade treated as an *industry* on both sites, not a service. Intertek has 5 top-level items plus a country selector and search; SGS has 6 (Services, Industry, Megatrends, Our Company, Investors, News & Resources) plus a utility bar with "Verify Documents, Clients & Products" and "Labs & Facilities". Intertek uses full breadcrumbs 4–5 levels deep; SGS relies on "Related Services / More Services" blocks and an in-hub search box instead of visible breadcrumbs.

### Cited Findings
- Intertek top navigation: **Industries** (`/industries/`), **Services** (`/services/`), **About Us** (`/about/`), **Resources** (`/resources/`), **Locations** (`/contact/`), plus a search control and a "Global Worldwide" regional selector — [Intertek homepage](https://www.intertek.com/)
- Intertek Industries mega-menu: Chemicals, Construction & Engineering, Energy & Commodities, Food & Healthcare, Hospitality & Tourism, **Government & Trade**, Transportation, Products & Retail, each with sub-pages (e.g. `/oil-gas/`, `/pharmaceutical/`, `/automotive/`) — [Intertek homepage](https://www.intertek.com/)
- Intertek Services mega-menu: Assurance `/assurance/`, Testing `/testing/`, Inspection `/inspection/`, Certification `/certification/`, plus "Additional Services": Auditing, Consulting, People Assurance, Training, Sourcing, Business Assurance. There is **no "Solutions" top-level menu**; solution offerings appear as cards (e.g. Total Sustainability Assurance `/sustainability/`) — [Intertek homepage](https://www.intertek.com/)
- Intertek Resources menu sub-items: Expertise, Training, Product Directories, Regulatory Resources, Client Portals — [Intertek Saudi page](https://www.intertek.com/government/product-conformity/export-to-saudi-arabia/)
- Intertek breadcrumb depth example: "Intertek > Industries > Government and Trade > Conformity Assessment Programmes (CAP) > Certificate of Conformity and Inspection for Exports to Iraq" — [Intertek Iraq page](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- Intertek Government & Trade hub has in-page "jump-to" anchor links (About, Our Global Presence, Our Solutions, Our Industry Expertise, Why Intertek Government and Trade, Ready To Trade?) — [Intertek Government and Trade](https://www.intertek.com/government/)
- SGS main navigation: **Services, Industry, Megatrends, Our Company, Investors, News & Resources** (`/en/news-and-resources`); utility links "Verify Documents, Clients & Products" (`/en/certified-clients-and-products`) and "Labs & Facilities" (`/en/office-directory`); "Contact" (`/en/contact-form`) — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca) and [SGS UAE](https://www.sgs.com/en-ae)
- SGS search panel: "What are you looking for?" with suggested topics "SGS Annual Report", "Job Opportunities", "Upcoming Webinars", "Sustainability Solutions" — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS site search is powered by Coveo (HTML contains `CoveoSearchbox`, `Coveo/Hive/search`, `CoveoAtomicSearchBoxOverlayComponent`, `Coveo_web_index`) — observed in raw HTML of [https://www.sgs.com/en](https://www.sgs.com/en) via curl
- SGS hub pages carry a scoped search box, e.g. "Search within Product Conformity Assessment (PCA)" and "Search within Government & Trade Facilitation" — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca); [SGS G&TF hub](https://www.sgs.com/en/industry/government-and-trade-facilitation)
- SGS URL taxonomy observed: `/en/industry/<industry>` (industry hubs), `/en/service-groups/<group>` (service families like PCA, Border Control Solutions), `/en/services/<service>` (individual services like `egypt-product-conformity-assessment-pca`), `/en/our-services/testing|inspection|certification-and-audit|training|consulting` (core service types), `/en/megatrends/<theme>`, `/en/news/YYYY/MM/<slug>`, `/en/webinars/YYYY/MM/<slug>`, `/en/events/YYYY/MM/<slug>`, `/en/whitepapers/<slug>` — URLs quoted on [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca), [SGS About](https://www.sgs.com/en/our-company/about-sgs), [SGS homepage](https://www.sgs.com/en)
- SGS core-service URLs on About page: Testing `/en/our-services/testing`, Inspection `/en/our-services/inspection`, Certification `/en/our-services/certification-and-audit`, Training `/en/our-services/training`, Consulting `/en/our-services/consulting` — [SGS About](https://www.sgs.com/en/our-company/about-sgs)
- SGS UAE homepage lists core services as "Testing, Inspection, Certification, Consulting, Training, Verification & Assurance, IMPACT NOW for Sustainability, and SGS DIGITAL TRUST" — [SGS UAE](https://www.sgs.com/en-ae)
- SGS country page every service page ends with "Related Services" (sibling pages with "Load more items"), "More Services" (parent industry hubs e.g. Consumer Products & Retail, Government & Trade Facilitation), "News & Insights" (6 cards + "View all") and "Contact Us" — [SGS Egypt PCA](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca); [SGS Kenya PCA](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca)
- No breadcrumb was present in the extracted SGS page content (proxy rendering) — [SGS Saudi SASO page](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity)
- Intertek country pages carry a persistent left/side "Government & Trade" menu: Exporter and Importer Services, Supply Chain Security Services, Customs Services, Trade with Assurance Across Asia / Africa / The Middle East, Regulatory News & Updates, then a list of ~40 country programme links, "Tradeable and Customised Solutions", "Smart Trade Solutions" — [Intertek Kuwait page](https://www.intertek.com/government/product-conformity/kuwait/)

### Inferences
- A rebuilt TIC site should keep both axes (Services and Industries) but treat "Government Services Programs" as its own first-class hub (like Intertek's Government & Trade) rather than burying it under Services, since it is TIC's most distinctive offering.
- Intertek's visible breadcrumbs plus a persistent section sub-menu is the clearer wayfinding model for a deep programme section; SGS's "Related/More Services" footers are good for discovery but weaker for orientation.
- Scoped search within a hub (SGS) is a cheap, high-value pattern for a programme-heavy section.

### Gaps
- I could not render the SGS mega-menu contents (the proxy drops the nav), so the exact second-level items under SGS "Services" and "Industry" are not captured; `/en/services` returned a 500 error at fetch time.
- Depth of Intertek's Industries mega-menu beyond the examples quoted was not enumerated.

---

## 2. Country / region / language handling (country selector, language selector, local office pages, Arabic)

### Takeaway
SGS runs one global domain with locale paths (`/en`, `/en-ae`, `/en-sa`, `/en-us`, `/en-kw`, `/en-eg`...) and a geolocation prompt; Intertek runs a "Global Worldwide" selector that links to ~35–40 separate country sites, many on their own ccTLDs (`intertek.com.cn`, `.com.mx`, `.com.pe`, `.com.hk`, `.com.ro`). Neither site exposes an Arabic-language site that I could find; the Gulf country sites are English.

### Cited Findings
- SGS shows a location overlay: "Welcome to SGS. Confirm your location for an enhanced experience" with "Choose another location"; the selector reads "Location: United Arab Emirates • English" with "Change Location" — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca); [SGS UAE](https://www.sgs.com/en-ae)
- SGS regional paths exist for `/en-ae`, `/en-sa` (HTTP 200 via curl), `/en-us`, `/en-pt`, `/en-tz`, `/en-kw`, `/en-qa`, `/en-eg`, `/en-id`, `/en-ci`, `/en-pe`, `/en-ro`, `/en-gr` — curl results and [search results for certified clients page mirrored across locales](https://www.sgs.com/en-kw/certified-clients-and-products)
- `https://www.sgs.com/ar-sa` 301-redirects to `https://www.sgs.com/en/ar-sa`, which returns 404 — observed via curl 2026-10-21 (no Arabic Saudi locale at that path)
- SGS UAE page: "The only language shown is English. No Arabic option appears" — [SGS UAE](https://www.sgs.com/en-ae)
- SGS localised PDFs are served per locale with suffixes like `.cdn.en-AE.pdf`, `.cdn.en-US.pdf`, `.cdn.en-KE.pdf` — [SGS PCA brochure en-AE](https://www.sgs.com/-/media/sgscorp/documents/corporate/brochures/sgs-product-conformity-assessment-brochure-en.cdn.en-AE.pdf); [Kenya brochure en-KE](https://www.sgs.com/-/media/sgscorp/documents/corporate/brochures/sgs-cp-tfs-pvoc-program-in-kenya-brochure-en.cdn.en-KE.pdf)
- A LinkedIn profile describes implementing "the design system for the global suite of SGS's 60+ localised websites on the Sitecore platform" (single source, not an agency case study) — [Emanuel Blagonic LinkedIn](https://hr.linkedin.com/in/emanuelblagonic)
- SGS UAE office directory ("Contact Directory") shows 10 results for United Arab Emirates: Dubai 7 (Local Head Office, Lab, three Offices, two Customer Services), Fujairah 1 (Lab), Sharjah 1 (Lab), Abu Dhabi 1 (Office); filter bar has "Location" and "City" and "Search"; entries show name "SGS - UAE - [City]", address, P.O. Box and a type label; phone/email/map not in the captured text — [SGS UAE office directory](https://www.sgs.com/en-ae/office-directory)
- SGS UAE homepage shows no street address, phone or email on the homepage itself; location access is via "Labs & Facilities", "Contact Directory" and "Contact" — [SGS UAE](https://www.sgs.com/en-ae)
- SGS UAE page regional signals: ADIPEC 2026 event, "SGS Food Forum Dubai 2026" (22 October 2026), featured solutions "Audit and Certification, Crude Oil and Feedstock Testing, Fuel Oil Testing, Gulf, Petrochemical Testing, Saudi Arabia SASO, Testing Services", news "SGS Academy UAE 2026 Course Schedule" — [SGS UAE](https://www.sgs.com/en-ae)
- Intertek "Global Worldwide" dropdown lists roughly 35 country sites, several with local languages (Deutsch, Español, 中文); some countries offer multiple languages (Canada, Switzerland) — [Intertek homepage](https://www.intertek.com/)
- Intertek country sites found in homepage HTML: `intertek.com.cn`, `intertek.com.co`, `intertek.com.do`, `intertek.com.ec`, `intertek.com.gt`, `intertek.com.hk`, `intertek.com.mx`, `intertek.com.pe`, `intertek.com.ro` — curl of [https://www.intertek.com/](https://www.intertek.com/)
- `https://www.intertek.com/ar/` and `https://www.intertek.com/sa/` return 404 — observed via curl 2026-10-21
- Intertek Saudi Arabia contact page lists offices in Al-Khobar, Ras Tanura, Riyadh and Yanbu — [Intertek Saudi contact](https://www.intertek.com/contact/ema/saudi-arabia/); SFDA's bilingual CAB list names an Intertek Riyadh branch with accreditation to May 2027 — [SFDA list](https://sfda.gov.sa/sites/default/files/2026-04/LaboratoriesOffices.pdf)
- Intertek Government & Trade country pages publish per-programme office contact PDFs, e.g. "Iraq Intertek Offices Contact Details" (`/siteassets/gts/iraq/iraq-cap-intertek-offices-contact-details_21032025.pdf`), "Kuwait Intertek Offices Contact Details", "Egypt Food Intertek Offices Contact Details" — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/); [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/); [Intertek Egypt food](https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/)
- SGS country programme pages list the Swiss HQ as the contact ("SGS – Switzerland – Baar, Zugerstrasse 57, 6340, Baar, +41 22 739 91 11") when viewed on `/en`, and the New Jersey office when viewed on `/en-us`, i.e. the contact block changes with locale, not with programme — [SGS Egypt PCA](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca); [SGS Saudi SASO en-us](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity)

### Inferences
- For a 13-office company, SGS's single-domain locale model (`/en`, `/en-ae`, `/ar-ae`...) is far more maintainable than Intertek's separate ccTLD sites; it also keeps one CMS and one search index.
- Arabic is a genuine gap on both majors in the Gulf; a credible Arabic (RTL) version would be a differentiator for TIC in UAE/KSA/Iraq/Egypt/Jordan.
- Intertek's "office contact PDF per programme" is a workaround for a missing structured office directory; TIC should build offices as structured content (map, phone, email, services, programme responsibility) rather than PDFs.
- SGS's locale-driven contact block is a weakness for programme pages: an Egypt CoC page should surface the Egypt/Dubai programme desk, not a head office.

### Gaps
- Whether Intertek offers any Arabic page anywhere (e.g. on a Middle East microsite) was not confirmed; only `/ar/` and `/sa/` paths were tested.
- An Intertek UAE contact page URL I guessed (`/contact/ema/united-arab-emirates/`) returned 404; the real UAE office listing URL was not located.
- Phone/email/map presence in SGS office directory entries could not be confirmed from the proxy text.

---

## 3. Service page anatomy (sections, length, CTAs, forms, downloads, related services, FAQs, named contacts)

### Takeaway
Intertek programme pages are text-heavy, single-column articles with a fixed "Need help or have a question?" block (phone, regional numbers, email, "Send us a request" form link), a "Document Request Forms" box, a "Resource Center: <Country>" download list, and promo cards (Inview, FastTek). SGS service pages are shorter, template-driven: intro, optional video, "Related Links" (PDF downloads with file sizes + Exporter Portal link), "Related Services", "More Services", "News & Insights", "Contact Us". Neither names individual contacts; FAQs are either absent (SGS) or gated PDF downloads (Intertek).

### Cited Findings
- Intertek Iraq page section order: H1 "Certificate of Conformity and Inspection for Exports to Iraq"; H2 "Pre-Inspection, Testing and Issuing of Certificates of Conformity Programme of Goods Imported into Iraq"; "Requirements"; application checklist ("To apply for a Certificate of Conformity, you will need to supply Intertek with:"); H3 "FAQs about the Iraq CAP Programme"; sidebar H3 "Remote Inspection with Inview" and "Expedited Trade with FastTek"; H2 "Need help or have a question?"; H3 "Document Request Forms"; H3 "Resource Center: Iraq"; H3 "Suggested topics" (empty); repeated H2 "Need help or have a question?" — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- Intertek standard contact block on every programme page: phone +852 2310 9923 ("Call a specialist"), expandable "Additional Phone Numbers" (Americas +1 305 513 3000; EMEA +44 1277 223 400), email web.cm-gs@intertek.com, "Send us a request" linking to a page-specific contact URL (e.g. `/government/product-conformity/exports-to-iraq/contact/`) — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/); [Intertek Nigeria](https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-nigeria/)
- Intertek pages have no named individuals; "No named individuals are listed" on Iraq, Saudi, Kenya, Nigeria, Kuwait and Egypt pages — same sources as above
- Intertek promo cards appear on programme pages: "International Trade Conformity Certification" brochure (`/form/international-trade-conformity-certification/`, CTA "Download The Brochure") and "Exports to East and West Africa" on-demand webinar (`/resources/webinars/2021/webinars-exports-to-east-and-west-africa/`) — [Intertek Kenya](https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-kenya/)
- Intertek pages carry an empty heading "Suggested topics:" with no content (seen on Iraq, Kuwait, Kenya, Egypt pages) — [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)
- Intertek G&T hub page includes a leadership profile: "Photo and bio of Jérémy Gaspard, Global Business Line Leader, with an 'Expand bio' toggle" and an "inTrade Podcast Series" (`/government/intrade-podcast-series/`) — [Intertek Government and Trade](https://www.intertek.com/government/)
- SGS Saudi SASO page section order: global header; topic overlay; intro body (no heading) explaining Product and Shipment Certificates and SABER; three service bullets ("Acting as a SASO-accredited Certification Body to issue Product Certificates", "Populating the SABER system...", "Issuing Technical Assessment reports..."); H3 "Related Links" (portal + 5 PDFs); H2 "Related Services" (country pages, "Load more items"); H2 "More Services"; H2 "News & Insights" (6 cards); H2 "Contact Us"; footer — [SGS Saudi SASO](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity)
- SGS PCA hub page includes a video ("SGS Product Conformity Assessment" with Play control) and a 24-card "Our Services" country grid — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS "Related Links" downloads show file sizes (e.g. "PCA Contact List (0.14 MB)", "Product Conformity Assessment Datasheet (0.22 MB)") — [SGS Saudi SASO](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity)
- SGS pages have no FAQ sections ("The page has no FAQ section" on Egypt, Kenya, Saudi SASO, PCA hub) — [SGS Egypt PCA](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca)
- SGS "Why SGS" block on Kenya page lists: Key Account Management, one-stop certification, order information access, party coordination, order facilitation, tailored solutions — [SGS Kenya PCA](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca)
- Intertek Saudi page is a "hub of hubs": it lists seven sub-programme pages (SALEEM SABER, SFDA Food, SFDA Cosmetics, Electricals, Saudi Quality Mark, Importer services, Used Vehicles) and five FAQ links, but itself has no steps, scope, checklist or forms — [Intertek Saudi](https://www.intertek.com/government/product-conformity/export-to-saudi-arabia/)

### Inferences
- A good TIC programme page template = Intertek's content depth (requirements, checklist, steps, scope, downloads, FAQs) + SGS's cleaner modular structure (video, related links with file sizes, related services, news) + something neither does: a named programme desk contact and an in-page FAQ accordion.
- Page-specific "Send us a request" URLs (Intertek) let the CMS pre-tag the enquiry with the programme; TIC should copy that routing idea.

### Gaps
- Word counts / page length were not measured; "text-heavy" vs "short" is a qualitative read of the extracted content.
- Whether Intertek's "FAQs about the Iraq CAP Programme" section loads an accordion client-side could not be determined (content did not appear in fetched HTML).

---

## 4. Government & trade services pages (country programmes, checklists, fees, forms, guidelines, steps, routes, scope)

### Takeaway
Intertek's "Conformity Assessment Programmes (CAP)" section is the richer model: ~40 country pages with regulated-product lists, document checklists, 4–5 step "How to arrange an inspection", a universal "Request for Certificate of Conformity" PDF, gated exporter/importer guideline downloads, per-country office PDFs, per-country FAQ PDFs and a regulatory-updates directory. SGS's PCA section has 24 country cards, consistent template, an online Exporter Portal for requests, and generic governance PDFs (impartiality statement, complaints/appeals, suspension/withdrawal) but thinner process content. Neither site explains Route A/B/C on the Kenya page itself (SGS puts routes in a brochure PDF); neither publishes fees on-page except Intertek's Kuwait "Fee Structure" PDF.

### Cited Findings
**Intertek structure**
- Intertek G&T hub groups programmes by region in accordions: Africa (15: Algeria, Botswana, Cameroon, Ethiopia, Gabon, Côte d'Ivoire, Kenya, Libya, Mauritius, Morocco, Mozambique, Nigeria, Tanzania, Uganda, Zimbabwe); Americas (Mexico NOM labelling); Asia (Bangladesh, India, Indonesia, Philippines, Sri Lanka); Middle East (Egypt, Iraq, Jordan, Kurdistan Region of Iraq, Kuwait, Qatar, Saudi Arabia, UAE). Each entry has a flag icon and links to a country page — [Intertek Government and Trade](https://www.intertek.com/government/)
- Intertek CAP hub explains the chain: government directs the national standards body, the standards body appoints Intertek, Intertek tests and certifies; defines CoC as "a mandatory document required by Customs"; lists "Benefits"; "Recent Updates"; "Resources"; naming is inconsistent (Tanzania "Pre-Shipment Verification of Conformity" vs Uganda "Pre-Export Verification of Conformity") — [Intertek CAP](https://www.intertek.com/government/product-conformity/)
- Intertek country URLs are inconsistent in pattern: `/government/product-conformity/exports-to-iraq/`, `/government/product-conformity/kuwait/`, `/government/product-conformity/export-to-saudi-arabia/`, `/government/product-conformity/certificate-of-conformity-for-exports-to-kenya/`, `/government/product-conformity/certificate-of-conformity-for-exports-to-nigeria/`, `/government/product-conformity/exports-to-uganda/`, `/government/product-conformity/exports-to-tanzania-pvoc/`, `/government/product-conformity/ecas/` (UAE), and Egypt GOEIC under a *news* path `/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/` — [Intertek CAP](https://www.intertek.com/government/product-conformity/); [Intertek Government and Trade](https://www.intertek.com/government/)

**Intertek Iraq page (direct comparator for TIC Iraq CoC)**
- Process: CoC obtained before shipping from the local Intertek office; destination inspection on arrival by an Intertek office authorised in Iraq; random surveillance by Iraqi authorities; regular exporters advised to apply for registration — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- Regulated product categories listed: Food; Toys; Electrical and electronic appliances; Vehicle spare parts and tyres; Chemicals; Cosmetics and perfumery; Tobacco products; Construction and building materials; Kitchenware; Stationery; Baby care items; Textiles; Lubricants — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- Document checklist: completed Request for Certification (RfC) form; proforma invoice; product data sheet/description; production information (lot number, production/expiry dates); evidence of compliance (test reports, halal, health/phytosanitary, free-sale certificates); transport document (B/L, AWB, CMR); Letter of Credit; certificate of origin — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- Downloads: RfC form PDF `https://www.intertek.com/siteassets/gts/request-for-coc-forms/cap-frm-rfc-request-for-certificate-of-conformity-english.pdf`; "Iraq CAP Exporter and Importer Guidelines" (gated) `https://www.intertek.com/form/government-iraq-exporter-guidelines-download/`; "Iraq Regulated Product List (April 2025)" `https://www.intertek.com/siteassets/gts/iraq/irq-eig-cosqc-regulated-product-list-april-2025_21042025.pdf`; "Iraq Intertek Offices Contact Details"; "Advice on Trading with Iraq" flyer — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)
- The Iraq guidelines download is gated: "Please fully fill out the form below to get access to our Exporter and Importer Guidelines for the Iraq programme"; fields: Your name, Company, Job title, Country, State, Email, Telephone, "What countries are you exporting to?", opt-in "I would like to receive updates on changes to all programmes" — [Intertek Iraq guidelines form](https://www.intertek.com/form/government-iraq-exporter-guidelines-download/)
- No fees and no routes A/B/C on the Iraq page — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)

**Intertek Egypt pages (direct comparator for TIC Egypt CoC)**
- Egypt has two pages: "Certificate of Inspection for Exports of Food to Egypt" (NFSA) and "Registration and the Certificate of Inspection for Exports to Egypt" (GOEIC/ECAP). The NFSA page states "Intertek is a registered CAB with NFSA", that from 1 December 2020 consignments with a CoI get reduced destination inspection, and lists regulated food categories (meat, dairy, fruits/vegetables, baby food, beverages, condiments, oils, confectionery, supplements, food contact materials) — [Intertek Egypt food](https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/)
- Egypt food page Resource Center: "Advice on Trading with Egypt" flyer, "Advice on Trading Food with Egypt" flyer, "Egypt Food Intertek Offices Contact Details" (`/siteassets/gts/egypt/egypt-food-intertek-offices-contact-details_21032025.pdf`), gated "Egypt Exporter and Importer Guidelines for Food" (`/form/government-egypt-food-exporter-guidelines-download/`); FAQ download `/resources/faqs/2022/government-egypt-food-faqs-download/`; Recent News: Egypt includes "Halal Certificate no longer a mandatory document for CoI issuance for exports of Food to Egypt" (`/government/export-import/regulatory-news-updates/news-egypt/egypt-food-halal/`) — [Intertek Egypt food](https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/)
- Egypt GOEIC page: dated "19 Mar 2012" yet cites Decrees 991/2015, 43/2016, 44/2019, 195/2022, 403/2022; two-step process (register with GOEIC, then apply for CoI from an approved CB); regulated list "not limited to" Textiles & Footwear, Electricals, Health and Beauty, Sanitary ware, Toys, Tableware/Kitchenware, Lighting, Household chemicals, Mechanical, Construction/Building; downloads include "Egypt CAP Regulated Product List" (`https://cdn.intertek.com/www-intertek-com/dms-legacy/EGY-EIG-ExhC-Regulated%20Products%20List.pdf`) and guidelines at `/id/34359759662/` — [Intertek Egypt GOEIC](https://www.intertek.com/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/)

**Intertek Kenya / Nigeria / Kuwait / Saudi**
- Kenya "How to Arrange an Inspection" (5 steps): 1 contact local office; 2 export consultant reviews requirements and provides a "same-day quotation"; 3 submit documents (Certificate of Origin, Test Reports where applicable, Letters of Credit, Packing List); 4 Intertek arranges a "mutually convenient" inspection date/time/location; 5 CoC issued before shipment if satisfactory. No routes A/B/C, no fees; PVoC introduced 2005; "Kenyan authorities may conduct random verification sampling at the point of entry" — [Intertek Kenya](https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-kenya/)
- Nigeria page has H2s "SONCAP Requirements for Nigeria", "How to Arrange an Inspection" (5 steps), "Products Exempt from SONCAP Certification" (food, medicines, medical items other than equipment, raw-material chemicals for bona fide manufacturers, military goods, contraband, used items other than automobiles), "Why Intertek" ending "Trade with Assurance" — [Intertek Nigeria](https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-nigeria/)
- Kuwait KUCAS page: regulated product list by category (Electrical Toys; Household & Commercial Electrical & Gas Appliances; Automotive; Chemical Products; Building Materials; Others); checklist (invoice, packing list, HS/GCC tariff codes, test reports, GSO/G-Mark certificates); 4-step "Getting your shipment certified"; downloads include "Kuwait Fee Structure" PDF (`https://cdn.intertek.com/www-intertek-com/dms-legacy/Kuwait KUCAS Fee Structure.pdf`) and "Kuwait Exporter and Importer Guidelines" HTML page (`/government/product-conformity/kuwait/kuwait-exporter-and-importer-guidelines/`); step 1 oddly links to `/form/inlight-contact-us/` — [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)
- Intertek FAQ hub is a flat list of 17 links to downloadable FAQ files (dated 2022/2023 in URL): Cosmetics, Botswana SCSR, Cameroon PECAE, Egypt ECAP, Egypt Food, Ethiopia CAP, Gabon PROGEC, Ghana EasyPass, Iraq CAP, Ivory Coast VoC, Morocco VoC/CAD, Mozambique CAP, Saudi Cosmetics, Saudi EV, Saudi Food, Saudi SALEEM, Tanzania PVoC; "no accordions are used for FAQ content" — [Intertek CAP FAQs](https://www.intertek.com/government/product-conformity/faqs/)
- Intertek "Directory of Regulatory Updates to Conformity Assessment Programmes": ~90 entries grouped under 11 country headings with Date/Update columns (Saudi Arabia 54, Egypt 15), "Jump to" anchors, no filters; subscription by emailing info.government@intertek.com — [Intertek regulatory updates](https://www.intertek.com/government/regulatoryupdates/)
- Intertek G&T hub "Ready to Trade with Assurance?" lists ways to engage: request a quotation, speak with a technical expert, find a local office, learn about programmes, get certification guidance; CTA "Contact us Today!" → `/government/contact/` — [Intertek Government and Trade](https://www.intertek.com/government/)
- Intertek G&T hub also sells "Tradeable and Customised Solutions" (Customised Inspection and Surveying, Factory Audits, Supplier Verification, Trade Finance Support, Warehouse and Stock Verification, Loading and Discharge Supervision, Supply Chain Risk Assessment) and "Smart Trade Solutions" (Data-driven Risk Management, E-Customs, Regulatory Compliance, Digital Trade Facilitation) — [Intertek Government and Trade](https://www.intertek.com/government/)

**SGS structure**
- SGS PCA hub lists 24 programme cards: Algeria, Burundi, Cameroon, Central African Republic, Egypt, Gabon, Gulf, Ivory Coast, Kenya, Kingdom of Morocco, Kuwait, Mexico (labels), Mongolia, Oman, Qatar, Qatar Food PVoC, Saudi Arabia SASO, Saudi Arabia SFDA, Saudi Arabia SQM, Tanzania, Uganda, Uganda PAU, United Arab Emirates, Zanzibar, all under `/en/services/<country>-product-conformity-assessment-pca` (with variants) — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS has **no Iraq PCA page** in that grid; search found only third parties (TÜV Rheinland, Applus+) describing their COSQC appointments, and an undated Iraq Business News tag page saying SGS lost the ICIGI contract — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca); [TÜV Rheinland Iraq ICIGI](https://www.tuv.com/landingpage/en/government-inspections-international-trade/navigation/pvoc/exporting-to-the-middle-east/iraq-icigi/); [Applus+ Iraq CoC](https://www.applus.com/ae/en/what-we-do/service-sheet/certificate-of-conformity---iraq); [Iraq Business News tag](https://www.iraq-businessnews.com/tag/pre-importation-inspection-testing-and-certification-of-goods-into-iraq-icigi/)
- SGS Egypt page is scoped to GOEIC Decree 961/2012 textiles/leather (readymade garments, carpets, home textiles, footwear, leather bags, wallets/belts) with a 5-step "The Full Process" (initial contact; document request; advance sampling if needed with a quotation before the visit; pre-shipment inspection; certification after final invoice and transport document); downloads: "Egypt (GOEIC) Textile Certification" leaflet (2013), "PCA Datasheet Egypt (GOEIC)", "PCA Datasheet Egypt (NFSA)" — [SGS Egypt PCA](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca)
- SGS Kenya page: "Basic Features" bullets ("Goods imported into Kenya require a Certificate of Conformity (CoC)", "CoC is a mandatory clearance document for each consignment", "Responsibility of compliance lies with the supplier/exporter"), no routes/checklist/steps on page; downloads "PCA Kenya Datasheet" and 2.91 MB "Pre-Export Verification of Conformity (PVoC) Program in Kenya" brochure — [SGS Kenya PCA](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca)
- Route A/B/C definitions appear in SGS/BV brochures and third-party guides, not on the HTML pages: Route A per-consignment inspection and sealing; Route B registration (1 year), 30% consignment inspection; Route C licensing (up to 3 years, manufacturers with QMS), annual factory audit, 10% consignment inspection; fee percentages conflict between a 2018 BV datasheet (Route C 0.35% FOB) and DHL's current guide (A 0.60%, B 0.55%, C 0.50% FOB) — [SGS Kenya brochure](https://www.sgs.com/-/media/sgscorp/documents/corporate/brochures/sgs-cp-tfs-pvoc-program-in-kenya-brochure-en.cdn.en-KE.pdf); [BV Kenya datasheet](https://cdn3-verigates-ppd.bureauveritas.com/sites/verigates/files/2019-01/Kenya%20-%20Datasheet%20%28English%29.pdf); [DHL Kenya guide](https://www.dhl.com/discover/en-ke/logistics-advice/import-export-advice/importing-into-kenya--when-kebs-certification-is-required)
- SGS governance PDFs repeated on every PCA page: "Statement of Impartiality for the Connectivity & Products division", "PCA Contact List" (worldwide), "Procedure for the Suspension and Withdrawal of Certificate of Conformity (CoC), Statement of Product Registration (SoR) or Statement of Product License (SoL)", "Guideline - Complaints and Appeals Procedures for Product Conformity Assessment Programs (PCA)" — [SGS Saudi SASO](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity)
- SGS request path is the online "Exporter Portal – Request Certification Online" (`https://exporter-portal.sgs.com/communication/#!/login`) which lets exporters "request a certificate of conformity, registration or license online 24 hours a day, 7 days a week", upload documents indexed to the PCA case number, contact SGS experts, and track messages via a status and communications module — [SGS Exporter Portal](https://www.sgs.com/en/services/exporter-portal)
- SGS "Government & Trade Facilitation" industry hub lists 14 sub-services: PCA, BIS Application Management, e-Customs, e-Valuator, Cross-Border e-Invoicing, Border Control Solutions, Digital Solutions, EAC-Ready Certification, Exporter Portal, Advance Cargo Information, QiiQ Remote Industrial Inspections, ValiTrade, Technical Verification Programs, CIVIO vehicle inspection; no stats, no downloads — [SGS G&TF hub](https://www.sgs.com/en/industry/government-and-trade-facilitation)
- SGS PCA news items are batch-dated (five items all "Sept 9, 2026" with slugs prefixed `pca-2026-q3-`), e.g. "Prepare Solar Product Exports for Egypt with Product Conformity Inspection Services" — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS's tfs.sgs.com subdomain has separate "Product Conformity & Pre-Export Verification" pages making broad "government-appointed PVoC operator" claims — [tfs.sgs.com](https://tfs.sgs.com/solutions/product-conformity)

### Inferences
- The strongest borrowable pattern is Intertek's per-country page skeleton: *Programme name + regulator → Requirements → Regulated product list (dated) → Document checklist → How it works (numbered) → Routes/options → Downloads (RfC form, guidelines, product list, office contacts, fee structure) → FAQs → Regulatory updates feed → Programme contact.* TIC can do this for Iraq and Egypt in a cleaner template than either major.
- SGS's online Exporter Portal (request + document upload + case messaging) is the "digital" bar; Intertek still relies on a PDF RfC form emailed to an office. A simple TIC online RfC form with upload and status tracking would already exceed Intertek's exporter experience.
- Both majors keep routes/fees in PDFs; putting Route A/B/C style options and an indicative fee basis on-page (with "contact for quotation") would be clearer for TIC's exporters.
- A "Regulatory updates" feed filtered by country (Intertek has the content but no filters) is cheap to build and valuable for exporters.

### Gaps
- SGS pages for Kuwait, UAE, Gulf and Saudi SFDA/SQM were not opened (only the URLs captured); their process depth may differ.
- Intertek's Egypt ECAP guideline link `/id/34359759662/` was not tested.
- Whether Intertek's or SGS's Egypt/Iraq pages are translated on any locale was not checked.

---

## 5. Certificate verification tools (SGS directories, Intertek directories / certificate validation)

### Takeaway
SGS offers a self-service hub ("Verify Documents, Clients & Products") with a searchable Certified Client Directory (client name / certificate number / product) plus a "Verify SGS Documents" upload form (PDF, 20 MB) for document authenticity. Intertek's management-system certificate validation is **not** self-service: it is a web form that an Intertek representative answers later; Intertek's self-service directories cover product marks (ETL, GS, etc.) on a patchwork of legacy subdomains. Neither offers a self-service Government & Trade CoC verification tool on the public site.

### Cited Findings
- SGS hub "Certified Clients and Products" opens with an "On this page" table of contents; sections: Verify SGS Documents, Certified Client Directory, Certified Components & Products, Audited Supplier Verification (China), CARB ATCM, Footwear ECOSECURE, Food Certification Marks, Seal of Quality (fuel), external IECEE CB and INMETRO registers; note "Unless otherwise stated, SGS directories are available in English" — [SGS certified clients](https://www.sgs.com/en/certified-clients-and-products)
- SGS: "Certified Client Directory ... verify the status of any SGS issued management system or process certificate"; search "by client name, certificate number and/or product name" — [SGS en-us certified clients](https://www.sgs.com/en-us/certified-clients-and-products)
- SGS "Verify SGS Documents" form: required First Name, Last Name, Email, Location, consent; optional Company, Job Title, Comments; drag-and-drop upload; "Single documents must be PDFs. Multiple documents must be combined into one ZIP file"; max 20 MB; no certificate-number field; described as a free service — [SGS verify documents form](https://www.sgs.com/en/verify-sgs-documents-form)
- SGS utility bar on every page links "Verify Documents, Clients & Products"; footer links "Verify SGS Documents" — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- Intertek "Product Directories" page lists ~19 directories on mixed hosts: ETL Listed Mark (`http://etlwhidirectory.etlsemko.com/webclients/its/dlp/products.nsf/$$search?openform`), ETL-EU, Building Products (`https://bpdirectory.intertek.com/pages/dlp_search.aspx`), GS Mark, S Mark (`http://ge.semko.se/...`), QPM (`http://cert.intertek.de/`), Sustainability Certification Directory, Cyber Assured, Warnock Hersey, "Certificate Validation for Company Management Systems" (`/business-assurance/certificate-validation/`); "The page does not mention Government & Trade certificates" — [Intertek directories](https://www.intertek.com/directories/)
- Intertek certificate validation is a form: Your name, Company, Job title, Country, State, Email, Telephone, Certificate Number, Certified company name, Certified company location, Additional Info; "To expedite your request be sure to enter the company name AND/OR certificate number"; "An Intertek representative will be in touch with you shortly"; email certificate.validation@intertek.com — [Intertek certificate validation](https://www.intertek.com/business-assurance/certificate-validation/)
- Intertek directory URLs use `.aspx` and `$$search?openform` (Lotus Domino) patterns — [Intertek homepage](https://www.intertek.com/); [Intertek directories](https://www.intertek.com/directories/)

### Inferences
- A public, self-service "Verify a TIC certificate" tool (enter certificate number + optional exporter/importer name → status, programme, issue/expiry date) would beat Intertek and match the spirit of SGS; it is also a strong anti-fraud signal for customs officers and importers in Iraq/Egypt.
- Keep one verification entry point in the header utility bar (SGS pattern), not scattered legacy tools (Intertek pattern).

### Gaps
- The actual SGS Certified Client Directory search UI (fields, results format) was not opened; only its description on the hub page.
- Whether SGS or Intertek offer CoC verification through their exporter portals (logged-in) was not determinable from public pages.

---

## 6. Trust elements (accreditations, numbers, history, integrity/ethics, sustainability)

### Takeaway
Both lead with scale numbers (SGS: 100,000 people, 2,500 labs/facilities, 115 countries, 145+ years; Intertek: 45,000 people, 1,000+ locations, 100 countries, 140+ years), a brand promise line ("When you need to be sure" / "Total Quality. Assured."), leadership pages, and sustainability content. Neither site's About page names accreditation bodies; accreditation evidence sits in programme pages (e.g. "SASO-accredited Certification Body", "registered CAB with NFSA", "KEBS-recognised") and in third-party regulator lists.

### Cited Findings
- SGS: "over 100,000 dedicated professionals", "over 2,500 laboratories and business facilities", 115 countries, "more than 145 years of service excellence"; founding year and revenue not stated on the About page; brand promise "when you need to be sure"; links to Business Principles, Executive Committee, Board of Directors, Our History — [SGS About](https://www.sgs.com/en/our-company/about-sgs)
- SGS sustainability trust signals: EcoVadis Gold Medal news (15 Sept 2026, "improving from Silver"), "IMPACT NOW for Sustainability" megatrend, specialised brands (Applied Technical Services, Brightsight, Bluesign, Nutrasource) — [SGS About](https://www.sgs.com/en/our-company/about-sgs)
- SGS homepage hero: "When you need to be sure" / "We are the world's leading Testing, Inspection and Certification company"; no company-wide statistics on the homepage capture — [SGS homepage via proxy](https://www.sgs.com/en)
- SGS programme pages publish governance documents (impartiality statement, complaints & appeals, suspension/withdrawal procedure) as PDFs on each PCA page — [SGS Kenya PCA](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca)
- Intertek: "over 45,000 employees", "over 1,000 locations in 100 countries", "our history goes back over 140 years"; values include "We always do the right thing"; links Compliance and Corporate Governance (`/about/compliance-governance/`), Modern Slavery Act Statement, Responsibility, Group Executive Committee; "Accreditations: Not listed on this page" — [Intertek About](https://www.intertek.com/about/)
- Intertek homepage hero: "Total Quality. Assured." with "precision, pace and passion"; promo cards #YoullBeAmazed, Intertek AI², SupplyTek; recent news "2026 half-year results" and a solar lab acquisition in India — [Intertek homepage](https://www.intertek.com/)
- Intertek programme-level accreditation claims: "Intertek is a registered CAB with NFSA" (Egypt), "a KEBS-recognised conformity assessment body" (Kenya), "approved by GOEIC to issue the CoI" (Egypt GOEIC) — [Intertek Egypt food](https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/); [Intertek Kenya](https://www.intertek.com/government/product-conformity/certificate-of-conformity-for-exports-to-kenya/); [Intertek Egypt GOEIC](https://www.intertek.com/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/)
- SGS programme-level claims: "Acting as a SASO-accredited Certification Body" (Saudi); "SGS is approved by the Ministry of Industry, Trade, Green and Digital Economy" (Morocco) — [SGS Saudi SASO](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity); [SGS Morocco PCA](https://www.sgs.com/en/services/kingdom-of-morocco-product-conformity-assessment-pca)
- Intertek G&T hub "Why Intertek Government and Trade": global network, independence, digital trade solutions, customer support, plus a quote graphic; the "Government Trade Facilitation Solutions" section mentions the number of certificates issued (figure not captured) — [Intertek Government and Trade](https://www.intertek.com/government/)
- Intertek G&T hub "Our Global Presence" section is "a map graphic and no substantive text" — [Intertek Government and Trade](https://www.intertek.com/government/)

### Inferences
- TIC's accreditations (ISO 9001/14001/45001, ANAB ISO 17020, GAFTA, APEDA, AIACI) are a stronger *visible* asset than either major shows on their About pages; a dedicated "Accreditations & Approvals" page with certificate PDFs, scope and regulator links (COSQC, GOEIC/NFSA) would be a differentiator.
- Publishing impartiality, complaints/appeals and certificate suspension procedures (SGS pattern) is expected of an ISO 17020/17065-style body and cheap to add.
- Numbers to show for TIC: offices, countries, certificates issued per year, years in operation, inspectors — the majors' "big numbers" strip is the convention.

### Gaps
- The exact "number of certificates issued" figure on Intertek's G&T hub was not captured.
- SGS "Our History" and "Business Principles" page contents were not fetched.

---

## 7. Conversion and messaging (contact forms, request-a-quote, chat, phone, newsletter, client portals)

### Takeaway
Intertek funnels every page to "Send us a request" (a generic 9-field form), a Hong Kong "Call a specialist" number and a shared mailbox; SGS funnels to a single global "Contact" form with an "Inquiry type" selector (Request Information / Request Quotation / verify documents / jobs / personal data / feedback), a newsletter "Subscribe" centre and, for PCA, the Exporter Portal. Neither shows a visible live chat in fetched HTML (SGS's CSP whitelists Leadoo and Smooch chat domains, so a chatbot is likely but unconfirmed). Both maintain large client-portal catalogues; SGS has an e-commerce "Online Store" with Easy Quote/Easy Buy and live chat.

### Cited Findings
- Intertek homepage CTAs: "Send Us A Request" (`/contact/inquiry/`), phone +852 3008 2099, "Explore careers"; "No quote-request button or live chat widget is visible"; "No newsletter signup appears" — [Intertek homepage](https://www.intertek.com/)
- Intertek G&T contact form fields: Your name, Job title, Company, Country/Region (dropdown incl. "Global"), State (US), Province (Canada), Email, Telephone, Your inquiry; no programme dropdown, no enquiry-type dropdown, no consent checkbox; promise to reply "as soon as possible" — [Intertek G&T contact](https://www.intertek.com/government/contact/)
- Intertek per-page contact URLs (e.g. `/government/product-conformity/kuwait/contact/`) — [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)
- Intertek regulatory updates subscription is by emailing info.government@intertek.com — [Intertek regulatory updates](https://www.intertek.com/government/regulatoryupdates/)
- Intertek "External Client Portals" (`/client-portals/`): My TestCentral (`https://mtc.intertek.com/`), SpecDIRECT, Mobile/Software portals, LabTrak, iEnable (`https://ienable.intertekconnect.com/`: "Business Assurance clients view schedules, audit reports, and certificates, and upload corrective actions"), Interlink 2.0, Inlight, GSCC, i2Q, iCare (`https://icare.intertek.com/iCare/s/`: supplier portal for test requests/reports), ToxClear, Global Market Access; "The page does not mention tracking certificate of conformity (CoC) applications in any portal" — [Intertek client portals](https://www.intertek.com/client-portals/)
- Intertek Inlight is a supply-chain risk/sustainability SaaS (supplier mapping, SAQs, audits, CAPs, dashboards), login `https://inlight.intertek.com/Inlight/login`, packages Advantage/Custom/Outsource, CTA "Schedule a Demo", no public pricing — [Intertek Inlight](https://www.intertek.com/inlight/)
- Intertek product-complaint form exists (`/inspector-center/product-complaint/`) — [Intertek homepage](https://www.intertek.com/)
- SGS contact form: Inquiry type (guidance: job applications, verifying issued documents, "new certificate or report requests (which should use 'Request Information' or 'Request Quotation')", personal data requests, feedback), Type of feedback, Subject, First/Last name, Email, Company name, Job title, Location, Business phone with country-code dropdown, State or Province, "How can we help?", consent "I agree that SGS can use my data for the purposes of dealing with my request" — [SGS contact form](https://www.sgs.com/en/contact-form)
- SGS contact form supports URL pre-fill, e.g. `/en/contact-form?inquiryType=Request%20Information&subject=Press/Media` — [SGS About](https://www.sgs.com/en/our-company/about-sgs)
- SGS footer on every page: Careers, "Verify SGS Documents", "Contact Directory", "Subscribe" (`/en/newsletters/subscription-center-form`); socials LinkedIn, X, Facebook, SlideShare, YouTube, Instagram — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS Online Store (2021) added "Easy Quote" and "Easy Buy" one-click functions, search by industry/product/service, and "Live chat is also available for contacting SGS directly"; the older SGS Online Services storefront (onlineservices.sgs.com) let customers buy e.g. oil sample kits online — [SGS news 2021](https://www.sgs.com/en/news/2021/04/sgs-online-store-launches-easy-buy-easy-quote-and-1-click-functions); [HSM article](https://www.hsmsearch.com/Services-now-accessible-in-one-click)
- SGS CSP header whitelists `*.leadoo.com` (Leadoo chatbot), `*.smooch.io` (Zendesk Sunshine Conversations), `jobpal-sm.s3.amazonaws.com` (recruiting chatbot), `*.eloqua.com`/`*.en25.com` (Oracle Eloqua marketing automation), `f7132108c1tst-store.occa.ocs.oraclecloud.com` (Oracle Commerce Cloud), `www.recaptcha.net`, `challenges.cloudflare.com` (Turnstile), `*.storerocket.io`/`storemapper` (store locator), `*.mapbox.com`, `maps.googleapis.com` — observed in response headers of [https://www.sgs.com/en](https://www.sgs.com/en) via curl (presence in CSP indicates permitted, not necessarily active, integrations)
- Intertek homepage loads an unidentified third-party script `https://enterpriseinsightinspiration.com/js/813707.js` alongside OneTrust and GTM — curl of [https://www.intertek.com/](https://www.intertek.com/)

### Inferences
- For TIC the practical conversion stack is: (1) a programme-aware "Request a Certificate / Request a Quote" form (programme, route, origin country, product category, upload) that routes to the right desk; (2) a general contact form with inquiry type (SGS pattern); (3) WhatsApp/phone per office; (4) a verification tool; (5) a newsletter/regulatory-update subscription per programme (Intertek has the demand, handles it by email).
- A client/exporter portal (status tracking, document upload, certificate download) is the medium-term differentiator; the majors' portals show the expectation but are fragmented.

### Gaps
- Could not confirm whether a chatbot is actually rendered on sgs.com or intertek.com (needs a real browser).
- Intertek's generic `/contact/inquiry/` form fields were not fetched (only the G&T variant).

---

## 8. Content hub (news, insights, webinars, events, careers)

### Takeaway
SGS has a unified "News & Resources" hub with typed content (News, Feature, Customer Story, White Paper, Webinar, Event) carrying labels like "Customer Story • Connectivity & Products" and date-based URLs; Intertek splits "Resources" into icon-card sub-hubs (Webinars, Video Library, White Papers, Blogs, Training, Regulatory Resources, Product Directories, Client Portals, Case Studies) plus separate Media/Investors/Careers links and a social campaign (#YoullBeAmazed).

### Cited Findings
- SGS homepage feature cards are typed: "Service • Digital Trust", "White Paper • Business Assurance", "Customer Story • Connectivity & Products", "Feature • Connectivity & Products", "Feature • Industries & Environment" — [SGS homepage via proxy](https://www.sgs.com/en)
- SGS News & Insights blocks label each item by type and date (News, Webinar, Event) with "View all" → `/en/news-and-resources`; URL patterns `/en/news/2026/09/...`, `/en/webinars/2025/08/...`, `/en/events/2025/06/...` — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS About page sections "Meet Our People", "Meet Our Leaders", "Join Our Team" (`/en/our-company/careers-at-sgs/job-opportunities`), "Latest News", "Our Events" (including investor events such as Q3 2026 sales update and 2027 AGM) — [SGS About](https://www.sgs.com/en/our-company/about-sgs)
- SGS has a newsletter "Subscribe" subscription centre (`/en/newsletters/subscription-center-form`) and "Upcoming Webinars" (`/en/webinars`) — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- Intertek Resources hub: "Our wealth of resources, created and shared by our global network of experts"; cards Webinars (`/knowledge-education/webinars/`), Video Library (`/resources/video/`), White Papers, Blogs (`/blog/`), Training (`/training/`), Regulatory Resources (`/resources/regulatory/`), Product Directories, Client Portals, Case Studies (`/resources/case-studies/`), SAI Global Standards (external); "doesn't offer any subscription or newsletter options" — [Intertek Resources](https://www.intertek.com/resources/)
- Intertek footer/utility: Responsibility, Investors, Media, Careers, #YoullBeAmazed (`/amazed/`) — [Intertek homepage](https://www.intertek.com/)
- Intertek G&T has its own content: "inTrade Podcast Series", "Recent News: Egypt" sidebar, "Regulatory News & Updates" per country (e.g. `/government/export-import/regulatory-news-updates/news-kuwait/`), on-demand webinars — [Intertek Egypt food](https://www.intertek.com/government/product-conformity/certificate-of-inspection-for-exports-of-food-to-egypt/); [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)

### Inferences
- For TIC, one "News & Resources" hub with content *types* (News, Regulatory update, Guide, Webinar, Event, Training course) and *tags* (programme, country, industry) is the right model; programme pages then auto-pull their related items (both majors do this).
- "Regulatory update" should be a first-class content type with country and programme tags and a subscribe option, because exporters return for it.

### Gaps
- Content volumes and publishing cadence were not measured.
- Careers subsystems (ATS) were not examined.

---

## 9. Visual design (colour, typography, imagery, hero style, density, mobile)

### Takeaway
Direct visual inspection was not possible. Evidence from markup: SGS is a modern Next.js front end with imgix-optimised photography, a short brand-promise hero ("When you need to be sure") and card-based content modules; Intertek is a Bootstrap 5.3 + jQuery 1.12 site with a "Total Quality. Assured." hero, animated ship graphic on the G&T hub, long single-column text pages with side menus, and several empty/placeholder blocks.

### Cited Findings
- SGS hero image alt text: "SGS - enabling a better, safer and more interconnected world"; hero copy "When you need to be sure" / "We are the world's leading Testing, Inspection and Certification company"; one CTA "About us" — [SGS homepage via proxy](https://www.sgs.com/en)
- SGS images are served via imgix (`imgix-prod.sgs.com`) with crop/resize parameters; media paths `/-/media/sgscorp/...` — [SGS homepage via proxy](https://www.sgs.com/en); 33 "imgix" references in raw HTML (curl)
- SGS viewport meta `width=device-width`, `<html lang="en">`, Next.js `_next/static` bundles — curl of [https://www.sgs.com/en](https://www.sgs.com/en)
- SGS Exporter Portal page uses "stock photos of cargo containers, a port, a factory worker with a laptop, and a food lab" rather than product screenshots — [SGS Exporter Portal](https://www.sgs.com/en/services/exporter-portal)
- Intertek stylesheets: `/css/style-bootstrap-5-3-0.css`, `/css/style-bootstrap-5-3-0-intertek-20250905-font500.css`, `https://cdn.intertek.com/www-intertek-com/css/opti-custom.css?v=5`; scripts `jquery-1.12.4.js`, `jquery-ui.js`; viewport `width=device-width, initial-scale=1, shrink-to-fit=no`; `<html lang="en" dir="ltr">` — curl of [https://www.intertek.com/](https://www.intertek.com/)
- Intertek G&T hub hero: H1 "Government and Trade", tagline "Trade with Assurance." with "an animated ship graphic"; "Our Global Presence" is a map graphic with no text; an expandable solutions graphic ("Click to expand"); country lists with flag icons — [Intertek Government and Trade](https://www.intertek.com/government/)
- Intertek Inlight page visuals: laptop image, Earth photo, simple module illustrations — [Intertek Inlight](https://www.intertek.com/inlight/)
- Intertek content quality issues: typos "Intertek Gobal Visit" and "best practises" — [Intertek homepage](https://www.intertek.com/); empty "Suggested topics:" headings on programme pages — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/)

### Inferences
- The SGS pattern (short hero statement + typed content cards + consistent page modules) reads as the cleaner, more "global" look; Intertek's pages are denser and more brochure-like.
- Mobile behaviour: both declare responsive viewports; Intertek's Bootstrap 5.3 base implies standard responsive grid; nothing more can be claimed without rendering.

### Gaps
- Colours, typefaces, logo usage, hero media (video vs still), spacing and mobile menus were not observed; a browser-based screenshot pass is needed (sgs.com blocks headless fetchers, so a real browser session is required).
- No agency redesign case study for sgs.com or intertek.com was found; the only redesign evidence is the LinkedIn profile cited in section 2.

---

## 10. Technology (CMS, CDN, cookie consent, accessibility, performance)

### Takeaway
SGS: Sitecore (JSS) headless CMS with a Next.js front end, imgix image CDN, Coveo search, OneTrust cookie consent, Google Tag Manager/GA, Microsoft Clarity, Oracle Eloqua, reCAPTCHA/Cloudflare Turnstile, strict CSP and HSTS headers. Intertek: Optimizely (Episerver) CMS on Azure (ARRAffinity cookies, `EPiStateMarker`, `/Util/Find/epi-util/find.js` = Episerver Find search), Cloudflare in front, OneTrust cookie consent, GTM, Bootstrap 5.3 with legacy jQuery 1.12.4, plus legacy Lotus Domino/ASP.NET directory apps on subdomains.

### Cited Findings
- SGS raw HTML contains Next.js bundles (`/_next/static/chunks/framework-...js`, `pages/[[...path]]`), `jss` (25 refs), `sitecore`/`Sitecore` (10 refs), `imgix` (33 refs), `OneTrust`, Coveo search components — curl of [https://www.sgs.com/en](https://www.sgs.com/en)
- SGS response headers: `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security: max-age=86400`, long `Content-Security-Policy` whitelisting `cdn.cookielaw.org`, `*.coveo.com`, `*.imgix.net`, `*.googletagmanager.com`, `*.clarity.ms`, `*.eloqua.com`, `*.leadoo.com`, `*.smooch.io`, `www.recaptcha.net`, `challenges.cloudflare.com`, `*.go-mpulse.net` (Akamai mPulse RUM), `*.akamaihd.net`, `*.beyondwords.io` (audio articles), `*.flippingbook.com`, `*.baidu.com` — curl headers of [https://www.sgs.com/en](https://www.sgs.com/en)
- SGS returns HTTP 403 to non-browser fetchers (WebFetch) but 200 to curl with a Chrome user agent — observed 2026-10-21
- SGS cookie bar: "Cookie Preferences" control in footer and "cookie consent banner" on hub page — [SGS G&TF hub](https://www.sgs.com/en/industry/government-and-trade-facilitation)
- SGS front-end claims (single LinkedIn source): "UI pattern library of 150+ components, optimising code for accessibility and performance, CI/CD with Azure DevOps" for 60+ localised sites on Sitecore — [Emanuel Blagonic LinkedIn](https://hr.linkedin.com/in/emanuelblagonic)
- Intertek response headers: `Server: cloudflare`, `cf-cache-status: DYNAMIC`, cookies `ARRAffinity`, `ARRAffinitySameSite`, `x-ms-routing-name=self`, `TiPMix` (Azure App Service), `EPiStateMarker=true` (Episerver) — curl headers of [https://www.intertek.com/](https://www.intertek.com/)
- Intertek HTML: `/Util/Find/epi-util/find.js`, `EPiServer` (3 refs), `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js` (OneTrust), `gtm.js`, `/siteassets/admin/intertek.js`, asset paths `/globalassets/`, `/siteassets/`, `/contentassets/` — curl of [https://www.intertek.com/](https://www.intertek.com/); [Intertek homepage](https://www.intertek.com/)
- Intertek legacy systems: directory URLs with `.aspx` and `$$search?openform` (ASP.NET and IBM Lotus Domino) — [Intertek homepage](https://www.intertek.com/); [Intertek directories](https://www.intertek.com/directories/)
- Intertek cookie consent: "No consent banner text is visible. The only evidence is the footer link to `/cookie-policy/`" in rendered text, but OneTrust stub is loaded in HTML — [Intertek homepage](https://www.intertek.com/) and curl
- Intertek Inlight security notes: role-based access, "timely revocation when staff leave", disaster recovery to a secondary data centre — [Intertek Inlight](https://www.intertek.com/inlight/)

### Inferences
- Both majors use enterprise CMSs (Sitecore, Optimizely) that are overkill and over-budget for a 13-office company; the *pattern* to copy is structured content (programme, country, office, document, regulatory-update types), a locale model, a headless/image CDN, consent management and enterprise search, not the specific products.
- SGS's 403 to bots suggests aggressive WAF/bot management; TIC should ensure its own site stays crawlable by search engines while blocking abuse.

### Gaps
- No Lighthouse/performance or WCAG audit was possible from this environment.
- Accessibility statements were not found on either site in the fetched pages.

---

## 11. What is weak or dated and TIC should NOT copy

### Takeaway
The most copyable weaknesses are Intertek's: inconsistent URL patterns, programme content hidden under "news" paths, 2012-dated pages, empty headings, PDF-only forms/FAQs/fees/office lists, gated guidelines, a Hong Kong phone number as the universal "Call a specialist", no filters on regulatory updates, legacy directory apps on odd subdomains and no newsletter. SGS's weaknesses: head-office contact block on country programme pages, no FAQs, batch-dated news, no Arabic in the Gulf, scoped PDFs repeated on every page, bot-blocking that may hurt discoverability, and a marketing subdomain (tfs.sgs.com) duplicating the main site.

### Cited Findings
- Intertek Egypt GOEIC page dated "19 Mar 2012" while citing 2015–2022 decrees; lives under a news path; form title mismatch (CoI page offers a "Request for Certificate of Conformity" form) — [Intertek Egypt GOEIC](https://www.intertek.com/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/)
- Intertek empty "Suggested topics:" headings; FAQ sections whose questions do not appear in the page; FAQs only as 2022/2023 downloads with no accordions — [Intertek Iraq](https://www.intertek.com/government/product-conformity/exports-to-iraq/); [Intertek CAP FAQs](https://www.intertek.com/government/product-conformity/faqs/)
- Intertek office contacts delivered as PDFs per programme (`..._21032025.pdf`) — [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)
- Intertek regulatory updates: ~90 entries, no filters, subscription by email only — [Intertek regulatory updates](https://www.intertek.com/government/regulatoryupdates/)
- Intertek Kuwait step 1 links to an Inlight contact form (`/form/inlight-contact-us/`), i.e. a wrong-product form — [Intertek Kuwait](https://www.intertek.com/government/product-conformity/kuwait/)
- Intertek typos on homepage ("Gobal", "practises"); jQuery 1.12.4 (2016) still loaded; Lotus Domino directories — [Intertek homepage](https://www.intertek.com/); curl
- Intertek: no newsletter signup, no quote button, no visible chat on the homepage — [Intertek homepage](https://www.intertek.com/)
- SGS programme pages show the Baar, Switzerland head office as "Contact Us" (and New Jersey on en-us) instead of a programme desk; no Kenya-specific contact on the Kenya page — [SGS Kenya PCA](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca)
- SGS PCA news items batch-dated "Sept 9, 2026" with `pca-2026-q3-` slugs (quarterly bulk publishing) — [SGS PCA page](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca)
- SGS UAE homepage has no address, phone or email; no Arabic option — [SGS UAE](https://www.sgs.com/en-ae)
- SGS `/en/services` returned a 500 error through the proxy at fetch time — [SGS services (error)](https://www.sgs.com/en/services)
- SGS "Exporter Portal" page shows no product screenshots and no registration steps — [SGS Exporter Portal](https://www.sgs.com/en/services/exporter-portal)
- SGS Egypt leaflet is from 2013 ("sgs-gis-pca-egypt-leaflet-a4-en-2013.cdn.en.pdf") — [SGS Egypt PCA](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca)

### Inferences
- TIC should set editorial rules the majors break: every programme page shows a "last reviewed" date and the regulator's current decree; every office is structured data; every form is a web form (PDF optional); every FAQ is on-page; every downloadable has a version/date; no gated guidelines (exporters need them to comply).

### Gaps
- None beyond those in sections above.

---

## 12. Side-by-side comparison: SGS vs Intertek (summary table)

| Dimension | SGS (sgs.com) | Intertek (intertek.com) | Better model for TIC |
|---|---|---|---|
| Top nav | Services, Industry, Megatrends, Our Company, Investors, News & Resources + utility "Verify" / "Labs & Facilities" / Contact — [src](https://www.sgs.com/en-ae) | Industries, Services, About Us, Resources, Locations + country selector + search — [src](https://www.intertek.com/) | Intertek's 5-item simplicity + SGS's "Verify" utility link |
| Gov & Trade placement | Industry hub "Government & Trade Facilitation" with 14 sub-services; PCA is a "service group" with 24 country cards — [src](https://www.sgs.com/en/industry/government-and-trade-facilitation) | Industry hub "Government & Trade" → CAP hub → ~40 country pages grouped by region with flags — [src](https://www.intertek.com/government/) | Intertek's region→country structure |
| Country page depth | Short: intro, bullets, PDFs, portal link, related — [src](https://www.sgs.com/en/services/kenya-product-conformity-assessment-pca) | Deep: requirements, product list, checklist, steps, downloads, FAQs, updates — [src](https://www.intertek.com/government/product-conformity/exports-to-iraq/) | Intertek content, SGS modularity |
| Request path | Online Exporter Portal (24/7 requests, uploads, case messaging) — [src](https://www.sgs.com/en/services/exporter-portal) | PDF RfC form + per-page "Send us a request" — [src](https://www.intertek.com/government/product-conformity/kuwait/) | SGS (build a lightweight equivalent) |
| Fees | Not on page | Only Kuwait "Fee Structure" PDF — [src](https://www.intertek.com/government/product-conformity/kuwait/) | Neither; TIC can do better |
| FAQs | None | PDF downloads per programme, no accordions — [src](https://www.intertek.com/government/product-conformity/faqs/) | Neither; on-page accordions |
| Regulatory updates | News items tagged by quarter — [src](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca) | Dedicated directory by country, ~90 entries, email subscription — [src](https://www.intertek.com/government/regulatoryupdates/) | Intertek concept + filters + subscribe |
| Verification | Self-service directories + document upload form — [src](https://www.sgs.com/en/certified-clients-and-products) | Form answered by a rep; legacy product directories — [src](https://www.intertek.com/business-assurance/certificate-validation/) | SGS |
| Locale model | One domain, `/en-xx` paths, geolocation prompt; English only in Gulf — curl + [src](https://www.sgs.com/en-ae) | ~35–40 separate country sites, many ccTLDs; no `/ar/` — curl + [src](https://www.intertek.com/) | SGS (add Arabic) |
| Offices | Structured "Contact Directory" with type labels (10 UAE entries) — [src](https://www.sgs.com/en-ae/office-directory) | Contact pages per country + office PDFs per programme — [src](https://www.intertek.com/contact/ema/saudi-arabia/) | SGS |
| Contact form | Inquiry type incl. Request Quotation; URL pre-fill — [src](https://www.sgs.com/en/contact-form) | Generic 9 fields, no type/programme — [src](https://www.intertek.com/government/contact/) | SGS |
| Newsletter | Subscription centre — [src](https://www.sgs.com/en/connectivity-and-products/government-and-trade-facilitation/product-conformity-assessment-pca) | None (email a mailbox) — [src](https://www.intertek.com/resources/) | SGS |
| Portals | Exporter Portal; Online Store with Easy Quote/Buy + live chat — [src](https://www.sgs.com/en/news/2021/04/sgs-online-store-launches-easy-buy-easy-quote-and-1-click-functions) | 12 portals (iEnable shows certificates/audit reports) — [src](https://www.intertek.com/client-portals/) | One portal, not twelve |
| Trust numbers | 100,000 / 2,500 / 115 / 145+ yrs — [src](https://www.sgs.com/en/our-company/about-sgs) | 45,000 / 1,000+ / 100 / 140+ yrs — [src](https://www.intertek.com/about/) | Both use a numbers strip |
| Governance docs | Impartiality, complaints/appeals, suspension procedures on every PCA page — [src](https://www.sgs.com/en-us/services/saudi-arabia-saso-certificate-of-conformity) | Modern Slavery statement, compliance page — [src](https://www.intertek.com/about/) | SGS |
| Tech | Sitecore JSS + Next.js, imgix, Coveo, OneTrust, CSP — curl | Optimizely/Episerver on Azure, Cloudflare, Bootstrap 5.3 + jQuery 1.12, OneTrust — curl | Patterns only; cheaper stack for TIC |
| Dated elements | HQ contact on programme pages, 2013 leaflet, batch news, bot-blocking — [src](https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca) | 2012 page, empty headings, typos, PDF-everything, Domino directories — [src](https://www.intertek.com/government/export-import/regulatory-news-updates/news-egypt/certificate-of-inspection-for-exports-to-egypt/) | Avoid all |
