from django.urls import path
from . import views

urlpatterns = [
    # General views
    path('classes/', views.ClassListView.as_view(), name='class-list'),
    path('subjects/', views.SubjectListView.as_view(), name='subject-list'),
    path('assignments/', views.AssignmentListCreateView.as_view(), name='assignment-list'),
    path('assignments/<int:pk>/', views.AssignmentDetailView.as_view(), name='assignment-detail'),
    path('grades/', views.GradeListCreateView.as_view(), name='grade-list'),
    path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
    path('behavior-notes/', views.BehaviorNoteListCreateView.as_view(), name='behavior-notes'),
    
    # Learning resources
    path('resources/', views.LearningResourceListCreateView.as_view(), name='resource-list'),
    path('resources/<int:pk>/', views.LearningResourceDetailView.as_view(), name='resource-detail'),
    
    # Student-specific views
    path('student/assignments/', views.StudentAssignmentsView.as_view(), name='student-assignments'),
    path('student/grades/', views.StudentGradesView.as_view(), name='student-grades'),
    path('student/resources/', views.StudentResourcesView.as_view(), name='student-resources'),
    path('student/dashboard/', views.student_dashboard, name='student-dashboard'),
    path('student/grade-summary/', views.student_grade_summary, name='student-grade-summary'),
    
    # Assignment submissions
    path('student/submissions/', views.StudentSubmissionsView.as_view(), name='student-submissions'),
    path('student/submissions/<int:pk>/', views.StudentSubmissionDetailView.as_view(), name='student-submission-detail'),
    path('student/submissions/<int:assignment_id>/', views.get_submission, name='get-submission'),
    path('student/assignments/<int:assignment_id>/submit/', views.submit_assignment, name='submit-assignment'),
    path('student/assignments/<int:assignment_id>/draft/', views.save_draft, name='save-draft'),
]
