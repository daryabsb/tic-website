"""``python manage.py seed_site``: the content seed (master plan 02, D15).

Reads ``seed/site.yaml`` (language-neutral site settings) and ``seed/<lang>.yaml`` (page
copy, one file per language) and ``seed/redirects.csv`` (old path, new path; master plan
10). Gate 0 seeds the site settings, the home page and the redirects; the other page
types join their tickets. ``seed/offices.yaml`` holds the fourteen office rows; T20
loads them when ``OfficePage`` exists.

Idempotent and safe over editors' work (as the Zeneonix seed, D30 there): rows are
matched by slug; blank fields are filled, nothing else is changed; a second run changes
nothing and says so. ``--reset`` overwrites the seeded fields (staging only).
"""

from __future__ import annotations

import csv
from pathlib import Path

import yaml
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from wagtail.contrib.redirects.models import Redirect
from wagtail.models import Locale, Page
from zeneon_cms.core.locales import ensure_locales
from zeneon_cms.core.models import SiteSettings

from apps.pages.models import HomePage
from apps.services.models import ServiceGroupPage, ServiceIndexPage, ServicePage

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
            self.seed_redirects()
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
        if "home" in data:
            self.seed_home(locale, data["home"])
        if "services" in data:
            self.seed_services(locale, data["services"], data.get("psi") or {})

    def seed_home(self, locale: Locale, data: dict) -> None:
        home = HomePage.objects.filter(locale=locale).first()
        if home is None:
            self.stdout.write(f"{locale.language_code}: no home page (run zeneon_setup_locales)")
            return
        changed = [self.fill(home, name, data.get(name)) for name in ("title", *HOME_FIELDS)]
        sections = data.get("sections")
        if sections and (self.reset or not home.sections.raw_data):
            home.sections = sections
            self.changes += 1
            changed.append(True)
        if any(changed):
            home.draft_title = home.title
            revision = home.save_revision()
            revision.publish()
            self.stdout.write(f"{locale.language_code}: home page updated")

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

    def fill_page(self, page, data: dict, names, streams=()) -> None:
        changed = [self.fill(page, name, data.get(name)) for name in names]
        for name, value in streams:
            if value and (self.reset or not getattr(page, name).raw_data):
                setattr(page, name, value)
                self.changes += 1
                changed.append(True)
        if any(changed):
            page.save_revision().publish()

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
