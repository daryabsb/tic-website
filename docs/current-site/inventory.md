# Inventory: the 56 pages of the current site (ticqc.ae) and where each goes

> **After this map was made (T43, D82):** Egypt, Botswana and Libya are loaded as program
> pages (`seed/program-pages.yaml`); Saudi Arabia SFDA is held in that file until a director
> confirms the designation. The "Paints & Coatings" page is not moved: on the current site
> its body is a second copy of the sanitary ware text. The Iraq Verification of Conformity
> page is also an article now. Sure single facts that are applied: the Lahore phone, the
> careers criteria, the training overview, the client declaration form in the Iraq
> checklist. `facts.json` beside this file holds all 92 facts with their source quotes.

Made on 2026-11-22 from `old/*.txt` (text of each page, header and footer removed), `seed/redirects.csv` (the decided address map), `pages/*.txt` and `gaps_final.json` (the new site), and the outputs of the other agents in `move_out/`.

Note: `seed/redirects.csv` changed at 13:12 while this file was made (ticket T43: the product pages and two Iraq pages become insight articles; Egypt, Botswana and Libya get program pages). This table follows the newer file and `seed/current-pages.json`.

Size = characters of the page text, without the address and title lines. The single facts are in `facts.json`; ids such as LHE-02 are the ids of the open items list. In the column 'New page', the address in brackets is the fallback column of the redirect map.

