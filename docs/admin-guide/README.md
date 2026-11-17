# Admin guide

Step-by-step help for every task in the TIC Quality Control website admin. Written for
a person who never used the admin before. One action per step. The pictures come from the
staging site, <https://staging.ticqc.ae/admin/>.

Start with page 1. Read the other pages when you need them.

| Page | For whom | What it covers |
| --- | --- | --- |
| 1. [Editor guide](../editor-guide.md) | Everyone | Log in, office page, news, program product list, review-by reminder, approve, requests |
| 2. [Draft, review, publish](02-draft-review-publish.md) | Everyone | Save draft, autosave, submit, approve, request changes, history, undo |
| 3. [Publish rules of each page type](03-publish-rules.md) | Editors, reviewers | Which fields each page type needs; every refusal message and how to fix it |
| 4. [Images and documents](04-images-and-documents.md) | Editors | Upload, alt text, collections, choose in a page, replace a document |
| 5. [Review-by dates](05-review-by.md) | Editors, reviewers | The reminder mail, the report, how to set the next date |
| 6. [Requests](06-requests.md) | Site admins | Read, status, notes, files |
| 7. [Users, groups and routing](07-users-groups-routing.md) | Site admins | Add a person, give a role, add an office, send requests to the right address |
| 8. [Translations into Arabic](08-translations.md) | Translators, site admins | Translate a page, the review sheet, when Arabic goes live |

## Who can do what

| Role | Group in the admin | Can |
| --- | --- | --- |
| Office editor | `<City> office editors` | Edit the office page, the office's programs, write news. Cannot publish. |
| Office reviewer | `<City> office reviewers` | The same, and approve and publish the pages of their office. |
| Content manager | `Content managers` | Edit and publish all pages. Approve any page. |
| Site admin | `Site admins` | Users, groups, requests, routing, translations, redirects, settings. |
| Translator | `Translators: ar` | Edit Arabic pages. Download and upload the review sheet. |
| Viewer | `Viewers` | Read requests, certificate lookups and reports. Change nothing. |

Nobody approves their own work.

## Pictures

The pictures are made by `scripts/guide_shots.py` with four staging-only test logins
(D58). To make them again after an admin change, see the top of that script.
