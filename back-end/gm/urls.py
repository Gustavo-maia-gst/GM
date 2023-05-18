from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('venda/', include('venda.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('gm.api.api_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
