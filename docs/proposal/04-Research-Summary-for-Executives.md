# 04. What we found: a short research summary for executives

**TIC Quality Control website rebuild proposal, round 1**
Prepared by Darya Ibrahim, 22 October 2026
Reading time: about 20 minutes

**What this is.** Before writing the proposal we looked at our own site page by page, at the websites of the large testing, inspection and certification companies and of our direct competitors in the Iraq and Egypt programs, at what the accreditation standards oblige us to publish, and at every public register behind the logos and claims we show today. We also read the search-engine blueprint our India office wrote in September (section 6). This is the short version for directors who want the evidence without reading the full report. It asks for no new decisions; those are listed in document 00, and where a finding here feeds one of them, the decision number is given.

**What we ask of you.** Read it once (about 20 minutes). If a fact looks wrong, or you know something we missed, write it in the comment box under that section or reply by email quoting the section number (for example "04, 8.9"), by [deadline to be set by Darya], the deadline in the cover email (document 00). I will merge every reply into the next version and send it back to you before anything is designed or built. You know the business better than any research can.

## 1. Our site today, in ten facts

1. The site runs on a third-party page-builder platform with many add-ons, built around June 2024, on a server runtime unsupported since November 2022 (details in document 03, which recommends Wagtail, a Python system, as the replacement).
2. It has 49 pages and 34 news posts, but only about 20 pages are reachable from the menu. Roughly 25 cannot be reached from any menu or link, so a visitor would only find them by luck or by Google. They include the whole Testing section, the SFDA page (a page still carrying the page builder's placeholder title because it was never given one), Agri, Sustainability, eight product-inspection pages and ten ISO course pages.
3. The homepage weighs 9.07 MB and takes 22 to 30 seconds to display in Google's simulated mobile test, almost all of it images: one 3.6 MB hero picture (the large photo at the top of the page) and four logos uploaded at over 2,000 pixels wide and shown at 200. Google's free public speed test (Lighthouse, the test behind PageSpeed Insights, which any client can run) scores us 53 (home), 58 (Iraq) and 62 (Contact) out of 100 on a simulated mid-range phone; Google's own server run gave the homepage 64.
4. The homepage "Government Services Programs" card and a footer link on every page point to a page that returns a page-not-found error.
5. The footer shows nine accreditation and membership logos. None carries a certificate number, scope or register link. Three of the nine (ANAB, TIC Council and, for the Indian entity only, GAFTA) matched a public register in our check. The GOEIC registration and the COSQC licence, which appear as text on program pages rather than as logos, also checked out: GOEIC against its register, COSQC against the approval letter, since COSQC publishes no register (section 8).
6. There is no privacy policy, terms, copyright line, accreditation page, office pages, careers page, training booking, certificate verification or client login, and no language other than English. The Portuguese version is an empty English shell.
7. The 2024 industry pages run 350 to 650 words with no form and no FAQ. The 2026 program pages run 1,500 to 5,000 words with FAQs (Iraq has 23) and Word-document request forms, but no page has an online application. Only the Libya page publishes a fee.
8. The footer lists 14 addresses in 12 countries, with phone numbers for five, hidden email addresses and several typing errors. The About page has no founding year, leadership names or group structure, and mentions Seacorr where TIC Quality Control is expected. Office managers: please check your own office's line on the site and send the correct address, phone and email in your reply (the office form in document 02, Part D, has a place for it).
9. Our numbers disagree with each other: the homepage counters, a "15+ countries" line and the 12-country footer do not match, and the TIC Brand Guidelines 2026 add "Offices in 20+ countries". The site must use one number everywhere (Q-26 in document 00).
10. The current site exposes details that make it easier to attack; the specifics are in document 03 for IT and belong there rather than in a document that will be forwarded widely. Separately, Google has not collected speed data from real visitors to ticqc.ae, which it only does once a site has a fair number of visitors.

For scale, our LinkedIn page shows 16,340 followers, founded 2020, 51 to 200 employees. The site does not convey a company of that size.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

## 2. What the big names do

We looked at SGS, Intertek, Bureau Veritas, the three TÜVs, DNV, Lloyd's Register, Applus+, UL, Kiwa and Element. They differ in size and style, but nearly all do the same few things:

- a short menu that starts with Services and Industries, opening on click rather than on hover;
- one large still photo at the top of the homepage rather than a slideshow;
- one brand colour;
- a "you are here" trail at the top of every page (breadcrumbs);
- a tool to check whether a certificate is genuine;
- a login area for clients;
- one page per country program with dated downloads;
- public pages on impartiality and complaints.

The five names our clients are most likely to know, on the three points that matter most to an exporter:

| Company | Certificate check | Local language | Request form |
|---|---|---|---|
| SGS | Yes, public | No | Yes, including quotation, through an exporter portal |
| Intertek | By form, answered later | No | "Send us a request"; PDF form |
| Bureau Veritas | Per country; QR code on certificates | No (one Arabic PDF) | Logged-in request |
| TÜV Rheinland | Public registry (Certipedia) | Partial (Arabic), with untranslated text | Downloadable forms |
| Kiwa | Certificate finder | No | Quote bar on every service page |

The full comparison of all twelve companies on seven points is in Appendix A at the end of this document.

Two observations matter. The features that make our own site look older (the sliding homepage photos, the numbers that count up when the page opens) appear only on the regional sub-sites the majors neglect, never on their global templates. And the bar a mid-size firm can reach is set by Kiwa, Element and Cotecna (Cotecna is covered in section 3) with nothing exotic: one or two typefaces used consistently, one colour, one still photo at the top, own-staff photography, a contact card on every service page, and trust shown as links rather than badges. Of the six sites for which Google holds real-visitor speed data, Kiwa is the only one that passes Google's speed thresholds.

The major sites add a new country program or office by filling in a standard page, not by redesigning: Bureau Veritas has 25 program pages built from one template and Intertek about 40 country pages. That is the pattern document 01 proposes for us.

The TIC Brand Guidelines 2026 (Edition 1, October 2026) already fix our one red, our two typefaces (Saira for headings, Open Sans for text, with Cairo when Arabic is requested), the header and footer and the photography rules, so the visual side is a matter of applying what we have, not of choosing a new look. No design work starts until the proposal is approved.

## 3. What our direct program competitors do

These are the companies an exporter compares us with when choosing a body for Iraq or Egypt. Please quote the item number if you reply by email (for example "04, 3.2").

- **3.1 Cotecna** is the model for program pages. Registered with GOEIC since 2012, its Egypt page has a process diagram, a product-list card, a regulatory-update notice and four documents (information sheet, request form, contact list dated April 2026, complaints and appeals guidelines), plus certificate authentication and a customer portal. No Arabic; no Iraq page we could find.
- **3.2 HQTS** is the closest like-for-like: the same kind of page-builder platform as ours, a UAE office, an Iraq page with a seven-field online form, a certificate lookup, an Arabic-language site and stated timelines (1 to 2 days for document review, about 5 days to certification). It also shows the cost of loose editing: several links on its English site lead nowhere or to a test copy of the site, and two footer links on its Arabic site are mislabelled.
- **3.3 Baltic Control** (COSQC from August 2024) has a portal, a typed enquiry form and a card per country program, but no accreditation page; accreditations appear only as news posts and footer logos, the pattern we should leave behind.
- **3.4 Sunchine** (COSQC from September 2024) has a certificate search, a portal and a Chinese site; contact is by phone, email and Skype.
- **3.5 QIMA**'s website carries no government-program pages (although QIMA Arabia is on SFDA's designated list), but it sets the bar for enquiries: a "find your service" form promising a reply within one business day, a portal with apps, a WhatsApp link and a real Arabic site.
- **3.6 Intertek's Iraq page** lists 13 regulated product categories, an eight-document checklist, a request form, guidelines, office contacts and FAQs.
- **3.7 TÜV Rheinland's Iraq page** offers seven downloads including a fee structure and an English and Arabic brochure, and states its COSQC authorisation date of 1 March 2025.

