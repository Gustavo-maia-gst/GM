from django.db import models

class Genero(models.Model):
   nome = models.CharField(max_length=30)

   class Meta:
        verbose_name = 'Gênero'

   def __str__(self) -> str:
       return self.nome

class Perfume(models.Model):
   nome = models.CharField(max_length=75)
   genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
   briefing = models.CharField(max_length=100)
   descricao = models.TextField()
   preco = models.DecimalField(max_digits=8, decimal_places=2)
   imagem = models.TextField()

   class Meta:
      verbose_name = 'Perfume'

   def __str__(self) -> str:
      return self.nome