from django.db import models
from django.utils.translation import gettext_lazy as _


class Class(models.Model):
    """Model representing academic classes/grades"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='classes')
    class_id = models.CharField(max_length=10)  # e.g., "P1", "S3", "S4"
    class_name = models.CharField(max_length=50)  # e.g., "Primary 1", "Senior 3"
    level = models.CharField(
        max_length=20,
        choices=[
            ('primary', _('Primary')),
            ('secondary_o', _('Secondary O-Level')),
            ('secondary_a', _('Secondary A-Level'))
        ]
    )
    max_students_per_section = models.IntegerField(default=40)
    
    class Meta:
        db_table = 'classes'
        unique_together = ['school', 'class_id']
        verbose_name = _('Class')
        verbose_name_plural = _('Classes')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.class_name}"


class Subject(models.Model):
    """Model representing academic subjects"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='subjects')
    subject_code = models.CharField(max_length=10)
    subject_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_core = models.BooleanField(default=False)  # Core subjects for all students
    
    class Meta:
        db_table = 'subjects'
        unique_together = ['school', 'subject_code']
        verbose_name = _('Subject')
        verbose_name_plural = _('Subjects')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.subject_name}"


class SubjectCombination(models.Model):
    """Model for A-level subject combinations"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='combinations')
    combination_id = models.CharField(max_length=10)  # e.g., "MPG", "PCB"
    combination_name = models.CharField(max_length=100)
    core_subjects = models.ManyToManyField(Subject, related_name='combinations')
    applicable_classes = models.ManyToManyField(Class, related_name='subject_combinations')
    
    class Meta:
        db_table = 'subject_combinations'
        unique_together = ['school', 'combination_id']
        verbose_name = _('Subject Combination')
        verbose_name_plural = _('Subject Combinations')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.combination_name}"


class Assignment(models.Model):
    """Model for assignments and quizzes"""
    ASSIGNMENT_TYPES = [
        ('assignment', _('Assignment')),
        ('quiz', _('Quiz')),
        ('test', _('Test')),
        ('exam', _('Exam')),
    ]
    
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='assignments')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    class_assigned = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPES)
    max_score = models.FloatField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'assignments'
        verbose_name = _('Assignment')
        verbose_name_plural = _('Assignments')
    
    def __str__(self):
        return f"{self.subject.subject_name} - {self.title}"


class Grade(models.Model):
    """Model for student grades"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='grades')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='grades')
    score = models.FloatField()
    feedback = models.TextField(blank=True)
    ai_feedback = models.TextField(blank=True)
    voice_feedback_url = models.URLField(blank=True)
    graded_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='graded_assignments')
    graded_at = models.DateTimeField(auto_now_add=True)
    is_ai_assisted = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'grades'
        unique_together = ['student', 'assignment']
        verbose_name = _('Grade')
        verbose_name_plural = _('Grades')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.assignment.title} - {self.score}"


class Attendance(models.Model):
    """Model for student attendance"""
    ATTENDANCE_STATUS = [
        ('present', _('Present')),
        ('absent', _('Absent')),
        ('late', _('Late')),
        ('excused', _('Excused')),
    ]
    
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='attendance')
    class_attended = models.ForeignKey(Class, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=ATTENDANCE_STATUS)
    notes = models.TextField(blank=True)
    marked_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='marked_attendance')
    marked_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'attendance'
        unique_together = ['student', 'date']
        verbose_name = _('Attendance')
        verbose_name_plural = _('Attendance Records')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.date} - {self.status}"


class BehaviorNote(models.Model):
    """Model for student behavior notes"""
    BEHAVIOR_TYPES = [
        ('positive', _('Positive')),
        ('improvement', _('Needs Improvement')),
        ('disciplinary', _('Disciplinary')),
    ]
    
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='behavior_notes')
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='behavior_notes')
    behavior_type = models.CharField(max_length=20, choices=BEHAVIOR_TYPES)
    note = models.TextField()
    voice_note_url = models.URLField(blank=True)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'behavior_notes'
        verbose_name = _('Behavior Note')
        verbose_name_plural = _('Behavior Notes')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.behavior_type} - {self.date}"
