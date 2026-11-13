"""An office's editor group and media collection (master plan 09; ``add_office``).

``setup_office(page)`` makes, once:

- the collection ``Offices › <City>`` for the office's images and documents;
- the group ``<City> office editors``: admin access, add and edit (not publish: the
  reviewer publishes, T24) on the office page, and add, edit and choose in the
  collection.

It never removes a permission an administrator added.
"""

from __future__ import annotations

from django.contrib.auth.models import Group, Permission
from wagtail.models import Collection, GroupCollectionPermission, GroupPagePermission

PAGE_PERMISSIONS = ("add_page", "change_page")
COLLECTION_PERMISSIONS = (
    ("wagtailimages", "add_image"),
    ("wagtailimages", "change_image"),
    ("wagtailimages", "choose_image"),
    ("wagtaildocs", "add_document"),
    ("wagtaildocs", "change_document"),
    ("wagtaildocs", "choose_document"),
)
OFFICES_COLLECTION = "Offices"


def group_name(page) -> str:
    return f"{page.city} office editors"


def office_collection(city: str) -> Collection:
    root = Collection.get_first_root_node()
    parent = root.get_children().filter(name=OFFICES_COLLECTION).first()
    if parent is None:
        parent = root.add_child(name=OFFICES_COLLECTION)
    collection = parent.get_children().filter(name=city).first()
    if collection is None:
        collection = parent.add_child(name=city)
    return collection


def setup_office(page) -> tuple[Group, Collection, int]:
    """Returns the group, the collection and the number of rows it added."""
    added = 0
    collection = office_collection(page.city)
    group, created = Group.objects.get_or_create(name=group_name(page))
    added += created
    access = Permission.objects.get(content_type__app_label="wagtailadmin", codename="access_admin")
    if not group.permissions.filter(pk=access.pk).exists():
        group.permissions.add(access)
        added += 1
    for codename in PAGE_PERMISSIONS:
        permission = Permission.objects.get(
            content_type__app_label="wagtailcore", codename=codename
        )
        _, created = GroupPagePermission.objects.get_or_create(
            group=group, page=page, permission=permission
        )
        added += created
    for app_label, codename in COLLECTION_PERMISSIONS:
        permission = Permission.objects.get(content_type__app_label=app_label, codename=codename)
        _, created = GroupCollectionPermission.objects.get_or_create(
            group=group, collection=collection, permission=permission
        )
        added += created
    return group, collection, added
