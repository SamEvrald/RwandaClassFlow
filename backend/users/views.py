from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import update_session_auth_hash
from .models import User, Teacher, Student, Parent
from .serializers import (
    UserSerializer, TeacherSerializer, StudentSerializer, 
    ParentSerializer, LoginSerializer, PasswordChangeSerializer,
    SchoolRegistrationSerializer, UserProfileSerializer
)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """View for user profile management"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class TeacherListView(generics.ListAPIView):
    """View for listing teachers"""
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Teacher.objects.filter(user__school=self.request.user.school)


class StudentListView(generics.ListAPIView):
    """View for listing students"""
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Student.objects.filter(user__school=self.request.user.school)


class ParentListView(generics.ListAPIView):
    """View for listing parents"""
    serializer_class = ParentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Parent.objects.filter(user__school=self.request.user.school)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """User login endpoint"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        
        # Update last activity
        from django.utils import timezone
        user.last_activity = timezone.now()
        user.save(update_fields=['last_activity'])
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserProfileSerializer(user).data,
            'is_first_login': user.is_first_login
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password_view(request):
    """Password change endpoint"""
    serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        update_session_auth_hash(request, request.user)
        return Response({'message': 'Password changed successfully'})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_school_view(request):
    """School registration endpoint"""
    serializer = SchoolRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        school = serializer.save()
        
        return Response({
            'message': 'School registered successfully',
            'school_id': school.school_id,
            'school_name': school.school_name,
            'admin_username': request.data.get('admin_username')
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile_view(request):
    """Get detailed user profile with role-specific data"""
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_username_availability(request):
    """Check if username is available"""
    username = request.GET.get('username')
    if not username:
        return Response({'error': 'Username parameter required'}, status=status.HTTP_400_BAD_REQUEST)
    
    is_available = not User.objects.filter(username=username).exists()
    return Response({'available': is_available})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_email_availability(request):
    """Check if email is available"""
    email = request.GET.get('email')
    if not email:
        return Response({'error': 'Email parameter required'}, status=status.HTTP_400_BAD_REQUEST)
    
    is_available = not User.objects.filter(email=email).exists()
    return Response({'available': is_available})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_school_id_availability(request):
    """Check if school ID is available"""
    from schools.models import School
    
    school_id = request.GET.get('school_id')
    if not school_id:
        return Response({'error': 'School ID parameter required'}, status=status.HTTP_400_BAD_REQUEST)
    
    is_available = not School.objects.filter(school_id=school_id).exists()
    return Response({'available': is_available})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """User logout endpoint"""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Successfully logged out'})
    except Exception:
        return Response(
            {'error': 'Invalid token'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
