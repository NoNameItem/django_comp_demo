from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from demo_grid import models


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = ("id", "name",)


class EmployeeSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Employee
    """
    hire_date = serializers.DateField(format='%d.%m.%Y', input_formats=['%d.%m.%Y', 'iso-8601'])
    class Meta:
        model = models.Employee
        fields = ("id", "first_name", "last_name", "email", "phone_number", "salary", "commission_pct",
                  "department", "comm", "is_active", "hire_date")


class JqxGridEmployeeSerializer(WritableNestedModelSerializer):
    """
    Сериализатор для модели Employee для использования с jqxGrid
    """
    department = DepartmentSerializer()
    hire_date = serializers.DateField(format='%d.%m.%Y', input_formats=['%d.%m.%Y', 'iso-8601'])

    class Meta:
        model = models.Employee
        fields = ("id", "first_name", "last_name", "email", "phone_number", "salary", "commission_pct",
                  "department", "comm", "is_active", "hire_date")
