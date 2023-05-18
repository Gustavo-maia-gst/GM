from django.urls import path, include
from . import views

urlpatterns = [
    path('perfume/<int:id>/', views.PerfumeVenda.como_view(), name='perfume_venda'),
]