Two things follow. At least nine bodies now claim COSQC appointment and no official roster exists, so "appointed by COSQC" no longer sets us apart on its own. And our Iraq page already has the richest FAQ of the Iraq pages we compared (23 questions); what it lacks is an online form, a dated product list, stated timelines, a Baghdad phone number and named contact on the page itself, and certificate verification.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

## 4. The five kinds of visitor and what each wants

1. **The exporter preparing a shipment** (China, India, UAE, Pakistan) wants to know in one visit: is my product regulated, what do I send, how long, what does it cost, which office is near my factory. They arrive under time pressure, usually on a phone.
2. **The importer, customs broker or bank** wants to confirm in under a minute that a certificate is genuine, then a local number if it is not. They want it in their own language and on WhatsApp.
3. **The freight forwarder** wants a one-page per-country link to send to the client, a way to book and track an inspection, and a named coordinator.
4. **The commodity trader** wants the GAFTA logo linked to the register entry, the ports we cover, the partner laboratories we use and a named surveyor at the port.
5. **The procurement officer prequalifying us** wants dated compliance documents in one place: accreditation certificates with scope, trade licence, ISO certificates, HSE and impartiality policies.

Behind all five sits the same evidence, in short lines:

- About three quarters of nationals across Egypt, Saudi Arabia and the UAE use WhatsApp (a combined survey figure across seven countries, from Northwestern University in Qatar), and industry estimates put UAE adoption near 90 percent.
- Chinese exporters rarely check email and live on WeChat.
- In a March 2026 survey of about 1,200 business decision-makers (SurveyMonkey and Reddit), 55 percent said they trust a supplier's website, against 39 percent for an AI chatbot.
- The Nielsen Norman Group, a usability research firm, names hidden pricing as the omission visitors complain about most on business sites.

