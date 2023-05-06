from rest_framework import viewsets
from .serializer import UserSerializer, RoleSerializar
from .models import User, Role

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializar
    queryset = Role.objects.all()