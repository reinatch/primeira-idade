from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import FilmeSerializer, CategorySerializer
from .models import *
# Create your views here.
class FilmeViewSet(viewsets.ModelViewSet):
    queryset = Filme.objects.all()
    serializer_class = FilmeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.kwargs.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    @action(detail=False, methods=['get'])
    def filtered(self, request, category=None):
        queryset = self.get_queryset()
        # qu = self.get_urls()
        serializer = FilmeSerializer(queryset, many=True)
        # for obj in serializer.data:
        #     image_ids = obj['galery']
        #     images = []
        #     for image_id in image_ids:
        #         image = BuiltInGalleryImage.objects.get(pk=image_id).image.url
        #         images.append(image)
        #     obj['galery'] = images
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # Retrieve the portfolio item
        portfolio_item = self.get_object()

        # image_ids = portfolio_item.galery
        # images = []
        # for image_id in image_ids:
        #     image = BuiltInGalleryImage.objects.get(pk=image_id).image.url
        #     images.append(image)
        # portfolio_item.galery = images

        # Return the updated portfolio item
        serializer = FilmeSerializer(portfolio_item)
        return Response(serializer.data)

