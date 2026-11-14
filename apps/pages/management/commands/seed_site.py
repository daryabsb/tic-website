"""``python manage.py seed_site``: the content seed (master plan 02, D15).

Reads ``seed/site.yaml`` (language-neutral site settings) and ``seed/<lang>.yaml`` (page
copy, one file per language) and ``seed/redirects.csv`` (old path, new path; master plan
10) and ``seed/requests.yaml`` (the request questions and the routing rules, T17).
Gate 0 seeds the site settings, the home page and the redirects; the other page
types join their tickets. ``seed/offices.yaml`` holds the fourteen office rows; T20
loads them when ``OfficePage`` exists.

Idempotent and safe over editors' work (as the Zeneonix seed, D30 there): rows are
matched by slug; blank fields are filled, nothing else is changed; a second run changes
nothing and says so. ``--reset`` overwrites the seeded fields (staging only).
"""

from __future__ import annotations

import csv
import datetime
import json
from pathlib import Path

import yaml
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files import File
from django.core.management.base import BaseCommand
from django.core.validators import validate_email
from django.db import transaction
from wagtail.contrib.redirects.models import Redirect
from wagtail.documents import get_document_model
from wagtail.models import Locale, Page
from zeneon_cms.core.locales import ensure_locales
from zeneon_cms.core.models import SiteSettings
from zeneon_cms.requests.models import RequestSchema, RoutingCondition, RoutingRule

from apps.backoffice.roles import ensure_roles
from apps.careers.models import CareersPage
from apps.industries.models import IndustryIndexPage, IndustryPage
from apps.news.models import NewsIndexPage, NewsPage
from apps.offices.access import setup_office
from apps.offices.models import OfficeIndexPage, OfficePage
from apps.offices.seed import create_office, fill_office, office_rows
from apps.pages.models import AboutPage, GroupPage, HomePage, LeadershipPage
from apps.people.models import Person
from apps.programs.models import ProgramIndexPage, ProgramPage, RegulatoryUpdatesPage
from apps.services.models import ServiceGroupPage, ServiceIndexPage, ServicePage
from apps.training.models import CoursePage, TrainingIndexPage
from apps.trust.models import (
    CONTENT_PAGE_REQUIRED,
    Accreditation,
    AccreditationsPage,
    ComplaintsPage,
    ContentPage,
)
from apps.verify.models import VerifyPage

SEED_DIR = Path(settings.BASE_DIR) / "seed"

HOME_FIELDS = (
    "seo_title",
    "search_description",
    "hero_eyebrow",
    "hero_heading",
    "hero_sentence",
    "hero_caption",
)


