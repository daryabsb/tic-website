"""``manage.py add_office <slug>`` (master plan 09, 13 runbook, 16).

Makes the office page under the default language's office index when it is missing
(from its row in ``seed/offices.yaml``), then its editor group and media collection
(``apps.offices.access``). Safe to run again. The routing row is added in the admin
(Routing) or in ``seed/requests.yaml``.
"""

from django.core.management.base import BaseCommand, CommandError
from wagtail.models import Locale

from apps.offices.access import setup_office
from apps.offices.models import OfficeIndexPage, OfficePage
from apps.offices.seed import create_office, office_rows


class Command(BaseCommand):
    help = "Create an office's page (from seed/offices.yaml), editor group and collection."

    def add_arguments(self, parser):
        parser.add_argument("slug", help="The office slug, e.g. 'baghdad'.")

    def handle(self, *args, **options):
        slug = options["slug"]
        locale = Locale.get_default()
        page = OfficePage.objects.filter(slug=slug, locale=locale).first()
        if page is None:
            row = office_rows().get(slug)
            if row is None:
                raise CommandError(
                    f"no office page '{slug}' and no row for it in seed/offices.yaml"
                )
            index = OfficeIndexPage.objects.filter(locale=locale).first()
            if index is None:
                raise CommandError("no office index page: run seed_site first")
            page = create_office(index, row)
            self.stdout.write(f"add_office: page /{slug}/ created")
        group, collection, added = setup_office(page)
        self.stdout.write(
            f"add_office: {page.title}: group '{group.name}', collection '{collection.name}', "
            f"{added} added"
        )
