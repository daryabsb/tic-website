# Audit of the current TIC Quality Control website (ticqc.ae / ticqc.com)

Research date: 2026-10-21. Method: live fetches of ticqc.ae pages and sitemaps, raw HTML download of the homepage (curl), HTTP status checks, Wayback Machine CDX index and snapshots, LinkedIn guest view, web searches. Everything below is factual as observed on that date; anything not verified is marked as such in the Gaps sections.

URLs visited (all fetched successfully unless noted):
https://ticqc.ae/ · /robots.txt · /sitemap.xml (301 to /sitemap_index.xml) · /sitemap_index.xml · /page-sitemap.xml · /post-sitemap.xml · /category-sitemap.xml · /author-sitemap.xml · /post_tag-sitemap.xml · /about-us/ · /contact/ · /oil-gas/ · /marine/ · /food-inspection/ · /commodities-consumer-products/ · /vehicle-and-automotive-inspection/ · /government-services-programs-gsp/ · /iraq-coc/ · /egypt-coc/ · /botswana-coc/ · /libya-coi/ · /halal-certification/ · /csuas/ · /training/ · /testing/ · /testing-non-destructive-testing-ndt/ · /sfda-food-cosmetics-certification-saudi-arabia/ · /iraq-verification-of-conformity-program/ · /tic-agri-services/ · /sustainability/ · /iraq-coc-gujarat/ · /halal-webinar/ · /news/ · /news/2/ · /tic-quality-control-achieves-iso-iec-17020-accreditation-by-anab/ · /pt/ · /wp-json/wp/v2/users · https://ticqc.com/ · https://www.linkedin.com/company/tic-quality-control/ · https://about.me/ticqualitycontrol · https://anba.com.br/en/uae-inspection-company-to-enter-brazil/ · web.archive.org CDX and snapshots for ticqc.ae (2021-09, 2022-03, 2023-03, 2024-01, 2024-06) and ticqc.com (2019-11).

---

## 1. Full page inventory (menus, sub-pages, sitemap)

### Takeaway
The site is a WordPress/Elementor build with 49 pages and 34 posts in its Yoast sitemap, but the public navigation exposes only about 20 of those pages; roughly 25 pages (including the whole Testing sub-tree, SFDA, Agri, Sustainability, eight product-inspection pages and ten ISO course pages) are orphaned from the menu and reachable only via search engines or body links. Two different URLs are used for the same "Government Services Programs" item (one of them a 404).

### Cited Findings

