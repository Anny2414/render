from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.views import APIView
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Q
from .serializer import UserSerializer, RoleSerializer , OrderSerializar, ProductSerializar, ClientSerializar, PermissionSerializer, DetailPermissionSerializer, SuppliesSerializar, SaleSerializar, DetailSerializer, ContetOrderSerializer, ContentSerializer
from .models import User, Role, Order, Products, Permission,DetallePermiso, Supplies, Detail, ContentOrder, Content
from rest_framework_simplejwt.authentication import JWTAuthentication



class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email', None)

        try:
            user = get_object_or_404(User, email=email)
            return JsonResponse({'message': 'OK', 'info': email},status=200)
        
        except:
            return JsonResponse({'message': 'El correo electrónico no existe en la base de datos'}, status=404)


class UserRegistrationView(APIView):
    def post(self, request):
        role_cliente = Role.objects.get(name="Cliente")
        data = request.data.copy()
        data['role'] = role_cliente.id  # Asignar el ID del rol "cliente" al campo "role" del objeto de datos

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': 'Credenciales inválidas', 'status' : 401 }, status=status.HTTP_401_UNAUTHORIZED)

        if user.password == password:
            refresh = RefreshToken.for_user(user)
            token = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            request.session['user_id'] = user.id
            return Response({'message': 'Inicio de sesión exitoso', 'status' : 400, 'token': token, 'name': user.name}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
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
