<!-- TIC Website — Engineering Master Plan, part 04 of 16. -->

# 04 Page templates and the block library

The design drop (`../design/drops/direction-b-2026-10-25/`) has one self-contained HTML file per page type. Each becomes one Django template; the four shared parts become includes. Editors never touch layout: they fill the fields of 03 and assemble body text from a locked block set (03 §5.3).

## From drop to template

| Drop file | Template | Notes |
| --- | --- | --- |
| `Header.dc.html` | `includes/header.html` | Utility bar (Verify, Client area, language `<select>`, Search) on TIC Black; white header with the logo file at 60 px, company name in Saira, six nav items, red "Request a quote". Mark-only logo is **not** used on phones; the full logo at 46 px is. |
| `Footer.dc.html` | `includes/footer.html` | Dark band, tile pattern, logo on a white plate, four link columns, marks with numbers, countries line, copyright, tagline band image last on every page. |
| `PageHead.dc.html` | `includes/page_head.html` | Two variants: `photo` (420 px photo, white plate, red top rule, breadcrumb, H1, intro, caption bar) and `band` (light band). A page chooses by having a header photo or not. |
| `CTABand.dc.html` | `includes/cta_band.html` | The one red block per page: WhatsApp, Call, Request a quote. Office-aware: on an office or program page the buttons carry that office's numbers. |
| `DirectionB.dc.html`, `B-Home-Phone.dc.html`, `B-Home-AR.dc.html` | `pages/home_page.html` | One template; the phone and Arabic files show the result at 390 px and in RTL, not separate templates. |
| `B-Services.dc.html`, `B-Services-Inspection.dc.html`, `B-Service-PSI.dc.html` | `services/service_index.html`, `service_group.html`, `service_page.html` | The service page's left column is the eleven-part contents list, built from the blocks present. |
| `B-Industries.dc.html`, `B-Industry-Food.dc.html` | `industries/…` | |
| `B-Programs.dc.html`, `B-Program-Iraq.dc.html`, `B-Regulatory-Updates.dc.html` | `programs/…` | Status word and "last updated · owning office" on every card. |
| `B-About.dc.html`, `B-Leadership.dc.html`, `B-Group.dc.html`, `B-Accreditations.dc.html`, `B-Impartiality.dc.html`, `B-Complaints.dc.html`, `B-Careers.dc.html` | `pages/about_page.html`, `trust/…` | `B-Impartiality` is the `ContentPage` template for all policy pages. |
| `B-News.dc.html`, `B-Article.dc.html`, `B-Downloads.dc.html`, `B-Training.dc.html`, `B-QA.dc.html` | `resources/…`, `zeneon/news/` overrides | |
| `B-Contact.dc.html`, `B-Office-Baghdad.dc.html`, `B-Verify.dc.html`, `B-Login.dc.html`, `B-Search.dc.html`, `B-404.dc.html` | `pages/contact_page.html`, `offices/office_page.html`, `verify/verify.html`, `pages/login.html` (later), `pages/search.html`, `404.html` | |

Rule for the port: copy the markup, drop the `<x-dc>` wrapper and the `data-dc-script` block, move inline styles that repeat into `site.css` classes with the same names the drop uses (`.wrap`, `.btn`, `.tri`, `.photo`, `.cap`, `.proof`, `.svc`, `.fig`, `.tiles`, `.plate`), keep the inline ones that are per-element. Image placeholders (`.photo` plates) stay as the empty state of an image field. `/_blob/…` logo references become `{% static %}` paths to the files in `static/img/logo/`.

## The block library (StreamField, locked)

The ten governance blocks and the ordinary ones, no others; editors cannot set colour, font or spacing.

| Block | Where allowed | Renders as |
| --- | --- | --- |
| `step_list` | service, program, complaints | numbered black squares, bold title, text, "typical: n days" line |
| `document_checklist` | service, program | square boxes, one line each |
| `download_list` | any | Document snippets with type, version, date |
| `regulatory_notice` | program, news | dated, red-ruled notice with owner |
| `contact_card` | service, program, office | Person + channels |
| `office_card` | program, industry | city, role in the program, channels |
| `form` | any page end | a schema key; renders the core request form |
| `qa` | service, program, QA | `<details>` list, first open, "+" marker |
| `table` | any | header row with red rule, no colours |
| `cta_bar` | any | the red block (one per page, enforced) |
| `heading`, `paragraph`, `image_caption`, `two_columns`, `quote`, `map`, `video_link`, `related_pages` | any | ordinary |

Diamond bullets and triangle markers come from CSS (`.dia`, `.tri`), never from editors. Captions on photos are the brand's caption bar (white Saira caps on red, bottom edge). Every image field requires alt text and is rendered as WebP sized to display, under 100 KB for the one hero image per page.
