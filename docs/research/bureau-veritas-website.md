# Bureau Veritas website teardown (model for a global TIC company website)

Observation date: 2026-10-21. All pages were fetched live on this date unless marked otherwise. Fetching was done with a text-only fetcher, so JavaScript-rendered elements (cookie banner, chat widgets, map widgets) may be missing from what was captured; where that matters it is flagged.

Important first finding: `https://www.bureauveritas.com/` now 301-redirects to `https://group.bureauveritas.com/`. The "group" site is the corporate/investor site; country and division sites live on separate domains/subdomains (e.g. `bureauveritas.co.uk`, `middle-east.bureauveritas.com`, `bureauveritas.cn`, `verigates.bureauveritas.com`). `www.bureauveritas.ae` and `www.bureauveritas.iq` do **not resolve** (DNS `ENOTFOUND` on 2026-10-21); the UAE, Iraq, Egypt, Saudi, Jordan, Pakistan etc. are served by the regional site `https://middle-east.bureauveritas.com/`.

## 1. Global information architecture (menus, mega-menu, Services vs Industries, depth, breadcrumbs)

### Takeaway
BV runs two different IA models: the **group site** is organised by *market/industry* (Services & Solutions = industries with 2-4 sub-segments each) plus corporate sections, while the **country/regional sites** add a parallel *"Your needs" / service-type* axis (Certification, Inspection, Testing, Training...) and a "Contact Us" item in the main nav. Hierarchy is shallow (2-3 levels) with simple "Home > Section" breadcrumbs.

