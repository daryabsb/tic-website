<!-- TIC Website — Engineering Master Plan, part 10 of 16. -->

# 10 Migration, redirects and the domain

The current site (ticqc.ae) stays up and untouched by this repo until launch day. Two interim security fixes on it (supported PHP, hidden user listing) are proposal D-04 and belong to IT. Everything else about the old site is input: its URL list, its 34 posts, its downloads and its images.

## Domain (P-1)

The brand book prints www.ticqc.com; the live site is ticqc.ae. The build reads the production hostname from one setting (`SITE_HOSTNAME`) used by canonical tags, hreflang, sitemaps, the QR URL and emails, so the choice can land as late as gate 4. Whichever is chosen, the other 301s to it host-wide, and both are verified in Search Console. `www` redirects to the apex. DNS stays at Cloudflare (or moves there before launch: proxy on, origin certificate, cache rule for HTML, Access policy for `/admin/`).

## Redirect map

`seed/redirects.csv` (old path → new page) loaded into Wagtail's `redirects` by `seed_site`. The source is the current-site audit in `../research/` (every public URL of ticqc.ae, 21 Oct 2026) mapped to the new tree:

| Old | New |
| --- | --- |
| `/` | `/en/` |
| GSP / Government Services Programs page | `/en/programs/` |
| the three Iraq pages and the Gujarat landing page | `/en/programs/iraq-certificate-of-conformity/` |
| Egypt, Botswana, Libya, SFDA pages | their program pages (SFDA → the programs index) |
| Food, Agri, Commodities, Oil & Gas, Marine, Vehicle pages | the matching industry page |
| Testing sub-pages, product pages (noodles, tiles, cosmetics…) | the matching service page, or the service group where no page exists yet |
| Halal, CSUAS, NDT, Sustainability, Training, Webinar | their service or course pages |
| About, Contact, News posts (34, two with emoji addresses) | `/en/about/`, `/en/contact/`, `/en/news/<slug>/` |
| broken verification link | `/en/verify/` |
| anything unmapped | 404 page with search and the four most-visited entries (`B-404.dc.html`) |

Rule: every old URL that had traffic in the last 12 months (Search Console export, requested from whoever holds the account) gets a row; others fall to the 404 page. The 404 page logs misses to the Wagtail redirects "unmatched" report for the first month after launch so missing rows are added.

## Content migration

- **News:** the 34 posts imported by `import_old_news` from an export of the old site (HTML scrape of the public pages if no export exists), as `NewsPage` kind = news, with their original dates, a named author where one exists, and the one image per post resized. Addresses with emoji get clean slugs and a redirect row.
- **Downloads:** the Halal (~19 files) and CSUAS (16) files become `Document` snippets with version, date and owner (the owner supplies them; files without an owner are not published).
- **Program content:** the Iraq page's 23 questions, the Gujarat page's 10, the Botswana product table (fixed), the Libya fee, the COSQC letter (as PDF, not image) go into `seed/en.yaml` as the program pages' content.
- **Images:** nothing from the old site is reused on hero positions (brand rule: real photographs of inspectors; the old images are stock). Program and office photos arrive through the inventory form.
- **Accounts:** none migrated; the five old accounts and the shared "TIC" user end with the old site.

## Cut-over (launch day, 15)

Lower DNS TTL a day before; final export and import of news; freeze the old site; point the hostname at the new stack (Cloudflare origin change); verify the redirect map against the old URL list with lychee; submit the new sitemap; keep the old host alive on a hidden hostname for 30 days for comparison, then switch it off.
