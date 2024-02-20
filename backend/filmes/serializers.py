from rest_framework import serializers
from .models import Filme
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


# class ProjectAttachmentsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProjectAttachments
#         fields = '__all__'
#         depth = 1
