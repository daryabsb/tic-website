<!-- TIC Website — Engineering Master Plan, part 09 of 16. -->

# 09 Back office: roles, workflow, review-by dates

The part of the plan that most affects daily life in the offices (03 §5). Wagtail provides all of it; the work is configuration, groups and one small core addition (review-by).

## Six roles → Wagtail groups and permissions

| Role (03 §5.1) | Group | Page permissions | Other |
| --- | --- | --- | --- |
| Global Admin | `Site admins` (core security admins group) | all, all locales | users, groups, settings, snippets, redirects, Requests, Certificates |
| Content Manager | `Content managers` | add, edit, publish on the whole tree, all locales | approve any workflow task; owns Documents and media root; fallback reviewer for every office |
| Office Editor | `Office: <city>` (one group per office) | add/edit (no publish) on that office's `OfficePage`, its news, and the program pages assigned to it; locale as assigned | submit for review; sees own drafts; Requests routed to the office (read, status, notes) |
| Reviewer | `Reviewers: <region or service>` | edit + publish within scope after review | approve or return; sets review-by |
| Translator | `Translators: ar` | edit translated pages only, locale `ar`; cannot edit `en` | translation sheet |
| Viewer | `Viewers` | none | reads drafts, history, audit log; comments |

Rules: one personal account per person; the shared "TIC" user is retired; an office editor group is created by a management command `add_office <slug>` that also creates the office's media folder and collection. Single sign-on is V2 (P-6 and TIC's mail system decide).

## Workflow

Two Wagtail workflows: **Review** (one task: a Reviewer in scope or a Content Manager approves) assigned to Program, Content (policy), Service and Office pages; **Light** (office news: the office's Reviewer or any Content Manager) for `NewsPage`. A reviewer who made substantive edits asks another approver (a workflow task cannot be approved by the user who submitted it: `WAGTAIL_WORKFLOW_REQUIRE_REAPPROVAL_ON_EDIT` on). Typo fixes by a reviewer are self-approved and logged. Scheduled publish and expiry on; `LandingPage` requires an expiry.

## Review-by dates (core `ReviewByMixin`, new)

`review_by` date on Program, Content (policy) and Accreditation (snippet). A platform timer runs `send_review_reminders` daily: two weeks before, one email to the owning office's editor and its reviewer; after the date, the page shows a flag in the admin listing and a report "Pages past review" appears in the admin menu. The public page never shows the flag. Reminders go through notify's email channel and are logged.

## Media and documents

One collection per office (`add_office`), alt text required on upload, images converted to WebP and sized by renditions; the hero rendition is capped at 100 KB (a warning in the admin when a source image exceeds 2400 px, and the rendition warm-up lesson from Zeneonix D39 applied: renditions are made in a one-off container after seeding). `Document` snippets replace loose files: version, date, owner; superseded versions are deleted.

## Audit and history

Wagtail's page history, version compare and restore; site-history report; `Lookup` and import logs for Verify; request events for every status change; login and role changes through Django admin logs surfaced in the site-history report. The Quality Manager's `Viewer` account can read all of it.

## Editor guide

`docs/editor-guide.md` (written at gate 3, in plain English, with screenshots from staging): how to edit your office page, submit a news item, answer a request, update a program's product list, what the review-by reminder means. Short enough for an office manager with two hours a month.
