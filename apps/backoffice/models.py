"""The approval step of TIC's two workflows (master plan 09; T24, D54).

``OfficeApprovalTask`` is Wagtail's group approval task with two TIC rules:

- a member of the chosen groups (Content managers, Site admins) approves any page;
  a member of ``<City> office reviewers`` approves only the pages of that office (the
  office page, the programs it owns, its news; ``apps.offices.access.office_of``);
- nobody approves what they submitted themselves (superusers excepted): a second
  person always reads it. With ``WAGTAIL_WORKFLOW_REQUIRE_REAPPROVAL_ON_EDIT`` an edit
  by the reviewer during review starts the task again.
"""

from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _
from wagtail.models import AbstractGroupApprovalTask, TaskState

from apps.offices.access import office_of, reviewer_group_name


class OfficeApprovalTask(AbstractGroupApprovalTask):
    class Meta:
        verbose_name = _("office approval task")
        verbose_name_plural = _("office approval tasks")

    @classmethod
    def get_description(cls):
        return _(
            "Members of the chosen groups approve any page; an office's reviewers approve "
            "that office's pages. Nobody approves their own submission."
        )

    def _office_reviewer(self, obj, user) -> bool:
        office = office_of(obj)
        if office is None:
            return False
        return user.groups.filter(name=reviewer_group_name(office)).exists()

    def can_approve(self, obj, user) -> bool:
        return user.is_superuser or self._user_in_groups(user) or self._office_reviewer(obj, user)

    @staticmethod
    def submitted_by(obj, user) -> bool:
        state = getattr(obj, "current_workflow_state", None)
        return state is not None and state.requested_by_id == user.pk

    def user_can_access_editor(self, obj, user):
        return self.can_approve(obj, user)

    def locked_for_user(self, obj, user):
        return not self.can_approve(obj, user)

    def user_can_lock(self, obj, user):
        return self.can_approve(obj, user)

    def get_actions(self, obj, user):
        if not self.can_approve(obj, user):
            return []
        if self.submitted_by(obj, user) and not user.is_superuser:
            return []
        return [
            ("reject", _("Request changes"), True),
            ("approve", _("Approve"), False),
            ("approve", _("Approve with comment"), True),
        ]

    def get_task_states_user_can_moderate(self, user, **kwargs):
        states = self.task_states.filter(status=TaskState.STATUS_IN_PROGRESS)
        if user.is_superuser or self._user_in_groups(user):
            return states
        if not user.groups.filter(name__endswith=" office reviewers").exists():
            return TaskState.objects.none()
        mine = [
            state.pk
            for state in states.select_related("workflow_state")
            if self._office_reviewer(state.workflow_state.content_object, user)
        ]
        return states.filter(pk__in=mine)


def approver_groups() -> list[Group]:
    """The groups that approve every page: the core's editors and admins groups."""
    from zeneon_cms import conf

    names = conf.get("security.groups")
    return list(Group.objects.filter(name__in=(names["editors"], names["admins"])))
