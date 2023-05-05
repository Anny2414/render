from django.db import models

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Permission(models.Model):
    module_name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class DetallePermiso(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

class User(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)
    document = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=10)
    date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.username

class Supplies(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    status = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    
class Products(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Content(models.Model):
    name = models.CharField(max_length=50)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    def __str__(self):
        return self.name
    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    total = models.FloatField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"Order #{self.id}"

class Detail(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    amount = models.IntegerField()
    price = models.FloatField()

    def __str__(self) -> str:
        return f"Detail #{self.id}"