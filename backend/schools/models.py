from django.db import models
from django.utils.translation import gettext_lazy as _


class School(models.Model):
    """Model representing a school in the system"""
    
    CURRICULUM_CHOICES = [
        ('cbc', _('CBC (Rwanda)')),
        ('cambridge_igcse', _('Cambridge (IGCSE)')),
        ('cambridge_a_level', _('Cambridge (A Level)')),
        ('montessori', _('Montessori')),
        ('other', _('Other - Specify')),
    ]
    
    GRADING_SCALE_CHOICES = [
        ('percentage', _('Percentage')),
        ('letter_grades', _('Letter Grades')),
        ('competency_based', _('Competency-Based')),
    ]
    
    school_id = models.CharField(max_length=20, unique=True, primary_key=True)
    school_name = models.CharField(max_length=200)
    
    # Address fields
    province = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    cell = models.CharField(max_length=100)
    village = models.CharField(max_length=100)
    street_address = models.CharField(max_length=200)
    
    # School configuration
    curriculum_type = models.CharField(max_length=20, choices=CURRICULUM_CHOICES)
    other_curriculum_details = models.TextField(blank=True)
    contact_phone = models.CharField(max_length=20)
    contact_email = models.EmailField()
    school_logo = models.ImageField(upload_to='school_logos/', null=True, blank=True)
    
    # Academic configuration
    academic_year_start = models.DateField()
    academic_year_end = models.DateField()
    number_of_terms = models.IntegerField(choices=[(2, '2 Terms'), (3, '3 Terms')])
    current_term = models.IntegerField(choices=[(1, 'Term 1'), (2, 'Term 2'), (3, 'Term 3')])
    
    # Grading system
    grading_scale_type = models.CharField(max_length=20, choices=GRADING_SCALE_CHOICES)
    grading_scale_details = models.JSONField(default=dict)
    
    # Communication settings
    default_notification_language = models.CharField(
        max_length=5,
        choices=[('en', 'English'), ('fr', 'French'), ('rw', 'Kinyarwanda')],
        default='en'
    )
    whatsapp_enabled = models.BooleanField(default=False)
    sms_enabled = models.BooleanField(default=True)
    
    # Optional fields
    school_website = models.URLField(blank=True)
    vision_mission = models.TextField(blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'schools'
        verbose_name = _('School')
        verbose_name_plural = _('Schools')
    
    def __str__(self):
        return f"{self.school_name} ({self.school_id})"


class SchoolHoliday(models.Model):
    """Model for school-specific holidays"""
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='holidays')
    name = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'school_holidays'
        unique_together = ['school', 'date']
        verbose_name = _('School Holiday')
        verbose_name_plural = _('School Holidays')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.name} ({self.date})"
