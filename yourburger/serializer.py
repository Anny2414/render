from rest_framework import serializers
from .models import User, Role

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RoleSerializar(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'