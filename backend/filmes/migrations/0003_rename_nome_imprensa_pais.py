# Generated by Django 3.2.18 on 2024-03-13 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0002_alter_filme_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='imprensa',
            old_name='nome',
            new_name='pais',
        ),
    ]
