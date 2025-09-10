from django.db import models
from django.utils.translation import gettext_lazy as _


class AcademicYear(models.Model):
    """Model for academic years"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='academic_years')
    year_name = models.CharField(max_length=20)  # e.g., "2024-2025"
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)
    terms = models.JSONField(default=list)  # [{"name": "Term 1", "start": "2024-01-15", "end": "2024-04-15"}]
    
    class Meta:
        db_table = 'academic_years'
        unique_together = ['school', 'year_name']
        verbose_name = _('Academic Year')
        verbose_name_plural = _('Academic Years')
        ordering = ['-start_date']
    
    def __str__(self):
        return f"{self.school.school_name} - {self.year_name}"


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
    class_teacher = models.ForeignKey('users.Teacher', on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_classes')
    
    class Meta:
        db_table = 'classes'
        unique_together = ['school', 'class_id']
        verbose_name = _('Class')
        verbose_name_plural = _('Classes')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.class_name}"


class ClassSection(models.Model):
    """Model for class sections (e.g., P1A, P1B)"""
    school_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='sections')
    section_name = models.CharField(max_length=5)  # e.g., "A", "B", "C"
    room_number = models.CharField(max_length=20, blank=True)
    capacity = models.IntegerField(default=40)
    class_teacher = models.ForeignKey('users.Teacher', on_delete=models.SET_NULL, null=True, blank=True, related_name='sections_managed')
    
    class Meta:
        db_table = 'class_sections'
        unique_together = ['school_class', 'section_name']
        verbose_name = _('Class Section')
        verbose_name_plural = _('Class Sections')
    
    def __str__(self):
        return f"{self.school_class.class_name}{self.section_name}"


class Subject(models.Model):
    """Model representing academic subjects"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='subjects')
    subject_code = models.CharField(max_length=10)
    subject_name = models.CharField(max_length=100)
    subject_name_fr = models.CharField(max_length=100, blank=True)
    subject_name_rw = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    is_core = models.BooleanField(default=False)  # Core subjects for all students
    applicable_levels = models.JSONField(default=list)  # ["primary", "secondary_o", "secondary_a"]
    credit_hours = models.IntegerField(default=1)
    
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


class TeacherSubjectAssignment(models.Model):
    """Model for assigning teachers to subjects and classes"""
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='subject_assignments')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='teacher_assignments')
    school_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='teacher_assignments')
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE, null=True, blank=True, related_name='teacher_assignments')
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='teacher_assignments')
    periods_per_week = models.IntegerField(default=1)
    
    class Meta:
        db_table = 'teacher_subject_assignments'
        unique_together = ['teacher', 'subject', 'school_class', 'section', 'academic_year']
        verbose_name = _('Teacher Subject Assignment')
        verbose_name_plural = _('Teacher Subject Assignments')
    
    def __str__(self):
        section_str = f" ({self.section.section_name})" if self.section else ""
        return f"{self.teacher.user.get_full_name()} - {self.subject.subject_name} - {self.school_class.class_name}{section_str}"


class Assignment(models.Model):
    """Model for assignments and quizzes"""
    ASSIGNMENT_TYPES = [
        ('assignment', _('Assignment')),
        ('quiz', _('Quiz')),
        ('test', _('Test')),
        ('exam', _('Exam')),
        ('project', _('Project')),
        ('presentation', _('Presentation')),
    ]
    
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='assignments')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    class_assigned = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='assignments')
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE, null=True, blank=True, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPES)
    max_score = models.FloatField()
    due_date = models.DateTimeField()
    submission_deadline = models.DateTimeField()
    instructions = models.TextField(blank=True)
    rubric = models.JSONField(default=dict)  # Grading rubric
    allow_late_submission = models.BooleanField(default=False)
    late_penalty_percentage = models.FloatField(default=0.0)
    ai_grading_enabled = models.BooleanField(default=True)
    resources = models.ManyToManyField('academics.LearningResource', blank=True, related_name='assignments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'assignments'
        verbose_name = _('Assignment')
        verbose_name_plural = _('Assignments')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.subject.subject_name} - {self.title}"


