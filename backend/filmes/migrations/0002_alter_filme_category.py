# Generated by Django 3.2.18 on 2024-03-13 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filme',
            name='category',
            field=models.CharField(choices=[('production', 'Production'), ('co-production', 'Co-Production'), ('future', 'Future')], default='', max_length=13),
        ),
    ]
