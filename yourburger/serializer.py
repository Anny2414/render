from rest_framework import serializers
from .models import User, Role, Order, Products, Permission, DetallePermiso, Supplies, Detail, Content ,ContentOrder

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class DetailPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePermiso
        fields = '__all__'

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class OrderSerializar(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class SaleSerializar(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__' 
class ProductSerializar(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class ClientSerializar(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
        
class SuppliesSerializar(serializers.ModelSerializer):
    class Meta:
        model = Supplies
        fields ='__all__'
        
class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = '__all__'
  
class ContetOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentOrder
        fields ='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields ='__all__'