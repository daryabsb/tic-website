"""The ``Person`` snippet (master plan 03; D26).

A named person a page can point to: the contact on a service or program page, an office
manager, a leader (T21 adds ``LeadershipPage``). The name and the photo are shown only
when the person agreed to be named; otherwise the page shows the title and the channels.

``office`` is a page chooser on any page until ``OfficePage`` exists (T20 narrows the
foreign key; the stored page id stays the same).
"""

from django.db import models
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, PageChooserPanel
from wagtail.models import TranslatableMixin
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from wagtail_localize.fields import SynchronizedField, TranslatableField


class Person(TranslatableMixin, index.Indexed, models.Model):
    name = models.CharField(_("name"), max_length=120)
    title = models.CharField(
        _("title"),
        max_length=120,
        help_text=_("Role as the visitor reads it, e.g. 'Head of inspection services'."),
    )
    office = models.ForeignKey(
        "wagtailcore.Page",
        verbose_name=_("office"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("The office page this person works from."),
    )
    photo = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name=_("photo"),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text=_("A real portrait. Shown only when the person agreed to be named."),
    )
    bio = models.TextField(_("bio"), max_length=300, blank=True, help_text=_("Two sentences."))
    agreed_to_be_named = models.BooleanField(
        _("agreed to be named"),
        default=False,
        help_text=_("Leave off until the person agrees. Off: the site shows the title only."),
    )
    email = models.EmailField(_("email"), blank=True)
    phone = models.CharField(_("phone"), max_length=40, blank=True)
    whatsapp = models.CharField(_("WhatsApp"), max_length=40, blank=True)

    panels = [
        FieldPanel("name"),
        FieldPanel("title"),
        PageChooserPanel("office"),
        FieldPanel("agreed_to_be_named"),
        FieldPanel("photo"),
        FieldPanel("bio"),
        MultiFieldPanel(
            [FieldPanel("email"), FieldPanel("phone"), FieldPanel("whatsapp")],
            heading=_("Channels"),
        ),
    ]

    search_fields = [index.SearchField("name"), index.SearchField("title")]

    translatable_fields = [
        TranslatableField("title"),
        TranslatableField("bio"),
        SynchronizedField("name"),
        SynchronizedField("office"),
        SynchronizedField("photo"),
        SynchronizedField("agreed_to_be_named"),
        SynchronizedField("email"),
        SynchronizedField("phone"),
        SynchronizedField("whatsapp"),
    ]

    class Meta(TranslatableMixin.Meta):
        verbose_name = _("person")
        verbose_name_plural = _("people")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.title})"

    @property
    def public_name(self) -> str:
        """The name when the person agreed to be named, else "" (the page shows the
        title)."""
        return self.name if self.agreed_to_be_named else ""

    @property
    def public_photo(self):
        return self.photo if self.agreed_to_be_named else None


register_snippet(Person)
