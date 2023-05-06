from django.urls import path, include
from rest_framework import routers
from yourburger import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'roles', views.RoleView, 'roles')

urlpatterns = [
    path('api/v1/', include(router.urls))
]