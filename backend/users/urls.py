from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('teachers/', views.TeacherListView.as_view(), name='teacher-list'),
    path('students/', views.StudentListView.as_view(), name='student-list'),
    path('parents/', views.ParentListView.as_view(), name='parent-list'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('change-password/', views.change_password_view, name='change-password'),
]
