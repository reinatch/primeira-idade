from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import FilmeSerializer
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
        portfolio_item = self.get_object()
        serializer = FilmeSerializer(portfolio_item)
        return Response(serializer.data)