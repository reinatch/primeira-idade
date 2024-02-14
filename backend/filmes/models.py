from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField

# class FilmeCategory(Orderable):
#     page = models.ForeignKey('filmes.FilmePage', on_delete=models.CASCADE, related_name='category')
#     name = models.CharField(max_length=255)

#     api_fields = [
#         APIField('name'),
#     ]

class FilmePage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
    ]
     # Export fields over the API
    api_fields = [
        APIField('date'),
        APIField('body'),
        APIField('intro'),
        # APIField('category'),  # This will nest the relevant BlogPageAuthor objects in the API response
    ]