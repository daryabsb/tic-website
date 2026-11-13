"""``manage.py import_certificates <csv> [--full] [--operator NAME]`` (master plan 06).

Prints the counts and the rejected rows, writes an ``ImportLog`` row, and mails the
same report to ``TIC_VERIFY["report_email"]`` (the Quality Manager) when it is set.
"""

import getpass
from pathlib import Path

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand, CommandError

from apps.verify.importer import import_file


class Command(BaseCommand):
    help = "Load certificates from a CSV export (idempotent on the number)."

    def add_arguments(self, parser):
        parser.add_argument("csv", help="Path to the CSV file.")
        parser.add_argument(
            "--full",
            action="store_true",
            help="The file is the whole register: mark certificates missing from it withdrawn.",
        )
        parser.add_argument(
            "--operator", default="", help="Who ran the import (default: the OS user)."
        )

    def handle(self, *args, **options):
        path = Path(options["csv"])
        if not path.is_file():
            raise CommandError(f"no file {path}")
        operator = options["operator"] or getpass.getuser()
        try:
            report = import_file(path, full=options["full"], operator=operator, file_name=path.name)
        except ValueError as exc:
            raise CommandError(str(exc)) from exc
        lines = [f"import_certificates {path.name} ({'full' if options['full'] else 'partial'})"]
        lines += report.lines()
        for line in lines:
            self.stdout.write(line)
        recipient = settings.TIC_VERIFY.get("report_email")
        if recipient:
            send_mail(
                f"Certificate import: {report.created} new, {len(report.rejects)} rejected",
                "\n".join([*lines, f"operator: {operator}"]),
                None,
                [recipient],
            )
