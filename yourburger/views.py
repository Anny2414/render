from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .serializer import UserSerializer, RoleSerializer , OrderSerializar, ProductSerializar, ClientSerializar, PermissionSerializer, DetailPermissionSerializer, SuppliesSerializar, SaleSerializar, DetailSerializer, ContetOrderSerializer, ContentSerializer
from .models import User, Role, Order, Products, Permission,DetallePermiso, Supplies, Detail, ContentOrder, Content

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.exclude(role__name = "Cliente")

class PermissionView(viewsets.ModelViewSet):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()

class DetailPermissionView(viewsets.ModelViewSet):
    serializer_class = DetailPermissionSerializer
    queryset = DetallePermiso.objects.all()
    
class DeletePermissionsByRole(APIView):
    def delete(self, request, roleId):
        DetallePermiso.objects.filter(roleId=roleId).delete()
        
        return Response("Permisos eliminados exitosamente.", status=status.HTTP_204_NO_CONTENT)

class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializar
    queryset = Order.objects.all()

class SalesView(viewsets.ModelViewSet):
    serializer_class = SaleSerializar
    def get_queryset(self):
        queryset = Order.objects.filter(Q(status="Cancelado") | Q(status="Pago"))
        return queryset
    
class DetailView(viewsets.ModelViewSet):
    serializer_class = DetailSerializer
    queryset = Detail.objects.all()
    
class ContentOrderView(viewsets.ModelViewSet):
    serializer_class = ContetOrderSerializer
    queryset = ContentOrder.objects.all()

class ContentView(viewsets.ModelViewSet):
    serializer_class = ContentSerializer
    queryset = Content.objects.all()

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializar
    queryset = Products.objects.all()


class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializar
    queryset = User.objects.filter(role__name="Cliente")

class SupplesView(viewsets.ModelViewSet):
    serializer_class = SuppliesSerializar
    queryset = Supplies.objects.all()