class Command(BaseCommand):
    help = "Seed site settings and page copy from seed/*.yaml (fills blanks only)."

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="overwrite seeded fields")
        parser.add_argument("--language", default=None, help="one language code only")

    def handle(self, *args, **options):
        self.reset = options["reset"]
        self.changes = 0
        ensure_locales()
        with transaction.atomic():
            self.seed_settings()
            codes = [options["language"]] if options["language"] else self.languages()
            for code in codes:
                self.seed_language(code)
            self.seed_requests()
            self.seed_redirects()
            self.changes += ensure_roles()  # groups and workflows (T24, D54)
        self.stdout.write(f"seed_site: {self.changes} change(s)")

    # -- helpers --------------------------------------------------------------------

    def languages(self) -> list[str]:
        return [code for code, _name in settings.LANGUAGES if (SEED_DIR / f"{code}.yaml").exists()]

    def load(self, name: str) -> dict:
        path = SEED_DIR / name
        if not path.exists():
            return {}
        with path.open(encoding="utf-8") as handle:
            return yaml.safe_load(handle) or {}

    def fill(self, obj, field: str, value) -> bool:
        """Set ``field`` when blank (or always with --reset). True when it changed."""
        current = getattr(obj, field)
        blank = current in (None, "", [])
        if value in (None, "") or (not blank and not self.reset) or current == value:
            return False
        setattr(obj, field, value)
        self.changes += 1
        return True

    # -- site settings --------------------------------------------------------------

    def seed_settings(self) -> None:
        data = self.load("site.yaml").get("site_settings", {})
        row = SiteSettings.load()
        changed = [self.fill(row, name, value) for name, value in data.items()]
        if any(changed):
            row.save()
            self.stdout.write("site settings: updated")

    # -- pages ----------------------------------------------------------------------

    def seed_language(self, code: str) -> None:
        data = self.load(f"{code}.yaml")
        locale = Locale.objects.get(language_code=code)
        if "offices" in data:  # first: programs and routing rules point to office pages
            self.seed_offices(locale, data["offices"])
        if "services" in data:
            self.seed_services(locale, data["services"], data.get("psi") or {})
        if "industries" in data:
            self.seed_industries(locale, data["industries"])
        if "programs" in data:
            self.seed_programs(locale, data["programs"])
        if "news" in data:  # after the programs: an update names its program
            self.seed_news(locale, data["news"])
        if "verify" in data:
            self.seed_verify(locale, data["verify"])
        if "about" in data:  # after the offices: people work from an office page
            self.seed_about(locale, data["about"], data.get("trust") or {})
        if "complaints" in data or "careers" in data:  # under About (T23)
            self.seed_form_pages(locale, data)
        if "training" in data:
            self.seed_training(locale, data["training"])
        if "home" in data:  # last: its cards and rows link to the hub pages above (T9)
            self.seed_home(locale, data["home"])

    def seed_home(self, locale: Locale, data: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            self.stdout.write(f"{locale.language_code}: no home page (run zeneon_setup_locales)")
            return
        changed = [self.fill(home, name, data.get(name)) for name in ("title", *HOME_FIELDS)]
        sections = data.get("sections")
        if sections and (self.reset or not home.sections.raw_data):
            home.sections = self.link_pages(home, sections)
            self.changes += 1
            changed.append(True)
        if any(changed):
            home.draft_title = home.title
            revision = home.save_revision()
            revision.publish()
            self.stdout.write(f"{locale.language_code}: home page updated")

    PAGE_KEYS = ("page", "link_page")

    def link_pages(self, home, value):
        """Swap each ``page``/``link_page`` path (``services/inspection``) for the live
        page's id under this home; a path with no live page yet is dropped (D29)."""
        if isinstance(value, list):
            return [self.link_pages(home, item) for item in value]
        if not isinstance(value, dict):
            return value
        out = {}
        for key, item in value.items():
            if key in self.PAGE_KEYS and isinstance(item, str):
                url_path = f"{home.url_path}{item.strip('/')}/"
                page = Page.objects.live().filter(url_path=url_path).first()
                if page is None:
                    self.stderr.write(f"home link: no live page {item}")
                    continue
                out[key] = page.pk
            else:
                out[key] = self.link_pages(home, item)
        return out

    # -- services (T10) -------------------------------------------------------------

    def child(self, parent, model, slug: str, title: str, *, live: bool, **fields):
        """The child page ``slug`` of ``parent``, created when missing. Returns
        ``(page, touchable)``: False when an editor has unpublished changes on it, so the
        seed leaves it alone. A draft the seed created is never touched again."""
        page = parent.get_children().filter(slug=slug).specific().first()
        if page is not None:
            return page, not page.has_unpublished_changes
        page = model(title=title, slug=slug, live=live, **fields)
        parent.add_child(instance=page)
        revision = page.save_revision()
        if live:
            revision.publish()
        self.changes += 1
        return model.objects.get(pk=page.pk), live

    def fill_page(self, page, data: dict, names, streams=()) -> bool:
        changed = [self.fill(page, name, data.get(name)) for name in names]
        for name, value in streams:
            if value and (self.reset or not getattr(page, name).raw_data):
                setattr(page, name, value)
                self.changes += 1
                changed.append(True)
        if any(changed):
            page.save_revision().publish()
        return any(changed)

    def seed_services(self, locale: Locale, data: dict, psi: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        index, touch = self.child(
            home,
            ServiceIndexPage,
            data["slug"],
            data["title"],
            live=True,
            show_in_menus=True,
            intro=data.get("intro", ""),
            header_caption=data.get("header_caption", ""),
        )
        if touch:
            self.fill_page(index, data, ("intro", "header_caption"))
        psi_page = None
        for g in data.get("groups", []):
            group, touch = self.child(
                index,
                ServiceGroupPage,
                g["slug"],
                g["title"],
                live=True,
                group=g["group"],
            )
            if touch:
                points = [{"type": "point", "value": text} for text in g.get("how_points", [])]
                self.fill_page(
                    group,
                    g,
                    ("summary", "intro", "header_caption", "link_label", "how_heading"),
                    streams=[("how_points", points)],
                )
            for s in g.get("services", []):
                is_psi = s.get("page") == "psi"
                fields = {k: s[k] for k in ("summary", "card_caption") if k in s}
                page, _touch = self.child(
                    group, ServicePage, s["slug"], s["title"], live=is_psi, **fields
                )
                if is_psi:
                    psi_page = page
        if psi_page is not None and psi:
            self.seed_psi(home, psi_page.specific, psi)
        self.stdout.write(f"{locale.language_code}: services checked")

    def seed_psi(self, home, page, data: dict) -> None:
        if page.has_unpublished_changes:
            return
        parts = []
        for part in data.get("parts", []):
            value = dict(part["value"])
            if part["type"] == "related":
                pages = home.get_descendants().filter(slug__in=value["pages"])
                by_slug = {p.slug: p.pk for p in pages}
                value["pages"] = [by_slug[s] for s in value["pages"] if s in by_slug]
            parts.append({"type": part["type"], "value": value})
        self.fill_page(
            page, data, ("intro", "header_caption", "talk_label"), streams=[("parts", parts)]
        )

    # -- industries (T11) -----------------------------------------------------------

    INDUSTRY_FIELDS = (
        "summary",
        "card_caption",
        "intro",
        "header_caption",
        "services_heading",
        "why_heading",
        "why_text",
    )

    def seed_industries(self, locale: Locale, data: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        index, touch = self.child(
            home,
            IndustryIndexPage,
            data["slug"],
            data["title"],
            live=True,
            show_in_menus=True,
        )
        if touch:
            self.fill_page(index, data, ("intro", "header_caption", "heading"))
        service_root = ServiceIndexPage.objects.filter(locale=locale).first()
        for item in data.get("pages", []):
            page, touch = self.child(index, IndustryPage, item["slug"], item["title"], live=True)
            if not touch:
                continue
            cards = [
                {"type": "card", "value": value}
                for value in (self.service_card(service_root, c) for c in item.get("services", []))
                if value
            ]
            figures = [{"type": "figure", "value": f} for f in item.get("figures", [])]
            points = [{"type": "point", "value": text} for text in item.get("where_points", [])]
            self.fill_page(
                page,
                item,
                self.INDUSTRY_FIELDS,
                streams=[("services", cards), ("figures", figures), ("where_points", points)],
            )
        self.stdout.write(f"{locale.language_code}: industries checked")

    def service_card(self, service_root, card: dict):
        """A service card value, its page found by slug under the services hub."""
        if service_root is None:
            return None
        page = (
            service_root.get_descendants(inclusive=True)
            .type(ServicePage, ServiceGroupPage)
            .filter(slug=card["page"])
            .first()
        )
        if page is None:
            self.stderr.write(f"industry card: no service page {card['page']}")
            return None
        return {"page": page.pk, "title": card.get("title", ""), "text": card["text"]}

    # -- programs and news (T18, D44) -------------------------------------------------

    PROGRAM_INDEX_FIELDS = (
        "intro",
        "header_caption",
        "heading",
        "rule_line",
        "updates_heading",
        "updates_text",
        "ask_heading",
        "ask_text",
    )
    PROGRAM_FIELDS = (
        "intro",
        "header_caption",
        "country",
        "summary",
        "regulator_name",
        "regulator_abbreviation",
        "regulator_url",
        "appointment_status",
        "appointment_date",
        "appointment_reference",
        "owning_office_name",
        "request_label",
        "talk_label",
    )

    @staticmethod
    def dates(data: dict, *names) -> dict:
        """``data`` with each of ``names`` as a date (YAML may give a string)."""
        out = dict(data)
        for name in names:
            if isinstance(out.get(name), str):
                out[name] = datetime.date.fromisoformat(out[name])
        return out

    def seed_programs(self, locale: Locale, data: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        index, touch = self.child(
            home, ProgramIndexPage, data["slug"], data["title"], live=True, show_in_menus=True
        )
        if touch:
            pending = [{"type": "pending", "value": card} for card in data.get("pending", [])]
            self.fill_page(index, data, self.PROGRAM_INDEX_FIELDS, streams=[("pending", pending)])
        feed = data.get("updates_page")
        if feed:
            page, touch = self.child(
                index, RegulatoryUpdatesPage, feed["slug"], feed["title"], live=True
            )
            if touch:
                self.fill_page(page, feed, ("intro",))
        for item in data.get("pages", []):
            page, touch = self.child(index, ProgramPage, item["slug"], item["title"], live=True)
            office = OfficePage.objects.filter(
                locale=locale, slug=item.get("owning_office") or "-"
            ).first()
            if touch and office is not None and page.owning_office_id is None:
                page.owning_office = office
                page.save_revision().publish()
                self.changes += 1
            if touch:
                self.fill_page(
                    page,
                    self.dates(item, "appointment_date"),
                    self.PROGRAM_FIELDS,
                    streams=[("parts", item.get("parts", []))],
                )
        # The services hub's Programs card goes to this section (ServiceGroupPage.see_also).
        group = ServiceGroupPage.objects.filter(locale=locale, group="programs").first()
        if group is not None and group.see_also_id is None and not group.has_unpublished_changes:
            group.see_also = index
            group.save_revision().publish()
            self.changes += 1
        self.stdout.write(f"{locale.language_code}: programs checked")

    def seed_news(self, locale: Locale, data: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        index, touch = self.child(home, NewsIndexPage, data["slug"], data["title"], live=True)
        if touch:
            self.fill_page(index, data, ("intro",))
        programs = {p.slug: p for p in ProgramPage.objects.filter(locale=locale)}
        for item in data.get("pages", []):
            item = self.dates(item, "date")
            page, touch = self.child(
                index,
                NewsPage,
                item["slug"],
                item["title"],
                live=True,
                kind=item.get("kind", "news"),
                date=item["date"],
                program=programs.get(item.get("program")),
            )
            if touch:
                self.fill_page(page, item, ("standfirst", "body", "office_name"))
        self.stdout.write(f"{locale.language_code}: news checked")

    VERIFY_FIELDS = (
        "intro",
        "input_label",
        "button_label",
        "shown_note",
        "fraud_warning",
        "head_office_contact",
        "mismatch_heading",
        "mismatch_text",
        "answers_heading",
        "answers",
        "answers_note",
    )

    def seed_verify(self, locale: Locale, data: dict) -> None:
        """The Verify page's text (T19). Certificates are never seeded: they come from
        ``import_certificates`` (seed/certificates-sample.csv is for staging only)."""
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        page, touch = self.child(home, VerifyPage, data["slug"], data["title"], live=True)
        if touch:
            self.fill_page(page, data, self.VERIFY_FIELDS)
        self.stdout.write(f"{locale.language_code}: verify checked")

    def seed_offices(self, locale: Locale, data: dict) -> None:
        """The office index and one page per row of seed/offices.yaml (T20), each with
        its editor group and collection (``add_office``). Default language only: other
        languages are translations an office makes (T29)."""
        home = HomePage.objects.filter(locale=locale).first()
        if home is None or locale != Locale.get_default():
            return
        index, touch = self.child(home, OfficeIndexPage, data["slug"], data["title"], live=True)
        if touch:
            self.fill_page(index, data, ("intro",))
        for slug, row in office_rows().items():
            page = OfficePage.objects.child_of(index).filter(slug=slug).specific().first()
            if page is None:
                page = create_office(index, row)
                self.changes += 1
            elif not page.has_unpublished_changes and fill_office(page, row):
                self.changes += 1
            self.changes += min(setup_office(page)[2], 1)
        self.stdout.write(f"{locale.language_code}: offices checked")

    # -- About, Leadership, Our group (T21) ------------------------------------------

    ABOUT_FIELDS = ("seo_title", "intro", "header_caption")
    LEADERSHIP_FIELDS = ("intro", "ceo_quote", "note")
    GROUP_FIELDS = ("intro", "independence_heading", "independence", "independence_link_label")

    def seed_about(self, locale: Locale, data: dict, trust: dict) -> None:
        """About and its two children; the people of the Leadership page as ``Person``
        snippets with "[Name]" and not agreed to be named (P-16). The section links are
        set after the children exist (a path with no page keeps the card unlinked)."""
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        about, touch_about = self.child(
            home, AboutPage, data["slug"], data["title"], live=True, show_in_menus=True
        )
        people = {key: self.person(locale, row) for key, row in (data.get("people") or {}).items()}

        lead = data.get("leadership")
        if lead:
            page, touch = self.child(
                about, LeadershipPage, lead["slug"], lead["title"], live=True, show_in_menus=True
            )
            if touch:
                ceo = people.get(lead.get("ceo"))
                new_ceo = page.ceo_id is None and ceo is not None
                if new_ceo:
                    page.ceo = ceo
                    self.changes += 1
                groups = [
                    {
                        "type": "group",
                        "value": {
                            "heading": group["heading"],
                            "style": group.get("style", "large"),
                            "people": [people[key].pk for key in group["people"] if key in people],
                        },
                    }
                    for group in lead.get("groups", [])
                ]
                published = self.fill_page(
                    page, lead, self.LEADERSHIP_FIELDS, streams=[("groups", groups)]
                )
                if new_ceo and not published:
                    page.save_revision().publish()

        grp = data.get("group")
        if grp:
            page, touch = self.child(
                about,
                GroupPage,
                grp["slug"],
                grp["title"],
                live=True,
                show_in_menus=True,
                independence=grp["independence"],
            )
            if touch:
                companies = [{"type": "company", "value": row} for row in grp.get("companies", [])]
                self.fill_page(page, grp, self.GROUP_FIELDS, streams=[("companies", companies)])

        if trust:  # before the sections: their cards link to the trust pages (T22)
            self.seed_trust(locale, home, about, trust)

        if touch_about:
            sections = data.get("sections")
            if sections and (self.reset or not about.sections.raw_data):
                sections = self.link_pages(home, sections)
            self.fill_page(about, data, self.ABOUT_FIELDS, streams=[("sections", sections)])
        self.stdout.write(f"{locale.language_code}: about checked")

    # -- Accreditations and policy pages (T22) ----------------------------------------

    ACCREDITATIONS_FIELDS = (
        "intro",
        "table_heading",
        "table_note",
        "rules_heading",
        "rules",
        "marks_heading",
        "marks_note",
    )
    POLICY_FIELDS = ("intro", "document_code", "version", "issuing_entity", "other_pdf_label")

    def seed_trust(self, locale: Locale, home, about, data: dict) -> None:
        """The Accreditation rows (default language: the snippet is not translated), the
        Accreditations page and the policy pages. A policy page is live only with its
        four document facts (code, issue, date, owner); else it stays a draft."""
        owner = Person.objects.filter(locale=locale, title=data.get("owner", "")).first()
        if locale == Locale.get_default():
            for order, row in enumerate(data.get("accreditations", [])):
                self.accreditation(order, row)

        page_data = data.get("accreditations_page")
        if page_data:
            page, touch = self.child(
                about,
                AccreditationsPage,
                page_data["slug"],
                page_data["title"],
                live=True,
                show_in_menus=True,
            )
            if touch:
                self.fill_page(page, page_data, self.ACCREDITATIONS_FIELDS)

        for item in data.get("policies", []):
            self.policy(home, about, item, owner)
        self.stdout.write(f"{locale.language_code}: trust pages checked")

    def policy(self, home, about, item: dict, owner) -> None:
        date = item.get("effective_date")
        facts = {
            **{name: item.get(name, "") for name in self.POLICY_FIELDS},
            "effective_date": datetime.date.fromisoformat(date) if date else None,
            "document_owner": owner if date else None,
            "pdf": self.document(item["pdf"]) if item.get("pdf") else None,
            "other_pdf": self.document(item["other_pdf"]) if item.get("other_pdf") else None,
            "sections": [{"type": "section", "value": row} for row in item.get("sections", [])],
            "related": [
                {"type": "page", "value": row["page"]}
                for row in self.link_pages(home, [{"page": p} for p in item.get("related", [])])
                if "page" in row
            ],
        }
        live = all(facts.get(name) for name in CONTENT_PAGE_REQUIRED)
        page = about.get_children().filter(slug=item["slug"]).specific().first()
        if page is None:  # made once, live or as a draft with all its text
            page = ContentPage(
                title=item["title"], slug=item["slug"], live=live, show_in_menus=True, **facts
            )
            about.add_child(instance=page)
            revision = page.save_revision()
            if live:
                revision.publish()
            self.changes += 1
            return
        if page.has_unpublished_changes or not page.live:
            return  # an editor's draft, or a seed draft waiting for its facts
        changed = [
            self.fill(page, name, facts[name])
            for name in (
                *self.POLICY_FIELDS,
                "effective_date",
                "document_owner",
                "pdf",
                "other_pdf",
            )
        ]
        for name in ("sections", "related"):
            if facts[name] and (self.reset or not getattr(page, name).raw_data):
                setattr(page, name, facts[name])
                self.changes += 1
                changed.append(True)
        if any(changed):
            page.save_revision().publish()

    def accreditation(self, order: int, row: dict) -> None:
        """One public row, matched by body and scheme; blank fields are filled."""
        row = {
            **row,
            "valid_until": datetime.date.fromisoformat(row["valid_until"])
            if row.get("valid_until")
            else None,
        }
        item = Accreditation.objects.filter(
            body=row["body"], standard_or_scheme=row["standard_or_scheme"]
        ).first()
        if item is None:
            item = Accreditation(sort_order=order, is_public=True, **row)
            item.full_clean()
            item.save()
            self.changes += 1
            return
        changed = [self.fill(item, name, value) for name, value in row.items()]
        if any(changed):
            item.full_clean()
            item.save()

    def document(self, row: dict):
        """The seed PDF ``seed/documents/<file>`` as a Wagtail document, made once."""
        Document = get_document_model()
        doc = Document.objects.filter(title=row["title"]).first()
        if doc is None:
            with (SEED_DIR / "documents" / row["file"]).open("rb") as handle:
                doc = Document(title=row["title"])
                doc.file.save(row["file"], File(handle), save=False)
                doc.save()
            self.changes += 1
        return doc

    def person(self, locale: Locale, row: dict) -> Person:
        """The person with this title (and office) in this language, created as "[Name]"
        when missing. A row an editor named is never changed."""
        office = OfficePage.objects.filter(locale=locale, slug=row.get("office") or "-").first()
        person = Person.objects.filter(locale=locale, title=row["title"], office=office).first()
        if person is None:
            person = Person.objects.create(
                locale=locale,
                name="[Name]",
                title=row["title"],
                office=office,
                bio=row.get("bio", ""),
            )
            self.changes += 1
        return person

    # -- Complaints, Careers, Training (T23, D53) ---------------------------------------

    COMPLAINTS_FIELDS = (
        "intro",
        "complaint_title",
        "complaint_text",
        "appeal_title",
        "appeal_text",
        "steps_note",
        "form_text",
        "other_ways",
    )
    CAREERS_FIELDS = (
        "intro",
        "header_caption",
        "openings_note",
        "no_openings_text",
        "look_for_heading",
        "look_for",
        "photo_caption",
        "apply_text",
        "button_label",
        "privacy_note",
    )
    TRAINING_FIELDS = ("intro", "empty_text", "note")

    def seed_form_pages(self, locale: Locale, data: dict) -> None:
        """Complaints and Careers under About. Careers has no open role: HR adds them."""
        about = AboutPage.objects.filter(locale=locale).first()
        if about is None:
            return
        item = data.get("complaints")
        if item:
            page, touch = self.child(
                about, ComplaintsPage, item["slug"], item["title"], live=True, show_in_menus=True
            )
            if touch:
                steps = [{"type": "step", "value": row} for row in item.get("steps", [])]
                self.fill_page(page, item, self.COMPLAINTS_FIELDS, streams=[("steps", steps)])
        item = data.get("careers")
        if item:
            page, touch = self.child(
                about, CareersPage, item["slug"], item["title"], live=True, show_in_menus=True
            )
            if touch:
                self.fill_page(page, item, self.CAREERS_FIELDS)
        self.stdout.write(f"{locale.language_code}: complaints and careers checked")

    def seed_training(self, locale: Locale, data: dict) -> None:
        """The catalogue under Home and the old site's ten courses as drafts (no price,
        dates or certificate yet: the publish rule). The services hub's Training card
        goes to the catalogue (ServiceGroupPage.see_also)."""
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            return
        index, touch = self.child(home, TrainingIndexPage, data["slug"], data["title"], live=True)
        if touch:
            self.fill_page(index, data, self.TRAINING_FIELDS)
        for item in data.get("courses", []):
            fields = {name: item[name] for name in ("kind", "standard") if name in item}
            self.child(index, CoursePage, item["slug"], item["title"], live=False, **fields)
        group = ServiceGroupPage.objects.filter(locale=locale, group="training").first()
        if group is not None and group.see_also_id is None and not group.has_unpublished_changes:
            group.see_also = index
            group.save_revision().publish()
            self.changes += 1
        self.stdout.write(f"{locale.language_code}: training checked")

    # -- request questions and routing (T17, D41) -------------------------------------

    def seed_requests(self) -> None:
        data = self.load("requests.yaml")
        if not data:
            return
        self.seed_schemas(data.get("schemas") or {}, data.get("programs") or {})
        self.seed_routing(data.get("routing") or [])

    def seed_schemas(self, schemas: dict, programs: dict) -> None:
        """A RequestSchema in the default language for every service group, service
        and program page (key from its "contact" or "checklist" part, default "quote"; a
        program adds its own questions from ``programs``) and for "something else". An
        existing schema keeps its questions unless ``--reset``."""
        locale = Locale.get_default()
        topics = [None]
        topics += ServiceGroupPage.objects.filter(locale=locale).order_by("path")
        topics += ServicePage.objects.filter(locale=locale).order_by("path")
        topics += ProgramPage.objects.filter(locale=locale).order_by("path")
        topics += ComplaintsPage.objects.filter(locale=locale)
        topics += CareersPage.objects.filter(locale=locale)
        topics += CoursePage.objects.filter(locale=locale).order_by("path")
        for topic in topics:
            key = self.schema_key(topic)
            if key not in schemas:
                self.stderr.write(f"request schema: no questions '{key}' in requests.yaml")
                continue
            rows = list(schemas[key])
            if isinstance(topic, ProgramPage):
                rows += programs.get(topic.slug, [])
            questions = json.dumps([self.question(row) for row in rows])
            schema = RequestSchema.objects.filter(topic=topic, locale=locale).first()
            if schema is None:
                RequestSchema.objects.create(topic=topic, locale=locale, questions=questions)
                self.changes += 1
            elif self.reset:
                schema.questions = questions
                schema.save()
                self.changes += 1

    @staticmethod
    def schema_key(topic) -> str:
        form = {
            ComplaintsPage: "complaint",
            CareersPage: "application",
            CoursePage: "course_register",
        }.get(type(topic))
        if form:
            return form
        part = {ServicePage: "contact", ProgramPage: "checklist"}.get(type(topic))
        if part:
            for block in topic.parts:
                if block.block_type == part and block.value.get("schema"):
                    return block.value["schema"]
        return "program_request" if isinstance(topic, ProgramPage) else "quote"

    @staticmethod
    def question(row: dict) -> dict:
        value = {
            "key": row["key"],
            "label": row["label"],
            "help": row.get("help", ""),
            "required": bool(row.get("required")),
        }
        if row["type"] in ("single", "multi"):
            value["options"] = [
                {
                    "key": option["key"],
                    "label": option["label"],
                    "reveals": option.get("reveals") or {"key": "", "label": ""},
                }
                for option in row["options"]
            ]
        return {"type": row["type"], "value": value}

    def seed_routing(self, rows: list) -> None:
        """One RoutingRule per row, matched by name and priority. A blank email is
        filled from the row (or its office's real address); ``--reset`` rewrites the
        address and the conditions."""
        offices = {row["slug"]: row for row in self.load("offices.yaml").get("offices", [])}
        for row in rows:
            email = row.get("email") or offices.get(row.get("office"), {}).get("email", "")
            email = email if self.is_email(email) else ""
            rule = RoutingRule.objects.filter(name=row["name"], priority=row["priority"]).first()
            office = OfficePage.objects.filter(
                locale=Locale.get_default(), slug=row.get("office") or "-"
            ).first()
            if rule is None:
                rule = RoutingRule(name=row["name"], priority=row["priority"])
            elif not self.reset:
                changed = False
                if email and not rule.email:
                    rule.email = email
                    changed = True
                if office is not None and rule.page_id is None:
                    rule.page = office
                    changed = True
                if changed:
                    rule.save()
                    self.changes += 1
                continue
            rule.email = email
            rule.page = office
            rule.save()
            rule.conditions.all().delete()
            for field, value in (row.get("when") or {}).items():
                RoutingCondition.objects.create(rule=rule, field=field, value=str(value))
            self.changes += 1

    @staticmethod
    def is_email(value: str) -> bool:
        try:
            validate_email(value)
        except ValidationError:
            return False
        return True

    # -- redirects (T8; the rows come in T30) ----------------------------------------

    def seed_redirects(self) -> None:
        """One Redirect per ``seed/redirects.csv`` row, for all sites, permanent. A row
        whose old path already has a redirect is left alone (an editor may have changed
        it). The new path is a site path (``/en/services/``, resolved to its page, so
        the redirect follows a later move) or a full ``https://`` URL."""
        path = SEED_DIR / "redirects.csv"
        if not path.exists():
            return
        with path.open(encoding="utf-8", newline="") as handle:
            rows = list(csv.DictReader(handle))
        for row in rows:
            old_path = Redirect.normalise_path(row["old_path"].strip())
            if Redirect.objects.filter(old_path=old_path, site=None).exists():
                continue
            target = self.redirect_target(row["new_path"].strip())
            if target is None:
                self.stderr.write(f"redirect {old_path}: no page at {row['new_path']}")
                continue
            Redirect.add_redirect(old_path, redirect_to=target, is_permanent=True)
            self.changes += 1
        if rows:
            self.stdout.write(f"redirects: {len(rows)} row(s) checked")

    def redirect_target(self, new_path: str):
        """The page at a site path such as ``/en/services/``, or a full URL as given."""
        if new_path.startswith(("https://", "http://")):
            return new_path
        code, _, rest = new_path.strip("/").partition("/")
        home = HomePage.objects.filter(locale__language_code=code).first()
        if home is None:
            return None
        url_path = home.url_path + (rest + "/" if rest else "")
        return Page.objects.filter(url_path=url_path).first()
