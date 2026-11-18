# Design drop — Round 3, polish (Nov 18, 2026)

Answer to the polish brief (`../../briefs/polish-2026-11/README.md`, T37, D69). Source: the Claude Design canvas "TIC Website Mockups", page "Round 3 — polish (Nov 2026)". One `.dc.html` per artboard, as in the first drop. Take the markup and the CSS; drop the `<x-dc>` wrapper and the `data-dc-script` block.

Read `R3-Rules.dc.html` first. It is the specification: photo jobs, slots and crops, first screen, empty places, thin pages.

## What changed

1. **Page head (`.ph`).** The text is beside the photo, never on it. Grid of four columns: side, text (493 px), photo (627 px + the side, so it bleeds to the edge), side. Under 860 px: the photo first at 3:2, then the text. `.ph.hero` is the home variant (540/580, 520 px high, two buttons). `.ph.band` is the head without a photo.
2. **Facts bar (`.fb`)** under the head of a service, industry, program, office and About page: four fixed cells per page type. On the home page the proof strip uses the same part.
3. **Jump row (`.jump`)** under the head of a hub: links to every group or country on the page.
4. **Header (`R3-Header`).** One row: logo, menu, Request a quote. 115 px high (was 190). The company name beside the logo is removed (keep it as visually hidden text). Phone: the utility bar is one row; Client area moves into the menu.
5. **Empty photo places.** Card grids are all photos or all text cards (`.tcard`). Program cards are country tiles (`.ct`), no photo. The map on an office page is the address plate (`.addr`). The home "Where we are" block shows the head-office photo with the office list beside it. An empty office, team or person photo is not drawn. A section with nothing to list is not drawn.
6. **Thin pages.** See `R3-Industry-Marine.dc.html` and rule 5 on the rules board.

## Files

| File | Use |
| --- | --- |
| `R3-Rules.dc.html` | The rules. Not a page of the site. |
| `R3-Head-Desktop.dc.html`, `R3-Head-AR.dc.html` | The head in five cases and in Arabic. Not pages of the site. |
| `R3-Article.dc.html` | The article head: title first, then the photo at 16:9 in the text column. |
| `R3-Tested-Plate.dc.html` | The translucent plate, tested and not taken, with the reasons. |
| `R3-Header.dc.html`, `R3-CTABand.dc.html`, `R3-Footer.dc.html` | Shared parts. Footer and contact band: only the phone rules changed. |
| `R3-Home`, `R3-Services`, `R3-Service-PSI`, `R3-Industry-Marine`, `R3-Programs`, `R3-Program-Iraq`, `R3-Office-Dubai`, `R3-About` | The eight redrawn pages. The phone boards on the canvas are the same markup at 390 px. |

The body of `R3-Service-PSI` and `R3-Program-Iraq` is the round-1 body. Only the head, the facts bar and the empty places changed there.

## Notes for the build

- The drop uses **container queries** (`@container`, `cqw`) at 860 px and 1180 px so the phone boards can sit on the canvas. On the site, use the same rules as media queries (`vw` in place of `cqw`), or keep them.
- All new rules use logical properties. Arabic needs no extra rule (see `R3-Head-AR`).
- Photo position: `object-position` on `.ph-im img` comes from the Wagtail focal point. In the drop it is written by hand.
- Photos in the drop are `/_blob/<id>` addresses of the canvas. They are the old-site photos of `seed/old-photos.json`: home (MARINE-scaled-2), services (services-header-scaled-1), inspection (NDT-scaled-1), PSI (Testing_CommoditiesConsumer-Products), marine (20799bbe…-scaled), programs (2024/07/2.jpg), Iraq CoC (Iraq-CoC.png), about (2024/07/4.jpg), and Energy-4-scaled-1 for the photo-card example.
- **Dubai photo:** `photos/dubai-business-bay.jpg` (from Darya, Nov 18: Business Bay, the district of the head office). It is the Dubai office head photo and the home "Where we are" photo, caption "Dubai · Business Bay", focal point centre. Its source and licence are not known yet: treat it as a staging photo (D68: keep it with the stock files on stms-data, not in git) until Darya says where it is from.
- Classes renamed from round 1 where they met the old CSS: key/value rows are `.kv` (old pages: `.row`), section padding is `.sect`, small grey text is `.small`.

