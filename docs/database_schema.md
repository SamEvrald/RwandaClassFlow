# RwandaClassFlow Database Schema Documentation

## Overview
This document describes the complete database schema for RwandaClassFlow, an AI-powered educational management SaaS platform designed for Rwandan schools.

## Core Principles
- Multi-tenant architecture with school-level data isolation
- Support for multiple languages (English, French, Kinyarwanda)
- Comprehensive role-based access control (RBAC)
- AI/ML integration for automated grading and insights
- Flexible curriculum and grading system support

## Database Tables

### 1. User Management (`users` app)

#### `users` - Core user table
- **Purpose**: Central user authentication and basic profile information
- **Key Fields**:
  - `id` (Primary Key)
  - `username`, `email`, `password` (Authentication)
  - `role` (admin, school_admin, teacher, student, parent)
  - `preferred_language` (en, fr, rw)
  - `school_id` (Foreign Key to schools.School)
  - `profile_picture`, `phone_number`
  - Address fields: `province`, `district`, `sector`, `cell`, `village`
  - Notification preferences
  - Emergency contact information

#### `teachers` - Teacher-specific information
- **Purpose**: Extended profile for teaching staff
- **Key Fields**:
  - `user_id` (One-to-One with User)
  - `employee_id` (Unique identifier)
  - `employment_date`, `qualification`, `specialization`
  - `years_of_experience`, `status`
  - Professional development records
  - Financial information (salary scale, bank details)

#### `students` - Student-specific information
- **Purpose**: Extended profile for students
- **Key Fields**:
  - `user_id` (One-to-One with User)
  - `student_id` (Unique identifier)
  - `current_class_id`, `current_section_id`
  - `subject_combination_id` (for A-level students)
  - `date_of_birth`, `gender`, `status`
  - Health information (allergies, medical conditions)
  - Academic information (scholarship, fee status)

#### `parents` - Parent/Guardian information
- **Purpose**: Extended profile for parents and guardians
- **Key Fields**:
  - `user_id` (One-to-One with User)
  - `relationship` (father, mother, guardian, other)
  - `occupation`, `workplace`, `monthly_income`
  - Financial preferences and payment methods

#### `school_admins` - School administrator information
- **Purpose**: Extended profile for school administrators
- **Key Fields**:
  - `user_id` (One-to-One with User)
  - `employee_id`, `position`
  - Permission flags for different management areas

### 2. School Management (`schools` app)

#### `schools` - School information
- **Purpose**: Multi-tenant school configuration
- **Key Fields**:
  - `school_id` (Primary Key, unique identifier)
  - `school_name`, contact information
  - Address fields (Rwanda administrative structure)
  - `curriculum_type` (CBC, Cambridge IGCSE/A-Level, etc.)
  - Academic year configuration
  - Grading system configuration
  - Communication settings

#### `school_holidays` - School-specific holidays
- **Purpose**: Manage school calendar and holidays
- **Key Fields**:
  - `school_id`, `name`, `date`, `description`

### 3. Academic Management (`academics` app)

#### `academic_years` - Academic year management
- **Purpose**: Define academic years and terms
- **Key Fields**:
  - `school_id`, `year_name`, `start_date`, `end_date`
  - `is_current`, `terms` (JSON structure)

#### `classes` - Academic classes/grades
- **Purpose**: Define educational levels (P1-P6, S1-S6)
- **Key Fields**:
  - `school_id`, `class_id`, `class_name`
  - `level` (primary, secondary_o, secondary_a)
  - `class_teacher_id`, `max_students_per_section`

#### `class_sections` - Class sections
- **Purpose**: Subdivide classes into manageable sections
- **Key Fields**:
  - `school_class_id`, `section_name`, `room_number`
  - `capacity`, `class_teacher_id`

#### `subjects` - Academic subjects
- **Purpose**: Define curriculum subjects
- **Key Fields**:
  - `school_id`, `subject_code`, `subject_name`
  - Multi-language names (`subject_name_fr`, `subject_name_rw`)
  - `is_core`, `applicable_levels`, `credit_hours`

#### `subject_combinations` - A-level combinations
- **Purpose**: Define subject combinations for A-level students
- **Key Fields**:
  - `school_id`, `combination_id`, `combination_name`
  - Many-to-Many with subjects and classes

#### `teacher_subject_assignments` - Teaching assignments
- **Purpose**: Assign teachers to specific subjects and classes
- **Key Fields**:
  - `teacher_id`, `subject_id`, `school_class_id`
  - `section_id`, `academic_year_id`, `periods_per_week`

#### `assignments` - Assignments and assessments
- **Purpose**: Manage homework, quizzes, tests, and exams
- **Key Fields**:
  - `teacher_id`, `subject_id`, `class_assigned_id`
  - `title`, `description`, `assignment_type`
  - `max_score`, `due_date`, `submission_deadline`
  - `rubric` (JSON), AI grading configuration

