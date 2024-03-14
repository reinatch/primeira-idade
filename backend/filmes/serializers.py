from rest_framework import serializers
from .models import *
# from .models import Image

# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = '__all__'
        
# class PageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Page
#         fields = '__all__'


# class CreatePageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Page
#         fields = '__all__'



class FilmeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = '__all__'
        depth = 2
class BaseRelatedSerializer(serializers.ModelSerializer):
    class Meta:
        exclude = ['filme']

class OutrosVideosSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = OutrosVideos

class TecnicosSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = Tecnicos

class FestivaisSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = Festivais

class PremiosSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = Premios

class ComercialSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = Comercial

class PalavrasSobreSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = PalavrasSobre

class ImprensaSerializer(BaseRelatedSerializer):
    class Meta(BaseRelatedSerializer.Meta):
        model = Imprensa