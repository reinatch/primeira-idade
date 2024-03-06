from django.contrib import admin
from django import forms
from galleryfield.mixins import GalleryFormMediaMixin
from galleryfield.models import BuiltInGalleryImage
from ckeditor.widgets import CKEditorWidget
# Register your models here.
from .models import *

class TecnicosInline(admin.StackedInline):
    model = Tecnicos
    extra = 0    

class FestivaisInline(admin.StackedInline):
    model = Festivais
    extra = 0    
class PremiosInline(admin.StackedInline):
    model = Premios
    extra = 0    
class ComercialInline(admin.StackedInline):
    model = Comercial
    extra = 0    
    
    
class PalavrasSobreInline(admin.StackedInline):
    model = PalavrasSobre
    extra = 0    
class ImprensaInline(admin.StackedInline):
    model = Imprensa
    extra = 0

class OutrosVideosInline(admin.StackedInline):
    model = OutrosVideos
    extra = 0
    class Meta:
        fields = '__all__'

class FilmeGalleryAdminForm(GalleryFormMediaMixin, forms.ModelForm):
    class Meta:
        model = Filme
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["galery"].required = False
        # self.fields["content"].widget = CKEditorWidget()
class FilmeAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

    form = FilmeGalleryAdminForm
    inlines = [
        TecnicosInline,
        FestivaisInline,
        PremiosInline,
        ComercialInline,
        PalavrasSobreInline,
        ImprensaInline,
        OutrosVideosInline,
    ]
    

admin.site.register(Filme, FilmeAdmin)

admin.site.register(BuiltInGalleryImage)