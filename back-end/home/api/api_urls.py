from django.urls import path
from . import api_views

urlpatterns = [
    path('perfumes/', api_views.PerfumesAPI.as_view(), name='API Perfumes'),
    path('perfume/<int:id>', api_views.PerfumeAPI.as_view(), name='API Perfume'),
]