from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Teacher, Student, Parent


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone_number', 'preferred_language', 'school',
            'profile_picture', 'is_first_login', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class TeacherSerializer(serializers.ModelSerializer):
    """Serializer for Teacher model"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Teacher
        fields = [
            'user', 'employee_id', 'subjects_taught', 'classes_assigned',
            'employment_date', 'status'
        ]


class StudentSerializer(serializers.ModelSerializer):
    """Serializer for Student model"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = [
            'user', 'student_id', 'current_class', 'section',
            'subject_combination', 'enrollment_date', 'date_of_birth',
            'gender', 'status', 'special_needs'
        ]


class ParentSerializer(serializers.ModelSerializer):
    """Serializer for Parent model"""
    user = UserSerializer(read_only=True)
    children = StudentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Parent
        fields = [
            'user', 'children', 'relationship', 'occupation',
            'emergency_contact'
        ]


class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Invalid login credentials.')
        else:
            raise serializers.ValidationError('Must include username and password.')
        
        return data


class PasswordChangeSerializer(serializers.Serializer):
    """Serializer for password change"""
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New passwords don't match.")
        return data
