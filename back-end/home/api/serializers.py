from dataclasses import fields
from home import models
from rest_framework.serializers import ModelSerializer

# Serializers usando o ModelSerializer padrão do django-rest-framework:

class GeneroSerializaer(ModelSerializer):
     class Meta:
          model = models.Genero
          fields = ('nome', )

class PerfumeSerializer(ModelSerializer):
     genero = GeneroSerializaer()

     class Meta:
          model = models.Perfume
          fields = '__all__'


