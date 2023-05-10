# Generated by Django 4.2 on 2023-05-09 23:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=30)),
            ],
            options={
                'verbose_name': 'Gênero',
            },
        ),
        migrations.CreateModel(
            name='Perfume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=75)),
                ('descricao', models.TextField()),
                ('preco', models.DecimalField(decimal_places=2, max_digits=8)),
                ('imagem', models.ImageField(upload_to='templates/media/')),
                ('genero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.genero')),
            ],
            options={
                'verbose_name': 'Perfume',
            },
        ),
    ]
