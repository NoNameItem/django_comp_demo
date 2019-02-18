import django
from django.db import models

# Create your models here.


class Employee(models.Model):
    first_name = models.CharField(max_length=30, verbose_name="Имя")
    last_name = models.CharField(max_length=30, verbose_name="Фамилия")
    email = models.EmailField(verbose_name="Email")
    phone_number = models.CharField(max_length=15, null=True, verbose_name="Номер телефона")
    hire_date = models.DateField(verbose_name="Дата найма", default=django.utils.timezone.now)
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Зарплата")
    commission_pct = models.DecimalField(null=True, max_digits=4, decimal_places=2, verbose_name="Процент с продаж")
    department = models.CharField(max_length=250, verbose_name="Отдел")
    comm = models.TextField(null=True, verbose_name="Комментарий")
    is_active = models.BooleanField(default=True)
