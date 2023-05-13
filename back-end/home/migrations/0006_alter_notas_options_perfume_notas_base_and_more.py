# Generated by Django 4.2 on 2023-05-13 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_merge_20230513_1048'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notas',
            options={},
        ),
        migrations.AddField(
            model_name='perfume',
            name='notas_base',
            field=models.ManyToManyField(blank=True, null=True, related_name='Notas_de_base', to='home.notas'),
        ),
        migrations.AddField(
            model_name='perfume',
            name='notas_corpo',
            field=models.ManyToManyField(blank=True, null=True, related_name='Notas_de_corpo', to='home.notas'),
        ),
        migrations.AddField(
            model_name='perfume',
            name='notas_saida',
            field=models.ManyToManyField(blank=True, null=True, related_name='Notas_de_saida', to='home.notas'),
        ),
    ]