from django.db import models
from django.utils.translation import gettext_lazy as _


class Message(models.Model):
    """Model for internal messaging system"""
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'messages'
        verbose_name = _('Message')
        verbose_name_plural = _('Messages')
    
    def __str__(self):
        return f"From {self.sender.username} to {self.recipient.username}: {self.subject}"


class Notification(models.Model):
    """Model for system notifications"""
    NOTIFICATION_TYPES = [
        ('grade_update', _('Grade Update')),
        ('attendance_alert', _('Attendance Alert')),
        ('behavior_note', _('Behavior Note')),
        ('assignment_due', _('Assignment Due')),
        ('announcement', _('Announcement')),
        ('parent_meeting', _('Parent Meeting')),
        ('fee_reminder', _('Fee Reminder')),
        ('event_reminder', _('Event Reminder')),
    ]
    
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    sms_sent = models.BooleanField(default=False)
    email_sent = models.BooleanField(default=False)
    whatsapp_sent = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'notifications'
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
    
    def __str__(self):
        return f"{self.notification_type} - {self.recipient.username}"


class Announcement(models.Model):
    """Model for school announcements"""
    ANNOUNCEMENT_TYPES = [
        ('general', _('General')),
        ('academic', _('Academic')),
        ('event', _('Event')),
        ('emergency', _('Emergency')),
        ('holiday', _('Holiday')),
    ]
    
    TARGET_AUDIENCES = [
        ('all', _('All Users')),
        ('teachers', _('Teachers')),
        ('students', _('Students')),
        ('parents', _('Parents')),
        ('specific_class', _('Specific Class')),
        ('specific_subject', _('Specific Subject')),
    ]
    
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=200)
    content = models.TextField()
    announcement_type = models.CharField(max_length=20, choices=ANNOUNCEMENT_TYPES)
    target_audience = models.CharField(max_length=20, choices=TARGET_AUDIENCES)
    target_classes = models.ManyToManyField('academics.Class', blank=True, related_name='announcements')
    target_subjects = models.ManyToManyField('academics.Subject', blank=True, related_name='announcements')
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='created_announcements')
    created_at = models.DateTimeField(auto_now_add=True)
    publish_date = models.DateTimeField()
    expiry_date = models.DateTimeField(null=True, blank=True)
    is_urgent = models.BooleanField(default=False)
    send_sms = models.BooleanField(default=False)
    send_email = models.BooleanField(default=False)
    send_whatsapp = models.BooleanField(default=False)
    attachment = models.FileField(upload_to='announcements/', null=True, blank=True)
    
    class Meta:
        db_table = 'announcements'
        verbose_name = _('Announcement')
        verbose_name_plural = _('Announcements')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.school.school_name} - {self.title}"


class ParentTeacherMeeting(models.Model):
    """Model for parent-teacher meetings"""
    MEETING_TYPES = [
        ('individual', _('Individual Meeting')),
        ('class', _('Class Meeting')),
        ('general', _('General Meeting')),
    ]
    
    MEETING_STATUS = [
        ('scheduled', _('Scheduled')),
        ('confirmed', _('Confirmed')),
        ('completed', _('Completed')),
        ('cancelled', _('Cancelled')),
        ('rescheduled', _('Rescheduled')),
    ]
    
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='meetings')
    meeting_type = models.CharField(max_length=20, choices=MEETING_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='meetings')
    parent = models.ForeignKey('users.Parent', on_delete=models.CASCADE, null=True, blank=True, related_name='meetings')
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, null=True, blank=True, related_name='meetings')
    target_class = models.ForeignKey('academics.Class', on_delete=models.CASCADE, null=True, blank=True, related_name='meetings')
    scheduled_date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=30)
    location = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=MEETING_STATUS, default='scheduled')
    agenda = models.TextField(blank=True)
    meeting_notes = models.TextField(blank=True)
    action_items = models.JSONField(default=list)
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='created_meetings')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'parent_teacher_meetings'
        verbose_name = _('Parent-Teacher Meeting')
        verbose_name_plural = _('Parent-Teacher Meetings')
        ordering = ['scheduled_date']
    
    def __str__(self):
        return f"{self.title} - {self.scheduled_date.strftime('%Y-%m-%d %H:%M')}"


class CommunicationLog(models.Model):
    """Model for logging all communications"""
    COMMUNICATION_TYPES = [
        ('sms', _('SMS')),
        ('email', _('Email')),
        ('whatsapp', _('WhatsApp')),
        ('voice_call', _('Voice Call')),
        ('in_app', _('In-App Message')),
    ]
    
    COMMUNICATION_STATUS = [
        ('sent', _('Sent')),
        ('delivered', _('Delivered')),
        ('read', _('Read')),
        ('failed', _('Failed')),
    ]
    
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='communication_logs')
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='received_communications')
    communication_type = models.CharField(max_length=20, choices=COMMUNICATION_TYPES)
    subject = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    status = models.CharField(max_length=20, choices=COMMUNICATION_STATUS)
    sent_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    read_at = models.DateTimeField(null=True, blank=True)
    external_message_id = models.CharField(max_length=100, blank=True)  # For SMS/WhatsApp providers
    cost = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    error_message = models.TextField(blank=True)
    
    class Meta:
        db_table = 'communication_logs'
        verbose_name = _('Communication Log')
        verbose_name_plural = _('Communication Logs')
        ordering = ['-sent_at']
    
    def __str__(self):
        return f"{self.communication_type} from {self.sender.username} to {self.recipient.username}"


class SMSTemplate(models.Model):
    """Model for SMS templates"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='sms_templates')
    name = models.CharField(max_length=100)
    template_text = models.TextField()
    variables = models.JSONField(default=list)  # List of variable names like [student_name, grade, subject]
    language = models.CharField(max_length=5, choices=[('en', 'English'), ('fr', 'French'), ('rw', 'Kinyarwanda')])
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='created_templates')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'sms_templates'
        unique_together = ['school', 'name', 'language']
        verbose_name = _('SMS Template')
        verbose_name_plural = _('SMS Templates')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.name} ({self.language})"
