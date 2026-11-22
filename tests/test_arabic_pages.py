"""T29: the Arabic-first pages (master plan 08, "Arabic-first pages"; D81).

``seed/ar.yaml`` names the pages and gives their Arabic text; ``seed_site`` makes each one
as a translation of the English page. Every text a visitor reads on these pages has
Arabic; marks, numbers and bracketed placeholders are kept; a translator's change is
never overwritten.
"""

import json
import re
from io import StringIO

import pytest
from django.core.management import call_command
from wagtail.models import Locale, Page
from wagtail_localize.models import StringTranslation
from zeneon_cms.requests.models import RequestSchema

from apps.pages import translated
from apps.programs.models import ProgramPage
from apps.trust.models import ComplaintsPage, ContentPage

# Master plan 08: Verify, six office pages, Complaints, Impartiality, Privacy, About, the
# accreditations table, then the program pages that exist (Iraq). Home and the two hubs
# are the way to them.
ARABIC_FIRST = [
    "",
    "verify",
    "offices",
    "offices/baghdad",
    "offices/cairo",
    "offices/amman",
    "offices/riyadh",
    "offices/dubai",
    "offices/sharjah",
    "about",
    "about/accreditations",
    "about/impartiality",
    "about/privacy",
    "about/complaints",
    "programs",
    "programs/iraq-certificate-of-conformity",
]
LIVE = [path for path in ARABIC_FIRST if path != "about/privacy"]  # Privacy waits for Legal
ARABIC = re.compile(f"[{chr(0x0600)}-{chr(0x06FF)}]")  # a letter of the Arabic block
ARABIC_DIGITS = re.compile(f"[{chr(0x0660)}-{chr(0x0669)}]")
# Marks that stay in Latin letters, and numbers: the same in both languages.
KEPT = re.compile(
    r"\[[^\]]*\]|\d+(?:[.,:/]\d+)*|COSQC|ICIGI|LOX|ANAB|GOEIC|GAFTA|SFDA|BOBS|ISO/IEC"
)


def _rows():
    return translated.seed_file("ar")["strings"]


def _arabic(page):
    return page.get_translation(Locale.objects.get(language_code="ar"))


# -- the file --------------------------------------------------------------------------


def test_the_file_names_the_arabic_first_pages():
    paths = [path.strip("/") for path in translated.seed_file("ar")["pages"]]

    assert paths == ARABIC_FIRST


def test_one_english_text_has_one_arabic_text():
    english = [row["en"] for row in _rows()]

    assert len(english) == len(set(english))
    assert all(ARABIC.search(row["ar"]) for row in _rows())


def test_placeholders_marks_and_numbers_are_kept():
    """A bracketed placeholder stays in brackets (nothing invented); a mark and a number
    are the same in both languages."""
    for row in _rows():
        english, arabic = row["en"], row["ar"]
        assert english.count("[") == arabic.count("["), english
        assert english.count("]") == arabic.count("]"), english
        for kept in KEPT.findall(english):
            if kept.startswith("["):
                continue  # the words in the brackets are translated
            assert kept in arabic, (english, kept)


def test_arabic_text_has_no_house_word_fault():
    for row in _rows():
        assert "TICQC" not in row["ar"]
        assert not ARABIC_DIGITS.search(row["ar"]), row["ar"]  # Western digits only


# -- the pages -------------------------------------------------------------------------


@pytest.mark.django_db
def test_every_text_of_the_arabic_first_pages_has_arabic(seeded_home):
    assert translated.missing_texts("ar") == {}


@pytest.mark.django_db
def test_the_command_lists_nothing(seeded_home):
    out = StringIO()

    call_command("arabic_pages", stdout=out)

    assert "0 page texts without Arabic" in out.getvalue()


@pytest.mark.django_db
@pytest.mark.parametrize("path", LIVE)
def test_the_page_is_live_right_to_left_and_in_arabic(client, seeded_home, path):
    english = Page.objects.get(url_path=f"{seeded_home.url_path}{path}/" if path else "/home/")
    arabic = _arabic(english)

    response = client.get(f"/ar/{path}/" if path else "/ar/")

    assert response.status_code == 200
    html = response.content.decode()
    assert '<html lang="ar" dir="rtl">' in html
    assert arabic.live and ARABIC.search(arabic.title)
    assert arabic.title in html
    intro = getattr(english.specific, "intro", "")
    if intro:
        assert intro not in html  # the English intro is not shown


