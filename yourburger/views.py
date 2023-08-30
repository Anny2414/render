import random
from django.http import JsonResponse
from django.core.mail import send_mail
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
from .serializer import (
    UserSerializer,
    RoleSerializer,
    OrderSerializar,
    ProductSerializar,
    ClientSerializar,
    PermissionSerializer,
    DetailPermissionSerializer,
    SuppliesSerializar,
    SaleSerializar,
    DetailSerializer,
    ContetOrderSerializer,
    ContentSerializer,
)
from .models import (
    User,
    Role,
    Order,
    Products,
    Permission,
    DetallePermiso,
    Supplies,
    Detail,
    ContentOrder,
    Content,
)

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.template import Context
from django.template import Template
from django.template.loader import get_template
from django.shortcuts import render

@api_view(['POST'])
def enviar_correo(request):
    if request.method == 'POST':
        destinatario = request.data.get('email')
        asunto = 'Recuperación de contraseña'
        remitente = ''

        if not destinatario:
            return Response({'error': 'Debes proporcionar un destinatario en el cuerpo de la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=destinatario)
        except User.DoesNotExist:
            return Response({'error': 'No hay usuarios asociados a este correo'}, status=status.HTTP_404_NOT_FOUND)
        
        x = random.randint(1000000, 9999999) 
        user.password = (x)
        user.save()

        html_content = """
        <!DOCTYPE html>
       <html>
  <head>
  
    <style>
      /* Aquí puedes agregar tus estilos CSS inline */
      body {
        background-position: center; 
        background-repeat: no-repeat; 
      
        font-family: 'karla';
        margin: 0;
        padding: 20px;
      }
      .x{
        height: 100px;
      }
      .titulo {
        font-size: 24px;
        color: #007bff;
      }
      .carta {
        max-width: 500px;
        margin: 0 auto;
        border-radius: 30px;
        padding: 20px;
        background-color: #f9f9f9;
    }

    .encabezado {
        text-align: center;
        font-size: 24px;
    }


    .contenido {
       
        margin: 20px;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
    }

    .firma {
        margin-top: 20px;
        text-align: center;
    }
    </style>
  </head>
        <body>
            <div class="carta">
                <div class="encabezado">
                    ¡Recupera tu cuenta!
                </div>
            
                <div class="contenido">
                    <p>Hola,</p>
                    <p>Hemos recibido una solicitud para acceder a tu cuenta.</p>
                    <p>Tu nueva contraseña temporal es: <strong>%s</strong></p>
                    <p>Por razones de seguridad, te recomendamos que modifiques esta contraseña lo más pronto posible a través de tu perfil de usuario.</p>
                </div>
            
                <div class="firma">
                    Atentamente,<br>
                    El equipo de cuentas Auntie's Burger
                </div>
            </div>
        </body>
        </html>
        """% x
        msg = EmailMultiAlternatives(asunto, strip_tags(html_content), remitente, [destinatario])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return Response({'mensaje': 'Correo enviado exitosamente','status':200})

       
class UserRegistrationView(APIView):
    def post(self, request):
        role_cliente = Role.objects.get(name="Cliente")
        data = request.data.copy()
        data[
            "role"
        ] = (
            role_cliente.id
        )  # Asignar el ID del rol "cliente" al campo "role" del objeto de datos

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"message": "Credenciales inválidas", "status": 401},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if user.password == password:
            refresh = RefreshToken.for_user(user)
            token_content = {
                "user_id": user.id,
                "role": str(user.role),
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
            response_data = {
                "message": "Inicio de sesión exitoso",
                "status": status.HTTP_200_OK,
                "token": token_content,
                "name": user.name,
            }
            return JsonResponse(response_data)
        else:
            return Response(
                {"message": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.exclude(role__name="Cliente")


class PermissionView(viewsets.ModelViewSet):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()


class DetailPermissionView(viewsets.ModelViewSet):
    serializer_class = DetailPermissionSerializer
    queryset = DetallePermiso.objects.all()


class DeletePermissionsByRole(APIView):
    def delete(self, request, roleId):
        DetallePermiso.objects.filter(roleId=roleId).delete()

        return Response(
            "Permisos eliminados exitosamente.", status=status.HTTP_204_NO_CONTENT
        )


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
