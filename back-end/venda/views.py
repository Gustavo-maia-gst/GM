from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from gm.genericos.views import ViewBase
from home.models import Perfume
from django.shortcuts import redirect

class PerfumeVenda(ViewBase):
   def get(self, request: HttpRequest, id: int) -> HttpResponse:
      if not Perfume.objects.filter(pk=id).exists():
         return redirect('home')
      return render(request, 'venda/index.html')