The lesson for us is a human reply channel (WhatsApp Business with published hours, a request form with a one-business-day reply promise, WeChat for Guangzhou) rather than an automated chat window. How this is staffed is Q-06 in document 00.

## 5. The two gaps nobody fills

**The languages of our markets.** SGS, Intertek, Cotecna and Bureau Veritas publish only in English for Egypt, Saudi Arabia, China and India alike. TÜV Rheinland's UAE Arabic site is partial. Among the mid-size peers, HQTS and QIMA (with V-Trust and Pro QC) run Arabic sites, and Sunchine runs a Chinese site; none of those sites uses a font designed for the script, so the text is drawn in whatever fallback font the reader's device picks and reads poorly. Meanwhile our markets work in their own languages: SFDA, GOEIC and COSQC default to Arabic, Chinese exporters live on WeChat, and Indian and Pakistani exporters arrive on a phone under time pressure (section 4). English remains the only required language, but any language an office commits to with a named reviewer, Arabic, Indian or Chinese, puts us ahead of every major in that market: a verification page, office contacts, complaints route and program explainer in the reader's own language.

**Fees, turnaround and a human on WhatsApp.** No competitor states fees on the program page itself; Bureau Veritas and TÜV Rheinland put a fee table inside a downloadable datasheet, and none states typical turnaround or a human-staffed WhatsApp line with hours. Our Libya page already states a fee on the page. A program page that states the route, the documents, the fee or fee basis, the days and the named person in Baghdad or Cairo, dated and reviewed, would give exporters something no competitor's page gives them today. Which fees may be published is Q-05 in document 00.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

## 6. What the India office's blueprint already gives us

In September 2026 our India office wrote a "Technical Website Specification and SEO Blueprint" (SEO is search engine optimisation, the work of being found on Google). It is a thorough, well-organised chapter on how search engines should find our pages: clean web addresses, one topic per page, breadcrumb trails, sitemaps, fast images, a certificate check, a single contact page with all offices, and a blog with named authors. We did not repeat that work in our research; we built on it. Its recommendations are carried into documents 01 and 03 with credit, and where 01 departs from it, 01 says so and why. India colleagues, your own comments on how it has been used belong in document 02, section E3.

## 7. What an accredited body must publish

Three standards matter here. ISO/IEC 17020 is the standard our ANAB inspection accreditation is against; ISO/IEC 17065 covers product certification such as halal; ISO/IEC 17021-1 covers certifying management systems, which we do not do today. In plain words, with the standard clauses in brackets:

- **Impartiality.** As an accredited inspection body we must act impartially, identify risks to impartiality on an ongoing basis and show top-management commitment (ISO/IEC 17020 clause 4.1). A public statement is not strictly required by that clause, but every major publishes one, and our policy already exists as a PDF.
- **Complaints and appeals.** A description of how we handle them must be available to anyone who asks (ISO/IEC 17020 clause 7.5.2; ISO/IEC 17065 clause 4.6 for product certification). If we ever certify management systems it must be public without being asked (ISO/IEC 17021-1 clause 8.1.1). The majors publish a page with a form.
- **Certification status.** For product certification such as halal, we must keep a record of what is certified and confirm the validity of any certificate on request (ISO/IEC 17065 clause 7.8). A public lookup is the usual way.
- **Mark-use rules.** We must control how clients use our certificates and marks and publish the rules (ISO/IEC 17065 clause 4.1.3). In the other direction, each accreditation body sets rules for its own symbol. ANAB's rules, as reproduced by one of its accredited bodies, expect its symbol with the certificate number and limited to the accredited scope (to be confirmed against ANAB's own policy, PR 1018); EIAC in Dubai requires prior approval for website use, a minimum size and the accreditation number under the logo; GAFTA limits its logo to the approved services of the approved member.
- **Subcontracting disclosure.** When we subcontract part of an inspection we must tell the client in advance and remain responsible for the result (ISO/IEC 17020 clause 6.3). This applies to work done through Seacorr and partner laboratories, and to how the site describes the group.
- **Fee basis.** For product certification, general information on fees must be available on request (ISO/IEC 17065 clause 4.6 b).

