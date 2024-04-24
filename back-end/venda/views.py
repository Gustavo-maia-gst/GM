from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from gm.genericos.views import ViewBase
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from gm.genericos.serializers import carrinho_serializer, total_serializer
from rest_framework import status
from home.models import Perfume


class PerfumeVenda(ViewBase):
    def get(self, request: HttpRequest, id: int) -> HttpResponse:
        if not Perfume.objects.filter(pk=id).exists():
            return redirect('home')
        return render(request, 'venda/index.html')


class CarrinhoAPI(APIView):
    """API de gerenciamento do carrinho de compras da sessão."""

    # Qualquer pode acessar a API uma vez que ela altera apenas os dados da sessão.
    permission_classes = [AllowAny]

    # Optei por separar a parte de inclusão do produto no carrinho em métodos menores que realizam funções
    # específicas, seguindo os princípios SOLID.

    # Inicializa os dados da sessão caso a mesma não tenha sido inicializada
    @staticmethod
    def inicializar_carrinho(request: HttpRequest) -> None:
        carrinho = request.session.get('carrinho')
        if carrinho is None:
            request.session['carrinho'] = []

        total = request.session.get('total')
        if total is None:
            request.session['total'] = 0.0

    # Insere o perfume no carrinho da sessão.
    @staticmethod
    def inserir_perfume(request: HttpRequest, id_perfume: int, quantidade: int) -> None:
        perfume = Perfume.objects.get(pk=id_perfume)

        # Agrupa os produto caso o perfume já tenha sido inserido na sessão..
        for produto in request.session['carrinho']:
            if produto['id_perfume'] == id_perfume:
                produto['quantidade'] += quantidade
                total = round((request.session['total'] + (float(perfume.preco) * quantidade)), 2)
                request.session['total'] = total
                return

        # Insere o produto no carrinho.
        perfume_carrinho = {
            'id_perfume': id_perfume,
            'quantidade': quantidade,
        }
        total = round((request.session['total'] + (float(perfume.preco) * quantidade)), 2)
        request.session['total'] = total
        request.session['carrinho'].append(perfume_carrinho)

    def get(self, request: HttpRequest) -> Response:

        # Retorna todos os objetos do carrinho
        try:
            carrinho_json = carrinho_serializer(request)
            return Response(carrinho_json, status.HTTP_200_OK)

        # Caso o carrinho não tenha sido inicializado, ocorrerá um KeyError, pois nesse caso não haverá itens no
        # carrinho, então será retornado um 204.
        except KeyError:
            return Response(None, status.HTTP_204_NO_CONTENT)

    def post(self, request: HttpRequest) -> Response:
        try:
            quantidade = int(request.data.get('quantidade'))
            id_perfume = int(request.data.get('id_perfume'))

            self.inicializar_carrinho(request)

            self.inserir_perfume(request, id_perfume, quantidade)

            return Response(None, status.HTTP_200_OK)
        except TypeError:
            msg = ("Verifique se os campos id_perfume e quantidade foram passados de forma adequada como números "
                   "inteiros")
            return Response(msg, status.HTTP_400_BAD_REQUEST)


class CarrinhoProdutoAPI(APIView):
    # Qualquer pode acessar a API uma vez que ela altera apenas os dados da sessão.
    permission_classes = [AllowAny]

    @staticmethod
    def remover_perfume(request: HttpRequest, id_perfume: int) -> bool:
        try:
            perfume = Perfume.objects.get(pk=id_perfume)
            carrinho = request.session['carrinho']
            total = request.session['total']
            # Remove o produto com o id específicado do carrinho, retorna True se excluiu e False se não encontrou
            for index, produto in enumerate(request.session['carrinho']):
                if produto['id_perfume'] == id_perfume:
                    carrinho.pop(index)
                    total -= (float(perfume.preco) * int(produto['quantidade']))
                    request.session['total'] = total
                    request.session['carrinho'] = carrinho
                    return True

            return False

        except KeyError:
            return False

    def get(self, request: HttpRequest, id_perfume: int) -> Response:
        try:
            carrinho_json = carrinho_serializer(request, id_perfume=id_perfume)
            return Response(carrinho_json, status.HTTP_200_OK)

        except KeyError:
            return Response(None, status.HTTP_204_NO_CONTENT)

    def delete(self, request: HttpRequest, id_perfume: int) -> Response:
        try:
            removeu = self.remover_perfume(request, id_perfume=id_perfume)
            if not removeu:
                # Se não encontrou o produto no carrinho ele retorna um 400.
                return Response("Verifique se o produto foi inserido no carrinho", status.HTTP_400_BAD_REQUEST)

            return Response(None, status.HTTP_204_NO_CONTENT)

        # O KeyError significaria que o carrinho não foi inicializado ainda, nesse caso também é retornado um 400.
        except KeyError:
            return Response("Verifique se existe algum produto no carrinho", status.HTTP_400_BAD_REQUEST)


class CarrinhoTotalAPI(APIView):
    def get(self, request: HttpRequest) -> Response:
        try:
            total_json = total_serializer(request)
            return Response(total_json, status.HTTP_200_OK)
        except KeyError:
            total_json = total_serializer(request, zero=True)
            return Response(total_json, status.HTTP_200_OK)