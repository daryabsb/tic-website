# Design drop — Direction B, 25 Oct 2026

One self-contained HTML file per artboard, exported from the canvas (https://claude.ai/artifact/DmCTbpzgmqJ9zhrkJkQs9Y). Open any file in a browser to see the page; the `<x-dc>` wrapper, `<helmet>` and the `data-dc-script` block are canvas plumbing. Logo references `/_blob/44349e…` = `../../guideline/assets/logo/tic-logo-primary.png`; `/_blob/6a8bf4…` = `tic-tagline-bar.png`. Google Fonts links in these files are for the canvas only — the site self-hosts the same faces.

| File | Page type | Django template (masterplan 04) |
| --- | --- | --- |
| `Header.dc.html` · `Footer.dc.html` · `PageHead.dc.html` · `CTABand.dc.html` | Shared parts | `includes/` |
| `DirectionB.dc.html` | Home | `pages/home_page.html` |
| `B-Home-Phone.dc.html` | Home at 390 px | same template, phone result |
| `B-Home-AR.dc.html` | Home in Arabic, RTL | same template, `ar` locale |
| `B-Services.dc.html` · `B-Services-Inspection.dc.html` · `B-Service-PSI.dc.html` | Services hub · group · service page | `services/` |
| `B-Industries.dc.html` · `B-Industry-Food.dc.html` | Industries hub · industry page | `industries/` |
| `B-Programs.dc.html` · `B-Program-Iraq.dc.html` · `B-Regulatory-Updates.dc.html` | Programs hub · program page · updates feed | `programs/` |
| `B-About.dc.html` · `B-Leadership.dc.html` · `B-Group.dc.html` · `B-Accreditations.dc.html` · `B-Impartiality.dc.html` · `B-Complaints.dc.html` · `B-Careers.dc.html` | About · Leadership · Our group · Accreditations · content page (policy) · Complaints · Careers | `pages/`, `trust/` |
| `B-News.dc.html` · `B-Article.dc.html` · `B-Downloads.dc.html` · `B-Training.dc.html` · `B-QA.dc.html` | News list · article · downloads · training · Q&A | `resources/`, `zeneon/news/` overrides |
| `B-Contact.dc.html` · `B-Office-Baghdad.dc.html` · `B-Verify.dc.html` · `B-Login.dc.html` · `B-Search.dc.html` · `B-404.dc.html` | Contact · office page · verify · sign-in (later) · search · not found | `pages/`, `offices/`, `verify/` |
| `Main.dc.html` · `DirectionC.dc.html` | Round 1 directions A and C | not used |

CSS class names to keep when porting: `.wrap .btn .tri .dia .eyebrow .h2 .rule .photo .cap .plate .proof .svc .fig .tiles .ind .step .doc .qa .tbl .office .route .toc .sec .num .chan .off .region .lbl .inp .sel .tab .art .rel .job .course .upd .res .mark`.
