from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'section', views.SectionViewSet, basename='section')
router.register(r'present-time', views.PresentTimeViewSet)
router.register(r'past-time', views.PastTimeViewSet)
router.register(r'future-time', views.FutureTimeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('get_user', views.get_user, name='get_user')

]