class Grade(models.Model):
    """Model for student grades"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='grades')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='grades')
    score = models.FloatField()
    percentage = models.FloatField()
    letter_grade = models.CharField(max_length=5, blank=True)
    feedback = models.TextField(blank=True)
    ai_feedback = models.TextField(blank=True)
    voice_feedback_url = models.URLField(blank=True)
    graded_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='graded_assignments')
    graded_at = models.DateTimeField(auto_now_add=True)
    is_ai_assisted = models.BooleanField(default=False)
    submission_date = models.DateTimeField()
    is_late_submission = models.BooleanField(default=False)
    late_penalty_applied = models.FloatField(default=0.0)
    
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
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE, null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField()
    period = models.IntegerField(null=True, blank=True)  # Period number
    status = models.CharField(max_length=20, choices=ATTENDANCE_STATUS)
    notes = models.TextField(blank=True)
    marked_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='marked_attendance')
    marked_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'attendance'
        unique_together = ['student', 'date', 'period']
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
    incident_date = models.DateField()
    action_taken = models.TextField(blank=True)
    follow_up_required = models.BooleanField(default=False)
    follow_up_date = models.DateField(null=True, blank=True)
    parent_notified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'behavior_notes'
        verbose_name = _('Behavior Note')
        verbose_name_plural = _('Behavior Notes')
        ordering = ['-incident_date']
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.behavior_type} - {self.incident_date}"


class TimeTable(models.Model):
    """Model for class timetables"""
    DAYS_OF_WEEK = [
        ('monday', _('Monday')),
        ('tuesday', _('Tuesday')),
        ('wednesday', _('Wednesday')),
        ('thursday', _('Thursday')),
        ('friday', _('Friday')),
        ('saturday', _('Saturday')),
    ]
    
    school_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='timetables')
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE, null=True, blank=True, related_name='timetables')
    day_of_week = models.CharField(max_length=20, choices=DAYS_OF_WEEK)
    period_number = models.IntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='timetable_slots')
    teacher = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='timetable_slots')
    room = models.CharField(max_length=50, blank=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='timetables')
    
    class Meta:
        db_table = 'timetables'
        unique_together = ['school_class', 'section', 'day_of_week', 'period_number', 'academic_year']
        verbose_name = _('Time Table')
        verbose_name_plural = _('Time Tables')
        ordering = ['day_of_week', 'period_number']
    
    def __str__(self):
        section_str = f" ({self.section.section_name})" if self.section else ""
        return f"{self.school_class.class_name}{section_str} - {self.day_of_week} P{self.period_number} - {self.subject.subject_name}"


class StudentEnrollment(models.Model):
    """Model for student enrollments in specific classes and sections"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='enrollments')
    school_class = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='student_enrollments')
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE, related_name='student_enrollments')
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='student_enrollments')
    enrollment_date = models.DateField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'student_enrollments'
        unique_together = ['student', 'academic_year']
        verbose_name = _('Student Enrollment')
        verbose_name_plural = _('Student Enrollments')
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.school_class.class_name}{self.section.section_name} ({self.academic_year.year_name})"


class LearningResource(models.Model):
    """Model for learning resources like files, videos, links"""
    RESOURCE_TYPES = [
        ('file', _('File')),
        ('video', _('Video')),
        ('link', _('Link')),
        ('document', _('Document')),
        ('image', _('Image')),
        ('audio', _('Audio')),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='learning_resources/', blank=True, null=True)
    url = models.URLField(blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='learning_resources')
    uploaded_by = models.ForeignKey('users.Teacher', on_delete=models.CASCADE, related_name='uploaded_resources')
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'learning_resources'
        verbose_name = _('Learning Resource')
        verbose_name_plural = _('Learning Resources')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.subject.subject_name} - {self.title}"


class AssignmentSubmission(models.Model):
    """Model for tracking student assignment submissions"""
    SUBMISSION_STATUS = [
        ('draft', _('Draft')),
        ('submitted', _('Submitted')),
        ('late', _('Late Submission')),
        ('resubmitted', _('Resubmitted')),
    ]
    
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='submissions')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    submission_text = models.TextField(blank=True)
    submission_file = models.FileField(upload_to='assignment_submissions/', blank=True, null=True)
    submission_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=SUBMISSION_STATUS, default='draft')
    submitted_at = models.DateTimeField(null=True, blank=True)
    is_late = models.BooleanField(default=False)
    late_reason = models.TextField(blank=True)
    submission_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'assignment_submissions'
        unique_together = ['student', 'assignment']
        verbose_name = _('Assignment Submission')
        verbose_name_plural = _('Assignment Submissions')
        ordering = ['-submitted_at']
    
    def save(self, *args, **kwargs):
        if self.status == 'submitted' and not self.submitted_at:
            from django.utils import timezone
            self.submitted_at = timezone.now()
            self.is_late = self.submitted_at > self.assignment.submission_deadline
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.assignment.title}"
