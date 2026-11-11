"""pytest always runs the "test" settings environment.

Set here rather than in pyproject so DJANGO_ENV is in place before pytest-django
loads the settings.

The UI string catalogs (locale/*/LC_MESSAGES/django.po) are compiled to .mo before
Django starts, with polib (a wagtail-localize dependency), so tests need no gettext
tools. The .mo files are gitignored; the image build compiles them with msgfmt.
"""

import os
from pathlib import Path

os.environ["DJANGO_ENV"] = "test"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tic.settings")


def compile_catalogs(root: Path) -> None:
    import polib

    for po_path in root.glob("locale/*/LC_MESSAGES/django.po"):
        mo_path = po_path.with_suffix(".mo")
        if not mo_path.exists() or mo_path.stat().st_mtime < po_path.stat().st_mtime:
            polib.pofile(str(po_path)).save_as_mofile(str(mo_path))


def pytest_configure(config):
    import django

    compile_catalogs(Path(__file__).resolve().parent)
    django.setup()
