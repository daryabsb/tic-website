"""The msgids a visitor can see (master plan 08, "the frame first"; T28, D60).

``visible_msgids()`` reads the source, not the catalogue:

- every ``{% translate %}`` and ``{% blocktranslate %}`` of the site's templates (all
  of them are public pages, mails or fragments);
- every ``gettext`` call of the site's Python code, except the admin's own words: model
  and block labels (the first argument of a field or block, ``verbose_name``,
  ``label``, ``help_text``, ``heading``), ``Meta`` names, validation messages of the
  admin forms, and the files that only the admin runs (rules, hooks, back office,
  migrations, management commands).

``missing_arabic()`` returns the visible msgids that ``locale/ar`` does not translate.
The test ``tests/test_arabic_frame.py`` keeps it empty; ``manage.py arabic_frame`` lists
it while a translator works.
"""

from __future__ import annotations

import ast
import re
from pathlib import Path

from django.conf import settings
from django.utils.translation.template import templatize

GETTEXT = {
    "_": 0,
    "_l": 0,
    "gettext": 0,
    "gettext_lazy": 0,
    "ngettext": 0,
    "ngettext_lazy": 0,
    "pgettext": 1,
    "pgettext_lazy": 1,
}
ADMIN_WORDS = {"verbose_name", "verbose_name_plural", "help_text", "heading", "label", "admin_text"}
ADMIN_CALL_SUFFIXES = ("Field", "Block", "Panel", "ForeignKey", "OneToOneField", "Key")
ADMIN_CALLS = {
    "ValidationError",
    "MenuItem",
    "SnippetViewSet",
    "register_admin_menu_item",
    "_image",
    "_document",
}
ADMIN_PATHS = (
    "rules.py",
    "wagtail_hooks.py",
    "admin.py",
    "/backoffice/",
    "/migrations/",
    "/management/",
    "/settings/",
)
SOURCE_DIRS = ("apps", "templates")


def _root() -> Path:
    return Path(settings.BASE_DIR)


def _name(node) -> str:
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        return node.attr
    return ""


def _gettext_msgid(call: ast.Call) -> str | None:
    position = GETTEXT.get(_name(call.func))
    if position is None or len(call.args) <= position:
        return None
    arg = call.args[position]
    if isinstance(arg, ast.Constant) and isinstance(arg.value, str):
        return arg.value
    return None


def _is_admin_use(node, parents) -> bool:
    child = node
    parent = parents.get(id(child))
    while parent is not None:
        if isinstance(parent, ast.keyword) and parent.arg in ADMIN_WORDS:
            return True
        if isinstance(parent, ast.Assign) and any(
            isinstance(target, ast.Name) and target.id in ADMIN_WORDS for target in parent.targets
        ):
            return True
        if isinstance(parent, ast.Call):
            name = _name(parent.func)
            if name in ADMIN_CALLS:
                return True
            if name.endswith(ADMIN_CALL_SUFFIXES) and parent.args and parent.args[0] is child:
                return True
        if isinstance(parent, ast.FunctionDef) and parent.name.endswith("_problems"):
            return True  # the publish rules of the admin forms
        if isinstance(parent, ast.ClassDef | ast.FunctionDef):
            return False
        child, parent = parent, parents.get(id(parent))
    return False


def python_msgids(path: Path) -> set[str]:
    tree = ast.parse(path.read_text(encoding="utf-8"))
    parents = {id(child): node for node in ast.walk(tree) for child in ast.iter_child_nodes(node)}
    found = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            msgid = _gettext_msgid(node)
            if msgid and not _is_admin_use(node, parents):
                found.add(msgid)
    return found


TEMPLATE_CALL = re.compile(r"\b(?:n?p?gettext)\(")


def template_msgids(path: Path) -> set[str]:
    """Django's ``templatize`` turns the tags into gettext calls among filler text; each
    call is parsed alone, up to the first closing parenthesis that ends it."""
    code = templatize(path.read_text(encoding="utf-8"), origin=str(path))
    found = set()
    for match in TEMPLATE_CALL.finditer(code):
        end = match.end()
        while (end := code.find(")", end) + 1) > 0:
            try:
                call = ast.parse(code[match.start() : end], mode="eval").body
            except SyntaxError:
                continue
            msgid = _gettext_msgid(call) if isinstance(call, ast.Call) else None
            if msgid:
                found.add(msgid)
            break
    return found


def _is_admin_path(path: Path) -> bool:
    text = path.as_posix()
    return any(part in text for part in ADMIN_PATHS)


# The core files a TIC visitor meets (paths inside the zeneon_cms package): the request
# form and its sent screen (TIC overrides request_page.html and sent.html), the client
# mail, the consent banner, the 500 page. The core's other public templates belong to
# page-type apps TIC does not install (D22).
CORE_TEMPLATES = (
    "core/templates/500.html",
    "core/templates/zeneon/includes/breadcrumbs.html",
    "requests/templates/zeneon/requests/flow.html",
    "requests/templates/zeneon/requests/includes/*.html",
    "seo/templates/zeneon_seo/consent_banner.html",
)
CORE_PYTHON = (
    "requests/alerts.py",
    "requests/flow.py",
    "requests/forms.py",
    "requests/uploads.py",
    "requests/views.py",
)


def _core_root() -> Path:
    import zeneon_cms

    return Path(zeneon_cms.__file__).parent


def _add(found: dict[str, set[str]], msgids: set[str], label: str) -> None:
    for msgid in msgids:
        found.setdefault(msgid, set()).add(label)


def site_msgids() -> dict[str, set[str]]:
    """msgid → the site files that use it."""
    root = _root()
    found: dict[str, set[str]] = {}
    for folder in SOURCE_DIRS:
        for path in sorted((root / folder).rglob("*")):
            if path.suffix == ".html":
                msgids = template_msgids(path)
            elif path.suffix == ".py" and not _is_admin_path(path):
                msgids = python_msgids(path)
            else:
                continue
            _add(found, msgids, path.relative_to(root).as_posix())
    return found


def core_msgids() -> dict[str, set[str]]:
    """msgid → the core files (``core:<path>``) a visitor meets."""
    core = _core_root()
    found: dict[str, set[str]] = {}
    for pattern in CORE_TEMPLATES:
        for path in sorted(core.glob(pattern)):
            _add(found, template_msgids(path), f"core:{path.relative_to(core).as_posix()}")
    for name in CORE_PYTHON:
        _add(found, python_msgids(core / name), f"core:{name}")
    return found


def visible_msgids() -> dict[str, set[str]]:
    found = site_msgids()
    for msgid, files in core_msgids().items():
        found.setdefault(msgid, set()).update(files)
    return found


def arabic_catalogue() -> dict[str, str]:
    """msgid → msgstr (the first plural form for a plural entry) of ``locale/ar`` and,
    behind it, of the core's own Arabic catalogues (the site's file wins, as at run time)."""
    import polib

    paths = [_root() / "locale" / "ar" / "LC_MESSAGES" / "django.po"]
    paths += sorted(_core_root().glob("*/locale/ar/LC_MESSAGES/django.po"))
    catalogue: dict[str, str] = {}
    for path in reversed(paths):
        for entry in polib.pofile(str(path)):
            text = entry.msgstr or entry.msgstr_plural.get(0, "")
            if not entry.obsolete and "fuzzy" not in entry.flags and text.strip():
                catalogue[entry.msgid] = text
    return catalogue


def missing_arabic() -> dict[str, set[str]]:
    catalogue = arabic_catalogue()
    return {msgid: files for msgid, files in visible_msgids().items() if msgid not in catalogue}
