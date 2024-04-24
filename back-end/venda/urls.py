from django.urls import path
from . import views

urlpatterns = [
    path('perfume/<int:id>/', views.PerfumeVenda.como_view(), name='perfume_venda'),
    path('carrinho/', views.CarrinhoAPI.as_view(), name='API Carrinho'),
    path('carrinho/<int:id_perfume>/', views.CarrinhoProdutoAPI.as_view(), name='API CarrinhoProduto'),
    path('carrinho/total/', views.CarrinhoTotalAPI.as_view(), name='total')
]