@pytest.mark.django_db
def test_a_draft_page_stays_a_draft_in_arabic(client, seeded_home):
    english = ContentPage.objects.get(slug="privacy", locale=Locale.get_default())
    arabic = _arabic(english)

    assert not english.live and not arabic.live
    assert arabic.title == "الخصوصية"
    assert client.get("/ar/about/privacy/").status_code == 404


@pytest.mark.django_db
def test_the_language_switch_goes_to_the_same_page(client, seeded_home):
    english = client.get("/en/verify/").content.decode()
    arabic = client.get("/ar/verify/").content.decode()

    assert "/ar/verify/" in english
    assert "/en/verify/" in arabic
    assert 'hreflang="ar"' in english and 'hreflang="en"' in arabic


@pytest.mark.django_db
def test_the_text_in_lists_is_arabic(client, seeded_home):
    html = client.get("/ar/programs/iraq-certificate-of-conformity/").content.decode()

    assert "ما هو برنامج شهادة المطابقة للعراق؟" in html  # a question
    assert "قائمة التعبئة" in html  # a document of the checklist
    assert "What is the Iraq CoC Program?" not in html
    assert "COSQC" in html  # the mark stays


@pytest.mark.django_db
def test_an_arabic_page_lists_arabic_pages_only(client, seeded_home):
    """An Arabic page links to the pages that have Arabic; the others wait."""
    html = client.get("/ar/offices/").content.decode()

    assert "/ar/offices/baghdad/" in html
    assert "/ar/offices/guangzhou/" not in html  # not one of the first six


@pytest.mark.django_db
def test_a_link_goes_to_the_arabic_page_when_there_is_one(client, seeded_home):
    """A page link that an editor chose is the same in every language; the page shows
    the Arabic page when it is live, else the English one."""
    iraq = client.get("/ar/programs/iraq-certificate-of-conformity/").content.decode()
    policy = client.get("/ar/about/impartiality/").content.decode()

    assert 'href="/ar/offices/baghdad/"' in iraq  # the owning office
    assert "/en/offices/baghdad/" not in iraq
    assert 'href="/ar/about/accreditations/"' in policy  # a related page
    assert 'href="/en/about/group/"' in policy  # Our group has no Arabic page yet


# -- the request form ------------------------------------------------------------------


@pytest.mark.django_db
def test_the_complaint_form_asks_in_arabic(seeded_home):
    arabic = Locale.objects.get(language_code="ar")
    page = ComplaintsPage.objects.get(locale=Locale.get_default())

    schema = RequestSchema.for_page(page, arabic)

    assert schema.locale == arabic
    labels = json.dumps(schema.snapshot(), ensure_ascii=False)
    assert "شكوى" in labels and "Complaint" not in labels
    english = RequestSchema.for_page(page, Locale.get_default())
    assert [q["key"] for q in schema.snapshot()] == [q["key"] for q in english.snapshot()]


@pytest.mark.django_db
def test_the_iraq_route_question_keeps_its_keys(seeded_home):
    arabic = Locale.objects.get(language_code="ar")
    page = ProgramPage.objects.get(locale=Locale.get_default())

    questions = {q["key"]: q for q in RequestSchema.for_page(page, arabic).snapshot()}

    assert questions["route"]["label"] == "مسارك"
    assert [o["key"] for o in questions["route"]["options"]] == [
        "registered",
        "unregistered",
        "registration",
        "unsure",
    ]


# -- translators' work -----------------------------------------------------------------


@pytest.mark.django_db
def test_a_translators_text_is_kept(seeded_home):
    arabic = Locale.objects.get(language_code="ar")
    row = StringTranslation.objects.filter(locale=arabic, data="تحقق").first()
    row.data = "افحص الرقم"
    row.save()
    out = StringIO()

    call_command("seed_site", stdout=out, stderr=out)

    row.refresh_from_db()
    assert row.data == "افحص الرقم"
    assert "seed_site: 0 change(s)" in out.getvalue()