### Cited Findings
- Group site top-level nav (2026-10-21): **About us, Sustainability, Services & Solutions, Insight, News, Careers, Investors**; header has search ("What are you looking for?"), language switch "en / fr", and a "Galaxy" place-locator link (`/place-locator`). — [group.bureauveritas.com](https://group.bureauveritas.com/)
- "Services & Solutions" mega-menu (links to `/markets-services`) lists industries with sub-segments: Agri-Food; Automotive & Transport (Aeronautics & Space, Automotive, Rail, Transport & logistics); Buildings & Infrastructure (7 items); Consumer products & retail (4); Cybersecurity (4); Commodities (5); Cross-Market Services (Certification & management services, Procurement, SafeGuard, Supply chain risk management, Industrial Product Certification); Marine & Offshore; Oil & Gas (4); Power & Utilities (6). — [group.bureauveritas.com](https://group.bureauveritas.com/)
- "About us" mega-menu: At a glance, Vision/Mission/Strategy, Expertise, Governance (Board, ExCom, Compensation, Related-party), Shaping a Better World (Workplace, Environment, Business Practices, Ratings & Awards, Statements & Policies, CERT), Suppliers, History ("190 years and still innovating"), Global presence, plus promos for "LEAP | 28" strategy and the 2025 Integrated Report PDF. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- The `/markets-services` hub page is titled "Leveraging expertise across industries": breadcrumb is a single "Home" link; sections are "Discover our markets" (11 industry tiles), "Services for a digital world", and "Cross-Market Services" (5 cards: Certification & Management Services, Government Services, Industrial Product Certification, Procurement, Supply-R). Each card = image + bold title + one-line description + whole card clickable. — [group.bureauveritas.com/markets-services](https://group.bureauveritas.com/markets-services)
- Industry page URLs follow `/industries/<industry>/<segment>` e.g. `/industries/oil-gas/exploration-production`; breadcrumb on the Oil & Gas page shows "Home > Services & Solutions". — [group.bureauveritas.com/industries/oil-gas](https://group.bureauveritas.com/industries/oil-gas)
- Middle East regional site nav: **About Us, INDUSTRIES ("Our Markets"), SUSTAINABILITY, Your needs, Digital, INSIGHT, NEWS, Career, Our Offices**, with header utility links "Contact" and "Locations". "Your needs" is the largest menu (Certification, Inspection with 12 sub-services, Testing & Analysis, NDT, HSE Studies, Training, Asset Integrity Management, Design Review & Verification, Cybersecurity, etc.). Industries menu has 8 markets, each with 3-6 sub-segments. — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- UK site nav: **Who we are, Industries (~20 sectors), Buildings & Infrastructure, Certification, Sustainability & Advisory, Energy, Cybersecurity, Resources, Contact Us** — i.e. the UK site promotes its biggest service lines to top level rather than one generic "Services" item. — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- UK service page breadcrumb example: "Home > CERTIFICATION > ISO Certification - QHSE" for the ISO 9001 page (3 levels). — [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001)
- China site nav (Chinese): 必维绿色服务与解决方案 (green services), 关于我们 (About), 您的行业 (Your industry), 我们的服务 (Our services), 新闻 (News), 招贤纳士 (Careers), 集团 (Group). — [bureauveritas.cn](https://www.bureauveritas.cn/)
- Homepage of group site has a "Market finder" with dropdown filters for **Market, Need, Asset** under the heading "Fostering trust, improving performance", and 8 market tiles each phrased as a question, e.g. "How to ensure safety in a high-risk environment?". — [group.bureauveritas.com](https://group.bureauveritas.com/)

### Inferences
- The consistent BV pattern is a two-axis IA: *Industries/Markets* (who you are) and *Needs/Services* (what you want), with cross-links between them. For TIC the equivalent would be Industries (Oil & Gas, Marine, Food, Commodities, Vehicles) x Services (Inspection, Testing, Certification, Government/VoC programmes, Training).
- The group site deliberately keeps corporate (Investors, Governance, Sustainability) at top level because it is a listed company; a private company like TIC would not need an Investors section but could reuse the "About > Governance / Statements & Policies / History" structure.
- Country sites are allowed to deviate from the group IA (UK puts Certification and Cybersecurity at top level). BV tolerates inconsistency across sites rather than enforcing one template.

### Gaps
- Could not render the mega-menu visually, so column layout, images inside the menu and hover vs click behaviour are unknown.
- Breadcrumbs appear inconsistent (group Oil & Gas page shows only 2 levels although the URL has 2 segments); could not verify whether breadcrumbs are schema.org-marked.

## 2. Country/region sites: selector, languages, local vs global content, local offices

### Takeaway
BV does not use an in-page country/language dropdown on the global site; instead a dedicated "Our websites" page lists ~90 territories mapped to ~70 separate country/regional domains, each a standalone Drupal site in the local language(s). The Middle East (incl. UAE, Iraq, Egypt, Saudi, Jordan, Pakistan) is one English-only regional site with a long static "Our Offices" page; Arabic appears only in form field labels.

### Cited Findings
- The group homepage has **no country selector**, only an "en / fr" language switch; the footer carries an "Our websites" link. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- "Our websites" page groups "LOCAL AND REGIONAL WEBSITES" by Africa / Americas / Asia, Middle East & Pacific / Europe, labelling "REGIONAL WEBSITE" vs "LOCAL WEBSITES". Examples: Africa regional `https://www.bureauveritas.africa/`; Kenya `https://www.bureauveritas.ke/`; Nigeria `https://www.bureauveritas.ng/`; Middle East regional `https://middle-east.bureauveritas.com/`; South East Asia `https://south-east-asia.bureauveritas.com/`; China `https://www.bureauveritas.cn/`; India `https://www.bureauveritas.co.in/`; Malaysia `https://www.bureauveritas.my/`; Sri Lanka `https://www.bureauveritas.lk/`; Thailand `https://www.bureauveritas.co.th/`; Brazil `https://www.bureauveritas.com.br/`; UK `https://www.bureauveritas.co.uk/`. "Azerbaijan, Bahrain, Egypt, Iraq, Jordan, Kuwait, Lebanon, Oman, Pakistan, Qatar, Saudi Arabia, United Arab Emirates, Yemen" all map to the Middle East regional site. The page does not state the language of each site. — [middle-east.bureauveritas.com/our-websites](https://middle-east.bureauveritas.com/our-websites)
- `www.bureauveritas.ae` and `www.bureauveritas.iq`: DNS lookup failed (`getaddrinfo ENOTFOUND`) on 2026-10-21 — these domains are not live websites. (Observed directly.)
- Middle East site language: "No language switcher appears in the content. The only Arabic indicator is the Saudi jobs URL path `/sa/ar`" (jobs.bureauveritas.com/sa/ar). — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- Middle East contact form labels are bilingual inline, e.g. "Your Company / جهة العمل", "Subject / العنوان", "Case / حالة" with options "Request / طلب" and "Complaint / شكوى", "Message / نص الرسالة"; country list: "Dubai / دبي, Abu Dhabi / أبو ظبي, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar, Lebanon, Egypt, Jordan, Iraq, Pakistan, Türkiye, Azerbaijan, Georgia, Uzbekistan". — [middle-east.bureauveritas.com/contact-ustwasl-mna](https://middle-east.bureauveritas.com/contact-ustwasl-mna)
- Middle East "Our Offices" page lists 18 countries / ~35 offices as one long vertical list (no tabs, accordion or map), each with "Our Office Location" and "Our Contact Details" blocks, e.g. Dubai: "Al Hudaiba Awards Building, Block C, 2nd Floor, Jumeirah Road, P.O. Box 9110. Tel +971 (0) 4 3074400; dubai@bureauveritas.com"; Iraq has Erbil, Basra and Baghdad offices sharing `iraq.contact@bureauveritas.com`; Pakistan has 5 offices; Saudi 6. One address contains an error ("Sinn EL El Fil, Beirut, London"). — [middle-east.bureauveritas.com/our-offices-0](https://middle-east.bureauveritas.com/our-offices-0)
- China site is Simplified Chinese by default with a "中文 / En" switcher (`/` and `/en`), WeChat 公众号 / 视频号 / 小红书 QR-code modals, ICP licence "沪ICP备16001052号-7" and public-security registration in the footer, and three service hotlines. — [bureauveritas.cn](https://www.bureauveritas.cn/)
- Benelux site (Netherlands + Belgium) launched July 2021 with nl / fr / en switcher; "the old bureauveritas.nl and bureauveritas.be addresses redirect to it". — [benelux.bureauveritas.com newsroom](https://benelux.bureauveritas.com/en/newsroom/new-bureau-veritas-benelux-website)
- Global vs local content: the Middle East site reuses group-level "About Us" items (At a glance, Vision/Mission/Strategy, Expertise, Global presence, Shaping a Better World) but adds "PRESENCE IN THE MIDDLE EAST", a regional leadership quote (Khurram Majeed, EVP Middle East, Caspian and Africa: "more than 40 years" in the region) and local service pages. — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- Office locator: both group and regional sites link to a shared "Galaxy" locator at `https://group.bureauveritas.com/place-locator`. — [group.bureauveritas.com](https://group.bureauveritas.com/); [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)

### Inferences
- BV's model (70+ separate country sites) is heavy and produces inconsistency (dead `.ae`/`.iq` domains, address typos, no Arabic). TIC with 13 offices should prefer one site with country/office pages and an optional Arabic (and possibly Chinese) language layer, rather than per-country domains.
- Bilingual field labels ("Subject / العنوان") are a cheap but visibly compromised way to serve Arabic users; a proper RTL language version would be more credible.

### Gaps
- The `/place-locator` page returned only its title in text form (it is a JavaScript map), so filters, office counts and per-office fields could not be verified.
- Could not confirm whether the Middle East site has any Arabic-language pages at all beyond the form labels.

## 3. Service page anatomy

### Takeaway
Group-site industry pages are short (about 400 words), text-led, with "Your challenges / How we support you" framing and sub-segment tiles but **no forms, FAQs, case studies or downloads**; the UK country site is the conversion-oriented model, with an inline enquiry form, a six-step "how to get certified" process, FAQ accordion, lead-magnet checklist and related-service cards (about 1,000 words).

### Cited Findings
- Group Oil & Gas page: H1 "Oil & Gas: value throughout the lifecycle"; breadcrumb "Home > Services & Solutions"; ~35-word bold intro; H2 "Maximizing operational efficiency to reduce costs and risk"; H3 "Your challenges" (~90 words); H3 "How we support you" (~110 words, 4-item lifecycle list: Pre-project, QA/QC, OPEX solutions, Decommissioning); promo block "Discover our digital solution for building a resilient supply chain" with CTA "More information"; H2 "Discover our market segments" with 3 tiles (Exploration & Production, Transportation & Storage, Refining & Processing); total ~400 words. "Elements not present: Forms (only the generic Contact link), FAQs, Case studies, Downloads, Named contacts". — [group.bureauveritas.com/industries/oil-gas](https://group.bureauveritas.com/industries/oil-gas)
- Middle East "Inspection" page: breadcrumb "Home > Your needs"; H1 "Inspection"; tagline "WE ADDRESS LOCAL AUTHORITIES' AND BUSINESS PARTNERS' REQUIREMENTS WORLDWIDE"; ~110 words of body; "DISCOVER our Inspection SERVICES" grid of 11 cards with "Read More" (Shop Inspection, Site Inspection, Dropped Object Survey, Supplier Technical Assessment, Technical Rig Audit, Lifting Equipment Inspection, ASME Services, Oil & Gas / Metals & Minerals / Agri-Commodities inspection, Bunker Quantity Surveys); primary CTA "GET A FREE QUOTE" linking to `/contact-us`; no forms, brochures, case studies, FAQs or contact details on the page. — [middle-east.bureauveritas.com/your-needs/inspection](https://middle-east.bureauveritas.com/your-needs/inspection)
- UK ISO 9001 page: H1 "ISO 9001 CERTIFICATION: QUALITY MANAGEMENT SYSTEMS"; sections "WHAT IS ISO 9001?", "HOW TO GET ISO 9001 CERTIFIED:" (6 steps: Gap Analysis (optional), Stage 1 Audit, Stage 2 Audit, Certification Issued, Ongoing Surveillance Audits (annual), Recertification (every 3 years)), "THE BENEFITS OF ISO 9001 CERTIFICATION" (9 bullets), "BUREAU VERITAS - EXPERTS IN ISO 9001 CERTIFICATION", "FREQUENTLY ASKED QUESTIONS (FAQS)" (4 accordion items), then 5 related teaser cards. Inline "contact us" enquiry form fields: Email, First Name, Last Name, Company, Job Title, City/Town, Postcode, Phone, Country, "Enquiring about" (radio: ISO 9001 / General enquiry), Message, required data-protection checkbox, optional marketing opt-in. Lead magnet "Download the free checklist" goes to a marketing-automation tracking link `https://news.bureauveritas.net/l/591681/2025-05-29/3t8x2vv`. Roughly 1,000 words. No case studies or testimonials on page; UKAS accreditation mentioned in text only. A stray placeholder "{Personal data protection policy}" appears in the consent text. — [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001)
- UK site "Resources" menu holds Case studies (`/resources/case-studies`), news, webinars, a Building Control Hub, technical resources, a blog and "BEYOND: Your ISO Transition Hub". — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- UK homepage service panels repeat one pattern: short description + "Explore Our Services" CTA + sub-link list; a "Price Match Promise" page is promoted for Buildings & Infrastructure. — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)

### Inferences
- The group site treats service pages as brochure/SEO landing pages and pushes conversion to local sites; the UK page is the template to copy for TIC: intro + process steps + benefits + why-us + FAQ + related services + inline enquiry form + one downloadable lead magnet.
- "GET A FREE QUOTE" on the Middle East site links to a generic contact page, not a quote form, so the CTA promise is weaker than it reads.

### Gaps
- No case-study page was fetched, so the case-study template (problem/solution/result, client logo, downloadable PDF) is unverified.
- Could not see images in context, so hero image usage per service page is unknown.

## 4. Government services / trade facilitation / VoC programme pages (Iraq, Egypt, Saudi, Kenya, Nigeria...)

### Takeaway
BV separates government/VoC work onto a dedicated Drupal portal, **Verigates** (`verigates.bureauveritas.com`), with 25 country programme pages built from one template: contracting authority, sub-programmes, programme news, a downloads block (datasheet, product/standards list, banned list, request-for-certificate form in .docx, CoC guide, exporter flyer, notices), local office contact, and a generic exporter/importer guide. Online certificate requests happen inside the logged-in Verigates portal ("Your request in 2 minutes flat, 24/7"), not on the public page. Fees are not published.

### Cited Findings
- Verigates homepage describes itself as "a secure interactive portal covering all the processes" between BV offices and the trade community, lets users "lodge your requests for certificate order" and check file status "in real time", and calls itself "a 24/7 front office". Banner slogans: "Your request in 2 minutes flat, 24/7", "Your Fast Track for Worldwide Trade", "A large range of services tailored for your needs". Widgets: "not yet user" → `/verigates/gsit/support/ask_account/form.do`, "Take The Tour" → `/home/our-services`. — [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- 25 programmes listed (flag list + world map + bullet list, alphabetical, no filters/table): Algeria, Botswana, Congo, DR Congo, Ecuador, Egypt, Ethiopia (ECAE), GCC, Iraq, Ivory Coast, Kenya, Kuwait, Lebanon, Libya, Nigeria SONCAP, Pakistan, Philippines, Saudi Arabia, Somalia, Tanzania EcoLevy, Tanzania/Zanzibar, Togo, UAE - MoIAT, Uganda, Zimbabwe; URL pattern `/programmes/<slug>`. HQ contact: "+33 1 55 24 70 00", `verigates.contact@bureauveritas.com`. — [verigates.bureauveritas.com/list-of-programmes](https://verigates.bureauveritas.com/list-of-programmes); [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- Iraq programme page "Iraq - VOC, IQB and VOCIV programmes": sub-programmes "Iraq - IQB scheme", "Iraq - Kurdistan Region", "Iraq - VOC"; contracting parties COSQC (VOC, IQB) and "Razga company for general trade, contracting and quality control LTD" (VOCIV, vehicles into Kurdistan); programme news e.g. "VOC Iraq contract renewed - Secure your imports/exports with Bureau Veritas" (23/12/25); Baghdad contact "009647713804230", "Iraq – Baghdad, Al-Qadisiya, District 606, St 14, Building 1/1955/3, 3rd Floor"; publication "Verigates _ Guidelines for Exporters and Importers" V3.0 (13/06/24). — [verigates.bureauveritas.com/node/49](https://verigates.bureauveritas.com/node/49)
- Iraq VOC sub-programme downloads (all on `cdn1-verigates.bureauveritas.com/sites/verigates/files/...`): "Flyer for Exporters Ed 3.1"; "IRAQ (VOC) Rev 7.1" datasheet (dated folder 2026-10); "Notice to Exporters of Food products, Cosmetics, Detergent and Cement"; "NOTICE to Exporters - COSQC Iraqi Quality mark 1.3"; "List of products and standards Ed 27.0" (2026-10); "List of specific banned products 11.5" (2026-08); "Annex A Undertaking by exporter 1.1" (.docx); "Certificate of Conformity (COC) Guide Ed 2.1"; "REQUEST FOR CERTIFICATE FORM 5.2" (.docx, 2025-06); contract-renewal notice 1.1 (2026-01); "Iraqi Quality Mark Application Form 1.0" in EN and AR (.docx). Contact email `luay.ibrahim@ae.bureauveritas.com`; global "GSIT - VOC Contacts Sheet e17.0" PDF. "No online request or submission function" on the public page; "Certification routes, process steps, fees, FAQs: Not present". — [verigates.bureauveritas.com/sub-programme/iraq-voc?id=49](https://verigates.bureauveritas.com/sub-programme/iraq-voc?id=49)
- Iraq contract status: a 2024 COSQC notice extended BV's VOC contract to 5 January 2026; Verigates news on 23/12/25 says "VOC Iraq contract renewed"; a 12/03/26 item says "Iraqi Quality mark scheme – Optional application". — [verigates.bureauveritas.com/sub-programme/iraq-voc?id=49](https://verigates.bureauveritas.com/sub-programme/iraq-voc?id=49); appointment background in [bureauveritas.co.uk newsroom](https://www.bureauveritas.co.uk/newsroom/bureau-veritas-appointed-manage-iraq-voc-services)
- Egypt page "Egypt - Verification Of Conformity (VOC) programmes": two sub-programmes by authority — GOEIC (non-food) `/sub-programme/egypt-voc-goeic?id=40` and NFSA (food & food-contact) `/sub-programme/egypt-voc-nfsa?id=40`; Cairo office "57 Hassan Aflaton Street, 6th & 7th Floor, Nasr City"; `conformity.egypt@bureauveritas.com`; links to group "Government services" page `https://group.bureauveritas.com/markets-services/financial-services-public-sector/governments`. Process, fees, forms not on the parent page. — [verigates.bureauveritas.com/programmes/egypt](https://verigates.bureauveritas.com/programmes/egypt)
- Saudi page: four sub-programmes "Cosmetics (SFDA), Food products (SFDA), Organic food products (MEWA), and SALEEM/SABER"; "Scope of Duties" = "Supervision of products conformity" to SASO standards, certificates "required for clearance at arrival"; Riyadh office, `conformity.ksa@bureauveritas.com`; news e.g. "SAU- SAUDI QUALITY MARK (SQM)" (24/11/25). — [verigates.bureauveritas.com/programmes/saudi-arabia](https://verigates.bureauveritas.com/programmes/saudi-arabia)
- Verigates portal tour (logged-in features): colour-coded file list (green = under process, blue = needs your action, red = suspended); "My Files" to file and track Inspection Requests (RFI), upload documents, message BV; shipment progress bars; file detail tabs "General Information, Inspection, Final Documents, Certificate"; inspection reports viewable/downloadable; "My Certificates" searchable for 365 days, PDF download/print; dashboards exportable to Excel/PDF; stage-completion alerts. Payment not mentioned. — [verigates.bureauveritas.com/home/our-services](https://verigates.bureauveritas.com/home/our-services)
- Iraq Certificate of Inspection guide: certificate "has a QR code to check the veracity of the certificate online", and "the certificate number's first 4 digits are related to the year". — [COI Guide Ed 2.0 PDF](https://cdn3-verigates.bureauveritas.com/sites/verigates/files/2022-01/Bureau%20Veritas%20-%20IRAQ%20-%20Certificate%20of%20Inspection%20%28COI%29%20Guide%20Ed%202.0.pdf)
- Recent programme-level news on Verigates home (02/10/26 Zanzibar PVoC update, 02/10/26 Somalia CBCA update, 23/09/26 "Kuwait– PVoC program – Notice of PVoC Services Discontinuation") shows the news feed is actively maintained. — [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- The group-site Government Services pages (`/markets-services/financial-services-public-sector/governments` and `/industries/cross-market-services`) returned **HTTP 403** to the fetcher on 2026-10-21, so their content could not be read. (Observed directly.)

### Inferences
- The Verigates template is directly reusable for TIC's Iraq CoC and Egypt CoC pages: authority/appointment statement, scope, downloads block with versioned documents (datasheet, product list, banned list, RFC form, CoC guide, exporter flyer), programme news, local office contact, and a "how to apply" link to a portal or form.
- BV keeps programme documents in .docx/.pdf with version numbers and dated folders — a versioned document library (with "last updated" dates) is a credibility signal TIC should copy.
- Fees are not public on BV pages; TIC can decide whether to publish fee schedules as a differentiator.
- Arabic appears only in one application form (EN/AR versions of the Iraqi Quality Mark form), i.e. BV does not provide Arabic programme pages even for Iraq — an opportunity for TIC.

### Gaps
- Kenya and Nigeria SONCAP programme pages were not fetched (budget), but they follow the same `/programmes/<slug>` template per the list page.
- The Verigates account-request form (`/verigates/gsit/support/ask_account/form.do`) and the logged-in request-for-certificate flow could not be inspected.
- Group-site Government Services page blocked (403).

## 5. Trust and credibility (accreditations, certificate verification, ethics, CSR, investors, history, numbers)

### Takeaway
BV's credibility is carried by corporate signals (190-year history, investor data, integrated report, governance, Code of Ethics, "Shaping a Better World" CSR) and by numbers (82,000 staff, 1,600 offices and labs, 140 countries, 400,000 clients, EUR 6.4-6.5bn revenue), rather than by accreditation logos; certificate verification is handled per country (UK email/barcode process, Italy searchable register, QR codes on VoC certificates) with no single global verification tool found.

### Cited Findings
- Group homepage key figure block: "€6.5" "billion in revenue in 2025"; "190 years and still innovating" history block; mission "Shaping a World of Trust". Counts of offices/employees/countries are **not** on the homepage. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Group "At a glance" page: "Employing 82,000 people around the world, serving 400,000 clients", "more than 1,600 offices and laboratories", "present in 140 countries", "€6.4 billion" revenue (search snippet of `/group`). — [group.bureauveritas.com/group](https://group.bureauveritas.com/group)
- Careers page cites "our 400,000 clients across 140 countries". — [group.bureauveritas.com/careers/leave-your-mark](https://group.bureauveritas.com/careers/leave-your-mark)
- About-us menu has "Governance" (Board of Directors, Executive Committee, Compensation of Corporate Officers, Related-party agreements), "Shaping a Better World" (Workplace, Environment, Business Practices, Ratings & Awards, Statements & Policies, CERT), "Suppliers", "History", and a 2025 Integrated Report PDF. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Investors menu: Capital Markets Day 2026, Why invest, Key figures, "Our 6 business activities", "The TIC market", Financial results/reports/presentations, Regulated information, Share price, Dividends, Analysts, "Subscribe to alerts", Shareholders' letter. Homepage hero carousel is dominated by investor press releases (Q3 2026 revenue 10.21.26, SBTi approval, CMD 2026, H1 2026 results). — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Code of Ethics is published as PDFs in several languages (English, Dutch, French) with sections "Bureau Veritas Whistleblower program" and "What to do in case of concern?"; the group "operational excellence" page says "Find here the latest version of our Code of Ethics"; contact form routes ethics concerns to "our dedicated whistleblowing channel" (ethicsline.bureauveritas.com). — [Code of Ethics EN PDF](https://benelux.bureauveritas.com/sites/g/files/zypfnx926/files/media/document/CODE%20OF%20ETHICS%20ENGLISH_0.pdf); [group.bureauveritas.com/operational-excellence](https://group.bureauveritas.com/operational-excellence); [group.bureauveritas.com/contact-form](https://group.bureauveritas.com/contact-form)
- UK certificate check page: "If the certificate you wish to validate includes a barcode, you can scan using the camera on your mobile device"; otherwise email `info-uk@bureauveritas.com` or use the form (Name, Company, Job Title, Phone, Email, Address, Country, Message). The UK footer has "Certificate Validity Check". — [bureauveritas.co.uk/needs/check-authenticity-certificates](https://www.bureauveritas.co.uk/needs/check-authenticity-certificates)
- Italy certificate register: search by "CERTIFICATE NUMBER", "COMPANY/ PERSON NAME", "CITY" with "Exact Match"; "Every search can provide a maximum of 50 results"; "LATEST UPDATE: 30/09/2026"; disclaimer "we cannot guarantee that the archive is fully complete". — [bureauveritas.it/certificate-register](https://www.bureauveritas.it/certificate-register)
- Marine e-certificates: "Certificate authenticity and validity can be verified via a secure online web portal using a QR code, URL or search via the certificate's unique tracking number." — [marine-offshore.bureauveritas.com newsroom](https://marine-offshore.bureauveritas.com/newsroom/bureau-veritas-launches-world-wide-e-certification)
- UK footer compliance links: Modern Slavery Act Statement (PDF), Statement of Investment Principles, UK&I QHSSE Statement, Carbon Reduction Plan 2026, Complaints Procedure, GDPR Portal. UK page text: "As a UKAS-accredited certification body" and "recognition by more than 40 accreditation bodies" (text only, no logos captured). — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/); [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001)
- Middle East contact page links a "Complaint and Appeal Policy" and a Forest and Wood Certification complaints document; the form has "Nature of complaint or appeal" and a Yes/No "complaint affects the organization's processes" question. — [middle-east.bureauveritas.com/contact-ustwasl-mna](https://middle-east.bureauveritas.com/contact-ustwasl-mna)
- Middle East site: "We serve more than 400,000 companies" (Your needs menu intro); "more than 40 years" in the region. — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- Group footer accessibility statement is labelled "Accessibility: non-compliant" (PDF). — [group.bureauveritas.com](https://group.bureauveritas.com/)

### Inferences
- BV does not rely on an accreditation-logo wall; TIC (smaller, less known) should do the opposite and make accreditations (ISO 17020 ANAB, GAFTA, APEDA, AIACI etc.) prominent with links to the accreditation body's register.
- The complaints/appeals pathway on the contact form is an ISO 17020/17065 accreditation requirement that TIC should mirror (public complaints & appeals policy + form "Case: Request / Complaint").
- A single global certificate-verification page (number/QR lookup) would exceed what BV offers publicly and is a strong trust feature for VoC CoC documents.

### Gaps
- No global BV certificate-verification URL was found; per-country tools only.
- Could not view accreditation logos/badges on any page (text fetch only).

## 6. Conversion and messaging (forms, quote, chat, WhatsApp, phone, newsletter, client portals)

### Takeaway
BV's conversion layer is understated: a long multi-step contact form (sales / press / complaint routing), country-site "Contact Us" nav items and "GET A FREE QUOTE" links, a prominent UK phone number, and a family of named client portals (Verigates, Veristar Info, Maestro, Swift, BVnet2, BV OneSource). No chatbot, WhatsApp, live chat or marketing newsletter was found in the captured HTML.

### Cited Findings
- Group contact form (`/contact-form`): "intended for SALES INQUIRIES, PRESS INQUIRIES and CUSTOMER COMPLAINTS (non-ethics related)"; fields First/Last name, Job title, Company, Email, Phone (country first), "Country / Territory of enquiry" (dropdown including non-countries "Abu dhabi" and "Dubai"), City/State, Subject (Sales / Press & Media / Complaint), Category, Service (Cybersecurity, Inspections, Industrial Product Certification, Certification & Management Services, Ships Classification, Supply Chain Risk Management, Testing & Analytics, Training, Other), Industry, six complaint-type checkboxes, "How can we help you?" text; data controller "Bureau Veritas Services, simplified joint-stock company"; retention "one year for media requests and ten years for customer complaints"; required policy checkbox + optional marketing consent; ethics → ethicsline.bureauveritas.com; jobs → jobs site; other inquiries → "the relevant contact form available on our country or global websites" or the place locator. — [group.bureauveritas.com/contact-form](https://group.bureauveritas.com/contact-form)
- Group homepage: "Client portal or login: None visible", "No 'Request a quote' button", "Chatbot: None visible", "Newsletter: None visible. The nearest item is 'Subscribe to alerts' under Investors." — [group.bureauveritas.com](https://group.bureauveritas.com/)
- UK header utility bar lists portals "Veristar Info, Maestro, Swift, BVnet2, and BV OneSource"; phone "t: 0345 600 1828" and "Swift Portal Queries: 0161 446 4783"; "Contact Us" is a main-nav item. — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- Middle East site: "No request-a-quote link, form, client portal, or login is visible" on home; the Inspection page CTA "GET A FREE QUOTE" → `https://middle-east.bureauveritas.com/contact-us`; contact page: "No WhatsApp or live chat is mentioned." — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/); [middle-east.bureauveritas.com/your-needs/inspection](https://middle-east.bureauveritas.com/your-needs/inspection); [middle-east.bureauveritas.com/contact-ustwasl-mna](https://middle-east.bureauveritas.com/contact-ustwasl-mna)
- China site CTAs: "在线服务申请" (online service application), "取得专家支持" (get expert support), "联系我们" via a JingSocial (WeChat CRM) link `https://app-u.jingsocial.com/surl/bR7ST0E`, plus three hotlines in the footer. — [bureauveritas.cn](https://www.bureauveritas.cn/)
- Verigates portal: account request via "not yet user" form; features as listed in section 4 (file tracking, document upload, messaging, certificate download, dashboards, alerts). — [verigates.bureauveritas.com/home/our-services](https://verigates.bureauveritas.com/home/our-services)
- Marine certificates "are sent by email and are uploaded to both the Veristar Info website and the My Veristar mobile application". — [marine-offshore.bureauveritas.com newsroom](https://marine-offshore.bureauveritas.com/newsroom/bureau-veritas-launches-world-wide-e-certification)
- UK lead magnet link `https://news.bureauveritas.net/l/591681/2025-05-29/3t8x2vv` (a marketing-automation tracking URL). — [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001)
- Treefrog case study for BV Laboratories (ex-Maxxam, North America): goals included "increase adoption of the Customer Portal"; Treefrog "continues to support BV in website development, digital strategy, and client portal adoption, along with lead generation". — [treefrog.ca](https://2019.treefrog.ca/?p=1584)

### Inferences
- A WhatsApp button, click-to-call and a short quote form would already put TIC ahead of BV's regional site on responsiveness, which matters for exporter/importer audiences in the Middle East.
- BV treats the portal as a product (Verigates tour page, slogans, dashboards). A TIC "client portal" page describing what clients get (request CoC, track files, download certificates) is a credible pattern even before the portal is built.

### Gaps
- Cookie banner, chat widgets and newsletter pop-ups are JavaScript-injected and may simply not appear in text fetches; "not found" is not proof of absence.
- The `/contact-us` page on the Middle East site (target of "GET A FREE QUOTE") was not fetched.

## 7. Content hub (news, insights, white papers, events, webinars, careers)

### Takeaway
Group content is split into "Insight" (Magazine articles with ~35 topic tags and a month filter) and "News" (newsroom filterable by type, e.g. press releases); white papers are referenced in the menu but not surfaced in the hub; webinars/events/case studies live on country sites' "Resources" menus. Careers is a full mini-site built around the "Leave your mark" employer brand.

### Cited Findings
- Magazine hub: reverse-chronological cards (thumbnail with credit e.g. "© Shutterstock", title, date "Oct. 13 2026", "Read more", tag links like "#Sustainability"); tag dropdown with ~35 topics via `/magazine?tag=<id>`; "Filter by month" from Jan 2018 to Oct 2026; "Load more items" pagination; featured block "Special case: DIGITAL @ BV"; "No white papers, videos, or webinars" shown; no newsletter signup. — [group.bureauveritas.com/magazine](https://group.bureauveritas.com/magazine)
- Insight menu: "Magazine (/magazine), Livre Blancs (white papers), and a 'Trust In Your World' 3D map banner"; News → `/newsroom` with faceted queries such as `/newsroom?type=press_release`. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Homepage "What's new" shows 3 dated items (e.g. "EU Machinery Regulation (EU) 2023/1230" news, Oct 16 2026). — [group.bureauveritas.com](https://group.bureauveritas.com/)
- UK "Resources" menu: case studies, news, webinars, Building Control Hub, technical resources, blog, "BEYOND: Your ISO Transition Hub". — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- Middle East home: "What's new" (press release, news, event) + a news feed dated 03.04.26 to 05.11.26 including "Kenya PVoC appointment", "ISO/IEC 42001 AI certification", "2026 Industrial Product Certification brochure". — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- Careers hub: mission "Shaping a World of Trust"; values "Trusted, Responsible, Ambitious & Humble, Open & Inclusive" each with two sub-values; cards "Why join us at BV?", "Diversity, equity & inclusion", "Join us" (careers.bureauveritas.com); "Our job offers" → `https://jobs.bureauveritas.com/gb/en/home`; "Meet our BV Trust Makers"; no employee stories or embedded video on the hub page. — [group.bureauveritas.com/careers/leave-your-mark](https://group.bureauveritas.com/careers/leave-your-mark)
- CPS division site (Dec 2019 relaunch) added "news filtering by market, year, and type" and "a new Insights and Innovations section". — [cps.bureauveritas.com newsroom](https://www.cps.bureauveritas.com/newsroom/bureau-veritas-cps-migrates-new-corporate-website)

### Inferences
- A single "Insights" hub with tag + date filters and one card template is enough; BV's split of News vs Magazine vs (hidden) white papers is more than TIC needs. TIC could use one hub with content types: News, Articles, Programme notices (VoC), Events, Downloads.
- Stock-photo credits ("© Shutterstock") on BV's magazine cards show even BV relies on stock imagery for editorial content.

### Gaps
- The white-papers page URL was not found (menu item had no link in captured HTML).
- Events/webinar listing pages were not fetched.

## 8. Visual design (colour, typography, imagery, icons, hero, density, mobile)

### Takeaway
Text-only fetching limits this section: what is verifiable is that BV uses a corporate photo-led style (carousel hero of press releases on the group site; Burj Khalifa hero on the Middle East site), question-led market tiles, leadership quotes with photos, all-caps section labels on regional sites, and stock photography with credits. Mobile behaviour and colour/typography could not be measured here.

### Cited Findings
- Group homepage hero is a **5-slide carousel of press releases** each with "Read More" (Q3 2026 revenue, SBTi, CMD 2026, Energy Transition Report, H1 2026). — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Market tiles are phrased as questions ("How to ensure safety in a high-risk environment?") with "View all Industries". — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Middle East hero: "Who we are" image (Burj Khalifa) with heading "WELCOME TO BUREAU VERITAS"; six "core services" tiles with "Read More"; leadership quote with photo; seven image market tiles; menu labels in all caps ("INDUSTRIES", "SUSTAINABILITY", "INSIGHT", "NEWS"). — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- UK homepage: hero claim as world leader in TIC with "Discover" button; quote from Antoine Giros, UK & Ireland Vice President, with photo; teaser dates use "MM.DD.YY" (e.g. 05.16.19) on a UK site. — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- Magazine cards carry photo credits such as "© Shutterstock". — [group.bureauveritas.com/magazine](https://group.bureauveritas.com/magazine)
- Drupal image styles in use indicate responsive image derivatives, e.g. `/styles/teaser_highlight_default_desktop/public/` and `/styles/teaser_img_desktop/public/`. — [group.bureauveritas.com](https://group.bureauveritas.com/); [bureauveritas.cn](https://www.bureauveritas.cn/)
- CPS relaunch (2019) self-described as "Web responsive and SEO friendly" with a "fresh new look and feel". — [cps.bureauveritas.com newsroom](https://www.cps.bureauveritas.com/newsroom/bureau-veritas-cps-migrates-new-corporate-website)
- No third-party UX review or mobile critique of BV's site was found; only self-reported press releases. (Search on 2026-10-21 returned none.)

### Inferences
- BV's group homepage behaves like an investor-relations site (press-release carousel) — not the model for TIC, whose homepage should sell services and programmes.
- All-caps labels and dense multi-column mega-menus on regional sites feel dated; TIC can go cleaner.

### Gaps
- Colour palette, typography, icon set, page density and mobile menu behaviour require a visual/browser review (not possible with text fetch). Recommend a screenshot pass with a real browser on group, Middle East, UK and Verigates sites.

## 9. Technology (CMS, hosting/CDN, cookie consent, analytics, accessibility, performance)

### Takeaway
All BV sites inspected are **Drupal** (multisite file paths `/sites/g/files/zypfnxNNN/`, `?itok=` image tokens, `/node/NNN` URLs, custom theme `bureauveritasbase`), hosted on **Acquia Cloud on AWS (Ireland)** per BV's own legal notice, with Amazon CloudFront + Varnish and **Didomi** consent per a Cloudflare Radar/Wappalyzer scan; the group site's accessibility statement is self-declared "non-compliant".

### Cited Findings
- Group legal notice: "the website is hosted by Acquia on Amazon Web Services Ireland Limited"; publisher Bureau Veritas SA, Neuilly-sur-Seine; publishing director Anette Rey, Chief Communications & Public Affairs Officer. — [group.bureauveritas.com/legals](https://group.bureauveritas.com/legals)
- Cloudflare Radar scan of group.bureauveritas.com (Wappalyzer definitions, undated) lists Drupal (CMS), Amazon CloudFront (CDN), Varnish (cache), Didomi (consent platform), Acquia Cloud Platform + AWS (PaaS), PHP. — [Cloudflare Radar scan](https://radar.cloudflare.com/es-la/scan/694bf0a3-944b-4433-b2d0-084c02900a4a/technology) (the page itself redirected and could not be read; details come from the search snippet)
- Drupal path evidence observed on 2026-10-21: group site `/sites/g/files/zypfnx196/files/`, `/styles/.../public/`, `?itok=`, `/files/media/document/`, `/newsroom?type=press_release`; UK `/sites/g/files/zypfnx216/files/styles/`; Middle East `/sites/g/files/.../files/styles/` served from `cdn1-middle-east.bureauveritas.com`; China `/sites/default/files/styles/teaser_img_desktop/public/`, `/themes/custom/bureauveritasbase/`, `node/3118`; Verigates `/sites/verigates/files/`, `/sites/verigates/themes/custom/verigates/`, assets on `cdn1-/cdn2-/cdn3-verigates.bureauveritas.com`; Benelux `/sites/g/files/zypfnx926/`; South East Asia `zypfnx986`; Estonia `zypfnx351`. — [group.bureauveritas.com](https://group.bureauveritas.com/); [bureauveritas.co.uk](https://www.bureauveritas.co.uk/); [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/); [bureauveritas.cn](https://www.bureauveritas.cn/); [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- Treefrog (agency) case study for BV Laboratories North America: "Custom drupal website development", "six different online properties and over 1000 pages", "website twinning". — [treefrog.ca](https://2019.treefrog.ca/?p=1584)
- bvna.com listed as built with Drupal in a Drupal directory. — [thedroptimes.com](https://upgrade.thedroptimes.com/website/58780/bvna) (search snippet; the related page `/website/62907/bureau-veritas` returned 403)
- Accessibility: group footer "Accessibility statement, labeled 'Accessibility: non-compliant' (PDF)"; "Skip to main content" links exist on Verigates. — [group.bureauveritas.com](https://group.bureauveritas.com/); [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- Cookie policy links: group `/cookies-policy`, UK `/cookie-policy`, Middle East `/cookies-policy-0` (the "-0" suffix is a Drupal duplicate-alias artefact). — [group.bureauveritas.com](https://group.bureauveritas.com/); [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/)
- Verigates account form path `/verigates/gsit/support/ask_account/form.do` indicates a separate Java (`.do`/Struts-style) application behind the Drupal front. — [verigates.bureauveritas.com](https://verigates.bureauveritas.com/)
- Marketing automation: UK lead-magnet link on `news.bureauveritas.net/l/...` (Pardot-style tracked link). — [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001)
- Redesign timing: no launch announcement for group.bureauveritas.com was found; footer copyright reads "© Bureau Veritas 2018-2026" (group) and "©Bureau Veritas 2019-2026" (Middle East); Magazine month filter starts January 2018; CPS division site relaunched Dec 12 2019; Benelux site launched Jul 8 2021. The Wayback Machine could not be queried from this environment. — [group.bureauveritas.com](https://group.bureauveritas.com/); [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/); [cps.bureauveritas.com newsroom](https://www.cps.bureauveritas.com/newsroom/bureau-veritas-cps-migrates-new-corporate-website); [benelux.bureauveritas.com newsroom](https://benelux.bureauveritas.com/en/newsroom/new-bureau-veritas-benelux-website)
- Several group-site pages (Government Services, Cross-Market Services) and the Drupal directory returned HTTP 403 to automated fetching, suggesting a WAF/bot filter is in place. (Observed directly.)

### Inferences
- The copyright ranges and the Jan-2018 magazine start suggest the current group Drupal platform dates from ~2018, with country sites migrated onto the shared `zypfnx` multisite in 2019-2021. Treat as inference, not confirmed.
- Enterprise Drupal on Acquia is a heavy, expensive stack chosen for 70+ sites; it is not required for a 13-office company. The lesson is "structured CMS with reusable page templates and a document library", not "use Drupal".

### Gaps
- Drupal version, analytics vendor (GA4/Matomo/Adobe), tag manager and Core Web Vitals could not be verified without the raw HTML/JS; recommend a browser-based Wappalyzer/PageSpeed check.
- Exact redesign dates unavailable (Wayback blocked).

## 10. Weak or dated things TIC should NOT copy

### Takeaway
BV's scale produces fragmentation and neglect: dead country domains, no Arabic, static office lists with typos, a press-release carousel homepage, buried white papers, no live chat/WhatsApp, "non-compliant" accessibility, and duplicated/inconsistent URLs and consent text.

### Cited Findings
- `www.bureauveritas.ae` and `www.bureauveritas.iq` do not resolve (DNS failure 2026-10-21); the "Our websites" list maps Israel and Iceland to the group site and Montenegro to `www.bureauveritas.com` (which just redirects). — observed; [middle-east.bureauveritas.com/our-websites](https://middle-east.bureauveritas.com/our-websites)
- Address error "Sinn EL El Fil, Beirut, London" on the Middle East offices page; 35 offices in one unfiltered vertical list, no map. — [middle-east.bureauveritas.com/our-offices-0](https://middle-east.bureauveritas.com/our-offices-0)
- Group contact-form country list includes non-countries "Abu dhabi" and "Dubai". — [group.bureauveritas.com/contact-form](https://group.bureauveritas.com/contact-form)
- UK ISO 9001 page: "The consent text appears twice, and one copy includes a stray placeholder ('{Personal data protection policy}')"; a URL typo `/certifcation/iso-27001-2022-understanding-transition` in the UK nav. — [bureauveritas.co.uk/certification/iso-9001](https://www.bureauveritas.co.uk/certification/iso-9001); [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- Group homepage hero = investor press releases; no client-facing CTA, no quote, no portal login, no newsletter, no chatbot. — [group.bureauveritas.com](https://group.bureauveritas.com/)
- "Livre Blancs" (white papers) menu item is in French on the English site and has no link; Magazine shows no white papers. — [group.bureauveritas.com](https://group.bureauveritas.com/); [group.bureauveritas.com/magazine](https://group.bureauveritas.com/magazine)
- Accessibility statement self-labelled "non-compliant". — [group.bureauveritas.com](https://group.bureauveritas.com/)
- Middle East site: mixed legacy URL patterns (`/industries/...` vs `/our-markets/...`, `/cookies-policy-0`, `/our-offices-0`, `/contact-ustwasl-mna`), all-caps nav, no Arabic language version, "GET A FREE QUOTE" leading to a generic contact page. — [middle-east.bureauveritas.com](https://middle-east.bureauveritas.com/); [middle-east.bureauveritas.com/your-needs/inspection](https://middle-east.bureauveritas.com/your-needs/inspection)
- Verigates public pages do not show process steps, fees or FAQs; "Request For Certificate Form" is a .docx download; programme list has no filters or scheme-type column. — [verigates.bureauveritas.com/sub-programme/iraq-voc?id=49](https://verigates.bureauveritas.com/sub-programme/iraq-voc?id=49); [verigates.bureauveritas.com/list-of-programmes](https://verigates.bureauveritas.com/list-of-programmes)
- UK site shows US-style dates ("MM.DD.YY", e.g. 05.16.19) and some teaser content dating back to 2019. — [bureauveritas.co.uk](https://www.bureauveritas.co.uk/)
- No independent UX/mobile review of BV's sites exists in search results; Similarweb estimates for the Australian domain show ~12-second average visit and ~1.48 pages/visit (estimate, not verified). — [similarweb.com](https://www.similarweb.com/tr/company/bureauveritas.com.au/)

### Inferences
- TIC should avoid per-country microsites, Word-document application forms, static office lists, and investor-style homepages; and should invest instead in an office map, bilingual (EN/AR) content, online VoC request forms with document checklists, and a visible accreditation/verification layer.

### Gaps
- Mobile-specific weaknesses are unverified (text fetch only).

## Appendix: URLs visited on 2026-10-21 and their status

- https://www.bureauveritas.com/ → 301 to https://group.bureauveritas.com/ (fetched OK)
- https://www.bureauveritas.com/en-gb → 301 to https://group.bureauveritas.com/en-gb (not fetched further)
- https://www.bureauveritas.ae/ → DNS ENOTFOUND
- https://www.bureauveritas.iq/ → DNS ENOTFOUND
- https://group.bureauveritas.com/markets-services → OK
- https://group.bureauveritas.com/industries/oil-gas → OK
- https://group.bureauveritas.com/contact-form → OK
- https://group.bureauveritas.com/magazine → OK
- https://group.bureauveritas.com/careers/leave-your-mark → OK
- https://group.bureauveritas.com/place-locator → OK but JS-only (title only)
- https://group.bureauveritas.com/government-services-international-trade → 404
- https://group.bureauveritas.com/markets-services/financial-services-public-sector/governments → 403
- https://group.bureauveritas.com/industries/cross-market-services → 403
- https://www.bureauveritas.co.uk/ → OK
- https://www.bureauveritas.co.uk/certification/iso-9001 → OK
- https://www.bureauveritas.co.uk/needs/check-authenticity-certificates → OK
- https://www.bureauveritas.co.uk/certification/check-certificate-validity → 404
- https://middle-east.bureauveritas.com/ → OK
- https://middle-east.bureauveritas.com/your-needs/inspection → OK
- https://middle-east.bureauveritas.com/our-websites → OK
- https://middle-east.bureauveritas.com/contact-ustwasl-mna → OK
- https://middle-east.bureauveritas.com/our-offices-0 → OK
- https://www.bureauveritas.cn/ → OK
- https://verigates.bureauveritas.com/ → OK
- https://verigates.bureauveritas.com/node/49 (Iraq) → OK
- https://verigates.bureauveritas.com/sub-programme/iraq-voc?id=49 → OK
- https://verigates.bureauveritas.com/programmes/egypt → OK
- https://verigates.bureauveritas.com/programmes/saudi-arabia → OK
- https://verigates.bureauveritas.com/list-of-programmes → OK
- https://verigates.bureauveritas.com/home/our-services → OK
- https://www.bureauveritas.it/certificate-register → OK
- https://benelux.bureauveritas.com/en/newsroom/new-bureau-veritas-benelux-website → OK
- https://www.cps.bureauveritas.com/newsroom/bureau-veritas-cps-migrates-new-corporate-website → OK
- https://2019.treefrog.ca/?p=1584 → OK (https://treefrog.ca/?p=1584 → 404)
- https://www.thedroptimes.com/website/62907/bureau-veritas → 403
- https://radar.cloudflare.com/... scan → redirect, not read (snippet only)
- http://web.archive.org/cdx/... → blocked by the fetch tool
