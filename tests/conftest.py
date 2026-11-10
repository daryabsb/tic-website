"""Shared fixtures.

The test database is built by the migrations, so it starts with the empty English
HomePage of `pages.0002_create_home_page` as the default site's root. The session setup
adds the Arabic translation (as `zeneon_setup_locales` does on a real stack). Each test
runs in a transaction that is rolled back.
"""

import pytest


@pytest.fixture(scope="session")
def django_db_setup(django_db_setup, django_db_blocker):
    from zeneon_cms.core.locales import ensure_root_translations

    with django_db_blocker.unblock():
        ensure_root_translations(titles={"ar": "تي آي سي لمراقبة الجودة"})


@pytest.fixture
def home(db):
    """The default-language (en) HomePage."""
    from apps.pages.models import HomePage

    return HomePage.objects.get(locale__language_code="en")


@pytest.fixture
def seeded_home(home):
    from django.core.management import call_command

    call_command("seed_site", verbosity=0)
    home.refresh_from_db()
    return home