## Decisions the engineer writes as D-rows (the designer proposes)

1. The intro in a head is 160 characters at most; longer text is the first paragraph of the body. This needs a validation rule or a second field.
2. The four facts-bar cells per page type (see rule 3 on the rules board). A cell without a value keeps its bracket.
3. Card grids: all or none (rule 4.1).
4. A section with nothing to list is not rendered (home "Regulatory updates and news" today shows "No updates published yet.").
5. The header loses the company name beside the logo.

## Photos to replace (photo job not done)

- Programs hub: a meeting room. Needed: goods at a border, a port or a customs yard.
- Iraq CoC: a ship with a carrier's name. Needed: the destination and the goods; no third-party name.
- Dubai office: the head now uses Darya's Business Bay photo. Still needed: Clover Bay Tower itself, and the team.

## Answers to the gaps on #90 (designer, Nov 18)

**1. Page types without a drawn head (T38).** Decided on the rules board, part 6. One rule: a page type with a photo field uses the photo head when the photo is there and the band head when it is not.

| Page type | Head | Under the head |
| --- | --- | --- |
| Hubs: Services, Industries, Programs | Photo head | Jump row (groups, the eight industries, countries) |
| Hub: Our offices | Photo head when a photo does the job; band head until then | No jump row |
| About | Photo head | Facts bar |
| Service group (Inspection…) | Photo head with one link to the list (drawn: `R3-Head-Desktop`, case 2) | Nothing |
| Service, industry, program, office | Photo head with the action | Facts bar |
| Careers | Photo head with "See open roles" | Nothing |
| Article | The article head, new: `R3-Article.dc.html` (not the split head) | The text |
| Contact | Band head with WhatsApp and Call | Facts bar: phone, email, opening hours, reply promise |
| Verify | Band head, title and one line | The form at once |
| Complaints | Band head with "Make a complaint" | Nothing |
| Search, 404 | Band head (search: the field is in the head) | Nothing |
| News index, regulatory updates, resources, downloads, questions, training | Band head | The filters, where the page has them |
| Leadership, group, accreditations, policy pages | Band head | Nothing |

The engineer's proposal is accepted with three changes: the article has its own head; service group, careers and the offices hub can have a photo; contact has a facts bar. No more boards are needed: every case is the photo head, the band head or the article head.

**2. Facts bar cells (T39).** Rules board, part 7.

- Service: Where · On site · Report · Standards (fields).
- Industry: Services · Programs · Where · Contact. Services and Programs are counted from the linked pages ("5 surveys", "Iraq, Egypt"); Where and Contact are fields.
- Program: Regulator · Appointed · Status · Office. Office: Phone and WhatsApp · Email · Opening hours · Languages. About: Founded · Addresses · Accredited · Programs. Contact: Phone · Email · Opening hours · Reply promise.
- A counted cell with nothing to count is not drawn; the bar then has three cells (`.fb.c3`; `R3-Industry-Marine` is redrawn so). A field cell without a value keeps its bracket.
- The service group page has no facts bar and no jump row.

**3. Arabic.** No more Arabic boards are needed: every new rule uses logical properties, and `R3-Head-AR` shows the result. Proposal for the check (the engineer and Darya decide): the "done when" of T38–T41 is English at 1440 and 390, plus one look at the same templates under `dir="rtl"` on any Arabic page of staging, with the English text if the Arabic text is not there. Real Arabic pages stay with T29.

**4. Dubai photo.** Open with Darya: source and licence not known. Staging only until he answers.
