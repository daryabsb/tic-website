"""Questions of the live program and service pages (design B-QA; T25, D56).

``question_groups(locale, words)`` gives one group per page with a ``qa`` part that has
questions: the page, its owner (the program's office, the service's group) and its
questions, programs first. With words, only the questions that hold every word stay.
Site search uses ``page_questions`` too.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from django.utils.html import strip_tags


@dataclass
class Question:
    question: str
    answer: object  # RichText
    text: str


@dataclass
class Group:
    page: object
    owner: str
    questions: list[Question] = field(default_factory=list)

    @property
    def anchor(self) -> str:
        return f"q-{self.page.pk}"


def question_sources():
    from apps.programs.models import ProgramPage
    from apps.services.models import ServicePage

    return [ProgramPage, ServicePage]


def page_questions(page) -> list[Question]:
    found = []
    for block in page.parts:
        if block.block_type != "qa":
            continue
        for item in block.value["questions"]:
            question = (item["question"] or "").strip()
            if question:
                answer = item["answer"]
                found.append(Question(question, answer, strip_tags(str(answer or ""))))
    return found


def owner_of(page) -> str:
    label = getattr(page, "office_label", "")
    if label:
        return label
    parent = page.get_parent()
    return parent.title if parent else ""


def question_groups(locale, words: str = "") -> list[Group]:
    terms = words.lower().split()
    groups = []
    for model in question_sources():
        for page in model.objects.live().public().filter(locale=locale).order_by("path"):
            questions = [
                q
                for q in page_questions(page)
                if all(term in f"{q.question} {q.text}".lower() for term in terms)
            ]
            if questions:
                groups.append(Group(page, owner_of(page), questions))
    return groups
