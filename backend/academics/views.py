from rest_framework import generics, permissions
from .models import Class, Subject, Assignment, Grade, Attendance, BehaviorNote
from .serializers import (
    ClassSerializer, SubjectSerializer, AssignmentSerializer,
    GradeSerializer, AttendanceSerializer, BehaviorNoteSerializer
)


class ClassListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Class.objects.filter(school=self.request.user.school)


class SubjectListView(generics.ListAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Subject.objects.filter(school=self.request.user.school)


class AssignmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Assignment.objects.filter(teacher__user=self.request.user)
        return Assignment.objects.filter(subject__school=self.request.user.school)
    
    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.teacher)


class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Assignment.objects.filter(teacher__user=self.request.user)
        return Assignment.objects.filter(subject__school=self.request.user.school)


class GradeListCreateView(generics.ListCreateAPIView):
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return Grade.objects.filter(student__user=self.request.user)
        elif self.request.user.role == 'teacher':
            return Grade.objects.filter(graded_by__user=self.request.user)
        return Grade.objects.filter(student__user__school=self.request.user.school)


class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return Attendance.objects.filter(student__user=self.request.user)
        return Attendance.objects.filter(student__user__school=self.request.user.school)


class BehaviorNoteListCreateView(generics.ListCreateAPIView):
    serializer_class = BehaviorNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return BehaviorNote.objects.filter(student__user=self.request.user)
        elif self.request.user.role == 'teacher':
            return BehaviorNote.objects.filter(teacher__user=self.request.user)
        return BehaviorNote.objects.filter(student__user__school=self.request.user.school)
