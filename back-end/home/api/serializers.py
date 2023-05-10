from home import models
from rest_framework.serializers import ModelSerializer

# Serializer padrão usando o ModelSerializer do django-rest-framework:
class PerfumeSerializer(ModelSerializer):
     class Meta:
          model = models.Perfume
          fields = (
               'id',
               'nome',
               'briefing',
               'descricao',
               'genero',
               'preco',
               'imagem',
          )


