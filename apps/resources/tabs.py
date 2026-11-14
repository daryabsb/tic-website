"""The resource pages of one language, in the order of the tab strip (T25, D56)."""

from __future__ import annotations


def resource_models():
    from apps.news.models import NewsIndexPage
    from apps.resources.models import DownloadsPage, QAPage, ResourcesPage
    from apps.training.models import TrainingIndexPage

    return [ResourcesPage, NewsIndexPage, DownloadsPage, TrainingIndexPage, QAPage]


def resource_pages(locale) -> list:
    pages = []
    for model in resource_models():
        page = model.objects.live().public().filter(locale=locale).first()
        if page is not None:
            pages.append(page)
    return pages
