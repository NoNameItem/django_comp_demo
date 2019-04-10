import django
from django.db import models

# Create your models here.


class Department(models.Model):
    name = models.CharField(max_length=300, verbose_name="Наименование")


class Employee(models.Model):
    """
    Сотрудники
    """
    first_name = models.CharField(max_length=30, verbose_name="Имя",
                                  error_messages={'blank': "Поле должно быть заполнено",
                                                  'null': "Поле должно быть заполнено"}, blank=False, null=False)
    last_name = models.CharField(max_length=30, verbose_name="Фамилия")
    email = models.EmailField(verbose_name="Email")
    phone_number = models.CharField(max_length=15, blank=True, verbose_name="Номер телефона")
    hire_date = models.DateField(verbose_name="Дата найма", default=django.utils.timezone.now)
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Зарплата")
    commission_pct = models.DecimalField(default=0, max_digits=4, decimal_places=2, verbose_name="Процент с продаж")
    department = models.ForeignKey(to="Department", on_delete=models.SET_NULL, related_name="employees", null=True)
    comm = models.TextField(blank=True, verbose_name="Комментарий")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "({0}) {1} {2}".format(self.id, self.last_name, self.first_name)