**Sitemap structure** (Yoast SEO): sitemap index lists post-sitemap.xml (lastmod 2026-10-13), page-sitemap.xml (2026-10-08), category-sitemap.xml, post_tag-sitemap.xml (6 tags), author-sitemap.xml — [sitemap_index.xml](https://ticqc.ae/sitemap_index.xml). robots.txt contains only Cloudflare "content signals" boilerplate and no Sitemap: line or Disallow rules — [robots.txt](https://ticqc.ae/robots.txt).

**Main navigation as rendered on the homepage** — [ticqc.ae](https://ticqc.ae/):
- Home (/)
- About (/about-us/)
- Industries: Oil & Gas (/oil-gas/), Marine (/marine/), Food (/food-inspection/), Commodities & Consumer products (/commodities-consumer-products/), Vehicle and Automotive Inspection (/vehicle-and-automotive-inspection/)
- Services (links to "#"): Government Services Programs (GSP) (/government-services-programs-gsp/) with Iraq CoC Services (/iraq-coc/), Egypt CoC / CoI Services (/egypt-coc/), Botswana CoC (/botswana-coc/), Libya CoI (/libya-coi/); Business Assurance (links to "#") with Halal Certification (/halal-certification/), CSUAS (/csuas/); Training (/training/)
- News & Media (/news/)
- Contact (/contact/)
- Note: "Testing" (/testing/) is NOT in the header menu; it appears only in the homepage industry cards and the footer "Services" list — [ticqc.ae](https://ticqc.ae/), [training page](https://ticqc.ae/training/).

**Homepage "Our Industries" cards (8):** "Goverment Services Programs" (sic, links to /verification-of-conformity/ which returns HTTP 404), OIL & GAS, CONSUMER PRODUCTS, FOOD, MARINE, TESTING, TRAINING, Vehicle and Automotive Inspection — [ticqc.ae](https://ticqc.ae/); 404 status verified by curl on 2026-10-21.

**All 49 pages in page-sitemap.xml** (lastmod in brackets) — [page-sitemap.xml](https://ticqc.ae/page-sitemap.xml):
- Core: / (2026-08-18), /about-us/ (2026-08-18), /contact/ (2026-08-18), /news/ (2024-06-28)
- Industries: /oil-gas/ (2025-05-01), /marine/ (2024-09-26), /food-inspection/ (2025-04-30), /commodities-consumer-products/ (2024-09-25), /vehicle-and-automotive-inspection/ (2024-07-16)
- Government programmes: /government-services-programs-gsp/ (2025-11-02), /iraq-coc/ (2026-06-09), /iraq-verification-of-conformity-program/ (2026-04-21), /iraq-coc-gujarat/ (2026-07-31), /egypt-coc/ (2026-05-07), /libya-coi/ (2026-04-24), /botswana-coc/ (2026-10-07), /sfda-food-cosmetics-certification-saudi-arabia/ (2026-06-25)
- Business assurance: /halal-certification/ (2026-10-08), /halal-webinar/ (2026-07-31), /csuas/ (2026-07-08), /sustainability/ (2026-09-25)
- Testing tree: /testing/ (2024-09-25), /testing-non-destructive-testing-ndt/ (2024-09-20), /testing-oil-gas/, /testing-minerals-metal/, /testing-electrical-electronic/, /testing-hard-goods-toys/, /testing-cosmetics-hygiene/, /testing-textile-clothes/ (all 2024-09-25)
- Product-specific inspection pages (2026): /tic-agri-services/ (07-08), /noodles-inspection-services/ (07-30), /ceramic-porcelain-tile-inspection-services/ (08-03), /cosmetics-personal-care-products-inspection-services/ (08-04), /textile-fabric-inspection-services/ (08-14), /electrical-switches-sockets-breakers-testing/ (08-21), /paints-coatings-inspection-testing-services/ (08-21), /household-electrical-appliance-inspection-testing-services/ (08-21), /sanitary-ware-water-closet-inspection-services/ (08-21)
- Training course pages (all 2024-07-02): /iso-90012015-quality-management-system/, /iso-140012015-environmental-management-system/, /iso-220002018-food-safety-management-systems/, /iso-450012018-occupational-health-safety-management-system/, /hazard-analysis-critical-control-points/ plus the five matching "-internal-audit/" versions
- /training/ (2024-07-18)

**Orphan check:** none of the following URLs are linked anywhere in the homepage HTML: NDT, SFDA, Agri, Sustainability, Gujarat, Iraq VoC programme, Halal webinar, the 8 product inspection pages, /testing-oil-gas/, and the ISO course pages (grep count = 0 for each in the downloaded homepage HTML, 2026-10-21). The fetched pages themselves confirm they are not in the header menu: NDT ("The page is not in the main top navigation") — [NDT page](https://ticqc.ae/testing-non-destructive-testing-ndt/); SFDA ("does not appear in the header menu or the footer Services list") — [SFDA page](https://ticqc.ae/sfda-food-cosmetics-certification-saudi-arabia/); Sustainability ("appears only as a standalone page") — [Sustainability](https://ticqc.ae/sustainability/); Agri ("not listed in the main navigation") — [Agri](https://ticqc.ae/tic-agri-services/). The Gujarat page fetch reported it is reachable under Services > GSP > Iraq CoC Services via body links — [Gujarat](https://ticqc.ae/iraq-coc-gujarat/).

**News/posts:** 34 posts in post-sitemap.xml, dated 2024-06-28 to 2026-10-13 — [post-sitemap.xml](https://ticqc.ae/post-sitemap.xml). Two post URLs contain percent-encoded Unicode (bold mathematical letters and a flag emoji), e.g. `/%f0%9d%90%91%f0%9d%90%9a%f0%9d%90%a7...` and `/tic-quality-control-proudly-participated-in-the-global-halal-forum-2025-in-sao-paulo-%f0%9f%87%a7%f0%9f%87%b7/` plus a `-2` duplicate of the same post — [post-sitemap.xml](https://ticqc.ae/post-sitemap.xml). /news/ lists 6 posts per page with pagination /news/2/, /news/3/ — [news page 2](https://ticqc.ae/news/2/).

**Categories:** /category/services/, /category/services/food/, /category/uncategorized-en/, and /pt/category/blog/ — [category-sitemap.xml](https://ticqc.ae/category-sitemap.xml). Authors exposed via author sitemap: /author/daryabsb/, /author/katerina/, /author/manish/, /author/tic/ — [author-sitemap.xml](https://ticqc.ae/author-sitemap.xml).

### Inferences
- The menu was never updated to match the content created in 2026; the "Services" and "Business Assurance" parents linking to "#" and the Testing section missing from the header suggest the IA was hand-maintained in Elementor rather than driven by a structured content model.
- Two parallel Iraq pages (/iraq-coc/ and /iraq-verification-of-conformity-program/) plus the older GSP page containing an Iraq section means three pages compete for the same topic.

### Gaps
- The eight 2026 product-inspection pages and six testing sub-pages were not individually fetched (sitemap only); their content length and quality are unverified.

---

## 2. Service / industry / programme page content

### Takeaway
Content quality is two-tier: the 2024-era industry pages (Oil & Gas, Marine, Food, Commodities, Vehicles, Training, Testing) are short (350–650 words), have no forms, FAQs, downloads, pricing or process steps, and carry repeated typos; the 2026-era government programme pages (Iraq, Egypt, Botswana, Libya, Halal, CSUAS) are long (1,500–5,000 words) SEO-style pages with FAQs, process steps and download packs, but still no online application form.

### Cited Findings

| Page | Title tag | Approx. words | Forms | FAQ | Downloads | Pricing | Process steps |
|---|---|---|---|---|---|---|---|
| Oil & Gas | "Oil & Gas - TIC Quality Control" | ~650 | none | none | footer PDFs only | none | prose only |
| Marine | "Marine - TIC Quality Control" | ~400 | none | none | footer PDFs | none | none |
| Food | "Food Inspection - TIC Quality Control" | ~550 | none | none | footer PDFs | none | IP/DPI/FRI/LS listed, not explained |
| Commodities | "COMMODITIES & CONSUMER PRODUCTS - TIC Quality Control" | ~400 unique (sections duplicated 2–3x) | none | none | footer PDFs | none | none |
| Vehicles | "Vehicle and Automotive Inspection - TIC Quality Control" | ~450 | none | none | footer PDFs | none | 5-step damage survey |
| Training | "Training - TIC Quality Control" | ~350–400 | none | none | footer PDFs | none | no schedule/registration |
| Testing | "Testing - TIC Quality Control" | ~500 | none | none | footer PDFs | none | none; no accreditation named |
| GSP | "Government Services Programs (GSP)​ - TIC Quality Control" | ~700–900 | none | none | footer PDFs | none | Iraq doc list; Kurdistan vehicle CoC rules |
| Iraq CoC | "Iraq CoC Certification Services \| COSQC ICIGI Program \| TICQC" | ~4,500 | none (docx downloads) | 23 Qs | 4 files | none | RFR/SoR and unregistered workflows |
| Egypt CoC | "Egypt COC - Certificate of Conformity - TIC Quality Control" | ~5,000 | none | 8 Qs | 4 files | none ("quote after RFC") | 6 steps + registered route |
| Botswana CoC | "Botswana CoC Certificate \| SCSR Compliance \| Appointed by BOBS" | ~1,800–2,000 | none | 8 Qs | footer PDFs only | none | 6 steps |
| Libya CoI | "Libya CoI - Certificate of Inspection - TIC Quality Control" | ~1,500–2,000 | none | 0 | footer PDFs | **yes: 0.6% of FOB or USD 350 min** | 6 steps |
| Halal | "Halal Certification - TIC Quality Control" | long | 3 docx forms | none | ~19 files | fee PDF only | 6 steps |
| CSUAS | "CSUAS Certification \| UAS Certification Body in India \| TICQC" | ~2,000 | none | 8 Qs | 16 files | fee PDF only | 6 steps |
| SFDA | "Elementor #2124 - TIC Quality Control" | ~1,200–1,400 | none (external FASAH link) | none | none | none | 4 steps |

Sources: [oil-gas](https://ticqc.ae/oil-gas/), [marine](https://ticqc.ae/marine/), [food-inspection](https://ticqc.ae/food-inspection/), [commodities](https://ticqc.ae/commodities-consumer-products/), [vehicles](https://ticqc.ae/vehicle-and-automotive-inspection/), [training](https://ticqc.ae/training/), [testing](https://ticqc.ae/testing/), [GSP](https://ticqc.ae/government-services-programs-gsp/), [iraq-coc](https://ticqc.ae/iraq-coc/), [egypt-coc](https://ticqc.ae/egypt-coc/), [botswana-coc](https://ticqc.ae/botswana-coc/), [libya-coi](https://ticqc.ae/libya-coi/), [halal](https://ticqc.ae/halal-certification/), [csuas](https://ticqc.ae/csuas/), [sfda](https://ticqc.ae/sfda-food-cosmetics-certification-saudi-arabia/).

Specific content facts:
- Oil & Gas services: cargo measurement & QC, custody transfer inspection and bulk petroleum inventory, quality & quantity inspection, loading/offloading supervision, tank calibration, pipeline integrity testing; claim "Our advanced laboratory network meets ASTM, ISO, and other industry standards" — [oil-gas](https://ticqc.ae/oil-gas/).
- Marine services: Draft Survey, Ullage, Bunker Survey, Sealing/Unsealing, On/Off Hire Survey, Carrier Cleanliness Inspection, Hose Test — [marine](https://ticqc.ae/marine/).
- Food: Initial Production, During Production, Final Random Inspection, Loading Supervision, Damage Survey, "Food Safety & Agri Testing" (links to /testing/) — [food-inspection](https://ticqc.ae/food-inspection/).
- Commodities: minerals (urea, phosphate, coal, coke, sulfur), agricultural (wheat, rice, corn, oilseeds, sugar, cotton), metals, electrical/electronic, textiles, hard goods & toys, cosmetics; scopes: loading/offloading supervision, quality/quantity/weight control, sampling, packing & marking, visual inspection, damage surveys. Sections Metals, Textiles, Hard Goods, Agricultural appear 3 times each with near-identical copy (carousel leftover with "Previous"/"Next" labels) — [commodities](https://ticqc.ae/commodities-consumer-products/).
- Training: 5 awareness courses + 5 internal-audit courses (ISO 9001, 14001, 22000, 45001, HACCP), each linked to its own page; no dates, prices or sign-up — [training](https://ticqc.ae/training/).
- Testing: Physical, Chemistry & Nutritional, Microbiological; delivered through "partner labs"; no accreditation body named — [testing](https://ticqc.ae/testing/). NDT page: "TIC quality control performs Non-Destructive Testing (NDT) scopes through the sister company Seacorr" with a link to www.seacorr.com — [NDT](https://ticqc.ae/testing-non-destructive-testing-ndt/).
- GSP page contains an "Iraq Verification of Conformity Program (VOC)" section and a "KURDISTAN CERTIFICATE OF CONFORMITY (COC) FOR NEW AND USED VEHICLES EXPORTATION" section claiming TIC was "appointed as the sole Certification Body authorized to issue Certificates of Conformity (COC) for Vehicles" (CBCA program); typos "pass its inception", "Seat stern" — [GSP](https://ticqc.ae/government-services-programs-gsp/).
- Iraq CoC: "LOX-TICQC 'Partnership' has been appointed by the Central Organization for Standardization and Quality Control (COSQC)"; stats "15+ countries, 500+ experts, 10K+ certificates issued, 99% compliance rate"; downloads: Client-Declaration.docx, Request-for-Certification.docx, TIC-Company-Profile.pdf (1.88 MB, verified 200), Official-Letter-Iraq-CoC-Approval.jpg (all under /wp-content/uploads/2026/03/); 11 product categories; "ICIGI" is used in the title and FAQ but never defined; "VoC" and "CoC" used interchangeably — [iraq-coc](https://ticqc.ae/iraq-coc/).
- Egypt CoC: "TICQC has been appointed by GOEIC to implement Pre-Shipment Inspection, testing, and issuance of Certificates of Conformity"; form code TIC-IMS-EGY-FRM-25-01; downloads: Egypt-Regulated-Product-List-TIC-Quality-Control.pdf, TIC-IMS-EGY-FRM-25-01-RFC-GOEIC.docx, TIC-Company-Profile.pdf, COC-Format.jpg; FAQ states 3–5 working days with valid test reports, 2–6 weeks if testing needed; 20 regulated product categories listed; standards cited include IEC 60335, EN 71, ISO 8124, IEC 60227/60245, ISO 13006 — [egypt-coc](https://ticqc.ae/egypt-coc/).
- Botswana: "appointed by the Botswana Bureau of Standards (BOBS)"; "our first contract in Africa"; "fully enforceable since 1st April 2024"; regulated list on-page (Mechanical 22, Food 14, Agricultural 5, Electrical 61 — row 61 blank, rows 53–60 missing standards, "Circuit-breakers" duplicated); stat counters show 0 — [botswana-coc](https://ticqc.ae/botswana-coc/).
- Libya: "appointed by the Central Bank of Libya in collaboration with Al Shamila Services and Consultancy"; cites CBL Resolution No. 96 of 2015 and Libyan Accreditation Centre Notice ARN 2020/68; fee "0.6% of FOB value or USD 350, whichever is higher, plus applicable local tax"; two H1 tags — [libya-coi](https://ticqc.ae/libya-coi/).
- Halal: "i-CAS Halal Scheme"; claims "ISO/IEC 17065 accredited"; 3 forms labelled "Form being finalized" yet downloadable; ~19 documents (policies, SOPs, fee structure, mark-use rules); code mismatch "TIC-HAI-SOP-06" vs file "TIC-HAL-SOP-06"; "Impariality" misspelled in a filename — [halal](https://ticqc.ae/halal-certification/).
- CSUAS = Certification Scheme for Unmanned Aircraft Systems (India, Drone Rules 2021, DGCA/QCI); hero states "We are currently undergoing the QCI approval process to become a UAS Certification Body" while elsewhere calling itself a certification body; 16 downloads; alt-text typo "EGCA" — [csuas](https://ticqc.ae/csuas/).
- SFDA page: title tag and H1 are literally "Elementor #2124"; claims "SFDA Designated" and "ISO/IEC 17065 Accredited"/"Compliant" without naming an accreditation body; "Apply Now via FASAH" external link; no SABER/SASO mention — [sfda](https://ticqc.ae/sfda-food-cosmetics-certification-saudi-arabia/).
- Agri page: "ISO/IEC 17025 (NABL) for the laboratory" claim; "Request Inspection" links to #agri-contact anchor; stats block "15+ / 500+ / 10K+ / 99%" — [agri](https://ticqc.ae/tic-agri-services/).
- Sustainability: ESG Advisory, GHG Accounting & LCA, ESG Assurance, ISO 26000, EcoVadis readiness; EcoVadis graphic shows placeholder "0/100 SILVER" — [sustainability](https://ticqc.ae/sustainability/).
- Halal webinar: online "Internal 'Halal Audit' Program", 10 August 2026, ₹2000 + 18% GST, trainers Saood Alam Qasmi and Syed Mudassir Rahman, payment by UPI screenshot via WhatsApp; the page says "Fill in your details below" but contains no form; event date is past as of 2026-10-21 — [halal-webinar](https://ticqc.ae/halal-webinar/).
- Gujarat page: local landing page for Gandhidham office, 10 FAQs, ~1,800 words, no form — [gujarat](https://ticqc.ae/iraq-coc-gujarat/).

### Inferences
- The site has effectively become a document repository for the certification schemes (Halal ~19 files, CSUAS 16, Iraq 4, Egypt 4) with no version control visible beyond file-name codes; a rebuild needs a managed "documents & forms" library.
- No page offers a true online application; every CTA ends at the generic contact form, a .docx download, or an email address.
- The "15+ countries / 500+ experts / 10K+ certificates / 99%" stat block is reused on at least five pages while the homepage counters render "0+", so numbers are hard-coded per page rather than managed centrally.

### Gaps
- Content of the six /testing-*/ sub-pages, eight product inspection pages, and ten ISO course pages not fetched.
- Whether the Halal/CSUAS/SFDA ISO/IEC 17065 accreditation claims are backed by a certificate (no body or number shown on the site).

---

## 3. Offices and contact details

### Takeaway
The footer on every page lists 14 addresses in 12 countries, but phone numbers exist for only 4 countries and all e-mail addresses are hidden behind Cloudflare obfuscation; there is no map, no working hours, and several addresses contain errors (Sri Lanka "PO Code 28129" copies the Dubai P.O. Box, "King Fasial", "Maharagma").

### Cited Findings
- Addresses as printed on [ticqc.ae/contact/](https://ticqc.ae/contact/) and the global footer ([ticqc.ae](https://ticqc.ae/)):
  - UAE Dubai: Office 2101, Clover Bay Tower, Business Bay, P.O. Box 28129 — T +971 4 225 5555 — E (obfuscated)
  - UAE Sharjah: Office 6G-3 A, Hamriyah Free Zone
  - Iraq: 4th Floor, Al-Rabiah Building, 13th Street, Al-Mansour, Baghdad
  - China: Rm 6026, Yuehui Plaza, 1213 Yayun Rd, Guangzhou City
  - India Noida: Office 1020, ABC Tower 4, Sector 135, Noida, Delhi — T +91 92666 06587
  - India Gandhidham: 2nd Floor, Saraswati Avenue 1, Vandana Garbi Chowk, Gandhidham, Gujarat — T +91 92666 06587
  - Pakistan: P/130 M. A Johar Town, Lahore, Punjab — T +92 335 488 2213
  - Jordan: Office 303, Al-Hajar Al-Aswad Bldg., Amman
  - Saudi Arabia: 7069 Khalid bin Al Walid St., "King Fasial Dist.", Riyadh 13215 — T +966 56900 9151 — E (obfuscated)
  - Egypt: Apt. 11, First Floor, 33 Ahmed Heshmat St., Zamalek, Cairo
  - Brazil: Alameda Santos, 1470, Salas 201 e 202, Edifício Victória Park, São Paulo
  - Sri Lanka: 272B/2/1 High Level Road, "Maharagma", "PO Code 28129"
  - Thailand: No 4/1 Soi Sathron, Yan-nawa, Sathorn Dist., Bangkok 10120
  - Malaysia: LVL 7, MERCU 3, No. 3, Jalan Bangsar, KL ECO, 59200 Kuala Lumpur
- Compliance Code help line on the contact page: +971 56 410 6001 and +91 9266 606 587, e-mail obfuscated — [contact](https://ticqc.ae/contact/).
- Contact form fields: Name, Email, Phone Number, Organization, Enquiry type (Complaint / Request information / Request Quotation / Provide your feedback), Message, Send; no visible required markers or CAPTCHA; no map embed; no working hours — [contact](https://ticqc.ae/contact/).
- Homepage HTML contains no Google Maps iframe; the only iframe is Google Tag Manager — curl of [ticqc.ae](https://ticqc.ae/) 2026-10-21.
- E-mails are rendered through `/cdn-cgi/l/email-protection` (Cloudflare) so they are not readable in page text — [ticqc.ae](https://ticqc.ae/).
- Multiple pages claim "15+ Countries" while the address list has 12 countries — [libya-coi](https://ticqc.ae/libya-coi/).
- The About page's careers form has fields: message type, inquiry/suggestion, name, email, number, CV upload — [about-us](https://ticqc.ae/about-us/).

### Inferences
- Country pages per office do not exist; the footer is the only "locations" feature. A rebuild should give each office its own entry (map, local phone, local e-mail, local services, local language).

### Gaps
- Actual e-mail addresses could not be read (obfuscated). Whether the Contact Form 7 form has reCAPTCHA is unverified (the Permissions-Policy header references recaptcha.net and hcaptcha.com, which suggests a CAPTCHA plugin may be configured, but no widget was observed).

---

## 4. Accreditations, memberships and approvals shown

### Takeaway
The footer shows nine logos (ISO 9001/14001/45001 certificate images, ANAB ISO/IEC 17020, "TIC Counsel" (sic), Selo Associados, GAFTA Approved Superintendent, APEDA, AIACI), but no certificate numbers, scopes, or verification links; several large accreditation claims (ISO/IEC 17065, ISO/IEC 17025 NABL, SFDA designation, GOEIC, COSQC, BOBS, CBL) appear only as text on individual pages.

### Cited Findings
- Footer "Our Certifications" logo alt texts: ISO 45001, ISO 14001, ISO 9001, "ANAB Symbol CMYK 17020 Inspection", "TIC Counsel", "Selo Associados", "Gafta Approved Superintendent", APEDA, AIACI — [ticqc.ae](https://ticqc.ae/). Logo image files: certificate_0004_Iso-9001.jpg, certificate_0006_Iso-14001.jpg, certificate_0008_Iso-45001.jpg (uploaded 2024/06), ANAB-Symbol-CMYK-17020-Inspection-Transparent-Bkgr.png and TIC-counsel-2.png (2024/11), Gafta-Approved-Superintendent-logo.jpg.jpg (836 KB), aiaci.jpg (627 KB), apeda-1.jpg (566 KB), Selo-Associados-ENG-2.png (2025/04) — homepage HTML, 2026-10-21.
- News: "TIC Quality Control Achieves ISO/IEC 17020 Accreditation by ANAB", 2024-11-01, author Katerina Manakhova, ~150 words, scope and certificate number not stated — [article](https://ticqc.ae/tic-quality-control-achieves-iso-iec-17020-accreditation-by-anab/).
- Other accreditation posts (titles from sitemap): "TIC Quality Control India Achieves ISO/IEC 17020 Accreditation" (2025-03-10), "TICQC Expands Global Accreditation: Now ISO/IEC 17020 Certified in Saudi Arabia and China" (2025-11-02), "TIC Quality Control Achieves GOEIC Accreditation for Egypt's VOC Program" (2025-11-02), "Thrilled to Announce: TIC Quality Control joins the TIC Council!" (2024-11-08), "LOX and TIC Quality Control win major certification program for goods imported into the Republic of Iraq" (2024-07-22), "Iraqi Quality Mark" (2024-09-26) — [post-sitemap.xml](https://ticqc.ae/post-sitemap.xml).
- Programme-level claims: COSQC appointment (Iraq, LOX-TICQC partnership) with an approval letter JPG — [iraq-coc](https://ticqc.ae/iraq-coc/); GOEIC appointment (Egypt) — [egypt-coc](https://ticqc.ae/egypt-coc/); BOBS appointment (Botswana) — [botswana-coc](https://ticqc.ae/botswana-coc/); Central Bank of Libya with Al Shamila (Libya) — [libya-coi](https://ticqc.ae/libya-coi/); "SFDA Designated", "ISO/IEC 17065 Accredited" — [sfda](https://ticqc.ae/sfda-food-cosmetics-certification-saudi-arabia/); "ISO/IEC 17065 accredited" (Halal) — [halal](https://ticqc.ae/halal-certification/); "ISO/IEC 17025 (NABL)" lab — [agri](https://ticqc.ae/tic-agri-services/); Kurdistan vehicle CoC "sole Certification Body" — [GSP](https://ticqc.ae/government-services-programs-gsp/).
- LinkedIn post (2 weeks before 2026-10-21): "Preparing for the next stage of the SFDA program in Saudi Arabia, following ISO/IEC 17065 achievement for Saudi requirements" — [LinkedIn](https://www.linkedin.com/company/tic-quality-control/).
- The About page itself lists no accreditations; it only says staff are "Internationally Certified" — [about-us](https://ticqc.ae/about-us/).
- No page on the site offers certificate verification/lookup; no "Accreditations" page exists in the sitemap — [page-sitemap.xml](https://ticqc.ae/page-sitemap.xml).

### Inferences
- The logo strip has drifted from the current reality (no ISO/IEC 17065, NABL, GOEIC, BOBS, SFDA, COSQC marks) and the three "ISO" images are scans of certificates rather than accreditation-body marks.
- "TIC Counsel" is a misspelling of TIC Council in alt text and filename, visible to screen readers and search engines.

### Gaps
- None of the accreditations were independently verified against ANAB, GAFTA, APEDA, GOEIC, COSQC or BOBS registers in this audit (out of scope; the site gives no certificate numbers to look up).

---

## 5. Technology fingerprint

### Takeaway
WordPress 6.8 on PHP 7.4.33 (end-of-life since Nov 2022), Hello Elementor theme with Elementor 3.28.3 + Elementor Pro, Contact Form 7, Yoast SEO 27.7, Complianz GDPR, Polylang (pll_language cookie, EN/PT) and GTranslate, Google Tag Manager GTM-5KRPQDSK, Cloudflare in front (edge in Sofia for this test), HTTPS enforced with www and .com redirecting to https://ticqc.ae/. Homepage weighs about 3.45 MB (37 assets, 20 JS files, three ~600–840 KB logo JPEGs). PageSpeed Insights could not be run (API quota exhausted), so Core Web Vitals are unverified.

### Cited Findings
- Response headers for https://ticqc.ae/ (2026-10-21): `Server: cloudflare`, `X-Powered-By: PHP/7.4.33`, `cf-cache-status: DYNAMIC`, `Set-Cookie: pll_language=en`, `Link: <https://ticqc.ae/wp-json/>; rel="https://api.w.org/"`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, Permissions-Policy header referencing google.com, recaptcha.net, challenges.cloudflare.com, hcaptcha.com — curl headers, [ticqc.ae](https://ticqc.ae/).
- Generator meta tags: `WordPress 6.8` and `Elementor 3.28.3; features: e_font_icon_svg, additional_custom_breakpoints, e_local_google_fonts; settings: css_print_method-external, google_font-enabled, font_display-swap` — homepage HTML.
- Theme: `wp-content/themes/hello-elementor`. Plugins referenced in HTML: elementor (15 refs), elementor-pro (10), contact-form-7 (3), complianz-gdpr (2), gtranslate (1). Yoast SEO v27.7 appears in REST output — homepage HTML and [wp-json users](https://ticqc.ae/wp-json/wp/v2/users).
- Analytics: Google Tag Manager container `GTM-5KRPQDSK` (script + noscript iframe). No GA4/UA IDs, Facebook pixel, Hotjar or Clarity found in the HTML — homepage HTML.
- Viewport meta present (`width=device-width, initial-scale=1`), `<html lang="en-US">`, canonical set, Open Graph tags with `og:locale:alternate pt_BR`, hreflang en and pt — homepage HTML.
- Meta description: "TICQC - TIC Quality Control - Best Testing Inspection and Certification Company for exporters and importers globally" — homepage HTML.
- Homepage HTML 116,822 bytes; 37 linked assets totalling 3,336,101 bytes (so ~3.45 MB with HTML); 20 JS files, 0 external CSS files (Elementor prints CSS externally but none matched the pattern); largest assets are Gafta-Approved-Superintendent-logo.jpg.jpg 835,807 B, aiaci.jpg 626,973 B, apeda-1.jpg 565,762 B — curl measurement 2026-10-21.
- Redirects: http://ticqc.ae → 301 https://ticqc.ae/; https://www.ticqc.ae → 301; http://ticqc.com and https://www.ticqc.com → 301 https://ticqc.ae/ — curl 2026-10-21. [ticqc.com](https://ticqc.com/) returns 301 to https://ticqc.ae/.
- Admin surface: /wp-login.php returns 200 (publicly reachable); /xmlrpc.php returns 405 (blocked); /wp-json/wp/v2/users returns 200 and lists users Darya Ibrahim (slug daryabsb), Katerina Manakhova, Manish Kumar Yadav, Nejim Albukhari, TIC — curl 2026-10-21, [users endpoint](https://ticqc.ae/wp-json/wp/v2/users).
- Site search enabled (`/?s=test` returns 200 with results page); Elementor search form in header — homepage HTML.
- Cookie banner (Complianz) shows unrendered placeholders "{title}" and "Manage {vendor_count} vendors" on every page fetched — e.g. [ticqc.ae](https://ticqc.ae/), [marine](https://ticqc.ae/marine/).
- Language: Polylang-style /pt/ exists (HTTP 200, 72 KB) but its content is in English, shows an "Archives" heading and no hero/body content; /ar/ returns 404. GTranslate widget script is loaded (`gtranslate/js/popup.js`) — curl 2026-10-21, [pt home](https://ticqc.ae/pt/).
- PageSpeed Insights API returned HTTP 429 "Quota exceeded for quota metric 'Queries' and limit 'Queries per day'" (shared anonymous quota) — attempted 2026-10-21.

### Inferences
- PHP 7.4 reached end-of-life on 28 Nov 2022, so the host is running an unsupported runtime; this is a security and vendor-support issue independent of the redesign.
- The open REST users endpoint and reachable wp-login.php expose staff usernames (including the current user's own account "daryabsb") for credential-stuffing; a rebuild (or an interim fix) should close these.
- Two translation plugins (Polylang and GTranslate) coexist; the PT site is a stub, meaning the Brazil office (opened 2025) has no real Portuguese presence.
- Page weight of ~3.4 MB with three logo JPEGs over 500 KB each will fail LCP on mobile; the images are simply unoptimised uploads.

### Gaps
- Core Web Vitals / Lighthouse scores: not obtained (API quota). Hosting provider behind Cloudflare: not determinable from headers. Whether a CAPTCHA is active on Contact Form 7: unverified.

---

## 6. Content, branding and tone

### Takeaway
The brand is "TIC Quality Control" with the tagline "Expert Quality Control & Inspection Services" on site and "Consulting Services & Quality Solutions" on LinkedIn; imagery is mostly logos and a few reused product photos with empty alt text; the copy mixes promotional claims with heavy SEO text, and leftover "Seacorr" references and "Elementor #2124" titles show incomplete editorial control.

### Cited Findings
- Title tag: "TICQC - TIC Quality Control - Testing Inspection Certification"; hero tagline "Expert Quality Control & Inspection Services"; About teaser "Driving Excellence, Ensuring Compliance: Your Quality Control Partner"; hero counters "Employees / Global Clients / Countries / Inspections & Projects Completed" all render "0+" — [ticqc.ae](https://ticqc.ae/).
- LinkedIn tagline: "Consulting Services & Quality Solutions"; About text describes "a Dubai-based quality control and calibration services firm" — [LinkedIn](https://www.linkedin.com/company/tic-quality-control/).
- About page: Mission "To become the preferred global, regional, and local solution provider and to lead the inspection and third-party services market..."; hiring criteria "university degree with engineering background; internationally certified; minimum of 5 years' experience; bilingual speakers"; People section says "ongoing training and education for our team at Seacorr" and "Services Offered by Seacorr"; no founding year, no leadership names, no history — [about-us](https://ticqc.ae/about-us/).
- Section heading "AdDresses" appears in the footer of every page fetched — e.g. [oil-gas](https://ticqc.ae/oil-gas/), [news](https://ticqc.ae/news/).
- Image alt text is empty on industry pages; the same textile and metals images are reused three times on the Commodities page; filenames like Testing-Electronics.jpg, Cosmetics.jpg, Fertilizers.jpg — [commodities](https://ticqc.ae/commodities-consumer-products/). The Oil & Gas page contains "a dated screenshot (April 2025)" as an image — [oil-gas](https://ticqc.ae/oil-gas/).
- Colour palette: the homepage CSS exposes only the WordPress default colour tokens (#0693e3, #cf2e2e, #ff6900 etc.) and `font-family: inherit`; Elementor global colours/fonts are in external CSS not inspected — homepage HTML. (Brand colours therefore unverified here.)
- Logo file: Group-2.png / cropped-Group-2.png (uploaded 2024/06) — homepage HTML.
- Name variants observed: "TIC Quality Control" (title tags), "TICQC" (title tags on Iraq/CSUAS pages, homepage), "TIC QC" ("Why Choose TIC QC HALAL Certification?") — [halal](https://ticqc.ae/halal-certification/); "LOX-TICQC 'Partnership'" — [iraq-coc](https://ticqc.ae/iraq-coc/); "TIC" alone — [commodities](https://ticqc.ae/commodities-consumer-products/); "Tic Quality Control" (title in June 2024 Wayback snapshot) — [Wayback 2024-06](https://web.archive.org/web/20240620000000/https://ticqc.ae/).
- No copyright line anywhere in the homepage HTML (grep for "copyright", "©", "&copy;" returned nothing) — homepage HTML.
- News post style: ~150-word announcement, author shown, date shown, no category, no share buttons, no comments, two related posts — [ANAB article](https://ticqc.ae/tic-quality-control-achieves-iso-iec-17020-accreditation-by-anab/). News listing shows "No Comments" label on every entry and the six items are duplicated at the bottom of the page — [news](https://ticqc.ae/news/).

### Inferences
- Headings in ALL CAPS on 2024 pages versus Title Case on 2026 pages, and 350-word pages next to 5,000-word pages, reflect at least two different authors/eras with no style guide.
- The "Seacorr" leftovers confirm the About copy was adapted from the sister company's site.

### Gaps
- Actual brand colours and typography (Elementor global kit) were not extracted; a screenshot review in a browser would be needed.

---

## 7. Visible weaknesses (broken links, outdated content, inconsistencies, missing features)

### Takeaway
The most consequential defects are: a 404 behind the homepage "Government Services Programs" card and every footer "GSP" link; no privacy policy, terms, or copyright; no certificate verification or client portal; an SFDA page published under the title "Elementor #2124"; a Portuguese site that is an empty English shell; exposed WordPress user list; and dozens of repeated typos ("AdDresses", "Goverment", "Fasial", "Maharagma", "sulfer", "independient").

### Cited Findings
- Broken internal link: /verification-of-conformity/ returns HTTP 404 yet is linked from the homepage GSP card and from the footer "Services" list on every page ("The GSP link goes to /government-services-programs-gsp/ in the navigation but to /verification-of-conformity/ in the footer") — curl 2026-10-21; [ticqc.ae](https://ticqc.ae/), [testing](https://ticqc.ae/testing/). Vehicles page also links a misspelled `goverment-services-programs-gsp` — [vehicles](https://ticqc.ae/vehicle-and-automotive-inspection/).
- Missing pages: /privacy-policy/ 404, /careers/ 404, /ar/ 404 — curl 2026-10-21. No privacy, terms or cookie-policy page link exists in the homepage HTML (only the two policy PDFs) — homepage HTML.
- Menu parents "Services" and "Business Assurance" link to "#" — [marine](https://ticqc.ae/marine/).
- Page published with placeholder title "Elementor #2124 - TIC Quality Control" (SFDA Saudi page) — [sfda](https://ticqc.ae/sfda-food-cosmetics-certification-saudi-arabia/).
- Botswana page shows two different title tags in the same capture — [botswana-coc](https://ticqc.ae/botswana-coc/).
- Libya page has two H1 elements — [libya-coi](https://ticqc.ae/libya-coi/).
- Homepage stat counters display "0+" for all four figures; Botswana page counters show "0" — [ticqc.ae](https://ticqc.ae/), [botswana-coc](https://ticqc.ae/botswana-coc/).
- Cookie banner shows unrendered "{title}" and "{vendor_count}" on all pages — [ticqc.ae](https://ticqc.ae/).
- Outdated: Halal webinar page for 10 Aug 2026 still live with payment QR — [halal-webinar](https://ticqc.ae/halal-webinar/). CSUAS page says approval still pending — [csuas](https://ticqc.ae/csuas/). Halal forms labelled "Form being finalized" — [halal](https://ticqc.ae/halal-certification/).
- Duplicate content: Commodities sections repeated 2–3 times; Iraq topic spread over /iraq-coc/, /iraq-verification-of-conformity-program/ and the GSP page; the Global Halal Forum post exists twice (`...-sao-paulo-%f0%9f%87%a7%f0%9f%87%b7/` and `...-2/`) — [commodities](https://ticqc.ae/commodities-consumer-products/), [post-sitemap.xml](https://ticqc.ae/post-sitemap.xml).
- Typos (verbatim): "AdDresses" (global footer), "Goverment Services Programs" (homepage card), "King Fasial Dist." (Riyadh address), "Maharagma" and "PO Code 28129" (Sri Lanka), "sulfer", "roads and billet", "coke,sulfer…etc" (Commodities), "#independient" anchor (Oil & Gas, Vehicles), "We ensures impartiality", "We also entails" (Oil & Gas), "silled", "variuos", "Assesment" (About), "pass its inception", "Seat stern" (GSP Kurdistan), "Impariality" (Halal and CSUAS file names), "Gafta-Approved-Superintendent-logo.jpg.jpg", "TIC Counsel" (logo alt), "EGCA" (CSUAS alt text), "Cradling of sorghum grain", "Potable rechargeable fire extinguishers" (Botswana list) — sources as cited in sections 2–6.
- Hidden zero-width characters inside the "Government Services Programs (GSP)​" menu label and title tag — [GSP](https://ticqc.ae/government-services-programs-gsp/), [vehicles](https://ticqc.ae/vehicle-and-automotive-inspection/).
- Post URLs containing encoded emoji and Unicode bold letters (see section 1) — [post-sitemap.xml](https://ticqc.ae/post-sitemap.xml).
- Missing features (verified absent in sitemap and fetched pages): privacy policy, terms of use, copyright notice, certificate verification/lookup, client portal/login, online application forms for CoC programmes, training calendar/booking, careers page (only a form on About), accreditation page with certificate numbers, office/country pages, Arabic language, functional Portuguese language, sitemap page, site-wide CTA for quotes — [page-sitemap.xml](https://ticqc.ae/page-sitemap.xml) and pages cited above.
- Security exposure: /wp-json/wp/v2/users lists five user accounts with names; /wp-login.php reachable; PHP 7.4.33 (EOL) — curl 2026-10-21.

### Inferences
- The site has no editorial QA gate: a page titled "Elementor #2124" and a 404 on the homepage have survived for months (GSP page lastmod 2025-11-02; homepage lastmod 2026-08-18).
- Because the footer is a shared Elementor template, one fix would clear "AdDresses" and the 404 GSP link site-wide, which suggests nobody owns the template.

### Gaps
- A full automated broken-link crawl was not run (only the links observed on fetched pages and the status checks listed were tested).

---

## 8. External presence linked from the site

### Takeaway
LinkedIn is the only social channel linked from the site and it is active (16,340 followers, 75 listed employees, posts weekly, "founded 2020"); there are no YouTube, Facebook, Instagram or X links. An about.me profile and third-party directory entries exist but are not linked from the site.

### Cited Findings
- Footer "Follow us" contains a single link: https://www.linkedin.com/company/tic-quality-control/?viewAsMember=true (note the `?viewAsMember=true` parameter, an admin-view URL) — [ticqc.ae](https://ticqc.ae/).
- LinkedIn guest view: name "TIC Quality Control", tagline "Consulting Services & Quality Solutions", 16,340 followers, 75 employees on LinkedIn, company size 51–200, industry "International Trade and Development", HQ Dubai, "Self-owned, founded 2020", website https://ticqc.ae. Recent posts: hiring a Technical Evaluator for UAS certification (10h), International Soy Conclave 2026 Indore (1d), Botswana SCSR guide (1w), SFDA next stage after ISO/IEC 17065 (2w), hiring Accounts executive Ahmedabad (2w), e-waste/EPR specialist network (3w), GHG & LCA services (3w), ESG advisory (3w), condolence post (1mo), CSUAS drone certification (1mo) — [LinkedIn](https://www.linkedin.com/company/tic-quality-control/).
- about.me/ticqualitycontrol: profile "TIC Quality Control TICQC", tagged "marketing and tic in India", lists 11 operating countries, links only to ticqc.ae, no social links — [about.me](https://about.me/ticqualitycontrol).
- ZoomInfo lists the company as 51–200 employees, revenue under $5 million (third-party estimate) — [ZoomInfo via search](https://www.zoominfo.com/c/tic-quality-control/556212734). A SlideShare company presentation exists — [SlideShare](https://www.slideshare.net/slideshow/tic-quality-control-pdf-consulting-services-quality-solutions/275614700).
- ANBA (Brazil-Arab News Agency), 13 May 2025: quotes Bayar Khalifa, "financial manager of TIC Quality Control"; company HQ Dubai with branches in China, India, Egypt and Jordan; plan to open a São Paulo office "within the next four months"; first Brazil event APAS Show; target "20% of Brazilian companies that currently certify with competitors"; initial focus meat and sugar — [ANBA](https://anba.com.br/en/uae-inspection-company-to-enter-brazil/).
- The NDT page links externally to www.seacorr.com (sister company) — [NDT](https://ticqc.ae/testing-non-destructive-testing-ndt/).

### Inferences
- LinkedIn is publishing more current service lines (ESG, GHG/LCA, e-waste/EPR, SFDA 17065) than the website menu exposes; the website lags the company's actual positioning.

### Gaps
- No YouTube, Facebook or Instagram accounts were found via the site; whether unofficial ones exist was not searched.

---

## 9. Search visibility and URLs that matter for migration/redirects

### Takeaway
`site:` operators returned nothing through the available search tool, but a name search surfaced indexed ticqc.ae URLs (home, about, news, two accreditation posts, the NDT page), and the Wayback index shows that ticqc.ae has been crawled continuously since September 2021 while ticqc.com was a different (Arabic games) site in 2019–2020. All 49 page URLs and 34 post URLs in the sitemap should be treated as the redirect map.

### Cited Findings
- WebSearch `site:ticqc.ae` and `site:ticqc.com` returned only unrelated domains (operator not honoured by the tool) — searches run 2026-10-21.
- Search `ticqc.ae "TIC Quality Control"` returned these indexed ticqc.ae URLs: https://ticqc.ae/, /about-us/, /news/, /tic-quality-control-achieves-goeic-accreditation-for-egypts-verification-of-conformity-voc-program/, /thrilled-to-announce-tic-quality-control-joins-the-tic-council/, /testing-non-destructive-testing-ndt/ — search result list 2026-10-21.
- Wayback CDX for ticqc.ae/: captures in 2021-09 (200), 2021-12 (301), 2022-03 (200), 2023-01 (301), 2023-03, 2023-11, 2024-01, then monthly from 2024-04 through 2026-10 — [Wayback CDX](https://web.archive.org/cdx/search/cdx?url=ticqc.ae/&output=txt&fl=timestamp,statuscode).
- Wayback snapshot 2021-09: a 1.7 KB JavaScript app shell titled "tic" with the text "We're sorry but tic doesn't work properly without JavaScript enabled" and a logo at /assets/images/logo.png (a non-WordPress single-page app) — [Wayback 2021-09](https://web.archive.org/web/20210915000000/https://ticqc.ae/).
- Wayback snapshot 2022-03: WordPress 5.9.2 with WooCommerce 6.3.1 and the "Booked" appointment plugin, title "TIC Quality Control", 210 KB HTML — [Wayback 2022-03](https://web.archive.org/web/20220315000000/https://ticqc.ae/).
- Wayback snapshot 2024-06: title "Tic Quality Control", 32 KB — [Wayback 2024-06](https://web.archive.org/web/20240620000000/https://ticqc.ae/). Current site's earliest upload folder is 2024/06 and the earliest page lastmod is 2024-06-28 (/news/) — [page-sitemap.xml](https://ticqc.ae/page-sitemap.xml).
- Wayback for ticqc.com: captures 2019-11-13 (200), 2020-01-12 (200), 2021-12-28 (302), 2025-01-28 (200). The 2019 capture is titled "ticqc | الصفحة الرئيسية" and contains links to /category/action, /category/arcade, /category/casino, /category/puzzle etc. (an Arabic online-games site, not TIC) — [Wayback CDX ticqc.com](https://web.archive.org/cdx/search/cdx?url=ticqc.com/&output=txt&fl=timestamp,statuscode), [Wayback 2019-11](https://web.archive.org/web/20191113031328/http://ticqc.com/).
- Today ticqc.com and www.ticqc.com 301 to https://ticqc.ae/ — curl 2026-10-21.

### Inferences
- The site has had at least three generations: a JS single-page app (2021), a WordPress + WooCommerce/Booked build (2022–early 2024), and the current Hello Elementor build (from ~June 2024). The user's statement that "the design philosophy is still the old one" is consistent with content being ported across these without re-architecting.
- Because ticqc.com had an unrelated history, its backlink profile is not an asset; the .ae domain carries the SEO equity and all 83 sitemap URLs plus the four author archives and four category archives should be mapped 1:1 or 301'd in the rebuild.

### Gaps
- Actual Google index count and ranking keywords could not be obtained (no Search Console access; `site:` operator unsupported by the search tool). Google Search Console export is needed from the current WordPress admin before migration.
- Backlink profile not assessed.

---

## 10. Items to preserve or migrate (checklist derived from the above)

- 49 page URLs + 34 post URLs (section 1) and all /wp-content/uploads/ documents linked from Iraq, Egypt, Halal, CSUAS pages and the footer policies (Impartiality Policy TIC-IMS-IMP-A-25-10, QMS Policy TIC-IMS-QM-A-24-05, Company Profile 2026/03).
- Government programme content: process workflows, document lists, product scopes, FAQs (Iraq 23, Egypt 8, Botswana 8, CSUAS 8, Gujarat 10), Libya fee rule, Egypt turnaround times.
- Office list (14 addresses, 12 countries) after correction of the Sri Lanka, Riyadh and Maharagama errors.
- Accreditation logos, to be re-supplied as proper vector marks with certificate numbers.
- GTM container GTM-5KRPQDSK and Complianz consent categories (if the same analytics stack is kept).
- Author accounts (Darya Ibrahim, Katerina Manakhova, Manish Kumar Yadav, Nejim Albukhari, TIC) for post attribution.
- LinkedIn link (strip `?viewAsMember=true`).
