# RwandaClassFlow Entity Relationship Diagram (ERD)

## Overview
This document describes the entity relationships and database structure for RwandaClassFlow, illustrating how different components of the educational management system interact.

## Core Entities and Relationships

### 1. User Management Entities

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      User       │────│     Teacher     │    │  SchoolAdmin    │
│  (Abstract)     │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • user_id (PK)  │    │ • user_id (PK)  │
│ • username      │    │ • employee_id   │    │ • employee_id   │
│ • email         │    │ • qualification │    │ • position      │
│ • role          │    │ • experience    │    │ • permissions   │
│ • school_id (FK)│    │ • status        │    │ • employment_dt │
│ • language      │    │ • employment_dt │    └─────────────────┘
│ • phone         │    └─────────────────┘              │
│ • address       │              │                      │
└─────────────────┘              │                      │
         │                       │                      │
    ┌────┴────┐                  │                      │
    │         │                  │                      │
┌───▼───┐ ┌───▼────┐            │                      │
│Student│ │ Parent │            │                      │
│       │ │        │            │                      │
├───────┤ ├────────┤            │                      │
│user_id│ │user_id │            │                      │
│std_id │ │relation│            │                      │
│class  │ │occup'n │            │                      │
│gender │ │income  │            │                      │
│dob    │ │payment │            │                      │
│status │ │method  │            │                      │
└───────┘ └────────┘            │                      │
     │         │                │                      │
     └─────────┼────────────────┘                      │
               │                                       │
         ┌─────▼─────┐                                 │
         │ Parent    │                                 │
         │ Children  │                                 │
         │ (M2M)     │                                 │
         └───────────┘                                 │
```

### 2. School and Academic Structure

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     School      │────│ AcademicYear    │    │      Class      │
│                 │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • school_id(PK) │    │ • id (PK)       │    │ • id (PK)       │
│ • school_name   │────│ • school_id(FK) │────│ • school_id(FK) │
│ • province      │    │ • year_name     │    │ • class_id      │
│ • district      │    │ • start_date    │    │ • class_name    │
│ • curriculum    │    │ • end_date      │    │ • level         │
│ • contact_info  │    │ • is_current    │    │ • max_students  │
│ • grading_sys   │    │ • terms (JSON)  │    │ • class_teacher │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         │                       │              ┌────────▼────────┐
         │                       │              │  ClassSection   │
         │                       │              │                 │
         │                       │              ├─────────────────┤
         │                       │              │ • id (PK)       │
         │                       │              │ • class_id (FK) │
         │                       │              │ • section_name  │
         │                       │              │ • room_number   │
         │                       │              │ • capacity      │
         │                       │              │ • class_teacher │
         │                       │              └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼─────┐                 │                       │
    │ Subject  │                 │                       │
    │          │                 │                       │
    ├──────────┤                 │                       │
    │ • id(PK) │                 │                       │
    │ • school │◄────────────────┘                       │
    │ • code   │                                         │
    │ • name   │                                         │
    │ • levels │                                         │
    │ • credits│                                         │
    └──────────┘                                         │
         │                                               │
         │                                               │
    ┌────▼─────────────┐                                 │
    │ SubjectCombination│                                │
    │                  │                                 │
    ├──────────────────┤                                 │
    │ • id (PK)        │                                 │
    │ • school_id (FK) │                                 │
    │ • combination_id │                                 │
    │ • name           │                                 │
    │ • subjects (M2M) │                                 │
    │ • classes (M2M)  │                                 │
    └──────────────────┘                                 │
                                                         │
                                              ┌──────────▼──────────┐
                                              │ StudentEnrollment   │
                                              │                     │
                                              ├─────────────────────┤
                                              │ • id (PK)           │
                                              │ • student_id (FK)   │
                                              │ • class_id (FK)     │
                                              │ • section_id (FK)   │
                                              │ • academic_year(FK) │
                                              │ • enrollment_date   │
                                              │ • is_active         │
                                              └─────────────────────┘
```

### 3. Academic Activities and Assessment

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Assignment      │────│ AssignmentSub   │────│ AIGradingResult │
│                 │    │ mission         │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • submission_id │
│ • teacher_id    │────│ • assignment_id │────│ • auto_score    │
│ • subject_id    │    │ • student_id    │    │ • confidence    │
│ • class_id      │    │ • type          │    │ • feedback(JSON)│
│ • title         │    │ • original_file │    │ • suggestions   │
│ • description   │    │ • processed_txt │    │ • plagiarism    │
│ • type          │    │ • voice_file    │    │ • criteria(JSON)│
│ • max_score     │    │ • transcription │    │ • teacher_review│
│ • due_date      │    │ • status        │    └─────────────────┘
│ • rubric (JSON) │    │ • submitted_at  │             │
│ • ai_enabled    │    └─────────────────┘             │
└─────────────────┘             │                      │
         │                      │                      │
         │              ┌───────▼───────┐              │
         │              │     Grade     │              │
         │              │               │              │
         │              ├───────────────┤              │
         └──────────────►│ • id (PK)     │◄─────────────┘
                        │ • student_id  │
                        │ • assignment  │
                        │ • score       │
                        │ • percentage  │
                        │ • letter_grade│
                        │ • feedback    │
                        │ • ai_feedback │
                        │ • graded_by   │
                        │ • graded_at   │
                        │ • is_ai_assist│
                        └───────────────┘
