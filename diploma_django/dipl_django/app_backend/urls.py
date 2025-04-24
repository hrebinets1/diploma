# your_app_name/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'section', views.SectionViewSet, basename='section')

urlpatterns = [
    path('', include(router.urls)),  # подключаем маршруты для API
]
