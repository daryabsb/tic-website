# tic-website

The TIC Quality Control company site: ticqc.com (today ticqc.ae). An English-first, phone-first
Wagtail site on the [`zeneon-cms`](https://github.com/daryabsb/zeneon-cms) core — the same core
behind the Zeneonix and MLP sites — with Arabic as the first full second language, a certificate
verification tool, one program page per government inspection program, one page per office, and
a quote form routed by country to the office that handles it.

**Status:** plan written, build not started. Design is done (Direction B, see `docs/design/`).
The content proposal is out for comment with the directors until the reply deadline; the build
starts on the proposal's working assumptions and the decision log catches what changes.

**History:** the 2023 Nuxt site that used to live on `main` is kept whole on the branch
`legacy/nuxt-2023` and the tag `nuxt-site-final`. It is not used anywhere; it is a backup.

## Run locally

Same as the Zeneonix site (see its README): Docker with Postgres 16 and the site, or a venv against
a local Postgres 16 with `pip install -e ../zeneon-cms`. The scaffold ticket (gate 0) fills this
section in with the real commands once `deploy/compose.dev.yaml` and `requirements/` exist.

## Where things are

| Path | Holds |
| --- | --- |
| `docs/masterplan/` | The engineering master plan, 16 numbered parts + `DECISIONS.md` + `TICKETS.md`. Start at `docs/masterplan/README.md` |
| `docs/design/briefs/` | The design brief and the settled design decisions |
| `docs/design/drops/direction-b-2026-10-25/` | The design: one `.dc.html` per page type (self-contained HTML + CSS). Take the markup and CSS; the canvas is the live copy |
| `docs/design/guideline/` | TIC Brand Guidelines 2026 (PDF + text), the brand-kit notes, the official logo files |
| `docs/design/content/` | Page copy in English (`English.md`), the source for `seed/*.yaml`; Arabic follows the office reviewers |
| `docs/proposal/` | The five proposal documents the directors are commenting on (00–04) — the content master |
| `docs/research/` | The research report and notes behind the proposal (competitors, current-site audit, China, Arabic) |
| `GLOSSARY.md` | TIC and program terms used in code, docs and tickets |
| `CLAUDE.md` | How a session on this repo starts and the rules it follows |

## The plan in one paragraph

Same layout, core and deploy as the Zeneonix site (`apps/`, `templates/`, `static/`, `seed/`,
`deploy/`, `ci.yml` + `deploy.yml`), one more stack under the server-platform contract. The content
proposal (01) is the master for what every page contains; the technology proposal (03) chose Wagtail
as a conventional server-rendered site (Option A); this plan says how that is built on the core,
what is client code and what goes into the core (rule 6), how certificates are verified, how a
quote is routed to an office, how Arabic is switched on, and how the old site's addresses are
carried over. Five gates in order, no calendar dates (section 14).

## Working method

Decisions are written down as issues in this repo (Wayfinder map and tickets) and in
`docs/masterplan/DECISIONS.md`. Nothing is decided in chat only. Anything the directors change in
the proposal round lands as a D-row before it changes code.
