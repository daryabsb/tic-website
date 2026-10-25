<!-- TIC Website — Engineering Master Plan, part 05 of 16. -->

# 05 Government & Trade Programs

The largest and most searched-for line, and the part of the site where TIC can lead the mid-size competitors. One `ProgramPage` per program, built from the twelve parts of proposal 01 §5.5, in a fixed order the template enforces. The design is `B-Program-Iraq.dc.html`.

| # | Part | Field or block | Rule |
| --- | --- | --- | --- |
| 01 | Regulator and appointment | `regulator` (name, abbreviation, url), `appointment_status` (appointed / registered / designation in progress), `appointment_document` (file), `appointment_date`, `appointment_text` | The status word is the regulator's own word; "accredited" is refused by validation |
| 02 | Who must comply | `product_table` (table block), `product_list_file` (Document), `product_list_date` | The date of the version shown is printed under the table |
| 03 | Routes | three `route_question` rows (question, answer A → route, answer B → route) | Static in V1; the "Find my route" button opens the request form with the route pre-selected |
| 04 | Step by step | `step_list` with `typical_days` per step | Days may be blank (P-13) and render as "[n] working days — to be agreed" |
| 05 | Document checklist | `document_checklist` + `form` (schema `program_request`) | Online form, never a Word download |
| 06 | Testing, inspection and labelling | bullet block | |
| 07 | Fees | `fees_mode` (table / download / "on request") + table or Document | P-13 decides per program |
| 08 | Questions and answers | `qa` | The Iraq page carries its 23 existing questions |
| 09 | Regulatory updates | query: `NewsPage` where kind = regulatory_update and program = this | Newest three on the page, "all" link to the feed filtered |
| 10 | Contacts | `office_card` rows (office, role, coordinator Person) | |
| 11 | Complaints and appeals | fixed link to `ComplaintsPage` | Rendered by the template, not editable |
| 12 | Last reviewed | `reviewed` date, `owning_office`, disclaimer text | Plus `review_by` (09): mail two weeks before, flag after |

**Index page** (`B-Programs.dc.html`): every published program as a card with status word, regulator, "last updated · office"; SFDA shown with status "designation in progress" and dated text, never as a program; the D4 rule line ("we add a program page only where we hold an appointment…") rendered from settings.

**Regulatory-updates feed** (`B-Regulatory-Updates.dc.html`): the core news index filtered to kind = regulatory_update, with program and year filters and an email-subscription box (a `requests` schema `updates_subscribe` with email only; sends through notify when a new update is published — V1 sends, no unsubscribe management beyond a signed link).

**The Iraq merge (P-13, D6 in the proposal):** today's three Iraq pages and the Gujarat landing page become one `ProgramPage` plus redirects (10). Their 23 + 10 questions are carried into the `qa` block as questions with "[answer carried over]" placeholders until Baghdad reviews each.

**Arabic terms:** the program page's Arabic version uses the terms Baghdad and Cairo supply (P-5): شهادة المطابقة for CoC, and the regulator's own Arabic names. Until they arrive the Arabic seed uses the drafts in the Arabic home mockup, marked as drafts in `ar.yaml`.
