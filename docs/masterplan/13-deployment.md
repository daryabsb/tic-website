<!-- TIC Website — Engineering Master Plan, part 13 of 16. -->

# 13 Deployment and hosting

Same contract as the Zeneonix and MLP sites: platform tooling in `/srv/platform`, one shared edge Caddy, stacks under `/srv/stacks/<name>/<env>/`, images from GHCR, forced-command SSH deploys, restic backups to B2 with Healthchecks.io pings. The TIC stack adds one Caddy site file and one systemd timer set per environment.

| Environment | Host | Branch | Data |
| --- | --- | --- | --- |
| Local | docker compose (`deploy/compose.dev.yaml`) or a venv with `pip install -e ../zeneon-cms` | any | `seed_site` |
| Staging | zeneon-1 (Hetzner, NBG1), `/srv/stacks/tic/staging/`, basic auth in its Caddy file, hostname `tic-staging.zeneon.co.uk` until TIC DNS is in hand, then `staging.<P-1 host>` | `main` on every push | seed; directors review here |
| Production | a server TIC owns under the same contract (D12; region per P-11), `/srv/stacks/tic/prod/`, hostname per P-1 | tagged releases `v1.x`, pushed only by Darya | live |

**Containers (per env):** `web` (gunicorn; joins `internal` and `edge`, alias `tic-<env>-web`), `db` (PostgreSQL 16 pinned by digest, `internal` only). No MCP container, no Redis, no worker in V1. Every service: `restart`, healthcheck, resource limits (`web` 768 MB from the start — the Zeneonix rendition lesson, D39 there), `read_only`, `cap_drop ALL`. Volumes `media/` and `private/`.

**Timers (platform `systemd/`, one set per env):** `task@tic-<env>-retry` (retry deliveries + purge orphan uploads) every 10 min, `task@tic-<env>-review` (`send_review_reminders`) daily 08:00 Dubai, `backup@tic-<env>` 02:50 daily (staging Sundays); later `task@tic-<env>-certificates` when a sync source exists (06). Each pings its own Healthchecks.io check.

**Deploy path (copied from Zeneonix):** push to `main` → `ci.yml` (ruff, pytest, migrations check, `.po` check, Docker smoke test) → `deploy.yml` builds with the `ZENEON_REPOS_TOKEN` read of the core, pushes `ghcr.io/daryabsb/tic-website:<sha>`, deploys to staging by forced-command SSH (`bin/deploy tic staging`: pull, `migrate`, start, health wait). A `v1.x` tag deploys to production the same way, purges the Cloudflare cache, runs a Playwright smoke run (home in both languages, a quote request, a verify lookup). Rollback is `bin/deploy tic prod <previous-sha>` from `.deploy-tag`.

**Production server (gate 4 prerequisite, P-11):** either a Hetzner server on TIC's own account set up with `server-platform` (the MLP engineer's playbook, one day), or a VM in TIC's European colocation when the Etisalat exit lands; or, if Legal needs a UAE region, a VM on AWS me-central-1 / Azure UAE North set up the same way. The stack is the same in all three; only the host changes. Cloudflare sits in front in every case, which is why the Dubai regions' mainland failures do not matter (03 §11.1).

**Backups:** `bin/backup-stack tic <env>` nightly: `pg_dump -Fc` plus `media/`, `private/` and the `.env` files, restic to a B2 bucket prefix with Object Lock, 7 daily, 4 weekly, 12 monthly; a restore drill on staging before launch, its RTO written in the runbook. Production backups go to a bucket TIC pays for.

**Monitoring:** Django `ADMINS` mail through Resend; Better Stack on `/healthz/` (keyword `"deliveries_stuck": 0`); Healthchecks.io for every timer; Umami as a liveness signal.

**DNS and mail:** Cloudflare zone for the production host (proxy on, origin certificate, cache rule for HTML with bypasses, Access policy for `/admin/`); Resend domain verified with SPF, DKIM and DMARC before the first email; `no-reply@` sends; office inboxes stay where TIC's mail is (P-6 names the mail system).

**Runbook** (`docs/runbook.md`, modelled on Zeneonix's): deploy, rollback, restore from backup, add an office (`add_office` + routing rows + Caddy nothing), add a program, import certificates, rotate keys, the quarterly Cloudflare IP refresh, switch on a language.
