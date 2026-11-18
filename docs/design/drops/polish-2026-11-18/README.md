# Design drop — Round 3, polish (Nov 18, 2026)

Answer to the polish brief (`../../briefs/polish-2026-11/README.md`, T37, D69). Source: the Claude Design canvas "TIC Website Mockups", page "Round 3 — polish (Nov 2026)". One `.dc.html` per artboard, as in the first drop. Take the markup and the CSS; drop the `<x-dc>` wrapper and the `data-dc-script` block.

Read `R3-Rules.dc.html` first. It is the specification: photo jobs, slots and crops, first screen, empty places, thin pages.

## What changed

1. **Page head (`.ph`).** The text is beside the photo, never on it. Grid of four columns: side, text (493 px), photo (627 px + the side, so it bleeds to the edge), side. Under 860 px: the photo first at 3:2, then the text. `.ph.hero` is the home variant (540/580, 520 px high, two buttons). `.ph.band` is the head without a photo.
2. **Facts bar (`.fb`)** under the head of a service, industry, program, office and About page: four fixed cells per page type. On the home page the proof strip uses the same part.
3. **Jump row (`.jump`)** under the head of a hub: links to every group or country on the page.
4. **Header (`R3-Header`).** One row: logo, menu, Request a quote. 115 px high (was 190). The company name beside the logo is removed (keep it as visually hidden text). Phone: the utility bar is one row; Client area moves into the menu.
5. **Empty photo places.** Card grids are all photos or all text cards (`.tcard`). Program cards are country tiles (`.ct`), no photo. The map is the address plate (`.addr`). An empty office, team or person photo is not drawn. A section with nothing to list is not drawn.
6. **Thin pages.** See `R3-Industry-Marine.dc.html` and rule 5 on the rules board.

## Files

| File | Use |
| --- | --- |
| `R3-Rules.dc.html` | The rules. Not a page of the site. |
| `R3-Head-Desktop.dc.html`, `R3-Head-AR.dc.html` | The head in five cases and in Arabic. Not pages of the site. |
| `R3-Tested-Plate.dc.html` | The translucent plate, tested and not taken, with the reasons. |
| `R3-Header.dc.html`, `R3-CTABand.dc.html`, `R3-Footer.dc.html` | Shared parts. Footer and contact band: only the phone rules changed. |
| `R3-Home`, `R3-Services`, `R3-Service-PSI`, `R3-Industry-Marine`, `R3-Programs`, `R3-Program-Iraq`, `R3-Office-Dubai`, `R3-About` | The eight redrawn pages. The phone boards on the canvas are the same markup at 390 px. |

The body of `R3-Service-PSI` and `R3-Program-Iraq` is the round-1 body. Only the head, the facts bar and the empty places changed there.

## Notes for the build

- The drop uses **container queries** (`@container`, `cqw`) at 860 px and 1180 px so the phone boards can sit on the canvas. On the site, use the same rules as media queries (`vw` in place of `cqw`), or keep them.
- All new rules use logical properties. Arabic needs no extra rule (see `R3-Head-AR`).
- Photo position: `object-position` on `.ph-im img` comes from the Wagtail focal point. In the drop it is written by hand.
- Photos in the drop are `/_blob/<id>` addresses of the canvas. They are the old-site photos of `seed/old-photos.json`: home (MARINE-scaled-2), services (services-header-scaled-1), inspection (NDT-scaled-1), PSI (Testing_CommoditiesConsumer-Products), marine (20799bbe…-scaled), programs (2024/07/2.jpg), Iraq CoC (Iraq-CoC.png), about (2024/07/4.jpg), and Energy-4-scaled-1 for the photo-card example.
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
- Dubai office: a stock skyline. Needed: the building or the street, and the team.