#### `grades` - Student grades
- **Purpose**: Store assessment results and feedback
- **Key Fields**:
  - `student_id`, `assignment_id`, `score`, `percentage`
  - `letter_grade`, `feedback`, `ai_feedback`
  - `graded_by`, `is_ai_assisted`, submission timing

#### `attendance` - Student attendance
- **Purpose**: Track daily attendance records
- **Key Fields**:
  - `student_id`, `class_attended_id`, `section_id`
  - `date`, `period`, `status`, `notes`
  - `marked_by`, `marked_at`

#### `behavior_notes` - Behavioral tracking
- **Purpose**: Document student behavior incidents and achievements
- **Key Fields**:
  - `student_id`, `teacher_id`, `behavior_type`
  - `note`, `incident_date`, `action_taken`
  - Follow-up and parent notification tracking

#### `timetables` - Class schedules
- **Purpose**: Manage class timetables and schedules
- **Key Fields**:
  - `school_class_id`, `section_id`, `day_of_week`
  - `period_number`, `start_time`, `end_time`
  - `subject_id`, `teacher_id`, `room`

#### `student_enrollments` - Student class enrollments
- **Purpose**: Track student enrollment in specific classes per academic year
- **Key Fields**:
  - `student_id`, `school_class_id`, `section_id`
  - `academic_year_id`, `enrollment_date`, `is_active`

### 4. AI and Learning Resources (`academics/ai_models.py`)

#### `assignment_submissions` - Student submissions
- **Purpose**: Store student assignment submissions with AI processing
- **Key Fields**:
  - `assignment_id`, `student_id`, `submission_type`
  - `original_file`, `processed_text`, `voice_transcription`
  - `processing_status`, `processing_log`

#### `ai_grading_results` - AI grading outcomes
- **Purpose**: Store AI-generated grades and feedback
- **Key Fields**:
  - `submission_id`, `auto_score`, `confidence_score`
  - `detailed_feedback` (JSON), `improvement_suggestions`
  - `plagiarism_score`, teacher review information

#### `learning_resources` - Educational resources
- **Purpose**: Manage learning materials and resources
- **Key Fields**:
  - `title`, `description`, `resource_type`
  - `subject_id`, `applicable_classes`, `language`
  - `resource_url`, `resource_file`, `tags`
  - Usage analytics and ratings

#### `resource_recommendations` - AI recommendations
- **Purpose**: AI-generated resource recommendations for students
- **Key Fields**:
  - `student_id`, `resource_id`, `reason`
  - `confidence_score`, viewing and feedback tracking

#### `study_plans` - Personalized study plans
- **Purpose**: AI-generated personalized learning paths
- **Key Fields**:
  - `student_id`, `subject_id`, `plan_name`
  - `objectives` (JSON), `weekly_schedule` (JSON)
  - `milestones` (JSON), progress tracking

### 5. Communications (`communications` app)

#### `messages` - Internal messaging
- **Purpose**: In-app messaging between users
- **Key Fields**:
  - `sender_id`, `recipient_id`, `subject`, `content`
  - Read tracking and timestamps

#### `notifications` - System notifications
- **Purpose**: System-generated notifications
- **Key Fields**:
  - `recipient_id`, `notification_type`, `title`, `message`
  - Multi-channel delivery tracking (SMS, email, WhatsApp)

#### `announcements` - School announcements
- **Purpose**: School-wide and targeted announcements
- **Key Fields**:
  - `school_id`, `title`, `content`, `announcement_type`
  - `target_audience`, targeting options
  - Multi-channel communication settings

#### `parent_teacher_meetings` - Meeting management
- **Purpose**: Schedule and manage parent-teacher conferences
- **Key Fields**:
  - `school_id`, `teacher_id`, `parent_id`, `student_id`
  - `scheduled_date`, `duration_minutes`, `location`
  - `agenda`, `meeting_notes`, `action_items`

#### `communication_logs` - Communication tracking
- **Purpose**: Log all external communications
- **Key Fields**:
  - `sender_id`, `recipient_id`, `communication_type`
  - Delivery status, costs, error tracking

#### `sms_templates` - Message templates
- **Purpose**: Predefined message templates for common communications
- **Key Fields**:
  - `school_id`, `name`, `template_text`
  - `variables` (JSON), `language`

### 6. Analytics and Reporting (`analytics` app)

#### `performance_reports` - Student performance reports
- **Purpose**: Comprehensive student performance tracking
- **Key Fields**:
  - `student_id`, `report_type`, `report_period`
  - `overall_grade`, teacher and AI insights

#### `subject_performances` - Subject-specific performance
- **Purpose**: Detailed subject-level performance within reports
- **Key Fields**:
  - `report_id`, `subject_id`, performance metrics
  - `improvement_areas`, `strengths` (JSON)

