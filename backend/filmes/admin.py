from django.contrib import admin
import nested_admin

# Register your models here.
from .models import *
class CategoryInline(nested_admin.NestedStackedInline):
    model = Category
    extra = 1
    
# class FichaTecnicaInline(admin.StackedInline):
#     model = FichaTecnica
    
# class EquipaInline(admin.StackedInline):
#     model = Equipa
    
# class TecnicosInline(admin.StackedInline):
#     model = Tecnicos
    
# class FinanciamentoInline(admin.StackedInline):
#     model = Financiamento
    
# class FestivaisInline(admin.StackedInline):
#     model = Festivais
    
# class PremiosInline(admin.StackedInline):
#     model = Premios
    
# class ComercialInline(admin.StackedInline):
#     model = Comercial
    
    
    
# class PalavrasSobreInline(admin.StackedInline):
#     model = PalavrasSobre
    
# class ImprensaInline(admin.StackedInline):
#     model = Imprensa
    
# class OutrosVideosInline(admin.StackedInline):
#     model = OutrosVideos

class FilmeAdmin(nested_admin.NestedModelAdmin):
    class Meta:
        model = Filme
        fields = '__all__'
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        CategoryInline,
        # FichaTecnicaInline,
        # EquipaInline,
        # TecnicosInline,
        # FinanciamentoInline,
        # FestivaisInline,
        # PremiosInline,
        # ComercialInline,
        # PalavrasSobreInline,
        # ImprensaInline,
        # OutrosVideosInline,
    ]
    

admin.site.register(Filme, FilmeAdmin)
# admin.site.register(Filme)
# admin.site.register(Category)
# admin.site.register(FichaTecnica)