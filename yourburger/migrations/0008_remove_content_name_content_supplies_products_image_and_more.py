# Generated by Django 4.2.1 on 2023-06-14 14:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('yourburger', '0007_alter_order_user_alter_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='name',
        ),
        migrations.AddField(
            model_name='content',
            name='supplies',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='yourburger.supplies', to_field='name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='products',
            name='image',
            field=models.ImageField(default='', upload_to='products/'),
        ),
        migrations.AlterField(
            model_name='content',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yourburger.products', to_field='name'),
        ),
        migrations.AlterField(
            model_name='detail',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yourburger.products', to_field='name'),
        ),
        migrations.AlterField(
            model_name='detallepermiso',
            name='permission',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yourburger.permission', to_field='module_name'),
        ),
        migrations.AlterField(
            model_name='permission',
            name='module_name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='products',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='supplies',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.CreateModel(
            name='ContentOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yourburger.detail')),
                ('supplies', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yourburger.supplies', to_field='name')),
            ],
        ),
    ]
