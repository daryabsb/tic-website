# Staging review, Nov 22, 2026: the information TIC still owes

Darya hands staging to the directors and the office managers. This folder is the record
of what they were asked.

- `TIC-website-information-we-need.docx`: the file sent with the email. 590 items in 23
  parts: parts 1 to 14 are the offices, parts 15 to 23 the departments. Each row has a
  number (for example `CAI-03`), the page, what the site shows now, what is needed, and an
  empty answer column.
- `gaps.md`: the same list as plain text.

The list was made two times on Nov 22: before and after the text of the current site
(ticqc.ae) was moved into the new pages (T43, D82; `docs/current-site/`). This folder
holds the second list. The first had 539 rows; 30 of them were empty draft pages that
are full now. The second has more rows for the programs: three new program pages bring
facts that a director must confirm.

## How the list was made

1. A read-only scan of the staging database and of every rendered English page (142
   pages after the move: 135 live, 7 drafts): every text in square brackets, every empty
   photo place, every sample photo caption, the people, accreditation, download and
   routing rows.
2. Review agents, one per site section (offices, about and trust, services and training,
   industries, programs and home, news), read the page texts for the gaps that are not in
   brackets: missing facts, facts nobody confirmed, conflicts between pages, draft pages,
   text faults. After the move, the three sections that changed were read again, with the
   claims of the current site that no public register supports as "To confirm" rows.
3. Rows that ask the same thing for many pages are one row in a department part. A
   placeholder row of the first list whose placeholder is gone is dropped (4 rows).

Photos were judged from their alt texts and captions, not from the pictures.

## Site faults the review found (corrected: PR #106 and the PR of this list)

- The English Baghdad page listed the Iraq program two times (English and Arabic page).
- The red contact band said "WhatsApp" on pages with no WhatsApp (Guangzhou, D11).
- The contents list of an article showed `&amp;` for `&`.
- The Iraq checklist kept its placeholder row on staging: the seed tool `refresh_parts`
  counted the brackets of the stored list form as placeholders.

Left for Darya to decide: the time zone cell shows the technical name (for example
`America/Sao_Paulo`); the sentence "This article is general information…" shows under
every article, also under event reports.

## Changed after the second list (Nov 22, evening)

- The 35 empty photo places are filled (D86). PRG-100 now names the event photo.
- New row MKT-82: the 15 pages with sample stock photos. 590 items.

## Changed before the email (Nov 26)

- The list names no language. Each office "Languages" row (14 rows) now also asks: if
  your clients need the website in another language, name the language.
- MKT-19 asks for the brochure "in other languages", not in named languages.
- BGW-15 stays as it is: it asks for the Iraq product-label rules, not for a website language.
- Email part 6 is now "Other languages": any office can ask for a language. Darya talks
  to each office head about the languages later.
