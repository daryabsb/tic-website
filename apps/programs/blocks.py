"""The twelve parts of a program page (proposal 01 §5.5; master plan 05).

``PROGRAM_PARTS`` is one StreamField with one block per part, each allowed once, in a
fixed order: the admin refuses to publish a page whose parts are missing, out of order
or empty (``apps.programs.rules``). Inside a part every field is optional so a draft can
always be saved; the publish check says what is missing.

The regulator, the appointment, the owning office and the review dates are page fields
(cards and the feed show them too); the parts hold the page's text. Part 09 lists the
program's regulatory updates (a query) and part 11 links the complaints page: both are
written by the template, never by an editor.
"""

from django.utils.translation import gettext_lazy as _
from wagtail import blocks
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

from apps.services.blocks import RICH, QuestionBlock


def _heading(default=""):
    return blocks.CharBlock(label=_("heading"), max_length=120, required=False, default=default)


class AppointmentBlock(blocks.StructBlock):
    """01. The regulator's name, the status word, the date and the letter are page fields
    shown with this text."""

    heading = _heading()
    text = blocks.RichTextBlock(
        label=_("text"),
        features=RICH,
        required=False,
        help_text=_("Who runs the program and how we were appointed. Never 'accredited'."),
    )

    class Meta:
        icon = "doc-full"
        label = _("01 The regulator and our appointment")
        template = "programs/parts/appointment.html"


class ProductRowBlock(blocks.StructBlock):
    group = blocks.CharBlock(label=_("product group"), max_length=120, required=False)
    examples = blocks.CharBlock(label=_("examples"), max_length=240, required=False)
    standard = blocks.CharBlock(label=_("standard"), max_length=160, required=False)


class WhoMustComplyBlock(blocks.StructBlock):
    """02. ``product_table``, ``product_list_file`` and ``product_list_date``."""

    heading = _heading()
    text = blocks.TextBlock(label=_("text"), max_length=600, required=False)
    products = blocks.ListBlock(ProductRowBlock(), label=_("product table"), default=[])
    product_list_file = DocumentChooserBlock(label=_("full product list"), required=False)
    product_list_date = blocks.DateBlock(
        label=_("version date"),
        required=False,
        help_text=_("The date of the regulator's list shown; printed under the table."),
    )

    class Meta:
        icon = "table"
        label = _("02 Who must comply")
        template = "programs/parts/who_must_comply.html"


class RouteAnswerBlock(blocks.StructBlock):
    answer = blocks.CharBlock(label=_("answer"), max_length=80, required=False)
    outcome = blocks.CharBlock(
        label=_("what follows"),
        max_length=160,
        required=False,
        help_text=_("e.g. 'Product registration'"),
    )
    route = blocks.CharBlock(
        label=_("route key"),
        max_length=40,
        required=False,
        help_text=_(
            "An option key of the request form's 'route' question; the answer then opens "
            "the form with that route chosen. Blank: no link."
        ),
    )


class RouteQuestionBlock(blocks.StructBlock):
    question = blocks.CharBlock(label=_("question"), max_length=160, required=False)
    answers = blocks.ListBlock(RouteAnswerBlock(), label=_("answers"), default=[], max_num=4)


class RoutesBlock(blocks.StructBlock):
    """03. Static in V1: up to three questions; "Find my route" opens the request form."""

    heading = _heading()
    text = blocks.TextBlock(label=_("text"), max_length=400, required=False)
    questions = blocks.ListBlock(RouteQuestionBlock(), label=_("questions"), default=[], max_num=3)
    button_label = blocks.CharBlock(
        label=_("button"), max_length=60, required=False, default="Find my route"
    )

    class Meta:
        icon = "help"
        label = _("03 Which route applies")
        template = "programs/parts/routes.html"


class ProgramStepBlock(blocks.StructBlock):
    title = blocks.CharBlock(label=_("title"), max_length=80, required=False)
    text = blocks.TextBlock(label=_("text"), max_length=400, required=False)
    typical_days = blocks.IntegerBlock(
        label=_("typical working days"),
        min_value=0,
        required=False,
        help_text=_("Blank until agreed: the page shows '[n] working days — to be agreed'."),
    )
    typical_from = blocks.CharBlock(
        label=_("counted from"),
        max_length=80,
        required=False,
        help_text=_("e.g. 'from booking', 'after a satisfactory inspection'."),
    )


class StepsBlock(blocks.StructBlock):
    """04. ``step_list`` with ``typical_days`` per step."""

    heading = _heading()
    steps = blocks.ListBlock(ProgramStepBlock(), label=_("steps"), default=[])

    class Meta:
        icon = "list-ol"
        label = _("04 Step by step")
        template = "programs/parts/steps.html"


class ChecklistBlock(blocks.StructBlock):
    """05. ``document_checklist``; the documents are uploaded in the request form
    (schema ``program_request``), never a Word file to download."""

    heading = _heading()
    text = blocks.TextBlock(label=_("text"), max_length=300, required=False)
    items = blocks.ListBlock(blocks.CharBlock(max_length=200), label=_("documents"), default=[])
    form_label = blocks.CharBlock(
        label=_("button"), max_length=60, required=False, default="Start the request form"
    )
    schema = blocks.CharBlock(
        label=_("form"),
        max_length=40,
        default="program_request",
        help_text=_("Request schema key."),
    )

    class Meta:
        icon = "doc-empty"
        label = _("05 Document checklist")
        template = "programs/parts/checklist.html"


