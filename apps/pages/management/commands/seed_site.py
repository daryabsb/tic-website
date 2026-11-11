"""``python manage.py seed_site``: the content seed (master plan 02, D15).

Reads ``seed/site.yaml`` (language-neutral site settings) and ``seed/<lang>.yaml`` (page
copy, one file per language). Gate 0 seeds the site settings and the home page; the
other page types join their tickets (#8 onwards).

Idempotent and safe over editors' work (as the Zeneonix seed, D30 there): rows are
matched by slug; blank fields are filled, nothing else is changed; a second run changes
nothing and says so. ``--reset`` overwrites the seeded fields (staging only).
"""

from __future__ import annotations

from pathlib import Path

import yaml
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from wagtail.models import Locale
from zeneon_cms.core.locales import ensure_locales
from zeneon_cms.core.models import SiteSettings

from apps.pages.models import HomePage

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
