import uuid

from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
# Create your models here.
from galleryfield.fields import GalleryField
from galleryfield.models import BuiltInGalleryImage
from ckeditor.fields import RichTextField
from filer.fields.image import FilerImageField
from filer.fields.file import FilerFileField
from django.core.files.images import get_image_dimensions
import base64
from PIL import Image
import io

from backend import settings
import logging
logger = logging.getLogger(__name__)
    
class Filme(models.Model):
    CATEGORIES = (
        ('A', 'Production'),
        ('B', 'Co-Production'),
        ('C', 'Future'),
    )
    # category = models.ForeignKey(Category, default="", blank=True, null=True, on_delete=models.CASCADE )
    category = models.CharField(max_length=1, choices=CATEGORIES, blank=False, null=False, default='')
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=True, null=True)
    realizador = models.CharField(max_length=255, blank=True, null=True)
    sinopse = models.TextField(max_length=2500, blank=True, null=True)
    logo = FilerImageField(null=True, blank=True, related_name="thumbnail", on_delete=models.CASCADE, help_text="thumbnail")
    trailer = models.URLField(default='', blank=True, null=True)
    ano = models.CharField(max_length=255, default="", blank=True, null=True)
    genero = models.CharField(max_length=255, default="", blank=True, null=True)
    suporte = models.CharField(max_length=255, default="", blank=True, null=True)
    duraçao = models.CharField(max_length=255, default="", blank=True, null=True)
    budget = models.CharField(max_length=255, default="", blank=True, null=True)
    com = models.TextField(max_length=2500, blank=True, null=True)
    vozes = models.TextField(max_length=2500, blank=True, null=True)
    equipa_argumento=models.CharField(max_length=255, default="", blank=True, null=True)
    equipa_producao=models.CharField(max_length=255, default="", blank=True, null=True)
    equipa_realizacao=models.CharField(max_length=255, default="", blank=True, null=True)
    ficha_tecnica_ano=models.CharField(max_length=255, default="", blank=True, null=True)
    ficha_tecnica_duracao=models.CharField(max_length=255, default="", blank=True, null=True)
    ficha_tecnica_genero=models.CharField(max_length=255, default="", blank=True, null=True)
    ficha_tecnica_suporte=models.CharField(max_length=255, default="", blank=True, null=True)
    financiamento_financiadores=models.CharField(max_length=255, default="", blank=True, null=True)
    financiamento_orcamento=models.CharField(max_length=255, default="", blank=True, null=True)
    # financiamento_galery=models.CharField(max_length=255, default="", blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    galery = GalleryField(verbose_name=('Photos'),blank=True, null=True)
    videodrop = models.URLField(default='', blank=True, null=True)
    thumbnail = models.CharField(max_length=255, default="", blank=True, null=True)
    video_page = models.URLField(default='', blank=True, null=True)
    slug = models.SlugField(max_length=250, unique_for_date='id', default="")

    def __str__(self):
        return self.title


class OutrosVideos(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    link = models.TextField(max_length=2500, blank=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )


    def __str__(self):
        return self.titulo
    
class Tecnicos(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tecnico = models.CharField(max_length=255, default="", blank=True, null=True)
    accao = models.CharField(max_length=255, default="", blank=True, null=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )

    
    def __str__(self):
        return self.accao
    

class Festivais(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    festival = models.CharField(max_length=255, default="", blank=True, null=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )

    def __str__(self):
        return self.festival

class Premios(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    premio = models.CharField(max_length=255, default="", blank=True, null=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )

    def __str__(self):
        return self.premio
    
class Comercial(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pais = models.CharField(max_length=255, default="", blank=True, null=True)
    estreia = models.CharField(max_length=255, default="", blank=True, null=True)
    tv = models.CharField(max_length=255, default="", blank=True, null=True)
    vod = models.CharField(max_length=255, default="", blank=True, null=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )

    def __str__(self):
        return self.pais
    
class PalavrasSobre(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    texto = models.TextField(max_length=2500, blank=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )


    def __str__(self):
        return self.titulo
    
class Imprensa(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    artigo = models.CharField(max_length=255, default="", blank=True, null=True)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    nome = models.CharField(max_length=255, default="", blank=True, null=True)
    link = models.TextField(max_length=2500, blank=True)
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )


    def __str__(self):
        return self.titulo
    
