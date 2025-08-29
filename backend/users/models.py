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
    last_activity = models.DateTimeField(null=True, blank=True)
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Address information
    province = models.CharField(max_length=100, blank=True)
    district = models.CharField(max_length=100, blank=True)
    sector = models.CharField(max_length=100, blank=True)
    cell = models.CharField(max_length=100, blank=True)
    village = models.CharField(max_length=100, blank=True)
    
    # Emergency contact
    emergency_contact_name = models.CharField(max_length=200, blank=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True)
    emergency_contact_relationship = models.CharField(max_length=50, blank=True)
    
    # Notification preferences
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=True)
    whatsapp_notifications = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'users'
        verbose_name = _('User')
        verbose_name_plural = _('Users')
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class Teacher(models.Model):
    """Extended profile for teachers"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    employee_id = models.CharField(max_length=50, unique=True)
    subjects_taught = models.ManyToManyField('academics.Subject', related_name='teachers', blank=True)
    classes_assigned = models.ManyToManyField('academics.Class', related_name='teachers', blank=True)
    employment_date = models.DateField()
    qualification = models.CharField(max_length=200, blank=True)
    specialization = models.CharField(max_length=200, blank=True)
    years_of_experience = models.IntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', _('Active')),
            ('leave', _('On Leave')),
            ('inactive', _('Inactive'))
        ],
        default='active'
    )
    
    # Additional teacher information
    national_id = models.CharField(max_length=20, unique=True, blank=True)
    teaching_license_number = models.CharField(max_length=50, blank=True)
    salary_scale = models.CharField(max_length=20, blank=True)
    bank_account_number = models.CharField(max_length=50, blank=True)
    bank_name = models.CharField(max_length=100, blank=True)
    
    # Professional development
    certifications = models.JSONField(default=list)
    training_records = models.JSONField(default=list)
    
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
    current_class = models.ForeignKey('academics.Class', on_delete=models.CASCADE, null=True, blank=True)
    current_section = models.ForeignKey('academics.ClassSection', on_delete=models.CASCADE, null=True, blank=True)
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
            ('transferred', _('Transferred')),
            ('expelled', _('Expelled'))
        ],
        default='active'
    )
    
    # Student-specific information
    national_id = models.CharField(max_length=20, unique=True, blank=True)
    birth_certificate_number = models.CharField(max_length=50, blank=True)
    previous_school = models.CharField(max_length=200, blank=True)
    admission_date = models.DateField(null=True, blank=True)
    graduation_date = models.DateField(null=True, blank=True)
    
    # Health and special needs
    special_needs = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    medical_conditions = models.TextField(blank=True)
    medication_required = models.TextField(blank=True)
    
    # Academic information
    scholarship_info = models.JSONField(default=dict)
    fee_status = models.CharField(
        max_length=20,
        choices=[
            ('paid', _('Paid')),
            ('partial', _('Partially Paid')),
            ('pending', _('Pending')),
            ('waived', _('Waived'))
        ],
        default='pending'
    )
    
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
    workplace = models.CharField(max_length=200, blank=True)
    work_phone = models.CharField(max_length=20, blank=True)
    
    # Additional parent information
    national_id = models.CharField(max_length=20, unique=True, blank=True)
    marital_status = models.CharField(
        max_length=20,
        choices=[
            ('single', _('Single')),
            ('married', _('Married')),
            ('divorced', _('Divorced')),
            ('widowed', _('Widowed')),
            ('other', _('Other'))
        ],
        blank=True
    )
    
    # Financial information
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    can_pay_fees = models.BooleanField(default=True)
    payment_method_preference = models.CharField(
        max_length=20,
        choices=[
            ('cash', _('Cash')),
            ('bank_transfer', _('Bank Transfer')),
            ('mobile_money', _('Mobile Money')),
            ('check', _('Check'))
        ],
        default='mobile_money'
    )
    
    class Meta:
        db_table = 'parents'
        verbose_name = _('Parent/Guardian')
        verbose_name_plural = _('Parents/Guardians')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.relationship}"


class SchoolAdmin(models.Model):
    """Extended profile for school administrators"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    employee_id = models.CharField(max_length=50, unique=True)
    position = models.CharField(max_length=100)  # e.g., "Head Teacher", "Deputy Head", "Academic Director"
    employment_date = models.DateField()
    responsibilities = models.JSONField(default=list)
    can_manage_teachers = models.BooleanField(default=True)
    can_manage_students = models.BooleanField(default=True)
    can_manage_finances = models.BooleanField(default=False)
    can_generate_reports = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'school_admins'
        verbose_name = _('School Administrator')
        verbose_name_plural = _('School Administrators')
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.position}"


class UserSession(models.Model):
    """Model for tracking user sessions"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    session_id = models.CharField(max_length=100, unique=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'user_sessions'
        verbose_name = _('User Session')
        verbose_name_plural = _('User Sessions')
        ordering = ['-last_activity']
    
    def __str__(self):
        return f"{self.user.username} - {self.ip_address}"


class UserPreference(models.Model):
    """Model for user preferences and settings"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    theme = models.CharField(
        max_length=20,
        choices=[
            ('light', _('Light')),
            ('dark', _('Dark')),
            ('auto', _('Auto'))
        ],
        default='light'
    )
    dashboard_layout = models.JSONField(default=dict)
    notification_settings = models.JSONField(default=dict)
    privacy_settings = models.JSONField(default=dict)
    accessibility_settings = models.JSONField(default=dict)
    
    class Meta:
        db_table = 'user_preferences'
        verbose_name = _('User Preference')
        verbose_name_plural = _('User Preferences')
    
    def __str__(self):
        return f"{self.user.username} preferences"