| # | Current address | What it holds | Size (chars) | New page that takes it | State |
|---|---|---|---:|---|---|
| 1 | / | Hero, four counters, eight industry cards, three news titles | 2,524 | /en/ | already on the new site: /en/ has new text of its own; industries.yaml uses the industry lines. The four counters (Employees, Global Clients, Countries / Markets, Inspections & Projects Completed) show '0 +' in the saved text: read the numbers on the live page |
| 2 | /about-us/ | Organization, people, hiring criteria, mission, vision, values, compliance principle, careers | 3,385 | /en/about/ | can move: mission, vision, values and the TIC Council compliance principle to /en/about/ (a new part; the page has none); hiring criteria and careers text to /en/about/careers/ (HRD-02, HRD-06, HRD-07, HRD-08). Two lines name Seacorr: write TIC |
| 3 | /contact/ | Contact text, help line, form, addresses in eleven countries | 1,557 | /en/contact/ | can move: help line +971 56 410 6001 and +91 9266 606 587 to /en/contact/ and /en/about/complaints/. The addresses are already on /en/contact/ and /en/offices/ |
| 4 | /news/ | News list: the six newest articles, dates and summaries | 11,357 | /en/news/ | already on the new site: /en/news/ (the six articles are news pages) |
| 5 | /elementor-2430/ | Official documents: six policy PDFs with their codes | 602 | /en/ | can move: Quality Policy TIC-PY-01, Confidential & Ethical Conduct TIC-CE-01 and Access to Non-Confidential Information to /en/downloads/ (get the files from the live site); TIC-PY-02 and Approved Subcontractors are there. Proposal: point the redirect to /en/downloads/, not /en/ |
| 6 | /government-services-programs-gsp/ | Programs overview, Iraq VOC summary, Kurdistan vehicle CoC rules | 4,189 | /en/programs/ | moved now: certification.yaml, industries.yaml and programs.yaml (Iraq additions) use it. The Kurdistan vehicle CoC part is left out by all of them and has no program page (PRG-07): see the list |
| 7 | /iraq-coc/ | Iraq CoC program: appointment, routes, documents, downloads, 23 questions | 31,134 | /en/programs/iraq-certificate-of-conformity/ | moved now: programs.yaml (Iraq additions); the routes, the document list and the 23 questions are already on /en/programs/iraq-certificate-of-conformity/. Single facts: BGW-15, PRG-17, MKT-16 in facts.json |
| 8 | /iraq-verification-of-conformity-program/ | Iraq VoC explained: why, who, benefits, CAP, product types | 13,402 | /en/programs/iraq-certificate-of-conformity/ | moved now: programs.yaml (Iraq additions: five more questions), and an insight article, word for word (seed/current-pages.json, T43): /en/news/iraq-verification-of-conformity-voc-program/. The redirect goes to the program page, not to the article |
| 9 | /iraq-coc-gujarat/ | Iraq CoC for Gujarat exporters: Gandhidham office, ports, FAQ | 11,625 | /en/news/iraq-coc-certification-services-in-gujarat/ (fallback: /en/programs/iraq-certificate-of-conformity/) | moved now: insight article, word for word (seed/current-pages.json, T43); programs.yaml adds eight local questions to the Iraq page. The local office facts also fit /en/offices/gandhidham/ (GDH-08) |
| 10 | /botswana-coc/ | Botswana CoC: BOBS appointment, SCSR rules, product tables, FAQ | 24,510 | /en/programs/botswana-certificate-of-conformity/ (fallback: /en/programs/) | moved now: new program page (programs.yaml, seed/program-pages.yaml). A director confirms the appointment before the page is public (PRG-09). The full product tables are cut to group rows: see the list (PRG-46) |
| 11 | /egypt-coc/ | Egypt CoC: GOEIC, fourteen product groups, steps, standards, FAQ | 34,038 | /en/programs/egypt-certificate-of-conformity/ (fallback: /en/programs/) | moved now: new program page (programs.yaml, seed/program-pages.yaml). The source says 'appointed by GOEIC'; the new site says 'registered' (PRG-08, PRG-61) |
| 12 | /libya-coi/ | Libya CoI: Central Bank appointment, ARN products, steps, fees | 11,548 | /en/programs/libya-certificate-of-inspection/ (fallback: /en/programs/) | moved now: new program page (programs.yaml, seed/program-pages.yaml). A director confirms the appointment before the page is public (PRG-10) |
| 13 | /sfda-food-cosmetics-certification-saudi-arabia/ | Saudi SFDA food and cosmetics certification, FASAH, complaints, contact | 8,575 | /en/programs/ | moved now: new program page 'saudi-arabia-sfda' (programs.yaml, seed/program-pages.yaml), but the redirect still goes to the index /en/programs/. The new site says 'Designation in progress'; this page says 'designated' (QAM-40, PRG-12) |
| 14 | /food-inspection/ | Food inspection stages: initial, during production, final, loading, damage | 2,551 | /en/industries/agriculture-and-food/ | moved now: inspection.yaml and industries.yaml (agriculture additions) |
| 15 | /tic-agri-services/ | Agricultural services: groups, products, standards, laboratory, India network | 6,826 | /en/industries/agriculture-and-food/ | moved now: inspection.yaml and industries.yaml (agriculture additions). Laboratory and network facts: QAM-04, SVC-37 |
| 16 | /commodities-consumer-products/ | Commodity and consumer product inspection: overview and scopes | 6,683 | /en/industries/consumer-products-and-retail/ | moved now: inspection.yaml and industries.yaml |
| 17 | /oil-gas/ | Oil and gas: cargo measurement, custody transfer, inspection process | 5,370 | /en/industries/oil-gas-and-petrochemicals/ | moved now: inspection.yaml, testing.yaml and industries.yaml |
| 18 | /marine/ | Marine surveys: draft, ullage, bunker, sealing, on/off hire | 2,932 | /en/industries/marine-and-shipping/ | moved now: inspection.yaml (marine and cargo surveys) and industries.yaml |
| 19 | /vehicle-and-automotive-inspection/ | Vehicle inspection and the parts of a damage survey | 2,545 | /en/services/inspection/vehicle-inspection/ (fallback: /en/industries/vehicles-and-automotive/) | moved now: inspection.yaml (vehicle inspection) and industries.yaml |
| 20 | /testing/ | Food and agri testing: physical, chemical, microbiological | 2,865 | /en/services/testing/ | moved now: testing.yaml (group intro and food testing) |
| 21 | /testing-cosmetics-hygiene/ | Cosmetics and hygiene testing: one short text | 511 | /en/services/testing/consumer-product-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (consumer product testing) |
| 22 | /testing-electrical-electronic/ | Electrical and electronic testing: one short text | 1,005 | /en/services/testing/consumer-product-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (consumer product testing) |
| 23 | /testing-hard-goods-toys/ | Hard goods and toys testing: one short text | 596 | /en/services/testing/consumer-product-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (consumer product testing) |
| 24 | /testing-textile-clothes/ | Textile and clothes testing: one short text | 639 | /en/services/testing/consumer-product-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (consumer product testing) |
| 25 | /testing-minerals-metal/ | Minerals and metal testing: one short text | 717 | /en/services/testing/minerals-and-metals-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (minerals and metals testing) |
| 26 | /testing-oil-gas/ | Crude oil and gas testing | 2,310 | /en/services/testing/oil-gas-and-petroleum-testing/ (fallback: /en/services/testing/) | moved now: testing.yaml (oil, gas and petroleum testing) |
| 27 | /testing-non-destructive-testing-ndt/ | NDT: one sentence, done by the sister company Seacorr | 223 | /en/services/inspection/non-destructive-testing/ (fallback: /en/services/inspection/) | moved now: testing.yaml (non-destructive testing). Fact LEG-03 in facts.json |
| 28 | /dairy-products-cheese-testing/ | Dairy and cheese testing and inspection guide | 6,698 | /en/news/dairy-products-and-cheese-testing/ (fallback: /en/services/testing/food-and-agricultural-testing/) | moved now: insight article, word for word (seed/current-pages.json, T43); testing.yaml also takes the testing parts for the service page |
| 29 | /frozen-meat-products-testing-inspection/ | Frozen meat testing and inspection guide | 9,746 | /en/news/frozen-meat-products-testing-and-inspection/ (fallback: /en/services/testing/food-and-agricultural-testing/) | moved now: insight article, word for word (seed/current-pages.json, T43); testing.yaml also takes the testing parts for the service page |
| 30 | /rice-testing-inspection/ | Rice testing and inspection guide | 6,238 | /en/news/rice-testing-and-inspection/ (fallback: /en/services/testing/food-and-agricultural-testing/) | moved now: insight article, word for word (seed/current-pages.json, T43); testing.yaml also takes the testing parts for the service page |
| 31 | /electrical-switches-sockets-breakers-testing/ | Switches, sockets and circuit breakers testing and inspection guide | 8,903 | /en/news/electrical-switches-sockets-and-circuit-breakers-testing/ (fallback: /en/services/testing/consumer-product-testing/) | moved now: insight article, word for word (seed/current-pages.json, T43); testing.yaml also takes the testing parts for the service page |
| 32 | /bed-sheet-comforter-set-inspection-services/ | Bed sheet and comforter set inspection guide | 9,282 | /en/news/bed-sheet-and-comforter-set-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 33 | /ceramic-porcelain-tile-inspection-services/ | Ceramic and porcelain tile inspection guide, with AQL part | 19,500 | /en/news/ceramic-and-porcelain-tile-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 34 | /cosmetics-personal-care-products-inspection-services/ | Cosmetics and personal care products inspection guide | 10,032 | /en/news/cosmetics-and-personal-care-products-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 35 | /glassware-inspection-services/ | Glassware inspection guide | 9,754 | /en/news/glassware-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 36 | /household-electrical-appliance-inspection-testing-services/ | Household electrical appliance inspection and testing guide | 10,815 | /en/news/household-electrical-appliance-inspection-and-testing/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 37 | /natural-stone-marble-granite-inspection/ | Natural stone, marble and granite inspection guide | 9,850 | /en/news/natural-stone-marble-and-granite-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 38 | /noodles-inspection-services/ | Noodles inspection guide: PPI, DPI, PSI | 6,633 | /en/news/noodles-inspection-and-quality-control/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 39 | /paints-coatings-inspection-testing-services/ | Title says paints and coatings; the text is about sanitary ware | 10,285 | /en/news/paints-and-coatings-inspection-and-testing/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43). FAULT: under the paints title the current page holds a second sanitary ware text; it has no paints text. Do not publish this article under the paints title |
| 40 | /sanitary-ware-water-closet-inspection-services/ | Sanitary ware and water closet inspection guide | 10,903 | /en/news/sanitary-ware-and-water-closet-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43) |
| 41 | /textile-fabric-inspection-services/ | Textile and fabric inspection guide: PPI, DPI, FRI, AQL | 18,663 | /en/news/textile-and-fabric-inspection/ (fallback: /en/services/inspection/pre-shipment-inspection/) | moved now: insight article, word for word (seed/current-pages.json, T43). Its sampling fact answers SVC-04 and SVC-21 |
| 42 | /halal-certification/ | Halal certification: scope, six steps, complaints, appeals, document list | 9,498 | /en/services/certification/halal-certification/ (fallback: /en/services/certification/) | moved now: certification.yaml. The list of 16 PDF documents is in facts.json (downloads) |
| 43 | /halal-webinar/ | Internal Halal Audit webinar of 10 Aug 2026: trainers, fee, contacts | 1,916 | /en/training/ | moved now: training.yaml (webinar facts) and certification.yaml; the date is past |
| 44 | /csuas/ | Drone (UAS) certification, India: QCI approval in process, steps, FAQ | 12,095 | /en/services/certification/csuas-drone-certification/ (fallback: /en/services/certification/) | moved now: certification.yaml (NOI-16 in facts.json) |
| 45 | /sustainability/ | Sustainability and ESG services: assess, advise, measure, assure, improve | 8,563 | /en/services/sustainability/ | moved now: certification.yaml (sustainability advisory; ESG assurance) |
| 46 | /training/ | Training overview and the names of ten courses | 989 | /en/training/ | moved now: training.yaml |
| 47 | /iso-90012015-quality-management-system/ | ISO 9001 awareness course text | 724 | /en/training/iso-9001-awareness/ (fallback: /en/training/) | moved now: training.yaml |
| 48 | /iso-90012015-quality-management-system-internal-audit/ | ISO 9001 internal audit course text | 1,215 | /en/training/iso-9001-internal-auditor/ (fallback: /en/training/) | moved now: training.yaml |
| 49 | /iso-140012015-environmental-management-system/ | ISO 14001 awareness course text | 1,083 | /en/training/iso-14001-awareness/ (fallback: /en/training/) | moved now: training.yaml |
| 50 | /iso-140012015-environmental-management-system-internal-audit/ | ISO 14001 internal audit course text | 914 | /en/training/iso-14001-internal-auditor/ (fallback: /en/training/) | moved now: training.yaml |
| 51 | /iso-220002018-food-safety-management-systems/ | ISO 22000 awareness course text | 1,127 | /en/training/iso-22000-awareness/ (fallback: /en/training/) | moved now: training.yaml |
| 52 | /iso-220002018-food-safety-management-systems-internal-audit/ | ISO 22000 internal audit course text | 1,593 | /en/training/iso-22000-internal-auditor/ (fallback: /en/training/) | moved now: training.yaml |
| 53 | /iso-450012018-occupational-health-safety-management-system/ | ISO 45001 awareness course text | 1,345 | /en/training/iso-45001-awareness/ (fallback: /en/training/) | moved now: training.yaml |
| 54 | /iso-450012018-occupational-health-safety-management-system-internal-audit/ | ISO 45001 internal audit course text | 1,388 | /en/training/iso-45001-internal-auditor/ (fallback: /en/training/) | moved now: training.yaml |
| 55 | /hazard-analysis-critical-control-points/ | HACCP awareness course text | 1,177 | /en/training/haccp-awareness/ (fallback: /en/training/) | moved now: training.yaml |
| 56 | /hazard-analysis-critical-control-points-internal-audit/ | HACCP internal audit course text | 1,434 | /en/training/haccp-internal-auditor/ (fallback: /en/training/) | moved now: training.yaml |

