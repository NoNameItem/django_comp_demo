from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from demo_grid import models


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ("id", "first_name", "last_name", "email", "phone_number", "salary", "commission_pct",
                  "department", "comm", "is_active", "hire_date")

