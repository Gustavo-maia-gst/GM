from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from home.models import Perfume
from .serializers import PerfumeSerializer


class PerfumesAPI(APIView):
    """API de listagem e inserção dos perfumes do projeto GM Perfumes, suportando os métodos GET e POST,
    sendo o método POST disponível apenas para usuários autenticados"""

    def get(self, request: HttpRequest) -> Response:
        perfumes = Perfume.objects.all()

        # Filtra possível parâmetro de nome vindos do método GET.
        nome = request.query_params.get('nome')
        if nome:
            nome = nome.strip()
            perfumes = perfumes.filter(nome__icontains=nome)

        serializer = PerfumeSerializer(perfumes, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request: HttpRequest) -> Response:
        serializer = PerfumeSerializer(data=request.data)

        # Verifica se os dados são válidos e os salvam no banco, caso contrário lança uma excessão de código 400.
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)


class PerfumeAPI(APIView):
    """API de visualização, alteração e remoção de perfumes do projeto GM Perfumes, suportando os métodos GET,
    PUT e DELETE, sendo estes últimos disponíveis apenas para usuários autenticados"""

    def get(self, request: HttpRequest, id) -> Response:
        # Retorna o perfume solicitado na request.
        perfume = Perfume.objects.get(pk=id)
        serializer = PerfumeSerializer(perfume)
        return Response(serializer.data, status.HTTP_200_OK)

    def put(self, request: HttpRequest, id) -> Response:
        # Realiza a alteração no perfume com o id
        perfume = Perfume.objects.get(pk=id)
        serializer = PerfumeSerializer(perfume, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    def delete(self, request: HttpRequest, id) -> Response:
        perfume = Perfume.objects.get(pk=id)
        perfume.delete()
        return Response(None, status.HTTP_204_NO_CONTENT)


def home(request: HttpRequest) -> HttpResponse:
    return render(request, 'home/index.html')