## 8. The accreditation check, in careful words

We ran the searches any buyer, bank or regulator could run: every logo and claim on the site was looked up in the public register of the body concerned. Where an item did not match, that is all we know; there may be a certificate under another entity name, an application in progress, or a logo placed in error, and we are not speculating about which. We simply need, for every logo we display, a certificate number and a register link, or the instruction to remove it.

If your office holds any of these certificates or appointment letters, please send me a scan with the certificate number; you do not need to wait for the Quality/Accreditation Manager. Please quote the item number if you reply by email (for example "04, 8.9").

**Matched a register or an official letter**

- **8.1 ANAB, ISO/IEC 17020, Type A inspection body (meaning a fully independent third party, the highest category), certificate AI-3314**, active, valid to 17 October 2028, covering Dubai with satellite sites in New Delhi, Amman, Guangzhou and Riyadh. The scope names agricultural products, bulk cargo, containerised cargo, the COSQC scheme procedures, GAFTA rules 123 and 124 and oil and gas custody transfer (measuring cargo when ownership changes hands). This is our strongest verifiable asset, and none of it appears on the site today. The ANAB symbol can be shown with the five sites on the scope. Our other offices (Baghdad, Cairo, Lahore, Sharjah and the rest) remain full offices and will have their own pages; they simply cannot be presented as ANAB-accredited sites unless the scope is extended (document 02, B3, asks whether that is planned). If your office should be on that list, tell us.
- **8.2 GOEIC, Egypt**: TIC Quality Control is record 73 in the register of inspection and audit companies, published 30 June 2025, with a scope of 37 product lines. The right word is "registered", not "accredited".
- **8.3 TIC Council**: "TIC Quality Control, UAE" is a full member. A membership, not an accreditation.
- **8.4 GAFTA approved superintendent**: listed for the Indian entity, TIC Quality Control Private Limited, only. No UAE entry was found, so the logo belongs with the Indian entity's approved services and should not be implied for Dubai until a UAE entry exists.
- **8.5 COSQC licence, Iraq**: no public roster exists, but the approval letter on our site is consistent with the ANAB scope: a licence to the TIC and LOX Baghdad branch, contract 5 of 22 May 2024, certificates from 5 September 2024, three-year term with annual review, so renewal falls due in September 2027.

**Could not be matched; numbers needed**

**Decision needed** (document 00, Q-07): for each item below, the Quality/Accreditation Manager supplies a certificate number and register link, or the claim is reworded or removed.

**Working assumption (Darya):** the wording suggested beside each item holds until that answer arrives.

