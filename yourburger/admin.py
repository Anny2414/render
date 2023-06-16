from django.contrib import admin
from .models import User, Role, Permission, Products, DetallePermiso

# Register your models here.
admin.site.register(Role)
admin.site.register(Permission)
admin.site.register(User)
admin.site.register(Products)
admin.site.register(DetallePermiso)