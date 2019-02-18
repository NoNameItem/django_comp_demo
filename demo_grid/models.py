from django.db import models

# Create your models here.

class Department(models.Model):
    code = models.CharField(max_length=30, verbose_name="Код", primary_key=True)
    name = models.CharField(max_length=300, verbose_name="Наименование")


class Employee(models.Model):
    first_name = models.CharField(max_length=30, verbose_name="Имя")
    last_name = models.CharField(max_length=30, verbose_name="Фамилия")
    email = models.EmailField(verbose_name="Email")
    phone_number = models.CharField(max_length=15, null=True, verbose_name="Номер телефона")
    # hire_date = models.DateField(verbose_name="Дата найма")
    salary = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Зарплата")
    commission_pct = models.DecimalField(null=True, max_digits=4, decimal_places=2, verbose_name="Процент с продаж")
    department = models.ForeignKey(Department, null=True, default='---', on_delete=models.SET_NULL)
    comm = models.TextField(null=True, verbose_name="Комментарий")

