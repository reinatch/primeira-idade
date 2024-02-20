# Generated by Django 5.0.2 on 2024-02-20 14:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0003_filme_category_alter_filme_distribuiçao_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filme',
            name='outros_videos',
        ),
        migrations.AddField(
            model_name='outrosvideos',
            name='filme',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='filmes.filme'),
        ),
    ]
