from re import T
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Genero(models.Model):
   nome = models.CharField(max_length=30)

   class Meta:
        verbose_name = 'Gênero'

   def __str__(self) -> str:
       return self.nome

class Nota(models.Model):
   nome = models.CharField(max_length=50)

   def __str__(self) -> str:
      return self.nome

class Perfume(models.Model):
   nome = models.CharField(max_length=75)
   genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
   briefing = models.CharField(max_length=100)
   descricao = models.TextField()
   preco = models.DecimalField(max_digits=8, decimal_places=2)
   imagem = models.TextField()
   notas_saida = models.ManyToManyField('Nota', related_name='Notas_de_saida', blank=True)
   notas_corpo = models.ManyToManyField('Nota', related_name='Notas_de_corpo', blank=True)
   notas_base = models.ManyToManyField('Nota', related_name='Notas_de_base', blank=True)

   class Meta:
      verbose_name = 'Perfume'

   def __str__(self) -> str:
      return self.nome