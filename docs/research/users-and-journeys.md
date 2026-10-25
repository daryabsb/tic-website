# TIC Quality Control website rebuild: who visits a TIC website and what each visitor needs

Research date: 2026-10-21. Scope: personas and user journeys for the CONTENT side of the website proposal. Evidence is cited inline; anything not cited is marked as an inference. Research only; nothing here is a design.

Note on evidence quality: almost no independent, published user research exists on inspection-company websites specifically. The sources that do exist are (a) competitor programme pages and datasheets (marketing material, but they reveal what exporters are asked for), (b) government scheme documents (COSQC, GOEIC, DGFT, GAFTA), (c) general B2B usability research (Nielsen Norman Group), and (d) messaging-platform statistics (vendor-published). Personas below are therefore built from scheme documents plus inference, and the proposal should validate them with a short internal questionnaire to TIC's own office managers (they talk to these visitors daily).

## Baseline: what ticqc.ae offers today (to anchor the gap)

### Takeaway
The current site is English-only, has no WhatsApp link, no contact form visible on the homepage, no certificate verification tool, no client portal, no careers page, and no downloadable exporter forms other than two policy PDFs.

### Cited Findings
- Header menu: Home, About, Industries (Oil & Gas, Marine, Food, Commodities & Consumer products, Vehicle and Automotive Inspection), Services (Government Services Programs: Iraq CoC, Egypt CoC/CoI, Botswana CoC, Libya CoI; Business Assurance: Halal Certification, CSUAS; Training), News & Media, Contact. "Testing" appears only as a homepage card, not in the menu. — [ticqc.ae](https://ticqc.ae/)
- Contact methods: phone numbers for UAE (+971 4 225 5555), India, Pakistan, Saudi Arabia; emails obfuscated by Cloudflare; no WhatsApp; no visible contact form on the homepage; no CTA beyond "Learn more" and "More news". — [ticqc.ae](https://ticqc.ae/)
- Languages: English only. Certificate verification: none. Client portal: none. Careers: none. Downloads: Impartiality Policy (PDF), QMS Policy (PDF). — [ticqc.ae](https://ticqc.ae/)
- Offices listed: Dubai (Clover Bay Tower), Sharjah (Hamriyah Free Zone), Baghdad, Guangzhou, Noida, Gandhidham, Lahore, Amman, Riyadh, Cairo, São Paulo, Maharagama (Sri Lanka), Bangkok, Kuala Lumpur. — [ticqc.ae](https://ticqc.ae/)
- Accreditation logos shown: ISO 9001, ISO 14001, ISO 45001, ANAB, GAFTA, APEDA, AIACI. — [ticqc.ae](https://ticqc.ae/)

### Inferences
- The site is structured around what TIC does (industries, services) rather than around what a visitor is trying to do (get a CoC, verify a certificate, book an inspection, download a form). This matches the NN/g diagnosis that companies "design for themselves rather than for customers" (see B2B evidence below).

### Gaps
- Could not fetch the Contact page or inner service pages in this pass (only the homepage was fetched). A full page-by-page audit is another researcher's task.

## Key Question 1: Visitor types and what each needs (personas)

### Takeaway
A TIC website serves at least 13 distinct visitor types with very different goals. The high-volume, revenue-driving visitors are exporters/manufacturers and their forwarders who need a CoC or pre-shipment inspection fast; the high-trust visitors are customs officers, banks, regulators and procurement teams who need to verify something. Each group needs a different landing point, a different document set, and a different contact channel.

### Cited Findings (evidence used to build the personas)
- Iraq CoC document set an exporter must supply (Intertek): completed Request for Certification (RfC) form; proforma invoice; product data sheet; production details (lot number, production/expiry dates); evidence of compliance (test reports, halal, health, phytosanitary or free-sale certificates); transport document (B/L, AWB, CMR) if available; Letter of Credit if available; country of origin certificate. Exporters with regular shipments are advised to apply for registration. Page offers "Call a specialist" and "Send us a request"; no WhatsApp, WeChat, email or downloadable RfC form. — [Intertek HK, CoC Iraq](https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/)
- Iraq CoC document set (HQTS): RFC form, commercial invoice, packing list, exporter's statement, conformity documents (test reports, quality certificates, analysis reports, health/phytosanitary certificates, free-sale certificates), LC if available. Process: Apply, Document review (1-2 working days), Inspection (inspector supervises loading; on-site or sample testing), Certification (5 working days after submission). CTA: "Contact us today" plus form with Name, Email, Phone, Company, Country, Product, Message. Audience is the exporter; importers are not addressed. — [HQTS Iraq COC guide](https://www.hqts.com/iraq-coc-what-you-need-to-know)
- Iraq CoC: physical inspection is required when conformity documents are missing or unacceptable; full testing at an ISO 17025 lab may then be needed; markings and product identification are inspected (Bureau Veritas VOC datasheet Rev 6.7, May 2024). — [Bureau Veritas Iraq VOC Rev 6.7](https://cdn2-verigates.bureauveritas.com/sites/verigates/files/2024-05/IRAQ%20%28VOC%29%20Rev%206.7.pdf) (PDF fetched as binary; content taken from search snippet, not verified in full)
- Iraq CoC exporter eligibility (TÜV Austria): exporter should be the manufacturer or a trader that can document a strong link with the manufacturer; a valid QMS such as ISO 9001 is expected. — [TÜV Austria India](https://in.tuvaustria.com/?p=15080)
- Iraq: certified consignments are re-examined at Iraqi ports and borders ("Destination Inspections") and Iraqi authorities conduct random shipment surveillance. — [Intertek HK](https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/); [TÜV Austria](https://in.tuvaustria.com/?p=15080)
- Number of COSQC-appointed bodies is stated inconsistently by providers ("only four" per HQTS; "one of only three" in a 2020 HQTS advertorial). — [HQTS service page](https://www.hqts.com/services/iraq-certificate-of-conformity/); [Iraq Business News 2020](https://www.iraq-businessnews.com/?p=162223)
- Egypt (GOEIC) per-shipment flow (SGS): exporter contacts inspection office; office requests test reports, technical sheets, supplier info, proforma invoice; if documents fall short, inspector arranges sampling and testing; quote is paid; final pre-shipment inspection; certificate issued on receipt of final invoice and transport document. Rules: GOEIC does not allow amendments to the certificate (check the draft); certificate date cannot exceed physical inspection date by more than 45 days; fees are borne by seller/producer and quoted at nomination. — [SGS Egypt PCA datasheet](https://www.sgs.com/-/media/sgscorp/documents/corporate/brochures/sgs-gis-pca-egypt-datasheet-a4-en-19-v5.cdn.en-IQ.pdf); [TÜV Rheinland Egypt CoI](https://www.tuv.com/market-access-services/fr/main-navigation/conformity-assessment/export-or-import-to/egypt/egypt-certificate-of-inspection-(coi))
- Egypt: two routes exist, physical inspection of every consignment at origin with samples tested at an ISO 17025 lab, or a manufacturer whitelist route where the exporter declares manufacturer names/addresses. — [SGS Egypt PCA](https://www.sgs.com/services/egypt-product-conformity-assessment-pca)
- GAFTA: "In order to comply with Gafta contract terms, parties to the contract must use the services of a Gafta Approved Superintendent"; the public register can be searched by Analysts, Fumigators and Superintendents and filtered by country; GAFTA encourages traders to "look for the logo". — [GAFTA approved registers](https://www.gafta.com/approved-registers/); [GAFTA superintendents register](https://www.gafta.com/approved-registers/superintendents/)
- India: DGFT Appendix 2G lists approved Pre-Shipment Inspection Agencies with head-office address, email, public notice number and validity date; recognition lasts three years; Public Notice 08/2026-27 (8 May 2026) enlisted 14 new PSIAs and removed expired ones. — [DGFT Appendix 2G (Aug 2026)](https://content.dgft.gov.in/Website/Appendix_2G_as_on_07_08_2026.pdf); [TaxGuru on PN 08/2026-27](https://taxguru.in/dgft/dgft-notifies-enlistment-14-agencies-pre-shipment-inspection-agencies.html)
- India has in the past refused PSI certificates from named agencies (including Intertek, and a Bureau Veritas Madagascar office) after wrong certificates were issued, showing that regulators actively police inspection bodies and that approved-list status is a live trust signal. — [DGFT notice](https://content.dgft.gov.in/Website/32.pdf); [TaxGuru PN 27 of 2011](https://taxguru.in/dgft/public-notice-27-re201020092014-dated-04022011.html)
- Certificate verification practice at a global player: Intertek certificates state validity "may be confirmed via email at certificate.validation@intertek.com or by scanning the code" (QR printed on the certificate); GOTS warns that "there have been cases of invalid certificates which have been faked or manipulated" and promises a response on authenticity within two business days. — [GOTS, Intertek listing](https://global-standard.org/certification-and-labelling/approved-certification-bodies/intertek-testing-services-na-inc); [Volex ISO cert showing Intertek validation line](https://www.volex.com/media/fzcp1qvq/iso-9001-2015-certificate-volex-singapore.pdf)
- Procurement prequalification (ADNOC, via consultancies, not official): current UAE trade licence with activities matching the services offered; ownership/structure/management details for integrity due diligence; VAT TRN; quality and HSE manuals or certifications such as ISO; audited financial statements for two years; Ministry of Labour employee list and org chart; relevant experience and resources. "There is no single document list that applies identically to every supplier." — [Shuraa ADNOC vendor registration](https://www.shuraa.com/adnoc-vendor-registration-uae/); [Enggpro ADNOC guide](https://www.enggpro.com/blogs/how-to-register-as-a-vendor-with-adnoc/)
- ISO/IEC 17020 accreditation: buyers check the accreditation body's published schedule of accreditation for the actual scope; a new edition ISO/IEC 17020:2026 was published 6 April 2026, so buyers may ask which edition applies. — [UKAS schedule example](https://www.ukas.com/wp-content/uploads/schedule_uploads/973238/23041-Inspection-Body-Single.pdf); [ISO 17020 listing](https://www.iso.org/ru/standard/17020)
- B2B website research (NN/g): visitors "check a vendor's website first when considering doing business with it"; incomplete product descriptions cause skepticism; registration barriers and lead-gen forms before content drive people away; missing pricing is "the most user-hostile element of most B2B sites"; pricing ranked highest of 28 information types; the site must serve several roles (researcher, approver, purchaser, user). — [NN/g B2B usability](https://www.nngroup.com/articles/b2b-usability/) (2006 study; NN/g says the newer report edition keeps the same conclusions)
- SGS publishes a complaints/appeals path for PSI: complaint to local department manager, then appeal to Managing Director, response normally within 2 working days or a result within 10 working days. — [SGS PSI appeal form](https://www.sgs.es/-/media/global/documents/technical-documents/technical-datasheets/sgs-gis-psi-appealform.pdf)

### Persona table

Columns: top questions they bring; documents they want to download; action they want to take; likely device and language; trust signals. Entries marked (inf.) are inferences from the cited scheme documents and regional evidence, not directly surveyed.

| # | Persona | Top 5 questions | Downloads wanted | Action wanted | Device / language (inf. unless cited) | Trust signals |
|---|---|---|---|---|---|---|
| 1 | Exporter / manufacturer shipping to Iraq (China, India, UAE, Turkey, Pakistan, SE Asia) | Is my product on the regulated list? What documents do I send? How long does it take and what does it cost? Where is the nearest TIC office to my factory/port? Are you really COSQC-appointed? | RfC form, product category list, document checklist, process flow, sample certificate | Submit RfC or ask for a quote today; often while a shipment is already booked | Mobile-heavy in India/Pakistan/SE Asia; desktop in China offices; English, Chinese, Hindi/Urdu optional | COSQC appointment statement, office in Baghdad for destination inspection, turnaround promise (HQTS cites 1-2 days doc review, 5 days certification), ISO 17020 scope |
| 2 | Exporter / manufacturer shipping to Egypt (GOEIC CoI) | Is my product in scope? Whitelist (registration) or shipment-by-shipment? Who pays and when? Can I correct a certificate (no: GOEIC does not allow amendments)? What is the 45-day rule? | Application form, document list, whitelist/registration guide, FAQ | Nominate TIC for inspection; get a quote; register as manufacturer | Same as #1; Arabic for Egyptian manufacturers re-exporting | GOEIC-approval statement, Cairo office, clear fee explanation |
| 3 | Importer in Iraq / Egypt / Gulf | Can I nominate the inspection body? Can I check my supplier's certificate is real? What happens at destination inspection? Who do I call in Baghdad/Cairo/Riyadh? | Importer guide, destination inspection explainer | Verify a certificate; contact local office; nominate TIC to the supplier | Mobile, WhatsApp-first; Arabic expected (inf. from 75% WhatsApp use among nationals in Egypt/KSA/UAE) | Local phone number, Arabic page, certificate verification tool |
| 4 | Freight forwarder / customs broker | Which inspection body is approved for this destination? Can you inspect at my CFS/port on this date? What does customs need to see at border? Can I track status for my client? | Scheme one-pagers per country, booking form, status tracking | Book inspection; check status; forward link to client | Mobile and desktop; English plus local language | Fast reply, named coordinator, office near port |
| 5 | Commodity trader (grains, rice, sugar, edible oils) | Are you a GAFTA Approved Superintendent in my country? Can you do weight, sampling, draft survey, fumigation supervision? Can you issue certificates in GAFTA contract form? Which ports do you cover? | GAFTA approval evidence, scope by port, sample certificate | Request superintendence at load/discharge port | Desktop (trading desk) and mobile; English | GAFTA logo + link to GAFTA register, port list, lab partners (ISO 17025) |
| 6 | Food importer / manufacturer needing halal | Is your halal certification recognised in my destination (UAE, KSA, Malaysia, Indonesia)? Which accreditation body backs it? What is the audit process and cost? Can I verify a halal certificate? | Halal scheme guide, application form, certificate register | Apply for halal certification; verify certificate | Mobile; English, Arabic, Malay (inf.) | Accreditation body name, certificate register, scope list |
| 7 | Customs officer or bank verifying a certificate | Is this certificate genuine? Was it issued by an appointed body? Does the shipment match? | None; wants a lookup, not a PDF | Verify by number/QR in under a minute | Mobile at the border; Arabic in Iraq/Egypt; English for banks | QR verification page, certificate number search, named issuing office. Evidence of need: GOTS warns of faked certificates; Intertek prints a validation email and QR on certificates |
| 8 | Government regulator / accreditation assessor (COSQC, GOEIC, ANAB, APEDA, DGFT) | Is the public information consistent with the accredited scope? Are impartiality and complaints policies published? Which offices are in scope? | Impartiality policy, QMS policy, complaints/appeals procedure, scope of accreditation | Read and record; may check annually | Desktop; English, Arabic | Published policies (TIC already has two), accreditation certificates with scope, complaints route (SGS model) |
| 9 | Existing client (exporter or importer) | Where is my report/certificate? What is the status of my RfC? Can I re-download an old certificate? Who is my contact? | Their own reports and certificates | Log in; download; chase status | Mobile and desktop; their own language | Portal reliability, notifications, named contact |
| 10 | Job seeker / freelance inspector | Are you hiring in my city? What qualifications do you need? How do I apply? | Job description, application form | Apply; send CV | Mobile; local language | Careers page with real openings, LinkedIn presence |
| 11 | Partner / subcontract inspection body or lab | Do you subcontract in my country? What are your requirements (ISO 17020/17025)? Who handles partnerships? | Partner requirements, NDA/application | Email the right person | Desktop; English | Clear partnerships page, named department |
| 12 | Journalist / analyst | What is TIC, how big, where, which accreditations, who leads it? | Press kit, logo, fact sheet, leadership bios | Quote accurately; get a press contact | Desktop; English | Dated news, press contact, consistent facts |
| 13 | Procurement / vendor prequalification officer (oil and gas, marine, large importers) | Do you hold ISO 9001/14001/45001 and ISO 17020? What is your trade licence and activity? Insurance (professional indemnity, public liability)? HSE policy and statistics? Financials, org chart, references? | ISO certificates, accreditation certificates with scope, trade licence, insurance certificate, HSE policy, company profile, impartiality policy | Download a prequalification pack in one go | Desktop; English, sometimes Arabic | Everything in one "Compliance documents" page with dates; matches ADNOC-style lists |

### Inferences
- Personas 1, 2, 4 and 9 generate most visits and most revenue; personas 7, 8 and 13 generate the most reputational risk if the site fails them. The content plan should put a "verify a certificate" entry point and a "compliance documents" page at the same visibility level as the service pages.
- The exporter personas arrive under time pressure (shipment already booked). The HQTS and Intertek pages both go straight to document lists; the strongest Iraq/Egypt pages are checklists, not brochures.
- Procurement document lists from ADNOC-type portals (trade licence, ISO certificates, HSE, financials, org chart) are a reliable proxy for what large clients will ask TIC for in prequalification.

### Gaps
- No independent survey of inspection-company website visitors was found. Device and language columns are inferred from regional messaging statistics and scheme geography, not measured. Recommend a two-week internal log: each TIC office records every inbound enquiry's channel, language, device (if known) and question.
- Could not access Cotecna's Iraq/Egypt programme pages (404 on the URL tried) to compare a third exporter-guide structure.

## Key Question 2: How exporters find and choose an inspection body

### Takeaway
Exporters are steered by compulsion more than by marketing: destination-country schemes (COSQC, GOEIC), contract terms (GAFTA) and government approved lists (DGFT Appendix 2G) define who may be used, so appearing on and linking to those lists is the primary "findability" lever. Beyond that, the evidence is thin; forwarder referral and search are inferred, not measured.

### Cited Findings
- GAFTA contract terms compel use of a GAFTA Approved Superintendent; traders search the public register by country and are told to "look for the logo". — [GAFTA approved registers](https://www.gafta.com/approved-registers/)
- India's DGFT publishes the approved PSIA list (Appendix 2G) with each agency's email and area of operation, updated by public notice; this is where Indian exporters of scrap and regulated goods look. — [DGFT Appendix 2G](https://content.dgft.gov.in/Website/Appendix_2G_as_on_07_08_2026.pdf)
- Iraq: only a small number of COSQC-appointed bodies may issue CoCs; providers advertise this appointment prominently (Bureau Veritas, Applus+, Intertek, TÜV Rheinland, TÜV Austria, HQTS). — [Bureau Veritas UK news](https://www.bureauveritas.co.uk/newsroom/bureau-veritas-appointed-manage-iraq-voc-services); [Applus+](https://www.applus.com/qa/en/what-we-do/service-sheet/certificate-of-conformity---iraq); [DIN CERTCO / TÜV Rheinland](https://dincertco.de/din-certco/en/main-navigation/products-and-services/international-approvals/export-in-den-irak/)
- Applus+ UAE publishes a success story about supporting Iraq exports from the UAE, showing the UAE-to-Iraq corridor is a marketed niche. — [Applus+ UAE success story](https://www.applus.com/ae/en/news/success-stories/applus+-in-the-uae-supports-iraq-exports-through-verification-of-conformity-services)
- Semrush estimates intertek.com received 967K visits in Sep 2026 with Direct at 42.5% and Google referral at 25.7%; organic search 199K visits. Similarweb shows bureauveritas.com with Direct at 57.5% of desktop traffic. High direct share suggests returning/known-brand visitors rather than discovery. — [Semrush intertek.com](https://www.semrush.com/website/intertek.com/overview/); [Similarweb bureauveritas.com](https://www.similarweb.com/website/bureauveritas.com/)
- NN/g: "many visitors check a vendor's website first when considering doing business with it", so the site shapes credibility before sales contact. — [NN/g](https://www.nngroup.com/articles/b2b-usability/)

### Inferences
- For TIC the practical discovery channels are: (1) being listed and linked on COSQC, GOEIC, DGFT, APEDA and GAFTA pages; (2) search queries like "Iraq CoC", "Egypt CoI", "GAFTA superintendent Dubai" (HQTS's 2020 guide still ranks, showing evergreen guides capture this search); (3) forwarders and LC-issuing banks telling the exporter which body to use. The site should give forwarders a shareable one-page per-country link.
- A Chinese-language and Hindi/Urdu-friendly entry for personas 1-2 will matter more than Arabic, because the exporter is usually in Asia while the importer is in MENA.

### Gaps
- No quantitative evidence found on referral vs search vs LinkedIn as the first touch for choosing an inspection body. No exporter-forum threads or LinkedIn posts with usable detail surfaced in search. Recommend asking TIC's sales team to tally "how did you hear about us" for 30 days.
- APEDA's recognised-agency list and CCPIT/TDAP guidance were not reached in this pass.

## Key Question 3: Regional communication preferences

### Takeaway
WhatsApp is the default business contact channel across TIC's MENA and South Asian markets (India 535.8M users, Pakistan 52.3M, Brazil 139.3M; 75% of nationals in Egypt, KSA and UAE use it), while Chinese exporters live on WeChat and rarely check email. A single contact form will miss most of these visitors.

### Cited Findings
- WhatsApp users by country (2025 ranking attributed to Skillademia): India 535.8M, Brazil 139.3M, Indonesia 86.9M, Pakistan 52.3M; Egypt not given directly (2024 downloads 16-48M range). — [Rasayel WhatsApp statistics](https://learn.rasayel.io/en/blog/whatsapp-user-statistics/)
- 75% of nationals in seven countries including Egypt, Saudi Arabia and the UAE use WhatsApp (Northwestern University in Qatar, combined figure, not per country). — [Rasayel](https://learn.rasayel.io/en/blog/whatsapp-user-statistics/)
- UAE WhatsApp adoption "reaching 90%"; Infobip platform data shows WhatsApp business messaging grew 314% in India 2021-2025 and 36% in MENA in 2025 (vendor-platform data, not market-wide). — [Infobip WhatsApp statistics](https://www.infobip.com/blog/whatsapp-statistics-2025-global-usage-market-overview) (page returned 403 on direct fetch; figures from search snippet)
- Over 50M brands use WhatsApp Business; 175M customers message a business account daily; 83% of active users open the app daily (DataReportal). — [Rasayel](https://learn.rasayel.io/en/blog/whatsapp-user-statistics/)
- BuiltWith counts of websites with WhatsApp widgets: UAE 22,406; Pakistan 13,285; Saudi Arabia 7,754 (website adoption, not usage). — [BuiltWith WhatsApp](https://trends.builtwith.com/widgets/WhatsApp)
- China: Chinese professionals "use email for work but rarely check it" and often have no email app on their phone; agencies advise not relying on email alone and offering WeChat, phone or live chat, and sending a WeChat nudge to check the inbox. — [Nanjing Marketing Group, email in China](https://nanjingmarketinggroup.com/blog/using-email-for-b2b-communications-in-china); [WeChat for B2B](https://nanjingmarketinggroup.com/blog/how-to-use-wechat-for-b2b-marketing); [AmCham China](https://amchamchina.org/?p=9836)
- Language: CSA Research's 29-country consumer study (includes Egypt) found 76% prefer buying with information in their native language; the B2B edition surveyed 946 business users in 24 locales but results are paywalled. — [CSA Research CRWB B2B](https://csa-research.com/Featured-Content/For-Global-Enterprises/Global-Growth/CRWB-Series/CRWB-B2B); [LanguageLine summary](https://www.languageline.com/blog/cant-read-wont-buy-concept-drives-multicultural-consumers)
- Intertek's localisation approach: English programme page with a country menu linking to localised sites (Spanish, Chinese, French). — [Intertek HK](https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/)

### Inferences
- Minimum contact set per office: click-to-WhatsApp (MENA, South Asia, Brazil, SE Asia), phone, email, web form; plus WeChat QR on the China office page. Arabic pages for importer-facing content (Iraq, Egypt, KSA, Jordan); Chinese for exporter-facing CoC content; Portuguese for Brazil is a lower priority unless Brazil generates CoC demand.
- Chinese exporters are used to 1688/Alibaba-style "chat now" response times; a form that promises a reply "within 2 business days" will feel slow to them (inference from the agency sources).

### Gaps
- No per-country WhatsApp business-usage figures for Saudi Arabia, Egypt or Iraq were found; only combined regional figures.
- No Arabic-specific B2B web-language study was found. The CSA B2B report is paywalled.
- No evidence on Iraq-specific channel preferences (Telegram vs WhatsApp vs Viber); worth asking the Baghdad office.

## Key Question 4: Moments of friction on inspection-company websites

### Takeaway
Direct user complaints about inspection-company websites were not found in public forums or reviews. The friction list is therefore reconstructed from (a) what competitor pages omit (fees, downloadable forms, verification) and (b) general B2B usability findings on missing pricing and gated content.

### Cited Findings
- Intertek's Iraq CoC page names the RfC form as required but provides no download; lists no fees, routes, email, WhatsApp or WeChat; only a phone number and a generic "Send us a request" link. — [Intertek HK](https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/)
- HQTS's Iraq guide gives timelines but no fees and no route (registration vs shipment) options; the product category list is referenced but not shown. — [HQTS](https://www.hqts.com/iraq-coc-what-you-need-to-know)
- Egypt fees are "quoted at the time of nomination", i.e. not published by any provider found. — [SGS Egypt PCA datasheet](https://www.sgs.com/-/media/sgscorp/documents/corporate/brochures/sgs-gis-pca-egypt-datasheet-a4-en-19-v5.cdn.en-IQ.pdf)
- Certificate verification at a global player still runs on email (certificate.validation@intertek.com) with a QR code; no dedicated public lookup page surfaced in search for Intertek, Bureau Veritas or SGS. — [GOTS Intertek listing](https://global-standard.org/certification-and-labelling/approved-certification-bodies/intertek-testing-services-na-inc)
- Delayed pre-inspection certificates are a recorded trade-barrier complaint (Mozambique, 2009, medicines). — [Trade Barriers database](https://www.tradebarriers.org/resolved_complaints/page:23/sort:NtbType.name/direction:desc)
- SGS maintains a formal PSI appeal/complaint path with response targets (2 and 10 working days). — [SGS PSI appeal form](https://www.sgs.es/-/media/global/documents/technical-documents/technical-datasheets/sgs-gis-psi-appealform.pdf)
- NN/g: B2B task success 58% vs 66% for consumer sites; top causes were incomplete descriptions, cluttered content, weak navigation, registration barriers before content, and missing pricing. — [NN/g](https://www.nngroup.com/articles/b2b-usability/); [DestinationCRM summary](https://www.destinationcrm.com/Articles/CRM-News/CRM-Featured-Articles/B2B-Web-Sites-Are-Dropping-the-Ball-42449.aspx)
- Similarweb bounce rate for bureauveritas.com 33.3%; Semrush bounce rate for intertek.com 62.1% (different tools, not comparable to each other). — [Similarweb BV](https://www.similarweb.com/website/bureauveritas.com/); [Semrush Intertek](https://www.semrush.com/website/intertek.com/overview/)

### Inferences
- Friction list the proposal should design against (each inferred from the omissions above): (1) cannot find whether the product needs a CoC; (2) cannot download the RfC/application form; (3) no fee indication at all; (4) no stated turnaround; (5) cannot tell which office to contact for a given export corridor; (6) no way to verify a certificate without emailing; (7) form submitted, no acknowledgement; (8) English-only for Arabic-speaking importers; (9) email-only for Chinese exporters; (10) no complaints/appeals route visible, which regulators and assessors look for.
- Publishing even an indicative fee range or "what drives the price" explainer addresses the single biggest B2B complaint (pricing) without committing to a tariff.

### Gaps
- No forum, Reddit, LinkedIn or review-site evidence of exporters complaining about inspection-company websites was found with the searches run. Recommend TIC's own inbound email/WhatsApp history as the substitute source.

## Key Question 5: What an exporter guide ("How to get an Iraq CoC") should contain

### Takeaway
The best public guides (HQTS, Intertek, Bureau Veritas datasheets, SGS/TÜV Egypt pages) converge on the same skeleton: who needs it, what is regulated, routes, documents, step-by-step process with timelines, what happens at destination, and a direct contact; the gaps in all of them are fees, downloadable forms, FAQs and verification.

### Cited Findings
- HQTS structure: title; what requires a CoC; Documents required; The Certification Process (4 steps with timelines); Why choose HQTS; Need More Information (form). — [HQTS](https://www.hqts.com/iraq-coc-what-you-need-to-know)
- Intertek structure: H1 "Certificate of Conformity for Exports to Iraq"; programme name; "The requirements for Iraq are:"; "To apply for a Certificate of Conformity, you will need to supply Intertek with:" (8 documents); note that regular shippers should register; "Need help or have a question?" with "Call a specialist" / "Send us a request". — [Intertek HK](https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/)
- Bureau Veritas Iraq VOC datasheet (May 2024) covers four product groups (toys, electrical/electronic, vehicles/bicycles/tyres and parts, construction products), required documents (RFC, invoice, packing list, transport document, conformity documents, LC), when physical inspection and ISO 17025 testing are triggered, and marking checks; a separate ICBCM scheme covers goods outside ICIGI. — [BV Iraq VOC Rev 6.7](https://cdn2-verigates.bureauveritas.com/sites/verigates/files/2024-05/IRAQ%20%28VOC%29%20Rev%206.7.pdf); [BV ICBCM sheet](https://cdn2-verigates-ppd.bureauveritas.com/sites/verigates/files/2019-02/GSIT%2B-%2BIraq%2B%28ICBCM%2BScheme%29%2BRev%2B4.pdf)
- Bureau Veritas also publishes a notice addressed to the Iraqi Embassy about legalisation, showing the embassy-legalisation step belongs in the guide for goods outside the regulated list. — [BV notice to Iraqi Embassy](https://cdn1-verigates.bureauveritas.com/sites/verigates/files/2021-12/Bureau%20Veritas%20GS%20-%20Iraq%20Notice%20to%20Iraqi%20Embassy%20Ed%202.0.pdf)
- Egypt guide content from SGS/TÜV: two routes (per-shipment vs manufacturer whitelist), ISO 17025 lab testing, no amendments allowed, 45-day validity rule, fees quoted at nomination, programme updated March 2022 effective 21 May 2022. — [SGS Egypt PCA](https://www.sgs.com/services/egypt-product-conformity-assessment-pca); [TÜV Rheinland Egypt CoI](https://www.tuv.com/market-access-services/fr/main-navigation/conformity-assessment/export-or-import-to/egypt/egypt-certificate-of-inspection-(coi))
- TÜV Austria adds eligibility criteria (manufacturer or trader with documented manufacturer link; ISO 9001 expected). — [TÜV Austria](https://in.tuvaustria.com/?p=15080)

### Inferences
- Recommended guide skeleton (content side, not design): 1) Who must have it and since when; 2) Is my product regulated? (searchable category list or HS-code lookup); 3) Routes: shipment-by-shipment, registration for regular shippers, licensing where available; 4) Documents checklist with downloadable RfC form; 5) Step-by-step with turnaround per step; 6) Testing and when it is triggered; 7) What happens at Iraqi/Egyptian border (destination inspection, random surveillance); 8) Fees: what determines cost and how to get a quote; 9) Common mistakes (certificate cannot be amended in Egypt; 45-day rule; marking/labelling); 10) FAQ; 11) Which TIC office handles my corridor (origin country to Iraq/Egypt) with WhatsApp/WeChat/phone; 12) Verify a certificate link. Each guide in English plus Chinese (exporters) and Arabic (importers).

### Gaps
- Cotecna's Iraq programme page could not be fetched (404). Bureau Veritas PDF was fetched as binary and not parsed; its content above comes from search snippets and should be re-read from the PDF before being quoted in the proposal.
- Current fees, product list and route names should be confirmed with TIC's own GSP team rather than copied from competitors.

## Key Question 6: TIC industry web-traffic patterns (device, country mix)

### Takeaway
Public estimates exist only for the global majors: intertek.com about 0.55-0.97M visits per month with mobile share varying from 25% (US, UK) to 39-45% (India) to 62-80% (US/Canada in a later snapshot); bureauveritas.com about 940K visits per quarter with China and India as top countries. No public estimate for ticqc.ae was found (Semrush returned 404), and cotecna.com data was not reached.

### Cited Findings
- intertek.com (Semrush, Sep 2026, page updated 13 Oct 2026): 967.46K visits (Aug 678.98K, Jul 552.9K); bounce 62.12%; top countries US 33.48%, Bangladesh 17.73%, Canada 8.83%, India 5.55%, UK 3.2%; device split per country: US 62% mobile, Canada 79.5% mobile, India 39% mobile, UK 24.6% mobile, Bangladesh 0% mobile (likely a measurement artefact); Direct 42.46%, google.com referral 25.69%, organic search 199K visits, paid search 3.1K. — [Semrush intertek.com](https://www.semrush.com/website/intertek.com/overview/)
- intertek.com (Semrush, Jun 2026 snapshot via search): 550K visits; US 26.3%, Taiwan 13.3%, India 10.1%; mobile US about 25%, India about 45%. Earlier Feb 2026 snapshot: US 27.9%, UK 9.2%, Taiwan 8.5%, India 7.7%, Poland 5.9%. The snapshots disagree, so treat as rough. — [Semrush intertek.com](https://www.semrush.com/website/intertek.com/overview/); [Semrush IT snapshot](https://it.semrush.com/website/intertek.com/overview)
- bureauveritas.com (Similarweb, Sep 2026): 940K visits over last 3 months, +11.09% month on month; bounce 33.31%; top countries China 18.99%, India 15.88%, France 9.33%, US 7.04%, Taiwan 5.5%; desktop traffic sources Direct 57.45%, then referrals, then organic. No mobile split shown. — [Similarweb bureauveritas.com](https://www.similarweb.com/website/bureauveritas.com/)
- ticqc.ae: Semrush overview page returned 404 (no public data). — [Semrush ticqc.ae](https://www.semrush.com/website/ticqc.ae/overview/)
- cotecna.com: no Semrush overview surfaced in search; only unrelated domains were returned.

### Inferences
- The majors' traffic skews desktop in Europe/US and more mobile in South Asia; TIC's audience is concentrated in South Asia, MENA and SE Asia, so TIC's mobile share is likely higher than the majors' blended figure. This is an inference; TIC's own Google Analytics (if installed on the WordPress site) is the authoritative source and should be pulled before the proposal is finalised.
- China and India being the top two countries for bureauveritas.com supports prioritising Chinese and Indian exporter content.

### Gaps
- No public device/country data for ticqc.ae or cotecna.com. Ask TIC's IT/marketing for Google Analytics or Search Console exports (last 12 months: country, device, landing pages, queries).

## User journeys (numbered steps)

Journeys are written from the scheme documents cited above; steps marked (inf.) are inferred.

### Journey A: Chinese or Indian manufacturer needs an Iraq CoC for a booked shipment
1. Importer in Baghdad or the forwarder tells the exporter a CoC is required and may name TIC (inf.; nomination practice per Egypt datasheet and GAFTA contract practice).
2. Exporter searches "Iraq CoC" or opens the link the forwarder sent, on a phone or office desktop; expects a Chinese or English page (inf. from WeChat/email evidence).
3. Checks: is my product regulated? which documents? how long? (document lists per Intertek/HQTS).
4. Downloads the RfC form and document checklist (currently not offered by Intertek; HQTS offers a form instead).
5. Contacts the nearest TIC office via WeChat/WhatsApp/phone; expects same-day reply (inf.).
6. Submits RfC, invoice, packing list, test reports; receives document review in 1-2 working days (HQTS timeline).
7. Inspection date agreed; inspector supervises loading; testing if documents are insufficient (BV/HQTS).
8. Certificate issued (HQTS: 5 working days after submission); exporter sends it to importer and forwarder.
9. Importer presents CoC at Iraqi border; destination inspection may occur (Intertek).
10. Regular shipper is advised to register to shorten future cycles (Intertek).
Pages needed: Iraq CoC guide (EN/ZH), product scope lookup, downloads, office finder by corridor, quote/RfC form, status tracking (portal), verify certificate.

### Journey B: Egyptian importer's supplier needs a GOEIC CoI
1. Importer nominates an inspection body; fees are borne by seller and quoted at nomination (SGS).
2. Exporter contacts TIC office in origin country; sends test reports, technical sheets, supplier info, proforma invoice (SGS).
3. TIC checks traceability of test reports; arranges sampling and ISO 17025 testing if needed (SGS).
4. Quote paid; pre-shipment inspection; draft certificate checked because GOEIC does not allow amendments (SGS/TÜV).
5. Certificate issued on receipt of final invoice and transport document; must be dated within 45 days of inspection (SGS).
6. Importer clears goods; may later verify the certificate online (inf.).
Pages needed: Egypt CoI guide (EN/AR/ZH), whitelist route explainer, documents list, Cairo office contact, verify certificate.

### Journey C: Commodity trader needs GAFTA superintendence at a Gulf or Indian port
1. Contract requires a GAFTA Approved Superintendent (GAFTA).
2. Trader checks GAFTA register by country, then the superintendent's own site for port coverage and services (GAFTA; inf.).
3. Opens TIC's commodities page on a desktop at the trading desk; looks for GAFTA logo linking to the register entry, port list, scope (weight, sampling, quality, fumigation supervision), lab partners (inf.).
4. Emails or calls the port office; expects a named surveyor and a quotation per tonne or per call (inf.).
Pages needed: Commodities and GAFTA page, port/office list, sample certificate, contact per port.

### Journey D: Customs officer or bank verifies a certificate
1. Receives a certificate PDF with a number and QR.
2. Scans QR on a phone or types the number into a verification page; expects issuing office, date, consignment, status within a minute (Intertek practice is email plus QR; GOTS warns of faked certificates).
3. If mismatch, needs a phone/WhatsApp number for the issuing office (inf.).
Pages needed: Verify certificate (EN/AR), fraud warning, contact.

### Journey E: Procurement officer prequalifying TIC as a vendor
1. Receives TIC's name from a tender or sales contact; opens the site on desktop.
2. Looks for compliance documents: ISO 9001/14001/45001, ISO 17020 with scope, trade licence, insurance, HSE policy, impartiality policy, org chart, financials (ADNOC-type lists).
3. Downloads a single prequalification pack or individual dated PDFs (inf.).
4. Cross-checks accreditation on the accreditation body's website (UKAS schedule model).
Pages needed: Compliance and accreditation page with dated downloads, About with leadership and legal entity details.

### Journey F: Existing client chasing a report
1. Opens WhatsApp or email first (regional evidence), then the website if told to use a portal.
2. Logs in on mobile; sees RfC status, downloads certificate/report, sees named coordinator (inf.).
3. Receives notification when the certificate is issued (inf.).
Pages needed: Client portal entry, status tracking, notifications.

### Journey G: Job seeker or freelance inspector
1. Searches "inspector jobs Dubai" or sees a LinkedIn post (inf.).
2. Opens careers page on mobile; expects live vacancies, requirements, apply form (inf.; currently absent on ticqc.ae).

## Questions for TIC executives to answer in the proposal questionnaire (derived from gaps)
- Which five enquiry types arrive most often per office, and through which channel (WhatsApp, phone, email, WeChat, form)?
- For Iraq and Egypt, what are the current routes, product scope and fee structure TIC is allowed to publish?
- Does TIC already have a certificate numbering/QR scheme that a public verification page could query?
- Which documents are most often requested in vendor prequalification, and are current dated copies available to publish?
- Which languages do each office's clients write in (Arabic, Chinese, Hindi/Urdu, Portuguese, Malay, Thai)?
- Can IT provide 12 months of Google Analytics/Search Console data from the current WordPress site?

## Sources visited (exact URLs)
- https://ticqc.ae/
- https://www.hqts.com/iraq-coc-what-you-need-to-know
- https://www.nngroup.com/articles/b2b-usability/
- https://www.infobip.com/blog/whatsapp-statistics-2025-global-usage-market-overview (403)
- https://www.semrush.com/website/intertek.com/overview/
- https://www.similarweb.com/website/bureauveritas.com/
- https://learn.rasayel.io/en/blog/whatsapp-user-statistics/
- https://www.semrush.com/website/ticqc.ae/overview/ (404)
- https://www.cotecna.com/en/services/government-services/iraq (404)
- https://cdn2-verigates.bureauveritas.com/sites/verigates/files/2024-05/IRAQ%20%28VOC%29%20Rev%206.7.pdf (binary PDF, not parsed)
- https://www.intertek.com.hk/government/conformity-assessment/coc-iraq/
- Search-result sources cited inline above (GAFTA, DGFT, SGS, TÜV Rheinland, TÜV Austria, Applus+, Bureau Veritas, Shuraa, Enggpro, Nanjing Marketing Group, AmCham China, CSA Research, BuiltWith, Trade Barriers, GOTS, UKAS, ISO).
