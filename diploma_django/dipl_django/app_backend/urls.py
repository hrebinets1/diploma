from django.urls import path
from . import views

urlpatterns = [
    path('tests/', views.test_list, name='test_list'),
]
