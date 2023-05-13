from typing import Callable
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed

class ViewBase:
   """Classe criada para fornecer o poder das Class-Based-Views, em conjunto com a flexibilidade das Function-Based-Views. Fui estudando o código da View genérica do django, replicando o que achava que fazia sentido e descartando o que não fazia."""

   # Construtor da classe base, inicia setando os kwargs como atributos da classe
   def __init__(self, **kwargs) -> None:
      for key, value in kwargs.items():
         setattr(self, key, value)

   # Métodos suportados
   metodos_http = [
      'get',
      'post',
      'delete',
      'put'
   ]

   # Como o nome sugere, funciona de forma semelhante ao as_view(), entretanto mais simples e mais legível.
   @classmethod
   def como_view(cls, **kwargs)  -> Callable:
      def view(request: HttpRequest, *args, **kwargs) -> Callable | HttpResponseNotAllowed:
         self = cls(**kwargs)
         self.setup_argumentos(request, *args, **kwargs)
         return self.dispachar(request, *args, **kwargs)
      
      return view
      
   # Seta os atributos globais, como a request e os argumentos.
   def setup_argumentos(self, request: HttpRequest, *args, **kwargs) -> None:
      self.request = request
      self.argumentos = args
      self.kargumentos = kwargs


   # Retorna o método relativo a requisição, seja ela GET, POST, PUT ou DELETE, caso não encontre retorna um 405.
   def dispachar(self, request: HttpRequest, *args, **kwargs) -> Callable | HttpResponseNotAllowed:
      def metodo_nao_permitido(self, request: HttpRequest, *args, **kwargs) -> HttpResponseNotAllowed:
         metodos_permitidos = [metodo.upper() for metodo in self.metodos_http if hasattr(self, metodo)]
         return HttpResponseNotAllowed(metodos_permitidos)
      if request.method.lower() in self.metodos_http:
         controle = getattr(self, request.method.lower(), metodo_nao_permitido)
      else:
         controle = metodo_nao_permitido

      return controle(request, *args, **kwargs)