The footer of every current page (addresses and phones by country, 1,071 characters, `old/_footer.txt`) is not one of the 56 pages. State: already on the new site (/en/offices/, /en/contact/), but the phones of Lahore, Gandhidham, Riyadh and Noida are missing or differ: see `facts.json` (LHE-02, GDH-01, RUH-02, NOI-02). The Lahore office is in the footer only, not on the contact page.

## Totals

| State | Pages | Characters |
|---|---:|---:|
| moved now | 51 | 367,157 |
| already on the new site | 2 | 13,881 |
| can move | 3 | 5,544 |
| no home on the new site | 0 | 0 |
| All | 56 | 386,582 |

Inside 'moved now': 36 pages (208,230 characters) go to service, course, industry and program pages through the outputs of the other agents; 15 pages (158,927 characters) become insight articles (T43). The Iraq VoC page (13,402 characters) is counted in the first group and is also an article.

## Pages that had no page type on the new site (now insight articles)

At the start of this run these pages redirected to a service page that has no place for their text. The repo now makes each one an insight article under /en/news/ (`seed/current-pages.json`).

1. **Ten product inspection pages, 115,717 characters.** Buyer guides for one product each: what is inspected, the usual defects, the checks and tests, the sampling method, why an inspection is necessary, and in some a list of questions.
   - /bed-sheet-comforter-set-inspection-services/: 9,282 characters. Bed sheet and comforter set inspection guide.
   - /ceramic-porcelain-tile-inspection-services/: 19,500 characters. Ceramic and porcelain tile inspection guide, with AQL part.
   - /cosmetics-personal-care-products-inspection-services/: 10,032 characters. Cosmetics and personal care products inspection guide.
   - /glassware-inspection-services/: 9,754 characters. Glassware inspection guide.
   - /household-electrical-appliance-inspection-testing-services/: 10,815 characters. Household electrical appliance inspection and testing guide.
   - /natural-stone-marble-granite-inspection/: 9,850 characters. Natural stone, marble and granite inspection guide.
   - /noodles-inspection-services/: 6,633 characters. Noodles inspection guide: PPI, DPI, PSI.
   - /paints-coatings-inspection-testing-services/: 10,285 characters. Title says paints and coatings; the text is about sanitary ware.
   - /sanitary-ware-water-closet-inspection-services/: 10,903 characters. Sanitary ware and water closet inspection guide.
   - /textile-fabric-inspection-services/: 18,663 characters. Textile and fabric inspection guide: PPI, DPI, FRI, AQL.
   - **Fault to correct before the articles go public:** the current page with the title "Paints & Coatings Inspection & Testing Services" holds a second sanitary ware text (headings 'Sanitary Ware & Water Closet Inspection', 'Flushing Performance Testing'; the word 'paint' is in 3 of its 192 lines). The article `paints-and-coatings-inspection-and-testing` has that text under the paints title. Proposal: do not publish it; keep the redirect to its fallback. Nine guides stay.
