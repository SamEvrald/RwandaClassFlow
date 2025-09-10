from rest_framework import serializers
from .models import (
    Class, Subject, SubjectCombination, Assignment, Grade, 
    Attendance, BehaviorNote, LearningResource, StudentEnrollment,
    AssignmentSubmission
)


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class SubjectCombinationSerializer(serializers.ModelSerializer):
    core_subjects = SubjectSerializer(many=True, read_only=True)
    
    class Meta:
        model = SubjectCombination
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.subject_name', read_only=True)
    class_name = serializers.CharField(source='class_assigned.class_name', read_only=True)
    
    class Meta:
        model = Assignment
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)
    
    class Meta:
        model = Grade
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    
    class Meta:
        model = Attendance
        fields = '__all__'


class BehaviorNoteSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.user.get_full_name', read_only=True)
    
    class Meta:
        model = BehaviorNote
        fields = '__all__'


class LearningResourceSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.subject_name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.user.get_full_name', read_only=True)
    
    class Meta:
        model = LearningResource
        fields = '__all__'


class StudentAssignmentSerializer(serializers.ModelSerializer):
    """Serializer for student view of assignments"""
    subject_name = serializers.CharField(source='subject.subject_name', read_only=True)
    class_name = serializers.CharField(source='class_assigned.class_name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.user.get_full_name', read_only=True)
    is_submitted = serializers.SerializerMethodField()
    student_grade = serializers.SerializerMethodField()
    days_remaining = serializers.SerializerMethodField()
    
    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'assignment_type', 'max_score',
            'due_date', 'submission_deadline', 'instructions', 'subject_name',
            'class_name', 'teacher_name', 'is_submitted', 'student_grade',
            'days_remaining', 'created_at'
        ]
    
    def get_is_submitted(self, obj):
        request = self.context.get('request')
        if request and hasattr(request.user, 'student'):
            return AssignmentSubmission.objects.filter(
                assignment=obj, student=request.user.student, status__in=['submitted', 'late', 'resubmitted']
            ).exists()
        return False
    
    def get_student_grade(self, obj):
        request = self.context.get('request')
        if request and hasattr(request.user, 'student'):
            try:
                grade = Grade.objects.get(assignment=obj, student=request.user.student)
                return {
                    'score': grade.score,
                    'percentage': grade.percentage,
                    'letter_grade': grade.letter_grade,
                    'feedback': grade.feedback
                }
            except Grade.DoesNotExist:
                return None
        return None
    
    def get_days_remaining(self, obj):
        from django.utils import timezone
        if obj.due_date:
            days = (obj.due_date.date() - timezone.now().date()).days
            return max(0, days)
        return None


class StudentGradeSerializer(serializers.ModelSerializer):
    """Serializer for student view of grades"""
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)
    subject_name = serializers.CharField(source='assignment.subject.subject_name', read_only=True)
    assignment_type = serializers.CharField(source='assignment.assignment_type', read_only=True)
    max_score = serializers.FloatField(source='assignment.max_score', read_only=True)
    
    class Meta:
        model = Grade
        fields = [
            'id', 'assignment_title', 'subject_name', 'assignment_type',
            'score', 'percentage', 'letter_grade', 'feedback', 'ai_feedback',
            'max_score', 'graded_at'
        ]


class StudentEnrollmentSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='school_class.class_name', read_only=True)
    section_name = serializers.CharField(source='section.section_name', read_only=True)
    academic_year_name = serializers.CharField(source='academic_year.year_name', read_only=True)
    
    class Meta:
        model = StudentEnrollment
        fields = '__all__'


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)
    can_resubmit = serializers.SerializerMethodField()
    
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'
        read_only_fields = ['student', 'is_late', 'submitted_at']
    
    def get_can_resubmit(self, obj):
        from django.utils import timezone
        return timezone.now() <= obj.assignment.submission_deadline


class StudentSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for student's own submissions"""
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)
    assignment_type = serializers.CharField(source='assignment.assignment_type', read_only=True)
    subject_name = serializers.CharField(source='assignment.subject.subject_name', read_only=True)
    max_score = serializers.FloatField(source='assignment.max_score', read_only=True)
    due_date = serializers.DateTimeField(source='assignment.due_date', read_only=True)
    submission_deadline = serializers.DateTimeField(source='assignment.submission_deadline', read_only=True)
    can_edit = serializers.SerializerMethodField()
    grade_info = serializers.SerializerMethodField()
    
    class Meta:
        model = AssignmentSubmission
        fields = [
            'id', 'assignment_title', 'assignment_type', 'subject_name',
            'submission_text', 'submission_file', 'submission_url', 'status',
            'submitted_at', 'is_late', 'late_reason', 'submission_notes',
            'max_score', 'due_date', 'submission_deadline', 'can_edit',
            'grade_info', 'created_at', 'updated_at'
        ]
        read_only_fields = ['is_late', 'submitted_at']
    
    def get_can_edit(self, obj):
        from django.utils import timezone
        return (obj.status in ['draft', 'submitted'] and 
                timezone.now() <= obj.assignment.submission_deadline)
    
    def get_grade_info(self, obj):
        try:
            grade = Grade.objects.get(assignment=obj.assignment, student=obj.student)
            return {
                'score': grade.score,
                'percentage': grade.percentage,
                'letter_grade': grade.letter_grade,
                'feedback': grade.feedback,
                'graded_at': grade.graded_at
            }
        except Grade.DoesNotExist:
            return None
