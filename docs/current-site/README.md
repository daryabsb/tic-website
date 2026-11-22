# The current site (ticqc.ae) and the new site

Darya, Nov 22, 2026 (D82): the data of the current site is true and genuine. It moves
into the new site wherever the new site was empty.

- `inventory.md`: each of the 56 current pages, what it holds, the new page that takes it,
  and its state. Below the table: content with no home yet, and what the current site
  does not have.
- `facts.json`: 92 single facts of the current site (phones, addresses, program facts,
  careers text) with the open item they answer and the source quote; 13 are conflicts
  with the new site.
- `left-out-and-to-confirm.md`: what the moved pages leave out, and the claims a director
  must confirm.

## Where the moved text is

| Seed file | Content | Source |
| --- | --- | --- |
| `seed/service-pages.yaml` | 16 service pages; intro and "how" points of four group pages | 20 current pages |
| `seed/courses.yaml` | the ten courses | the ten course pages |
| `seed/industry-pages.yaml` | seven industry pages | oil and gas, marine, commodities, vehicles and others |
| `seed/program-pages.yaml` | Egypt, Botswana, Libya; Saudi Arabia SFDA held | the four program pages |
| `seed/current-pages.json` | 15 articles (kind "insight"): 13 product pages, 2 Iraq pages | `scripts/build_current_pages.py` |
| `seed/replaced.yaml` | three texts that take the place of an earlier seed text | about, training, testing |

How the text was taken: `scripts/fetch_old_pages.py` reads the public pages on stms-data
(`~/tic/old-site/pages/`). Load on a stack: `manage.py seed_site`, then
`manage.py import_old_news --source seed/current-pages.json --publish`.

## Rules of the move

- Only the current site's content. A part it has no text for is empty; the page does not
  draw an empty part.
- House words: "TIC Quality Control", then "TIC"; never "TICQC" or "TIC QC"; "program".
- Register words: ISO/IEC 17020 is an accreditation (ANAB AI-3314); with GOEIC, TIC is
  registered (record 73). The current site says "appointed by GOEIC".
- Four services have no text on the current site and stay drafts: GAFTA superintendence,
  non-destructive testing, management system certification, social and ethical audits.