2. **Four product testing pages, 31,585 characters** (dairy and cheese; frozen meat; rice; switches, sockets and circuit breakers). `testing.yaml` uses the testing parts for the two testing service pages; the articles keep the full text with the inspection rows.
3. **Iraq CoC in Gujarat, 11,625 characters,** and **the Iraq VoC page, 13,402 characters.** Articles, and `programs.yaml` adds their questions to the Iraq program page. The Gujarat facts (ports Mundra, Kandla, Pipavav; the cities; the industries) also answer a part of the Gandhidham office page (GDH-08).

## Content with no home yet

1. **Kurdistan Region vehicle Certificate of Conformity** (the last part of /government-services-programs-gsp/, about 1,900 characters): sole certification body at the Parvez Khan border crossing, the CBCA program, seven checks. No program page, and no output of the other agents makes one (PRG-07, PRG-34). Proposal: a program page, after a director gives the regulator and the appointment date.
2. **Mission, vision, values and the compliance principle to TIC Council** (/about-us/, about 1,500 characters). The new About page has no part for them. Proposal: one part 'Mission, vision, values' on /en/about/; the compliance principle beside the TIC Council row on /en/about/accreditations/.
3. **The help line** (/contact/): +971 56 410 6001 and +91 9266 606 587, for inquiries, complaints or feedback about the Compliance Code. The new site has no help line. Proposal: /en/contact/ and the 'other ways' line of /en/about/complaints/.
4. **The public document set.** /elementor-2430/ lists six PDFs; the Halal page lists sixteen (policies, procedures, the i-CAS Halal fee structure and client support, the mark rules); the Iraq and Egypt pages offer forms, the company profile, the COSQC authorization letter, the GOEIC product scope and the CoC format. The saved text has the names and codes only: the files must be taken from the live site. The new Downloads table has three of them. Proposal: rows in /en/downloads/, each with its code.
5. **The full Botswana product tables** (in /botswana-coc/: Mechanical 22, Food 14, Agricultural 5, Electrical 60 rows, each with its reference standard). `programs.yaml` cuts them to group rows, and the news article on the new site has the eight headings with no rows (PRG-46). Proposal: put the full tables in the news article, or give the list as a file in /en/downloads/.
6. **Four program pages wait for a decision, 78,671 characters:** Egypt (34,038), Botswana (24,510), Libya (11,548), Saudi Arabia SFDA (8,575). The text has a home (`programs.yaml`). The new site says it adds a page only where TIC holds an appointment; the current site states one for each (GOEIC; BOBS; Central Bank of Libya, Resolution 96 of 2015, from 12 December 2024; SFDA 'designated'). A director confirms each before the page is public (PRG-08, PRG-09, PRG-10, PRG-12, PRG-13). The Saudi redirect still goes to the index.
7. **The Internal Halal Audit webinar** (/halal-webinar/): the date, 10 August 2026, is past. `training.yaml` keeps the facts. Proposal: show it only if the owner gives a new date.
8. **The four home page counters.** The saved text shows '0 +' for Employees, Global Clients, Countries / Markets and Inspections & Projects Completed. The numbers are on the live page only. They can answer DXB-16 and the figures of /en/about/ after a director confirms them.

## What the current site does not have

No page gives: a founding year; a registered legal name (no 'L.L.C.', no trade licence); an ANAB, GOEIC, TIC Council or GAFTA number or date; the name of a partner laboratory; the name of a director or of an office manager; a WeChat ID; office hours or languages; a map position; the opening year of an office; an IQS standard number or the date of the Iraq product list; working days for the Iraq steps. All email addresses are hidden in the saved text ('[email protected]'), so no mailbox can be read from it. These open items stay with the offices.

## House words to repair when text is moved

The current site writes 'TICQC' and 'TIC QC' (never used on the new site), 'programme' on some pages, 'Kurdistan' for the Kurdistan Region of Iraq, 'appointed by GOEIC' (the new site says 'registered', record 73) and 'ISO/IEC 17065 Accredited' with no body and no number. Two lines of the About page name Seacorr, not TIC.
