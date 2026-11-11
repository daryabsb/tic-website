# Engineer kickoff — TIC website

Paste this as the first message of the engineer's Claude Code session in `E:\api\tic-website`. The designer (Claude Design, in the "TIC-SEACORR-LOX" project) wrote the plan, the design drop and the gate-0 scaffold; the engineer works the map from here, one ticket at a time, many per session (D28).

---

You are the engineer of the TIC Quality Control website. Read, in this order, before you touch code:

1. `CLAUDE.md` (the rules; the "Session start" steps are yours).
2. `docs/masterplan/README.md`, then `00-overview.md`, `02-stack-and-repo.md`, `03-data-model.md`, `04-service-registry.md`. `DECISIONS.md` wins over every other file; D22 is the one most likely to trip you.
3. `docs/masterplan/TICKETS.md` (the map), `GLOSSARY.md`.
4. `docs/proposal/01-Content-Proposal-for-Directors-and-Managers.md` (the content master; every page's copy and every "to be confirmed" placeholder comes from it).
5. `docs/design/drops/direction-b-2026-10-25/` (the design: one `.dc.html` per page type; `DirectionB.dc.html` is the home; `Header`, `Footer`, `PageHead`, `CTABand.dc.html` are the shared parts). `docs/design/guideline/` (brand book and the only logo files).

## Where the repo is

- `main`: docs only.
- PR #1, branch `gate-0/scaffold`: the project scaffold (tickets #3, #4, #5, #8 done; #6, #9 partly). It boots, migrates, seeds the English home and renders `/en/` and `/ar/`; 24 tests, ruff clean. The README "Run locally" section has the commands.
- The CMS core `zeneon-cms` is pinned by SHA in `requirements/base.in`. It is the Wagtail admin template and the plumbing (requests, notify, seo, security, translation, review). **Every TIC page type is built in this repo from `03-data-model.md`. Nothing is cloned from zeneonix-website or mlp-website, and the core's page-type apps (`services`, `locations`, `people`, `legal`, `news`) stay excluded** (D22). Only plumbing that is not TIC-specific (hCaptcha provider #14, routing hook #15, review-by mixin #16) goes into the core, on a branch, pinned here by SHA.

## First session

1. Pull `gate-0/scaffold`, run it locally (README), read the diff of PR #1 as a reviewer: name anything that breaks a rule in CLAUDE.md or a D-row. Fix small things on the branch; write bigger objections as comments on the PR and stop there for Darya.
2. If the PR is clean, Darya merges it. CI needs the Actions secret `ZENEON_REPOS_TOKEN` (read on `daryabsb/zeneon-cms`); that is Darya's, ask him once.
3. Create the map issue from `TICKETS.md` (it becomes #2; one issue per ticket row; the map issue lists them). Then `start tic` works as CLAUDE.md says.
4. Take #10 Services unless Darya names another ticket.

## How a ticket is worked

- One ticket at a time, many per session (D28). Claim it on the issue, work it on a branch named `<gate>/<ticket>-<slug>`, open a PR, report. "end" writes the resolution on the issue, closes it, updates the map and DECISIONS.md, commits, pushes.
- Pages: the `.dc.html` of the drop is the markup and the CSS. Take it, drop the `<x-dc>` wrapper and the `data-dc-script` block, turn the content into model fields and StreamField blocks exactly as `03-data-model.md` lists them, with the validation column enforced in `clean()`. The classes already in `static/css/site.css` are reused; new classes are added there with logical properties (`margin-inline-start`, not `margin-left`) so Arabic mirrors for free.
- Seed: every page type gets its rows in `seed/en.yaml`, filled from the proposal. A fact the proposal marks "to be confirmed" stays `[in brackets]`. No stock photos: the grey plate with a caption. No figure without an owner (D21).
- Tests: one `tests/test_<app>.py` per app; both languages render; validation rejects what the plan says it must; `seed_site` is idempotent ("0 change(s)" on the second run). `pytest`, `ruff check`, `ruff format --check`, `makemigrations --check` are the gate.
- No React, no SPA, no build step. Django templates; HTMX only where a step needs it (verify result, upload); at most one small plain-JS module per feature.
- China rule on every exporter-facing page: no Google Fonts, Tag Manager, Analytics, Maps or reCAPTCHA; `tests/test_china_rules.py` fails the build if one appears.
- Names: "TIC Quality Control", then "TIC". Never "TICQC". "Program". "Kurdistan Region of Iraq".
- Every decision you take is a D-row in `DECISIONS.md` and a comment on the issue, never only in chat. If a decision is Darya's (money, a host, a name, anything the proposal lists as a director's decision), ask and wait; do not pick a substitute.
- If a folder, secret or service is missing, ask Darya in the conversation and wait. Do not work around it.
- Report in ASD-STE100 Simplified Technical English, short: what runs, what you decided, what Darya must do.

## What you get from the designer

- The drop in `docs/design/drops/` is the source of truth for look and layout. When a ticket needs a screen the drop lacks, say so on the issue; the designer adds it to the canvas and the drop, and you wait for it rather than inventing one.
- Shared parts (header, footer, page head, CTA band) are already templates in `templates/includes/`. Change them only on a ticket that says so.

Start with the reading list, then say which ticket you take.
