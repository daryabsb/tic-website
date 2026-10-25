# TIC Website — Design Brief

Oct 25, 2026 · Darya Ibrahim. The design is done: Direction B ("Field") was chosen on 25 Oct from three directions, and every page type is drawn. This brief records what the design follows, where it lives, and the decisions that are settled, so the engineer and any later designer do not reopen them.

## Where the design is

- **Live canvas (the source):** Claude Design canvas "TIC Website Mockups" — https://claude.ai/artifact/DmCTbpzgmqJ9zhrkJkQs9Y — nine canvas pages: 1 Home (desktop, phone, Arabic RTL) · 2 Services · 3 Industries · 4 Government & Trade Programs · 5 About · 6 Resources · 7 Contact, verify and tools · Shared parts · Round 1 (A and C, not taken forward).
- **Repo copy:** `../drops/direction-b-2026-10-25/` — one self-contained `.dc.html` per artboard (HTML + CSS; the `<x-dc>` wrapper and `data-dc-script` block are canvas plumbing). `README.md` there maps files to page types.
- **Brand:** `../guideline/` — TIC Brand Guidelines 2026 (Edition 1), the brand-kit notes, the official logo file, the tagline band.

## Purpose

The site has one job: make a customs officer, a bank, an exporter or an importer trust TIC in the first minute and reach the right office in the second. Trust comes from verifiable things (the proof strip, the accreditations table, the certificate check), not from slogans; reaching an office comes from a quote form routed by country and a WhatsApp number with staffed hours on every page.

Who it serves, in order: exporters and importers in the program countries (Iraq, Egypt, Botswana, Libya) and their customs officers and banks; buyers of inspection, testing and certification in the Gulf, India, China and the wider region; regulators and ministries; TIC's own fourteen offices, who own their pages.

## Direction B — "Field"

Photo-led, like the global majors, inside the brand book's rules: a full-width photograph of inspectors at work with a white plate carrying the sentence and two buttons; dark TIC Black bands with the tile pattern for "Why TIC" and figures; caption bars on every photo; the one red block per page for contact. Calm, square, generous white space. The home page follows proposal 01 §5.2 top to bottom.

## Settled decisions

1. **Logo.** Only the official primary colour logo file (`guideline/assets/logo/tic-logo-primary.png`, vector master in the brand kit). On white in the header at 60 px with "TIC Quality Control" in Saira beside it; on a white plate in the dark footer; the full logo at 46 px on phones. Never reversed, redrawn, recoloured or mirrored.
2. **Language switcher** is a `<select>` in the utility bar; English selected by default; العربية and 中文 are listed; Arabic shown in Cairo.
3. **Type.** Saira for headings (caps, ExtraBold display), Open Sans body 17–18 px / 1.6, Cairo for Arabic. Nav Saira SemiBold 14 px caps. Buttons TIC Red, white Saira caps, square. Self-hosted.
4. **Colour.** TIC Red #EB232B as accent only (rules, markers, caption bars, one highlighted figure, the CTA band and primary button); TIC Black #111111 for dark bands and footer; Charcoal #3D3D3D headings; Ink #1E1E1E body; Light Grey #F3F3F3 alternate sections; Hairline #D9D9D9. No tints of red or black. The one gradient is the supplied tagline band artwork.
5. **Shapes.** Square corners everywhere, no shadows. Diamond bullets, triangle markers for steps and "next" links. Photos as rectangles with the caption bar bottom-left (bottom-right on the page head). Tile pattern at low opacity on dark bands.
6. **Shared parts** on every page: utility bar + header, page head (photo or band variant), CTA band, footer ending with the tagline band. Edit once, every page follows.
7. **Photos.** Real photographs of TIC inspectors at work; no stock, no AI images presented as real. Until a photo arrives, a grey plate with the caption bar. Offices supply photos through the inventory form.
8. **Placeholders.** Anything the proposal marks "to be confirmed" is shown in square brackets, deliberately, so directors see what their office owes. Nothing is invented.
9. **No carousels, no animated counters, no chat widget.** One photo, one sentence.
10. **Phone.** One column at 390 px, 44 px touch targets, the full logo, menu behind a button, WhatsApp and quote always reachable.
11. **RTL.** Mirror layout and direction-bearing markers; never the logo or the tagline band; Western digits; codes isolated.
12. **Pages drawn once, reused:** the service page (PSI) is the template for ~25 services; the industry page (Agriculture & Food) for eight; the program page (Iraq) for five; the content page (Impartiality) for Subcontracting, Certificate and logo use, Privacy and Terms; the office page (Baghdad) for fourteen.

## Not drawn, by design

Client-area screens beyond sign-in (Phase 3); the `.cn` site; Chinese, Hindi and Portuguese pages (same templates, switched on by request); email templates (built from the Zeneon Email Studio pattern at build time); the Wagtail admin (the core's skin).
