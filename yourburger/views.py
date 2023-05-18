from rest_framework import viewsets
from .serializer import UserSerializer, RoleSerializar , OrderSerializar, ProductSerializar
from .models import User, Role, Order, Products

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializar
    queryset = Role.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializar
    queryset = Order.objects.all()
    
    
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializar
    queryset = Products.objects.all()
