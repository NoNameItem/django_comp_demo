import rest_framework_filters
from django.shortcuts import render
from django_filters.widgets import BooleanWidget
from rest_framework_filters import FilterSet, filters, backends
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django.core.validators import EMPTY_VALUES

from demo_grid.models import Employee, Department
from demo_grid.serializers import EmployeeSerializer, JqxGridEmployeeSerializer, DepartmentSerializer


def hello_world(request):
    """
    Тестовое представление
    :param request: http-запрос
    :return: Hello, World!
    """
    return render(request, 'demo_grid/1.html', {})


# Вспомогательные классы и функции


class JSGridOrderingFilter(OrderingFilter):
    """
    Стандартный сортирующий фильтр для работы с jsGrid
    """
    ordering_param = "sortField"


class JSGridPagination(PageNumberPagination):
    """
    Стандартная пагинация для работы с jsGrid
    """
    page_query_param = "pageIndex"
    page_size_query_param = "pageSize"


class EmptyStringFilter(filters.BooleanFilter):
    def filter(self, qs, value):
        if value in EMPTY_VALUES:
            return qs

        exclude = self.exclude ^ (value is False)
        method = qs.exclude if exclude else qs.filter

        return method(**{self.field_name: ""})


# Фильтры


class EmployeeFilter(FilterSet):
    """
    Фильтры над моделью Employee
    """
    first_name = filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    email = filters.CharFilter(field_name="email", lookup_expr="icontains")
    phone_number = filters.CharFilter(field_name="phone_number", lookup_expr="icontains")
    hire_date = filters.DateFilter(field_name="hire_date")
    salary = filters.NumberFilter(field_name="salary")
    commission_pct = filters.NumberFilter(field_name="commission_pct")
    department = filters.CharFilter(field_name="department")
    comm = filters.CharFilter(field_name="comm", lookup_expr="icontains")
    is_active = filters.BooleanFilter(
        field_name="is_active", widget=BooleanWidget())  # Виджет нужен для преобразования из строки в тип Boolean


class DepartmentFilter(FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")


class JqxDepartmentFilter(FilterSet):
    name__isempty = EmptyStringFilter(field_name="name", widget=BooleanWidget())

    class Meta:
        model = Department
        fields = {
            'id': "__all__",
            'name': "__all__"
        }


class JqxEmployeeFilter(FilterSet):
    department = filters.RelatedFilter(JqxDepartmentFilter, field_name="department", queryset=Department.objects.all())
    first_name__isempty = EmptyStringFilter(field_name="first_name", widget=BooleanWidget())
    last_name__isempty = EmptyStringFilter(field_name="last_name", widget=BooleanWidget())
    email__isempty = EmptyStringFilter(field_name="email", widget=BooleanWidget())
    phone_number__isempty = EmptyStringFilter(field_name="phone_number", widget=BooleanWidget())
    comm__isempty = EmptyStringFilter(field_name="comm", widget=BooleanWidget())

    class Meta:
        model = Employee
        fields = {
            'first_name': "__all__",
            'last_name': "__all__",
            'email': "__all__",
            'phone_number': "__all__",
            'hire_date': "__all__",
            'salary': "__all__",
            'commission_pct': "__all__",
            'is_active': "__all__",
            'comm': "__all__"
        }


# Представления


class EmployeeList(generics.ListCreateAPIView):
    """
    Список всех сотрудников

    get:
    Список всех сотруджников

    post:
    Создание нового сотрудника
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework_filters.backends.RestFrameworkFilterBackend,)
    filterset_class = EmployeeFilter
    pagination_class = JSGridPagination
    ordering_fields = ("id", "first_name", "last_name", "email", "phone_number", "hire_date", "salary",
                       "commission_pct", "department", "comm", "is_active", "hire_date")
    ordering = ("-is_active", "last_name")


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Детали о сотруднике

    get:
    Информация о сотруднике

    put:
    Изменение информации о сотруднике

    delete:
    Удаление сотрудника
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework_filters.backends.RestFrameworkFilterBackend)
    filterset_class = DepartmentFilter
    pagination_class = JSGridPagination
    ordering_fields = ("name",)
    ordering = "name"


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class JqxGridEmployeeList(generics.ListCreateAPIView):
    """
    Список сотрудников для использования с jqxGrid

    get:
    Список сотрудников

    post:
    Добавление нового сотрудника
    """
    queryset = Employee.objects.all()
    serializer_class = JqxGridEmployeeSerializer
    pagination_class = JSGridPagination
    filter_backends = (OrderingFilter, rest_framework_filters.backends.RestFrameworkFilterBackend)
    filterset_class = JqxEmployeeFilter
    ordering_fields = ("id", "first_name", "last_name", "email", "phone_number", "hire_date", "salary",
                       "commission_pct", "department__name", "comm", "is_active", "hire_date")


class JqxGridEmployee(generics.RetrieveUpdateDestroyAPIView):
    """
    Детали о сотруднике

    get:
    Информация о сотруднике

    put:
    Изменение информации о сотруднике

    delete:
    Удаление сотрудника
    """

    queryset = Employee.objects.all()
    serializer_class = JqxGridEmployeeSerializer