- **8.6 ISO 9001, 14001 and 45001 badges**: generic graphics with no certification body, number, scope or expiry. If the real certificates exist, we will show them properly with number and expiry; if not, the generic badges should be removed before a buyer asks.
- **8.7 ISO/IEC 17065 "accredited"** (Halal and SFDA pages): no accreditation body is named, and we found no TIC entry in EIAC's directory of 976 bodies, the Saudi SAAC directory or the UAE MoIAT halal list; two further directories (GAC beyond its first page, and ANAB's product-certification list) could not be opened, so an entry there is not excluded. Which body, number and scheme?
- **8.8 "AIACI" logo**: the image is in fact the EIAC logo (Emirates International Accreditation Centre), and TIC has no EIAC entry. EIAC requires its number under the logo and prior approval for website use.
- **8.9 SFDA "designated body"**: TIC is not in SFDA's April 2026 list of designated bodies, where GulfTIC, Intertek, TÜV Austria and QIMA appear. Until we appear on a list, the page should say "in progress".
- **8.10 MoIAT halal registration**: the UAE list of 11 registered halal bodies does not include TIC, so the halal page should not imply UAE recognition until confirmed.
- **8.11 "Selo Associados"**: the Arab Brazilian Chamber of Commerce member seal; TIC is not in the chamber's 145-name list, which shows trade names only, so a Brazilian entity may be listed under another name (to be confirmed; Brazil office, please answer in document 02, D4).
- **8.12 APEDA**: not in APEDA's list of recognised certification bodies; what the logo represents is unknown to us (India office, please answer in document 02, D4).
- **8.13 NABL laboratory accreditation** (Agri page): we could not open the NABL directory, so this is unverified rather than disproved. Number, laboratory and scope needed.
- **8.14 BOBS (Botswana), Central Bank of Libya, KSQCA (Kurdistan Region of Iraq vehicles)**: we found no public register for any of the three (BOBS's own site could not be fully opened), so these appointments are unverified rather than disproved. The appointment letters should be held on file and quoted exactly. The Kurdistan Region vehicle section of the GSP (Government Services Programs) page says we are the "sole" appointed body; we should quote the exact wording of the KSQCA letter so the claim is safe. Iraq colleagues, could you send the letter?
- **8.15 CSUAS (India drones)**: the page already says approval is in process, the right wording until QCI lists us.

Document 02, Part B3, carries a table with one row for each of these logos and claims, plus EGAC and EIAC, which the brand kit lists among the marks it is preparing (21 rows), six specific questions on it and six further questions (B3.2 to B3.7) for the Quality/Accreditation Manager; office managers are asked, in Part D4, about the letters their own office holds.

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

We also researched platforms, hosting and costs. None of that is in this document on purpose; the findings and the choices are in document 03, and the decisions (Q-03, Q-09 and Q-10) are in document 00.

## 9. What this means for us

Our problem is not that the site looks older than SGS's. It is that the site makes claims the public registers do not support while leaving out the claims the registers do support, and a GOEIC officer, a Saudi procurement team or a Chinese exporter's forwarder can discover both in ten minutes. An accredited Type A inspection body with an active ANAB scope that names COSQC procedures, GAFTA rules and custody transfer has a stronger story than any of our mid-size competitors tell, and the cheapest, fastest win in the whole program is to tell it in verifiable form: one accreditation table, one group statement, one complaints page, one certificate lookup. A tidier look needs no large budget; it needs us to apply the brand book's two typefaces and one red, use our own photographs, name clear page owners, and then keep to it. And in the two places the majors have left empty, the languages of our markets and plain facts about fees, days and people, we can lead rather than follow.

Anything else, about any section of this document:

> **Your comments on this section**
> _(write here, or reply by email quoting the section number)_
>
>
>

## Appendix A. The twelve major sites compared

| Company | Menu style | Verification tool | Client portal | Local language | Program pages | Request forms |
|---|---|---|---|---|---|---|
| SGS | Services, Industry and four more; click mega-menu | Yes, public | Exporter Portal with uploads and messaging | No | 24 country cards (no Iraq) | Yes, incl. quotation |
| Intertek | Industries, Services, About, Resources, Locations | By form, answered later | 12 portals | No | About 40 country pages incl. Iraq, Egypt | "Send us a request"; PDF form |
| Bureau Veritas | Needs-led group site; nine items on Middle East site | Per country; QR on certificates | Verigates, logged-in requests and tracking | No (one Arabic PDF) | 25 program pages | Logged-in request |
| TÜV SÜD | Industries, Services, Topics, portal | Not seen | myportal | No | Not on Middle East site | "Get in touch" form |
| TÜV Rheinland | Five service pillars | Certipedia public registry | Not seen | Partial (Arabic), with untranslated strings | Per-scheme pages incl. Iraq | Downloadable forms |
| TÜV NORD | Services, Industries, Topics, Knowledge | Certificate database | Nine separate logins | No | UAE only | Forms |
| DNV | Services-led | Checker with QR | Veracity | No | Not applicable | Contact form |
| Lloyd's Register | Services-led | By tracking number (e-certs); Ships in Class register | Salesforce portal | No | Not applicable | Urgent survey request |
| Applus+ UAE | Four items plus Contact | Not seen | Not seen | No | Iraq Certificate of Conformity (CoC) service sheet | "Submit your CoC request" |
| UL Solutions | Nine items | UL Verify, public | Several | No | Not applicable | Contact form; English chat |
| Kiwa | Solutions, Location, Search | Certificate finder | Yes | No | Not applicable | Quote bar on every service page |
| Element | Industries and Services combined | Accreditations list | About 12 portals | No | Not applicable | Contact form; Middle East toll-free number |

*Sources for every fact are in the full research report (reports/TIC website rebuild research.md) and the fifteen research notes in the research_notes folder beside it. Ask me and I will send the report, or the single note behind any one fact.*
