<!-- TIC Website — Engineering Master Plan, part 01 of 16. -->

# 01 Architecture at a glance

```
visitor ──► Cloudflare (CDN, WAF, cache rules, origin cert)
                │
                ▼
        shared edge Caddy on the host  (server-platform contract)
                │
                ▼
   ┌──────────── tic stack (/srv/stacks/tic/<env>/) ────────────┐
   │  web   gunicorn · Django 5.2 · Wagtail 7.4 · zeneon-cms    │
   │        ├─ public pages (templates from the design drop)     │
   │        ├─ /verify/      Certificate lookup (client app)     │
   │        ├─ /requests/    quote · complaint · application     │
   │        ├─ /admin/       Wagtail admin, six roles            │
   │        └─ /healthz/                                          │
   │  db    PostgreSQL 16 (internal network only)                │
   │  volumes: media/ (public images, downloads)                 │
   │           private/ (request attachments, CVs; signed links) │
   └──────────────────────────────────────────────────────────────┘
                │ after commit                     ▲ timers (host systemd)
                ▼                                  │ retry-deliveries · backup
        Resend (email: office alert,               │ review-by reminders
        client auto-reply, review-by               │ import-certificates (when a feed exists)
        reminders)
```

Visitors reach the site through Cloudflare and the host's shared edge Caddy. `web` renders every public page from Wagtail; writes quote requests, complaints and applications to PostgreSQL through the core `requests` app and sends the office email and the client auto-reply right after the commit; answers certificate lookups from the `Certificate` table with rate limits and a lookup log; and serves the admin. Host timers run the retry, the review-by reminder and the nightly backup. WhatsApp and WeChat never touch the server: they are links on office pages. Media lives in the stack's `media/` volume; request attachments live in a `private/` volume served only by signed links, as in Zeneonix (D25 there). There is no Redis, no worker, no second service in V1.

Three flows the architecture is built around:

1. **Trust flow** — proof strip → accreditations table → register link, and certificate → Verify → issuing office. Both must work with JavaScript off except the hCaptcha step.
2. **Request flow** — service or program page → form (5–7 fields, country and service structured) → `RoutingRule` → office alert + client auto-reply with code → sent screen naming the office and its hours.
3. **Publish flow** — office editor drafts → reviewer approves → published; program and policy pages carry a review-by date that mails owner and reviewer two weeks before.
