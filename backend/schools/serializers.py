from rest_framework import serializers
from .models import School, SchoolHoliday


class SchoolSerializer(serializers.ModelSerializer):
    """Serializer for School model"""
    
    class Meta:
        model = School
        fields = '__all__'
        read_only_fields = ['school_id', 'created_at', 'updated_at']


class SchoolHolidaySerializer(serializers.ModelSerializer):
    """Serializer for SchoolHoliday model"""
    
    class Meta:
        model = SchoolHoliday
        fields = '__all__'
