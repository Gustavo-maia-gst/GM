from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('perfumes/', views.PerfumesAPI.as_view(), name='API Perfumes'),
    path('perfume/<int:id>/', views.PerfumeAPI.as_view(), name='API Perfume')
]
