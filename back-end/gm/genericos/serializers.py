import json
from django.http import HttpRequest
from home import models
from rest_framework.serializers import ModelSerializer
from typing import Dict, Any


# Serializers usando o ModelSerializer padrão do django-rest-framework:

class GeneroSerializer(ModelSerializer):
    class Meta:
        model = models.Genero
        fields = ('nome',)


class NotaSerializer(ModelSerializer):
    class Meta:
        model = models.Nota
        fields = ('nome',)


class PerfumeSerializer(ModelSerializer):
    class Meta:
        model = models.Perfume
        fields = '__all__'

    genero = GeneroSerializer()
    notas_saida = NotaSerializer(many=True)
    notas_corpo = NotaSerializer(many=True)
    notas_base = NotaSerializer(many=True)


# Serializer baseado em função que serializa o carrinho da sessão.
def carrinho_serializer(request: HttpRequest, id_perfume=None) -> list[Dict[str, Any]] | None:
    carrinho = request.session['carrinho']
    if id_perfume is None:
        carrinho_lista = list()
        for produto in carrinho:
            perfume = models.Perfume.objects.get(pk=produto['id_perfume'])
            temp = {
                'id_perfume': perfume.id,
                'nome': perfume.nome,
                'preco': float(perfume.preco),
                'imagem': perfume.imagem,
                'quantidade': produto['quantidade'],
                'valor': round(float(perfume.preco) * produto['quantidade'], 2)
            }
            carrinho_lista.append(temp)
            temp = {}
        return carrinho_lista
    elif id_perfume:
        perfume = models.Perfume.objects.get(pk=id_perfume)
        quantidade = 0
        for index, produto in enumerate(carrinho):
            if produto['id_perfume'] == id_perfume:
                quantidade = carrinho[index]['quantidade']
        produto_carrinho = {
            'id_perfume': perfume.id,
            'nome': perfume.nome,
            'preco': float(perfume.preco),
            'imagem': perfume.imagem,
            'quantidade': quantidade,
            'valor': round(float(perfume.preco) * quantidade, 2)
        }
        return produto_carrinho if produto_carrinho['quantidade'] else None


def total_serializer(request: HttpRequest, zero=False) -> Dict[str, float]:
    if zero:
        total_json = json.dumps('0.0')
        return total_json

    total = round(request.session['total'], 2)
    total_json = json.dumps(total)

    return total_json
