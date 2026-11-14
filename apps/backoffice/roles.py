"""The six roles and two workflows of master plan 09 (T24, D54). ``ensure_roles()`` runs
from ``seed_site`` and is safe to run again; it never removes a permission.

| Role            | Group                                   | Made by                     |
| --------------- | --------------------------------------- | --------------------------- |
| Global Admin    | Site admins                             | core (``security.groups``)  |
| Content Manager | Content managers                        | core                        |
| Translator      | Translators: ar                         | core                        |
| Office Editor   | ``<City> office editors``               | ``add_office``              |
| Reviewer        | ``<City> office reviewers``             | ``add_office``              |
| Viewer          | Viewers                                 | here                        |

Workflows: **Review** on every language's home (so on every page), **Light** on the
news index (office news). Both have one ``OfficeApprovalTask``: a content manager or a
site admin approves any page, an office's reviewer that office's pages, nobody their
own submission.
"""

from __future__ import annotations

from django.contrib.auth.models import Group, Permission
from wagtail.models import Workflow, WorkflowPage, WorkflowTask

from apps.backoffice.models import OfficeApprovalTask, approver_groups

VIEWERS = "Viewers"
# Viewers read the admin: requests, certificate lookups and logs, reports. Wagtail has no
# read-only page permission, so they read page history in Reports → Site history.
VIEWER_APPS = ("zeneon_requests", "verify")
TASK_NAME = "Approval: office reviewer or content manager"
WORKFLOWS = {
    "Review": "pages.HomePage",
    "Light": "news.NewsIndexPage",
}


def ensure_viewers() -> Group:
    group, _ = Group.objects.get_or_create(name=VIEWERS)
    permissions = Permission.objects.filter(
        content_type__app_label__in=VIEWER_APPS, codename__startswith="view_"
    ) | Permission.objects.filter(content_type__app_label="wagtailadmin", codename="access_admin")
    group.permissions.add(*permissions)
    return group


def ensure_task() -> OfficeApprovalTask:
    task = OfficeApprovalTask.objects.filter(name=TASK_NAME).first()
    if task is None:
        task = OfficeApprovalTask.objects.create(name=TASK_NAME)
    task.groups.add(*approver_groups())
    return task


def ensure_workflows() -> dict[str, Workflow]:
    from django.apps import apps

    task = ensure_task()
    workflows = {}
    for name, model_label in WORKFLOWS.items():
        workflow, _ = Workflow.objects.get_or_create(name=name)
        if not WorkflowTask.objects.filter(workflow=workflow, task=task).exists():
            WorkflowTask.objects.create(workflow=workflow, task=task, sort_order=0)
        model = apps.get_model(model_label)
        for page in model.objects.all():
            WorkflowPage.objects.get_or_create(page=page, defaults={"workflow": workflow})
        workflows[name] = workflow
    return workflows


def ensure_office_rights() -> int:
    """Every office's groups again: the news index and the programs are seeded after
    the offices, so their rows come here. Returns the number of offices changed."""
    from wagtail.models import Locale

    from apps.offices.access import setup_office
    from apps.offices.models import OfficePage

    offices = OfficePage.objects.filter(locale=Locale.get_default())
    return sum(min(setup_office(office)[2], 1) for office in offices)


def ensure_roles() -> int:
    ensure_viewers()
    ensure_workflows()
    return ensure_office_rights()
