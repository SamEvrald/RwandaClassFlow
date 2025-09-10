from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import User, Teacher, Student, Parent, SchoolAdmin
from schools.models import School


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
    old_password = serializers.CharField(style={'input_type': 'password'})
    new_password = serializers.CharField(style={'input_type': 'password'})
    confirm_password = serializers.CharField(style={'input_type': 'password'})
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Password confirmation does not match.")
        
        # Validate password strength
        try:
            validate_password(attrs['new_password'])
        except ValidationError as e:
            raise serializers.ValidationError({'new_password': e.messages})
        
        return attrs
    
    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.is_first_login = False
        user.save()
        return user


class SchoolSerializer(serializers.ModelSerializer):
    """Serializer for school data"""
    
    class Meta:
        model = School
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class SchoolRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for school registration"""
    admin_first_name = serializers.CharField(write_only=True)
    admin_last_name = serializers.CharField(write_only=True)
    admin_email = serializers.EmailField(write_only=True)
    admin_phone = serializers.CharField(write_only=True)
    admin_username = serializers.CharField(write_only=True)
    admin_password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    admin_confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = School
        fields = [
            'school_id', 'school_name', 'province', 'district', 'sector', 
            'cell', 'village', 'street_address', 'curriculum_type',
            'other_curriculum_details', 'contact_phone', 'contact_email',
            'academic_year_start', 'academic_year_end', 'number_of_terms',
            'current_term', 'grading_scale_type', 'grading_scale_details',
            'default_notification_language', 'whatsapp_enabled', 'sms_enabled',
            'school_website', 'vision_mission',
            # Admin fields
            'admin_first_name', 'admin_last_name', 'admin_email', 
            'admin_phone', 'admin_username', 'admin_password', 'admin_confirm_password'
        ]
    
    def validate_admin_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value
    
    def validate_admin_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate_school_id(self, value):
        if School.objects.filter(school_id=value).exists():
            raise serializers.ValidationError("A school with this ID already exists.")
        return value
    
    def validate(self, attrs):
        if attrs['admin_password'] != attrs['admin_confirm_password']:
            raise serializers.ValidationError("Password confirmation does not match.")
        
        # Validate password strength
        try:
            validate_password(attrs['admin_password'])
        except ValidationError as e:
            raise serializers.ValidationError({'admin_password': e.messages})
        
        return attrs
    
    def create(self, validated_data):
        # Extract admin data
        admin_data = {
            'first_name': validated_data.pop('admin_first_name'),
            'last_name': validated_data.pop('admin_last_name'),
            'email': validated_data.pop('admin_email'),
            'phone_number': validated_data.pop('admin_phone'),
            'username': validated_data.pop('admin_username'),
            'password': validated_data.pop('admin_password'),
        }
        validated_data.pop('admin_confirm_password')
        
        # Create school
        school = School.objects.create(**validated_data)
        
        # Create admin user
        admin_user = User.objects.create_user(
            username=admin_data['username'],
            email=admin_data['email'],
            password=admin_data['password'],
            first_name=admin_data['first_name'],
            last_name=admin_data['last_name'],
            phone_number=admin_data['phone_number'],
            role='school_admin',
            school=school,
            is_first_login=True
        )
        
        # Create admin profile
        SchoolAdmin.objects.create(
            user=admin_user,
            employee_id=f"ADMIN-{school.school_id}-001",
            position="Head Administrator",
            employment_date=school.created_at.date(),
            responsibilities=[
                "School Management",
                "User Management", 
                "Academic Oversight",
                "System Configuration"
            ]
        )
        
        return school


class UserProfileSerializer(serializers.ModelSerializer):
    """Enhanced serializer for user profile with role-specific data"""
    school_info = SchoolSerializer(source='school', read_only=True)
    role_profile = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone_number', 'preferred_language', 'school_info',
            'profile_picture', 'is_first_login', 'last_activity',
            'province', 'district', 'sector', 'cell', 'village',
            'emergency_contact_name', 'emergency_contact_phone',
            'emergency_contact_relationship', 'email_notifications',
            'sms_notifications', 'whatsapp_notifications',
            'created_at', 'updated_at', 'role_profile'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_role_profile(self, obj):
        """Get role-specific profile data"""
        try:
            if obj.role == 'teacher' and hasattr(obj, 'teacher'):
                teacher = obj.teacher
                return {
                    'employee_id': teacher.employee_id,
                    'subjects_taught': [subject.name for subject in teacher.subjects_taught.all()],
                    'classes_assigned': [cls.name for cls in teacher.classes_assigned.all()],
                    'employment_date': teacher.employment_date,
                    'qualification': teacher.qualification,
                    'specialization': teacher.specialization,
                    'years_of_experience': teacher.years_of_experience,
                    'status': teacher.status
                }
            elif obj.role == 'student' and hasattr(obj, 'student'):
                student = obj.student
                return {
                    'student_id': student.student_id,
                    'current_class': student.current_class.name if student.current_class else None,
                    'current_section': student.current_section.name if student.current_section else None,
                    'enrollment_date': student.enrollment_date,
                    'date_of_birth': student.date_of_birth,
                    'gender': student.gender,
                    'status': student.status,
                    'fee_status': student.fee_status
                }
            elif obj.role == 'parent' and hasattr(obj, 'parent'):
                parent = obj.parent
                children = parent.children.all()
                return {
                    'relationship': parent.relationship,
                    'occupation': parent.occupation,
                    'workplace': parent.workplace,
                    'work_phone': parent.work_phone,
                    'children': [
                        {
                            'student_id': child.student_id,
                            'name': child.user.get_full_name(),
                            'class': child.current_class.name if child.current_class else None
                        } for child in children
                    ]
                }
            elif obj.role == 'school_admin' and hasattr(obj, 'schooladmin'):
                admin = obj.schooladmin
                return {
                    'employee_id': admin.employee_id,
                    'position': admin.position,
                    'employment_date': admin.employment_date,
                    'responsibilities': admin.responsibilities,
                    'can_manage_teachers': admin.can_manage_teachers,
                    'can_manage_students': admin.can_manage_students,
                    'can_manage_finances': admin.can_manage_finances,
                    'can_generate_reports': admin.can_generate_reports
                }
        except Exception as e:
            print(f"Error getting role profile for {obj.username}: {e}")
            return None
        
        return None
