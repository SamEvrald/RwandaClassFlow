"""
Management command to create sample data for RwandaClassFlow
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import date, timedelta
import random

from schools.models import School, SchoolHoliday
from users.models import SchoolAdmin, Teacher, Student, Parent
from academics.models import (
    AcademicYear, Class, ClassSection, Subject, Assignment, 
    Grade, Attendance, LearningResource, StudentEnrollment
)

User = get_user_model()


class Command(BaseCommand):
    help = 'Create sample data for RwandaClassFlow'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete existing data before creating sample data',
        )

    def handle(self, *args, **options):
        if options['reset']:
            self.stdout.write('Deleting existing data...')
            # Delete in reverse order to avoid foreign key constraints
            Grade.objects.all().delete()
            Assignment.objects.all().delete()
            Attendance.objects.all().delete()
            StudentEnrollment.objects.all().delete()
            LearningResource.objects.all().delete()
            Subject.objects.all().delete()
            ClassSection.objects.all().delete()
            Class.objects.all().delete()
            AcademicYear.objects.all().delete()
            Parent.objects.all().delete()
            Student.objects.all().delete()
            Teacher.objects.all().delete()
            SchoolAdmin.objects.all().delete()
            SchoolHoliday.objects.all().delete()
            School.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()

        self.stdout.write('Creating sample data for RwandaClassFlow...')

        # Create sample schools
        school1 = School.objects.create(
            school_id='KPS001',
            school_name='Kigali Primary School',
            province='Kigali City',
            district='Nyarugenge',
            sector='Nyarugenge',
            cell='Rwezamenyo',
            village='Kigali',
            street_address='KN 12 Ave, Kigali',
            curriculum_type='cbc',
            contact_phone='+250788123456',
            contact_email='info@kigaliprimary.rw',
            academic_year_start=date(2024, 9, 1),
            academic_year_end=date(2025, 7, 31),
            number_of_terms=3,
            current_term=1,
            grading_scale_type='percentage',
            grading_scale_details={'A': '85-100', 'B': '70-84', 'C': '55-69', 'D': '40-54', 'F': '0-39'},
            default_notification_language='en',
            whatsapp_enabled=True,
            sms_enabled=True,
            school_website='https://kigaliprimary.rw',
            vision_mission='Providing quality education for all children in Rwanda'
        )

        school2 = School.objects.create(
            school_id='BSS002',
            school_name='Butare Secondary School',
            province='Southern Province',
            district='Huye',
            sector='Huye',
            cell='Matyazo',
            village='Butare',
            street_address='NR1 Road, Butare',
            curriculum_type='cbc',
            contact_phone='+250788654321',
            contact_email='info@butaresecondary.rw',
            academic_year_start=date(2024, 9, 1),
            academic_year_end=date(2025, 7, 31),
            number_of_terms=3,
            current_term=1,
            grading_scale_type='percentage',
            grading_scale_details={'A': '85-100', 'B': '70-84', 'C': '55-69', 'D': '40-54', 'F': '0-39'},
            default_notification_language='en',
            whatsapp_enabled=True,
            sms_enabled=True,
            school_website='https://butaresecondary.rw',
            vision_mission='Excellence in secondary education and character development'
        )

        # Create academic years
        current_year = AcademicYear.objects.create(
            school=school1,
            year_name='2024-2025',
            start_date=date(2024, 9, 1),
            end_date=date(2025, 7, 31),
            is_current=True,
            terms=[
                {'name': 'Term 1', 'start': '2024-09-01', 'end': '2024-12-15'},
                {'name': 'Term 2', 'start': '2025-01-15', 'end': '2025-04-15'},
                {'name': 'Term 3', 'start': '2025-05-01', 'end': '2025-07-31'},
            ]
        )

        # Create school holidays
        SchoolHoliday.objects.create(
            school=school1,
            name='Christmas Day',
            date=date(2024, 12, 25),
            description='Christmas celebration'
        )
        
        SchoolHoliday.objects.create(
            school=school1,
            name='New Year Day',
            date=date(2025, 1, 1),
            description='New Year celebration'
        )

        # Create users and roles
        # School Admin
        admin_user = User.objects.create_user(
            username='schooladmin',
            email='admin@kigaliprimary.rw',
            password='admin123',
            first_name='Joseph',
            last_name='Nkurunziza',
            role='school_admin',
            phone_number='+250788111111',
            preferred_language='en',
            school=school1,
            is_active=True
        )
        school_admin = SchoolAdmin.objects.create(
            user=admin_user,
            employee_id='ADMIN001',
            position='Principal',
            employment_date=date(2020, 1, 1)
        )

        # Teachers
        teacher_data = [
            ('teacher1', 'Alice', 'Mukamazimpaka', 'Mathematics', 'MATH001'),
            ('teacher2', 'Robert', 'Nsengimana', 'English', 'ENG001'),
            ('teacher3', 'Grace', 'Uwimana', 'Science', 'SCI001'),
            ('teacher4', 'Paul', 'Bizimana', 'Social Studies', 'SOC001'),
            ('teacher5', 'Sarah', 'Nyiramana', 'Kinyarwanda', 'KIN001'),
        ]

        teachers = []
        for username, first_name, last_name, subject_name, employee_id in teacher_data:
            user = User.objects.create_user(
                username=username,
                email=f'{username}@kigaliprimary.rw',
                password='teacher123',
                first_name=first_name,
                last_name=last_name,
                role='teacher',
                phone_number=f'+25078812{random.randint(1000, 9999)}',
                preferred_language='en',
                school=school1,
                is_active=True
            )
            teacher = Teacher.objects.create(
                user=user,
                employee_id=employee_id,
                employment_date=date(2020, random.randint(1, 12), random.randint(1, 28)),
                qualification='Bachelor of Education',
                specialization=subject_name,
                national_id=f'11234567{random.randint(1000, 9999)}0123456'
            )
            teachers.append(teacher)

        # Create classes
        classes = []
        for grade in [1, 2, 3, 4, 5, 6]:
            class_obj = Class.objects.create(
                school=school1,
                class_id=f'P{grade}',
                class_name=f'Primary {grade}',
                level='primary',
                max_students_per_section=40,
                class_teacher=teachers[grade % len(teachers)]
            )
            
            # Create sections for each class
            for section_name in ['A', 'B']:
                ClassSection.objects.create(
                    school_class=class_obj,
                    section_name=section_name,
                    class_teacher=teachers[(grade + ord(section_name)) % len(teachers)],
                    max_students=20
                )
            
            classes.append(class_obj)

        # Create subjects
        subjects_data = [
            ('Mathematics', 'MATH', 'Core mathematics curriculum for primary education'),
            ('English', 'ENG', 'English language and literature'),
            ('Science', 'SCI', 'General science and nature studies'),
            ('Social Studies', 'SOC', 'Geography, history, and civic education'),
            ('Kinyarwanda', 'KIN', 'National language of Rwanda'),
            ('Physical Education', 'PE', 'Sports and physical activities'),
        ]

        subjects = []
        for subject_name, code, description in subjects_data:
            subject = Subject.objects.create(
                school=school1,
                subject_name=subject_name,
                subject_code=code,
                description=description,
                is_mandatory=True if code in ['MATH', 'ENG', 'KIN'] else False
            )
            subjects.append(subject)

        # Create students and parents
        students = []
        parents = []
        
        for i in range(1, 121):  # 120 students (20 per class)
            # Create parent
            parent_user = User.objects.create_user(
                username=f'parent{i}',
                email=f'parent{i}@example.com',
                password='parent123',
                first_name=f'Parent{i}',
                last_name=f'Family{i}',
                role='parent',
                phone_number=f'+25078813{i:04d}',
                preferred_language='rw',
                school=school1,
                is_active=True
            )
            parent = Parent.objects.create(
                user=parent_user,
                relationship='father' if i % 2 == 0 else 'mother',
                occupation=random.choice(['Farmer', 'Teacher', 'Business', 'Civil Servant', 'Doctor']),
                national_id=f'11987654{i:04d}0123456'
            )
            parents.append(parent)

            # Create student
            student_user = User.objects.create_user(
                username=f'student{i}',
                email=f'student{i}@example.com',
                password='student123',
                first_name=f'Student{i}',
                last_name=f'Family{i}',
                role='student',
                phone_number=f'+25078814{i:04d}',
                preferred_language='rw',
                school=school1,
                is_active=True
            )
            
            # Assign to class based on age/grade
            class_index = min((i - 1) // 20, len(classes) - 1)
            section = ClassSection.objects.filter(school_class=classes[class_index]).first()
            
            student = Student.objects.create(
                user=student_user,
                student_id=f'STD{i:04d}',
                current_class=classes[class_index],
                current_section=section,
                enrollment_date=date(2024, 9, 1),
                date_of_birth=date(2012 + random.randint(0, 6), random.randint(1, 12), random.randint(1, 28)),
                gender=random.choice(['male', 'female']),
                admission_date=date(2024, 9, 1),
                special_needs='None',
                allergies='No known allergies',
                national_id=f'12012345{i:04d}0123456'
            )
            
            # Link parent and student
            parent.children.add(student)
            
            # Enroll student
            StudentEnrollment.objects.create(
                student=student,
                school_class=classes[class_index],
                section=section,
                academic_year=current_year,
                enrollment_date=date(2024, 9, 1),
                is_active=True
            )
            
            students.append(student)

        # Create assignments
        for subject in subjects[:3]:  # Only for main subjects
            for class_obj in classes[:3]:  # Only for first 3 classes
                assignment = Assignment.objects.create(
                    teacher=teachers[0],  # Math teacher
                    subject=subject,
                    class_assigned=class_obj,
                    title=f'{subject.subject_name} Assignment - Week 1',
                    description=f'Practice exercises for {subject.subject_name}',
                    assignment_type='assignment',
                    max_score=100.0,
                    due_date=timezone.now() + timedelta(days=7),
                    submission_deadline=timezone.now() + timedelta(days=10),
                    instructions='Complete all exercises and submit neatly written work.',
                    allow_late_submission=True,
                    late_penalty_percentage=10.0,
                    ai_grading_enabled=True
                )

                # Create grades for some students
                class_students = students[:20]  # First 20 students
                for student in class_students[:10]:  # Grade half the students
                    score = random.uniform(60, 95)
                    Grade.objects.create(
                        student=student,
                        assignment=assignment,
                        score=score,
                        percentage=score,
                        letter_grade='A' if score >= 85 else 'B' if score >= 70 else 'C',
                        feedback=f'Good work! Score: {score:.1f}%',
                        ai_feedback='Well structured answers with clear understanding of concepts.',
                        graded_by=teachers[0],
                    )

        # Create learning resources
        for subject in subjects:
            LearningResource.objects.create(
                title=f'{subject.subject_name} Textbook',
                description=f'Official textbook for {subject.subject_name}',
                resource_type='document',
                subject=subject,
                uploaded_by=teachers[0],
                is_public=True
            )

        # Create attendance records
        for student in students[:20]:  # First 20 students
            for i in range(10):  # 10 days of attendance
                attendance_date = date.today() - timedelta(days=i)
                if attendance_date.weekday() < 5:  # Weekdays only
                    Attendance.objects.create(
                        student=student,
                        class_attended=student.current_class,
                        section=student.current_section,
                        subject=subjects[0],  # Math
                        attendance_date=attendance_date,
                        status=random.choice(['present', 'present', 'present', 'late', 'absent']),
                        marked_by=teachers[0],
                        remarks='Regular attendance' if random.random() > 0.2 else 'Needs improvement'
                    )

        self.stdout.write(
            self.style.SUCCESS(
                f'''
Successfully created sample data:
- Schools: {School.objects.count()}
- Users: {User.objects.count()}
- Teachers: {Teacher.objects.count()}
- Students: {Student.objects.count()}
- Parents: {Parent.objects.count()}
- Classes: {Class.objects.count()}
- Subjects: {Subject.objects.count()}
- Assignments: {Assignment.objects.count()}
- Grades: {Grade.objects.count()}

Sample login credentials:
- Superuser: admin / (password you set)
- School Admin: schooladmin / admin123
- Teacher: teacher1 / teacher123
- Student: student1 / student123
- Parent: parent1 / parent123
                '''
            )
        )
