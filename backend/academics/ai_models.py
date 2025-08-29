from django.db import models
from django.utils.translation import gettext_lazy as _


class AssignmentSubmission(models.Model):
    """Model for assignment submissions"""
    SUBMISSION_TYPES = [
        ('handwritten', _('Handwritten (Image)')),
        ('typed', _('Typed Text')),
        ('voice', _('Voice Recording')),
        ('file', _('File Upload')),
    ]
    
    PROCESSING_STATUS = [
        ('pending', _('Pending Processing')),
        ('processing', _('Being Processed')),
        ('completed', _('Processing Completed')),
        ('failed', _('Processing Failed')),
    ]
    
    assignment = models.ForeignKey('academics.Assignment', on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='submissions')
    submission_type = models.CharField(max_length=20, choices=SUBMISSION_TYPES)
    original_file = models.FileField(upload_to='submissions/', null=True, blank=True)
    processed_text = models.TextField(blank=True)  # OCR extracted text
    submission_text = models.TextField(blank=True)  # For typed submissions
    voice_file = models.FileField(upload_to='voice_submissions/', null=True, blank=True)
    voice_transcription = models.TextField(blank=True)
    processing_status = models.CharField(max_length=20, choices=PROCESSING_STATUS, default='pending')
    processing_log = models.JSONField(default=dict)
    submitted_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'assignment_submissions'
        unique_together = ['assignment', 'student']
        verbose_name = _('Assignment Submission')
        verbose_name_plural = _('Assignment Submissions')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.assignment.title}"


class AIGradingResult(models.Model):
    """Model for AI grading results"""
    submission = models.OneToOneField(AssignmentSubmission, on_delete=models.CASCADE, related_name='ai_grading')
    auto_score = models.FloatField()
    confidence_score = models.FloatField()  # AI confidence in the grading
    detailed_feedback = models.JSONField(default=dict)  # Structured feedback
    improvement_suggestions = models.JSONField(default=list)
    strengths_identified = models.JSONField(default=list)
    plagiarism_score = models.FloatField(default=0.0)
    plagiarism_sources = models.JSONField(default=list)
    grading_criteria_scores = models.JSONField(default=dict)  # Score per criteria
    generated_at = models.DateTimeField(auto_now_add=True)
    reviewed_by_teacher = models.BooleanField(default=False)
    teacher_override_score = models.FloatField(null=True, blank=True)
    teacher_comments = models.TextField(blank=True)
    
    class Meta:
        db_table = 'ai_grading_results'
        verbose_name = _('AI Grading Result')
        verbose_name_plural = _('AI Grading Results')
    
    def __str__(self):
        return f"AI Grade: {self.submission.student.user.get_full_name()} - {self.auto_score}"


class LearningResource(models.Model):
    """Model for educational resources and recommendations"""
    RESOURCE_TYPES = [
        ('video', _('Video')),
        ('document', _('Document')),
        ('link', _('External Link')),
        ('exercise', _('Practice Exercise')),
        ('game', _('Educational Game')),
    ]
    
    DIFFICULTY_LEVELS = [
        ('beginner', _('Beginner')),
        ('intermediate', _('Intermediate')),
        ('advanced', _('Advanced')),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS)
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE, related_name='resources')
    applicable_classes = models.ManyToManyField('academics.Class', related_name='resources')
    resource_url = models.URLField(blank=True)
    resource_file = models.FileField(upload_to='resources/', null=True, blank=True)
    tags = models.JSONField(default=list)  # Topics/keywords
    language = models.CharField(max_length=5, choices=[('en', 'English'), ('fr', 'French'), ('rw', 'Kinyarwanda')])
    created_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='created_resources')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    usage_count = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    
    class Meta:
        db_table = 'learning_resources'
        verbose_name = _('Learning Resource')
        verbose_name_plural = _('Learning Resources')
    
    def __str__(self):
        return f"{self.title} - {self.subject.subject_name}"


class ResourceRecommendation(models.Model):
    """Model for AI-generated resource recommendations"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='resource_recommendations')
    resource = models.ForeignKey(LearningResource, on_delete=models.CASCADE, related_name='recommendations')
    reason = models.TextField()  # Why this resource was recommended
    confidence_score = models.FloatField()
    recommended_at = models.DateTimeField(auto_now_add=True)
    viewed = models.BooleanField(default=False)
    viewed_at = models.DateTimeField(null=True, blank=True)
    helpful = models.BooleanField(null=True, blank=True)  # Student feedback
    
    class Meta:
        db_table = 'resource_recommendations'
        unique_together = ['student', 'resource']
        verbose_name = _('Resource Recommendation')
        verbose_name_plural = _('Resource Recommendations')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.resource.title}"


class StudyPlan(models.Model):
    """Model for AI-generated personalized study plans"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='study_plans')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE, related_name='study_plans')
    plan_name = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    objectives = models.JSONField(default=list)  # Learning objectives
    weekly_schedule = models.JSONField(default=dict)  # Day-wise activities
    milestones = models.JSONField(default=list)  # Checkpoints
    resources = models.ManyToManyField(LearningResource, related_name='study_plans')
    progress_percentage = models.FloatField(default=0.0)
    generated_by_ai = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'study_plans'
        verbose_name = _('Study Plan')
        verbose_name_plural = _('Study Plans')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.plan_name}"


class StudyPlanProgress(models.Model):
    """Model for tracking study plan progress"""
    study_plan = models.ForeignKey(StudyPlan, on_delete=models.CASCADE, related_name='progress_records')
    milestone_id = models.CharField(max_length=50)  # Reference to milestone in JSON
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    time_spent_minutes = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'study_plan_progress'
        unique_together = ['study_plan', 'milestone_id']
        verbose_name = _('Study Plan Progress')
        verbose_name_plural = _('Study Plan Progress Records')
    
    def __str__(self):
        return f"{self.study_plan.student.user.get_full_name()} - {self.milestone_id}"
