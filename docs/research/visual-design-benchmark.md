# Visual design and performance benchmark: ticqc.ae vs 12 reference TIC websites (rendered)

Research date: 2026-10-21 (captures 20:37–21:05 UTC, i.e. 23:37–00:05 Dubai/Baghdad time; PageSpeed Insights runs finished at 00:02 on 2026-10-22).

This note does what the ten text-only notes could not: every site was rendered in a real Chrome engine, screenshotted at 1440 px (desktop) and 390 px (mobile), and measured with computed styles and Lighthouse. It is research and documentation only; nothing here proposes colours, fonts or layouts for TIC.

**How the evidence was gathered (plain language)**

- Screenshots and style readings: headless Chrome driven by a script (puppeteer-core 24.43.1 on the installed Google Chrome), desktop viewport 1440×900 with a normal Windows Chrome user agent, mobile viewport 390×844 with an iPhone user agent and touch enabled. For each page the script saved: `<name>-<mode>-firstview.png` (what a first-time visitor sees, cookie banner included), `<name>-<mode>.png` (after declining non-essential cookies where a decline button existed), `<name>-<mode>-full.png` (whole page), plus `-desktop-menu-click/hover.png` and `-mobile-menu-open.png` where a menu could be opened. Colours and fonts were read with `getComputedStyle` and from each site's CSS custom properties (`:root` variables) and `@font-face` rules; the variable names are quoted so anyone can re-check them in DevTools.
- Interactive checks that the script could not do reliably (hover vs click on SGS and TÜV SÜD mega-menus, the TÜV SÜD click panel) were repeated by hand in the Claude-in-Chrome extension and the count of visible links before/after was recorded.
- Performance, lab: Lighthouse 12.8.2 command line, one run per page, mobile preset (emulated Moto G, slow-4G throttling) and desktop preset, run from Iraq at 23:32–23:39 local time. Single runs vary by roughly ±5–10 points, so treat scores as bands, not exact values.
- Performance, lab + field: PageSpeed Insights web UI (Lighthouse 13.5.0 on Google's servers, same evening). PSI also reports Chrome UX Report (CrUX) *field* data, which is what real Chrome users experienced over the last 28 days. Where CrUX exists it is labelled "field"; everything else is "lab".
- Accessibility: Lighthouse accessibility category plus computed focus-outline reads, alt-text counts and contrast audit item counts.
- All screenshots: `screenshots/visual-design-benchmark/` (247 files, 174 MB). Paths below are relative to this note's folder.

**Lighthouse metrics in one sentence each**

- Performance score (0–100): a weighted summary of the loading metrics below; 90+ is "good", 50–89 "needs improvement", under 50 "poor".
- FCP (First Contentful Paint): how long until the first text or image appears.
- LCP (Largest Contentful Paint): how long until the main hero image or headline is fully shown; Google's "good" threshold is 2.5 s.
- TBT (Total Blocking Time): how long the page is frozen to taps and clicks while loading; a lab stand-in for INP.
- INP (Interaction to Next Paint, field only): how quickly the page reacts when a real user taps or clicks; "good" is under 200 ms.
- CLS (Cumulative Layout Shift): how much the page jumps around while loading; "good" is under 0.1.
- Speed Index: how quickly the visible part of the page fills in.
- Page weight / requests: total bytes downloaded and number of files fetched to show the page.

---

## 1. ticqc.ae as rendered today (home, Oil & Gas, Iraq CoC, Contact, footer; desktop and mobile)

### Takeaway
Rendered in a browser, ticqc.ae is a dark-header Elementor site whose brand kit was never configured: the Elementor "global" colours and fonts are still the plug-in's factory defaults, so the real red/charcoal palette is hard-coded widget by widget and six different font families are in use across four pages. Most of the defects the text audit listed look different on screen: the counters do animate to 200+/900+/10+/10,000+ (the "0+" was the pre-animation state), the cookie banner renders "Manage Consent" (the "{title}" placeholder is filled by JavaScript), and the "AdDresses" typo is hidden by CSS capitals but still present in the HTML. What a director sees is a 2024 stock-photo template with ALL-CAPS headings, a 12-image fading hero slideshow, a 9 MB homepage and a programme page (Iraq CoC) built in a completely different visual language from the rest of the site.

### Cited Findings

**Brand palette and typography (from the Elementor kit CSS and computed styles)**

- The Elementor global kit file is `https://ticqc.ae/wp-content/uploads/elementor/css/post-5.css` (1,429 bytes). It defines `--e-global-color-primary: #6EC1E4`, `--e-global-color-secondary: #54595F`, `--e-global-color-text: #7A7A7A`, `--e-global-color-accent: #61CE70`, `--e-global-typography-primary-font-family: "Roboto"` (600), `--e-global-typography-secondary-font-family: "Roboto Slab"` (400), `--e-global-typography-text-font-family: "Roboto"` (400), `--e-global-typography-accent-font-family: "Roboto"` (500) — downloaded with curl on 2026-10-21 and confirmed live via `document.styleSheets` in the browser. These four hex values and the Roboto/Roboto Slab pairing are Elementor's shipped defaults (inference, see below), and none of them appears in the visible design.
- The colours actually painted on screen (counted in the page CSS files post-10/61/71.css and confirmed by computed `backgroundColor`/`color`): charcoal `#252324` (rgb 37,35,36: fixed header, counters band, footer; 13 occurrences in CSS), red `#E42313` (rgb 228,35,19: section headings "ABOUT US"/"OUR INDUSTRIES", the "+" after counters, Contact-page red block, Iraq-page buttons; 11 occurrences), button red `#BC242C` (rgb 188,36,44: "More news" button; 4 occurrences), light grey `#F7F7F7` (8), plus single uses of `#C8102E`, `#028DDA`, `#019EDA`, `#FFBC7D`. The active menu link "Home" computes to rgb(204,51,102) (`#CC3366`, a pink-red that matches none of the above). Complianz cookie-banner accept button is `#1E73BE` blue (`--cmplz_button_accept_background_color`), i.e. a third colour family. — computed styles 2026-10-21; `screenshots/visual-design-benchmark/ticqc-home-desktop.png`, `ticqc-home-desktop-firstview.png`.
- Fonts loaded via `@font-face`: Roboto, Roboto Slab, Nunito (self-hosted Google fonts) and swiper-icons. Fonts actually used on visible text, by element count (desktop homepage): Roboto 21, Arial 19, Poppins 8, Inter 4, system `-apple-system` 4, Nunito 3. Homepage H1 "Expert Quality Control & Inspection Services" = Arial 82 px weight 600, white; H2s = Arial 29 px uppercase; paragraphs = Roboto 16 px / 24 px; `body` falls back to the system font stack. Iraq CoC page: H1 Poppins 56 px weight 800, H2 Poppins 48 px, paragraphs Inter 20 px / 34 px. Contact page: H1 "Contact" renders in the system font at 40 px weight 500 (no Elementor styling applied). Oil & Gas page: H1 is "Cargo Measurement & Quality Control" at Roboto 24 px uppercase (the big "OIL & GAS" box is not the H1). — computed styles via puppeteer, 2026-10-21.
- Logo: header image `wp-content/uploads/2024/06/Group-2.png` (213 px wide PNG) rendered at 127×90 px with empty `alt`; a second copy `cropped-Group-2.png` (512 px) carries alt "TIC Quality Control". The tagline under the mark ("Testing | Inspection | Certification") is part of the bitmap and reads at roughly 7 px on desktop. — `ticqc-home-desktop.png`.
- Uppercase headings: 20 of 23 visible H1–H3 on the homepage are rendered in capitals (CSS `text-transform` or typed caps); Oil & Gas 12 of 13; Contact 4 of 15; Iraq CoC 4 of 35. — computed styles.

**Homepage structure**

- Header: fixed, 110 px tall, charcoal `#252324`; 6 items (Home, About, Industries ▾, Services ▾, News & Media, Contact), a search icon, and a GTranslate flag "English ▾" in the top-right corner. Dropdowns open on click, not hover (visible links 35 before, 35 after hover, 40 after click); the Industries dropdown is a plain dark list of five links, no mega-menu. — `ticqc-home-desktop-menu-click.png`.
- Hero: Elementor background slideshow (`swiper swiper-fade`, 12 slides, auto-fading) of stock photographs (car engine inspection with clipboard, offshore platform, lettuce field, etc.), H1 82 px, no sub-headline, no button. The hero images are JPEGs from `uploads/2024/06/`, e.g. `10ef033ad935fe35baf1e392bfb8ad29-scaled.jpeg`; the largest single asset on the page is `3caa6c76c9690e255fdc6f0eabcf68d2.jpeg` at 3.6 MB (Lighthouse network audit). — `ticqc-home-desktop.png`, `ticqc-home-desktop-menu-click.png` (second slide).
- Counters: four animated counters "200+ Employees / 900+ Global Clients / 10+ Countries / Markets / 10,000+ Inspections & Projects Completed" on a black band under the hero. They count up from 0 after load (the extension caught them at 38+/171+/1+/1,908+ mid-animation; the headless capture shows the final values), so the "0+" recorded in the text audit was the pre-animation state, not a bug. The figure "10+ countries" contradicts the footer (12 countries) and the programme pages ("15+ countries"). — `ticqc-home-desktop-counters-industries.png`.
- Below: red "ABOUT US" eyebrow, ALL-CAPS H2 "DRIVING EXCELLENCE, ENSURING COMPLIANCE: YOUR QUALITY CONTROL PARTNER", 8 "OUR INDUSTRIES" photo tiles (first tile reads "GOVERMENT SERVICES PROGRAMS"), a news row, a certification-badge carousel (ISO 14001/9001/45001 generic green/blue "CERTIFIED ✓" badges, ANAB, TIC Council, GAFTA, APEDA, AIACI, Selo Associados) and the footer. Desktop page height 5,453 px; mobile 10,544 px. — `ticqc-home-desktop-full.png`, `ticqc-home-mobile-full.png`.
- A red circular chat bubble (third-party widget, provider not identified from the DOM) sits bottom-right on every page and overlaps the Complianz "Manage consent" tab. — `ticqc-home-desktop-counters-industries.png`.

**Footer (shared Elementor template)**

- Charcoal `#252324` block, three columns: "ADDRESSES" (12 countries, 14 addresses, phones for UAE/India/Pakistan/Saudi, emails rendered as `info@ticqc.com` under UAE and `info@ticqc.ae` under Saudi Arabia), "SERVICES" (GSP, Oil & Gas, Commodities, Food, Marine, Testing, Training, Vehicle, Impartiality Policy, QMS Policy) and "FOLLOW US" (LinkedIn icon). No copyright line, no privacy/terms links, no logo, no back-to-top. The heading is typed "AdDresses" in the HTML but displayed as "ADDRESSES" because of `text-transform: uppercase`, so the typo is visible to screen readers and search engines, not to sighted visitors. — `ticqc-home-desktop-footer.png`; HTML heading text read via `document.querySelectorAll('h2,h3,h4')`.

**Oil & Gas page**

- Full-bleed stock refinery photo with a semi-transparent charcoal box ("OIL & GAS" + six bullet links), then ALL-CAPS "TESTING, INSPECTION, CERTIFICATION" sections; 961 words; 3 of 4 content images have empty alt, one of them is a literal screenshot file `Screenshot-2025-04-30-141614.png`; the desktop layout overflows horizontally (`scrollWidth > innerWidth`, i.e. a horizontal scrollbar can appear). No breadcrumb, no CTA button, no form. — `ticqc-oil-gas-desktop.png`, `ticqc-oil-gas-desktop-full.png`, `ticqc-oil-gas-mobile.png`.

**Iraq CoC page**

- A different design system from the rest of the site: navy `#0A1628` (rgb 10,22,40) gradient over a container-ship photo (alt text present and descriptive), red eyebrow pill "IRAQ COC PROGRAM", Poppins 56 px H1, red `#E42313` primary button "Start Registration ›" whose text colour computes to rgb(10,22,40) (dark text on red) and a ghost "Learn More" button, three glass cards (Pre-Shipment Inspection / Testing / Certification). 4,197 words, desktop height 18,230 px, mobile height 33,118 px (about 39 phone screens), and a 51-slide image carousel near the bottom. No breadcrumb; the global charcoal header and footer sit above and below the navy page. — `ticqc-iraq-coc-desktop.png`, `ticqc-iraq-coc-desktop-full.png`, `ticqc-iraq-coc-mobile.png`.

**Contact page**

- Stock handshake photo with "CONTACT US" in white caps, then a white card: left a solid red `#E42313` block with Dubai/Sharjah/Riyadh addresses, phone, `info@ticqc.ae`, help line and `help@ticqc.ae`; right an Elementor form (Name, Email*, Phone Number, Organization, Enquiry type, Message, grey "Send" button). Only Email is marked required in the HTML; the "Enquiry type" dropdown defaults to "Complaint"; no CAPTCHA element is present; no map; below the card a two-column list of the other offices in red headings. — `ticqc-contact-desktop.png`, `ticqc-contact-desktop-form.png`, `ticqc-contact-desktop-full.png`, `ticqc-contact-mobile.png`.

**Mobile (390 px)**

- Header stays 110 px tall: logo left, flag "English ▾" and a hamburger (`elementor-menu-toggle`, 38×38 px, aria-label "Menu Toggle") right; no search on mobile. The open menu is a full-width charcoal list of the same 6 items, centre-aligned, with "Industries" and "Services" as accordion arrows. H1 drops to 38 px on home, 32 px on Iraq, 20 px on Oil & Gas. — `ticqc-home-mobile.png`, `ticqc-home-mobile-menu-open.png`, `ticqc-home-mobile-full.png`.

**Cookie banner**

- Complianz banner, bottom-right card: logo, "Manage Consent", explanatory text, buttons "Accept" (blue `#1E73BE`), "Deny" (light grey) and "View preferences". It renders correctly in a browser; the `{title}` / `{vendor_count}` placeholders only appear in the raw HTML before JavaScript runs. — `ticqc-home-desktop-firstview.png`.

**Performance and accessibility of ticqc.ae** (see §3 and §4 for the full tables)

- Lighthouse 12.8.2 local, 2026-10-21: Home mobile 53 / desktop 75; Iraq CoC mobile 58 / desktop 75; Contact mobile 62 / desktop 89. Home weighs 9.07 MB over 112 requests (images 8.3 MB). PSI (Lighthouse 13.5.0, same night): Home mobile 64 (LCP 30.3 s), desktop 70 (LCP 4.5 s); Accessibility 93 mobile / 88 desktop; Best Practices 96; SEO 100; CrUX field data: "No Data" for ticqc.ae (too few Chrome visitors to report).

### Inferences
- The kit values `#6EC1E4 / #54595F / #7A7A7A / #61CE70` and Roboto/Roboto Slab are the colours and fonts Elementor ships with on a fresh install; their survival in `post-5.css` means nobody ever opened Site Settings → Global Colors/Fonts, which explains why every section carries its own hard-coded red and why the Contact H1 falls back to the system font.
- The Iraq CoC page (2026, Poppins/Inter, navy) and the 2024 pages (Arial/Roboto, charcoal, ALL CAPS) were built by different people with no shared design system; a visitor moving from the homepage to the programme page effectively changes websites.
- The counters, the 12-slide fading hero, the stock handshake, the generic "CERTIFIED ✓" badge graphics and the ALL-CAPS section titles are the elements that make the site read as a 2015–2019 WordPress template; none of the top-ranked reference sites (see §5) uses any of them.

### Gaps
- The Elementor default-value claim is based on knowledge of Elementor's shipped kit, not on a fetched Elementor source file; a developer can confirm it in WordPress → Elementor → Site Settings.
- The chat-widget vendor and whether the contact form has server-side spam protection (e.g. Elementor's honeypot or Akismet) were not determined from the rendered DOM.
- Mobile screenshots use Chrome's iPhone emulation, not a physical phone; font rendering on a real iOS device may differ slightly.

---

## 2. Reference set: palette, type, hero, header, menu, breadcrumb, CTA, footer, imagery, mobile

### Takeaway
The twelve reference sites split into three visual generations. The current-generation sites (Kiwa, SGS, TÜV SÜD global, Element, QIMA, Cotecna, Intertek) share one grammar: a white or navy header 60–105 px tall with four to six words in it, one static hero (photo or short looping video) with one headline and one or two buttons, a single accent colour (mint, orange, yellow, red) on a dark-blue or near-black base, a single self-hosted typeface family, sentence-case headings, breadcrumbs on inner pages and a contact/quote card at the end of every service page. The previous generation (TÜV Rheinland, Bureau Veritas Middle East, HQTS, Applus+ UAE) still uses carousels, ALL-CAPS navigation and two-row headers. The oldest (TÜV SÜD Middle East's un-migrated regional template and Bureau Veritas' Verigates portal) look like ticqc.ae's contemporaries: 23-slide carousel, animated counters, condensed caps, Arial at 12.8 px and a 980 px fixed-width layout.

### Cited Findings

Each entry: colours (how obtained), typefaces (how obtained), hero, header, mega-menu behaviour, breadcrumb, CTA, footer, imagery, mobile. All computed on 2026-10-21 at 1440×900 unless stated; screenshot paths in `screenshots/visual-design-benchmark/`.

**SGS — https://www.sgs.com/en and https://www.sgs.com/en-ae**
- Colours: CSS variables on `:root`: `--color-primary-1: #ca4300` (orange, used for the Contact button and all links), `--color-primary-2: #f6f9fc` (off-white section background), `--color-primary-3: #3c515b` (slate, footer and utility bar), `--color-secondary-1: #900c3f`, `--color-secondary-2: #49738b`, `--color-base-grey-900: #252525`, `--color-base-focus: #348df7`. Computed: Contact button rgb(202,67,0) on white; hero text rgb(255,255,255) on a dark earth-from-space image.
- Type: `@font-face` "Suisse Intl" only (Roboto declared but unused); every measured element uses Suisse Intl. H1 42 px weight 400 ("When you need / to be sure"), H2 20 px 700, body 16 px rgb(85,85,85).
- Hero: static two-column (headline + "About us →" ghost button left, one featured card right), no video, no carousel (0 slider elements). A grey geolocation bar "Welcome to SGS. Confirm your location: IRAQ" appears above the header on first visit.
- Header: 65 px sticky white bar + 32 px slate utility bar (Verify Documents, Clients & Products / Labs & Facilities / Global / English); 6 items (Services, Industry, Megatrends, Our Company, Investors, News & Resources) + Search + orange Contact.
- Mega-menu: opens on click, not hover (visible links 36 → 36 on hover → 42 on click; re-verified in the extension). "Services" panel = six pillars in three columns: Testing, Inspection, Certification, Consulting, Training, Verification & Assurance. — `sgs-home-desktop-menu-click.png`.
- Breadcrumb: none on the Egypt PCA page; page-level "Contact" and "Send us a message" (orange) CTAs instead. — `sgs-egypt-pca-desktop.png`.
- Footer: 555 px slate; Careers at SGS, Verify SGS Documents, Contact Directory, Subscribe, location switch, legal links, "© SGS Société Générale de Surveillance SA (2026)"; 15 links.
- Imagery: mix of concept stock (cyber lock, glowing arrow) and own sites (NDT laboratory Orsay, staff group photo); 15 of 15 visible images on /en have alt text, 4 of 22 on /en-ae are empty. UAE page promotes "SGS Food Forum 2026, Hyatt Regency Dubai".
- Mobile: header 59 px (logo + X/hamburger 42×42), drawer lists the 6 sections with arrows plus utility items, and a fixed bottom bar holds Search + orange Contact. — `sgs-home-mobile.png`, `sgs-home-mobile-menu-open.png`, `sgs-ae-home-mobile.png`.
- Contact page /en/contact-form: 12-field form with reCAPTCHA (captcha element detected); /en/contact-us returns 404. — `sgs-contact-desktop.png`.

**Intertek — https://www.intertek.com/ and /government/product-conformity/exports-to-iraq/**
- Colours: Bootstrap variables overridden on `:root`: `--bs-primary: #ffc700` (yellow), `--bs-secondary: #06213d` (navy), `--bs-link-color: #ffc700`, `--bs-focus-ring-color: rgba(33,182,215,.25)`; computed cyan buttons rgb(33,182,215) (`#21B6D7`) with navy text, body text rgb(71,78,84).
- Type: `@font-face` NeoSansPro (+ Cyrillic); everything measured is NeoSansPro. H1 64 px 600 on home, 64 px weight 200 (ultra-light) on the Iraq page; body 20 px / 30 px.
- Hero: autoplay looping video `homepage-loop-v6-sml.mp4` (4.2 MB) full width, centred white H1 "Total Quality. Assured.", sub-line, yellow pill "Learn more"; directly below, a grey bar "Need help or have a question?" with phone pill and cyan "Send Us A Request". Two more autoplay videos further down (10.4 MB media total). — `intertek-home-desktop.png`.
- Header: 40 px utility strip (Responsibility, Investors, Media, Careers, Global ▾) + ~100 px main bar: yellow logo with tagline, 4 items (Industries & Services, About Us, Resources, Locations & Contacts), rounded search box. (The site has no `<header>` element, so the automated hover/click test could not run; menu behaviour not measured.)
- Breadcrumb: yes, on the Iraq page: "Intertek › Industries › Government and Trade › Conformity Assessment Programmes (CAP) › Certificate of Conformity and Inspection for Exports to Iraq". — `intertek-iraq-desktop.png`.
- CTA: cyan "Send us a request" pill; Iraq page has a cyan contact card (phone +852 2310 9923, "Additional Phone Numbers", "Email Us", button).
- Footer: minimal 120 px black bar with 8 links (#YoullBeAmazed, Disclaimer, Terms, Privacy, Cookies, Modern Slavery Act Statement).
- Imagery: video of field/industrial scenes; cards use stock-style photos with descriptive alt text (17/17 on home); the Iraq page has 6 of 8 images without alt. Contact page uses a flat yellow hero with a line-drawn building and a dotted world map. — `intertek-contact-desktop.png`.
- Mobile: logo + search icon + hamburger, hero video with 40 px H1, phone and request buttons stacked. — `intertek-home-mobile.png`, `intertek-iraq-mobile.png`.

**TÜV SÜD global, new template — https://www.tuvsud.com/en**
- Colours: no brand variables (only Bootstrap defaults on `:root`); computed: page base navy rgb(11,37,59) (`#0B253B`) and off-white rgb(242,239,237), CTA mint rgb(2,236,166) (`#02ECA6`) with navy text and 32 px pill radius, secondary blue rgb(0,70,173) (`#0046AD`) for links and cookie buttons.
- Type: `@font-face` TUVSUDPro; 114 of 114 measured elements use it. Display H2 52 px 700, hero paragraph 24 px; H1 is a 40 px page title.
- Hero: static split: headline "Together we engineer the future." left, one photo right (alt text literally says "AI-Generated image of two professionals in a specialised EMC testing chamber… selfie"); a slick slider wrapper exists but holds 1 slide. Cards below carry tags (Press release, Case Study, White paper). — `tuvsud-home-desktop.png`, `tuvsud-home-desktop-firstview.png` (OneTrust banner with "Disable All").
- Header: 120 px on navy; octagon logo, 6 items (Solutions, Careers, Company, Newsroom, Resources, Sustainability), My Portal, Global | EN, search icon.
- Mega-menu: opens on click (extension: 50 visible links → 50 on hover → 56 on click). Three-column navy/blue panel: Solutions → By Industries / By Services / By Focus Topics → industry list → detail column with description, "Learn more" mint pill, "Search services in Automotive" field and "Most popular services". — `tuvsud-home-desktop-menu-click.png`.
- Breadcrumb: not present on the home page; /en/contact and /en/contact-us both return the site's 404 page (contact is reached via "Get in touch" links instead). — `tuvsud-contact-desktop.png`.
- Footer: Subscribe, "Find a TÜV SÜD office, facility or lab near you", Site Information, Frequently Visited, Contact (HQ address), Connect, "Copyright © 2026 TÜV SÜD"; 22 links.
- Imagery: staff selfie, event photos, lab/robotics; 24 of 24 images have alt text; 0 uppercase headings.
- Mobile: header 99 px with search at top, "Get in touch" visible; drawer not captured by the script. — `tuvsud-home-mobile.png`.

**TÜV SÜD Middle East, old regional template — https://www.tuvsud.com/en-ae**
- Colours: blue rgb(0,70,173), grey text rgb(102,102,102); `body` font-family computes to "Times New Roman" (unstyled fallback) with UniversLTStd-Cn applied to components.
- Type: `@font-face` UniversLTStd-Cn (condensed), Arial-TS; H1 36 px uppercase grey, H2 84 px uppercase, body 18 px.
- Hero: 23-slide slick carousel mixing images and autoplay video, ALL-CAPS slide titles ("100+ TRAINING COURSES NOW AVAILABLE TO BE BOOKED ONLINE."), outlined "BOOK ONLINE" pill, prev/next arrows and 9+ dots; then "PROVIDING TESTING, INSPECTION AND CERTIFICATION SOLUTIONS WORLDWIDE" and counters that start at 0 and animate (mobile capture caught "670,000 CERTIFICATES"). — `tuvsud-ae-home-desktop.png`, `tuvsud-ae-home-mobile.png`.
- Header: 102 px, grey utility strip (ABOUT, CAREERS, PRESS AND MEDIA, SITE SELECTOR) + INDUSTRIES & SERVICES, RESOURCES, ACADEMY STORE, LOCATIONS, CONTACT US + search box; all caps.
- Imagery: 26 of 30 images without alt; 32 of 32 headings uppercase. Mobile drawer exposes 48 links.
- This page is the clearest "same company, old template vs new template" pair in the set.

**TÜV Rheinland UAE — https://www.tuv.com/united-arab-emirates/en/ and /ar/ ; Iraq ICIGI landing page**
- Colours: computed blue rgb(0,113,185) (`#0071B9`) for buttons, tiles and the "Contact" side tab; light grey rgb(225,229,232) section background; standard link blue rgb(0,0,238) on some text links (unstyled).
- Type: `@font-face` Univers LT W02 55 Roman / 65 Bold + Roboto; headings Univers 30 px, paragraphs Roboto 14 px / 22 px. Arabic page: Calibri for Arabic text.
- Hero: 5-slide slick stage carousel with a curved "wave" bottom, slide 1 = composite stock montage (engineer, robot arm, businesswoman) with a blue panel "Today for tomorrow. Sustainability for business…" and white "JOIN US" button; dots below. Three blue icon tiles (Regulations & Standards Updates, Global Market Access, Certipedia). — `tuv-ae-home-en-desktop.png`.
- Header: white, 125 px, two rows: logo + Company ▾ / United Arab Emirates / EN / Search, then five two-line ALL-CAPS service pillars (TESTING & ASSESSMENT, CERTIFICATION & AUDITING, TRAINING & QUALIFICATION, INSPECTION & SUPERVISION, CONSULTING & PROJECT MANAGEMENT). No H1 on the home page. 9 of 15 images without alt.
- Arabic (/ar/): layout mirrored right-to-left via CSS but `<html dir>` is not set; the hero image carries English text baked into the picture ("Today for tomorrow. Join us!"); footer mixes Arabic and English labels ("News Events TÜV Rheinland Middle East Facts and Figures"); the page overflows horizontally on desktop and mobile; 12 of 20 images without alt. — `tuv-ae-home-ar-desktop.png`, `tuv-ae-home-ar-mobile.png`.
- Iraq ICIGI page: separate "landingpage" template with its own nav (Home, Pre-Export Verification of Conformity (PVoC), Commercial Inspections, Expert Corner, News, Downloads, FAQs), wide port photo with descriptive alt, blue 24 px H1 "Pre-Import Inspection, Testing and Certification Program of Goods into the Republic of Iraq (ICIGI)", in-page anchor list (Detailed Information, Product Scope, Downloads, Contact us), "Assistant" and "Contact" side tabs, chat widget; 12 of 17 images without alt. — `tuv-iraq-icigi-desktop.png`.
- Mobile: hamburger (SVG icon whose embedded CSS leaks into the link text), search at top; drawer shows the 5 pillars + Company + topic teasers (32 links). — `tuv-ae-home-en-mobile.png`, `tuv-ae-home-en-mobile-menu-open.png`.

**Bureau Veritas Middle East — https://middle-east.bureauveritas.com/ (+ /your-needs/inspection, /contact-ustwasl-mna)**
- Colours: `:root` `--primary: #00049e` (deep blue), `--secondary: #333333`; computed "READ MORE"/"Our job offers" buttons rgb(0,4,158), footer rgb(51,51,51).
- Type: `@font-face` BureauVeritas-ExtBdUltraCond, -ThinUltraCondensed, -LightUltraExpanded (display) + Source Sans Pro (body 20 px / 25 px). H1 48 px ThinUltraCondensed uppercase; all display headings uppercase.
- Hero: full-viewport rotating news slider (prev/next arrows, PAUSE button, scroll-down chevron), slide 1 = CGI mountain/planet artwork with "NEWS" tag and italic caps headline; thin vertical grid lines overlay the whole page. Autoplay video `bureau-veritas-me_1.mp4` lower on the page. — `bv-me-home-desktop.png`.
- Header: fixed 50 px top bar ("MIDDLE EAST" region tab, search / chat / globe icons) + 9 ALL-CAPS items (ABOUT US, INDUSTRIES, SUSTAINABILITY, YOUR NEEDS, DIGITAL, INSIGHT, NEWS, CAREER, OUR OFFICES); logo in a white box left.
- Mega-menu: click (50 → 50 hover → 58 click); INDUSTRIES panel lists Oil & Gas, Power & Utilities, Building & Infrastructure, Metals & Minerals, Automotive & Transport, Food & Agri, Marine & Offshore, Consumer Products & Retail. — `bv-me-home-desktop-menu-click.png`.
- Breadcrumb: yes ("Home – Your needs") on the Inspection page, which is 200 words of ALL-CAPS condensed type over a photo. — `bv-me-inspection-desktop.png`.
- Contact: 12-field form (name, last name, email, company, country, subject, case type, complaint fields, message) with reCAPTCHA; page title mixes English and Arabic ("Contact usتواصل معنا."). — `bv-me-contact-desktop.png`.
- Footer: 665 px dark grey: Connect (LinkedIn, Instagram, YouTube), Join us, Our websites, Site map, "©Bureau Veritas 2019-2026", legal; 11 links. Focus outline: 3 px black (custom, visible).
- Mobile: header 50 px, search icon at far left, "Middle East / Contact / Locations" visible; hamburger not identified by the script. — `bv-me-home-mobile.png`.

**Verigates (Bureau Veritas programme portal) — https://verigates.bureauveritas.com/ and /sub-programme/iraq-voc?id=49**
- Colours: blue rgb(0,4,158) buttons/headers, beige rgb(234,233,229)/(244,243,241) panels, dark-grey text rgb(66,65,60); no variables.
- Type: Arial only (no `@font-face`); body 12.8 px / 16.6 px, H2 21–23 px.
- Layout: 980 px fixed width; at 390 px the viewport reports 980 px, i.e. the page is not responsive and simply shrinks. Header 202 px: logo, language links (English | Français | 中文), "Access to My Account" button, a 3-slide banner ("Your Fast Track for Worldwide Trade"), BV logo; then a 4-tab bar (home icon, NEW REQUEST, NEWSROOM, SUPPORT). "Find the way to import your goods — Export from / To — CONTINUE" tool, world map with 27 country programmes (incl. Iraq, Kuwait, Egypt, Saudi Arabia, GCC), news list. — `verigates-home-desktop.png`, `verigates-home-mobile.png`.
- Iraq VOC page: left list (Iraq – IQB scheme, Kurdistan Region, VOC), "SCOPE OF DUTIES" (COSQC appointment), "PROGRAMME NEWS" (12/03/26, 23/12/25, 23/07/25), "DOWNLOADS" (6 PDFs), "CONTACT US – CONTACT IN BAGHDAD" with phone and address. — `verigates-iraq-desktop.png`.
- 2 of 7 images without alt; headings mostly caps. It is a transactional portal rather than a marketing site, included because it is the Iraq-programme counterpart to TIC's Iraq CoC page.

**Kiwa — https://www.kiwa.com/en/ (+ ISO 9001 service page, /en/contact/)**
- Colours: `:root` `--color-primary: #0054c5` (blue), `--color-primary-darkest: #072643` (navy, headings and hero panel), `--color-secondary: #80ffca` (mint, highlight words and "Get a quote"), `--color-supplementary: #fff672`, `--color-subtle: #f0f0e0`. Computed hero panel rgb(7,38,67), tags rgb(128,255,202).
- Type: `@font-face` Azo Sans (headings, H1 50 px weight 900) + Work Sans (body 17 px / 25.5 px on service pages); body base 17 px.
- Hero: static split: large photo of two Kiwa inspectors (alt: "Two Kiwa inspector on-site weaaring safety gear…") with "creating trust / driving progress" (mint italic) over it, navy panel right "Kiwa is represented in over 35 countries" + white "Find your location →" button. No carousel, no video. — `kiwa-home-desktop.png`.
- Header: 100 px white; SVG logo; 5 items (Solutions, Insights, About Kiwa, Social Responsibility, Contact) + "Kiwa Global (English)" + Search. Accessibility widget button bottom-left and a11y icon right edge.
- Mega-menu: click opens a white panel (Popular Solutions, Areas of Expertise, Industries, Services, Standards + a blue "Laboratory capabilities" tile); the automated link count barely moved (64 → 65) because the panel loads lazily, but the capture shows it open. — `kiwa-home-desktop-menu-click.png`.
- Breadcrumb: yes, as mint tags "Services / Certification" above the ISO 9001 H1 and "Home / Contact" on the contact page. — `kiwa-iso9001-desktop.png`, `kiwa-contact-desktop.png`.
- CTA: every service page has a blue band "Receive a quote tailored to your needs" with phone, "Contact us →" ghost and mint "Get a quote →" pill. Contact page = three cards (Need to contact us? / Press information / Head office locations).
- Footer: 647 px: Services, Kiwa's global expertise, Kiwa Group, Follow us; 31 links; tagline "creating trust driving progress".
- Imagery: own inspectors and auditors in PPE, office scenes; 7 of 21 home images without alt (0 of 19 on the ISO page); 0 uppercase headings. Minor horizontal overflow on home.
- Mobile: header 60 px, hamburger 19×20 px (small; Lighthouse flags target size), location picker opens a navy drawer "Choose location". — `kiwa-home-mobile.png`, `kiwa-home-mobile-menu-open.png` (location drawer, not the nav).

**Element — https://www.element.com/ (+ /our-services/testing-services, /locations)**
- Colours: `:root` `--primary-elementdarkerblue: #0c2242`, `--primary-elementmidblue: #0095c8`, `--secondary-elementdarkblue: #002f6c`, `--secondary-elementlightblue: #9bcbeb`, `--neutral-colors-500: #b4b9c9`; computed orange CTA rgb(255,103,36) (`#FF6724`) with navy text; light-blue section backgrounds rgb(229,244,249).
- Type: `@font-face` REM (+ fallback); H1 64 px 800, body 16 px rgb(85,100,123); `--font-size-*` and line-height tokens exposed as variables.
- Hero: autoplay video `homepage_banner_video.mp4` (lab scene) with white H1 "Delivering testing confidence when the stakes are highest." inside a thin-line frame; below it a task bar "I'm trying to… [See industries served] [Check your accreditations & approvals] [Find a lab near me]" + orange "Talk to our team of experts". — `element-home-desktop.png`.
- Header: 105 px sticky white; utility (Lab Accreditations & Approvals, English); 4 items with chevrons (Industries & Services, Our Experts, Resources, About Us); navy "LOCATIONS", orange "CONTACT US", "SEARCH" box.
- Breadcrumb: yes ("Home / Testing Services"). Testing page shows named experts with photos and a 12-field request form with reCAPTCHA. Locations page lists every lab by region (The Americas, Europe, Africa, Asia, Middle-East filters; 5,284 words). — `element-testing-desktop.png`, `element-locations-desktop.png`.
- Footer: 814 px: About Us, Services, Industries, "Making tomorrow safer than today.", Contact Our Expert Team, Our labs and offices, legal; 21 links.
- Imagery: own engineers and labs; 0 of 59 visible images lack alt text (best in set); 0 uppercase headings on home.
- Mobile: hamburger 32×32 with aria-label "Open menu", search visible at top, drawer with 20 links. — `element-home-mobile.png`, `element-home-mobile-menu-open.png`.

**Cotecna — https://www.cotecna.com/ (+ GOEIC page; /en/contact-us returns 404)**
- Colours: no variables; computed navy header rgb(4,4,80) (`#040450`), footer rgb(3,3,58), blue rgb(0,0,135)/(0,0,141), green CTA rgb(0,186,128) (`#00BA80`), beige rgb(238,234,229) sections.
- Type: Work Sans (Black for display 54 px 700, Regular body 16 px / 26 px) + Montserrat (base); fonts not declared via `@font-face` in accessible stylesheets (loaded cross-origin).
- Hero: autoplay video (`food-safety.mp4`; four hero videos totalling ≈44 MB are fetched on load), headline with green highlight words, square "LEARN MORE" (white) + "CONTACT US" (green) buttons; news slider (8 slides) with orange date stamps; diagonal cut shapes. — `cotecna-home-desktop.png`.
- Header: fixed 137 px: utility (CAREERS, COTECNA GROUP WEBSITES ▾) + logo, SERVICES ▾, ABOUT ▾, NEWS & MEDIA, EVENTS, green CONTACT, globe, search, EN ▾.
- Mega-menu: click (88 → 88 hover → 141 click): columns Agriculture / Certification / Consumer Products / ESG / Food… each ending "View all services →". — `cotecna-home-desktop-menu-click.png`.
- Breadcrumb: yes ("Home / Services / Verification of Conformity / Egypt / GOEIC"). GOEIC page: photo of a Cotecna technician in a branded lab coat, navy H1 44 px, right-hand "Contact Us" card with green "SEND US A REQUEST", side rail (search, globe, mail, portal). — `cotecna-goeic-desktop.png`.
- Footer: 491 px navy: Subscribe, Follow Us, "© 2026 Cotecna", Terms, Privacy, Cookie Policy, Manage Cookies, Certificate Authentication; 13 links.
- Imagery: own labs and staff plus stock; all images carry alt text but it is the file name (e.g. "news-pesticide-residues"). Focus outline 3 px lavender (custom).
- Mobile: hamburger; drawer SERVICES › ABOUT › NEWS & MEDIA / EVENTS / CONTACT (green block) / LOCATIONS, a Search field, Language, Careers, Group websites. — `cotecna-home-mobile.png`, `cotecna-home-mobile-menu-open.png`.

**QIMA — https://www.qima.com/ (+ /contact → /contact-us)**
- Colours: `:root` `--brand-color-primary: 228 0 43` (`#E4002B` red), `--brand-color-navy: 2 20 52`, `--brand-color-teal: 16 196 143`, `--brand-color-charcoal: 47 37 47`, accent oranges/yellow; computed hero background rgb(248,246,242) (warm off-white), "Talk to an expert" rgb(228,0,43) pill.
- Type: `@font-face` Figtree (headings, H1 64 px 600), Inter (body 16–17 px), DM Mono (data chips), gothamRounded (contact H1).
- Hero: two-column: black headline with the last line in red ("consumers can trust"), red pill "Talk to an expert" + outline "Find your service"; right a rounded photo (child with teddy bear) with floating monospace data chips ("LEAD CONTENT: 0.62 PPM", "SMALL PARTS TEST: PASSED", "CARE LABEL: CE COMPLIANT"); the photo is a 4-slide auto-rotating carousel. Cookiebot banner at the bottom offers only "Allow all" at first level. — `qima-home-desktop.png`.
- Header: 75 px fixed white; logo; 5 items (Services, Industries, Platform, Resources, About us) + Sign In + red "Contact us" + EN ▾.
- Mega-menu: opens on hover (68 → 92 links): Consumer Products / Food & Agrifood / Life Sciences / Sustainability columns with "Create an Account". — `qima-home-desktop-menu-hover.png`.
- Breadcrumb: none observed. Contact page: 12-field form (first/last name, company, email, job title, country, industry, phone, question type, budget, message, subscribe), no CAPTCHA element detected, H1 "Let's Connect".
- Footer: 572 px: Resources, About QIMA (Accreditations, Complaints & Appeals, Report Verification, Company Policies…); 33 links.
- Imagery: lifestyle/product photos; 10 of 19 home images without alt; 0 uppercase headings.
- Mobile: header 61 px; the script found no hamburger element (custom component), so the drawer was not captured. — `qima-home-mobile.png`.

**HQTS — https://www.hqts.com/ and Iraq CoC page (WordPress + Elementor, like ticqc.ae)**
- Colours: only plug-in variables (`--ecs-color-*`); computed red rgb(198,24,37) (`#C61825`) buttons and headings, dark grey rgb(56,52,49), light rgb(247,249,252).
- Type: `@font-face` Roboto, Open Sans; H1 Hind 52.8 px 600 on home, Open Sans 40 px uppercase on the Iraq page; body Roboto 14 px / Open Sans 16 px; base falls back to the system stack.
- Hero: autoplay corporate video (10.9 MB, Chinese-named file) with white H1 "50,000+ brands trust HQTS with their supply chain", red "Services" + dark "Industries" buttons; sticky bar "Need more information on our services? — Contact HQTS now"; a chat assistant pops open on load. — `hqts-home-desktop.png`.
- Header: 90 px white; JPG logo (`logo-768x147.jpg`, empty alt); 6 items (Our Services, Industries we serve, Who we are, Resources, FAQ, Contact) + flag "English" + Facebook/Twitter/LinkedIn/YouTube icons.
- Mega-menu: opens on hover (123 → 152 links): grouped columns (Inspections & Supplier Audits, Testing, Quality Engineering, Consulting, Sustainable Solutions, Certifications → Government Certifications…). — `hqts-home-desktop-menu-hover.png`.
- Breadcrumb: yes ("Home > Our Services > Iraq Certificate of Conformity (CoC)"). Iraq page: hero photo with uppercase H1, red "Need More Information?" inline 7-field form (Name*, Email*, Phone*, Company*, Country*, Product*, Message), 4-step process graphic, "Request Sample Report" button. — `hqts-iraq-desktop.png`.
- Footer: 418–478 px with SEO-style heading list (Why use HQTS?, Which Inspections to choose?, Quality Control in India/China/Bangladesh/Vietnam…); 34 links; newsletter form.
- Imagery: 14 of 14 home images without alt. Mobile drawer exposes 105 links. — `hqts-home-mobile.png`, `hqts-home-mobile-menu-open.png`.

**Applus+ UAE — https://www.applus.com/ae/en/ and the Iraq CoC service sheet**
- Colours: no variables; computed orange rgb(255,105,0) (`#FF6900`) for "CONTACT US"/"GET A QUOTE", dark grey rgb(50,50,52) panels. (The desktop probe on the home page was interrupted by a client-side redirect, so colour/type values come from the Iraq service sheet; the home screenshot was captured.)
- Type: `@font-face` Bai Jamjuree Light/Regular/Medium/Bold (headings, H1 39.7 px) + Tahoma (body 15 px / 27 px) + Helvetica Neue 12 px base.
- Hero: one static photograph (Sheikh Zayed Grand Mosque, a location image rather than a service image) with a small "Together beyond standards" tagline card; below it a "WHAT WE DO: BY MARKETS ▾ / BY KEY THEMES ▾ / Search Energy & Industry services" panel with an orange "GET A QUOTE" block, then NEWS cards. — `applus-ae-home-desktop.png`.
- Header: fixed 111 px white; logo with "UAE" tag; 4 caps items (WHAT WE DO, ABOUT US, NEWS, CAREERS) + orange CONTACT US + search + globe.
- Breadcrumb: yes ("UAE › Applus+ Services › Highlighted › Certificate of Conformity - Iraq"); the service sheet is 452 words with a process-flow JPG, 3 of 4 images without alt. — `applus-ae-iraq-desktop.png`.
- Footer: 139 px minimal (Follow us, ©2026 Applus+, Privacy Policy, Cookies Policy). Mobile: "navbar-toggle" hamburger 67×70. — `applus-ae-home-mobile.png`, `applus-ae-home-mobile-menu-open.png`.

### Inferences
- Across the current-generation sites the accent colour is used for exactly one thing: the primary button and highlighted words. The dated sites (and ticqc.ae) use their colour for headings, eyebrows, counters, panels and buttons at once, which is why they look "busier" at the same information density.
- Header height is a reliable generation marker in this set: 59–105 px (SGS, Kiwa, QIMA, Element, HQTS, TÜV SÜD new) versus 110–137 px with two rows or caps (ticqc.ae 110, Applus 111, TÜV Rheinland 125, Cotecna 137, TÜV SÜD ME 102 + utility, Verigates 202).
- Mega-menus opening on click rather than hover (SGS, TÜV SÜD, BV, Cotecna, Kiwa) is the majority pattern among the newer builds; hover menus survive on QIMA and HQTS. Click menus behave identically on touch devices, which is probably why the larger sites chose them (inference).

### Gaps
- Intertek and QIMA mega-menu behaviour and QIMA/BV mobile drawers were not captured because those headers are not standard `<header>`/button elements; a manual check would take a minute each.
- TÜV SÜD global, TÜV Rheinland, Bureau Veritas, Element, Applus+ and Verigates were not run through Lighthouse (the brief limited performance runs to SGS, Intertek, Kiwa, Cotecna, HQTS, QIMA plus ticqc.ae).
- Fonts for Cotecna and Applus+ are inferred from computed `font-family` names; their licences (Work Sans is open source, Bai Jamjuree is open source, Univers/Suisse/NeoSans/REM/Azo are commercial) were not checked.
- "Real staff vs stock" is a visual judgement from the screenshots and alt texts (e.g. "Two Kiwa inspector on-site", "Cotecna" lab coat, "AI-Generated image" on TÜV SÜD); it was not verified with the companies.

---

## 3. Performance: Lighthouse lab results and CrUX field data

### Takeaway
On a simulated mid-range phone every site in the set, including SGS, scores "needs improvement" or "poor"; ticqc.ae's 53–64 mobile score is actually mid-table, but its homepage is the heaviest image page measured (9.1 MB, 8.3 MB of it images, one 3.6 MB JPEG) and its mobile LCP of 22–30 s is the worst non-video result. Real-user (CrUX) data exists for every reference domain except ticqc.ae; only Kiwa passes Core Web Vitals in the field (LCP 1.1 s), which shows that a modest lab score can still deliver a fast real-world site when images and caching are handled well.

### Cited Findings

**Lab: Lighthouse 12.8.2 CLI, 2026-10-21 20:37–20:39 UTC, one run per cell, categories performance + accessibility, run from a Windows PC in Iraq**

| Page | Mode | Perf | A11y | FCP | LCP | TBT | CLS | Speed Index | Requests | Weight | Largest assets |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ticqc.ae/ | mobile | 53 | 93 | 5.0 s | 22.4 s | 220 ms | 0 | 12.6 s | 111 | 9.18 MB | 3caa6c76…jpeg 3.6 MB; 1c248a88…-scaled.jpeg 858 KB; Gafta-…logo.jpg.jpg 817 KB; aiaci.jpg 613 KB |
| ticqc.ae/ | desktop | 75 | 88 | 1.1 s | 3.0 s | 0 ms | 0.004 | — | 112 | 9.07 MB | same (images 8.3 MB, JS 762 KB) |
| ticqc.ae/iraq-coc/ | mobile | 58 | 92 | 3.7 s | 21.6 s | 170 ms | 0 | — | 105 | 4.72 MB | Iraq-CoC.png 894 KB; Gafta 817 KB; aiaci 613 KB; apeda-1.jpg 553 KB |
| ticqc.ae/iraq-coc/ | desktop | 75 | 87 | 1.3 s | 2.9 s | 0 ms | 0.002 | — | 105 | 4.73 MB | same (images 3.8 MB) |
| ticqc.ae/contact/ | mobile | 62 | 93 | 3.1 s | 9.2 s | 220 ms | 0 | — | 86 | 1.43 MB | services-header-scaled-1.jpg 316 KB; b9996cc…-scaled.jpeg 198 KB; gtm.js 130 KB |
| ticqc.ae/contact/ | desktop | 89 | 89 | 1.0 s | 1.8 s | 0 ms | 0.002 | — | 87 | 1.43 MB | same |
| sgs.com/en | mobile | 35 | 96 | 2.3 s | 13.2 s | 2,660 ms | 0 | — | 100 | 3.14 MB | JS bundles 468 KB, 281 KB, 195 KB, 185 KB (JS total 2.45 MB) |
| sgs.com/en | desktop | 65 | 96 | 0.9 s | 3.6 s | 210 ms | 0 | — | 102 | 3.34 MB | same |
| intertek.com | mobile | 62 | 90 | 2.5 s | 9.7 s | 280 ms | 0.031 | — | 97 | 12.22 MB | homepage-loop-v6-sml.mp4 4.2 MB; amazing-intertek…mp4 3.5 MB; testing-the-waters.mp4 2.5 MB; NeoSansPro-Medium.ttf 239 KB |
| intertek.com | desktop | 80 | 90 | 1.2 s | 2.4 s | 20 ms | 0.004 | — | 98 | 12.68 MB | same (media 10.6 MB) |
| kiwa.com/en | mobile | 48 | 97 | 4.3 s | 9.8 s | 500 ms | 0.006 | — | 131 | 2.09 MB | 4dBgnDRkda7v0hKw.json 368 KB; gtm.js 201 KB; worksans-regular.ttf 185 KB |
| kiwa.com/en | desktop | 78 | 100 | 1.4 s | 2.4 s | 0 ms | 0.013 | — | 134 | 2.34 MB | same |
| cotecna.com/en | mobile | 43 | 87 | 2.9 s | 22.0 s | 830 ms | 0.002 | — | 111 | 51.62 MB | comm-cotecna-homepage-banner-video-agri.mp4 15.6 MB; consumerproducts.mp4 9.9 MB; commodities.mp4 9.3 MB; food-safety.mp4 9.0 MB |
| cotecna.com/en | desktop | 64 | 79 | 1.4 s | 6.0 s | 60 ms | 0.027 | — | 122 | 52.40 MB | same (media 44.7 MB) |
| hqts.com | mobile | 42 | 90 | 2.6 s | 25.2 s | 850 ms | 0.042 | — | 154 | 13.92 MB | corporate video 10.5 MB; js 196 KB; maps.js 167 KB; gtm.js 166 KB |
| hqts.com | desktop | 64 | 90 | 1.2 s | 6.5 s | 60 ms | 0.001 | — | 169 | 14.18 MB | same |
| qima.com | mobile | 44 | 87 | 1.7 s | 5.1 s | 5,030 ms | 0 | — | 89 | 3.56 MB | insight-platform.jpg 482 KB; 0xjvf63vfm4ts.js 213 KB; insight-consumer.jpg 198 KB |
| qima.com | desktop | 53 | 94 | 1.2 s | 2.1 s | 970 ms | 0 | — | 92 | 3.71 MB | same (images 1.8 MB, JS 1.6 MB) |

Source: Lighthouse JSON files produced locally (`fetchTime` 2026-10-21T20:37:45Z for the first run); LCP element for ticqc.ae home = the Elementor background slideshow wrapper; for Cotecna/Intertek/HQTS = the hero `<video>`; for Kiwa = the inspector photo; for QIMA = the teddy-bear photo. Weight = sum of transfer sizes in the network-requests audit, so video sites include whatever streamed during the trace.

**Lab + field: PageSpeed Insights (Lighthouse 13.5.0, Google servers), 2026-10-21 23:51 – 2026-10-22 00:02 GMT+3**

| URL | Form factor | Lab Perf / A11y / Best Practices / SEO | Lab FCP, LCP, TBT, CLS, SI | CrUX field (28 days to 2026-10-21, this URL, mobile) | CWV assessment |
|---|---|---|---|---|---|
| https://ticqc.ae/ | mobile | 64 / 93 / 96 / 100 | 1.4 s, 30.3 s, 130 ms, 0, 12.5 s | **No data** (too few Chrome users) | n/a |
| https://ticqc.ae/ | desktop | 70 / 88 / 96 / 100 | 0.4 s, 4.5 s, 70 ms, 0.002, 3.1 s | No data | n/a |
| https://www.sgs.com/en | mobile | 44 / 96 / 100 / 100 | — | LCP 5.5 s, INP 224 ms, CLS 0, FCP 5.5 s, TTFB 1.4 s | Failed |
| https://www.intertek.com/ | mobile | 75 / 90 / 81 / 75 | — | LCP 3.2 s, INP 113 ms, CLS 0.01, FCP 2.6 s, TTFB 1.1 s | Failed (LCP) |
| https://www.kiwa.com/en/ | mobile | 57 / 100 / 81 / 100 | — | LCP 1.1 s, INP n/a, CLS 0.01, FCP 0.7 s, TTFB 0.8 s | **Passed** |
| https://www.cotecna.com/ (→ /en) | mobile | 52 / 88 / 96 / 85 | — | LCP 3.8 s, INP 140 ms, CLS 0.26, FCP 2.1 s, TTFB 1.4 s | Failed (LCP, CLS) |
| https://www.hqts.com/ | mobile | 46 / 90 / 96 / 92 | — | LCP 5.7 s, INP n/a, CLS 0.01, FCP 4 s, TTFB 1.8 s | Failed |
| https://www.qima.com/ | mobile | 65 / 86 / 96 / 85 | — | LCP 3.6 s, INP 225 ms, CLS 0, FCP 2.8 s, TTFB 1.1 s | Failed |

Source: pagespeed.web.dev report pages read in the browser (e.g. `https://pagespeed.web.dev/analysis/https-ticqc-ae/qzfa090qnl?form_factor=mobile`, `…/https-www-sgs-com-en/ocb1geojk9`, `…/https-www-intertek-com/ijv8i209nx`, `…/https-www-kiwa-com-en/q533ta5j3e`, `…/https-www-cotecna-com/fks03sp3py`, `…/https-www-hqts-com/8s4xjk6i4v`, `…/https-www-qima-com/o0223jvzif`, `…/https-ticqc-ae/ejw3vw7zur?form_factor=desktop`). PSI mobile = "Emulated Moto G Power, Slow 4G throttling, HeadlessChromium 153".

**Weight drivers on ticqc.ae (Lighthouse network audit, 2026-10-21)**

- Home: 112 requests, 9.07 MB, of which images 8.33 MB, JavaScript 0.76 MB. The four certification logos alone (Gafta 817 KB, aiaci 613 KB, apeda 553 KB, Selo) are JPEG/PNG scans 2,084–2,362 px wide displayed at ~200 px.
- Iraq CoC: 105 requests, 4.73 MB (images 3.8 MB); the hero `Iraq-CoC.png` is 894 KB.
- Contact: 86 requests, 1.43 MB; the fastest page (desktop 89) because it has no slideshow.
- Lighthouse flagged `uses-responsive-images` and `modern-image-formats` savings on all three pages and "font-display" on the self-hosted Google fonts (scores read from the JSON; exact byte savings not reproduced here).

### Inferences
- ticqc.ae's mobile LCP (22–30 s in the lab) is almost entirely the hero slideshow: a 3.6 MB JPEG must download over simulated slow 4G before the first slide can paint. Swapping that one file for a properly sized WebP would move the score more than any code change (inference from the LCP-element and largest-asset data).
- The reference sites' low mobile lab scores are driven by hero video (Intertek, Cotecna, HQTS) or JavaScript (SGS 2.45 MB, QIMA 5 s blocking time); none of these is a pattern a mid-size firm needs to copy.
- "No data" in CrUX for ticqc.ae means Google does not have enough Chrome visitors to the domain to report field metrics; after a rebuild, Search Console's Core Web Vitals report will stay empty until traffic grows, so lab testing will remain the only measure for a while.

### Gaps
- Single Lighthouse runs; no median-of-three. Scores can move ±5–10 points between runs, and local runs from Iraq add network latency that Google's US/EU-based PSI run does not.
- The PSI desktop run was done only for ticqc.ae; CrUX "origin" (whole-site) figures were not recorded, only "this URL".
- PSI runs for the six reference desktops and for the ticqc.ae Iraq/Contact pages were not done (API quota was exhausted earlier in the day; the web UI was used sparingly).

---

## 4. Accessibility quick check (ticqc.ae + SGS, Kiwa, Element as references)

### Takeaway
ticqc.ae's Lighthouse accessibility score (87–93) is respectable and close to SGS (96) and Kiwa (97–100), but the automated score hides the practical gaps a director would notice: the menu and links rely on the browser's default focus ring, the Iraq CoC page has 204 colour-contrast failures (grey-on-navy body text and dark text on red buttons), the header logo has no alt text, and the homepage uses 20 capitalised headings that screen readers may spell out letter by letter. Element and Kiwa show what "done properly" looks like: 0 of 59 images without alt (Element), an accessibility widget and skip links (Kiwa), 3 px custom focus outlines (Bureau Veritas, Cotecna).

### Cited Findings

| Check | ticqc.ae | SGS (sgs.com/en) | Kiwa (kiwa.com/en) | Element (element.com) |
|---|---|---|---|---|
| Lighthouse accessibility (local 12.8.2, mobile / desktop) | Home 93 / 88; Iraq 92 / 87; Contact 93 / 89 | 96 / 96 | 97 / 100 | not run (PSI/LH not in scope) |
| PSI accessibility (13.5.0) | 93 mobile, 88 desktop | 96 | 100 | — |
| Failed audits (desktop, from LH JSON) | Home: aria-allowed-attr, color-contrast (1 item), link-name. Iraq: + heading-order, color-contrast **204 items**. Contact: color-contrast 6 items, link-name | aria-allowed-role, color-contrast (1 item), label-content-name-mismatch | aria-allowed-role (desktop); target-size (mobile) | — |
| Keyboard reach of the menu | Header links are real `<a>` elements inside Elementor nav `<ul>`; dropdown parents "Industries"/"Services" are links to "#" that open on click, so sub-items are reachable by Tab after activation (observed in DOM; not tested with a screen reader) | Nav items are `<button>`s ("desktopnav") that open panels; links inside panels are focusable | Nav items are `<li>` with buttons/links; "Skip to main content" and "Skip to main menu" links present | "Skip to content" button present; nav items with chevrons are buttons; hamburger has aria-label "Open menu" |
| Visible focus state (computed `outline` on first header link after `.focus()`) | `auto 1px rgb(16,16,16)` = browser default ring only; no custom style | `none 3px rgb(37,37,37)` → outline style `none` on links (focus relies on other styling; not visible in computed outline) | `auto 1px` browser default | `auto 1px` browser default |
| Body-text contrast | Home paragraphs white on charcoal (passes); Iraq page body rgb(148,163,184) on navy rgb(10,22,40) and 204 contrast items flagged; Oil & Gas black on white (passes) | 1 contrast item flagged | 0 flagged | 0 flagged by script (not LH-tested) |
| CTA contrast | "Start Registration" (Iraq) = text rgb(10,22,40) on rgb(228,35,19); "More news" white on rgb(188,36,44); "Send" white on rgb(64,64,64) | "Contact" white on rgb(202,67,0) | "Get a quote" rgb(0,84,197) on rgb(128,255,202) | "Contact us" rgb(12,34,66) on rgb(255,103,36) |
| Alt text: logo | header `Group-2.png` alt="" (empty); a second copy carries alt "TIC Quality Control" | SVG logo without alt attribute (inline SVG; title not checked) | `kiwa-logo.svg` alt="" | inline SVG |
| Alt text: hero | background-image slideshow (no `<img>`, so no alt possible) | hero `<img>` alt "SGS - enabling a better, safer and more interconnected world" (/en); alt="" on /en-ae | alt "Two Kiwa inspector on-site weaaring safety gear…" | hero is a `<video>` (no alt); first content image alt "Testing engineer in an anechoic chamber…" |
| Visible images without alt (home) | 4 of 22 (Oil & Gas 3 of 4; Contact 1 of 2; Iraq 1 of 20) | 0 of 15 | 7 of 21 | 0 of 59 |
| Uppercase headings (H1–H3, home) | 20 of 23 | 2 of 16 | 0 of 37 | 0 of 10 |
| Language / direction | `lang="en-US"`; /pt/ stub, no Arabic | `lang="en"` / `en-ae` | `lang="en"` | `lang="en"` |
| Other | Chat bubble overlaps the cookie "Manage consent" tab; no skip link observed | reCAPTCHA on contact form | Accessibility widget (bottom-left) + a11y icon; small 19×20 px hamburger flagged by target-size | Skip link; aria-labelled hamburger |

Sources: Lighthouse JSON (`color-contrast.details.items.length`, `image-alt`, failed audit ids), puppeteer computed-style probe and alt counts, 2026-10-21; screenshots `ticqc-iraq-coc-desktop.png` (dark text on red button), `ticqc-home-desktop.png`, `kiwa-home-desktop.png`, `element-home-desktop.png`, `sgs-home-desktop.png`.

### Inferences
- The Iraq CoC page's 204 contrast failures come from one design decision (light grey body copy at 60–70 % opacity on navy) repeated across 4,000 words, so it is a one-line fix in a design system but a page-by-page fix in Elementor.
- An automated score above 90 does not mean a site is usable by keyboard or screen reader; the sites with the best practical accessibility (Element, Kiwa) are the ones that also publish accreditation and location data in plain lists.

### Gaps
- No screen-reader or real keyboard walkthrough was performed (the brief asked for a quick check); menu reachability is inferred from the DOM structure.
- Element was not run through Lighthouse, so its accessibility score is not comparable.
- SGS's computed `outline: none` on focus may be compensated by another visual change (underline or background) that the computed-style read does not capture.

---

## 5. Ranking: which references set the "clean, modern, global" bar for a mid-size firm, what reads as dated, and the common patterns

### Takeaway
On the observed evidence the three sites that best represent an achievable bar for a mid-size TIC company are **Kiwa**, **Element** and **Cotecna** (with SGS as the large-corporate reference and QIMA as runner-up). Each pairs a one-photo or one-video hero with a four-to-six-item header, a single accent colour, one typeface family, sentence-case headings, breadcrumbs and a contact card at the end of every service page, and each shows its own people and labs rather than stock montages. The elements that read as dated in the set are exactly the ones ticqc.ae shares with TÜV SÜD Middle East, TÜV Rheinland UAE, Bureau Veritas Middle East and Verigates: multi-slide carousels, ALL-CAPS headings and menus, animated counters, two-row or nine-item headers, raster logos and generic badge graphics.

### Cited Findings

**Top three (evidence per site)**

1. Kiwa (kiwa.com/en): static hero with own inspectors and descriptive alt text; header 100 px, 5 items + location + search; one accent (`--color-secondary: #80ffca` mint on `#072643` navy); one heading face (Azo Sans) + one body face (Work Sans); 0 uppercase headings; breadcrumb tags on every inner page; every service page ends in a "Receive a quote" bar with phone, Contact us and Get a quote; Lighthouse accessibility 97–100; the only site in the set whose real users pass Core Web Vitals (CrUX LCP 1.1 s); footer organised as Services / Expertise / Group / Social. — `kiwa-home-desktop.png`, `kiwa-iso9001-desktop.png`, `kiwa-contact-desktop.png`, §3 and §4 tables.
2. Element (element.com): header 105 px with 4 items and two clearly ranked buttons (navy Locations, orange Contact us); one accent (`#FF6724` orange on `#0c2242` navy); single typeface (REM) with exposed size tokens; "I'm trying to…" task bar that names the three things a visitor usually wants (industries, accreditations, nearest lab); 0 of 59 images without alt; breadcrumbs; named experts with photos on service pages; a locations page that lists every lab by region; skip link and aria-labelled hamburger. Its one weakness in this set is the autoplay hero video. — `element-home-desktop.png`, `element-testing-desktop.png`, `element-locations-desktop.png`.
3. Cotecna (cotecna.com): the closest business to TIC (government conformity programmes, agri, food, consumer goods) and mid-size; navy/green/blue system with one green CTA; Work Sans throughout; breadcrumb on the GOEIC page; a programme page template that puts "Contact Us – Send us a request" in a right-hand card and a side rail with portal/search/contact; real photos of its own technicians in branded coats; click mega-menu that lists services under each business line with "View all services"; footer with "Certificate Authentication". Weaknesses observed: 44 MB of hero video, 137 px header, CLS 0.26 in the field, caps on buttons, alt text equal to file names, a 404 at /en/contact-us. — `cotecna-home-desktop.png`, `cotecna-goeic-desktop.png`, `cotecna-home-desktop-menu-click.png`.

Why not the others as "the bar": SGS is the cleanest large-corporate template (single typeface Suisse Intl, 65 px header, static hero, click mega-menu with six pillars, a11y 96) but its 2.45 MB of JavaScript, TBT 2.7 s and investor-grade navigation (Investors, Megatrends) are not a mid-size pattern. QIMA has the most contemporary look (warm off-white, rounded pills, data chips) but 10 of 19 images lack alt, TBT is 5 s on mobile, the cookie banner offers only "Allow all", and the hero quietly rotates four slides. TÜV SÜD global is excellent but is a corporate-scale three-level mega-menu. Intertek, TÜV Rheinland, Bureau Veritas, Applus+ and HQTS each carry at least two of the dated markers below.

**Observed elements that read as dated (with where they were seen)**

- Multi-slide hero carousels: TÜV SÜD Middle East (23 slides with arrows and dots), TÜV Rheinland UAE (5 slides, dots), Bureau Veritas ME (rotating news slider with PAUSE), ticqc.ae (12-slide fading background slideshow), QIMA (4 quiet slides). None of Kiwa, SGS, Element, Cotecna, Intertek, TÜV SÜD global rotates its hero.
- ALL-CAPS headings and menus: TÜV SÜD ME 32 of 32 headings; ticqc.ae home 20 of 23 and Oil & Gas 12 of 13; Bureau Veritas ME 9 caps nav items + condensed caps headings; TÜV Rheinland five caps pillars; Applus+ caps nav. Kiwa, Element, QIMA, TÜV SÜD global, Intertek: 0.
- Animated counters: ticqc.ae (200+/900+/10+/10,000+), TÜV SÜD ME (0 → 670,000). No current-generation site in the set shows counters.
- Dense or two-row headers: Verigates 202 px, Cotecna 137 px, TÜV Rheinland 125 px two rows, ticqc.ae 110 px, Applus+ 111 px; HQTS mobile drawer 105 links, TÜV SÜD ME 48.
- Raster logos and generic badge graphics: HQTS `logo-768x147.jpg`, ticqc.ae `Group-2.png` with bitmap tagline; ticqc.ae's green/blue "ISO 14001 CERTIFIED ✓" style badges versus SGS's "Verify Documents, Clients & Products" link, Kiwa's accreditation page link, Element's "Lab Accreditations & Approvals" utility link, QIMA's "Accreditations" and "Report Verification" footer links.
- Stock montage and handshake imagery: ticqc.ae contact (handshake), TÜV Rheinland (engineer/robot/businesswoman composite), Applus+ UAE (mosque), Bureau Veritas (CGI planet). Versus own-staff photography: Kiwa, Element, Cotecna, TÜV SÜD global (selfie), SGS (NDT lab, staff group).
- Fixed-width, non-responsive layout: Verigates (980 px). Text baked into images: TÜV Rheinland Arabic hero with English wording.
- Mixed type systems: ticqc.ae six families (Arial, Roboto, Poppins, Inter, Nunito, system); Applus+ three (Bai Jamjuree, Tahoma, Helvetica); HQTS four. Top three: one or two families.
- Floating widgets that fight each other: ticqc.ae chat bubble over the cookie tab; HQTS chat assistant opening unprompted over the form; TÜV Rheinland Iraq page with both "Assistant" and "Contact" tabs.

**Visual patterns common to the top three (described in words a director can use)**

1. One hero, not a slideshow: a single large photograph (Kiwa, Cotecna's GOEIC page) or one short silent video (Element, Cotecna home) with one headline, one sentence and at most two buttons.
2. A short header: 4–6 words in the menu, one search, one language/location control, one coloured "Contact" button; 60–105 px tall; the logo is a vector (SVG) file.
3. One accent colour on a calm base: navy or near-black plus white, with a single bright accent (mint, orange or green) reserved for buttons and highlighted words; headings in sentence case, never all capitals.
4. One typeface family, sized generously: headings 44–64 px on desktop, body 16–20 px with 1.5 line spacing; the same family on every page.
5. Real people and places: own inspectors, auditors and labs in branded clothing, with written alt text; no handshake or montage stock.
6. Breadcrumbs and a "what next" card on every inner page: breadcrumb line under the header; service pages end with a contact or quote card carrying a phone number and a button.
7. Trust shown as links, not badges: "Verify documents", "Accreditations & approvals", "Certificate authentication", "Complaints & appeals" in the header utility or footer rather than a row of badge images.
8. A locations finder instead of an address wall: "Find your location", "Find a lab near me", "Our offices" lead to a page that lists offices by region.
9. White space and a structured footer: three to four short columns (Services, Industries/Expertise, Company, Legal) plus copyright and privacy links; no address list in the footer.
10. Click-to-open mega-menus organised by what the visitor is looking for (by industry / by service / popular), with a "View all" link, rather than hover dropdowns of raw page names.

### Inferences
- Kiwa is the closest size-and-structure analogue for TIC (a multi-country TIC company with a global site and country sites), which is why its patterns are the most transferable; Element shows the strongest task-oriented navigation; Cotecna shows the most relevant programme-page template.
- The gap between ticqc.ae and the top three is mostly discipline, not budget: a single kit of colours and one typeface, one hero image, sentence case and vector logos are configuration choices that the reference sites made once and applied everywhere.

### Gaps
- Ranking is limited to the twelve sites in the brief plus ticqc.ae; DNV, LR, UL and TÜV NORD (covered in the text notes) were not rendered.
- "Mid-size" is judged from the notes' company descriptions, not from revenue figures.
- Taste was deliberately excluded; the ranking uses only counts and observed features listed above, so a reader who weights, say, video heroes differently could reorder Element and Cotecna.

---

## Summary table (one row per site; homepage unless stated; measured 2026-10-21)

| Site | Palette (how read) | Fonts (how read) | Hero | Header: height / items / mega-menu | Breadcrumb (inner page) | CTA colour and wording | Mobile menu | LH mobile perf (local 12.8.2 / PSI 13.5.0) | Page weight (requests) | CrUX field mobile |
|---|---|---|---|---|---|---|---|---|---|---|
| ticqc.ae | charcoal #252324, red #E42313 / #BC242C, grey #F7F7F7 (page CSS + computed); Elementor kit still default #6EC1E4/#54595F/#7A7A7A/#61CE70 (post-5.css) | Arial H1/H2, Roboto body, Poppins+Inter (Iraq page), Nunito, system (computed; @font-face Roboto/Roboto Slab/Nunito) | 12-slide fading stock slideshow, H1 82 px, no button | 110 px fixed charcoal / 6 / click dropdown list | none | red #BC242C "More news"; Iraq: red #E42313 "Start Registration"; Contact: grey "Send" | hamburger 38 px + flag; charcoal list of 6; no search | 53 / 64 (desktop 75 / 70) | 9.07 MB (112) | No data |
| SGS /en | `--color-primary-1 #ca4300`, `-3 #3c515b`, `-2 #f6f9fc` (root vars) | Suisse Intl (@font-face, computed) | static split image + card | 65 px sticky + utility / 6 / click panel, 6 pillars | no (Egypt page) | orange "Contact", "Send us a message" | hamburger 42 px; bottom bar Search + Contact | 35 / 44 (desktop 65) | 3.14 MB (100) | LCP 5.5 s, INP 224 ms, CLS 0 — failed |
| Intertek | `--bs-primary #ffc700`, `--bs-secondary #06213d`, cyan #21B6D7 (root vars + computed) | NeoSansPro (@font-face) | autoplay video + centred H1 + yellow pill | ~140 px (utility + main) / 4 / not measured | yes (Iraq page, 5 levels) | yellow "Learn more", cyan "Send Us A Request" | logo + search + hamburger | 62 / 75 (desktop 80) | 12.22 MB (97) | LCP 3.2 s, INP 113 ms, CLS 0.01 — failed |
| TÜV SÜD /en (new) | navy #0B253B, mint #02ECA6, blue #0046AD (computed; no brand vars) | TUVSUDPro (@font-face) | static photo (AI-generated, declared) + text | 120 px navy / 6 + portal / click, 3-column | none on home; contact URLs 404 | mint pill "Explore our Business" | search top; "Get in touch" | not run | not run | not run |
| TÜV SÜD /en-ae (old) | blue #0046AD, grey; body falls to Times New Roman (computed) | UniversLTStd-Cn (@font-face) | 23-slide carousel + caps + counters | 102 px + utility / 5 caps + search / — | — | outlined "BOOK ONLINE" | drawer 48 links | not run | not run | not run |
| TÜV Rheinland UAE EN / AR | blue #0071B9 (computed) | Univers LT W02 + Roboto; Calibri on AR (computed) | 5-slide carousel with wave; AR hero has English text in image | 125 px white, two rows / 5 caps pillars / not measured | none on home | blue "Contact" tab, "JOIN US" | SVG hamburger; 32-link drawer; AR overflows horizontally | not run | not run | not run |
| Bureau Veritas ME | `--primary #00049e`, `--secondary #333333` (root vars) | BureauVeritas condensed display + Source Sans Pro (@font-face) | full-screen news slider with PAUSE | 50 px bar + 9 caps items / click panel | yes ("Home – Your needs") | blue caps "READ MORE" | search icon left; drawer not captured | not run | not run | not run |
| Verigates | blue #00049E, beige, Arial (computed) | Arial only | 3-slide banner, 980 px fixed | 202 px / 4 tabs / none | none | blue "CONTINUE", "Access to My Account" | not responsive | not run | not run | not run |
| Kiwa /en | `--color-primary #0054c5`, `-darkest #072643`, `--color-secondary #80ffca` (root vars) | Azo Sans + Work Sans (@font-face) | static own-staff photo + navy panel | 100 px white / 5 + location + search / click panel | yes (mint tags) | mint pill "Get a quote", white "Find your location" | hamburger 19 px (small); location drawer | 48 / 57 (desktop 78) | 2.09 MB (131) | LCP 1.1 s, CLS 0.01 — **passed** |
| Element | `--primary-elementdarkerblue #0c2242`, `--primary-elementmidblue #0095c8`, orange #FF6724 (root vars + computed) | REM (@font-face) | autoplay video + framed H1 + task bar | 105 px sticky / 4 + Locations + Contact + Search / not measured | yes ("Home / Testing Services") | orange "CONTACT US", "Talk to our team of experts" | hamburger 32 px aria-labelled; 20-link drawer; search top | not run | not run | not run |
| Cotecna | navy #040450, green #00BA80, blue #00008D (computed) | Work Sans + Montserrat (computed) | autoplay video + green highlight words | 137 px fixed navy / 5 + Contact / click, multi-column | yes (5 levels on GOEIC) | green "CONTACT US", "SEND US A REQUEST" | hamburger; drawer with search field | 43 / 52 (desktop 64) | 51.62 MB (111) | LCP 3.8 s, INP 140 ms, CLS 0.26 — failed |
| QIMA | `--brand-color-primary 228 0 43` (#E4002B), navy 2 20 52, teal (root vars) | Figtree + Inter + DM Mono (@font-face) | static two-column, 4-slide quiet photo carousel with data chips | 75 px fixed white / 5 + Sign In + Contact / hover | none observed | red pill "Talk to an expert" | not captured | 44 / 65 (desktop 53) | 3.56 MB (89) | LCP 3.6 s, INP 225 ms, CLS 0 — failed |
| HQTS | red #C61825, dark grey #383431 (computed; WP/Elementor) | Roboto + Open Sans + Hind (computed) | autoplay video (10.9 MB) + sticky contact bar + chat pop-up | 90 px white / 6 + flag + 4 social / hover | yes (Iraq page) | red "Services", "Contact HQTS now" | 72×40 toggle; 105-link drawer | 42 / 46 (desktop 64) | 13.92 MB (154) | LCP 5.7 s, CLS 0.01 — failed |
| Applus+ UAE | orange #FF6900, dark grey #323234 (computed) | Bai Jamjuree + Tahoma (computed) | one static location photo + "What we do" panel | 111 px fixed white / 4 caps + Contact / not measured | yes (Iraq sheet) | orange "CONTACT US", "GET A QUOTE" | 67×70 toggle | not run | not run | not run |

---

## URLs visited and status (2026-10-21/22)

Rendered with headless Chrome (status = HTTP status of the main document; "304" = served from cache on the second pass):

- https://ticqc.ae/ — 200; https://ticqc.ae/oil-gas/ — 200; https://ticqc.ae/iraq-coc/ — 200; https://ticqc.ae/contact/ — 200; https://ticqc.ae/wp-content/uploads/elementor/css/post-5.css, post-10.css, post-61.css, post-71.css, global.css — 200 (curl).
- https://www.sgs.com/en — 200; https://www.sgs.com/en-ae — 200; https://www.sgs.com/en/services/egypt-product-conformity-assessment-pca — 200; https://www.sgs.com/en/contact-us — 404; https://www.sgs.com/en/contact-form — 200.
- https://www.intertek.com/ — 200; https://www.intertek.com/government/product-conformity/exports-to-iraq/ — 200; https://www.intertek.com/contact/ — 200.
- https://www.tuvsud.com/en — 200 (Cloudflare challenge passed with a normal browser UA; curl gets 403); https://www.tuvsud.com/en-ae — 200; https://www.tuvsud.com/en/contact — 404; https://www.tuvsud.com/en/contact-us — 200 in headless but rendered the site's 404 template earlier at /en/contact (contact content not captured).
- https://www.tuv.com/united-arab-emirates/en/ — 200; https://www.tuv.com/united-arab-emirates/ar/ — 200; https://www.tuv.com/landingpage/en/government-inspections-international-trade/navigation/pvoc/exporting-to-the-middle-east/iraq-icigi/ — 200.
- https://middle-east.bureauveritas.com/ — 200; https://middle-east.bureauveritas.com/your-needs/inspection — 200; https://middle-east.bureauveritas.com/contact-ustwasl-mna — 200.
- https://verigates.bureauveritas.com/ — 200; https://verigates.bureauveritas.com/sub-programme/iraq-voc?id=49 — 200.
- https://www.kiwa.com/en/ — 200; https://www.kiwa.com/en/services/certification/iso-9001-quality-management-systems-certification/ — 200; https://www.kiwa.com/en/contact/ — 200.
- https://www.element.com/ — 200; https://www.element.com/our-services/testing-services — 200; https://www.element.com/locations — 200 (redirects to ?region=All).
- https://www.cotecna.com/ — 200 (→ /en); https://cotecna.com/en/services/verification-of-conformity/egypt/goeic — 200 (→ www); https://www.cotecna.com/en/contact-us — 404.
- https://www.qima.com/ — 200; https://www.qima.com/contact — 200 (→ /contact-us).
- https://www.hqts.com/ — 200; https://www.hqts.com/services/iraq-certificate-of-conformity/ — 200 (→ /our-services/iraq-certificate-of-conformity/).
- https://www.applus.com/ae/en/ — 200 (desktop probe interrupted by a client-side navigation; screenshots captured); https://www.applus.com/ae/en/what-we-do/service-sheet/certificate-of-conformity---iraq — 200.
- PageSpeed Insights: https://pagespeed.web.dev/analysis?url=… for ticqc.ae (mobile and desktop), sgs.com/en, intertek.com, kiwa.com/en, cotecna.com, hqts.com, qima.com — all completed; the Google PSI API itself was not used (quota exhausted earlier in the day, HTTP 429).

Screenshot index (all under `screenshots/visual-design-benchmark/`): for each page name above, `<name>-desktop.png`, `<name>-desktop-firstview.png`, `<name>-desktop-full.png`, `<name>-mobile.png`, `<name>-mobile-firstview.png`, `<name>-mobile-full.png`; plus `ticqc-home-desktop-menu-click.png`, `ticqc-home-mobile-menu-open.png`, `ticqc-home-desktop-footer.png`, `ticqc-home-desktop-counters-industries.png`, `ticqc-contact-desktop-form.png`, `sgs-home-desktop-menu-click.png`, `sgs-ae-home-desktop-menu-click.png`, `sgs-home-mobile-menu-open.png`, `tuvsud-home-desktop-menu-click.png`, `tuvsud-home-mobile-menu-open.png`, `tuvsud-ae-home-mobile-menu-open.png`, `tuv-ae-home-en-mobile-menu-open.png`, `tuv-ae-home-ar-mobile-menu-open.png`, `bv-me-home-desktop-menu-click.png`, `bv-me-home-mobile-menu-open.png`, `kiwa-home-desktop-menu-click.png`, `kiwa-home-mobile-menu-open.png` (location drawer), `element-home-mobile-menu-open.png`, `cotecna-home-desktop-menu-click.png`, `cotecna-home-mobile-menu-open.png`, `qima-home-desktop-menu-hover.png`, `hqts-home-desktop-menu-hover.png`, `hqts-home-mobile-menu-open.png`, `applus-ae-home-mobile-menu-open.png`. Raw Lighthouse JSON and the probe results (`bench-results.json`, `lh-summary.json`) are in the session scratchpad and can be copied into the project folder on request.
