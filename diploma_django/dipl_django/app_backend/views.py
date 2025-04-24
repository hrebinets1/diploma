# views.py
from rest_framework import viewsets
from .models import Section
from .serializers import SectionSerializer

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Section.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset
