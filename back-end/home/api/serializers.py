from dataclasses import fields
from home import models
from rest_framework.serializers import ModelSerializer

# Serializers usando o ModelSerializer padrão do django-rest-framework:

class GeneroSerializer(ModelSerializer):
     class Meta:
          model = models.Genero
          fields = ('nome', )

class NotaSerializer(ModelSerializer):
     class Meta:
          model = models.Nota
          fields = ('nome', )

class PerfumeSerializer(ModelSerializer):
     class Meta:
          model = models.Perfume
          fields = '__all__'
          
     genero = GeneroSerializer()
     notas_saida = NotaSerializer(many=True)
     notas_corpo = NotaSerializer(many=True)
     notas_base = NotaSerializer(many=True)



