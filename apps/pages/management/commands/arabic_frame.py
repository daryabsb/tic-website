"""List the visible msgids that have no Arabic yet (master plan 08; T28, D60).

    python manage.py arabic_frame

Each line: the msgid and the files that use it. Add the Arabic to locale/ar, or to the
core's catalogue for a ``core:`` file, then run the command again.
"""

from django.core.management.base import BaseCommand

from apps.pages.visible_text import missing_arabic


class Command(BaseCommand):
    help = "List the msgids a visitor can see that have no Arabic msgstr."

    def handle(self, *args, **options):
        missing = missing_arabic()
        for msgid, files in sorted(missing.items()):
            self.stdout.write(f"{msgid!r}  ({', '.join(sorted(files))})")
        self.stdout.write(f"{len(missing)} visible msgids without Arabic")