#### `class_analytics` - Class-level analytics
- **Purpose**: Aggregate class performance data
- **Key Fields**:
  - `school_class_id`, `subject_id`, `period_start`, `period_end`
  - Performance metrics, top/struggling students

#### `school_analytics` - School-level analytics
- **Purpose**: School-wide performance and operational data
- **Key Fields**:
  - `school_id`, `period_start`, `period_end`
  - Overall metrics, improvement areas

#### `learning_insights` - AI-generated insights
- **Purpose**: AI-generated learning recommendations and insights
- **Key Fields**:
  - `student_id`, `subject_id`, `insight_type`
  - `insight_text`, `confidence_score`
  - `recommended_actions`, teacher review

### 7. Financial Management (`schools/financial_models.py`)

#### `fee_structures` - Fee configuration
- **Purpose**: Define school fee structures
- **Key Fields**:
  - `school_id`, `academic_year_id`, `school_class_id`
  - `fee_type`, `amount`, `payment_schedule`
  - Late fee configuration

#### `student_fee_payments` - Payment tracking
- **Purpose**: Track student fee payments
- **Key Fields**:
  - `student_id`, `fee_structure_id`, `amount_paid`
  - `payment_method`, `receipt_number`
  - Payment references and notes

#### `school_expenses` - Expense management
- **Purpose**: Track school operational expenses
- **Key Fields**:
  - `school_id`, `expense_type`, `amount`
  - `vendor`, `receipt_number`, approval workflow

#### `financial_reports` - Financial reporting
- **Purpose**: Generate financial reports and summaries
- **Key Fields**:
  - `school_id`, `report_type`, `period_start`, `period_end`
  - Income/expense breakdowns, outstanding fees

#### `scholarships` - Scholarship management
- **Purpose**: Manage scholarships and financial aid
- **Key Fields**:
  - `school_id`, `name`, `scholarship_type`
  - `percentage_covered`, eligibility criteria

#### `scholarship_applications` - Application tracking
- **Purpose**: Process scholarship applications
- **Key Fields**:
  - `scholarship_id`, `student_id`, `status`
  - Application materials, review process

## Database Relationships

### Key Relationships:
1. **Multi-tenancy**: All data is isolated by `school_id`
2. **User Hierarchy**: Users → Role-specific profiles (Teacher, Student, Parent)
3. **Academic Structure**: School → Classes → Sections → Students
4. **Subject Assignment**: Teachers ↔ Subjects ↔ Classes (Many-to-Many)
5. **Assessment Flow**: Assignments → Submissions → AI Processing → Grades
6. **Communication Flow**: Users → Messages/Notifications → Delivery Logs
7. **Financial Flow**: Fee Structures → Student Payments → Financial Reports

## Indexing Strategy

### Primary Indexes:
- All foreign keys are indexed
- Unique constraints on business keys (student_id, employee_id, etc.)
- Composite indexes on frequently queried combinations

### Performance Indexes:
- `(school_id, academic_year_id)` - Multi-tenant queries
- `(student_id, date)` - Attendance and performance queries
- `(teacher_id, subject_id, class_id)` - Assignment queries
- `(recipient_id, sent_at)` - Notification queries

## Data Validation and Constraints

### Business Rules:
1. Students can only be enrolled in one class per academic year
2. Teachers can be assigned to multiple subjects and classes
3. Parents can have multiple children in the same or different schools
4. AI grading confidence scores must be between 0.0 and 1.0
5. Fee payments cannot exceed the total fee amount
6. Attendance records are unique per student per day per period

### Referential Integrity:
- Cascade deletes for dependent data (e.g., grades when assignment is deleted)
- Protect deletes for referenced data (e.g., cannot delete class with enrolled students)
- Soft deletes for important historical data (users, students, payments)

## Security Considerations

### Data Protection:
- All sensitive data (PII) is encrypted at rest
- Database connections use SSL/TLS
- Row-level security ensures school data isolation
- Audit trails for all financial transactions

### Access Control:
- Database users have minimal required permissions
- Application-level RBAC controls data access
- Regular security audits and vulnerability assessments

## Backup and Recovery

### Backup Strategy:
- Daily automated backups with 30-day retention
- Weekly full backups with 1-year retention
- Real-time replication for disaster recovery
- School-specific backup isolation

### Recovery Procedures:
- Point-in-time recovery capabilities
- School-specific data restoration
- Regular backup integrity testing

## Monitoring and Maintenance

### Performance Monitoring:
- Query performance tracking
- Index usage analysis
- Storage growth monitoring
- Connection pool optimization

### Maintenance Tasks:
- Regular statistics updates
- Index rebuilding as needed
- Partition maintenance for large tables
- Archive old data based on retention policies

This schema supports the full SRS requirements for RwandaClassFlow while maintaining scalability, security, and performance for a multi-tenant SaaS platform.
