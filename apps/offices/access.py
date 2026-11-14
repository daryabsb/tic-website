"""An office's groups and media collection (master plan 09; ``add_office``; T24, D54).

``setup_office(page)`` makes, once:

- the collection ``Offices › <City>`` for the office's images and documents;
- the group ``<City> office editors``: admin access; add and edit (not publish) on the
  office page and its translations and on the program pages the office owns; add in
  every news index (so they write news and edit their own); add, edit and choose in the
  collection. Their changes go to the reviewer through the "Review" or "Light" workflow;
- the group ``<City> office reviewers``: the same, plus publish on the office page and
  its programs. In the workflows they approve the pages of their own office only
  (``apps.backoffice.models.OfficeApprovalTask``).

``sync_program_scope`` runs when a program page is published: the rights on it follow
its owning office (rows of other office groups on it are removed).

It never removes a permission an administrator added to any other page.
"""

from __future__ import annotations

from django.contrib.auth.models import Group, Permission
from wagtail.models import Collection, GroupCollectionPermission, GroupPagePermission, Locale

EDITOR_PAGE = ("add_page", "change_page")
REVIEWER_PAGE = ("add_page", "change_page", "publish_page")
EDITOR_PROGRAM = ("change_page",)
REVIEWER_PROGRAM = ("change_page", "publish_page")
NEWS = ("add_page",)
COLLECTION_PERMISSIONS = (
    ("wagtailimages", "add_image"),
    ("wagtailimages", "change_image"),
    ("wagtailimages", "choose_image"),
    ("wagtaildocs", "add_document"),
    ("wagtaildocs", "change_document"),
    ("wagtaildocs", "choose_document"),
)
OFFICES_COLLECTION = "Offices"
EDITORS_SUFFIX = " office editors"
REVIEWERS_SUFFIX = " office reviewers"


def group_name(page) -> str:
    return f"{page.city}{EDITORS_SUFFIX}"


def reviewer_group_name(page) -> str:
    return f"{page.city}{REVIEWERS_SUFFIX}"


def office_collection(city: str) -> Collection:
    root = Collection.get_first_root_node()
    parent = root.get_children().filter(name=OFFICES_COLLECTION).first()
    if parent is None:
        parent = root.add_child(name=OFFICES_COLLECTION)
    collection = parent.get_children().filter(name=city).first()
    if collection is None:
        collection = parent.add_child(name=city)
    return collection


def _page_permission(codename: str) -> Permission:
    return Permission.objects.get(content_type__app_label="wagtailcore", codename=codename)


def _grant(group: Group, pages, codenames) -> int:
    added = 0
    for page in pages:
        for codename in codenames:
            _, created = GroupPagePermission.objects.get_or_create(
                group=group, page=page, permission=_page_permission(codename)
            )
            added += created
    return added


def home_office(page):
    """The default-language office page for any translation of it (or None)."""
    from apps.offices.models import OfficePage

    if page is None:
        return None
    return (
        OfficePage.objects.filter(
            translation_key=page.translation_key, locale=Locale.get_default()
        ).first()
        or OfficePage.objects.filter(pk=page.pk).first()
    )


def office_of(page):
    """The office a page belongs to: an office page itself, the owning office of a
    program, the office of a news page; None for every other page."""
    from apps.offices.models import OfficePage

    page = page.specific
    if isinstance(page, OfficePage):
        return home_office(page)
    for field in ("owning_office", "office"):
        if getattr(page, f"{field}_id", None):
            return home_office(getattr(page, field))
    return None


def office_groups(office) -> tuple[Group, Group]:
    editors, _ = Group.objects.get_or_create(name=group_name(office))
    reviewers, _ = Group.objects.get_or_create(name=reviewer_group_name(office))
    return editors, reviewers


def owned_programs(office):
    from apps.programs.models import ProgramPage

    offices = office.get_translations(inclusive=True)
    return ProgramPage.objects.filter(owning_office__in=offices)


def setup_office(page) -> tuple[Group, Collection, int]:
    """Returns the editor group, the collection and the number of rows it added."""
    from apps.news.models import NewsIndexPage

    office = home_office(page)
    names = (group_name(office), reviewer_group_name(office))
    added = len(names) - Group.objects.filter(name__in=names).count()
    editors, reviewers = office_groups(office)
    collection = office_collection(office.city)
    access = Permission.objects.get(content_type__app_label="wagtailadmin", codename="access_admin")
    office_pages = list(office.get_translations(inclusive=True))
    programs = list(owned_programs(office))
    news = list(NewsIndexPage.objects.all())
    for group, page_rights, program_rights in (
        (editors, EDITOR_PAGE, EDITOR_PROGRAM),
        (reviewers, REVIEWER_PAGE, REVIEWER_PROGRAM),
    ):
        if not group.permissions.filter(pk=access.pk).exists():
            group.permissions.add(access)
            added += 1
        added += _grant(group, office_pages, page_rights)
        added += _grant(group, programs, program_rights)
        added += _grant(group, news, NEWS)
        for app_label, codename in COLLECTION_PERMISSIONS:
            permission = Permission.objects.get(
                content_type__app_label=app_label, codename=codename
            )
            _, created = GroupCollectionPermission.objects.get_or_create(
                group=group, collection=collection, permission=permission
            )
            added += created
    return editors, collection, added


def sync_program_scope(sender=None, instance=None, **kwargs) -> None:
    """``page_published``: the office groups' rights on a program follow its owner."""
    from apps.programs.models import ProgramPage

    page = getattr(instance, "specific", instance)
    if not isinstance(page, ProgramPage):
        return
    office = office_of(page)
    groups = office_groups(office) if office else ()
    rows = GroupPagePermission.objects.filter(page=page)
    office_rows = rows.filter(group__name__endswith=EDITORS_SUFFIX) | rows.filter(
        group__name__endswith=REVIEWERS_SUFFIX
    )
    office_rows.exclude(group__in=groups).delete()
    if office:
        editors, reviewers = groups
        _grant(editors, [page], EDITOR_PROGRAM)
        _grant(reviewers, [page], REVIEWER_PROGRAM)
