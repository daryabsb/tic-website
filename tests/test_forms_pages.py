"""T23: Complaints and appeals, Careers, the training catalogue (master plan 03, 07;
designs B-Complaints, B-Careers, B-Training; D53)."""

import datetime
from decimal import Decimal
from urllib.parse import quote

import pytest
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from zeneon_cms.contact import spam
from zeneon_cms.requests.models import RequestSchema, RoutingRule, Submission

from apps.careers.models import CareersPage
from apps.programs.models import ProgramPage
from apps.services.intake import routing_facts
from apps.services.models import ServiceGroupPage
from apps.training.models import CoursePage, TrainingIndexPage, course_problems
from apps.trust.models import ComplaintsPage

TODAY = datetime.date.today()


@pytest.fixture
def seeded(seeded_home, settings, tmp_path):
    # Attachments go to a temporary private storage, never to the repo folder.
    settings.STORAGES = {
        **settings.STORAGES,
        "private": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
            "OPTIONS": {"location": str(tmp_path)},
        },
    }
    return seeded_home


@pytest.fixture
def passed_captcha(monkeypatch):
    monkeypatch.setattr(spam, "verify_turnstile", lambda request: spam.Turnstile.PASSED)
    monkeypatch.setattr("zeneon_cms.notify.delivery.in_background", lambda: False)


def send(client, topic, files=(), **answers):
    data = {
        "step": "3",
        "action": "next",
        "topic": str(topic.pk),
        "message": "The inspector came two days late.",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "ts": "9000",
        "website": "",
        **{f"q_{key}": value for key, value in answers.items()},
    }
    if files:
        data["files"] = list(files)
    return client.post("/en/request/", data, HTTP_ORIGIN="http://testserver")


def pdf(name="evidence.pdf"):
    return SimpleUploadedFile(name, b"%PDF-1.4\n%test\n", content_type="application/pdf")


def staff_mail(address):
    return next(message for message in mail.outbox if message.to == [address])


# -- Complaints and appeals ------------------------------------------------------------


def test_the_complaints_page_renders_from_the_seed(client, seeded):
    page = ComplaintsPage.objects.get(locale__language_code="en")
    assert page.url == "/en/about/complaints/" and page.live
    html = client.get(page.url).content.decode()
    assert "About how we worked" in html and "Against a decision" in html
    assert html.count('class="step"') == 4 and "[n] working days" in html
    assert f'href="/en/request/?topic={page.pk}"' in html
    keys = [block.value["key"] for block in RequestSchema.for_page(page).questions]
    assert keys == ["kind", "reference"]


def test_program_pages_link_to_the_complaints_page(client, seeded):
    program = ProgramPage.objects.filter(locale__language_code="en").first()
    html = client.get(program.url).content.decode()
    assert 'href="/en/about/complaints/"' in html


def test_the_form_opened_from_the_complaints_page_is_named_for_it(client, seeded):
    page = ComplaintsPage.objects.get(locale__language_code="en")
    form = client.get(f"/en/request/?topic={page.pk}").content.decode()
    assert '<h1 class="h1 h1--page">Complaints and appeals</h1>' in form
    assert 'name="q_kind"' in form and 'name="q_reference"' in form
    # A quote opened without a topic does not offer the complaints page in step 1.
    quote = client.get("/en/request/").content.decode()
    assert f'value="{page.pk}"' not in quote and "Request a quote" in quote


def test_a_complaint_with_a_file_reaches_the_quality_manager(
    client, seeded, passed_captcha, django_capture_on_commit_callbacks
):
    RoutingRule.objects.filter(name__startswith="Quality Manager").update(
        email="quality@example.com"
    )
    page = ComplaintsPage.objects.get(locale__language_code="en")
    with django_capture_on_commit_callbacks(execute=True):
        response = send(client, page, files=[pdf()], kind="complaint", reference="TIC-0001")
    assert response.status_code == 303
    submission = Submission.objects.get()
    assert submission.routed_email == "quality@example.com"
    assert submission.answers == {"kind": "complaint", "reference": "TIC-0001"}
    assert list(submission.attachments.values_list("original_name", flat=True)) == ["evidence.pdf"]
    staff = staff_mail("quality@example.com")
    assert submission.code in staff.subject and "Files: 1" in staff.body
    assert "evidence.pdf" in staff.alternatives[0][0]


def test_without_its_address_a_complaint_goes_to_the_head_office(
    client, seeded, passed_captcha, django_capture_on_commit_callbacks
):
    rule = RoutingRule.objects.get(name__startswith="Quality Manager")
    assert rule.email == ""  # "[Quality Manager email]" is not an address
    page = ComplaintsPage.objects.get(locale__language_code="en")
    with django_capture_on_commit_callbacks(execute=True):
        send(client, page, kind="appeal")
    assert Submission.objects.get().routed_email == "info@ticqc.com"


# -- Careers -----------------------------------------------------------------------------


def add_roles(page, *roles):
    page.openings = [{"type": "opening", "value": role} for role in roles]
    page.save_revision().publish()
    return CareersPage.objects.get(pk=page.pk)


