from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register-school/', views.register_school_view, name='register-school'),
    path('change-password/', views.change_password_view, name='change-password'),
    
    # Profile management
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('profile/detailed/', views.user_profile_view, name='user-profile-detailed'),
    
    # User listings
    path('teachers/', views.TeacherListView.as_view(), name='teacher-list'),
    path('students/', views.StudentListView.as_view(), name='student-list'),
    path('parents/', views.ParentListView.as_view(), name='parent-list'),
    
    # Availability checks
    path('check-username/', views.check_username_availability, name='check-username'),
    path('check-email/', views.check_email_availability, name='check-email'),
    path('check-school-id/', views.check_school_id_availability, name='check-school-id'),
]
