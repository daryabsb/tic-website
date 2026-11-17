"""T28: the Arabic frame (master plan 08, "the frame first"; D60).

Every msgid a visitor can see has an Arabic msgstr: the site's templates and Python
strings, and the core files a visitor meets (request form, sent screen, client mail,
consent banner, 500 page). Admin words (labels, help texts, publish rules) are not part
of the frame.
"""

from django.core.management import call_command

from apps.pages import visible_text


def test_every_visible_msgid_has_arabic():
    missing = visible_text.missing_arabic()

    assert not missing, "\n".join(
        f"{msgid!r} in {', '.join(sorted(files))}" for msgid, files in sorted(missing.items())
    )


def test_the_finder_sees_templates_python_and_the_core_but_not_admin_words():
    visible = visible_text.visible_msgids()

    assert "Verify a certificate" in visible  # a template
    assert "Regulatory update" in visible  # a choice label shown on the news tabs
    assert "Please fill this in." in visible  # the core request form
    assert any(f.startswith("core:") for f in visible["Please fill this in."])
    assert "The page title as you'd like it to be seen by the public" not in visible
    assert "The address is required." not in visible  # an admin publish rule
    assert "header photo" not in visible  # a field label


def test_the_command_lists_nothing_when_the_frame_is_complete(capsys):
    call_command("arabic_frame")

    assert "0 visible msgids without Arabic" in capsys.readouterr().out


def test_the_arabic_shell_is_right_to_left_and_in_arabic(client, seeded_home):
    html = client.get("/ar/").content.decode()

    assert '<html lang="ar" dir="rtl">' in html
    assert "التحقق من شهادة" in html  # "Verify a certificate" in the header
    assert "Verify a certificate" not in html


def test_the_arabic_404_and_search_are_in_arabic(client, seeded_home):
    not_found = client.get("/ar/nothing-here/").content.decode()
    search = client.get("/ar/search/", {"q": "zzzz"}).content.decode()

    for html in (not_found, search):
        assert "ابحث في الموقع" in html  # "Search the site"
        assert "Search the site" not in html
    assert "Page not found" not in not_found
    assert "لم نجد هذه الصفحة" in not_found  # a _() default inside a template filter
    assert "لم نجد شيئًا" in search  # "Nothing found. Try fewer words, …"


def test_arabic_is_never_letter_spaced():
    from django.conf import settings

    css = (settings.BASE_DIR / "static" / "css" / "site.css").read_text(encoding="utf-8")
    rule = css[css.index('[dir="rtl"] *,') :]
    assert "letter-spacing: 0 !important;" in rule.split("}")[0]
