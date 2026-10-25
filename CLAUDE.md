# tic-website

TIC Quality Control company site on the zeneon-cms core. Plan: `docs/masterplan/` (DECISIONS.md wins). Terms: `GLOSSARY.md`. Content master: `docs/proposal/01-…`. Design: `docs/design/drops/direction-b-2026-10-25/`.

## Session start

When Darya says **"start tic"** (or just "start" in this folder):

1. Invoke the skill `mattpocock-skills:wayfinder` with the map issue #1 in this repo in "work through the map" mode. Until #1 exists, use `docs/masterplan/TICKETS.md` as the map and create #1 from it first.
2. Load the map, list the open unblocked tickets in one short table, take the first one unless Darya names one, claim it, work it.
3. "status" = show the map's open tickets and decisions, do nothing else. "end" = write the resolution on the ticket, close it, update the map and DECISIONS.md, commit, push.

## Rules

- No React, no SPA. Django templates, HTMX where a step needs it, one small plain-JS module at most per feature (upload, verify). The design drop's `.dc.html` files are the design; take their markup and CSS, drop the `<x-dc>` wrapper and the `data-dc-script` block.
- One ticket per session. Every decision is written on its issue and in `docs/masterplan/DECISIONS.md`, never only in chat.
- Task tickets are worked together: Claude drives, Darya logs in and clicks.
- Anything not TIC-specific is built in `E:/api/zeneon-cms` on a branch and pinned here by SHA (rule 6). Same layout and deploy as `E:/api/zeneonix-website` and `E:/api/mlp-website`.
- The logo is never redrawn or recoloured: only the files in `docs/design/guideline/assets/logo/`. One red (#EB232B) as accent, under 10 % of any page. Square corners, no shadows, no gradients but the supplied tagline band.
- Company name: "TIC Quality Control", then "TIC". Never "TICQC". "Program", not "programme". "Kurdistan Region of Iraq".
- Nothing invented: a fact the proposal marks "to be confirmed" stays a bracketed placeholder in seed and templates until a director supplies it. No stock photos; a grey plate with a caption until a real photo arrives.
- Exporter-facing pages must load from mainland China: no Google Fonts, Tag Manager, Analytics, Maps or reCAPTCHA; fonts and scripts self-hosted; hCaptcha, not Turnstile.
- Report in ASD-STE100 Simplified Technical English, short.
