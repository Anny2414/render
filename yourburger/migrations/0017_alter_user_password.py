# Generated by Django 4.2.2 on 2023-09-10 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yourburger', '0016_alter_products_price_alter_supplies_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=250),
        ),
    ]