def test_careers_shows_open_roles_only_and_links_each_to_the_form(client, seeded):
    from apps.offices.models import OfficePage

    page = CareersPage.objects.get(locale__language_code="en")
    assert page.url == "/en/about/careers/"
    html = client.get(page.url).content.decode()
    assert "No role is open at the moment" in html
    baghdad = OfficePage.objects.get(slug="baghdad", locale__language_code="en")
    page = add_roles(
        page,
        {"title": "Inspector", "office": baghdad.pk, "job_type": "full_time", "closing": None},
        {"title": "Old role", "office": None, "job_type": "contract", "closing": "2020-01-01"},
    )
    html = client.get(page.url).content.decode()
    answer = f"Inspector, {baghdad.title}"
    assert "Inspector" in html and "Old role" not in html
    assert f"/en/request/?topic={page.pk}&amp;q_role={quote(answer)}" in html
    form = client.get(f"/en/request/?topic={page.pk}&q_role=Inspector").content.decode()
    assert '<h1 class="h1 h1--page">Apply</h1>' in form and 'value="Inspector"' in form


def test_an_application_with_a_cv_reaches_hr(
    client, seeded, passed_captcha, django_capture_on_commit_callbacks
):
    RoutingRule.objects.filter(name__startswith="HR").update(email="hr@example.com")
    page = CareersPage.objects.get(locale__language_code="en")
    with django_capture_on_commit_callbacks(execute=True):
        response = send(client, page, files=[pdf("cv.pdf")], role="General application")
    assert response.status_code == 303
    submission = Submission.objects.get()
    assert submission.routed_to == "HR (applications)"
    assert submission.routed_email == "hr@example.com"
    assert submission.attachments.get().original_name == "cv.pdf"
    assert "cv.pdf" in staff_mail("hr@example.com").alternatives[0][0]


# -- Training ----------------------------------------------------------------------------


def publish_course(index, **facts):
    course = CoursePage.objects.child_of(index).get(slug="iso-9001-internal-auditor")
    values = {
        "price": Decimal("1500"),
        "currency": "AED",
        "tax_note": "incl. 5% VAT",
        "certificate_text": "Certificate of attendance",
        "certificate_issuer": "TIC Quality Control",
        "course_format": "both",
        "city": "Dubai",
        "dates": [
            {"type": "date", "value": {"start": "2020-03-01", "end": None, "place": "Dubai"}},
            {
                "type": "date",
                "value": {"start": str(TODAY + datetime.timedelta(days=30)), "end": None},
            },
        ],
        **facts,
    }
    for name, value in values.items():
        setattr(course, name, value)
    course.save_revision().publish()
    return CoursePage.objects.get(pk=course.pk)


def test_the_ten_old_courses_wait_as_drafts(client, seeded):
    index = TrainingIndexPage.objects.get(locale__language_code="en")
    assert index.url == "/en/training/"
    courses = CoursePage.objects.child_of(index)
    assert courses.count() == 10 and not courses.live().exists()
    html = client.get(index.url).content.decode()
    assert "being confirmed" in html and 'class="course"' not in html
    group = ServiceGroupPage.objects.get(slug="training", locale__language_code="en")
    assert group.see_also_id == index.pk


def test_a_course_needs_price_dates_and_certificate_to_publish():
    problems = course_problems({"price": None, "dates": [], "certificate_text": "Attendance"})
    assert set(problems) == {"price", "dates", "certificate_issuer"}


def test_a_published_course_shows_its_facts_and_only_coming_dates(client, seeded):
    index = TrainingIndexPage.objects.get(locale__language_code="en")
    course = publish_course(index)
    html = client.get(index.url).content.decode()
    assert "ISO 9001 internal auditor" in html and "AED 1,500" in html
    assert "2020" not in html.split('class="course"')[1]  # the past date is not shown
    assert f'href="/en/request/?topic={course.pk}"' in html
    assert "ISO 9001" in client.get(f"{index.url}?show=internal_auditor").content.decode()
    online = client.get(f"{index.url}?show=awareness").content.decode()
    assert 'class="course"' not in online
    page = client.get(course.url).content.decode()
    assert "has no bearing on any TIC inspection or certification decision" in page
    assert "Certificate of attendance, issued by TIC Quality Control" in page


def test_a_course_registration_goes_to_the_training_owner(
    client, seeded, passed_captcha, django_capture_on_commit_callbacks
):
    index = TrainingIndexPage.objects.get(locale__language_code="en")
    course = publish_course(index)
    assert routing_facts(Submission(topic=course.page_ptr)) == {
        "form": "course",
        "service_group": "training",
    }
    form = client.get(f"/en/request/?topic={course.pk}").content.decode()
    assert "Register for a course" in form and 'name="q_seats"' in form
    with django_capture_on_commit_callbacks(execute=True):
        response = send(client, course, seats="2")
    assert response.status_code == 303
    assert Submission.objects.get().routed_to == "Head office, Dubai (training)"
