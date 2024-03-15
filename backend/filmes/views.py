from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import FilmeSerializer, OutrosVideosSerializer, TecnicosSerializer, FestivaisSerializer, PremiosSerializer, ComercialSerializer, PalavrasSobreSerializer, ImprensaSerializer
from .models import *

class FilmeViewSet(viewsets.ModelViewSet):
    queryset = Filme.objects.all()
    serializer_class = FilmeSerializer
    lookup_field = 'slug'  # Use slug as the lookup field

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    @action(detail=False, methods=['get'])
    def filtered(self, request):
        queryset = self.get_queryset()
        serializer = FilmeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        filme_instance = self.get_object()
        filme_data = FilmeSerializer(filme_instance).data
        outros_videos = OutrosVideosSerializer(filme_instance.outrosvideos_set.all(), many=True).data
        tecnicos = TecnicosSerializer(filme_instance.tecnicos_set.all(), many=True).data
        festivais = FestivaisSerializer(filme_instance.festivais_set.all(), many=True).data
        premios = PremiosSerializer(filme_instance.premios_set.all(), many=True).data
        comercial = ComercialSerializer(filme_instance.comercial_set.all(), many=True).data
        palavras_sobre = PalavrasSobreSerializer(filme_instance.palavrassobre_set.all(), many=True).data
        imprensa = ImprensaSerializer(filme_instance.imprensa_set.all(), many=True).data

        return JsonResponse({
            'filme': filme_data,
            'outros_videos': outros_videos,
            'tecnicos': tecnicos,
            'festivais': festivais,
            'premios': premios,
            'comercial': comercial,
            'palavras_sobre': palavras_sobre,
            'imprensa': imprensa
        })