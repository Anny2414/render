from rest_framework import serializers
from .models import User, Role, Order, Products

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RoleSerializar(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class OrderSerializar(serializers.ModelSerializer):
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