class LabellingBlock(blocks.StructBlock):
    heading = _heading()
    items = blocks.ListBlock(blocks.CharBlock(max_length=240), label=_("points"), default=[])

    class Meta:
        icon = "tasks"
        label = _("06 Testing, inspection and labelling")
        template = "programs/parts/labelling.html"


FEES_MODES = [
    ("table", _("Fee table")),
    ("download", _("Fee structure download")),
    ("on_request", _("On request")),
]


class FeeRowBlock(blocks.StructBlock):
    item = blocks.CharBlock(label=_("item"), max_length=160, required=False)
    fee = blocks.CharBlock(label=_("fee"), max_length=80, required=False)


class FeesBlock(blocks.StructBlock):
    """07. ``fees_mode``: a table, a download, or "on request" (P-13 per program)."""

    heading = _heading()
    mode = blocks.ChoiceBlock(choices=FEES_MODES, label=_("how fees are shown"), required=False)
    rows = blocks.ListBlock(FeeRowBlock(), label=_("fee table"), default=[])
    document = DocumentChooserBlock(label=_("fee structure"), required=False)
    note = blocks.TextBlock(label=_("note"), max_length=300, required=False)

    class Meta:
        icon = "pick"
        label = _("07 Fees")
        template = "programs/parts/fees.html"


class ProgramQABlock(blocks.StructBlock):
    heading = _heading()
    questions = blocks.ListBlock(QuestionBlock(), label=_("questions"), default=[])

    class Meta:
        icon = "help"
        label = _("08 Questions and answers")
        template = "programs/parts/qa.html"


class UpdatesBlock(blocks.StaticBlock):
    class Meta:
        icon = "date"
        label = _("09 Regulatory updates")
        admin_text = _("Lists this program's regulatory updates (news, kind 'regulatory update').")
        template = "programs/parts/updates.html"


class OfficeCardBlock(blocks.StructBlock):
    """Offices are page choosers on any page until ``OfficePage`` exists (D26, T20);
    ``office_name`` is shown while no page is chosen."""

    office = blocks.PageChooserBlock(label=_("office"), required=False)
    office_name = blocks.CharBlock(label=_("office name"), max_length=60, required=False)
    role = blocks.CharBlock(
        label=_("role"), max_length=120, required=False, help_text=_("e.g. 'Program coordinator'")
    )
    person = SnippetChooserBlock("people.Person", label=_("coordinator"), required=False)


class ContactsBlock(blocks.StructBlock):
    heading = _heading()
    offices = blocks.ListBlock(OfficeCardBlock(), label=_("offices"), default=[])

    class Meta:
        icon = "group"
        label = _("10 Contacts for this program")
        template = "programs/parts/contacts.html"


class AppealsBlock(blocks.StaticBlock):
    class Meta:
        icon = "warning"
        label = _("11 Complaints and appeals")
        admin_text = _("Links the complaints and appeals page. Written by the template.")
        template = "programs/parts/appeals.html"


class ReviewedBlock(blocks.StructBlock):
    """12. The date and the owning office are page fields ("Last reviewed")."""

    disclaimer = blocks.TextBlock(
        label=_("disclaimer"),
        max_length=300,
        required=False,
        default=(
            "This page summarises the program as we understand it on the date shown; the "
            "regulator's own publications take precedence."
        ),
    )

    class Meta:
        icon = "date"
        label = _("12 Last reviewed")
        template = "programs/parts/reviewed.html"


PROGRAM_PARTS = [
    ("appointment", AppointmentBlock()),
    ("who_must_comply", WhoMustComplyBlock()),
    ("routes", RoutesBlock()),
    ("steps", StepsBlock()),
    ("checklist", ChecklistBlock()),
    ("labelling", LabellingBlock()),
    ("fees", FeesBlock()),
    ("qa", ProgramQABlock()),
    ("updates", UpdatesBlock()),
    ("contacts", ContactsBlock()),
    ("appeals", AppealsBlock()),
    ("reviewed", ReviewedBlock()),
]

PART_NAMES = [name for name, _block in PROGRAM_PARTS]

# "On this page" (design B-Program-Iraq). "reviewed" is the closing line, not listed.
PART_TITLES = {
    "appointment": _("The regulator and our appointment"),
    "who_must_comply": _("Who must comply"),
    "routes": _("Which route applies to you"),
    "steps": _("Step by step"),
    "checklist": _("Document checklist"),
    "labelling": _("Testing, inspection and labelling"),
    "fees": _("Fees"),
    "qa": _("Questions and answers"),
    "updates": _("Regulatory updates"),
    "contacts": _("Contacts for this program"),
    "appeals": _("Complaints and appeals"),
}

PART_BLOCK_COUNTS = {name: {"max_num": 1} for name in PART_NAMES}
