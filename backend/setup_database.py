#!/usr/bin/env python
"""
Django management command to create comprehensive database migrations
for RwandaClassFlow based on the complete schema
"""

import os
import sys

def create_migrations():
    """Create migrations for all apps with the new models"""
    
    print("🏗️  Creating database migrations for RwandaClassFlow...")
    
    # Apps that need migrations
    apps = [
        'users',
        'schools', 
        'academics',
        'communications',
        'analytics'
    ]
    
    for app in apps:
        print(f"📝 Creating migrations for {app}...")
        os.system(f"python3 manage.py makemigrations {app}")
    
    print("✅ All migrations created successfully!")
    
    # Create a comprehensive migration that includes all relationships
    print("📝 Creating comprehensive migration...")
    os.system("python3 manage.py makemigrations")
    
    print("✅ Database migrations ready!")
    print("📋 Next steps:")
    print("   1. Run: python3 manage.py migrate")
    print("   2. Run: python3 manage.py createsuperuser")
    print("   3. Run: python3 manage.py setup_sample_data")

def create_sample_data_command():
    """Create a management command to populate sample data"""
    
    sample_data_command = '''from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from users.models import User, Teacher, Student, Parent, SchoolAdmin
from schools.models import School, SchoolHoliday
from academics.models import (
    AcademicYear, Class, ClassSection, Subject, SubjectCombination,
    TeacherSubjectAssignment, Assignment, Grade, Attendance, BehaviorNote,
    TimeTable, StudentEnrollment
)
from communications.models import Announcement, SMSTemplate
import datetime
from django.utils import timezone


class Command(BaseCommand):
    help = 'Create sample data for RwandaClassFlow development and testing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--school-count',
            type=int,
            default=1,
            help='Number of sample schools to create'
        )

    def handle(self, *args, **options):
        school_count = options['school_count']
        
        self.stdout.write(
            self.style.SUCCESS(f'Creating sample data for {school_count} school(s)...')
        )
        
        for i in range(school_count):
            self.create_school_data(i + 1)
        
        self.stdout.write(
            self.style.SUCCESS('Sample data created successfully!')
        )

    def create_school_data(self, school_number):
        """Create sample data for one school"""
        
        # Create school
        school = School.objects.create(
            school_id=f'SCH{school_number:03d}',
            school_name=f'Rwanda Excellence School {school_number}',
            province='Kigali City',
            district='Gasabo',
            sector='Kacyiru',
            cell='Kamatamu',
            village='Nyarugunga',
            street_address=f'KG {school_number} Ave',
            curriculum_type='cbc',
            contact_phone=f'+250788{school_number:06d}',
            contact_email=f'info@school{school_number}.rw',
            academic_year_start=datetime.date(2024, 1, 15),
            academic_year_end=datetime.date(2024, 12, 15),
            number_of_terms=3,
            current_term=1,
            grading_scale_type='percentage',
            grading_scale_details={
                'A': {'min': 85, 'max': 100},
                'B': {'min': 70, 'max': 84},
                'C': {'min': 55, 'max': 69},
                'D': {'min': 40, 'max': 54},
                'F': {'min': 0, 'max': 39}
            }
        )
        
        # Create academic year
        academic_year = AcademicYear.objects.create(
            school=school,
            year_name='2024-2025',
            start_date=datetime.date(2024, 1, 15),
            end_date=datetime.date(2024, 12, 15),
            is_current=True,
            terms=[
                {'name': 'Term 1', 'start': '2024-01-15', 'end': '2024-04-15'},
                {'name': 'Term 2', 'start': '2024-05-01', 'end': '2024-08-15'},
                {'name': 'Term 3', 'start': '2024-09-01', 'end': '2024-12-15'}
            ]
        )
        
        # Create classes
        classes_data = [
            ('P1', 'Primary 1', 'primary'),
            ('P2', 'Primary 2', 'primary'),
            ('P3', 'Primary 3', 'primary'),
            ('P4', 'Primary 4', 'primary'),
            ('P5', 'Primary 5', 'primary'),
            ('P6', 'Primary 6', 'primary'),
            ('S1', 'Senior 1', 'secondary_o'),
            ('S2', 'Senior 2', 'secondary_o'),
            ('S3', 'Senior 3', 'secondary_o'),
            ('S4', 'Senior 4', 'secondary_a'),
            ('S5', 'Senior 5', 'secondary_a'),
            ('S6', 'Senior 6', 'secondary_a'),
        ]
        
        created_classes = []
        for class_id, class_name, level in classes_data:
            class_obj = Class.objects.create(
                school=school,
                class_id=class_id,
                class_name=class_name,
                level=level,
                max_students_per_section=40
            )
            created_classes.append(class_obj)
            
            # Create sections for each class
            for section_name in ['A', 'B']:
                ClassSection.objects.create(
                    school_class=class_obj,
                    section_name=section_name,
                    room_number=f'{class_id}{section_name}',
                    capacity=40
                )
        
        # Create subjects
        subjects_data = [
            ('ENG', 'English', ['primary', 'secondary_o', 'secondary_a'], True),
            ('KIN', 'Kinyarwanda', ['primary', 'secondary_o', 'secondary_a'], True),
            ('FRE', 'French', ['primary', 'secondary_o', 'secondary_a'], False),
            ('MTH', 'Mathematics', ['primary', 'secondary_o', 'secondary_a'], True),
            ('SCI', 'Science', ['primary'], True),
            ('PHY', 'Physics', ['secondary_o', 'secondary_a'], False),
            ('CHE', 'Chemistry', ['secondary_o', 'secondary_a'], False),
            ('BIO', 'Biology', ['secondary_o', 'secondary_a'], False),
            ('GEO', 'Geography', ['secondary_o', 'secondary_a'], False),
            ('HIS', 'History', ['secondary_o', 'secondary_a'], False),
            ('ICT', 'ICT', ['secondary_o', 'secondary_a'], False),
        ]
        
        created_subjects = []
        for subject_code, subject_name, levels, is_core in subjects_data:
            subject = Subject.objects.create(
                school=school,
                subject_code=subject_code,
                subject_name=subject_name,
                subject_name_fr=subject_name,  # Would be translated in real implementation
                subject_name_rw=subject_name,  # Would be translated in real implementation
                is_core=is_core,
                applicable_levels=levels,
                credit_hours=1
            )
            created_subjects.append(subject)
        
        # Create school admin
        admin_user = User.objects.create(
            username=f'admin{school_number}',
            email=f'admin@school{school_number}.rw',
            password=make_password('password123'),
            first_name='Grace',
            last_name='Uwimana',
            role='school_admin',
            school=school,
            preferred_language='en'
        )
        
        SchoolAdmin.objects.create(
            user=admin_user,
            employee_id=f'ADM{school_number:03d}',
            position='Head Teacher',
            employment_date=datetime.date(2023, 1, 1),
            responsibilities=['academic_management', 'staff_management', 'student_affairs']
        )
        
        # Create sample teachers
        teacher_data = [
            ('teacher1', 'Jean', 'Mukamana', 'TCH001', ['ENG', 'FRE']),
            ('teacher2', 'Paul', 'Nzeyimana', 'TCH002', ['MTH', 'PHY']),
            ('teacher3', 'Marie', 'Uwimana', 'TCH003', ['SCI', 'BIO']),
        ]
        
        created_teachers = []
        for username, first_name, last_name, emp_id, subject_codes in teacher_data:
            teacher_user = User.objects.create(
                username=f'{username}_{school_number}',
                email=f'{username}@school{school_number}.rw',
                password=make_password('password123'),
                first_name=first_name,
                last_name=last_name,
                role='teacher',
                school=school,
                preferred_language='en'
            )
            
            teacher = Teacher.objects.create(
                user=teacher_user,
                employee_id=f'{emp_id}_{school_number}',
                employment_date=datetime.date(2023, 1, 1),
                qualification='Bachelor of Education',
                specialization='Primary Education',
                years_of_experience=5
            )
            created_teachers.append(teacher)
        
        # Create sample students and parents
        for i in range(20):  # 20 students per school
            # Create parent first
            parent_user = User.objects.create(
                username=f'parent{i+1}_school{school_number}',
                email=f'parent{i+1}@school{school_number}.rw',
                password=make_password('password123'),
                first_name=f'Parent{i+1}',
                last_name=f'Surname{i+1}',
                role='parent',
                school=school,
                preferred_language='en',
                phone_number=f'+25078{school_number}{i+1:04d}'
            )
            
            parent = Parent.objects.create(
                user=parent_user,
                relationship='father' if i % 2 == 0 else 'mother',
                occupation='Business Owner'
            )
            
            # Create student
            student_user = User.objects.create(
                username=f'student{i+1}_school{school_number}',
                email=f'student{i+1}@school{school_number}.rw',
                password=make_password('password123'),
                first_name=f'Student{i+1}',
                last_name=f'Surname{i+1}',
                role='student',
                school=school,
                preferred_language='en'
            )
            
            # Assign to different classes
            class_index = i % len(created_classes)
            current_class = created_classes[class_index]
            sections = current_class.sections.all()
            current_section = sections[i % len(sections)] if sections else None
            
            student = Student.objects.create(
                user=student_user,
                student_id=f'STU{school_number:03d}{i+1:03d}',
                current_class=current_class,
                current_section=current_section,
                enrollment_date=datetime.date(2024, 1, 15),
                date_of_birth=datetime.date(2010, 1, 1),
                gender='male' if i % 2 == 0 else 'female',
                status='active'
            )
            
            # Link parent to student
            parent.children.add(student)
            
            # Create enrollment record
            if current_section:
                StudentEnrollment.objects.create(
                    student=student,
                    school_class=current_class,
                    section=current_section,
                    academic_year=academic_year,
                    enrollment_date=datetime.date(2024, 1, 15)
                )
        
        # Create sample announcements
        Announcement.objects.create(
            school=school,
            title='Welcome to New Academic Year',
            content='Welcome all students and parents to the new academic year 2024-2025.',
            announcement_type='general',
            target_audience='all',
            created_by=admin_user,
            publish_date=timezone.now(),
            is_urgent=False
        )
        
        # Create SMS templates
        templates = [
            ('grade_update', 'Grade Update: {student_name} scored {score}% in {subject}. Keep up the good work!'),
            ('attendance_alert', 'Alert: {student_name} was absent from school on {date}. Please contact the school.'),
            ('fee_reminder', 'Reminder: School fees for {student_name} are due on {due_date}. Amount: {amount} RWF'),
        ]
        
        for name, text in templates:
            SMSTemplate.objects.create(
                school=school,
                name=name,
                template_text=text,
                variables=['student_name', 'score', 'subject', 'date', 'due_date', 'amount'],
                language='en'
            )
        
        self.stdout.write(
            self.style.SUCCESS(f'✅ Created sample data for {school.school_name}')
        )
'''
    
    # Ensure management commands directory exists
    os.makedirs('users/management', exist_ok=True)
    os.makedirs('users/management/commands', exist_ok=True)
    
    # Create __init__.py files
    open('users/management/__init__.py', 'a').close()
    open('users/management/commands/__init__.py', 'a').close()
    
    # Write the command file
    with open('users/management/commands/setup_sample_data.py', 'w') as f:
        f.write(sample_data_command)
    
    print("✅ Sample data management command created!")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'migrations':
        create_migrations()
    elif len(sys.argv) > 1 and sys.argv[1] == 'sample_command':
        create_sample_data_command()
    else:
        print("RwandaClassFlow Database Setup")
        print("Usage:")
        print("  python3 setup_database.py migrations     - Create database migrations")
        print("  python3 setup_database.py sample_command - Create sample data command")
        print("")
        print("Complete setup process:")
        print("1. python3 setup_database.py migrations")
        print("2. python3 manage.py migrate")
        print("3. python3 setup_database.py sample_command")
        print("4. python3 manage.py setup_sample_data")
