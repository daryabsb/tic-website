"""T25: Resources (master plan 03, 04; designs B-News, B-Article, B-Downloads, B-QA; D56)."""

import datetime

import pytest

from apps.news.models import NewsIndexPage, NewsPage
from apps.programs.models import ProgramPage
from apps.resources.models import Download, DownloadsPage, QAPage, ResourcesPage
from apps.resources.qa import question_groups

PAGES = {
    "/en/resources/": "Resources",
    "/en/news/": "News and insights",
    "/en/downloads/": "Downloads library",
    "/en/training/": "Training",
    "/en/questions/": "Questions and answers",
}


@pytest.fixture
def seeded(seeded_home):
    return seeded_home


def html(client, url):
    response = client.get(url)
    assert response.status_code == 200, url
    return response.content.decode()


def test_the_five_resource_pages_come_from_the_seed(client, seeded):
    for url in PAGES:
        page = html(client, url)
        assert 'class="row tabs res-tabs"' in page, url
        for other in PAGES:
            assert f'href="{other}"' in page, (url, other)
    hub = ResourcesPage.objects.get(locale__language_code="en")
    assert hub.show_in_menus
    assert '<a href="/en/resources/"' in html(client, "/en/")  # the header item
    assert not DownloadsPage.objects.get(locale__language_code="en").show_in_menus


# -- News and insights ----------------------------------------------------------------


def add_news(index, slug, **fields):
    values = {"title": slug.replace("-", " ").title(), "slug": slug, "kind": "news"}
    values.setdefault("date", datetime.date(2026, 1, 1))
    values.update(fields)
    page = index.add_child(instance=NewsPage(**values))
    page.save_revision().publish()
    return NewsPage.objects.get(pk=page.pk)


def test_the_news_list_has_kind_tabs_filters_and_pages(client, seeded):
    index = NewsIndexPage.objects.get(locale__language_code="en")
    for number in range(13):
        add_news(index, f"note-{number:02d}", date=datetime.date(2026, 1, number + 1))
    insight = add_news(index, "how-to", kind="insight", featured=True)
    page = html(client, "/en/news/")
    assert "Featured" in page and "How To" in page.split('class="row news-cards"')[0]
    assert 'href="?page=2"' in page
    assert "How To" not in html(client, "/en/news/?kind=news")
    only = html(client, "/en/news/?kind=insight")
    assert "How To" in only and "Note 00" not in only and "Featured" not in only
    iraq = ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )
    by_program = html(client, f"/en/news/?program={iraq.pk}")
    assert "Note 00" not in by_program and "COSQC" in by_program
    assert insight.url in page


def test_an_article_has_contents_read_time_and_related(client, seeded):
    index = NewsIndexPage.objects.get(locale__language_code="en")
    iraq = ProgramPage.objects.get(
        slug="iraq-certificate-of-conformity", locale__language_code="en"
    )
    words = " ".join(["word"] * 400)
    article = add_news(
        index,
        "iraq-guide",
        kind="insight",
        program=iraq,
        updated=datetime.date(2026, 3, 1),
        body=f"<h2>What you need</h2><p>{words}</p><h2>Who to ask</h2><p>Baghdad.</p>",
    )
    assert [title for _anchor, title in article.contents] == ["What you need", "Who to ask"]
    page = html(client, article.url)
    anchor = article.contents[0][0]
    assert f'href="#{anchor}"' in page and f'id="{anchor}"' in page
    assert "2 min read" in page and "Updated 1 Mar 2026" in page
    assert "Related program" in page and iraq.url in page
    assert "Related articles" in page  # the seeded Iraq updates
    assert "the regulator’s own publications take precedence" in page


# -- Downloads ------------------------------------------------------------------------


def test_the_downloads_library_lists_the_seed_rows_and_filters_them(client, seeded):
    assert Download.objects.count() == 6
    page = html(client, "/en/downloads/")
    assert "ANAB accreditation certificate and scope" in page and "AI-3314" in page
    assert "Impartiality policy" in page and ">PDF<" in page and ">LINK<" in page
    policies = html(client, "/en/downloads/?type=policy")
    assert "Impartiality policy" in policies and "GOEIC register entry" not in policies
    arabic = html(client, "/en/downloads/?lang=ar")
    assert "GOEIC register entry" in arabic and "Impartiality policy" not in arabic
    found = html(client, "/en/downloads/?q=subcontractors")
    assert "Approved subcontractors" in found and "Impartiality policy" not in found
    assert "No document matches" in html(client, "/en/downloads/?q=nothing-like-this")


def test_a_download_needs_a_file_or_a_link():
    from django.core.exceptions import ValidationError

    row = Download(title="Empty", kind="form", languages="en")
    with pytest.raises(ValidationError):
        row.full_clean()


# -- Questions and answers --------------------------------------------------------------


def test_the_questions_page_groups_every_question_by_page(client, seeded):
    from wagtail.models import Locale

    groups = question_groups(Locale.objects.get(language_code="en"))
    titles = [group.page.title for group in groups]
    assert "Iraq Certificate of Conformity" in titles
    iraq = next(g for g in groups if g.page.title == "Iraq Certificate of Conformity")
    assert iraq.owner == "Baghdad office" and iraq.questions
    page = html(client, "/en/questions/")
    assert f'id="{iraq.anchor}"' in page and iraq.questions[0].question in page
    word = iraq.questions[0].question.split()[-1].strip("?")
    found = html(client, f"/en/questions/?q={word}")
    assert iraq.questions[0].question in found
    assert "No question holds" in html(client, "/en/questions/?q=zzzz-nothing")
    assert QAPage.objects.get(locale__language_code="en").url == "/en/questions/"


def test_site_search_finds_program_questions(client, seeded):
    from wagtail.models import Locale

    groups = question_groups(Locale.objects.get(language_code="en"))
    question = next(g for g in groups if g.page.title.startswith("Iraq")).questions[0].question
    word = max(question.split(), key=len).strip("?")
    page = html(client, f"/en/search/?q={word}&type=questions")
    assert question in page
