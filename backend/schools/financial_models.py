from django.db import models
from django.utils.translation import gettext_lazy as _


class FeeStructure(models.Model):
    """Model for school fee structures"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='fee_structures')
    academic_year = models.ForeignKey('academics.AcademicYear', on_delete=models.CASCADE, related_name='fee_structures')
    school_class = models.ForeignKey('academics.Class', on_delete=models.CASCADE, related_name='fee_structures')
    fee_type = models.CharField(
        max_length=20,
        choices=[
            ('tuition', _('Tuition Fee')),
            ('examination', _('Examination Fee')),
            ('development', _('Development Fee')),
            ('transport', _('Transport Fee')),
            ('meals', _('Meals Fee')),
            ('uniform', _('Uniform Fee')),
            ('books', _('Books Fee')),
            ('other', _('Other Fee'))
        ]
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_schedule = models.CharField(
        max_length=20,
        choices=[
            ('once', _('Once per Year')),
            ('termly', _('Per Term')),
            ('monthly', _('Monthly')),
            ('weekly', _('Weekly'))
        ],
        default='termly'
    )
    is_mandatory = models.BooleanField(default=True)
    due_date = models.DateField()
    late_fee_percentage = models.FloatField(default=0.0)
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'fee_structures'
        unique_together = ['school', 'academic_year', 'school_class', 'fee_type']
        verbose_name = _('Fee Structure')
        verbose_name_plural = _('Fee Structures')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.school_class.class_name} - {self.fee_type}"


class StudentFeePayment(models.Model):
    """Model for student fee payments"""
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='fee_payments')
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(
        max_length=20,
        choices=[
            ('cash', _('Cash')),
            ('bank_transfer', _('Bank Transfer')),
            ('mobile_money', _('Mobile Money')),
            ('check', _('Check')),
            ('scholarship', _('Scholarship')),
            ('waiver', _('Fee Waiver'))
        ]
    )
    receipt_number = models.CharField(max_length=50, unique=True)
    reference_number = models.CharField(max_length=100, blank=True)  # Bank/Mobile money reference
    notes = models.TextField(blank=True)
    recorded_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='recorded_payments')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_fee_payments'
        verbose_name = _('Student Fee Payment')
        verbose_name_plural = _('Student Fee Payments')
        ordering = ['-payment_date']
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.amount_paid} - {self.payment_date}"


class SchoolExpense(models.Model):
    """Model for school expenses"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='expenses')
    expense_type = models.CharField(
        max_length=20,
        choices=[
            ('salary', _('Staff Salary')),
            ('utilities', _('Utilities')),
            ('supplies', _('School Supplies')),
            ('maintenance', _('Maintenance')),
            ('transport', _('Transport')),
            ('meals', _('Meals')),
            ('training', _('Staff Training')),
            ('equipment', _('Equipment')),
            ('other', _('Other'))
        ]
    )
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    expense_date = models.DateField()
    vendor = models.CharField(max_length=200, blank=True)
    receipt_number = models.CharField(max_length=50, blank=True)
    payment_method = models.CharField(
        max_length=20,
        choices=[
            ('cash', _('Cash')),
            ('bank_transfer', _('Bank Transfer')),
            ('check', _('Check')),
            ('mobile_money', _('Mobile Money'))
        ]
    )
    approved_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='approved_expenses')
    recorded_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='recorded_expenses')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'school_expenses'
        verbose_name = _('School Expense')
        verbose_name_plural = _('School Expenses')
        ordering = ['-expense_date']
    
    def __str__(self):
        return f"{self.school.school_name} - {self.expense_type} - {self.amount}"


class FinancialReport(models.Model):
    """Model for financial reports"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='financial_reports')
    report_type = models.CharField(
        max_length=20,
        choices=[
            ('monthly', _('Monthly Report')),
            ('termly', _('Termly Report')),
            ('yearly', _('Yearly Report')),
            ('custom', _('Custom Period Report'))
        ]
    )
    period_start = models.DateField()
    period_end = models.DateField()
    total_income = models.DecimalField(max_digits=15, decimal_places=2)
    total_expenses = models.DecimalField(max_digits=15, decimal_places=2)
    net_balance = models.DecimalField(max_digits=15, decimal_places=2)
    income_breakdown = models.JSONField(default=dict)  # Breakdown by fee type
    expense_breakdown = models.JSONField(default=dict)  # Breakdown by expense type
    outstanding_fees = models.DecimalField(max_digits=15, decimal_places=2)
    generated_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='generated_financial_reports')
    generated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'financial_reports'
        verbose_name = _('Financial Report')
        verbose_name_plural = _('Financial Reports')
        ordering = ['-generated_at']
    
    def __str__(self):
        return f"{self.school.school_name} - {self.report_type} - {self.period_start} to {self.period_end}"


class Scholarship(models.Model):
    """Model for scholarships and financial aid"""
    school = models.ForeignKey('schools.School', on_delete=models.CASCADE, related_name='scholarships')
    name = models.CharField(max_length=200)
    description = models.TextField()
    scholarship_type = models.CharField(
        max_length=20,
        choices=[
            ('full', _('Full Scholarship')),
            ('partial', _('Partial Scholarship')),
            ('merit', _('Merit-based')),
            ('need', _('Need-based')),
            ('government', _('Government Scholarship'))
        ]
    )
    percentage_covered = models.FloatField()  # Percentage of fees covered
    eligibility_criteria = models.JSONField(default=dict)
    academic_year = models.ForeignKey('academics.AcademicYear', on_delete=models.CASCADE, related_name='scholarships')
    max_recipients = models.IntegerField()
    current_recipients = models.IntegerField(default=0)
    application_deadline = models.DateField()
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='created_scholarships')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'scholarships'
        verbose_name = _('Scholarship')
        verbose_name_plural = _('Scholarships')
    
    def __str__(self):
        return f"{self.school.school_name} - {self.name}"


class ScholarshipApplication(models.Model):
    """Model for scholarship applications"""
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE, related_name='applications')
    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, related_name='scholarship_applications')
    application_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', _('Pending Review')),
            ('under_review', _('Under Review')),
            ('approved', _('Approved')),
            ('rejected', _('Rejected')),
            ('waitlisted', _('Waitlisted'))
        ],
        default='pending'
    )
    application_essay = models.TextField(blank=True)
    supporting_documents = models.JSONField(default=list)  # List of document URLs
    family_income = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    academic_performance = models.JSONField(default=dict)  # GPA, test scores, etc.
    recommendation_letters = models.JSONField(default=list)
    reviewed_by = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True, related_name='reviewed_applications')
    review_date = models.DateField(null=True, blank=True)
    review_notes = models.TextField(blank=True)
    
    class Meta:
        db_table = 'scholarship_applications'
        unique_together = ['scholarship', 'student']
        verbose_name = _('Scholarship Application')
        verbose_name_plural = _('Scholarship Applications')
        ordering = ['-application_date']
    
    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.scholarship.name}"
