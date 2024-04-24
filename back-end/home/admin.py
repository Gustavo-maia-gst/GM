from django.contrib import admin
from . import models


class PerfumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'genero', 'briefing')


class GeneroAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')


class NotaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')


admin.site.register(models.Perfume, PerfumeAdmin)
admin.site.register(models.Genero, GeneroAdmin)
admin.site.register(models.Nota, NotaAdmin)
