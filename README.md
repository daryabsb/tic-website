# tic-website

The TIC Quality Control company site: ticqc.com (today ticqc.ae). An English-first, phone-first
Wagtail site on the [`zeneon-cms`](https://github.com/daryabsb/zeneon-cms) core — the same core
behind the Zeneonix and MLP sites — with Arabic as the first full second language, a certificate
verification tool, one program page per government inspection program, one page per office, and
a quote form routed by country to the office that handles it.

**Status:** build, gate 0. The project scaffold is in: settings, `apps.pages` (HomePage with the
hero fields and the eight home sections, AboutPage), the shared parts as templates with the
drop's CSS, self-hosted fonts, the seed, tests, CI and the deploy files. The core is pinned by
SHA in `requirements/base.in` (D2). Design is done (Direction B, `docs/design/`). The proposal
round closed with no objections (10 Nov 2026); the build runs on its working assumptions.

**History:** the 2023 Nuxt site that used to live on `main` is kept whole on the branch
`legacy/nuxt-2023` and the tag `nuxt-site-final`. It is not used anywhere; it is a backup.

## Dev and tests (D24: on the Dubai VM `stms-data`, not on a local PC)

```sh
# copy the checked-out branch and build (GH_TOKEN reads zeneon-cms; build secret only)
git archive HEAD | ssh stms-data 'rm -rf ~/tic/dev && mkdir -p ~/tic/dev && tar -x -C ~/tic/dev'
gh auth token | ssh stms-data 'cd ~/tic/dev && GH_TOKEN=$(cat) docker compose -p tic-dev -f deploy/compose.dev.yaml -f ~/tic/override.yaml up -d --build'
# the full CI gate (D25), from any PC with the ssh alias; prints == GREEN or == RED
bash scripts/ci.sh
# only the tests, ruff (source mounted: the image has no tests/)
ssh stms-data 'cd ~/tic/dev && GH_TOKEN=x docker compose -p tic-dev -f deploy/compose.dev.yaml -f ~/tic/override.yaml run --rm -T -u root -v $HOME/tic/dev:/src -w /src -e DJANGO_ENV=test web sh -c "grep -v ^zeneon-cms requirements/dev.txt > /tmp/d.txt && pip install -q --no-deps -r /tmp/d.txt && pytest -q -p no:cacheprovider && ruff check . && ruff format --check ."'
# look at it in the browser: http://localhost:8000/en/
ssh -N -L 8000:127.0.0.1:8000 stms-data
```

`ssh stms-data` uses the alias in `~/.ssh/config` (see `E:/api/stms/deploy/SERVERS.md`).

## Run locally (reference only; D24 runs everything on the VM)

Docker (Postgres 16 + the site, the seeded English home on http://localhost:8000/en/):

```sh
GH_TOKEN=$(gh auth token) docker compose -f deploy/compose.dev.yaml up --build
```

Or a venv against any local Postgres 16 (copy `.env.example` to `.env` and set `DATABASE_URL`):

```sh
py -3.12 -m venv .venv && .venv/Scripts/pip install --no-deps -r requirements/dev.txt
# no SSH key for zeneon-cms? drop its line from the lock and: pip install --no-deps -e ../zeneon-cms
# Windows also needs: pip install tzdata colorama pywin32 (the locks are compiled on Linux)
# re-lock after a change to requirements/*.in or the core pin: bash scripts/lock.sh
python manage.py migrate
python manage.py zeneon_setup_locales --title "ar=تي آي سي لمراقبة الجودة"
python manage.py seed_site
python manage.py createsuperuser
python manage.py runserver
pytest
```

Fonts are built once by `python scripts/build_fonts.py` (fontTools + brotli) and committed.

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
