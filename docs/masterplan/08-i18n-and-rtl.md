<!-- TIC Website — Engineering Master Plan, part 08 of 16. -->

# 08 Multilingual content and RTL

English is the base and the only required language. Arabic is the first full second language (proposal A-04). Any other language is a locale switched on only when an office requests it and names a reviewer (03 §9); nothing is built for it in advance except that the site is built so switching it on is a day's work.

## Mechanics (the core already does this)

- wagtail-localize; one URL per language: `/en/…`, `/ar/…`; `/` → 301 `/en/`. Language from the URL only, never from the visitor's location. A visible `<select>` in the utility bar, English selected by default (settled design decision).
- Every page declares `lang`; Arabic pages declare `dir="rtl"`; layout mirrors through logical CSS properties (the drop already uses `inset-inline`-safe patterns; the Arabic home file shows the result).
- Fonts: Saira and Open Sans for Latin, Cairo for Arabic, self-hosted, split by script, `font-display: swap` (D7). Noto families for Hindi or Chinese are added only with the request.
- Western digits everywhere; certificate numbers, phone numbers and product codes wrapped in `<bdi>` so they never flip inside an RTL sentence.
- Only direction-bearing icons mirror (arrows, next/back, the triangle marker). The logo never mirrors, and the tagline band image is the same file in both directions.
- hreflang: reciprocal tags listing every live language of the page including its own, plus `x-default` = English; from the core SEO tag.

## What is translated and when

**The frame first** (before the first Arabic page goes live): header, footer, menus, consent banner, form labels, validation and confirmation messages, the sent screen, auto-reply emails, 404, search. All in `locale/ar` and the core's own catalogues; a test asserts every msgid the visitor can see has an `ar` msgstr (as Zeneonix D38).

**Arabic-first pages** (V1, D1): Verify (page and result), office pages for Baghdad, Cairo, Amman, Riyadh, Dubai, Sharjah, Complaints and appeals, Impartiality, Privacy, About and the accreditations table, then the Iraq, Kurdistan Region and Egypt program pages. Then the rest page by page as the reviewer has capacity (Phase 2).

**Workflow** (03 §5.4): English page marked ready → machine draft in Arabic through the core translation sheet → the Translator for Arabic corrects it → the requesting office's Reviewer signs off → publish. The English page shows which translations are current and which are behind (wagtail-localize sync status surfaced in the admin list).

**Terms:** before any Arabic program page is written, Baghdad and Cairo supply the Arabic terms their clients and regulators use (P-5). Until then `seed/ar.yaml` carries drafts marked `draft: true`, rendered with no visible mark on staging but listed in the admin's "drafts awaiting review" report.

**Company name in Arabic:** تي آي سي لمراقبة الجودة, as in the Arabic home mockup, until the brand owner says otherwise; the Latin "TIC" stays Latin inside Arabic text where it is a mark (the proof strip, the logo).

## Content model implications

Snippets that carry text (`Accreditation` status words, `Person` titles, `Document` titles, `Figure` labels) are translatable; records that are data (`Certificate`, `RoutingRule`, `Lookup`) are not. Status words on certificates and programs are rendered from choice labels, so they translate through the catalogue, never through data.
