from django.urls import path
from . import api_views

urlpatterns = [
    path('perfumes/', api_views.PerfumesAPI.as_view(), name='API Perfumes'),
    path('perfume/<int:id>/', api_views.PerfumeAPI.as_view(), name='API Perfume'),
    path('carrinho/', api_views.CarrinhoAPI.as_view(), name='API Carrinho'),
    path('carrinho/<int:id_perfume>/', api_views.CarrinhoProdutoAPI.as_view(), name='API CarrinhoProduto'),
    path('carrinho/total/', api_views.CarrinhoTotalAPI.as_view(), name='total')
]