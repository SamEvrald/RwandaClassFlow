from django.db import models
from django.utils.translation import gettext_lazy as _


class PerformanceReport(models.Model):
    """Model for student performance reports"""
    REPORT_TYPES = [
        ('term', _('Term Report')),
        ('monthly', _('Monthly Report')),
        ('subject', _('Subject Report')),
        ('behavioral', _('Behavioral Report')),
    ]
    
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='reports')
    report_type = models.CharField(max_length=20, choices=REPORT_TYPES)
    report_period_start = models.DateField()
    report_period_end = models.DateField()
    overall_grade = models.CharField(max_length=5, blank=True)
    overall_percentage = models.FloatField(null=True, blank=True)
    teacher_comments = models.TextField(blank=True)
    headteacher_comments = models.TextField(blank=True)
    ai_insights = models.JSONField(default=dict)
    generated_at = models.DateTimeField(auto_now_add=True)
    generated_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='generated_reports')
    
    class Meta:
        db_table = 'performance_reports'
        verbose_name = _('Performance Report')
        verbose_name_plural = _('Performance Reports')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.report_type} - {self.report_period_start}"


class SubjectPerformance(models.Model):
    """Model for subject-specific performance within a report"""
    report = models.ForeignKey(PerformanceReport, on_delete=models.CASCADE, related_name='subject_performances')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE)
    total_assignments = models.IntegerField(default=0)
    assignments_completed = models.IntegerField(default=0)
    average_score = models.FloatField(null=True, blank=True)
    grade = models.CharField(max_length=5, blank=True)
    teacher_comments = models.TextField(blank=True)
    improvement_areas = models.JSONField(default=list)
    strengths = models.JSONField(default=list)
    
    class Meta:
        db_table = 'subject_performances'
        unique_together = ['report', 'subject']
        verbose_name = _('Subject Performance')
        verbose_name_plural = _('Subject Performances')
    
    def __str__(self):
        return f"{self.report.student.user.get_full_name()} - {self.subject.subject_name}"


class ClassAnalytics(models.Model):
    """Model for class-level analytics"""
    school_class = models.ForeignKey('academics.Class', on_delete=models.CASCADE, related_name='analytics')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE)
    period_start = models.DateField()
    period_end = models.DateField()
    total_students = models.IntegerField()
    average_performance = models.FloatField()
    top_performers = models.JSONField(default=list)  # List of student IDs
    struggling_students = models.JSONField(default=list)  # List of student IDs
    attendance_rate = models.FloatField()
    completion_rate = models.FloatField()  # Assignment completion rate
    generated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'class_analytics'
        unique_together = ['school_class', 'subject', 'period_start', 'period_end']
        verbose_name = _('Class Analytics')
        verbose_name_plural = _('Class Analytics')
    
    def __str__(self):
        return f"{self.school_class.class_name} - {self.subject.subject_name} Analytics"


class SchoolAnalytics(models.Model):
    """Model for school-level analytics"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='analytics')
    period_start = models.DateField()
    period_end = models.DateField()
    total_students = models.IntegerField()
    total_teachers = models.IntegerField()
    overall_attendance_rate = models.FloatField()
    overall_performance = models.FloatField()
    top_performing_classes = models.JSONField(default=list)
    improvement_areas = models.JSONField(default=dict)
    generated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'school_analytics'
        unique_together = ['school', 'period_start', 'period_end']
        verbose_name = _('School Analytics')
        verbose_name_plural = _('School Analytics')
    
    def __str__(self):
        return f"{self.school.school_name} Analytics - {self.period_start}"


class LearningInsight(models.Model):
    """Model for AI-generated learning insights"""
    INSIGHT_TYPES = [
        ('performance_pattern', _('Performance Pattern')),
        ('learning_difficulty', _('Learning Difficulty')),
        ('improvement_suggestion', _('Improvement Suggestion')),
        ('strength_identification', _('Strength Identification')),
    ]
    
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='learning_insights')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE, null=True, blank=True)
    insight_type = models.CharField(max_length=30, choices=INSIGHT_TYPES)
    insight_text = models.TextField()
    confidence_score = models.FloatField()  # AI confidence in the insight
    recommended_actions = models.JSONField(default=list)
    generated_at = models.DateTimeField(auto_now_add=True)
    reviewed_by_teacher = models.BooleanField(default=False)
    teacher_feedback = models.TextField(blank=True)
    
    class Meta:
        db_table = 'learning_insights'
        verbose_name = _('Learning Insight')
        verbose_name_plural = _('Learning Insights')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.insight_type}"
