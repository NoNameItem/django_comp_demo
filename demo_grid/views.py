from django.shortcuts import render

# Create your views here.
import django_filters
from django_filters import rest_framework
from django_filters.widgets import BooleanWidget
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination

from demo_grid.models import Employee
from demo_grid.serializers import EmployeeSerializer

from demo_grid.models import Department
from demo_grid.serializers import DepartmentSerializer

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


class EmployeeFilter(rest_framework.FilterSet):
    """
    Фильтры над моделью Employee
    """
    first_name = django_filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = django_filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    email = django_filters.CharFilter(field_name="email", lookup_expr="icontains")
    phone_number = django_filters.CharFilter(field_name="phone_number", lookup_expr="icontains")
    hire_date = django_filters.DateFilter(field_name="hire_date")
    salary = django_filters.NumberFilter(field_name="salary")
    commission_pct = django_filters.NumberFilter(field_name="commission_pct")
    department = django_filters.CharFilter(field_name="department")
    comm = django_filters.CharFilter(field_name="comm", lookup_expr="icontains")
    is_active = django_filters.BooleanFilter(field_name="is_active", widget=BooleanWidget())  # Виджет нужен для преобразования из строки в тип Boolean


class EmployeeDeptFilter(rest_framework.FilterSet):
    """
    Фильтры над моделью Employee
    """
    first_name = django_filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = django_filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    email = django_filters.CharFilter(field_name="email", lookup_expr="icontains")
    phone_number = django_filters.CharFilter(field_name="phone_number", lookup_expr="icontains")
    hire_date = django_filters.DateFilter(field_name="hire_date")
    salary = django_filters.NumberFilter(field_name="salary")
    commission_pct = django_filters.NumberFilter(field_name="commission_pct")
    comm = django_filters.CharFilter(field_name="comm", lookup_expr="icontains")
    is_active = django_filters.BooleanFilter(field_name="is_active", widget=BooleanWidget())  # Виджет нужен для преобразования из строки в тип Boolean


class DepartmentFilter(rest_framework.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
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
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend,)
    filterset_class = EmployeeFilter
    pagination_class = JSGridPagination
    ordering_fields = ("id", "first_name", "last_name", "email", "phone_number", "hire_date", "salary",
                       "commission_pct", "department", "comm", "is_active", "hire_date")
    ordering = ("-is_active", "last_name")


class EmployeeFilteredList(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Employee.objects.filter(department_id=pk)

    serializer_class = EmployeeSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend,)
    filterset_class = EmployeeDeptFilter
    pagination_class = JSGridPagination
    ordering_fields = ("id", "first_name", "last_name", "email", "phone_number", "hire_date", "salary",
                       "commission_pct", "department", "comm", "is_active", "hire_date")
    ordering = ("-is_active", "last_name")


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Детали о сотруднике

    get:
    Информацая о сотруднике

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
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend)
    filterset_class = DepartmentFilter
    pagination_class = JSGridPagination
    ordering_fields = ("name",)
    ordering = "name"


class DepartmentFilteredList(generics.ListCreateAPIView):
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Department.objects.filter(id=pk)
    serializer_class = DepartmentSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend)
    filterset_class = DepartmentFilter
    pagination_class = JSGridPagination
    ordering_fields = ("name",)
    ordering = "name"


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
