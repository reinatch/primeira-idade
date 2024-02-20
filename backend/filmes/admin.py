from django.contrib import admin
import nested_admin

# Register your models here.
from .models import *
# class CategoryInline(admin.StackedInline):
#     model = Category
#     extra = 1
    
# class FichaTecnicaInline(admin.TabularInline):
#     model = FichaTecnica
#     extra = 1    
class EquipaInline(admin.StackedInline):
    model = Equipa
    extra = 0   
class TecnicosInline(admin.StackedInline):
    model = Tecnicos
    extra = 0    
class FinanciamentoInline(admin.StackedInline):
    model = Financiamento
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

class FilmeAdmin(admin.ModelAdmin):
    class Meta:
        model = Filme
        fields = '__all__'
        
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        # CategoryInline,
        # FichaTecnicaInline,
        EquipaInline,
        TecnicosInline,
        FinanciamentoInline,
        FestivaisInline,
        PremiosInline,
        ComercialInline,
        PalavrasSobreInline,
        ImprensaInline,
        OutrosVideosInline,
    ]
    

admin.site.register(Filme, FilmeAdmin)
# admin.site.register(Filme)
# admin.site.register(Category)
# admin.site.register(FichaTecnica)