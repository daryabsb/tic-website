"""Replace Wagtail's "Welcome" page with an empty HomePage in the default language and
point the default Site at it (as Wagtail's project template does).

Runs only on a fresh database: when the welcome page is still the only page under the
root and no HomePage exists. The other languages' home pages are translations made by
`python manage.py zeneon_setup_locales` (and later by the seed, #20).
"""

from django.db import migrations

HOME_TITLE = "TIC Quality Control"


def create_home_page(apps, schema_editor):
    ContentType = apps.get_model("contenttypes.ContentType")
    Page = apps.get_model("wagtailcore.Page")
    Site = apps.get_model("wagtailcore.Site")
    HomePage = apps.get_model("pages.HomePage")

    if HomePage.objects.exists():
        return
    top = Page.objects.filter(depth=2)
    if top.count() != 1:
        return
    welcome = top.get()
    if welcome.content_type.app_label != "wagtailcore" or welcome.content_type.model != "page":
        return

    locale_id = welcome.locale_id
    path = welcome.path
    welcome.delete()
    root = Page.objects.get(depth=1)
    root.numchild = 0
    root.save(update_fields=["numchild"])

    content_type, _ = ContentType.objects.get_or_create(model="homepage", app_label="pages")
    home = HomePage.objects.create(
        title=HOME_TITLE,
        draft_title=HOME_TITLE,
        slug="home",
        content_type=content_type,
        path=path,
        depth=2,
        numchild=0,
        url_path="/home/",
        locale_id=locale_id,
        live=True,
    )
    root.numchild = 1
    root.save(update_fields=["numchild"])

    Site.objects.filter(is_default_site=True).update(root_page_id=home.pk)
    if not Site.objects.exists():
        Site.objects.create(hostname="localhost", port=80, root_page=home, is_default_site=True)


class Migration(migrations.Migration):
    dependencies = [
        ("pages", "0001_initial"),
        ("wagtailcore", "0097_baselogentry_uuid_action_timestamp_indexes"),
    ]

    operations = [migrations.RunPython(create_home_page, migrations.RunPython.noop)]
