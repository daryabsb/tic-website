"""List the texts of the Arabic-first pages that have no Arabic yet (master plan 08; T29).

    python manage.py arabic_pages          # the gaps, by page
    python manage.py arabic_pages --rows   # the gaps as rows to paste into seed/ar.yaml

The pages are the ones ``seed/ar.yaml`` names. Add the Arabic to the file, run
``seed_site``, then run the command again.
"""

import json

from django.core.management.base import BaseCommand

from apps.pages.translated import missing_texts


class Command(BaseCommand):
    help = "List the texts of the Arabic-first pages with no Arabic in seed/ar.yaml."

    def add_arguments(self, parser):
        parser.add_argument("--rows", action="store_true", help="print rows for seed/ar.yaml")

    def handle(self, *args, **options):
        missing = missing_texts("ar")
        seen = set()
        for path, texts in missing.items():
            self.stdout.write(f"# {path}")
            for text in texts:
                if options["rows"]:
                    if text not in seen:  # one row for a text that is on two pages
                        self.stdout.write(f"  - en: {json.dumps(text, ensure_ascii=False)}")
                        self.stdout.write('    ar: ""')
                else:
                    self.stdout.write(f"  {text!r}")
                seen.add(text)
        self.stdout.write(f"{len(seen)} page texts without Arabic")
