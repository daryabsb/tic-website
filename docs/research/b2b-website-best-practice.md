# B2B / Enterprise Corporate Website Best Practice (2024-2026) — quality bar for a multi-office TIC company

Research date: 2026-10-21. Researcher notes for the TIC Quality Control (ticqc.ae) website-rebuild proposal. Scope: evidence-based checklist of information architecture, UX, trust, conversion, localisation, accessibility, privacy, governance and SEO practices that global audiences expect. This file is research only; it designs nothing.

How to read: each key question has a Takeaway, Cited Findings (every claim carries the URL it came from), Inferences written as checklist items for the proposal, and Gaps (what could not be verified). Where a source is a vendor blog rather than a primary study, it is labelled as such. A consolidated checklist is at the end.

Sources fetched in full: nngroup.com (mega menus, audience-based navigation, breadcrumbs, photos as web content); developers.google.com (localized-versions/hreflang, creating-helpful-content, site-move-with-url-changes, ai-features, structured-data/organization); web.dev (vitals, lcp); w3.org (WCAG overview, new-in-22, qa-link-lang); infobip.com WhatsApp statistics; baymard.com drop-down flickering; awwwards.com Business & Services winners; silicon.co.uk copy of the Forrester 2025 predictions release; u.ae data-protection-laws page.
Pages that blocked or failed: gartner.com press release (HTTP 403), businesswire.com (403), nngroup.com/articles/b2b-ux/ (404), law.resource.org ISO 17065 PDF (binary; no local PDF text extractor available), faq.whatsapp.com click-to-chat (page body not returned). For those, search-result snippets or secondary copies are cited and marked.

---

## 1. Information architecture for services companies (Services vs Industries vs Solutions, mega menus, "find a service" search, breadcrumbs, hub-and-spoke)

### Takeaway
Research-grade guidance (NN/g, Baymard) says: make topic/task navigation (Services) primary and audience navigation (Industries) secondary; use a mega menu only if it is well-grouped, opens with a 300-500 ms hover delay or on click, and is backed by a real accessible landing page per top-level item; add location-based breadcrumbs because the site will be deep and many visitors will land on inner pages from search.

### Cited Findings
- NN/g: audience-based navigation (by industry or role) is "usually problematic"; topic- or task-based navigation should be the default, with audience sections secondary or tertiary. Risks: users fit several groups or none, labels are ambiguous ("about" vs "for"), extra cognitive effort, anxiety that another group gets better information, duplicated content and pogo-sticking. It can work if categories are mutually exclusive, labelled with "for", subcategories are visible early (e.g. in a mega menu), users can switch easily, and topic/task navigation stays primary. Article dated 7 Sep 2015 (older, still NN/g's standing guidance). — [NN/g, Audience-Based Navigation](https://www.nngroup.com/articles/audience-based-navigation/)
- NN/g on mega menus: suit large sites with many options because users recognise rather than recall; can show two levels of structure at once; group by card-sorting results; medium-sized groups; short labels leading with the most informative word; most important group top-left; show each option once; no forms or complex widgets inside the menu; keep the search box visible on the page, not inside the menu; hover should open after the pointer is still ~0.5 s and close ~0.5 s after it leaves; handle the "diagonal problem"; accessible fallback is to make each top-level item a normal page listing all options. Dated 26 Mar 2017; no sample sizes given. — [NN/g, Mega Menus Work Well](https://www.nngroup.com/articles/mega-menus-work-well/)
- Baymard (31 Jan 2023): hover-based drop-downs are on 74% of desktop sites in its e-commerce benchmark; 60% of those implement no hover delay; recommended delay 300-500 ms; without it participants called menus "flickering"/"flimsy", got distracted, some said they would leave the site, some abandoned navigation for search; diagonal movement triggered neighbouring categories. — [Baymard, Drop-Down Menu Flickering](https://baymard.com/blog/dropdown-menu-flickering-issue)
- Baymard also reports hover-based "mega menus" as main navigation on 88% of top US e-commerce sites (a different benchmark cut from the 74%; both are Baymard numbers and the pages do not reconcile them). — [Baymard drop-down menu benchmark page](https://baymard.com/homepage-and-category-usability/benchmark/page-types/drop-down-menu)
- NN/g breadcrumbs (Dec 2018, reviewed Sep 2026): use them when the site has a meaningful hierarchy, especially deep ones; they help visitors who land on a deep page from search; location-based, never path-based; placed just below global navigation; start with Home; every item except the current page is a link; current page last and unlinked; one canonical path for pages with multiple parents; on mobile show only the last level or two and keep tap targets at least 1 cm x 1 cm. No quantitative study inside the article. — [NN/g, Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/)
- A blog attributes a "31% lower task success for hover-only mega menus" to a "2026 NN/g navigation usability study"; I could not find that study on nngroup.com; treat as unconfirmed. — [pravinkumar.co](https://pravinkumar.co/blog/stopped-hover-mega-menus-webflow-design-2026) (unverified)
- A secondary guide reports NN/g findings that hidden (hamburger) navigation lowers discoverability and lengthens tasks, and suggests showing 3-5 key items visibly on mobile with the rest behind the icon. Not read on NN/g's own site. — [Lovable guide](https://lovable.dev/en/guides/website-menu-examples) (secondary)

### Inferences (checklist)
- [ ] Primary navigation is by what the company does (Services, in plain-language groups such as Inspection, Testing, Certification, Government conformity programmes, Training), not by audience. Evidence: NN/g audience-based navigation.
- [ ] Industries is a secondary entry point and every Industry page links to Service pages rather than duplicating them. Evidence: NN/g duplication/pogo-sticking warning.
- [ ] "Solutions" is avoided as a third parallel taxonomy unless it maps to a genuinely distinct offering; each page lives in one canonical place. Evidence: NN/g "show each option only once"; breadcrumbs "one canonical path".
- [ ] If a mega menu is used: two levels visible, grouped from card-sorting with real customers/staff, 300-500 ms hover delay or click-to-open, keyboard-accessible, and each top-level item is also a real landing page. Evidence: NN/g mega menus; Baymard flicker study.
- [ ] Site-wide search box visible in the header (not hidden in the menu); a "find a service" filter page by service type, industry and country is a sensible supplement for a 13-office catalogue. Evidence: NN/g "keep the search box visible"; Baymard users fall back to search when menus misbehave.
- [ ] Location-based breadcrumbs on every page below the homepage, under the global nav, Home first, truncated on mobile. Evidence: NN/g breadcrumbs.
- [ ] Mobile nav shows 3-5 primary items plus a menu button rather than hiding everything. Evidence: secondary summary of NN/g hamburger research (verify before quoting a number).

### Gaps
- NN/g's dedicated B2B website usability article returned 404 at the URL tried; no B2B-specific NN/g navigation study was retrieved.
- No primary research found on "hub-and-spoke" (pillar/cluster) page structures for services firms; the pattern is widely recommended by agencies but I found no NN/g/Baymard evidence either way.
- Baymard's full navigation study text is behind its paywall; only headline findings are cited.

---

## 2. Homepage patterns that work for B2B services

### Takeaway
No primary usability study of B2B services homepages was found; agency guidance converges on a problem/outcome-first hero, early proof (logos, accreditations), a clear services grid, industries, a "what happens next" section and multiple CTAs. Primary evidence from NN/g is that real photos of people and products are examined while stock/decorative images are ignored.

### Cited Findings
- NN/g eye-tracking: users ignore decorative images and closely examine photos that carry information (products, real people). Real staff portraits held 10% more viewing time than biographies occupying 316% more space; generic stock models were treated as filler; "jazzing up" pages backfires. Dated 2010, reviewed Aug 2026. — [NN/g, Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/)
- Agency guidance (not primary research): problem-first hero (pain, then solution, then CTA); a row of 8-12 recognisable customer logos in or just below the hero; put proof next to the claim it supports; add a "plan"/next-step section so the page does not jump from problem to testimonials; use "you" in the first line; offer a primary CTA plus a secondary path (case study) plus chat. — [Blend B2B, best homepages 2026](https://www.blendb2b.com/blog/the-10-best-b2b-homepage-examples); [Tenspeed](https://www.tenspeed.io/blog/transform-your-homepage); [Genesys Growth](https://genesysgrowth.com/blog/component-for-b2b-saas-homepages); [Redefine Web](https://redefineweb.com/blog/b2b-saas-website-design-best-practices/)
- Demand Gen Report 2025 Demand Generation Benchmark (survey of marketing leaders, not buyers): 57% chose case studies as their top content format. — [Demand Gen Report](https://www.demandgenreport.com/blog/the-2025-demand-generation-benchmark-survey-scaling-personalization-optimizing-operations-tying-strategy-to-revenue-in-2025/49804/)
- SurveyMonkey + Reddit "Hidden B2B Journey" (Mar 2026, ~1,200 US decision-makers): vendor websites are the second most trusted source at 55%, behind peer recommendations (73%) and ahead of search engines (54%), review sites (46%), AI chatbots (39%), social (36%); 83% complete research via peer communities and self-directed search before engaging sales. — [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/); [Demand Gen Report summary](https://www.demandgenreport.com/industry-news/news-brief/trust-is-the-new-currency-in-b2b-buying-surveymonkey-reddit/52167/)
- Google: no preferred word count. "Are you writing to a particular word count because you've heard or read that Google has a preferred word count? (No, we don't.)" — [Google Search Central, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### Inferences (checklist)
- [ ] Hero states what TIC does, for whom and where (country coverage) in one sentence, with a primary CTA (request a quote / find a service) and a secondary CTA (talk to an office). Evidence: agency consensus; Gartner/Forrester self-serve data in section 3.
- [ ] Proof strip immediately below the hero: accreditation marks (ANAB ISO 17020, ISO 9001/14001/45001, GAFTA, APEDA, AIACI) and client/government-programme logos, each linking to a page that explains it. Evidence: logo-row guidance; trust-signal evidence in section 4.
- [ ] Services grid (6-8 cards max, plain language), Industries row, "How we work / what happens after you contact us", numbers (offices, countries, inspections per year, years operating) using real figures the directors sign off, case studies, latest news/insights, final CTA band. Evidence: agency consensus; Demand Gen case-study preference.
- [ ] Photography: real inspectors, labs, ports and sites; no stock models. Evidence: NN/g photos study.
- [ ] Homepage copy is written for a buyer deciding whether to shortlist TIC, not to a word count. Evidence: Google helpful-content guidance.

### Gaps
- No NN/g/Baymard controlled study of B2B services homepages found; homepage layout advice is agency opinion.
- Vendor-cited conversion numbers (e.g. "5 fields convert 120% better") were not verifiable and are excluded.

---

## 3. Conversion and contact: quote forms, live chat vs chatbot vs WhatsApp, callbacks, multi-office contact pages, regional lead routing

### Takeaway
Buyers now prefer to self-serve most research (Gartner: 61% prefer rep-free; Forrester: more than half of large deals via self-serve), so the site must let them get far without a salesperson and then make the hand-off easy: a short quote form with routing, a human-staffed channel (WhatsApp is the dominant chat channel in the Gulf and South Asia), and a contact page that routes by country/office. Chatbots are the least trusted research source and must be accurate or absent.

### Cited Findings
- Gartner (press release 25 Jun 2025; survey of 632 B2B buyers, Aug-Sep 2024): 61% prefer a rep-free buying experience; buyers favour self-service for general research but want seller input for context-specific judgements; 73% actively avoid suppliers who send irrelevant outreach. Gartner's page returned 403; figures from the search snippet of the release. — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience). Secondary coverage of a later survey (646 buyers Aug-Sep 2025: 67% rep-free, 45% used AI in a purchase) at [Distribution Strategy](https://distributionstrategy.com/2026/03/most-b2b-buyers-prefer-rep-free-purchasing-as-ai-reshapes-sales/) (unconfirmed against Gartner).
- Forrester 2025 predictions (22 Oct 2024): more than half of large B2B transactions (US$1M+) will be processed through digital self-serve channels such as the vendor's website or marketplace; Millennial/Gen Z buyers drive this; half of younger buyers involve 10+ external influencers. — [Forrester release via Silicon UK](https://www.silicon.co.uk/press-release/forresters-b2b-marketing-sales-predictions-2025-more-than-half-of-large-b2b-purchases-will-be-processed-through-digital-self-serve-channels)
- SurveyMonkey/Reddit 2026: only 18% of decision-makers use chatbots at all in B2B research; among users, inaccurate (41%) and conflicting (40%) information are the top complaints; AI chatbots trusted by 39% vs vendor websites 55%. — [Search Engine Journal summary](https://www.searchenginejournal.com/b2b-buyers-trust-peers-over-ai-chatbots-report-finds/569261/); [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/)
- Conversica Chatbot Experience Report (Jan 2023, 250+ enterprise buyers, vendor-sponsored): 60% use chatbots when considering a purchase; one-third say chat experience has a major impact on vendor evaluation; 76% want the answer within three messages; buyers abandon bots for humans or competitors. — [Conversica report PDF](https://www.conversica.com/wp-content/uploads/2023/01/Chatbot-Experience-Report-1.23.pdf)
- WhatsApp in the Gulf: consumer penetration ~90% in UAE and Kuwait, ~80% in Saudi Arabia; WhatsApp business usage grew 43-82% year-on-year across UAE, Saudi and Qatar; regional messaging volumes up 49% (platform data). — [Campaign Middle East](https://campaignme.com/messaging-in-mena-is-entering-a-new-phase-and-marketers-must-adapt-fast/)
- Infobip Messaging Trends 2026 (vendor platform data): UAE penetration ~90%; MENA WhatsApp traffic on Infobip up 36% in 2025, WhatsApp dominant chat app there; India ~70% of population on WhatsApp, Infobip India traffic +314% 2021-2025, usage ~60% broadcast / 40% conversational (mostly support); globally >200M businesses on WhatsApp Business (SQ Magazine figure, undated). No Pakistan or Saudi figures on that page. — [Infobip WhatsApp statistics](https://www.infobip.com/blog/whatsapp-statistics)
- Click-to-chat link format (third-party documentation; Meta's own FAQ body did not load): `https://wa.me/<number>?text=<url-encoded text>`; number in international format without +, leading zeros or dashes; pre-filled text is editable before sending; plain links give no click/reply analytics. — [Unipile explainer](https://www.unipile.com/de/?p=275019); [Messangi help article](https://support.messangi.com/hc/en-us/articles/39008577066139-How-to-Use-WhatsApp-Links-to-Initiate-Conversations)
- Form length (vendor sources, directional only): a survey of contact forms found 5-16 fields, average 12 with 8 mandatory; B2B guidance puts top-of-funnel forms at 3-5 fields and a quote form at about six (name, business email, company, size/need, description, optional budget); a Formstack study (1,500 B2B decision-makers) is cited for 67.8% abandonment on forms with more than seven fields; phone-number fields reported to cut conversion ~18.7%; high-intent quote requests tolerate more fields than newsletter sign-ups; progressive profiling recommended. — [Spotler](https://spotler.com/blog/how-do-forms-affect-conversion-rates-on-b2b-websites); [Brixon Group](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate); [SyncGTM](https://www.syncgtm.com/blog/contact-us-for-a-quote); [Foundry CRO benchmarks 2026](https://foundrycro.com/blog/form-conversion-rate-benchmarks-2026/)
- KoMarketing study cited by Huemor: 64% of B2B buyers will not submit a form if they do not get the information they need first. — [Huemor contact page guide](https://huemor.rocks/blog/contact-page-design/) (secondary)
- Multi-office contact page patterns observed: separate Sales vs Support entry; offices grouped by country with a local phone and email each; "pick your regional office" then email; a contact directory filterable by contact type then region. — [LeadSquared contact](https://www.leadsquared.com/us/contact); [Belkins contact](https://belkins.io/contact-us.md); [The Social Shepherd](https://thesocialshepherd.com/contact); [Great American Insurance contacts](https://www.greatamericaninsurancegroup.com/for-businesses/contacts-details/fidelity-crime)
- WCAG 2.2 3.3.7 Redundant Entry (Level A): information already entered in a process must be auto-filled or selectable, not asked again (relevant to multi-step quote forms). — [W3C, What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)

### Inferences (checklist)
- [ ] One "Request a quote / Request inspection" form site-wide, 5-7 fields (name, work email, company, country/location of service, service needed, message; phone optional), with the country field driving routing to the right office mailbox/CRM queue. Evidence: form-length sources; routing patterns.
- [ ] Published response promise (e.g. acknowledgement same business day, quote within X days by region) and automatic acknowledgement email; the SLA must be one the offices will actually meet. Evidence: Gartner (buyers avoid suppliers who waste their time); KoMarketing 64%.
- [ ] Contact page is an office finder: map or list by country, each office with local phone, email, address, hours and time zone, plus WhatsApp click-to-chat for offices that staff it. Evidence: multi-office patterns; Gulf/India WhatsApp penetration.
- [ ] WhatsApp Business is offered as a human-staffed channel with stated hours (not a bot); use the WhatsApp Business Platform/API if message history, routing and analytics are needed. Evidence: Infobip/Campaign ME data; Unipile note on link limitations.
- [ ] Any website chat is either live human chat with hours shown or a narrowly scoped assistant answering from verified pages that hands off within three messages; no generic bot. Evidence: SurveyMonkey/Reddit trust data; Conversica three-message finding.
- [ ] Callback request is a lightweight alternative (name, phone, country, preferred time) for markets where phone is preferred. Evidence: inferred from regional contact patterns; no direct study found.
- [ ] Lead-routing rules documented (country -> office -> owner, fallback to HQ) and tested before launch. Evidence: gap below; no published standard.

### Gaps
- No independent, dated survey measuring the share of Gulf/South-Asian B2B companies using WhatsApp Business for sales enquiries; only vendor platform data and consumer penetration.
- No primary research on regional expectations for callback requests in MENA/South Asia.
- No published study on lead-routing-by-region practice; it is CRM configuration rather than UX research.
- Meta's official click-to-chat FAQ could not be read; parameter details come from third-party documentation.

---

## 4. Trust signals in regulated conformity-assessment businesses (accreditations, certificate verification, named experts, real photography, case studies, impartiality/complaints pages, privacy, security)

### Takeaway
Accredited inspection and certification bodies are expected (by the ISO 17020 / 17021-1 / 17065 family and their accreditation bodies) to make impartiality statements and complaints/appeals processes available publicly or on request; the big TIC players also publish certificate/document verification tools and public certified-client directories. Named experts and real photography are supported by NN/g evidence; buyers trust vendor websites second only to peers.

### Cited Findings
- ISO/IEC 17021-1:2015 (via SADCAS accreditation checklist, Issue 5/6): the certification body must have a publicly accessible impartiality statement covering the importance of impartiality and conflicts of interest (clause 5.2). — [SADCAS checklist](https://www.sadcas.org/sites/default/files/2024-09/SADCAS%20F%2040a%20%20-%20Checklist%20-%20ISO%20IEC%2017021-1-2015%20Conformity%20Assessment%20-%20Requirements%20for%20Bodies%20Providing%20Audit%20and%20Cert%20MS%20%5BIssue%206%5D.pdf)
- ISO/IEC 17021-1:2015 clause 8.1 "Public information" (via 2016 PJR webinar slides and a certification body's page): complaints and appeals handling and the impartiality policy are among items to be published without request in all geographical areas of operation. — [PJR webinar slides](https://www.pjr.com/downloads/webinar_slides/5.11.16_ISO%2017021-1.pdf); [Gallagher Marine public information page](https://www.gallaghermarine.com/?p=13159)
- ISO/IEC 17065:2012 has clause 4.6 "Publicly available information" with sub-items (a)-(d) and 5.2 "Mechanism for safeguarding impartiality"; the exact wording was not retrievable (PDF unreadable). — [ISO 17065 table of contents preview](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec17065{ed1.0}en.pdf); [USDA 17065 layout](https://ams.prod.usda.gov/sites/default/files/media/QAD1012AA.doc)
- ISO/IEC 17020:2012 definitions 3.9 appeal and 3.10 complaint; inspection bodies publish complaints/appeals procedures referencing it; one third-party inspection body states its handling-process description "can be obtained by any interested party on request" in line with ISO 17020 (practice, not the standard's text). — [Applus+ complaints and appeals](https://www.applus.com/pt/dam/jcr:e876fbb7-300f-470e-b501-8374b2315d05/L6-TUR-OGN-001_(Rev1)_Complaints%20and%20Appeals.pdf); [Aleph grievance policy](https://alephindia.in/third-party-inspection-agency/assets/pdf/Grievance_and_Suggestion_Policy.pdf); [Schellman policy](https://www.schellman.com/fedramp-business-policy)
- Bureau Veritas Certification: its complaint form and process are publicly available in the same languages as its public certification summaries; investigators are separated from auditors and decision-makers. — [BV Complaints and Appeals PDF](https://certification.bureauveritas.com/sites/g/files/zypfnx231/files/media/document/Complaints%20and%20Appeals_Rev%203.37%20for%20website.pdf)
- Intertek publishes a policy-statement page with downloadable complaints, disputes and appeals documents (references ISO 17021, 17029, 17065, 17024). — [Intertek policy statement](https://www.intertek.com/business-assurance/policy-statement/)
- APA (product certification) publishes a complaints/appeals/compliments page: complaints may be anonymous, appeals may not; appeals reviewed by people not involved in the decision. — [APA page](https://www.apawood.org/what-we-do/product-certification/complaints-appeals-compliments-feedback/)
- SGS: public Certified Client Directory searchable by certificate number, company name/location or QR code; separate free document-verification service for SGS-branded reports (upload up to 20 MB); training-certificate checker described as preliminary only. — [SGS certified clients and products](https://www.sgs.com/en-ae/certified-clients-and-products); [SGS verify documents](https://www.sgs.com/en/verify-sgs-documents); [SGS verify](https://www.sgs.com/verify/)
- Bureau Veritas Italia runs a public certificate register with validity status; BV China publishes certificate samples and suspension/revocation announcements. — [BV Italia certificate register](https://www.bureauveritas.it/certificate-register); [BV China public documents](https://www.bureauveritas.cn/en/our-services/certification/public-document-information)
- BSI: public Certificate and Client Directory. — [BSI directory](https://www.bsigroup.com/LocalFiles/en-US/certificate-and-client-directory.html)
- Intertek: no general public certified-client directory found; SpecDIRECT covers building products only. — [Intertek SpecDIRECT](https://specdirect.intertek.com/)
- NN/g: real staff portraits are studied; stock models ignored (section 2). — [NN/g Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/)
- Google helpful-content guidance recommends clear authorship/bylines; trust is the most important E-E-A-T component; YMYL topics get extra weight. — [Google, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google Organization structured data: `vatID` is described as a trust signal users can look up; `iso6523Code`/DUNS/LEI identifiers, `logo` (>=112x112 px), multiple `address` entries, `contactPoint`, `sameAs` recommended; place on homepage or About page. — [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- SurveyMonkey/Reddit 2026: vendor websites trusted by 55% of decision-makers, second only to peers. — [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/)

### Inferences (checklist)
- [ ] Accreditations page: each mark (ANAB ISO 17020, ISO 9001/14001/45001, GAFTA, APEDA, AIACI, any national CoC programme appointments) shown with scope, certificate number, issuing body, validity and a link to the accreditation body's public register entry. Evidence: SGS/BV/BSI directories; Google identifier guidance.
- [ ] Impartiality statement page signed by top management, plus a Complaints & Appeals page with a form, process steps, independence of reviewers and expected timelines; both in the footer and in each site language. Evidence: ISO 17021-1 5.2/8.1 via SADCAS/PJR; BV multilingual practice; ISO 17020 practice.
- [ ] Certificate / report verification tool (enter certificate or report number, or scan QR) returning valid/suspended/withdrawn; if a public directory is not feasible at launch, a verification request form with a stated turnaround. Evidence: SGS, BV Italia, BSI.
- [ ] Named leadership and technical experts with real photos and credentials; author bylines on technical articles. Evidence: NN/g photos; Google authorship guidance.
- [ ] Case studies with client (or anonymised sector), scope, location, outcome. Evidence: Demand Gen case-study preference (section 2).
- [ ] Legal/trust footer set: Privacy notice, Cookie notice, Terms / general conditions of inspection, Impartiality, Complaints & Appeals, Code of ethics / anti-bribery, Accreditations, Certificate verification, Company registration and VAT/TRN. Evidence: ISO family public-information clauses; Google vatID trust signal.
- [ ] Organization schema on the homepage with legal name, identifiers, logo, all office addresses and contact points. Evidence: Google Organization documentation.
- [ ] Security: HTTPS everywhere is baseline; visible "security badges" have no cited evidence of effect on B2B services sites and are not a substitute for the above. Evidence: gap.

### Gaps
- Verbatim wording of ISO/IEC 17020:2012 7.5-7.6, ISO/IEC 17065:2012 4.6 and ISO/IEC 17021-1:2015 5.2/8.1 was not retrieved; the proposal should quote from the company's own copies and from ANAB's accreditation requirements.
- No research found on whether security badges / SSL seals affect trust on B2B services sites.
- Bureau Veritas has no single global certificate-check tool that I could find; registers are per country.

---

## 5. Multilingual and multi-region (language vs country selectors, Arabic RTL, Chinese, hreflang, what to translate first, cost and governance)

### Takeaway
Separate "which country/office" from "which language"; never use flags for languages; implement hreflang reciprocally with x-default; design the Arabic (RTL) layout deliberately (mirror direction-bearing elements only, keep numbers LTR); translate the money pages first and budget for ongoing maintenance (vendors cite 15-30% a year).

### Cited Findings
- W3C: "Flags represent countries, not languages"; label content by language, not country; flags may suit region-based sites but not plain translation links. — [W3C i18n, Indicating the language of a link destination](https://www.w3.org/International/questions/qa-link-lang)
- Vendor/design guidance: show language names in native form; globe/translate icons are understood; when a company has physical presence in specific countries, country selection comes first and languages within it; allow users to override any automatic geo-redirect. — [Smartling language selector best practices](https://www.smartling.com/blog/language-selector-best-practices); [Smart Interface Design Patterns](https://smart-interface-design-patterns.com/articles/language-selector/); [Third and Grove](https://www.thirdandgrove.com/insights/should-you-use-flags-for-your-country-language-selector-menu/)
- Google hreflang: declare via HTML `<link rel="alternate" hreflang>`, HTTP header, or XML sitemap (one method is enough); every version must list itself and all others (missing return links are ignored); fully qualified URLs; `x-default` for the fallback/selector page; codes are ISO 639-1 language plus optional ISO 3166-1 alpha-2 region, scripts via ISO 15924 (`zh-Hans`, `zh-Hant`); region alone is invalid; `UK`, `EU`, `UN` are not valid regions (use `GB`); update hreflang during migrations. — [Google Search Central, Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- RTL design: mirror direction-bearing icons (arrows) but not others (camera); numbers, clock faces, phone numbers and media controls stay LTR; blanket automated mirroring fails; choose banner images per language rather than mirroring; check icon meaning with native speakers; set `dir="rtl"` and `lang="ar"` on `<html>`; design LTR and RTL versions up front; Noto fonts cited for Arabic. — [Material Design bidirectionality](https://m2.material.io/go/design-bidirectionality); [Greenpeace RTL principles PDF](https://jira.greenpeace.org/secure/attachment/27098/Right-to-Left%20_%20Overall%20design%20principles.pdf); [Translated.com RTL mistakes](https://translated.com/resources/arabic-rtl-market-localization-mistakes); [SimpleLocalize RTL guide](https://simplelocalize.io/blog/posts/rtl-design-guide-developers/); [Argos Multilingual](https://www.argosmultilingual.com/blog/planning-for-rtl-languages-how-layout-content-and-qa-fit-together)
- Translation cost benchmarks (vendor data, 2025-2026): Alconost averages ~$0.10/word Simplified Chinese and ~$0.09/word Arabic for human translation, ~$0.08 for MT post-editing, LQA ~$41/hour; Translayte quotes $0.18-0.40/word for Arabic/Mandarin; Smartling $0.08-0.30 human, $0.01-0.05 MT, $0.04-0.12 AI plus post-edit; specialised technical/legal content +20-40%; maintenance 15-30% per year if not automated; translation memory and API sync cut workload 40-50%. — [Alconost localization cost](https://alconost.com/en/blog/localization-cost); [Translayte](https://translayte.com/blog/how-much-does-a-translator-cost-in-2025); [Smartling](https://fr-ca.smartling.com/blog/website-localization-cost); [Lokalise](https://lokalise.com/blog/translation-costs/); [Reverie](https://reverieinc.com/?p=1287305)
- Bureau Veritas publishes complaint forms in the same languages as its public certification summaries (a governance precedent for legal pages). — [BV Complaints and Appeals PDF](https://certification.bureauveritas.com/sites/g/files/zypfnx231/files/media/document/Complaints%20and%20Appeals_Rev%203.37%20for%20website.pdf)

### Inferences (checklist)
- [ ] Two separate controls: an office/country finder ("who do I call") and a language switcher (English default; Arabic and Simplified Chinese first; Portuguese, Thai, Malay, Urdu, Sinhala, Hindi only if an office commits to maintaining them). Evidence: W3C; Smartling country-then-language pattern.
- [ ] Language switcher uses native names and a globe icon, no flags; links to the equivalent page, not the homepage. Evidence: W3C; vendor guidance.
- [ ] URL structure `/en/`, `/ar/`, `/zh-hans/` with reciprocal hreflang and `x-default`; validated in Search Console after launch. Evidence: Google.
- [ ] Arabic version designed as its own layout (mirrored nav, LTR numbers/phones/certificate numbers, per-language imagery, Arabic typeface tested), reviewed by native-speaking staff in Dubai/Jordan/Egypt/Iraq/Saudi offices. Evidence: Material/Greenpeace/Translated.
- [ ] Translate in order: contact/office pages, core service pages, accreditations/impartiality/complaints/privacy, homepage, then industries, then news. Evidence: BV legal-page precedent; conversion priority (section 3).
- [ ] Budget line for professional translation (roughly US$0.10-0.30 per word depending on vendor and technicality) plus 15-30% yearly maintenance; one owner per language. Evidence: Alconost/Translayte/Reverie (vendor figures; obtain quotes).
- [ ] Geo-detection may suggest a country/language but never forces it. Evidence: Smartling.

### Gaps
- No authoritative rate card for Arabic/Chinese translation; figures are vendor estimates varying about 3x between sources.
- No research found on Chinese-market-specific expectations for a foreign TIC company's site (ICP licensing, hosting inside China, WeChat contact); outside this task's sources.
- No usability study comparing country-first vs language-first selectors on corporate sites.

---

## 6. Accessibility (WCAG 2.2 AA), performance (Core Web Vitals), mobile-first, privacy and cookie consent (GDPR, UAE PDPL, Saudi PDPL)

### Takeaway
Target WCAG 2.2 Level AA (W3C Recommendation Oct 2023, updated Dec 2024, ISO/IEC 40500:2025), Core Web Vitals "good" at the 75th percentile on mobile and desktop (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1), and an opt-in consent banner for non-essential cookies that satisfies GDPR/ePrivacy, the UAE federal PDPL and Saudi PDPL; exact UAE cookie rules are not yet spelled out in executive regulations, so follow the stricter GDPR pattern.

### Cited Findings
- WCAG 2.2 is a W3C Recommendation published 5 Oct 2023, updated 12 Dec 2024; also ISO/IEC 40500:2025; conformance levels A/AA/AAA; content meeting 2.2 also meets 2.1 and 2.0; 4.1.1 Parsing is obsolete. — [W3C WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- Nine new 2.2 criteria; the A/AA ones that matter for a corporate site: 2.4.11 Focus Not Obscured (AA), 2.5.7 Dragging Movements (AA), 2.5.8 Target Size minimum 24x24 CSS px (AA), 3.2.6 Consistent Help (A), 3.3.7 Redundant Entry (A), 3.3.8 Accessible Authentication (AA). — [W3C, What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- Core Web Vitals: LCP good <= 2.5 s (poor > 4.0 s), INP good <= 200 ms, CLS good <= 0.1; assessed at the 75th percentile of page loads, segmented mobile/desktop. — [web.dev Web Vitals](https://web.dev/articles/vitals); [web.dev LCP](https://web.dev/articles/lcp)
- Google AI features page: standard page-experience and crawlability requirements apply; no AI-specific files or markup needed (section 8). — [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- GDPR/ePrivacy (EDPB consent guidelines 05/2020, as summarised by law firms): prior consent required for non-essential cookies; consent must be a clear positive act (no pre-ticked boxes, no scrolling); cookie walls are not valid consent; offer granular accept/reject. — [Akin Gump summary](https://www.akingump.com/en/insights/alerts/revisions-to-the-edpb-guidance-on-consent-cookie-walls-and-scrolling-through); [Baker McKenzie summary](https://connectontech.bakermckenzie.com/edpb-publishes-updated-guidelines-on-consent-under-the-gdpr); [RPC summary](https://www.rpclegal.com/snapshots/data-protection/cookie-walls-and-scrolling-updated-edpb-guidance/)
- UAE federal PDPL (Federal Decree-Law 45 of 2021): in force 2 Jan 2022; processing without the data owner's consent is prohibited save for stated exceptions; data subjects may request correction, restriction or stopping of processing; the UAE Data Office is the federal regulator and issues implementing guidance; the government page (updated 4 Dec 2025) does not mention executive regulations. — [u.ae Data protection laws](https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws)
- Vendor compliance guides on UAE PDPL (not official): opt-in consent for non-essential cookies that collect personal data; consent freely given, specific, informed, unambiguous and withdrawable; applies to UAE residents' data wherever processed; DIFC and ADGM have separate regimes (DIFC's 2025 amendment adds explicit cookie provisions and a private right of action); executive regulations still pending as of 2026; penalties reported up to AED 5M. — [CookieYes UAE PDPL](https://www.cookieyes.com/blog/uae-data-protection-law-pdpl/); [Consentstack UAE](https://consentstack.io/regulations/uae-pdpl); [Consentstack DIFC](https://www.consentstack.io/regulations/difc-dpl); [Secure Privacy UAE](https://secureprivacy.ai/laws/uae-pdpl)
- Saudi PDPL (vendor guides, not SDAIA text): explicit prior consent for non-essential cookies; privacy notice shown on arrival and linked to the relevant policy sections; applies to Saudi residents' data processed abroad; foreign controllers must appoint a local representative registered with SDAIA; fines reported up to SAR 5M, doubled for repeat. — [Secure Privacy Saudi PDPL](https://secureprivacy.ai/laws/saudi-arabia-pdpl); [CookieHub PDPL](https://www.cookiehub.com/pdpl); [CookieYes Saudi](https://www.cookieyes.com/saudi-arabia-pdpl-compliance/)

### Inferences (checklist)
- [ ] Contractual requirement: WCAG 2.2 AA, verified with automated plus manual audit (keyboard, screen reader, 24 px targets, visible focus, contrast) before launch and on each template change. Evidence: W3C.
- [ ] Performance budget: CWV "good" at p75 on mobile for homepage, service pages, office pages and the quote form; measured with field data in Search Console, not only Lighthouse. Evidence: web.dev.
- [ ] Mobile-first layouts for every template; test the quote form and office finder on low-end Android, since Gulf/South-Asian traffic is expected to be mobile-heavy (assumption; see gap). Evidence: web.dev mobile segmentation; gap.
- [ ] Consent management: opt-in banner with equal Accept/Reject, granular categories, withdrawable from the footer, no cookie wall, no scrolling consent; consent records kept; works in Arabic and Chinese. Evidence: EDPB summaries; UAE/Saudi vendor guides.
- [ ] Privacy notice covering GDPR (EU clients), UAE PDPL, Saudi PDPL, plus a DIFC/ADGM note if any entity sits in a free zone; reviewed by counsel because UAE executive regulations are pending. Evidence: u.ae page; vendor guides.
- [ ] Forms collect the minimum data and state the purpose and the office that will receive it. Evidence: PDPL consent principles.

### Gaps
- Official UAE Data Office cookie guidance and the text of any executive regulations were not found; all cookie-specific UAE statements come from compliance vendors.
- SDAIA's own implementing-regulation text on cookies was not retrieved.
- No reliable statistic on mobile share of B2B traffic in the Gulf/South Asia found in this pass.

---

## 7. Content governance for multi-office companies (ownership, editorial workflow, templates, freshness, measurement)

### Takeaway
Practitioner consensus is a hub-and-spoke model: a central owner for brand, templates, legal pages and the CMS, with named regional contributors for office pages, local news and translations; approvals tiered by risk; one CMS; measurement based on lead quality and revenue rather than traffic.

### Cited Findings
- Hub-and-spoke is described as the most common enterprise model: central team owns brand standards, direction and quality; regional/functional teams produce content for their context. — [Averi, Enterprise content operations](https://resources.averi.ai/solutions/enterprise-content-operations)
- Ownership is split: marketing/brand owns visual and messaging standards, legal/compliance owns required disclaimers and regulated language, a content-operations/platform owner runs workflow and tooling; governance breaks when nobody owns the workflow. Tiered approvals: routine updates need editorial review only; regulated pages need legal sign-off. — [Highspot, Content governance](https://www.highspot.com/en-gb/blog/content-governance/); [WP Engine, Content governance](https://wpengine.com/blog/content-governance/)
- Four framework components: ownership, standards, workflow, tooling; rules alone fail without enforcing workflow/tooling; audit trails support compliance. — [Zoomforth framework](https://www.zoomforth.com/blog/content-governance-framework/); [Acquia glossary](https://www.acquia.com/glossary/content-governance)
- Over half of enterprises run multiple CMSs, treated as a governance failure (unclear ownership and versioning). — [Elcom, Enterprise website content governance (updated Jun 2026)](https://www.elcom.com.au/resources/blog/enterprise-website-content-governance)
- Google warns against changing dates to seem fresh and against mass-producing pages; recommends disclosing automation/AI use. — [Google, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- One B2B SEO agency argues AI systems weight recently updated information so accurate last-modified dates matter (opinion). — [Altitude Marketing](https://altitudemarketing.com/?p=63498)
- B2B KPI guidance: lead quality (scored on budget, authority, readiness) over volume; track visitor-to-lead, lead-to-opportunity, time-to-conversion; agree the MQL definition with sales; tie results to revenue via attribution; keep dashboards small. Pipedrive cites 39% MQL-to-SQL for SMB SaaS (not a general B2B benchmark). — [NetSuite B2B marketing KPIs](https://netsuite.com/portal/resource/articles/business-strategy/b2b-marketing-kpis.shtml); [Leadfeeder](https://www.leadfeeder.com/blog/b2b-marketing-kpis); [Smartlead](https://www.smartlead.ai/blog/b2b-lead-generation-kpis); [Pipedrive](https://www.pipedrive.com/en/blog/b2b-marketing-kpis)
- Google Search Console reports AI Overview/AI Mode traffic inside the "Web" search type. — [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)

### Inferences (checklist)
- [ ] One website owner at HQ (a business owner, not IT), one editor-in-chief, and a named content contributor per office/country with a deputy. Evidence: hub-and-spoke sources.
- [ ] Page-type ownership matrix: service pages (service heads), industry pages (BD), office pages (office managers), accreditations/impartiality/complaints (quality manager), privacy/terms (legal), news (marketing), translations (language owners). Evidence: split-ownership guidance.
- [ ] Fixed templates (service, industry, office, programme/CoC, case study, news, person, legal) so contributors fill fields rather than design pages. Evidence: Zoomforth/WP Engine standards and tooling.
- [ ] Tiered approval: editorial only for news; quality-manager sign-off for any page that mentions accreditation scope or programme rules; legal for privacy/terms. Evidence: Highspot tiered approvals.
- [ ] Review calendar: every page has a review-by date and owner; accreditation and programme pages reviewed quarterly; stale pages flagged in the CMS; no fake date bumps. Evidence: Google freshness warning.
- [ ] Single CMS with roles, audit trail, workflow and translation management; no per-office microsites. Evidence: Elcom multi-CMS finding.
- [ ] Measurement: quote requests by service/country/office, acceptance rate by the office (lead quality), time to first response, verification-tool usage, office-page views by country, CWV, and a shared MQL definition with sales. Evidence: KPI sources.

### Gaps
- All governance sources are vendor blogs; no standards-body or academic source on multi-office website governance was found.
- No benchmark for website conversion rates in inspection/certification specifically.

---

## 8. SEO fundamentals that matter in 2026 for B2B services (helpful content, E-E-A-T, structured data, migration/redirect discipline, AI search) and myths to avoid

### Takeaway
Google's own documentation: write people-first content, show authorship and trust, no preferred word count, no special files or schema needed for AI Overviews/AI Mode; use Organization (and other) structured data that matches visible text; run the migration with a full URL map, 301s kept at least a year, hreflang updated, and monitoring in Search Console.

### Cited Findings
- Google helpful content: self-assessment questions on originality, depth, expertise and page quality; E-E-A-T is not a direct ranking factor but trust is the most important element; YMYL weighted more; clear bylines; disclose how content was made including AI; explicitly "No, we don't" have a preferred word count; warning signs include mass-producing pages and changing dates to look fresh. — [Google, Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google AI Overviews/AI Mode: no additional requirements; page must be indexed and eligible for a snippet; "no special schema.org structured data that you need to add"; "You don't need to create new machine readable files, AI text files, or markup"; standard practices apply (crawlable, internal links, good page experience, text content, quality images); control with nosnippet/max-snippet/noindex; Google-Extended controls AI training/grounding elsewhere; AI traffic reported under "Web" in Search Console. — [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- Organization structured data: recommended properties include name/legalName, url, iso6523Code (preferred over duns/leiCode), vatID (trust signal), logo >= 112 px, address (multiple allowed), telephone/email/contactPoint, sameAs; put on homepage or About page. — [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- Site move with URL changes: compile old URLs from sitemaps, logs, analytics, Search Console, CMS (including images/PDFs); map each to a new URL; server-side 301/308, no chains over 3 hops, do not dump old URLs on the homepage (soft-404 risk); self-referencing canonicals; update hreflang and internal links; keep redirects at least one year, ideally indefinitely; submit new sitemap; Change of Address only when the domain changes; monitor index coverage, performance, server logs; rankings may fluctuate for weeks. — [Google, Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- hreflang must be reciprocal and complete, with x-default (section 5). — [Google, Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Agency claims to treat cautiously: "December 2025 core update expanded E-E-A-T beyond YMYL", "schema gives 20-30% higher AI-answer surfacing", "AI-search visitors 4.4x more valuable" — none traceable to Google; Google's AI-features page contradicts the schema claim. — [Altitude Marketing](https://altitudemarketing.com/?p=63498); [Revnew AEO](https://revnew.com/blog/aeo-strategies-for-b2b-companies); [Whitehat SEO 2026 guide](https://whitehat-seo.co.uk/blog/b2b-seo-strategy)
- SurveyMonkey/Reddit 2026: search engines trusted by 54% of decision-makers, AI chatbots 39%; 83% research before contacting sales. — [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-and-reddit-the-hidden-b2b-journey-2026/)

### Inferences (checklist)
- [ ] Migration plan is a named deliverable: crawl of ticqc.ae and ticqc.com, URL map, 301s, hreflang, canonical, sitemap, Search Console monitoring for 12 months; ticqc.com keeps redirecting. Evidence: Google site-move doc.
- [ ] Every service, programme (Iraq CoC, Egypt CoC), office and expert page answers the questions a buyer or importer actually asks (scope, which standard, which countries, documents needed, turnaround, how to apply), with a named author/owner and a real last-reviewed date. Evidence: Google helpful content; E-E-A-T.
- [ ] Structured data: Organization (all offices, identifiers, VAT/TRN), LocalBusiness/Place per office, BreadcrumbList, Article for news, Person for experts, FAQPage only where FAQs are visible. Evidence: Google structured-data docs; "must match visible text".
- [ ] No "AI optimisation" line items beyond crawlability, text content and quality; no llms.txt-style deliverables sold as ranking features. Evidence: Google AI-features page.
- [ ] No word-count targets in the content brief; length is set by the question answered. Evidence: Google "No, we don't".
- [ ] Measure AI-surface traffic in Search Console "Web" plus referral tracking from chat assistants. Evidence: Google AI-features page.

### Gaps
- Could not read the eMarketer "B2B SEO and GEO 2026" report (paywalled); only its existence is noted.
- No Google statement found confirming or denying the "December 2025 core update expanded E-E-A-T" claim.

---

## 9. Examples of award-winning or widely praised B2B/industrial corporate websites (2024-2026) and what makes them good

### Takeaway
Award archives reward visual craft more than B2B usability; the relevant 2024-2026 honourees found are Terminal Industries (Awwwards Site of the Month, Sep 2025), Docusign Brand (Awwwards SOTD, May 2024), IEM (w3 Awards 2025, manufacturing), WHB (Website of the Year 2025, industrial), plus the TIC leaders' own feature patterns (SGS directories and verification, BV multilingual complaint forms). Use them as references for specific features, not as a design brief.

### Cited Findings
- Awwwards Business & Services honours 2024-2026 include Terminal Industries by REJOUICE (Honors Aug 2025; Site of the Month Sep 2025), Composites.archi by Sparkk (SOTD Apr 2025), OH Architecture (SOTD Apr 2025), Docusign Brand by BASIC/DEPT (SOTD May 2024), Microsoft AI (SOTD Nov 2025), ChainGPT Labs (SOTD Nov 2024), Obys (SOTD May 2026); the archive page gives no descriptions or criteria. — [Awwwards Business & Services winners](https://www.awwwards.com/websites/winner_category_business-services/)
- w3 Awards 2025: Industrial Electric Manufacturing (IEM) site by FINE won in Manufacturing Websites; the agency credits a search-friendly information architecture organised around industry verticals. — [FINE news](https://www.wearefine.com/news/iem-wins-w3-2025-gold-award-for-best-manufacturing-website/)
- Website of the Year 2025 (Hungary): WHB industrial site received a Quality Award; 253 entries, 83 awarded. — [WHB blog](https://whb.hu/en/blog/website-of-the-year-2025/)
- Scylla Group "Top Manufacturing Websites of 2025" (Nov 2025, editorial list): judged on catalogue depth, resource centre, UX, conversion and brand. — [Scylla Group](https://scyllagroup.com/insights/2025/top-manufacturing-websites-of-2025/)
- Corporate & Financial Awards 2025 winners (Communicate Magazine, Nov 2025) exist but the page was not opened. — [Communicate Magazine](https://www.communicatemagazine.com/news/2025/corporate-financial-awards-2025-winners-revealed)
- TEAM-NB maintains a list of notified bodies' online certificate-validity checks (2020 list), showing public verification is an industry norm among conformity-assessment bodies. — [TEAM-NB list PDF](https://team-nb.org/wp-content/uploads/2025/02/TEAM-NB-List-of-on-line-check-for-validity-of-certificates-20200623.pdf)
- SGS, BV and BSI public certificate directories and SGS document verification (section 4). — [SGS](https://www.sgs.com/en-ae/certified-clients-and-products); [BV Italia](https://www.bureauveritas.it/certificate-register); [BSI](https://www.bsigroup.com/LocalFiles/en-US/certificate-and-client-directory.html)

### Inferences (checklist)
- [ ] Reference set for the design team: Terminal Industries and Docusign Brand (visual craft, restrained motion), IEM (industry-vertical IA), SGS (certificate directory, document verification, country/language handling), Bureau Veritas (multilingual legal/complaints pages), BSI (client directory). Evidence: above.
- [ ] Judge references by the checklist in sections 1-8, not by awards; Awwwards winners are not evaluated for WCAG or B2B conversion. Evidence: Awwwards archive gives no usability criteria.

### Gaps
- No 2024-2026 Awwwards/CSS Design Awards/Webby winner specifically in testing, inspection or certification was found.
- Award pages do not explain why sites won; "what makes them good" is inferred from agency write-ups only.
- A full competitor review (BV, SGS, Intertek, TUV, DNV, Applus, Eurofins IA and features) was outside this task beyond the verification tools above.

---

## Consolidated quality-bar checklist (section number in brackets)

Information architecture
- [ ] Services-first navigation, Industries secondary, no duplicated taxonomy [1]
- [ ] Mega menu: grouped, 300-500 ms delay or click, keyboard-accessible, real landing page per item [1]
- [ ] Header search box visible; "find a service" filter page [1]
- [ ] Location-based breadcrumbs under the nav, truncated on mobile [1]
- [ ] Mobile nav shows 3-5 primary items [1]

Homepage
- [ ] One-sentence positioning plus primary and secondary CTA [2]
- [ ] Accreditation and client proof strip, each mark clickable [2,4]
- [ ] Services grid, industries, how-we-work, real numbers, case studies, news, final CTA [2]
- [ ] Real photography only [2]

Conversion and contact
- [ ] One quote form, 5-7 fields, country-driven routing, published response promise [3]
- [ ] Office finder with local phone/email/hours/time zone per office [3]
- [ ] Human-staffed WhatsApp Business with hours; API if analytics/routing needed [3]
- [ ] Chat is human or narrowly scoped and hands off in three messages or fewer; no generic bot [3]
- [ ] Callback option; documented lead-routing rules tested before launch [3]

Trust and compliance pages
- [ ] Accreditations page with scope, number, validity, register links [4]
- [ ] Impartiality statement; Complaints & Appeals page with form and process [4]
- [ ] Certificate/report verification tool or request form [4]
- [ ] Named experts with photos and credentials; bylines [4]
- [ ] Footer legal set incl. privacy, cookies, terms/conditions of inspection, ethics, VAT/TRN [4,6]
- [ ] Organization schema with all offices and identifiers [4,8]

Multilingual / multi-region
- [ ] Separate office finder and language switcher; native names; no flags [5]
- [ ] /en /ar /zh-hans with reciprocal hreflang and x-default [5]
- [ ] Arabic RTL designed as its own layout, native-speaker review [5]
- [ ] Translation order: contact, services, legal/trust, home, industries, news; budget plus yearly maintenance; one owner per language [5]
- [ ] Geo suggestion never forced [5]

Accessibility, performance, privacy
- [ ] WCAG 2.2 AA with manual audit [6]
- [ ] CWV good at p75 mobile and desktop (LCP 2.5 s, INP 200 ms, CLS 0.1) [6]
- [ ] Opt-in consent banner, equal reject, no cookie wall, withdrawable, multilingual [6]
- [ ] Privacy notice covering GDPR, UAE PDPL, Saudi PDPL; counsel review [6]

Governance and measurement
- [ ] HQ owner, editor, named contributor per office; page-type ownership matrix [7]
- [ ] Fixed templates; tiered approvals; review-by dates; single CMS with audit trail [7]
- [ ] KPIs: quote requests by service/country, lead acceptance by office, response time, verification usage, CWV [7]

SEO and migration
- [ ] Full URL map, 301s kept at least a year, hreflang/canonical updated, Search Console monitoring [8]
- [ ] People-first service/programme pages with real review dates; no word-count targets [8]
- [ ] Structured data matching visible content; no "AI file" deliverables [8]

Reference sites
- [ ] Terminal Industries, Docusign Brand, IEM, SGS, Bureau Veritas, BSI as feature references, judged against this checklist [9]
