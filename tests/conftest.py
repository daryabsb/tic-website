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


def pytest_collection_modifyitems(items):
    """Run the tests that need the seeded site last, as one group (T42, D78).

    The seed then runs once for the group (``_seed_once``), not once a test. The sort is
    stable: inside each group the tests keep their file order.
    """
    items.sort(key=lambda item: "seeded_home" in getattr(item, "fixturenames", ()))


@pytest.fixture(scope="session")
def _seed_once(django_db_setup, django_db_blocker):
    """Seed the site once, inside a transaction that stays open until the run ends.

    Each test's own transaction is then a savepoint inside it: a test's changes roll back
    to the seeded site, and the seed itself rolls back at the end. Tests without
    ``seeded_home`` run before this group (see ``pytest_collection_modifyitems``), so they
    still start from the empty site.
    """
    from django.core.management import call_command
    from django.db import transaction

    with django_db_blocker.unblock():
        outer = transaction.atomic()
        outer.__enter__()
        call_command("seed_site", verbosity=0)
    yield
    with django_db_blocker.unblock():
        transaction.set_rollback(True)
        outer.__exit__(None, None, None)


@pytest.fixture
def seeded_home(_seed_once, home):
    home.refresh_from_db()
    return home
