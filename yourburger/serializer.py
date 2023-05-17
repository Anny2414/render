from rest_framework import serializers
from .models import User, Role, Order

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