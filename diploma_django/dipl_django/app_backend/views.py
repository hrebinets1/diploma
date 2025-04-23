from django.shortcuts import render
from .models import Test

def test_list(request):
    tests = Test.objects.all()  # Получаем все тесты
    return render(request, 'app_backend/test_list.html', {'tests': tests})