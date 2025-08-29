from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom user model for RwandaClassFlow"""
    
    USER_ROLES = (
        ('admin', _('System Administrator')),
        ('school_admin', _('School Administrator')),
        ('teacher', _('Teacher')),
        ('student', _('Student')),
        ('parent', _('Parent/Guardian')),
    )
    
    LANGUAGES = (
        ('en', _('English')),
        ('fr', _('French')),
        ('rw', _('Kinyarwanda')),
    )
    
    role = models.CharField(max_length=20, choices=USER_ROLES)
    phone_number = models.CharField(max_length=20, unique=True, null=True, blank=True)
    preferred_language = models.CharField(max_length=5, choices=LANGUAGES, default='en')
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_first_login = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = _('User')
        verbose_name_plural = _('Users')
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class Teacher(models.Model):
    """Extended profile for teachers"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    employee_id = models.CharField(max_length=50, unique=True)
    subjects_taught = models.ManyToManyField('academics.Subject', related_name='teachers')
    classes_assigned = models.ManyToManyField('academics.Class', related_name='teachers')
    employment_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', _('Active')),
            ('leave', _('On Leave')),
            ('inactive', _('Inactive'))
        ],
        default='active'
    )
    
    class Meta:
        db_table = 'teachers'
        verbose_name = _('Teacher')
        verbose_name_plural = _('Teachers')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.employee_id}"


class Student(models.Model):
    """Extended profile for students"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    student_id = models.CharField(max_length=50, unique=True)
    current_class = models.ForeignKey('academics.Class', on_delete=models.CASCADE)
    section = models.CharField(max_length=10, null=True, blank=True)
    subject_combination = models.ForeignKey(
        'academics.SubjectCombination', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    enrollment_date = models.DateField()
    date_of_birth = models.DateField()
    gender = models.CharField(
        max_length=10,
        choices=[
            ('male', _('Male')),
            ('female', _('Female')),
            ('other', _('Other'))
        ]
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', _('Active')),
            ('inactive', _('Inactive')),
            ('graduated', _('Graduated')),
            ('transferred', _('Transferred'))
        ],
        default='active'
    )
    special_needs = models.TextField(blank=True)
    
    class Meta:
        db_table = 'students'
        verbose_name = _('Student')
        verbose_name_plural = _('Students')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.student_id}"


class Parent(models.Model):
    """Extended profile for parents/guardians"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    children = models.ManyToManyField(Student, related_name='parents')
    relationship = models.CharField(
        max_length=20,
        choices=[
            ('father', _('Father')),
            ('mother', _('Mother')),
            ('guardian', _('Guardian')),
            ('other', _('Other'))
        ]
    )
    occupation = models.CharField(max_length=100, blank=True)
    emergency_contact = models.CharField(max_length=20, blank=True)
    
    class Meta:
        db_table = 'parents'
        verbose_name = _('Parent/Guardian')
        verbose_name_plural = _('Parents/Guardians')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.relationship}"
