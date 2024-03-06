
from django.urls import include, path
from .views import *
from django.conf import settings
from drf_yasg import openapi
from rest_framework import permissions
from drf_yasg.views import get_schema_view
filme_list = FilmeViewSet.as_view({'get': 'filtered'})
filme_filtered = FilmeViewSet.as_view({'get': 'filtered'})
filme_detail = FilmeViewSet.as_view({'get': 'retrieve'})
schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('filmes/', filme_list, name='filme-list'),
    #     path('filmes/<str:category>/', filme_filtered,
    #          name='filme-list-category'),
    path('filmes/<int:pk>/',
         filme_detail, name='filme-detail'),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('filer/', include('filer.urls')),
]
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)