from django.urls import path, include
from rest_framework import routers
from yourburger import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'permisos', views.PermissionView, 'permisos')
router.register(r'roles', views.RoleView, 'roles')
router.register(r'order', views.OrderView, 'order')
router.register(r'products', views.ProductView,'products')
router.register(r'clients', views.ClientView, 'clients')


urlpatterns = [
    path('api/v1/', include(router.urls))
]