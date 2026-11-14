"""T24: roles, groups, workflows and review-by reminders (master plan 09; D54)."""

import datetime

import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core import mail
from django.core.management import call_command
from wagtail.models import GroupPagePermission, WorkflowPage

from apps.backoffice.roles import VIEWERS
from apps.news.models import NewsIndexPage
from apps.offices.models import OfficePage
from apps.pages.models import HomePage
from apps.programs.models import ProgramPage

User = get_user_model()


def person(username, *groups):
    user = User.objects.create_user(username, f"{username}@example.com", "x")
    user.groups.add(*Group.objects.filter(name__in=groups))
    return user


@pytest.fixture
def staff(seeded_home):
    return {
        "editor": person("baghdad-editor", "Baghdad office editors"),
        "reviewer": person("baghdad-reviewer", "Baghdad office reviewers"),
        "other": person("dubai-reviewer", "Dubai office reviewers"),
        "manager": person("manager", "Content managers"),
        "viewer": person("viewer", VIEWERS),
    }


def office(slug):
    return OfficePage.objects.get(slug=slug, locale__language_code="en")


def submit(page, user, **changes):
    for name, value in changes.items():
        setattr(page, name, value)
    page.save_revision(user=user)
    page.get_workflow().start(page, user)
    page.refresh_from_db()
    return page


def approve(page, user):
    task = page.current_workflow_task
    task.on_action(page.current_workflow_task_state, user, "approve")
    page.refresh_from_db()
    return page


def test_the_seed_makes_the_groups_and_the_workflows(seeded_home):
    names = set(Group.objects.values_list("name", flat=True))
    assert {"Site admins", "Content managers", "Translators: ar", VIEWERS} <= names
    assert {"Baghdad office editors", "Baghdad office reviewers"} <= names
    for home in HomePage.objects.all():
        assert WorkflowPage.objects.get(page=home).workflow.name == "Review"
    for index in NewsIndexPage.objects.all():
        assert WorkflowPage.objects.get(page=index).workflow.name == "Light"
    viewers = Group.objects.get(name=VIEWERS).permissions.values_list("codename", flat=True)
    assert "view_submission" in viewers and "change_submission" not in viewers
    call_command("seed_site", verbosity=0)  # safe to run again
    assert Group.objects.filter(name="Baghdad office reviewers").count() == 1


def test_an_office_editor_edits_but_does_not_publish(staff):
    page = office("baghdad")
    editor = page.permissions_for_user(staff["editor"])
    assert editor.can_edit() and not editor.can_publish()
    assert page.permissions_for_user(staff["reviewer"]).can_publish()
    assert not office("dubai").permissions_for_user(staff["editor"]).can_edit()


def test_an_office_editor_submits_and_the_office_reviewer_publishes(staff):
    page = submit(
        office("baghdad"), staff["editor"], search_description="Baghdad office, new text."
    )
    assert page.workflow_in_progress
    task = page.current_workflow_task
    # Not the submitter, not another office's reviewer; the office reviewer and a
    # content manager may.
    assert task.get_actions(page, staff["editor"]) == []
    assert task.get_actions(page, staff["other"]) == []
    assert task.get_actions(page, staff["manager"])
    assert [name for name, *_ in task.get_actions(page, staff["reviewer"])][:2] == [
        "reject",
        "approve",
    ]
    states = task.get_task_states_user_can_moderate(staff["reviewer"])
    assert list(states) == [page.current_workflow_task_state]
    assert not task.get_task_states_user_can_moderate(staff["other"]).exists()
    page = approve(page, staff["reviewer"])
    assert not page.workflow_in_progress
    assert OfficePage.objects.get(pk=page.pk).search_description == "Baghdad office, new text."
    assert page.live_revision.user == staff["editor"]


def test_a_reviewer_cannot_approve_their_own_submission(staff):
    page = submit(
        office("baghdad"), staff["reviewer"], search_description="Changed by the reviewer."
    )
    assert page.current_workflow_task.get_actions(page, staff["reviewer"]) == []
    assert page.current_workflow_task.get_actions(page, staff["manager"])


def test_a_policy_page_is_approved_by_a_content_manager_only(staff):
    from apps.trust.models import ContentPage

    page = ContentPage.objects.filter(locale__language_code="en").first()
    page = submit(page, staff["manager"])
    assert page.current_workflow_task.get_actions(page, staff["reviewer"]) == []
    second = person("manager-2", "Content managers")
    assert page.current_workflow_task.get_actions(page, second)


def test_rights_on_a_program_follow_its_owning_office(staff):
    program = ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )
    assert program.permissions_for_user(staff["editor"]).can_edit()
    assert program.permissions_for_user(staff["reviewer"]).can_publish()
    program.owning_office = office("dubai")
    program.save_revision().publish()
    program.refresh_from_db()
    groups = set(
        GroupPagePermission.objects.filter(page=program).values_list("group__name", flat=True)
    )
    assert "Dubai office reviewers" in groups and "Baghdad office editors" not in groups
    editor = User.objects.get(pk=staff["editor"].pk)  # no cached rights
    assert not program.permissions_for_user(editor).can_edit()


def test_the_review_by_reminder_mails_the_owning_office(
    staff, monkeypatch, django_capture_on_commit_callbacks
):
    monkeypatch.setattr("zeneon_cms.notify.delivery.in_background", lambda: False)
    program = ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )
    assert program.review_recipients() == [
        "baghdad-editor@example.com",
        "baghdad-reviewer@example.com",
    ]
    program.review_by = datetime.date.today() + datetime.timedelta(days=14)
    program.save_revision().publish()
    mail.outbox.clear()
    with django_capture_on_commit_callbacks(execute=True):
        call_command("send_review_reminders", verbosity=0)
    sent = {
        address
        for message in mail.outbox
        if program.title in message.subject
        for address in message.to
    }
    assert sent == {"baghdad-editor@example.com", "baghdad-reviewer@example.com"}


def test_the_seed_gives_the_site_the_public_host(home, settings):
    from wagtail.models import Site

    settings.WAGTAILADMIN_BASE_URL = "https://staging.ticqc.ae"
    call_command("seed_site", verbosity=0)
    site = Site.objects.get(is_default_site=True)
    assert (site.hostname, site.port) == ("staging.ticqc.ae", 443)
    assert home.full_url == "https://staging.ticqc.ae/en/"
    site.hostname = "www.ticqc.com"
    site.save()
    call_command("seed_site", verbosity=0)  # a host an editor set is kept
    assert Site.objects.get(is_default_site=True).hostname == "www.ticqc.com"
