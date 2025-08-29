from django.urls import path
from . import views

urlpatterns = [
    path('classes/', views.ClassListView.as_view(), name='class-list'),
    path('subjects/', views.SubjectListView.as_view(), name='subject-list'),
    path('assignments/', views.AssignmentListCreateView.as_view(), name='assignment-list'),
    path('assignments/<int:pk>/', views.AssignmentDetailView.as_view(), name='assignment-detail'),
    path('grades/', views.GradeListCreateView.as_view(), name='grade-list'),
    path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
    path('behavior-notes/', views.BehaviorNoteListCreateView.as_view(), name='behavior-notes'),
]