```

### 4. Learning Resources and Recommendations

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│LearningResource │────│ResourceRecom    │    │   StudyPlan     │
│                 │    │mendation        │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • title         │────│ • student_id    │────│ • student_id    │
│ • description   │    │ • resource_id   │    │ • subject_id    │
│ • type          │    │ • reason        │    │ • plan_name     │
│ • difficulty    │    │ • confidence    │    │ • description   │
│ • subject_id    │    │ • recommended   │    │ • start_date    │
│ • classes (M2M) │    │ • viewed        │    │ • end_date      │
│ • resource_url  │    │ • viewed_at     │    │ • objectives    │
│ • resource_file │    │ • helpful       │    │ • schedule(JSON)│
│ • tags (JSON)   │    └─────────────────┘    │ • milestones    │
│ • language      │                           │ • resources(M2M)│
│ • created_by    │                           │ • progress_%    │
│ • usage_count   │                           │ • generated_ai  │
│ • rating        │                           └─────────────────┘
└─────────────────┘                                    │
                                                       │
                                            ┌──────────▼──────────┐
                                            │StudyPlanProgress    │
                                            │                     │
                                            ├─────────────────────┤
                                            │ • id (PK)           │
                                            │ • study_plan_id(FK) │
                                            │ • milestone_id      │
                                            │ • completed         │
                                            │ • completed_at      │
                                            │ • notes             │
                                            │ • time_spent_mins   │
                                            └─────────────────────┘
```

### 5. Attendance and Behavior Tracking

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Attendance    │    │  BehaviorNote   │    │    TimeTable    │
│                 │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • student_id    │    │ • student_id    │    │ • class_id      │
│ • class_id      │    │ • teacher_id    │    │ • section_id    │
│ • section_id    │    │ • behavior_type │    │ • day_of_week   │
│ • subject_id    │    │ • note          │    │ • period_number │
│ • date          │    │ • voice_note    │    │ • start_time    │
│ • period        │    │ • incident_date │    │ • end_time      │
│ • status        │    │ • action_taken  │    │ • subject_id    │
│ • notes         │    │ • follow_up_req │    │ • teacher_id    │
│ • marked_by     │    │ • follow_up_dt  │    │ • room          │
│ • marked_at     │    │ • parent_notif  │    │ • academic_year │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 6. Communications System

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Message      │    │  Notification   │    │ Announcement    │
│                 │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • sender_id     │    │ • recipient_id  │    │ • school_id     │
│ • recipient_id  │    │ • type          │    │ • title         │
│ • subject       │    │ • title         │    │ • content       │
│ • content       │    │ • message       │    │ • type          │
│ • sent_at       │    │ • sent_at       │    │ • target_aud    │
│ • read_at       │    │ • read_at       │    │ • target_class  │
│ • is_read       │    │ • is_read       │    │ • target_subj   │
└─────────────────┘    │ • sms_sent      │    │ • created_by    │
                       │ • email_sent    │    │ • publish_date  │
                       │ • whatsapp_sent │    │ • expiry_date   │
                       └─────────────────┘    │ • is_urgent     │
                                              │ • send_sms      │
                                              │ • send_email    │
                                              │ • attachment    │
                                              └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ParentTeacher    │    │CommunicationLog │    │   SMSTemplate   │
│   Meeting       │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • school_id     │    │ • sender_id     │    │ • school_id     │
│ • type          │    │ • recipient_id  │    │ • name          │
│ • title         │    │ • type          │    │ • template_text │
│ • description   │    │ • subject       │    │ • variables     │
│ • teacher_id    │    │ • content       │    │ • language      │
│ • parent_id     │    │ • status        │    │ • is_active     │
│ • student_id    │    │ • sent_at       │    │ • created_by    │
│ • target_class  │    │ • delivered_at  │    │ • created_at    │
│ • scheduled_dt  │    │ • read_at       │    └─────────────────┘
│ • duration_mins │    │ • external_id   │
│ • location      │    │ • cost          │
│ • status        │    │ • error_message │
│ • agenda        │    └─────────────────┘
│ • meeting_notes │
│ • action_items  │
│ • created_by    │
└─────────────────┘
```

### 7. Analytics and Reporting

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│PerformanceReport│────│SubjectPerform   │    │ ClassAnalytics  │
│                 │    │ance             │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • student_id    │────│ • report_id     │    │ • class_id      │
│ • report_type   │    │ • subject_id    │    │ • subject_id    │
│ • period_start  │    │ • total_assign  │    │ • period_start  │
│ • period_end    │    │ • completed     │    │ • period_end    │
│ • overall_grade │    │ • avg_score     │    │ • total_students│
│ • overall_%     │    │ • grade         │    │ • avg_perform   │
│ • teacher_comm  │    │ • teacher_comm  │    │ • top_performers│
│ • head_comments │    │ • improvement   │    │ • struggling    │
│ • ai_insights   │    │ • strengths     │    │ • attendance_%  │
│ • generated_at  │    └─────────────────┘    │ • completion_%  │
│ • generated_by  │                           │ • generated_at  │
└─────────────────┘                           └─────────────────┘

┌─────────────────┐    ┌─────────────────┐
│SchoolAnalytics  │    │LearningInsight  │
│                 │    │                 │
├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │
│ • school_id     │    │ • student_id    │
│ • period_start  │    │ • subject_id    │
│ • period_end    │    │ • insight_type  │
│ • total_students│    │ • insight_text  │
│ • total_teachers│    │ • confidence    │
│ • attendance_%  │    │ • recommended   │
│ • overall_perf  │    │ • generated_at  │
│ • top_classes   │    │ • reviewed_by   │
│ • improve_areas │    │ • teacher_feed  │
│ • generated_at  │    └─────────────────┘
└─────────────────┘
```

