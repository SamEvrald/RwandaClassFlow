from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q, Avg, Count
from django.utils import timezone
from .models import (
    Class, Subject, Assignment, Grade, Attendance, BehaviorNote, 
    LearningResource, StudentEnrollment, AssignmentSubmission
)
from .serializers import (
    ClassSerializer, SubjectSerializer, AssignmentSerializer,
    GradeSerializer, AttendanceSerializer, BehaviorNoteSerializer,
    LearningResourceSerializer, StudentAssignmentSerializer,
    StudentGradeSerializer, StudentEnrollmentSerializer,
    AssignmentSubmissionSerializer, StudentSubmissionSerializer
)


class ClassListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Class.objects.filter(school=self.request.user.school)


class SubjectListView(generics.ListAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Subject.objects.filter(school=self.request.user.school)


class AssignmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Assignment.objects.filter(teacher__user=self.request.user)
        return Assignment.objects.filter(subject__school=self.request.user.school)
    
    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.teacher)


class AssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Assignment.objects.filter(teacher__user=self.request.user)
        return Assignment.objects.filter(subject__school=self.request.user.school)


class GradeListCreateView(generics.ListCreateAPIView):
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return Grade.objects.filter(student__user=self.request.user)
        elif self.request.user.role == 'teacher':
            return Grade.objects.filter(graded_by__user=self.request.user)
        return Grade.objects.filter(student__user__school=self.request.user.school)


class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return Attendance.objects.filter(student__user=self.request.user)
        return Attendance.objects.filter(student__user__school=self.request.user.school)


class BehaviorNoteListCreateView(generics.ListCreateAPIView):
    serializer_class = BehaviorNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            return BehaviorNote.objects.filter(student__user=self.request.user)
        elif self.request.user.role == 'teacher':
            return BehaviorNote.objects.filter(teacher__user=self.request.user)
        return BehaviorNote.objects.filter(student__user__school=self.request.user.school)


class LearningResourceListCreateView(generics.ListCreateAPIView):
    serializer_class = LearningResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            # Students can see public resources and resources from their subjects
            student = self.request.user.student
            student_subjects = Subject.objects.filter(
                assignments__class_assigned=student.current_class
            ).distinct()
            return LearningResource.objects.filter(
                Q(is_public=True) | Q(subject__in=student_subjects)
            ).filter(subject__school=self.request.user.school)
        elif self.request.user.role == 'teacher':
            return LearningResource.objects.filter(uploaded_by__user=self.request.user)
        return LearningResource.objects.filter(subject__school=self.request.user.school)
    
    def perform_create(self, serializer):
        if self.request.user.role == 'teacher':
            serializer.save(uploaded_by=self.request.user.teacher)


class LearningResourceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LearningResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'student':
            student = self.request.user.student
            student_subjects = Subject.objects.filter(
                assignments__class_assigned=student.current_class
            ).distinct()
            return LearningResource.objects.filter(
                Q(is_public=True) | Q(subject__in=student_subjects)
            ).filter(subject__school=self.request.user.school)
        elif self.request.user.role == 'teacher':
            return LearningResource.objects.filter(uploaded_by__user=self.request.user)
        return LearningResource.objects.filter(subject__school=self.request.user.school)


# Student-specific views
class StudentAssignmentsView(generics.ListAPIView):
    serializer_class = StudentAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role != 'student':
            return Assignment.objects.none()
        
        student = self.request.user.student
        status_filter = self.request.query_params.get('status', 'all')
        
        queryset = Assignment.objects.filter(
            class_assigned=student.current_class
        ).select_related('subject', 'teacher__user', 'class_assigned')
        
        if status_filter == 'pending':
            queryset = queryset.filter(due_date__gte=timezone.now())
        elif status_filter == 'overdue':
            queryset = queryset.filter(due_date__lt=timezone.now())
        elif status_filter == 'graded':
            queryset = queryset.filter(grades__student=student)
        
        return queryset.order_by('-created_at')


class StudentGradesView(generics.ListAPIView):
    serializer_class = StudentGradeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role != 'student':
            return Grade.objects.none()
        
        student = self.request.user.student
        subject_filter = self.request.query_params.get('subject')
        
        queryset = Grade.objects.filter(student=student).select_related(
            'assignment__subject', 'assignment'
        )
        
        if subject_filter:
            queryset = queryset.filter(assignment__subject__id=subject_filter)
        
        return queryset.order_by('-graded_at')


class StudentResourcesView(generics.ListAPIView):
    serializer_class = LearningResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role != 'student':
            return LearningResource.objects.none()
        
        student = self.request.user.student
        subject_filter = self.request.query_params.get('subject')
        resource_type = self.request.query_params.get('type')
        
        # Get subjects for the student's class
        student_subjects = Subject.objects.filter(
            assignments__class_assigned=student.current_class
        ).distinct()
        
        queryset = LearningResource.objects.filter(
            Q(is_public=True) | Q(subject__in=student_subjects)
        ).select_related('subject', 'uploaded_by__user')
        
        if subject_filter:
            queryset = queryset.filter(subject__id=subject_filter)
        
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        
        return queryset.order_by('-created_at')


