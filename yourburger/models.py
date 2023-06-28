from django.db import models
from PIL import Image

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateField(auto_now_add=True)
    permissions = models.ManyToManyField('Permission', through='DetallePermiso')

    status = models.BooleanField(default=True)

    def __str__(self):
        module_names = self.permissions.values_list('module_name', flat=True)
        return f"{self.name} - Access to: {', '.join(module_names)}"

class Permission(models.Model):
    module_name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.module_name

class DetallePermiso(models.Model):
    roleId = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, to_field='module_name')

class User(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, to_field='name')
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)
    document = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=50, null=True)
    lastname = models.CharField(max_length=50, null=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=10, null=True)
    date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.username

class Supplies(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.FloatField(default = 0)
    stock = models.IntegerField(default = 0)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Products(models.Model):
    name = models.CharField(max_length=50,unique=True)
    price = models.FloatField()
    image = models.ImageField(upload_to='media/', default= "")
    description = models.TextField()
    status = models.BooleanField(default=True)


    def __str__(self):
        return self.name

class Content(models.Model):
    supplies = models.ForeignKey(Supplies ,on_delete=models.CASCADE, to_field='name')
    product = models.ForeignKey(Products, on_delete=models.CASCADE, to_field='name')
    count = models.IntegerField(default = 0)
    status = models.BooleanField(default=True)
    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, to_field='username')
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    total = models.FloatField()
    status = models.CharField(max_length=50, default ="Por Pagar")

    def __str__(self):
        return f"Order #{self.id}"

class Detail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, to_field='name')
    amount = models.IntegerField()
    price = models.FloatField()

    def __str__(self) -> str:
        return f"Detail #{self.id}"


class ContentOrder(models.Model):
    supplies = models.ForeignKey(Supplies, on_delete=models.CASCADE)
    detail = models.ForeignKey(Detail, on_delete=models.CASCADE)

    def __str__(self):
        return "Content of detail " + str(self.detail)
