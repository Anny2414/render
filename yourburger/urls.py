from django.urls import path, include
from rest_framework import routers
from yourburger import views
from django.conf.urls.static import static
from django.conf import settings
from .views import UserRegistrationView,PasswordResetView
router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'permisos', views.PermissionView, 'permisos')
router.register(r'detallepermiso', views.DetailPermissionView, 'detallepermiso')
router.register(r'roles', views.RoleView, 'roles')
router.register(r'order',   views.OrderView, 'order')
router.register(r'sales',   views.SalesView, 'sales')
router.register(r'detail',   views.DetailView, 'detail')
router.register(r'contentorder',   views.ContentOrderView, 'contentorder')
router.register(r'products', views.ProductView,'products')
router.register(r'clients', views.ClientView, 'clients')
router.register(r'Supplies', views.SupplesView, 'supplies')
router.register(r'content', views.ContentView, 'content')

urlpatterns = [
    path('email/', PasswordResetView.as_view(), name="reset"),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('api/v1/', include(router.urls)),
    path('api/v1/detallepermiso/delete/<int:roleId>/', views.DeletePermissionsByRole.as_view(), name='delete_permissions_by_role'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)