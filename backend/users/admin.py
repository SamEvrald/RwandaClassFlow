from django.contrib import admin
from .models import User, Teacher, Student, Parent


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'school', 'is_active']
    list_filter = ['role', 'school', 'is_active', 'preferred_language']
    search_fields = ['username', 'email', 'first_name', 'last_name']


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['user', 'employee_id', 'employment_date', 'status']
    list_filter = ['status', 'employment_date']
    search_fields = ['user__username', 'employee_id']


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'student_id', 'current_class', 'status']
    list_filter = ['current_class', 'status', 'gender']
    search_fields = ['user__username', 'student_id']


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ['user', 'relationship']
    list_filter = ['relationship']
    search_fields = ['user__username']
