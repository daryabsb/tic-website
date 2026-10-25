# Arabic and China readiness for the TIC Quality Control website rebuild

Research date: 2026-10-21 (20:47 UTC) to 2026-10-22 (local). Researcher: subagent for the website-rebuild proposal. Method: raw-HTML probes with curl (html lang/dir, hreflang, font references, Arabic-Indic digit bytes, ICP strings), rendered-page inspection in Chrome (computed fonts, `document.dir`, digit counts, screenshots), WebFetch summaries, China availability testers, and web search. Every finding carries the URL it came from; inferences are marked. Screenshots: `screenshots/arabic-and-china-readiness/` (TÜV Rheinland UAE Arabic home, HQTS Arabic home, SFDA Arabic home, Emirates NBD Arabic home, all 2026-10-22).

Scope note: this builds on `users-and-journeys.md` (key question 3 and journeys A to G), `b2b-website-best-practice.md` section 5, `platform-and-tech-options.md` section 8 and `ticqc-current-site-audit.md` section 5 (which lists the current third-party scripts: Google Tag Manager GTM-5KRPQDSK, Cloudflare, Google Fonts via Elementor, Contact Form 7 with a Permissions-Policy header naming google.com, recaptcha.net, challenges.cloudflare.com and hcaptcha.com, GTranslate and Polylang).

---

## Part A. Arabic

## Key Question 1: What the Arabic versions of TIC competitor and regulator sites actually do

### Takeaway
Only three mid-size inspection companies (QIMA, HQTS, V-Trust) and Pro QC publish a real Arabic site; TÜV Rheinland's UAE Arabic page is a partial subset with a visible "Translation missing" string and no `dir="rtl"` on `<html>`; SGS, Intertek, Cotecna and Bureau Veritas have no Arabic web pages at all for Egypt or Saudi Arabia (only PDFs). None of the TIC sites loads an Arabic typeface: all render Arabic through fallback system fonts, while the Saudi regulator (SFDA) self-hosts IBM Plex Sans Arabic and the Iraqi regulator loads Cairo from Google Fonts. Everyone uses Western digits in body text; the only Arabic-Indic digits found were TÜV's copyright year and 33 digits on GOEIC.

### Cited Findings

