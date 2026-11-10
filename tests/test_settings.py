"""Settings: split by component, environment chosen by DJANGO_ENV (master plan 02)."""

from pathlib import Path

from django.conf import settings
from django.core.files.storage import storages
from zeneon_cms import conf


def test_tests_run_with_the_test_environment():
    assert settings.DJANGO_ENV == "test"
    assert settings.DEBUG is False


def test_languages_follow_the_plan():
    """D6: English default, Arabic second; `/` answers 301 to /en/."""
    assert settings.LANGUAGE_CODE == "en"
    assert [code for code, _ in settings.LANGUAGES] == ["en", "ar"]
    assert settings.WAGTAIL_I18N_ENABLED is True
    assert settings.WAGTAIL_CONTENT_LANGUAGES == settings.LANGUAGES
    assert settings.TIME_ZONE == "Asia/Dubai"


def test_site_is_not_indexable_by_default():
    assert settings.SITE_INDEXABLE is False


def test_core_is_plumbing_only():
    """D22: the core supplies the admin and the plumbing; every TIC page type is a TIC
    app (master plan 03). No core page-type app, no MCP in V1."""
    assert settings.INSTALLED_APPS[0] == "apps.pages"
    for core_app in (
        "zeneon_cms.core",
        "zeneon_cms.requests",
        "zeneon_cms.notify",
        "zeneon_cms.seo",
        "zeneon_cms.security",
    ):
        assert core_app in settings.INSTALLED_APPS
    for page_app in (
        "zeneon_cms.services",
        "zeneon_cms.locations",
        "zeneon_cms.people",
        "zeneon_cms.legal",
        "zeneon_cms.news",
        "zeneon_cms.mcp",
    ):
        assert page_app not in settings.INSTALLED_APPS


def test_request_attachments_have_a_private_storage_outside_media():
    location = Path(storages["private"].location).resolve()

    assert location != Path(settings.MEDIA_ROOT).resolve()
    assert Path(settings.MEDIA_ROOT).resolve() not in location.parents


def test_core_configuration_follows_the_plan():
    assert conf.get("requests.code_prefix") == "TIC"
    assert conf.get("notify.channels") == ["zeneon_cms.notify.channels.EmailChannel"]
    assert conf.get("security.translator_languages") == ["ar"]
    assert conf.get("i18n.switcher_labels") == {"en": "English", "ar": "العربية"}
    assert "/*/verify/" in conf.get("seo.robots_disallow")


def test_review_requires_reapproval_after_an_edit():
    assert settings.WAGTAIL_WORKFLOW_REQUIRE_REAPPROVAL_ON_EDIT is True