# API endpoints for student dashboard
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def student_dashboard(request):
    """Get student dashboard data"""
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    student = request.user.student
    
    # Get recent assignments
    recent_assignments = Assignment.objects.filter(
        class_assigned=student.current_class
    ).order_by('-created_at')[:5]
    
    # Get pending assignments
    pending_assignments = Assignment.objects.filter(
        class_assigned=student.current_class,
        due_date__gte=timezone.now()
    ).count()
    
    # Get recent grades
    recent_grades = Grade.objects.filter(student=student).order_by('-graded_at')[:5]
    
    # Calculate grade statistics
    grade_stats = Grade.objects.filter(student=student).aggregate(
        average_score=Avg('percentage'),
        total_assignments=Count('id')
    )
    
    # Get attendance statistics
    attendance_stats = Attendance.objects.filter(student=student).aggregate(
        total_days=Count('id'),
        present_days=Count('id', filter=Q(status='present')),
        late_days=Count('id', filter=Q(status='late')),
        absent_days=Count('id', filter=Q(status='absent'))
    )
    
    attendance_percentage = 0
    if attendance_stats['total_days'] > 0:
        attendance_percentage = (attendance_stats['present_days'] / attendance_stats['total_days']) * 100
    
    data = {
        'recent_assignments': StudentAssignmentSerializer(
            recent_assignments, many=True, context={'request': request}
        ).data,
        'pending_assignments_count': pending_assignments,
        'recent_grades': StudentGradeSerializer(recent_grades, many=True).data,
        'grade_statistics': {
            'average_score': round(grade_stats['average_score'] or 0, 2),
            'total_assignments': grade_stats['total_assignments']
        },
        'attendance_statistics': {
            'percentage': round(attendance_percentage, 2),
            'total_days': attendance_stats['total_days'],
            'present_days': attendance_stats['present_days'],
            'late_days': attendance_stats['late_days'],
            'absent_days': attendance_stats['absent_days']
        }
    }
    
    return Response(data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def student_grade_summary(request):
    """Get detailed grade summary for student"""
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    student = request.user.student
    
    # Get grades by subject
    subjects_with_grades = []
    student_subjects = Subject.objects.filter(
        assignments__class_assigned=student.current_class
    ).distinct()
    
    for subject in student_subjects:
        subject_grades = Grade.objects.filter(
            student=student,
            assignment__subject=subject
        )
        
        if subject_grades.exists():
            subject_stats = subject_grades.aggregate(
                average_score=Avg('percentage'),
                total_assignments=Count('id'),
                highest_score=subject_grades.order_by('-percentage').first().percentage,
                lowest_score=subject_grades.order_by('percentage').first().percentage
            )
            
            subjects_with_grades.append({
                'subject': SubjectSerializer(subject).data,
                'statistics': subject_stats,
                'recent_grades': StudentGradeSerializer(
                    subject_grades.order_by('-graded_at')[:3], many=True
                ).data
            })
    
    return Response({'subjects': subjects_with_grades})


# Assignment submission views
class StudentSubmissionsView(generics.ListCreateAPIView):
    serializer_class = StudentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role != 'student':
            return AssignmentSubmission.objects.none()
        
        return AssignmentSubmission.objects.filter(
            student=self.request.user.student
        ).select_related('assignment__subject', 'assignment').order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(student=self.request.user.student)


class StudentSubmissionDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = StudentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role != 'student':
            return AssignmentSubmission.objects.none()
        
        return AssignmentSubmission.objects.filter(student=self.request.user.student)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def submit_assignment(request, assignment_id):
    """Submit an assignment"""
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        assignment = Assignment.objects.get(id=assignment_id)
        student = request.user.student
        
        # Check if student is in the assigned class
        if assignment.class_assigned != student.current_class:
            return Response({'error': 'Assignment not assigned to your class'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        # Get or create submission
        submission, created = AssignmentSubmission.objects.get_or_create(
            student=student,
            assignment=assignment,
            defaults={
                'submission_text': request.data.get('submission_text', ''),
                'submission_notes': request.data.get('submission_notes', ''),
                'status': 'submitted'
            }
        )
        
        if not created:
            # Update existing submission
            submission.submission_text = request.data.get('submission_text', submission.submission_text)
            submission.submission_notes = request.data.get('submission_notes', submission.submission_notes)
            submission.status = 'resubmitted' if submission.status == 'submitted' else 'submitted'
            
        # Handle file upload
        if 'submission_file' in request.FILES:
            submission.submission_file = request.FILES['submission_file']
        
        if 'submission_url' in request.data:
            submission.submission_url = request.data['submission_url']
        
        submission.save()
        
        serializer = StudentSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Assignment.DoesNotExist:
        return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_draft(request, assignment_id):
    """Save assignment as draft"""
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        assignment = Assignment.objects.get(id=assignment_id)
        student = request.user.student
        
        if assignment.class_assigned != student.current_class:
            return Response({'error': 'Assignment not assigned to your class'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        submission, created = AssignmentSubmission.objects.get_or_create(
            student=student,
            assignment=assignment,
            defaults={
                'submission_text': request.data.get('submission_text', ''),
                'submission_notes': request.data.get('submission_notes', ''),
                'status': 'draft'
            }
        )
        
        if not created and submission.status == 'draft':
            submission.submission_text = request.data.get('submission_text', submission.submission_text)
            submission.submission_notes = request.data.get('submission_notes', submission.submission_notes)
            
            if 'submission_file' in request.FILES:
                submission.submission_file = request.FILES['submission_file']
            
            if 'submission_url' in request.data:
                submission.submission_url = request.data['submission_url']
            
            submission.save()
        
        serializer = StudentSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Assignment.DoesNotExist:
        return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_submission(request, assignment_id):
    """Get student's submission for a specific assignment"""
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        assignment = Assignment.objects.get(id=assignment_id)
        student = request.user.student
        
        if assignment.class_assigned != student.current_class:
            return Response({'error': 'Assignment not assigned to your class'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        submission = AssignmentSubmission.objects.get(
            student=student,
            assignment=assignment
        )
        
        serializer = StudentSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Assignment.DoesNotExist:
        return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)
    except AssignmentSubmission.DoesNotExist:
        return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)
