from rest_framework import generics, permissions
from .models import School, SchoolHoliday
from .serializers import SchoolSerializer, SchoolHolidaySerializer


class SchoolDetailView(generics.RetrieveUpdateAPIView):
    """View for school profile management"""
    serializer_class = SchoolSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user.school


class SchoolHolidayListCreateView(generics.ListCreateAPIView):
    """View for managing school holidays"""
    serializer_class = SchoolHolidaySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return SchoolHoliday.objects.filter(school=self.request.user.school)
    
    def perform_create(self, serializer):
        serializer.save(school=self.request.user.school)
