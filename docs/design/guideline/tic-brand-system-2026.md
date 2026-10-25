# TIC Brand System 2026 — what was built and where it lives (21 Oct 2026)

**Location on Darya's PC:** `I:\ARCHIVE\Darya-IK Files Backup\Desktop Items\LOX LOGO\Alpha\Tic New Branding\00 - TIC Brand System 2026\` (+ `00 - TIC Brand System 2026.zip` beside it, 66 MB, for sending to offices). Older folders in `Tic New Branding` are pre-2026 reference. `_to_delete - old v1 (redrawn logo)` holds superseded versions (v1 redrew the logo, v2 predates the approved-letterhead inheritance) — delete it.

## Standing rules (from Darya, 21 Oct 2026)
1. **The logo is NOT to be changed.** The kit packages the original `Logo/Tic Logo - 24.04.24.pdf` artwork; derived versions only recolour its paths.
2. **Everything inherits from the CEO-approved letterhead** `Tic Offices/Main Office/TIC Letterhead - V01 - 26.02.23` (.ai/.docx/.pdf/.png) so nothing needs a new approval. Its elements: logo top-left (88.7 pt wide at 30.4/21 pt), "TIC QUALITY CONTROL" right-aligned in Helvetica Neue Bold 19 pt #414142 tracked 5 %, red rule #EE3123 (1.84 pt) under the header, dotted world-map watermark, footer = bold address line / red rule / contact line (Myriad Pro, #414142), and the tagline band at the bottom edge: black block 32.3 % with "T I C", red block with a **radial "shiny red" gradient #EB232B centre → #BD2130 edge** and "TESTING | INSPECTION | CERTIFICATION" (Myriad, tracked caps). Fixed vs dynamic: address line, phone and local legal name are the only per-office variables.
3. Office letterheads (KSA V02 26.10.14 is the latest, with the shiny red; Jordan, Egypt, Iraq, Sri Lanka, Brazil) live in `Tic Offices/<office>/` and are copied into the kit's `05 Stationery/Letterhead/Offices`.

## How the kit implements it
- `ticorig.py` = original logo SVG → 5 versions × 4 schemes × SVG/PDF/PNG. `ticlh.py` = approved letterhead elements lifted from the .ai (converted to SVG): `header()`, `footer()`, `band(width,height)`, `map_svg()`, `letterhead_svg()`. Company name in generated vector files is TeX Gyre Heros Bold (Helvetica clone; Helvetica Neue not redistributable).
- Colours: TIC Red #EE3124 (Pantone 485 C), Charcoal **#414142** (letterhead text grey), Band Red centre #EB232B / edge #BD2130, TIC Black #111111, Steel #A7A9AC (flat equivalent of the logo silver), Body Grey #6B6B6B, Hairline #D9D9D9, Light Grey #F3F3F3. The only gradient allowed is the band's.
- Type: Saira (headings) + Open Sans (body) for documents/slides/web, as in the 2026 brochures; Helvetica Neue Bold and Myriad Pro exist only inside the approved artwork.
- Deliverables: `01 Brand Guidelines` (25-page PDF + 1-page Quick Rules PDF/DOCX), `02 Logo`, `03 Colours` (ASE/GPL/CSS/JSON), `04 Typography`, `05 Stationery` (approved letterhead master + offices, new-office SVG, business card, envelopes, email signature, Zoom, social, report cover, tape & sticker), `06 PowerPoint` (.potx, 14 layouts, approved band on the master, sample deck), `07 Source (generators)`.

## Open items
- Pantone 485 C vs printed swatch before next print run.
- Vector accreditation logos (ANAB, EIAC, EGAC, TIC Council, ISO) still needed.
- Fonts are referenced, not embedded, in Office templates — staff must install them.
- LOX is excluded; would need its own kit.
