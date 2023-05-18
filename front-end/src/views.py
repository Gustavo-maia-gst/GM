import json
from decimal import Decimal
from urllib import request
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from gm.genericos.views import ViewBase
from home.models import Perfume
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt

class PerfumeVenda(ViewBase):
   # Inicializa os dados da sessão caso a mesma não tenha sido inicializada
   @staticmethod
   def inicializar_carrinho(request) -> None:
      try:
         carrinho = request.session['carrinho']
      except Exception:
         request.session['carrinho'] = []
      try:
         total = request.session['total']
      except Exception:
         request.session['total'] = 0.0

   @staticmethod
   # Insere o perfume no carrinho da sessão.
   def inserir_perfume(request: HttpRequest, id: int, quantidade: int) -> None:
      perfume = Perfume.objects.get(pk=id)
      perfume_carrinho = {
         'id': id,
         'nome': perfume.nome,
         'preco': float(perfume.preco),
         'quantidade': quantidade,
      }
      total = round((request.session['total'] + (perfume_carrinho['preco'] * quantidade)), 2)
      request.session['total'] = total
      request.session['carrinho'].append(perfume_carrinho)

   def get(self, request: HttpRequest, id: int) -> HttpResponse:
      if not Perfume.objects.filter(pk=id).exists():
         return redirect('home')
      return render(request, 'venda/index.html')
   
   # Recebe a requisição POST com os dados do produto a serem inseridos no carrinho
   def post(self, request: HttpRequest, id: int) -> HttpResponse:
      self.inicializar_carrinho(request)
      print(request.POST)

      quantidade = int(request.POST.get('quantidade'))

      if quantidade > 0:
         self.inserir_perfume(request, id, quantidade)
      

      try:
         print(request.session['total'])
      except:
         pass
      return render(request, 'venda/index.html')

def carrinho(request: HttpRequest) -> None:
    pass