### 8. Financial Management

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  FeeStructure   │────│StudentFeePayment│    │ SchoolExpense   │
│                 │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • school_id     │────│ • student_id    │    │ • school_id     │
│ • academic_year │    │ • fee_struct_id │    │ • expense_type  │
│ • class_id      │    │ • amount_paid   │    │ • description   │
│ • fee_type      │    │ • payment_date  │    │ • amount        │
│ • amount        │    │ • payment_method│    │ • expense_date  │
│ • payment_sched │    │ • receipt_num   │    │ • vendor        │
│ • is_mandatory  │    │ • reference_num │    │ • receipt_num   │
│ • due_date      │    │ • notes         │    │ • payment_method│
│ • late_fee_%    │    │ • recorded_by   │    │ • approved_by   │
│ • description   │    │ • created_at    │    │ • recorded_by   │
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│FinancialReport  │    │  Scholarship    │────│ScholarshipApp   │
│                 │    │                 │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • school_id     │    │ • school_id     │────│ • scholarship_id│
│ • report_type   │    │ • name          │    │ • student_id    │
│ • period_start  │    │ • description   │    │ • application_dt│
│ • period_end    │    │ • type          │    │ • status        │
│ • total_income  │    │ • % _covered    │    │ • essay         │
│ • total_expense │    │ • eligibility   │    │ • documents     │
│ • net_balance   │    │ • academic_year │    │ • family_income │
│ • income_break  │    │ • max_recipients│    │ • academic_perf │
│ • expense_break │    │ • current_recip │    │ • recomm_letters│
│ • outstanding   │    │ • app_deadline  │    │ • reviewed_by   │
│ • generated_by  │    │ • is_active     │    │ • review_date   │
│ • generated_at  │    │ • created_by    │    │ • review_notes  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Relationship Types

### 1. One-to-One Relationships (1:1)
- User → Teacher/Student/Parent/SchoolAdmin (User profile extensions)
- AssignmentSubmission → AIGradingResult
- User → UserPreference

### 2. One-to-Many Relationships (1:M)
- School → Users, Classes, Subjects, AcademicYears
- Class → ClassSections, Students, Assignments
- Teacher → Assignments, Grades, BehaviorNotes
- Student → Grades, Attendance, AssignmentSubmissions
- Assignment → AssignmentSubmissions, Grades

### 3. Many-to-Many Relationships (M:M)
- Teacher ↔ Subjects (via TeacherSubjectAssignment)
- Teacher ↔ Classes (via TeacherSubjectAssignment)
- Parent ↔ Student (Children relationship)
- Subject ↔ SubjectCombination
- Class ↔ SubjectCombination
- LearningResource ↔ Class
- StudyPlan ↔ LearningResource

### 4. Self-Referencing Relationships
- User → User (Message sender/recipient)
- User → User (Communication logs)

## Indexes and Performance Optimization

### Primary Indexes
- All primary keys (id columns)
- All foreign keys
- Unique constraints on business keys

### Composite Indexes
- (school_id, academic_year_id) - Multi-tenant queries
- (student_id, date) - Attendance queries
- (teacher_id, subject_id, class_id) - Assignment queries
- (recipient_id, sent_at) - Notification queries
- (school_id, period_start, period_end) - Analytics queries

### Search Indexes
- Full-text search on announcement content
- Search indexes on user names
- Subject and resource title searches

## Data Integrity Constraints

### Foreign Key Constraints
- All relationships maintain referential integrity
- Cascade deletes for dependent data
- Protect deletes for referenced master data

### Business Logic Constraints
- Check constraints on grade percentages (0-100)
- Check constraints on confidence scores (0.0-1.0)
- Date range validations (start_date < end_date)
- Unique constraints on business identifiers

### Multi-Tenant Isolation
- All school-specific data includes school_id
- Row-level security ensures data isolation
- Cross-school references are prevented

This ERD represents a comprehensive educational management system that supports:
- Multi-tenant architecture
- Role-based access control
- AI-powered features
- Comprehensive communication
- Financial management
- Analytics and reporting
- Rwandan educational context
