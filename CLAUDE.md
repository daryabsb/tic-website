# tic-website

TIC Quality Control company site on the zeneon-cms core. Plan: `docs/masterplan/` (DECISIONS.md wins). Terms: `GLOSSARY.md`. Content master: `docs/proposal/01-…`. Design: `docs/design/drops/direction-b-2026-10-25/`.

## Session start

When Darya says **"start tic"** (or just "start" in this folder):

1. Invoke the skill `mattpocock-skills:wayfinder` with the map issue in this repo in "work through the map" mode. The map issue is **#2** (PR #1 took the first number). Until #2 exists, create it from `docs/masterplan/TICKETS.md` first (one issue per ticket row, the map issue lists them with their numbers).
2. Load the map, list the open unblocked tickets in one short table, take the first one unless Darya names one, claim it, work it.
3. When a ticket is done (gate green, "done when" shown), close it (step 4) and take the next open unblocked ticket in the same session. Stop only when Darya says so, or when the next ticket needs Darya (a Task step or a P-row).
4. "status" = show the map's open tickets and decisions, do nothing else. "end" = write the resolution on the ticket, close it, update the map and DECISIONS.md, commit, push, merge the PR after a GREEN gate; then stop.

## Rules

- No React, no SPA. Django templates, HTMX where a step needs it, one small plain-JS module at most per feature (upload, verify). The design drop's `.dc.html` files are the design; take their markup and CSS, drop the `<x-dc>` wrapper and the `data-dc-script` block.
- One ticket at a time, many per session (D28): each ticket has its own branch, PR and close. Every decision is written on its issue and in `docs/masterplan/DECISIONS.md`, never only in chat.
- Task tickets are worked together: Claude drives, Darya logs in and clicks.
- zeneon-cms is Darya's Wagtail admin template and plumbing (requests, notify, seo, security, translation). Every TIC page type is implemented in this repo from TIC's own plan (`docs/masterplan/03`). Nothing is cloned or assumed from zeneonix-website, mlp-website or the core's page-type apps: TIC is an independent business, one client of the template like any future client (D22).
- Plumbing that is not TIC-specific (captcha provider, routing hook, review-by mixin) is built in `E:/api/zeneon-cms` on a branch and pinned here by SHA (rule 6). Same deploy layout as `E:/api/zeneonix-website` and `E:/api/mlp-website`; layout only.
- The logo is never redrawn or recoloured: only the files in `docs/design/guideline/assets/logo/`. One red (#EB232B) as accent, under 10 % of any page. Square corners, no shadows, no gradients but the supplied tagline band.
- Company name: "TIC Quality Control", then "TIC". Never "TICQC". "Program", not "programme". "Kurdistan Region of Iraq".
- Nothing invented: a fact the proposal marks "to be confirmed" stays a bracketed placeholder in seed and templates until a director supplies it. No stock photos; a grey plate with a caption until a real photo arrives.
- Exporter-facing pages must load from mainland China: no Google Fonts, Tag Manager, Analytics, Maps or reCAPTCHA; fonts and scripts self-hosted; hCaptcha, not Turnstile.
- Report in ASD-STE100 Simplified Technical English, short.
