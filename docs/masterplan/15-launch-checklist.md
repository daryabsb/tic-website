<!-- TIC Website — Engineering Master Plan, part 15 of 16. -->

# 15 Launch checklist

Worked at gate 4; every line ticked on the launch ticket with who did it and when. Lines marked **P** depend on a proposal decision and are blocked until it lands.

## Content and truth
- [ ] Every page in the sitemap renders from seed; remaining placeholders listed on the launch ticket with their owner (none on Home, Verify, Accreditations, Contact, office contact channels)
- [ ] Accreditations table: only rows with number + register link; symbols only where the body permits; "last checked" within 30 days (**P-15**)
- [ ] Proof strip and footer marks match the table
- [ ] Program pages: appointment document uploaded, product-list date shown, review-by set, owning office set; SFDA shown as "designation in progress" with a date (**P-13**)
- [ ] One office count everywhere (**P-12**); head-office suite number confirmed (2101 vs 2206)
- [ ] Company name rule, "program" spelling, "Kurdistan Region of Iraq" — grep test green
- [ ] No stock photo anywhere; every image has alt text; hero renditions under 100 KB
- [ ] Legal pages: document code, version, effective date, owner; privacy policy reviewed by Legal
- [ ] Arabic frame complete (test green); Arabic-first pages reviewed by the named reviewer (**P-5**)

## Function
- [ ] Quote form from a service page, a program page, an office page and Contact: routed office receives the alert, client gets the auto-reply with the code, sent screen names the office and hours; with JavaScript off too
- [ ] Routing table matches the offices' answers (**P-7**); fallback to Dubai works
- [ ] Complaint with a file; application with a CV; course registration — files only by signed link
- [ ] Verify: by number, by QR URL, not found, captcha after three failures, rate limit returns 429, every lookup logged; Arabic result
- [ ] Certificate import from the agreed source runs and reports (**P-8**)
- [ ] Review-by reminder email received for a test page
- [ ] Search returns pages, downloads and questions; 404 page with search
- [ ] Language switch keeps the page; `/` → `/en/`; hreflang reciprocal; sitemaps per language
- [ ] WeChat and China phone on Guangzhou; no wa.me there (test green)

## Platform
- [ ] Production stack on the chosen host (**P-11**) with `web` and `db` only; limits, healthchecks, read-only
- [ ] Backups to the TIC bucket nightly; restore drill done on staging, RTO in the runbook
- [ ] Timers: retry, review, backup — each pinging Healthchecks.io
- [ ] Better Stack on `/healthz/`; `ADMINS` mail arrives
- [ ] Resend domain verified: SPF, DKIM, DMARC; a test alert lands in an office inbox, not spam
- [ ] Cloudflare: proxy on, origin cert, HTML cache rule with bypasses, Access on `/admin/`, WAF rate rule on `/verify/`, purge token in `.env`
- [ ] Security headers A+ on Observatory; CSP allows only self, hCaptcha, Umami
- [ ] Lighthouse mobile on Home, a program page, Verify: numbers written in DECISIONS; home first view under 600 KB
- [ ] Mainland test of the production hostname by Guangzhou on three carriers; result in DECISIONS
- [ ] Umami live after consent; Search Console verified on both hostnames; sitemap submitted

## The move
- [ ] Domain decided (**P-1**); DNS TTL lowered the day before
- [ ] Redirect map loaded; lychee run over the old URL list against staging: 0 broken
- [ ] Final news export and import; downloads with owners published
- [ ] Old site frozen; hostname pointed at the new stack; redirects from the other hostname live
- [ ] Old host kept on a hidden hostname for 30 days, then off
- [ ] Accounts: one per person, six roles, the shared "TIC" user gone; two-factor on every admin account
- [ ] Editor guide sent to every office owner and deputy; office hours promise published

## The day after
- [ ] Unmatched-404 report checked; new redirect rows added
- [ ] Request waiting times visible in the Requests admin
- [ ] Launch date written in the gates table
