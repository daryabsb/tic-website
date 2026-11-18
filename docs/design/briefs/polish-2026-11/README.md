# TIC Website — Polish Brief (Nov 2026)

Nov 18, 2026 · Darya Ibrahim. Ticket T37. This brief asks for a second design pass on Direction B ("Field"). It does not replace the first brief (`../TIC Website — Design Brief.md`); the brand rules and the content stay. It reopens one thing: **how a page uses its photo, and what the first screen gives the visitor.**

## Why now

The site is built and on staging. Until this week every photo place showed a grey plate, so the layout looked like a sketch that photos would fix later. Now every place has a photo (D68: the old site's photos, stock placeholders, two of TIC's own). The photos did not fix it. They showed that the layout itself hides them.

Darya, on the Services page: *"the hero image doesn't tell anything about the page, the core meaning of the photo is hidden behind that white banner."* And: *"this is not a good website UI to be honest."*

This is not about single bad photos. A better photo on the same layout fails the same way. **Fix the logic, even if that means redrawing the page head and the photo system completely.** The rest of the page (sections, cards, footer) gets polish, not a redesign.

## What is wrong (look at the screenshots)

1. **The white plate sits on the subject.** The page head puts a large white plate (breadcrumb, title, intro) over the middle-left of the photo, which is where the subject usually is. On desktop it hides about a third of the photo; on the phone it hides almost all of it (`phone/services.jpg`: the photo shows as a strip above and below the plate). The photo is a background texture, not a picture.
2. **The photo has no job.** Nothing says what a page-head photo must show. On Programs it is a meeting room seen from behind; on Dubai it is sky. A visitor learns nothing from it. Each page type needs a stated job for its photo (Services: the work being done; an office: the place and its people; a program: the country and the border/goods; an industry: the goods and the site).
3. **The first screen gives nothing to act on.** On section pages the header and the page head fill about 60 % of the first screen with a title and a paragraph. No country, no next step, no proof. The home page is better because its plate has two buttons and a proof strip follows.
4. **Long intros make the plate taller.** The plate grows with the intro text (`desktop/programs.jpg`, `phone/services.jpg`), so the more a page says, the less photo is left.
5. **Empty photo places look broken.** The grey grid plate (home service cards, export programs, the map on "Where we are", office photo) reads as a failed image, not as "photo coming". Some places will stay empty for months.
6. **Thin pages look abandoned.** Industry pages today are a page head, then straight into the red contact band and the footer (`desktop/industries--marine-and-shipping.jpg`). The layout has no answer for a page with little content yet.
7. **Two stacked photos on office pages** (header + office photo + team photo) compete; the office photo and team photo sit as a column beside the facts with no hierarchy (`desktop/offices--dubai.jpg`).

## What we ask

1. **A new page head.** Free to change completely. It must let the photo be seen and read, and still carry breadcrumb, title, a short intro and (where the page has one) one action. Ideas to test, none required:
   - plate beside the photo (split), or below it, not on it;
   - a short plate (title only) with the intro moved below;
   - Darya's idea: a partly transparent plate so the photo shows through. *Darya: "do not count on this".* Show it if it works with the brand; say why if it does not (the brand book bans shadows and gradients, not transparency, but text contrast must pass WCAG AA).
2. **A photo job for each page type** — one line each: home, section hub (Services, Industries, Programs, About), service, industry, program, office, content page. The engineer turns this into the alt-text and caption rules and the offices get it as the photo request.
3. **Crop rules.** Where the subject must sit in each slot, at desktop and phone. Wagtail has a focal point per image (the editor marks the subject); the design may rely on it. Show the page head at 1440 and 390 with the subject left, centre and right.
4. **The first screen.** For each page type, what is above the fold at 1440 × 900 and 390 × 844 besides the title. One useful thing at least (an action, a proof, a country/office).
5. **An empty photo place** that looks intended, not broken. It must work for months, on the home cards, program cards, office photo and the map.
6. **A thin-page layout.** What an industry or office page looks like with only a few facts, so it does not look unfinished.
7. **Polish, as you go:** the header (two rows, logo plus name, feels heavy), spacing between sections, card photo ratios, the office page's photo column. Small changes only.

## What stays

Everything in the first brief's "Settled decisions" except the page-head drawing: the logo files and rules, Saira / Open Sans / Cairo, TIC Red as accent under 10 %, square corners, no shadows, the one supplied gradient (tagline band), caption bars, diamond and triangle markers, no carousels or animated counters, the shared parts, RTL rules, the page types and their content. Photos are TIC's own where possible; stock is a placeholder only.

## Deliverables

In the same Claude Design canvas (https://claude.ai/artifact/DmCTbpzgmqJ9zhrkJkQs9Y), as a new page "Round 3 — polish":

- the new page head: desktop, phone, Arabic RTL; with a short and a long intro;
- the photo job and crop rules (one board);
- the empty photo place;
- redrawn: Home, Services, one service (PSI), one industry (thin), Programs, one program (Iraq), one office (Dubai), About — desktop and phone.

The engineer then takes the markup and CSS as before (one `.dc.html` per artboard into `../../drops/`).

## The screenshots

Taken from staging on Nov 18, 2026, after the photo import (D68). 175 pictures. File names are the page path with `--` for `/` (`home` is the home page). Only the English site is live on staging; for RTL use the first round's `B-Home-AR` artboard.

| Folder | What | Pages |
| --- | --- | --- |
| `desktop/` | 1440 wide, full page | the 39 pages with a photo place |
| `desktop-first/` | 1440 × 900, first screen only (what the visitor sees before scrolling) | the 39 above and the 16 below |
| `phone/` | 390 × 844, first screen only | the 39 pages with a photo place |
| `phone-full/` | 390 wide, full page | the 8 pages to redraw, contact, downloads |
| `other-desktop/`, `other-phone/` | full page / first screen | 16 page types without a photo place: accreditations, complaints, certificate and logo use, impartiality, group, leadership, contact, downloads, news, an article, questions, resources, training, verify, search ("inspection"), the 404 page |

The 39 pages with a photo place: home; services, its seven groups and PSI; industries and its eight; programs, regulatory updates, Iraq CoC; the offices hub and the fourteen office pages; about; careers.

Start with `desktop-first/` and `phone/`: they show the problem fastest. Stock photos are marked "Sample photo · to be replaced" or are city views; judge the layout, not the photo.

Also seen on the phone: the utility bar takes two rows, so the bars and the header use about a third of the first screen before the page starts (`other-phone/search--_q-inspection.jpg`). Part of the header polish (item 7).
