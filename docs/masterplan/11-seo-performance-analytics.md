<!-- TIC Website — Engineering Master Plan, part 11 of 16. -->

# 11 SEO, performance and analytics

The India office's September blueprint is the search-engine chapter of this project; the parts it settles are carried here with credit, adjusted where the research corrected them (hreflang only between a page's own translations; no fixed word count).

## SEO (the core SEO tag does most of it)

- Titles `<Page> — TIC Quality Control`; Home shows its own; a title that already holds the company name gets no suffix (as Zeneonix D34). Meta descriptions fall back to the page's own intro.
- Canonical and reciprocal hreflang per language (08); `x-default` = English; sitemaps per language from Wagtail; `robots.txt` with the admin and private paths disallowed.
- Breadcrumb trail on every inner page (the small "you are here" line in the page header), with `BreadcrumbList` JSON-LD.
- JSON-LD: `Organization` with the head-office address, the accreditation numbers as `hasCredential`, the fourteen offices as `location`; `Service` per service page; `GovernmentService`-style description on program pages is **not** used (TIC is not the government) — plain `Service` with the regulator named in text; `Article` per news/insight with the named author; `FAQPage` on pages with a `qa` block; `Course` on course pages.
- Named authors on insights and updates (blueprint); "last updated" dates visible and in `dateModified`.
- Images: one lightweight hero per page under 100 KB (blueprint rule, enforced by the rendition), descriptive alt text required.
- Search Console on both hostnames; the redirect map (10) keeps rankings through the move.

## Performance

Targets: Core Web Vitals "good" at the 75th percentile on mobile — LCP 2.5 s, INP 200 ms, CLS 0.1 (03 §11.4). Design rules that get there are already in the drop: one static hero in WebP, no carousels, no animated counters, no web-font flashes (self-hosted, `swap`, split by script), JavaScript only where a feature needs it (HTMX on forms and verify, the upload module). The core's page cache and Cloudflare's HTML cache rule (bypass on cookie and on `/verify/`, `/requests/`, `/admin/`) serve public pages from the edge. Lighthouse runs by hand on staging at gate 1 and gate 4 and the numbers are written in DECISIONS (as Zeneonix D10); no CI step in V1.

The one lesson from the old site that the templates enforce: the home page today weighs 9 MB, 8.3 MB of it images. The new home page budget is 600 KB on first view.

## Analytics and consent (03 §11.6, §12)

- Self-hosted Umami on the platform, served from a first-party path, loaded only after consent, no cookies before consent. No Google Tag Manager or Analytics anywhere (China rule and privacy).
- Consent banner from the core: decline by default for non-essential; the banner and the privacy policy are part of the frame (translated with it).
- Events worth counting, and nothing else: quote requests sent (by office, by service group), certificate lookups (found / not found), WhatsApp clicks (by office), downloads (by document), language switch. The Requests admin already holds the request figures; Umami holds the rest.
- Search Console's Core Web Vitals report is the field-data source once the site has traffic; until then Lighthouse on staging.
