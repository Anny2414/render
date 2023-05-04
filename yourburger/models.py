from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    document = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=10)
    date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.username