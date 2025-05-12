from rest_framework import viewsets
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    def get_queryset(self):
        queryset = Section.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class PresentTimeViewSet(viewsets.ModelViewSet):
    queryset = PresentTime.objects.all()
    serializer_class = PresentTimesSerializer

class PastTimeViewSet(viewsets.ModelViewSet):
    queryset = PastTime.objects.all()
    serializer_class = PastTimesSerializer

class FutureTimeViewSet(viewsets.ModelViewSet):
    queryset = FutureTime.objects.all()
    serializer_class = FutureTimesSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)