TÜV Rheinland UAE, Arabic (https://www.tuv.com/united-arab-emirates/ar/), fetched 2026-10-21 and rendered 2026-10-22:
- `<html lang="ar">` with no `dir` attribute; the rendered page reports `document.dir` empty and computed `body` direction `ltr`; a single `dir="rtl"` appears lower in the markup. Arabic page HTML is 87,647 bytes with about 1,379 Arabic characters, versus 203,231 bytes for the English page at https://www.tuv.com/united-arab-emirates/en/ (so the Arabic version is a subset, not a mirror). — curl probe and Chrome `getComputedStyle`, 2026-10-21/22.
- Fonts actually loaded in Chrome: "Univers LT W02_55 Roman", Roboto, FontAwesome; `h1` computed font Calibri. No Arabic typeface is loaded, so Arabic glyphs come from the OS fallback. — Chrome `document.fonts`, 2026-10-22.
- Untranslated strings on the Arabic home page: "Translation missing: business_driver_certipedia_error_message"; the "Featured services" list ("Type Testing: Systems and Components", "Invoice Audit...", "Airports"), the footer "Company" list (News, Events, Facts and Figures, Certipedia, Information for suppliers) and the legal links (Data Protection Declaration, Terms and Conditions, Imprint, Cookie Policy) are English; the page `<title>` is "TÜV Rheinland | AE | TÜV Rheinland". The Cookiebot consent dialog (Consent/Details/Ad Settings/About, REJECT, ACCEPT) is English (screenshot). — WebFetch summary and screenshot, 2026-10-22.
- Language switch: a flag icon plus the two-letter label "AR" in the header; no visible English label; the site uses `/en/` and `/ar/` path segments. No `hreflang` links on either page. — WebFetch and curl, 2026-10-21/22.
- Digits: the copyright line reads "© TÜV Rheinland ٢٠٢٦" (Arabic-Indic), the only four Arabic-Indic digits on the page; 21 Western digits elsewhere. Search placeholder "بحث", newsletter placeholder "أدخل عنوان البريد الإلكتروني", newsletter label "للاشتراك في نشراتنا" are Arabic. — curl digit-byte count and Chrome count, 2026-10-22.
- A mistranslation in the footer: "وصلات الهاتف الخليوي" ("mobile phone links") where "quick links" is meant. — WebFetch summary, 2026-10-22.

QIMA Arabic (https://www.qima.ae/, which https://www.qima.com/ar redirects to), fetched 2026-10-21 and rendered 2026-10-22:
- `<html lang="ar" dir="rtl">`; `hrefLang` links for ar, de, en, es, fr, pt, zh (no `x-default`); each language lives on its own domain (qima.ae, qima.com, qima.cn, qima.fr, qima.es, qima.com.de, qima.com.br). Served from AWS CloudFront. — curl, 2026-10-21.
- Language switch: a dropdown listing native names "العربية 中文 Deutsch English Español Français Portuguese" with the current label "AR"; one footer item is still "Portuguese" in English. — curl text extraction, 2026-10-21.
- Fonts actually loaded: Inter, Figtree, gothamRounded, DM Mono (all Latin families). Body font computed as Inter; headings Figtree. No Arabic typeface. — Chrome `document.fonts`, 2026-10-22.
- Digits: 0 Arabic-Indic, 56 Western. One form; placeholder "بريد العمل الإلكتروني". Mixed strings in the navigation: "GMO Auditing Life Sciences", "اختبارات Ex Vivo وتجارب In Vitro المختبرية". Tailwind `rtl:` utility classes are used for mirrored positioning. — curl and Chrome, 2026-10-21/22.

HQTS Arabic (https://www.hqts.com/ar/ redirects to https://ar.hqts.com/), fetched 2026-10-21 and rendered 2026-10-22:
- `<html dir="rtl" lang="ar">`; hreflang on the Arabic page lists only ar and en, while the English 404 page lists ar, de, en, es, fr, it, ja, ko, vi, zh-hans. WordPress/Elementor on LiteSpeed, PHP 8.3; `ar.hqts.com` resolves to Hostinger (United States) per ip-api.com. — curl and ip-api, 2026-10-21.
- Fonts loaded: Roboto 300/400/500/700, Open Sans 400/600/700; computed body font is the system stack ("-apple-system, BlinkMacSystemFont, Segoe UI, Roboto..."); `h1` Arial. No Arabic typeface. — Chrome, 2026-10-22.
- Language switch: "العربية" with a flag, last item in the top navigation, a dropdown of English, Spanish, Vietnamese, Japanese, Chinese, German, French, Korean (language names shown in English). — WebFetch, 2026-10-22.
- Untranslated: the GDPR cookie banner ("We are using cookies to give you the best experience...", Accept, Enable All, Save Settings) and the newsletter labels "Name", "Country", "E-Mail" (placeholders are Arabic: "الاسم", "بلدك", "البريد الإلكتروني"; submit is "إرسال"). Image alt text is English file names. — WebFetch and curl, 2026-10-21/22.
- Content gaps: no Iraq or Egypt pages exist on the Arabic site; regional pages exist for UAE and Saudi Arabia (https://ar.hqts.com/who-we-are/third-party-inspection-uae/, https://ar.hqts.com/who-we-are/inspection-company-saudi-arabia/). Two footer links are mislabelled (Bangladesh label points to the overview page, a "lab" label points to the Vietnam page). An Arabic chatbot panel ("مرحبا بك في مساعد مجموعة HQTS الافتراضي") is shown (screenshot). — WebFetch and screenshot, 2026-10-22.
- Digits: 0 Arabic-Indic, 10 Western. No phone numbers or WhatsApp on the home page. — Chrome and WebFetch, 2026-10-22.

Pro QC UAE (https://www.proqc.ae/ redirects to https://proqc.ae/), fetched 2026-10-21 and rendered 2026-10-22:
- `<html lang="en-US">` with no `dir` attribute although the page is Arabic; direction is set in CSS (computed `body` direction `rtl`) and with 19 inline `dir="rtl"` and 26 `dir="ltr"` attributes. `<title>` is Arabic. No hreflang. WordPress, Apache, PHP 8.2. — curl and Chrome, 2026-10-21/22.
- Fonts loaded: tt-commons-pro (Adobe Typekit) and Work Sans (Google Fonts); Inter and Work Sans are requested from fonts.googleapis.com. No Arabic typeface. — curl and Chrome, 2026-10-21/22.
- Language switch: dropdown labelled "اللغة" with native names (English, Deutsch, Français, Español – ES, Español – MX, 简体中文), each a separate domain (proqc.com, proqc.de, proqc.fr, proqc.es, proqc.com.mx, proqc.com.cn). — WebFetch, 2026-10-22.
- Untranslated: the whole cookie consent block (Cookie Settings, Accept, Reject All, SAVE & ACCEPT, Necessary, Functional, Performance, Analytics, Advertisement, Others), "Choose File", blog titles. Mixed strings such as "الفحص الأولي للعينات (FAI)", "تدقيق عمليات التصنيع (بما في ذلك VDA 6.3)". Form placeholders are Arabic ("الاسم الشخصي*", "عنوان البريد الالكتروني*", "اسم الشركة*", "الهاتف *"). A numeric captcha "34+6?" is used. — WebFetch and curl, 2026-10-21/22.
- Phone numbers are written LTR with international prefix inside Arabic labels, e.g. "أمريكا الشمالية +1 206 397 1145", "الهند وجنوب آسيا +91 227 189 7407". Digits: 0 Arabic-Indic, 159 Western. — curl and Chrome, 2026-10-21/22.

V-Trust Arabic (https://www.v-trust.com/ar/), fetched 2026-10-21 and rendered 2026-10-22:
- `<html lang="ar" dir="rtl">`; hreflang for ar, de, en, es, fr, ja, ko, pt, ru plus `x-default`; path-based languages. Served by Tengine with Alibaba Cloud cache nodes; www.v-trust.com resolves to Alibaba Cloud (Singapore) per ip-api. — curl and ip-api, 2026-10-21.
- Fonts loaded: Open Sans 400/600/700 only; computed body, `h1` and `p` all "Open Sans, Arial, sans-serif". No Arabic typeface. — Chrome, 2026-10-22.
- Language switch: dropdown labelled "Ar" in header and mobile menu, options in native names (English, Deutsch, Français, Español, Português, العربية, Русский язык, 日本語, 한국어). — WebFetch, 2026-10-22.
- Translation quality: typos "لمادا V-Trust" and "نمودج التقرير"; branch names Thailand, Pakistan, Cambodia and Myanmar left in English; blog posts English; inconsistent terms ("الفحوصات المخبرية" vs "الاختبارات المعملية"). — WebFetch, 2026-10-22.
- Features: client portal ("تسجيل الدخول", bookings on orderus.v-trust.com), "التحقق من التقرير" report-verification page at /ar/our-services/report-verification, CTAs "احجز الآن", "تنزيل نموذج لتقرير", "حدد موعدًا لاجتماع مدته 15 دقيقة" (Calendly). A China hotline 400-891-6800 is in the source. No forms rendered; no WhatsApp/WeChat on the Arabic home page. Digits: 0 Arabic-Indic, 129 Western. — WebFetch, curl and Chrome, 2026-10-21/22.

Gulftic (https://gulftic.com/ and https://gulftic.com/ar/), fetched 2026-10-21:
- Both URLs return the same 1,049-byte HTML shell with `<html lang="en">`, title "Gulftic Certifications" and only a Google Tag Manager reference; the site is a JavaScript application, so its Arabic implementation could not be evaluated without rendering. — curl, 2026-10-21.

Bureau Veritas, SGS, Intertek, Cotecna in Egypt and Saudi Arabia (fetched 2026-10-21):
- Bureau Veritas: www.bureauveritas.com.eg, www.bureauveritas.com.sa, www.bureauveritas.ae, www.bureauveritas.eg and www.bureauveritas.sa did not resolve or connect (curl status 000); https://www.bureauveritas.com/egypt and /middle-east return 404 on group.bureauveritas.com; https://www.bureauveritas.pk/ redirects to https://middle-east.bureauveritas.com/ which is English-only (`hreflang="en"` only). No Arabic BV web page was found by search either. — curl and WebSearch, 2026-10-21.
- Bureau Veritas does publish an Arabic exporter PDF for Iraq, "Iraq - Download Notice to Exporters (Arabic)", at https://cdn1-verigates-ppd.bureauveritas.com/sites/verigates/files/2019-02/Iraq%20-%20Download%20Notice%20to%20Exporters%20%28Arabic%29_1.pdf (2019 folder), plus an Arabic-titled exporter undertaking at https://cdn2-verigates.bureauveritas.com/sites/verigates/files/2023-07/VOC%20Iraq%20-%20Annex%20A%20Undertaking%20by%20exporter%201.1.docx. — WebSearch results, 2026-10-21 (files not opened).
- The Verigates Iraq page (https://verigates.bureauveritas.com/node/664, "VOC Iraq - Secure your exports to the republic of Iraq") has no language switcher and offers contact only by phone +33 1 55 24 70 00 and gsit@bureauveritas.com. — WebFetch, 2026-10-22.
- SGS: https://www.sgs.com/ar, /ar-eg and /ar-sa all return 404; https://www.sgs.com/en-eg and /en-sa exist (`lang="en-eg"`, `lang="en-sa"`). No Arabic. — curl, 2026-10-21.
- Intertek: https://www.intertek.com/saudi-arabia/ redirects to the global home; /ar/, /ar-sa/ and /egypt/ return 404. No Arabic. — curl, 2026-10-21.
- Cotecna: https://www.cotecna.com/ar returns 404; the Egypt programme is on a separate domain https://www.exports-to-egypt.com/ (linked as "Cotecna埃及" from cotecna.com.cn), not inspected for Arabic. — curl, 2026-10-21/22.

Regulators (fetched 2026-10-21, SFDA rendered 2026-10-22):
- SASO Saber (https://saber.sa/): TCP connection timed out from this location for curl (three attempts, with and without www, with `-k`) and WebFetch got ECONNREFUSED from 34.166.114.173; the site appears to restrict access by geography or client (inference). Official Arabic user guides exist at https://storage.saber.sa//UserGuids/UserGuideForShipmentRequest-Ar.pdf and https://storage.saber.sa//UserGuids/UserGuideForCertificatesOfConformity-Ar.pdf, and an about page at https://saber.sa/Home/ModalAboutSaber. — curl, WebFetch and WebSearch, 2026-10-21/22.
- SFDA (https://www.sfda.gov.sa/ar): `<html lang="ar" dir="rtl">`; Arabic is the default; `hreflang="en"` to /en/home-page; the switch is a dropdown item labelled "English" (and "العربية" on the English side); self-hosted IBM Plex Sans Arabic Regular/Medium/Bold (computed body, h1 and p all "IBMPlexSansArabic"); 0 Arabic-Indic digits, 333 Western digits (statistics such as "+26718" shown in Western digits, screenshot); Hijri date in the header ("الأربعاء 10 جمادى الأولى 1448هـ"); feedback labels "هل كانت هذه الصفحة مفيدة؟"; Google Tag Manager is used. — curl and Chrome, 2026-10-21/22.
- COSQC Iraq (https://cosqc.gov.iq/): `<html lang="en">` although the whole site is Arabic; direction set with 24 inline `dir="RTL"` and 2 `dir="LTR"` attributes; a banner reads "تحت الإنشاء" (under construction); loads Cairo (plus Roboto, Poppins, Nunito) from fonts.googleapis.com with inline Calibri/Arial rules; jQuery from cdn.jsdelivr.net; a bare "En" link as the language switch; a Telegram link (t.me) and a maps.google.com link; services listed include "تقييم المطابقة للمركبات" and "منح الشهادات". — curl, 2026-10-21.
- GOEIC Egypt (https://www.goeic.gov.eg/ redirects to /ar): `<html lang="ar">` with no `dir` attribute on `<html>`; a `<select>` language control with AR/EN/FR; 33 Arabic-Indic digits in the markup; five forms with Arabic placeholders ("إسم المستخدم \ البريد الالكتروني", "كلمة المرور"); the home page is the "نظام التسجيل الموحد" (unified registration) login for importers/exporters; Google Tag Manager used. — curl, 2026-10-21.
- MoIAT UAE (https://moiat.gov.ae/ar/): `<html dir="rtl" lang="ar">`; about 36,000 Arabic characters; Arabic search placeholder "ابحث في الموقع" and a tracking field "رقم الطلب/المرجع"; 8 Arabic-Indic digits; no hreflang; links to conformityhub.moiat.gov.ae. — curl, 2026-10-21.

### Inferences
- The competitive bar for Arabic in this industry is low: a correctly declared `dir="rtl"`/`lang="ar"`, a real Arabic typeface, Arabic cookie/consent and form labels, and Arabic Iraq/Egypt programme pages would already exceed every competitor inspected (TÜV, QIMA, HQTS, V-Trust, Pro QC), none of which has all four.
- The regulators that TIC's importers come from (SFDA, GOEIC, COSQC, MoIAT) are Arabic-first and use Western digits in body text; matching that convention (Western digits for certificate numbers, phone numbers, dates and amounts, written LTR inside RTL text) will look native to those users. Arabic-Indic digits are a stylistic choice, not an expectation, on these sites.
- The common failure modes seen are: forgetting `dir` on `<html>` (TÜV, Pro QC, GOEIC), third-party widgets in English (cookie banners on TÜV, HQTS, Pro QC; chat/consent vendors), partial translation of footers and feature lists (TÜV, V-Trust), typos from unreviewed translation (V-Trust), and Latin-only web fonts (all five TIC sites).
- Separate-domain language sites (QIMA, Pro QC) make the switch a cross-site jump and lose the "same page in another language" link; path-based sites (V-Trust, TÜV, SFDA) keep it.

### Gaps
- Gulftic's Arabic site could not be evaluated (JavaScript shell); Saber could not be loaded from this location; Aramco and Etihad connections were refused to curl, so they were not used as RTL reference points.
- Bureau Veritas Egypt/Saudi, SGS, Intertek and Cotecna have no Arabic web pages to assess; their Arabic exists only as PDFs (BV) or not at all.
- No Chinese-language counterpart check was possible for HQTS (hqts.com.cn did not respond; the zh-hans URL in the hreflang list could not be extracted) or TÜV Rheinland China (all guessed paths 404).

---

## Key Question 2: Non-TIC UAE/Saudi bilingual reference points (RTL)

### Takeaway
Emirates NBD and Dubai Chamber are usable references: both declare `dir="rtl"` and `lang="ar"`, load an Arabic web font (Tajawal from Google Fonts, with the "Dubai" typeface also declared), use reciprocal hreflang, keep Western digits and LTR numbers, and separate the country selector from the language switch. DP World's Arabic home could not be found at the obvious paths.

### Cited Findings
- Emirates NBD Arabic (https://www.emiratesnbd.com/ar), rendered 2026-10-22: `<html dir="rtl" lang="ar">`; `hreflang="ar"` and `"en"`; fonts loaded: Tajawal 300/400/500/700 (from fonts.googleapis.com), Plus Jakarta Sans for Latin, and a custom "UAEDirham" symbol font; the Dubai typeface is also declared in `@font-face`; computed body font "UAEDirham, Tajawal, sans-serif, saudi_riyal"; 0 Arabic-Indic digits and 501 Western digits (hero: "بقيمة 10,000,000 درهم", screenshot); language switch "English | عربى" in the header and a mobile "EN" link to /en; a separate country selector (دولة الإمارات العربية المتحدة / المملكة العربية السعودية); residual English strings ("Please ensure Javascript is enabled for purposes of website accessibility", a "Personal" tab description) and unrendered template tokens "{{PrimaryLinkLabel}}" in the markup; consent dialog in Arabic ("قبول الكل", "رفض الكل"). — curl 2026-10-21 and Chrome 2026-10-22.
- Dubai Chamber Arabic (https://www.dubaichambercommerce.com/ar/), fetched 2026-10-21: `<html class="rtl" dir="rtl" lang="ar-SA">` (note the Saudi region code on a Dubai site); `hreflang` ar-SA, en-US and `x-default`; Tajawal and "Dubai" font families referenced; Liferay platform; `wa.me` WhatsApp links present; about 7,800 Arabic characters. The legacy URL https://www.dubaichamber.com/ar/ redirects to the English home https://www.dubaichambercommerce.com/en/, losing the language. — curl, 2026-10-21.
- DP World: https://www.dpworld.com/ar, /ar-ae and /ar/home all return 404, although the 404 template itself renders with `lang="ar"`/`lang="ar-ae"` and `dir="rtl"`, Sitecore Content Hub and Usercentrics consent. — curl, 2026-10-21/22.
- Aramco (https://www.aramco.com/ar, /ar-sa) and Etihad (https://www.etihad.com/ar-ae/) refused the curl connection (status 000). — curl, 2026-10-21.

### Inferences
- Tajawal (Google Fonts, OFL) is the de facto Arabic UI face on large UAE corporate sites, usually paired with a Latin sans; the proprietary "Dubai" font is declared alongside it. For a site that must also work in China, self-hosting the Arabic font (as SFDA does with IBM Plex Sans Arabic) avoids the fonts.googleapis.com dependency (see Key Question 5).
- Even well-resourced banks leak English in accessibility notices and template tokens; a pre-launch Arabic QA pass by a native reader is required regardless of CMS.

### Gaps
- DP World, Aramco and Etihad could not be inspected, so the reference set is two sites rather than three to five.

---

## Key Question 3: Which content TIC's counterparties need in Arabic, and what can stay English

### Takeaway
On the journeys in `users-and-journeys.md`, Arabic is needed where the reader is an Arabic-speaking importer, customs officer, bank or regulator-facing contact (Journeys B, D and the destination-side steps of A), while the exporter-facing programme detail (Journeys A and B from the factory's side) is read in English or Chinese. The only Arabic exporter/importer guidance found from competitors or regulators is PDF-based (Bureau Veritas Iraq notice; Saber user guides), so an Arabic HTML explainer plus Arabic certificate verification would be unusual in the market.

### Cited Findings
- Journey B ("Egyptian importer's supplier needs a GOEIC CoI") lists pages needed as "Egypt CoI guide (EN/AR/ZH), whitelist route explainer, documents list, Cairo office contact, verify certificate"; Journey D ("Customs officer or bank verifies a certificate") needs "Verify certificate (EN/AR), fraud warning, contact"; Journey A step 9 has the importer presenting the CoC at the Iraqi border and names "Iraq CoC guide (EN/ZH)". — `users-and-journeys.md`, Journeys A, B, D (local note).
- Key question 3 of the same note concludes "Arabic pages for importer-facing content (Iraq, Egypt, KSA, Jordan); Chinese for exporter-facing CoC content". — `users-and-journeys.md` (local note).
- GOEIC's public site is Arabic by default (redirect from / to /ar) and its home page is the importer/exporter "نظام التسجيل الموحد" login; COSQC is Arabic-only; SFDA defaults to Arabic with an English mirror. — curl, 2026-10-21 (see KQ1).
- Bureau Veritas publishes "Iraq - Download Notice to Exporters (Arabic)" as a PDF (2019 folder) — https://cdn1-verigates-ppd.bureauveritas.com/sites/verigates/files/2019-02/Iraq%20-%20Download%20Notice%20to%20Exporters%20%28Arabic%29_1.pdf (WebSearch result, 2026-10-21); TÜV Rheinland publishes the Iraq ICIGI "Undertaking by exporter" in English at https://origin.tuv.com/content-media-files/master-content/government-inspections-international-trade/tuev-rheinland-iraq-icig-undertaking-by-exporter-004.pdf (WebSearch result, 2026-10-21).
- SASO publishes Arabic user guides for the Saber shipment-certificate and product-certificate requests (URLs in KQ1); trade.gov notes customs will only clear products registered through Saber. — WebSearch results citing https://storage.saber.sa//UserGuids/UserGuideForShipmentRequest-Ar.pdf and https://www.trade.gov/market-intelligence/saudi-arabia-testing-inspection-certification, 2026-10-22.
- Iraq customs activated electronic verification of import documents, and declarations may be suspended if documents are not verified electronically. — Deloitte, https://www.deloitte.com/middle-east/en/services/tax/perspectives/iraq-customs-activates-electronic-verification-of-import.html (search snippet, 2026-10-21; page not opened).
- V-Trust's Arabic site includes a report-verification page (/ar/our-services/report-verification) and client login; HQTS's Arabic site has no Iraq/Egypt programme pages. — WebFetch, 2026-10-22 (KQ1).
- Bureau Veritas publishes complaint forms in the same languages as its certification summaries (precedent for translating legal/complaints pages). — `b2b-website-best-practice.md` section 5, citing https://certification.bureauveritas.com/sites/g/files/zypfnx231/files/media/document/Complaints%20and%20Appeals_Rev%203.37%20for%20website.pdf.

### Inferences
- Arabic first (importer/regulator-facing): certificate verification page and its result screen; destination-inspection explainer for Iraq and Egypt ("what the importer presents at the border, what happens on a non-conformity"); office contact pages for Dubai, Sharjah, Baghdad, Cairo, Amman, Riyadh with Arabic address lines; complaints and appeals route; impartiality statement; privacy notice; a short "about TIC" and accreditation page. These are the pages Journeys B and D hit and the pages Arabic-speaking procurement officers (Journey E, Gulf tenders) would read.
- Can stay English (with Chinese as the second language): the exporter-facing Iraq/Egypt programme guides, document checklists, RfC forms, product-scope lookups, GAFTA/commodities pages, training and testing catalogues, news. Exporters in China, India, Pakistan, Turkey and South-East Asia do not read Arabic.
- Do both: the home page, navigation, footer, consent banner, forms, error and confirmation messages, and email auto-replies. Partial translation of these is exactly where competitors look broken.

### Gaps
- No competitor or regulator publishes an Arabic HTML "importer guide" for Iraq or Egypt CoC that could be benchmarked; only PDFs were found. The exact Arabic terminology used by COSQC and GOEIC for the schemes (ICIGI, CoC, CoI, شهادة المطابقة) should be confirmed by the Baghdad and Cairo offices before any page is written.
- No evidence was found on what proportion of TIC's Iraqi/Egyptian importers visit the website versus phoning or messaging the office (office question below).

---

## Key Question 4: Arabic translation workflow evidence (CMS RTL previews, typography guidance, rate cards)

### Takeaway
Among the CMSs reviewed in `platform-and-tech-options.md`, RTL is a front-end/theme matter: WPML says RTL applies only if the theme supports it, Storyblok exposes a per-field "Enable RTL" switch, Sanity needed small custom editor changes in a documented Arabic project, and Wagtail lists "flawless RTL support" as a 2026 goal rather than a shipped feature. W3C's Arabic layout requirements give the authoritative rules on digits, numbers and mixed-direction strings. Published UAE agency rates for English to Arabic are AED 0.30 to 0.40 per word; Egypt and Jordan rates found are freelance listings only.

### Cited Findings

CMS and RTL:
- WPML: "fully supports right-to-left (RTL) formatting and languages, including Arabic, Hebrew, Urdu, Kurdish, and Persian", but "RTL layouts only apply to themes that support RTL"; support staff say display is "determined by the CSS rules of your WordPress theme"; the theme guidance is at https://wpml.org/documentation/theme-compatibility/build-rtl-wordpress-themes/. — https://wpml.org/faq/does-wpml-have-rtl-support-right-to-left/ (search snippet, 2026-10-22; FAQ page not opened).
- Storyblok: a changelog entry says Text, Textarea and Markdown field types accept right-to-left direction, enabled per field with "Enable RTL"; the changelog URL https://www.storyblok.com/cl/rtl-support returned 404 on fetch, so whether the visual preview mirrors layout is unconfirmed. — search snippet and failed fetch, 2026-10-22.
- Sanity: the "Talk In Arabic" project notes the team "made a few minor changes to the block editor to enable Arabic inline text and Arabic formatting (RTL)". — https://www.sanity.io/projects/talkinarabic (search snippet, 2026-10-21).
- Wagtail: the 2026 roadmap/GSoC report lists "flawless RTL support for Arabic, Farsi, Hebrew, and Urdu" as a project goal. — https://next.wagtail.org/blog/gsoc-2026-guide-website-revamp-report/ and https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf (search snippets, 2026-10-21).
- Locale limits and translation tooling (Sanity unlimited locales, Storyblok +$20 per locale, WPML €99 with AI words, Wagtail Localize; DeepL/Weglot/Lokalise) are already evidenced in `platform-and-tech-options.md` section 8.

Typography and bidi guidance:
- W3C "Arabic & Persian Layout Requirements" (Group Draft Note, 2 October 2025): "When the main script is Arabic, the layout and structure of pages and documents are also set from right to left" (§3.1); "Numbers, even Arabic numbers, are written from left to right, as is text in a script that is normally left-to-right" (§3.1); digit families: European digits for "Western Arabic-speaking countries; e.g. Algeria or Morocco", Arabic-Indic for "Eastern Arabic-speaking countries; e.g. Egypt, Saudi Arabia, Iraq", Eastern Arabic-Indic for "Iran and Afghanistan" (§6.1.2), with the caveat "there's no clear line between the Eastern and Western Arab regions" (§2.4.1); "numbers have a weak directionality with regards to the Bidi algorithm" and phone numbers such as "+12 34 56 78 89" are given as mixed-direction examples (§6.1.4); "Money or currency signs when they come alongside a number, are placed at the left" (§6.1.4); Unicode isolate characters' "usage is encouraged over the old embedding characters" (Appendix A.5); "Lines of Arabic script text are normally right aligned" (§7.2); "Excessive use of kashida or applying very long kashidas results in uneven color" (§7.2.5); Naskh "has become the default form of Arabic in most contexts" while "In Iran and Pakistan Nasta'līq remains the preferred style for Persian and Urdu" (§4.1.1.2). — https://www.w3.org/TR/alreq/ (WebFetch, 2026-10-21; first 100,000 characters read).
- Material Design bidirectionality (mirror direction-bearing icons only; numbers, clock faces, phone numbers and media controls stay LTR) and the Greenpeace/Translated/SimpleLocalize RTL guides are cited in `b2b-website-best-practice.md` section 5; the Material page https://m2.material.io/design/usability/bidirectionality.html returned only its title to WebFetch on 2026-10-22 and was not re-verified here.
- Google Fonts: the specimen pages (https://fonts.google.com/specimen/Cairo/about, https://fonts.google.com/noto/specimen/Noto+Sans+Arabic/glyphs) are JavaScript applications and returned no text to WebFetch; search snippets describe Almarai as "a sans-serif Arabic and Latin family in four weights ... built for readability on screen". — WebSearch, 2026-10-21. Observed in the wild: Tajawal (Emirates NBD, Dubai Chamber), Cairo (COSQC), IBM Plex Sans Arabic self-hosted (SFDA) (KQ1, KQ2).

Rate cards:
- Lingo (Dubai), article dated 3 April 2024: English to Arabic "0.40 per word for up to 5,000 words", "0.35 per word for 5,000 to 10,000 words", "0.32 per word for 10,000+ words", "0.30 per word for 20,000+ words" (AED); no technical surcharge figure given; warns that much cheaper quotes "are likely using machine translations and excluding the proofreading". — https://lingo.ae/how-much-does-a-translation-agency-charge/ (WebFetch, 2026-10-22).
- Communication Legal Translation (Dubai): a 200-word English to Arabic legal page "generally ranges from AED 35 to AED 120" depending on certification, complexity and turnaround. — https://communicationdubai.com/translation-price-list.php (search snippet, 2026-10-21).
- Egypt: ProZ profiles list "0.08 USD per word / 15 USD per hour" and a range "0.01 - 0.25 USD per word" (freelancers, self-reported). — https://www.proz.com/profile/2022934 and https://www.proz.com/profile/1966246 (search snippets, 2026-10-21).
- Jordan: a Fiverr listing at "$5 per 600 words" (about USD 0.008 per word) and a Jobbers listing "from $5 per 500 words" (freelance marketplace, not agency). — https://www.fiverr.com/s/Egjoogd and https://www.jobbers.io/service/1360/remote/professional-translation-from-arabic-to-english-and-vice-versa-fast-delivery-within-a-day (search snippets, 2026-10-21).
- Global vendor benchmarks (Alconost about $0.09/word Arabic, Translayte $0.18-0.40, Smartling $0.08-0.30 human) are in `b2b-website-best-practice.md` section 5.

### Inferences
- Workflow that fits the evidence: author in English in the CMS; machine-translate into a draft Arabic locale (DeepL/Google via the CMS plugin); professional review by a UAE/Egypt/Jordan translator at roughly AED 0.30-0.40 per word (USD 0.08-0.11) for the importer-facing pages; final sign-off by a native-speaking TIC staff member in Baghdad, Cairo, Amman or Riyadh for scheme terminology. The CMS must give editors an RTL preview of the real front-end (Storyblok/Sanity/Wagtail previews render the site's own CSS, so RTL fidelity depends on the front-end build, not the CMS).
- Budget order of magnitude (inference from the Lingo tiers): 20,000 words of Arabic (about 40 to 60 pages) at AED 0.30-0.40 is AED 6,000-8,000 for translation alone, before review cycles and 15-30% yearly maintenance (maintenance figure from `b2b-website-best-practice.md`).
- Typography decision to document: Western digits everywhere (matches SFDA, GOEIC body text, Emirates NBD and all competitors), LTR isolation (`<bdi>` or `unicode-bidi: isolate`) for certificate numbers, phone numbers and Latin product codes; a self-hosted Arabic face (IBM Plex Sans Arabic, Noto Sans Arabic or Tajawal under OFL) paired with the Latin face, rather than fonts.googleapis.com, because of the China findings below.

### Gaps
- No agency rate card from Egypt or Jordan was found; only freelance marketplace listings. Quotes should be requested from two UAE and two Egyptian agencies with a technical sample.
- Storyblok's RTL changelog and WPML's FAQ were seen only as search snippets; Webflow/Framer/HubSpot RTL behaviour remains unevidenced (already a gap in `platform-and-tech-options.md`).
- Google Fonts' own guidance on Arabic families could not be read (JavaScript pages).

---

## Part B. China

## Key Question 5: Reachability of ticqc.ae and the likely third-party dependencies from mainland China

### Takeaway
On 2026-10-21 ticqc.ae itself was reachable from all five mainland test locations, but the Google services the current and proposed stacks rely on (Google Fonts, Tag Manager, Analytics, Maps, reCAPTCHA), YouTube, LinkedIn, WhatsApp (wa.me), Vercel and Cloudflare Pages default domains, and the AWS me-central-1 and Azure UAE North endpoints tested were reported blocked, while cdnjs, jsDelivr, unpkg, hCaptcha and challenges.cloudflare.com were reachable. GreatFire's independent measurements agree on Analytics, YouTube and wa.me being 100% blocked and on cdnjs/jsDelivr/challenges.cloudflare.com being clear, but disagree on Google Fonts and Tag Manager ("not blocked" as of mid-October 2026), so those two should be treated as unreliable rather than dead.

### Cited Findings

Tool A: chinafirewalltest.com, GET https://www.chinafirewalltest.com/?siteurl=<host>, run 2026-10-21 20:47 UTC; five locations: Beijing, Shenzhen, Inner Mongolia, Heilongjiang Province, Yunnan Province. Method is not documented on the page; the page text only says it tests "in real time" and "No servers were able to reach your site" when all five fail. The page's meta description "...is Blocked in China" appears for every host, so only the per-location rows were used.
- ticqc.ae: OK at all 5.
- fonts.googleapis.com: BLOCKED at all 5. fonts.gstatic.com: BLOCKED at all 5.
- www.googletagmanager.com: BLOCKED at all 5. www.google-analytics.com: BLOCKED at all 5. maps.googleapis.com: BLOCKED at all 5. www.recaptcha.net: BLOCKED at all 5.
- www.google.com: OK at all 5 (an anomaly; Google Search is well known to be unreachable from the mainland, so this suggests the tool is measuring DNS/TCP rather than page delivery — inference).
- challenges.cloudflare.com (Turnstile): OK at all 5. hcaptcha.com: OK at all 5.
- www.youtube.com: BLOCKED at all 5.
- cdnjs.cloudflare.com: OK at all 5. cdn.jsdelivr.net: OK at all 5. unpkg.com: OK at all 5.
- platform.linkedin.com: BLOCKED at all 5. www.linkedin.com: BLOCKED at all 5.
- wa.me: BLOCKED (Beijing); the other four rows returned no status.
- vercel.app: BLOCKED at all 5. vercel.com: BLOCKED at all 5. pages.dev: BLOCKED at all 5.
- s3.me-central-1.amazonaws.com (AWS UAE region): BLOCKED at all 5. uaenorth.management.azure.com (Azure UAE North management endpoint): BLOCKED at all 5. azurewebsites.net: no rows returned.
- Control hosts: www.bureauveritas.com OK at all 5; www.sgs.com BLOCKED at all 5 (sgs.com is served by Akamai; this looks like a false positive or Akamai edge behaviour rather than censorship — inference).
— https://www.chinafirewalltest.com/?siteurl=ticqc.ae and the same URL pattern per host, 2026-10-21.

Tool B: GreatFire (https://en.greatfire.org/https/<host>), per-host pages fetched 2026-10-21; each page states the last-test date:
- fonts.googleapis.com: "As of the last test on 2026-10-15, https://fonts.googleapis.com is not blocked in mainland China".
- www.googletagmanager.com: "As of the last test on 2026-10-04 ... is not blocked".
- www.google-analytics.com: "As of the last test on 2026-07-24 ... is 100% blocked".
- www.youtube.com: "As of the last test on 2026-10-20 ... is 100% blocked".
- wa.me: "As of the last test on 2026-10-09 ... is 100% blocked".
- cdnjs.cloudflare.com: "As of the last test on 2026-09-27 ... is not blocked". cdn.jsdelivr.net: "2026-10-16 ... not blocked". challenges.cloudflare.com: "2026-10-08 ... not blocked".
- ticqc.ae: no measurement data on GreatFire.
— https://en.greatfire.org/https/fonts.googleapis.com and sibling URLs, 2026-10-21.

Tools that could not be used:
- websitepulse.com China Firewall Test: the form posts to results.php with location IDs 18/32/27/15 (labels not in the HTML); a scripted POST returned a page with no result rows. — https://www.websitepulse.com/tools/china-firewall-test, 2026-10-21.
- comparitech "Blocked in China": the page calls WordPress admin-ajax with action `comparitech_blockedinchina`; a direct call returned HTTP 403. — https://www.comparitech.com/privacy-security-tools/blockedinchina/, 2026-10-21.
- GreatFire Analyzer (https://en.greatfire.org/analyzer) is a JavaScript form; the per-host pages above were used instead. Dotcom-Tools was not attempted.

Vendor statements relevant to the same hosts:
- Cloudflare: "Turnstile is not supported in Mainland China" and "Pages is not available in Mainland China due to pages.dev certificate not residing within Mainland China". — https://developers.cloudflare.com/china-network/faq/ (WebFetch, 2026-10-22).
- Current ticqc.ae dependencies (GTM, Google Fonts through Elementor, reCAPTCHA/hCaptcha/Turnstile allowed by header, GTranslate) are listed in `ticqc-current-site-audit.md` section 5.

### Inferences
- A rebuilt site that keeps Google Tag Manager, Google Fonts, Google Maps and reCAPTCHA will render for Chinese exporters only partially and slowly (fonts and scripts time out), and the contact form will fail if it depends on reCAPTCHA. hCaptcha or Cloudflare Turnstile resolve from the mainland on the tester, but Cloudflare itself says Turnstile is unsupported there, so hCaptcha or a server-side anti-spam measure is the safer choice.
- Self-host fonts and scripts, use a non-Google map (a static map image or Baidu/Amap embed on the China office page), avoid YouTube embeds (link out or host video elsewhere), and do not rely on LinkedIn widgets or WhatsApp links for Chinese visitors.
- Hosting: ticqc.ae behind Cloudflare resolved and responded from all five mainland locations on the day; Vercel and Cloudflare Pages default domains did not. A custom domain on either platform may behave differently from the default domain (not tested), so the deployment platform should be re-tested with the production hostname before launch.
- The AWS me-central-1 and Azure UAE North endpoints tested are API/storage hostnames, not a website; the result shows that UAE-region cloud endpoints are not automatically reachable from China, which matters if the site or its forms call those regions directly from the browser.

### Gaps
- Results vary by tool and by day (Google Fonts and Tag Manager differ between the two tools). Neither tool documents its method; neither tests page rendering. A paid multi-city test (Dotcom-Tools, Uptrends or a colleague in Guangzhou on China Mobile/China Telecom/China Unicom) should be run on the staging site before launch.
- wa.me returned a status from only one location; WeChat and other Chinese hosts were not tested (they are reachable by definition).
- The real production hostname on the chosen platform was not tested (the site does not exist yet).

---

## Key Question 6: What foreign TIC companies do for China

### Takeaway
Every major with a Chinese site serves it from a `.cn` or `.com.cn` domain with a visible MIIT ICP filing and a public-security (公安) filing number in the footer, Chinese hotlines (400 numbers), Baidu Tongji analytics instead of Google, WeChat official-account entry points, and no Google-hosted dependencies; most host inside the mainland (AWS cn-north-1, Alibaba Cloud) or on a China-licensed CDN. None of them put Iraq or Egypt CoC content on the Chinese home page; the Chinese-language Middle East material found is PDFs (TÜV Rheinland's ICIGI leaflet dated 2025-03-04, SGS's SASO datasheets) and a 2019 Intertek article.

### Cited Findings
- Bureau Veritas China (https://www.bureauveritas.cn/), 2026-10-21/22: `<html lang="zh-hans">`; footer "ICP备案号: 沪ICP备16001052号-7" and "网安备案号: 沪公网安备31010102008626号" linking to beian.miit.gov.cn and beian.gov.cn; `hreflang` zh-hans and en (https://www.bureauveritas.cn/en); language switch "中文 | En"; hotlines "大宗商品及工业与设施服务 +86 4009201828", "船级社服务 +86 (21) 23190003", "消费品服务 +86 (21) 24081888"; "CONNECT WITH US" lists 微信公众号 (WeChat official account), 视频号 (Channels) and 小红书 (Xiaohongshu) with a WeChat icon image; "在线服务申请" and "联系我们" go to app-u.jingsocial.com (JingSocial CRM); analytics hm.baidu.com (Baidu Tongji); no Google, LinkedIn or YouTube references; www.bureauveritas.cn resolves to 52.81.116.74, "AWS EC2 (cn-north-1)", Beijing. Navigation has "政府服务" (government services) and "政府符合性认证" but the export examples are for Australia/New Zealand; no 伊拉克 (Iraq), 埃及 (Egypt) or 中东 (Middle East) on the home page. — curl, ip-api.com and WebFetch.
- SGS China (https://www.sgsgroup.com.cn/ redirects to /zh-cn), 2026-10-21: `<html lang="zh-cn">`; footer "京ICP备16004943号-2" and 公安 record 11010802022834; imgix image CDN at imgix-prod.sgsgroup.com.cn; Coveo search (platform-eu.cloud.coveo.com); links to Weibo, LinkedIn, YouTube, Facebook, Twitter, Instagram; www.sgsgroup.com.cn resolved to 43.159.104.214 (Aceville Pte, Singapore) from this location (edge node; the ICP filing implies a mainland access provider, so the resolved node may be a CDN edge for non-China visitors — inference). A guessed Iraq page (/zh-cn/connectivity-and-products/product-conformity-assessment/iraq) returned 404; Chinese SASO/Saber material exists as PDFs on sgsonline.com.cn, e.g. https://www.sgsonline.com.cn/static/upload/2020/05/26/sgs%20出口沙特阿拉伯一站式产品符合性评定解决方案.pdf (2020). — curl, ip-api and WebSearch.
- TÜV SÜD China (https://www.tuvsud.cn/), 2026-10-21: `<html lang="zh-cn">`; footer "苏ICP备17017024号-2" and 公安 32020502000683; hreflang for 20+ country-language variants; OneTrust (cdn.cookielaw.org); Baidu Tongji; references to an azurewebsites.net media host and madc.tuvsud.com; www.tuvsud.cn resolved to 61.110.221.193 (CDNetworks, reported in Paris from here). — curl and ip-api.
- Intertek China (https://www.intertek.com.cn/), 2026-10-21/22: `<html lang="zh-CN">`; footer "粤ICP备08001533号" and 公安 44030002010100; a WeChat QR image (/images//wechat-img2.png) and WeChat OAuth configuration in the page scripts; Baidu Tongji; certificate lookup host certs.intertek.com.cn; careers via 51job; jQuery from code.jquery.com; resolves to 223.5.179.153 (Aliyun, Hangzhou). A news article dated 6 November 2019, "Intertek可提供中东市场合规测试及认证服务" (https://intertek.com.cn/newslisten/27175.html), lists 14 Middle East countries including Iraq and Egypt, gives Saudi SASO/GSO standards for toys and furniture, and offers hotline 400 886 9926, service.china@intertek.com and a "咨询留言" form; no Iraq- or Egypt-specific steps. — curl, ip-api and WebFetch.
- Cotecna China (https://www.cotecna.com.cn/), 2026-10-21/22: `<html lang="zh-CN">`; footer "沪ICP备2023006624号-5" and "沪公网安备31011502403106号"; "总机 +86 21 6867 2300", "中国热线 400-600-5105", services@cotecna.com.cn, Shanghai address; CN/EN toggle; navigation links "符合性评定（VOC）", "Cotecna埃及" (to https://www.exports-to-egypt.com/), "Cotecna尼日利亚", "Cotecna中东" (to https://middle-east.cotecna.com/en); uses both Google Tag Manager and Baidu Tongji; resolves to 8.153.14.210 (Alibaba Cloud, Shanghai). No WeChat or QQ listed on the home page. — curl, ip-api and WebFetch.
- CCIC (https://www.ccic.com/), 2026-10-21: `<html lang="en">` with Chinese content (13,540 CJK characters); no ICP string found in the HTML (possibly in an image); only external link is sasac.gov.cn; resolves to a China Telecom IPv6 address in Beijing. — curl and ip-api.
- QIMA China (https://www.qima.cn/), 2026-10-21/22: `<html lang="zh" dir="ltr">`; footer "粤ICP备18048722号" and "粤公安网备 44030302002303号"; yet www.qima.cn resolves to 65.9.9.49 (AWS CloudFront, reported in Istanbul from here) and the page loads fonts.googleapis.com and Google Tag Manager and includes WhatsApp links and a WeChat icon. — curl and ip-api.
- TÜV Rheinland China: https://www.tuv.com/china/zh/, /china/cn/, /greater-china/zh/, /greater_china/cn/ and /greater_china/zh/ all return 404 (the Chinese site location was not found); Chinese Iraq material exists as PDFs: "伊拉克认证.pdf" under https://www.tuv.com/content-media-files/greater-china/pdfs/1012-tuv-rheinland-approvals-for-the-middle-east/ (one A4 page, SimHei font, content not extractable) and "2025-03-04 伊拉克货物进口前检验、测试与认证计划（ICIGI）.pdf" at https://media.go.tuv.com/Web/TUVRheinlandAG/{6e5be21e-102b-40f6-9031-4f9d1779bc1d}_2025-03-04_伊拉克货物进口前检验、测试与认证计划（ICIGI）.pdf. — curl, WebFetch and WebSearch.
- Applus+ publishes a Chinese Iraq CoC service sheet at https://appluslaboratories-test.applus.solutions/cn/zh/what-we-do/service-sheet/iraq-certificate-of-conformity (fetch failed with ECONNRESET; title from search). — WebSearch, 2026-10-21.
- HQTS: hqts.com lists `hreflang="zh-hans"` among ten languages; https://www.hqts.com/zh/ returns 404 and https://cn.hqts.com/ and https://www.hqts.com.cn/ did not respond. HQTS was "Awarded Iraq Quality Certificate" (COSQC authorisation) per Iraq Business News, 23 Dec 2019 (https://www.iraq-businessnews.com/2019/12/23/hqts-awarded-iraq-quality-certificate/). — curl and WebSearch.
- Sunchine: the official site is https://www.sunchineinspection.com/ (English, `lang="en-US"`; IAS accreditation certificate AA-886 names it, https://www.iasonline.org/wp-content/uploads/2025/06/AA-886-Cert-New.pdf); www.sunchine.cn and www.sunchineconsulting.com did not resolve. — curl and WebSearch, 2026-10-21/22.

### Inferences
- The pattern for a credible Chinese presence among foreign TICs is: separate Chinese site or sub-site with ICP and 公安 numbers in the footer, mainland or China-licensed hosting, Baidu Tongji, 400 hotline, WeChat official account QR, and Chinese-language PDFs for Middle East schemes. Contact routes are hotline, email and web form; QQ was not seen on any home page; WeChat was explicit on BV, Intertek and QIMA.
- QIMA shows the low-cost alternative: a `.cn` domain served from a global CDN with ICP numbers displayed but Google dependencies left in place. Given KQ5, that site will degrade in the mainland (inference), but it demonstrates that displaying ICP numbers while hosting overseas is done in practice.
- Chinese exporters looking for Iraq/Egypt CoC guidance currently find PDFs and generic articles, not structured Chinese web pages; a Chinese HTML guide for Iraq ICIGI and Egypt GOEIC with a Guangzhou WeChat contact would be differentiated.

### Gaps
- Baidu indexing of these sites was not measured (Baidu search could not be queried from this environment).
- Whether SGS China and TÜV SÜD China are physically hosted in the mainland could not be confirmed (edge nodes resolved from outside China).
- The Chinese ICIGI PDFs from TÜV Rheinland could not be read (compressed PDF streams), so what they tell Chinese exporters is unverified.

---

## Key Question 7: Rules and options (ICP, CDNs, WeChat, Baidu), with legal requirements separated from vendor recommendations

### Takeaway
Legally, an MIIT ICP filing (备案) is required only for websites whose domain resolves to servers in the Chinese mainland (and for mainland CDN acceleration); a site served from Hong Kong, Singapore or Dubai needs none, although Alibaba Cloud's help says a public-security filing still applies to its Hong Kong-hosted sites. Cloudflare's China Network requires an Enterprise plan, a separate China Network subscription, an ICP per apex domain, the ICP number in the footer and JD Cloud content vetting; Turnstile and Pages are not available in the mainland. A WeChat Official Account can be opened by an overseas company as a Service Account for USD 99 a year (vendor figures; Tencent's own page shows no text), and Baidu Webmaster Tools verification is by file or HTML tag, with vendors reporting that account registration needs a Chinese mobile number.

### Cited Findings

Legal requirements (official vendor documentation of the rule):
- Alibaba Cloud ICP product page: China "has a filing system for non-operational Internet information services" and "a licensing system for operational Internet information services"; filing is required for "websites whose domain names are resolved to servers that are located in the Chinese mainland"; enterprises outside the mainland "must obtain required files, such as business licenses"; the GoChina ICP Filing Assistant offers "consultation and delivery for small and medium-sized enterprises outside the Chinese mainland" with no fee listed. — https://www.alibabacloud.com/product/icp-filing (WebFetch, 2026-10-22).
- Alibaba Cloud ICP FAQ: "ICP filing applies only to servers located in the Chinese mainland"; "Alibaba Cloud International site does not support ICP filing" (a China-site account is needed and the system is Chinese-only); mainland-hosted domains without a filing are blocked ("the Alibaba Cloud monitoring system blocks access to the domain name"). — https://www.alibabacloud.com/help/en/icp-filing/faq-about-icp-filing-applications-in-different-scenarios/ (WebFetch, 2026-10-21).
- Alibaba Cloud server-check guide: "If your cloud resources are in nodes in regions such as China (Hong Kong) or other locations outside the Chinese mainland, an ICP filing is not required"; for CDN, "you must apply for an ICP filing when you use Alibaba Cloud CDN to distribute content" in the mainland and "The domain name must have an ICP number from the Ministry of Industry and Information Technology (MIIT)". — https://help.aliyun.com/en/icp-filing/basic-icp-service/user-guide/icp-filing-server-access-information-check (WebFetch, 2026-10-22).
- Alibaba Cloud (search snippets, 2026-10-21): sites on Hong Kong/overseas servers "must still complete a Public Security filing", and binding an ICP-filed domain to a Hong Kong or overseas node may cause the ICP filing to be revoked. — https://help.aliyun.com/en/icp-filing/basic-icp-service/product-overview/faq-about-icp-filing-applications-in-different-scenarios and https://www.alibabacloud.com/help/en/icp-filing/use-alibaba-cloud-cdn/ (snippets; the PSB statement was not found on the pages fetched, so treat it as unverified).
- Tencent Cloud CDN: an ICP filing is needed when the acceleration region is "Chinese mainland" or "Global"; "If you select the Outside Chinese mainland option, an ICP filing is not required"; mainland/global also require a real-name-verified account; domains resolved directly to Tencent Cloud China resources without a filing "will be blocked by Tencent Cloud China". — https://tencentcloud.com/document/product/228/32981 and https://intl.cloud.tencent.com/document/product/228/32978 (search snippets, 2026-10-21).
- Cloudflare China Network: requires an Enterprise plan, the "Cloudflare China Network package (a separate subscription)", acceptance of the China Service Supplemental Terms, an ICP filing or licence for each apex domain, display of the ICP number in the page footer, and JD Cloud content vetting (company name, domain, ICP number, content description, signed self-attestation); first enablement takes 24-48 hours; "neither Cloudflare nor JD Cloud is responsible for ICP applications"; without an ICP "JD Cloud may terminate or suspend your access to the China Service" and "Cloudflare will reroute the traffic for the affected domains to the nearest data centers outside of China"; "As a US company, Cloudflare does not have a license from China's Ministry of Industry and Information Technology (MIIT)" while "JD Cloud has all the licenses required by the MIIT"; no pricing published ("contact your sales team"). — https://developers.cloudflare.com/china-network/get-started/ and https://developers.cloudflare.com/china-network/faq/ (WebFetch, 2026-10-21/22).

Vendor recommendations and vendor-reported practice:
- WeChat Official Account for an overseas entity (AppInChina guide, "Last Updated on Jul 7, 2026"): "non-Mainland China regions currently only support applying for enterprise-type Service Accounts"; documents: company name, business licence or registration certificate, registration number, admin name and ID, admin mobile, email, supporting materials; verification fee "Mainland China entities: CNY 300 per year", "Overseas entities: USD 99 per year, paid by international credit card"; functions "may remain limited until verification is fully completed". — https://appinchina.co/blog/how-to-open-a-wechat-official-account-step-by-step-guide/ (WebFetch, 2026-10-22). Other vendor guides give 5-10 business days or 2-4 weeks for overseas approval and say unverified accounts may be cancelled after 30 days. — https://walkthechat.com/wechat-official-account-simple-guide/, https://daxueconsulting.com/wechat-official-account, https://sleekflow.io/blog/setup-guide-wechat-official-accounts (search snippets, 2026-10-21). Tencent's own registration page https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl&lang=en_US returned only navigation and a "Copyright © 2012-2026 Tencent" footer to WebFetch (2026-10-22), so the fee and entity rules are vendor-reported, not confirmed from Tencent.
- Baidu Webmaster Tools (百度搜索资源平台), official manual last updated 2020-08-14: two verification methods, "文件验证、html标签验证" (file upload to the site root, or an HTML tag in the home page head); the manual does not state registration or ICP requirements. — https://ziyuan.baidu.com/college/documentinfo?id=267 (WebFetch, 2026-10-22). Vendor claims: Chinafy says registering a Baidu account requires a Chinese phone number and that "as of May 2022, Baidu is no longer accepting overseas phone numbers"; Yoast says registration "may be slightly more complicated with an international" number; a Moz thread reports a foreign company verified its site with help from a freelancer in China; vendors claim sites with an ICP record "are ranked higher than those without one". — https://chinafy.com/blog/how-to-set-up-your-baidu-webmaster-account-in-2024, https://yoast.com/help/add-website-baidu-webmaster-tools/, https://mozprod.nodebb.com/community/q/post/334439, https://we-interactive.com/insights/how-to-get-on-baidu-search-results-the-2026-china-seo-strategy (search snippets, 2026-10-21).
- Chinafy (a competitor to Cloudflare China) states that onshore hosting needs an ICP licence and an onshore business. — https://www.chinafy.com/blog/cloudflare-china-cdn-vs-chinafy---which-is-best-for-you (search snippet, 2026-10-21; vendor marketing).
- Baidu Maps Open Platform: no official page on overseas-enterprise developer verification was found; a January 2026 article says the platform serves about 4 million developers and has a "全球化2.0战略". — https://m.tech.china.com/redian/2026/0117/012026_1798732.html (search snippet, 2026-10-22).

Costs as quoted:
- WeChat verification: CNY 300/year (mainland entity) or USD 99/year (overseas entity) — AppInChina, vendor figure.
- Cloudflare China Network: no public price; Enterprise plan plus separate China Network subscription — Cloudflare docs.
- Alibaba Cloud GoChina ICP assistant: no price shown ("Free Consultation", "Buy Now") — Alibaba Cloud product page.
- Tencent/Alibaba CDN: usage-priced; not captured here.

### Inferences
- Option 1 (no ICP): host the single global site outside the mainland (Cloudflare global/Hong Kong or Singapore edge, Dubai origin), strip Google dependencies, self-host fonts and scripts, offer WeChat and a China phone line on the Guangzhou page. Legal obligation: none under MIIT ICP rules (official Alibaba/Tencent statements). Performance from the mainland will be variable (inference from KQ5 and from Cloudflare's statement that non-China traffic is routed to data centres outside China).
- Option 2 (ICP via the Guangzhou entity): if TIC's Guangzhou branch is a registered mainland entity with a business licence, it can hold an ICP filing for a dedicated domain (for example ticqc.cn or a china subdomain) and host that Chinese sub-site on Alibaba Cloud or Tencent Cloud in the mainland, or onboard it to Cloudflare China Network (Enterprise). The ICP number must be shown in the footer; the ICP domain must not be pointed at overseas servers. This is what BV, SGS, TÜV SÜD, Intertek and Cotecna do.
- WeChat Official Account: register as a Service Account under the overseas (UAE) entity if the Guangzhou branch cannot register as a mainland entity; budget USD 99/year plus content operation. Confirm with Tencent's registration flow, since vendor guides conflict on payment method and admin ID rules.
- Whichever option is chosen, legal review of the Guangzhou entity's registration status and of Chinese content rules is required before filing; vendor "ICP agents" are a recommendation, not a requirement.

### Gaps
- No official Tencent page on overseas Official Account registration could be read; fees and rules are vendor-reported.
- Baidu account registration requirements for a foreign company and Baidu Maps developer verification for overseas entities are unconfirmed by official pages.
- Public-security (公安) filing obligations for Hong Kong-hosted sites rest on search snippets of Alibaba help pages that were not fetched directly.
- Cloudflare China Network pricing and Alibaba/Tencent CDN pricing were not obtained.

---

## Key Question 8: Other office languages (Portuguese, Thai, Malay, Urdu, Sinhala)

### Takeaway
Portuguese (Brazil) and Thai are offered as full local sites by both Bureau Veritas and SGS; Malay, Urdu and Sinhala are not: Malaysia, Pakistan and Sri Lanka are served in English by BV, SGS and Intertek. So for TIC, Portuguese and Thai are optional local-language investments and English is the norm for Malaysia, Pakistan and Sri Lanka.

### Cited Findings
- Bureau Veritas Brazil: https://www.bureauveritas.com.br/ redirects to /pt-br, `<html lang="pt-br">`, hreflang en, es and pt-br; Drupal 11 behind Varnish/CloudFront. — curl, 2026-10-21.
- SGS Brazil: https://www.sgs.com/pt-br exists, `<html lang="pt-br">`, title "SGS Brazil | Somos a empresa líder mundial em testes, inspeção e certificação." — curl, 2026-10-21.
- Bureau Veritas Thailand: https://www.bureauveritas.co.th/ serves Thai by default, `<html lang="th">`, hreflang en and th. — curl, 2026-10-21.
- SGS Thailand: https://www.sgs.com/th-th exists (`lang="th-th"`, Thai title) alongside https://www.sgs.com/en-th. — curl, 2026-10-22.
- Bureau Veritas Malaysia: https://www.bureauveritas.my/ redirects to https://south-east-asia.bureauveritas.com/bureau-veritas-south-east-asia/bureau-veritas-malaysia, English only (`hreflang="en"`). — curl, 2026-10-21.
- SGS Malaysia: https://www.sgs.com/en-my exists; https://www.sgs.com/ms-my returns 404. — curl, 2026-10-22.
- Pakistan: https://www.sgs.com/en-pk exists (`lang="en-pk"`); https://www.sgs.com/ur-pk returns 404; https://www.intertek.com/pakistan/ is English; https://www.bureauveritas.pk/ redirects to the English Middle East site. — curl, 2026-10-21/22.
- Sri Lanka: https://www.sgs.com/en-lk exists (`lang="en-lk"`); https://www.bureauveritas.lk/ is English (`hreflang="en"` only). No Sinhala pages found. — curl, 2026-10-21/22.
- V-Trust, a China-based inspection firm with Thailand and Pakistan branches, offers ar, de, en, es, fr, ja, ko, pt, ru but no Thai, Malay or Urdu. — curl hreflang list, 2026-10-21.

### Inferences
- Language priority after English: Arabic (importers/regulators), Simplified Chinese (largest exporter base), then Portuguese only if the São Paulo office generates inbound demand, then Thai; Malay, Urdu and Sinhala can be left to English without departing from industry practice.
- Country pages (office finder) can carry local address formats and phone numbers without a local-language site.

### Gaps
- Intertek Brazil/Thailand and TÜV SÜD Thailand/Malaysia language choices were not checked.

---

## Summary tables

### Arabic benchmark (observed 2026-10-21/22)

| Site | Arabic completeness | Switch label and placement | `html dir`/`lang` | Arabic typeface loaded | Digits | Forms/consent in Arabic |
|---|---|---|---|---|---|---|
| TÜV Rheinland UAE (tuv.com/united-arab-emirates/ar/) | Partial subset; "Translation missing" string; English footer lists and legal links | "AR" + flag, header; no hreflang | lang="ar", no dir (body computed ltr) | None (Univers LT, Roboto, Calibri) | Western in body; "٢٠٢٦" in copyright | Search/newsletter Arabic; Cookiebot dialog English |
| QIMA (qima.ae) | Near-full mirror; some English leftovers ("Portuguese", "GMO Auditing Life Sciences") | Dropdown of native names, header; hreflang 7 langs, no x-default; separate domains | lang="ar" dir="rtl" | None (Inter, Figtree, gothamRounded) | Western only | One Arabic form placeholder; consent not seen |
| HQTS (ar.hqts.com) | Full site translated; no Iraq/Egypt pages; mislabelled footer links | "العربية" + flag, last nav item, dropdown (names in English) | lang="ar" dir="rtl" | None (Roboto, Open Sans, Arial) | Western only | Placeholders Arabic, labels English; cookie banner English; chatbot Arabic |
| Pro QC (proqc.ae) | Full page translated; mixed strings with FAI/8D/CAPA; English blog | "اللغة" dropdown, native names, separate domains; no hreflang | lang="en-US", no dir (body rtl via CSS) | None (tt-commons-pro, Work Sans) | Western only; phones LTR with + prefix | Placeholders Arabic; captcha numeric; cookie panel English |
| V-Trust (v-trust.com/ar/) | Full site; typos; 4 branch names and blog in English | "Ar" dropdown, native names; hreflang 9 langs + x-default | lang="ar" dir="rtl" | None (Open Sans) | Western only | No forms on home; booking on external portal |
| Gulftic (gulftic.com/ar/) | Not assessable (JS shell, lang="en") | n/a | lang="en" | n/a | n/a | n/a |
| SGS / Intertek / Cotecna / BV (Egypt, KSA) | No Arabic web pages (404s); BV Arabic PDF for Iraq exporters | n/a | n/a | n/a | n/a | n/a |
| SFDA (sfda.gov.sa/ar) | Full, Arabic default, English mirror | "English" dropdown item; hreflang en | lang="ar" dir="rtl" | IBM Plex Sans Arabic (self-hosted) | Western only; Hijri date | Arabic |
| COSQC (cosqc.gov.iq) | Arabic only, "under construction" | bare "En" link | lang="en"; 24 inline dir="RTL" | Cairo (Google Fonts) + Calibri/Arial | Western | No forms |
| GOEIC (goeic.gov.eg/ar) | Arabic default; AR/EN/FR | `<select>` AR/EN/FR | lang="ar", no dir on html | Not declared | 33 Arabic-Indic + Western | Arabic |
| MoIAT (moiat.gov.ae/ar/) | Full | not captured; no hreflang | lang="ar" dir="rtl" | Not captured | Mostly Western (8 Arabic-Indic) | Arabic |
| Emirates NBD (/ar) | Full; a few English leaks and template tokens | "English / عربى" header, "EN" mobile; hreflang ar/en; separate country selector | lang="ar" dir="rtl" | Tajawal (Google Fonts) + Dubai declared | Western | Arabic consent and forms |
| Dubai Chamber (dubaichambercommerce.com/ar/) | Full | hreflang ar-SA/en-US/x-default | lang="ar-SA" dir="rtl" | Tajawal + Dubai | not captured | not captured |

### China reachability (host x reachable x tool x date)

| Host | chinafirewalltest.com (5 mainland locations), 2026-10-21 | GreatFire (date of last test) |
|---|---|---|
| ticqc.ae | Reachable (5/5 OK) | No data |
| fonts.googleapis.com | Not reachable (5/5 BLOCKED) | Not blocked (2026-10-15) — conflict |
| fonts.gstatic.com | Not reachable (5/5) | not checked |
| www.googletagmanager.com | Not reachable (5/5) | Not blocked (2026-10-04) — conflict |
| www.google-analytics.com | Not reachable (5/5) | 100% blocked (2026-07-24) |
| maps.googleapis.com | Not reachable (5/5) | not checked |
| www.recaptcha.net | Not reachable (5/5) | not checked |
| www.google.com | Reachable (5/5) — anomaly, treat as tool limitation | not checked |
| challenges.cloudflare.com (Turnstile) | Reachable (5/5); Cloudflare says Turnstile unsupported in mainland | Not blocked (2026-10-08) |
| hcaptcha.com | Reachable (5/5) | not checked |
| www.youtube.com | Not reachable (5/5) | 100% blocked (2026-10-20) |
| cdnjs.cloudflare.com | Reachable (5/5) | Not blocked (2026-09-27) |
| cdn.jsdelivr.net | Reachable (5/5) | Not blocked (2026-10-16) |
| unpkg.com | Reachable (5/5) | not checked |
| platform.linkedin.com / www.linkedin.com | Not reachable (5/5 each) | not checked |
| wa.me | Not reachable (Beijing; other rows empty) | 100% blocked (2026-10-09) |
| vercel.app / vercel.com | Not reachable (5/5 each) | not checked |
| pages.dev | Not reachable (5/5); Cloudflare says Pages not available in mainland | not checked |
| s3.me-central-1.amazonaws.com | Not reachable (5/5) | not checked |
| uaenorth.management.azure.com | Not reachable (5/5) | not checked |
| azurewebsites.net | No result | not checked |
| www.bureauveritas.com (control) | Reachable (5/5) | not checked |
| www.sgs.com (control) | Not reachable (5/5) — likely false positive | not checked |

Tool limitations: neither tool publishes its method; chinafirewalltest.com reported www.google.com as reachable and www.sgs.com as blocked, so it appears to test connectivity rather than page delivery and can misclassify CDN-fronted hosts; GreatFire has no data for ticqc.ae; websitepulse and comparitech could not be scripted; results vary by day and by carrier.

---

## Questions only the Guangzhou, Baghdad, Cairo, Amman and Riyadh offices can answer

Guangzhou:
1. Is the Guangzhou office a registered mainland entity with its own business licence (needed to hold an ICP filing and a mainland WeChat Official Account), or a representative office?
2. Which channels do Chinese exporter clients use to reach the office today (WeChat personal, WeChat Official Account, QQ, 400 hotline, email, Alibaba/1688 messaging), in what proportion?
3. Does TIC already have a WeChat Official Account, mini-program or Enterprise WeChat? Who administers it?
4. Which pages do Chinese clients ask for in Chinese (Iraq ICIGI steps, Egypt GOEIC steps, Saudi Saber, document checklists, RfC form, certificate verification, pricing)? Do they currently receive PDFs by WeChat instead?
5. Do clients report that ticqc.ae fails to load or loads slowly inside China, and on which carrier?
6. Is a Chinese-language certificate verification lookup requested by Chinese forwarders or customs brokers?

Baghdad:
7. Do Iraqi importers, customs brokers and border officials look at the website at all, or only at the certificate PDF and phone/WhatsApp/Telegram? Which messaging app dominates (WhatsApp, Telegram, Viber)?
8. What Arabic terms does COSQC use officially for ICIGI, CoC and the destination check, and should the site use them verbatim?
9. Does COSQC or Iraqi customs verify certificates online today, and do they expect TIC to offer an Arabic verification page?
10. Are there Kurdistan-specific requirements (Erbil/Sulaymaniyah) that need a separate Arabic or Kurdish note?

Cairo:
11. Do GOEIC officers or Egyptian importers ever contact TIC through the website, and in which language? Which pages are requested in Arabic (whitelist route, 45-day validity, document list, complaints)?
12. Is a local Egyptian phone line or WhatsApp number shown on the site today, and should the Arabic office page list it with an Egyptian address format?

Amman:
13. Which TIC services are sold from Amman and to whom (Jordanian importers, Iraqi trade via Aqaba, Saudi)? Do clients expect Arabic first or English first?
14. Can the Amman office act as the Arabic editorial reviewer for the site (terminology, tone)?

Riyadh:
15. Which SASO/Saber- or SFDA-related services does Riyadh offer, and do clients arrive from saber.sa or sfda.gov.sa expecting Arabic?
16. Do Saudi procurement officers ask for Arabic prequalification documents (accreditation scope, impartiality policy) or English?

All five:
17. Who in each office can review Arabic/Chinese pages before publication, and how many hours a month can they give?
18. Which phone number format and messaging app should appear on each office's contact card?

---

## URLs visited (status as observed; dates 2026-10-21 unless marked 10-22)

Arabic TIC and regulators:
- https://www.tuv.com/united-arab-emirates/ar/ — 200 (curl; rendered 10-22, screenshot)
- https://www.tuv.com/united-arab-emirates/en/ — 200
- https://www.qima.ae/ — 200 (rendered 10-22)
- https://www.qima.com/ar — 200, redirects to https://www.qima.ae/
- https://www.hqts.com/ar/ — 200, redirects to https://ar.hqts.com/ (rendered 10-22, screenshot; WebFetch 10-22)
- https://www.hqts.com/zh/ — 404
- https://cn.hqts.com/ and https://www.hqts.com.cn/ — no response
- https://www.proqc.ae/ — 200, redirects to https://proqc.ae/ (rendered 10-22; WebFetch 10-22)
- https://www.v-trust.com/ — 200, redirects to /en/
- https://www.v-trust.com/ar/ — 200 (rendered 10-22; WebFetch 10-22)
- https://gulftic.com/ and https://gulftic.com/ar/ — 200, 1 KB JS shell
- https://www.bureauveritas.com.eg/ar, https://www.bureauveritas.com.sa/ar, https://www.bureauveritas.ae/, https://www.bureauveritas.eg/, https://www.bureauveritas.sa/ — no connection (000)
- https://www.bureauveritas.com/egypt and /middle-east — 404 on group.bureauveritas.com
- https://www.bureauveritas.pk/ — 200, redirects to https://middle-east.bureauveritas.com/
- https://verigates.bureauveritas.com/government-services-international-trade/iraq — 404; https://verigates.bureauveritas.com/node/664 — 200 (WebFetch 10-22)
- https://www.sgs.com/ar, /ar-eg, /ar-sa — 404; https://www.sgs.com/en-eg, /en-sa — 200
- https://www.intertek.com/saudi-arabia/ — 200 (redirects to home); /saudi-arabia/ar/, /ar-sa/, /egypt/ — 404
- https://www.cotecna.com/ar, /zh, /en/our-offices/egypt, /en/countries/egypt — 404
- https://saber.sa/, https://saber.sa/home, https://www.saber.sa/ — connection timed out (curl); WebFetch ECONNREFUSED (10-22)
- https://www.sfda.gov.sa/ar — 200 (rendered 10-22, screenshot)
- https://cosqc.gov.iq/ — 200
- https://www.goeic.gov.eg/ — 200, redirects to /ar
- https://moiat.gov.ae/ar/ — 200
- https://www.w3.org/TR/alreq/ — 200 (WebFetch)
- https://m2.material.io/design/usability/bidirectionality.html — title only (10-22)
- https://fonts.google.com/specimen/Cairo/about — title only (10-22)
- https://lingo.ae/how-much-does-a-translation-agency-charge/ — 200 (WebFetch 10-22)
- https://www.storyblok.com/cl/rtl-support — 404 (10-22)

Reference bilingual sites:
- https://www.emiratesnbd.com/ar — 200 (rendered 10-22, screenshot)
- https://www.dubaichamber.com/ar/ — redirects to https://www.dubaichambercommerce.com/en/; https://www.dubaichambercommerce.com/ar/ — 200 (10-22)
- https://www.dpworld.com/ar, /ar-ae, /ar/home — 404 (10-21/22)
- https://www.aramco.com/ar, /ar-sa; https://www.etihad.com/ar-ae/ — no connection (000)

China:
- https://www.chinafirewalltest.com/?siteurl=<host> for 25 hosts — 200 each
- https://en.greatfire.org/https/<host> for 14 hosts — 200 each; https://en.greatfire.org/analyzer — 200 (JS form)
- https://www.websitepulse.com/tools/china-firewall-test — 200 (form; POST gave no rows)
- https://www.comparitech.com/privacy-security-tools/blockedinchina/ — 200 (ajax 403)
- https://www.bureauveritas.cn/ — 200 (WebFetch 10-22)
- https://www.sgsgroup.com.cn/ — 200 (redirects to /zh-cn); https://www.sgs.com.cn/ — no connection; https://www.sgsgroup.com.cn/zh-cn/connectivity-and-products/product-conformity-assessment/iraq — 404 (10-22)
- https://www.tuvsud.cn/ — 200
- https://www.intertek.com.cn/ — 200; https://intertek.com.cn/newslisten/27175.html — 200 (WebFetch 10-22)
- https://www.tuv.com/china/zh/, /china/cn/, /greater_china/cn/, /greater-china/zh/, /greater_china/zh/ — 404
- https://www.tuv.com/content-media-files/greater-china/pdfs/1012-tuv-rheinland-approvals-for-the-middle-east/伊拉克认证.pdf — 200 (PDF, text not extractable)
- https://www.cotecna.com.cn/ — 200 (WebFetch 10-22)
- https://www.ccic.com/ — 200
- https://www.sunchine.cn/, https://www.sunchineconsulting.com/ — no connection; https://www.sunchineinspection.com/ — 200 (10-22)
- https://www.qima.cn/ — 200
- https://appluslaboratories-test.applus.solutions/cn/zh/what-we-do/service-sheet/iraq-certificate-of-conformity — ECONNRESET (10-22)
- https://developers.cloudflare.com/china-network/get-started/ — 200 (WebFetch); https://developers.cloudflare.com/china-network/faq/ — 200 (WebFetch 10-22)
- https://www.alibabacloud.com/help/en/icp-filing/faq-about-icp-filing-applications-in-different-scenarios/ — 200 (WebFetch)
- https://help.aliyun.com/en/icp-filing/basic-icp-service/user-guide/icp-filing-server-access-information-check — 200 (WebFetch 10-22)
- https://intl.aliyun.com/product/icp-filing — 301 to https://www.alibabacloud.com/product/icp-filing — 200 (WebFetch 10-22)
- https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl&lang=en_US — 200, shell with no content (10-22)
- https://appinchina.co/blog/how-to-open-a-wechat-official-account-step-by-step-guide/ — 200 (WebFetch 10-22)
- https://ziyuan.baidu.com/college/documentinfo?id=267 — 200 (WebFetch 10-22)
- ip-api.com lookups for www.bureauveritas.cn, www.sgsgroup.com.cn, www.tuvsud.cn, www.intertek.com.cn, www.cotecna.com.cn, www.ccic.com, www.qima.cn, ticqc.ae, www.v-trust.com, ar.hqts.com — 200

Other languages:
- https://www.bureauveritas.com.br/ — 200 (/pt-br); https://www.sgs.com/pt-br — 200
- https://www.bureauveritas.co.th/ — 200 (Thai); https://www.sgs.com/th-th — 200; https://www.sgs.com/en-th — 200 (10-22)
- https://www.bureauveritas.my/ — 200 (redirect to south-east-asia.bureauveritas.com, English); https://www.sgs.com/en-my — 200; https://www.sgs.com/ms-my — 404 (10-22)
- https://www.sgs.com/en-pk — 200; https://www.sgs.com/ur-pk — 404; https://www.intertek.com/pakistan/ — 200 (10-22)
- https://www.sgs.com/en-lk — 200; https://www.bureauveritas.lk/ — 200 (10-22)

Web searches run (2026-10-21/22): Cloudflare China Network ICP; WeChat official account overseas cost (two queries); Alibaba Cloud ICP Hong Kong; Arabic technical translation rate UAE; Egypt/Jordan translation rates; Baidu webmaster foreign site; Tencent Cloud CDN ICP; Arabic Iraq CoC exporter guide (Arabic query); Bureau Veritas Egypt Arabic site; Chinese Iraq CoC pages (two Chinese queries); SGS China Middle East (Chinese query); Google Fonts Arabic guidance; CMS RTL (WPML/Storyblok/Sanity/Wagtail); WPML RTL; Storyblok RTL; Sunchine website; Saber Arabic guides (Arabic query); Baidu Maps overseas enterprise verification (Chinese query).
