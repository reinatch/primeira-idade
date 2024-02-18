import uuid

from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
# Create your models here.


class FichaTecnica(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    year = models.CharField(max_length=255, default="", blank=True, null=True)
    genre = models.CharField(max_length=255, default="", blank=True, null=True)
    suport = models.CharField(max_length=255, default="", blank=True, null=True)
    duration = models.CharField(max_length=255, default="", blank=True, null=True)
    budget = models.CharField(max_length=255, default="", blank=True, null=True)
    
    def __str__(self):
        return self
    
class Equipa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    realizacao = models.CharField(max_length=255, default="", blank=True, null=True)
    argumentacao = models.CharField(max_length=255, default="", blank=True, null=True)
    producao = models.CharField(max_length=255, default="", blank=True, null=True)

    
    def __str__(self):
        return self
    
class Tecnicos(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tecnico = models.CharField(max_length=255, default="", blank=True, null=True)
    accao = models.CharField(max_length=255, default="", blank=True, null=True)

    
    def __str__(self):
        return self.accao
    
class Financiamento(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    orcamento = models.CharField(max_length=255, default="", blank=True, null=True)
    financiadores = models.CharField(max_length=255, default="", blank=True, null=True)
    # logos = galeria

    def __str__(self):
        return self.financiadores

class Festivais(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    festival = models.CharField(max_length=255, default="", blank=True, null=True)

    def __str__(self):
        return self.festival

class Premios(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    premio = models.CharField(max_length=255, default="", blank=True, null=True)

    def __str__(self):
        return self.premio
    
class Comercial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pais = models.CharField(max_length=255, default="", blank=True, null=True)
    estreia = models.CharField(max_length=255, default="", blank=True, null=True)
    tv = models.CharField(max_length=255, default="", blank=True, null=True)
    vod = models.CharField(max_length=255, default="", blank=True, null=True)

    def __str__(self):
        return self.pais
    
class PalavrasSobre(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    texto = models.TextField(max_length=2500, blank=True)


    def __str__(self):
        return self.titulo
    
class Imprensa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    link = models.TextField(max_length=2500, blank=True)


    def __str__(self):
        return self.titulo
    
class OutrosVideos(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=255, default="", blank=True, null=True)
    link = models.TextField(max_length=2500, blank=True)


    def __str__(self):
        return self.titulo
    
class Filme(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=True, null=True)
    realizador = models.CharField(max_length=255, blank=True, null=True)
    # category = models.ForeignKey(Category, default="", blank=True, null=True, on_delete=models.CASCADE )
    slug = models.SlugField(max_length=250, unique_for_date='id', default="")
    sinopse = models.TextField(max_length=2500, blank=True)
    trailer = models.URLField(default='', blank=True)
    ficha_tecnica = models.ForeignKey(FichaTecnica, default="", blank=True, null=True, on_delete=models.CASCADE )
    equipa = models.ForeignKey(Equipa, default="", blank=True, null=True, on_delete=models.CASCADE )
    tecnicos = models.ManyToManyField(Tecnicos, blank=True)
    com = models.TextField(max_length=2500, blank=True)
    vozes = models.TextField(max_length=2500, blank=True)
    financiamento = models.ForeignKey(Financiamento, default="", blank=True, null=True, on_delete=models.CASCADE )
    festivais = models.ManyToManyField(Festivais, blank=True)
    premios = models.ManyToManyField(Premios, blank=True)
    distribuiçao = models.ManyToManyField(Comercial, blank=True)
    palavras = models.ManyToManyField(PalavrasSobre, blank=True)
    imprensa = models.ManyToManyField(Imprensa, blank=True)
    outros_videos = models.ManyToManyField(OutrosVideos, blank=True)
    # frame = image
    # content = RichTextField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    # galery = GalleryField(verbose_name=('Photos'),blank=True, null=True)
    video = models.URLField(default='', blank=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, default="")
    filme = models.ForeignKey(Filme, default="", blank=True, null=True, on_delete=models.CASCADE )

    def __str__(self):
        return self.title
    