from django.shortcuts import render

# Create your views here.
import django_filters
from django_filters import rest_framework
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination

from demo_grid.models import Employee
from demo_grid.serializers import EmployeeSerializer

from demo_grid.models import Department
from demo_grid.serializers import DepartmentSerializer

def hello_world(request):
    return render(request, 'demo_grid/1.html', {})


def jsgrid_demo(request):
    return render(request, 'demo_grid/js_grid_template.html', {})


# Вспомогательные классы и функции


class JSGridOrderingFilter(OrderingFilter):
    ordering_param = "sortField"


class JSGridPagination(PageNumberPagination):
    page_query_param = "pageIndex"
    page_size_query_param = "pageSize"


class EmployeeFilter(rest_framework.FilterSet):
    first_name = django_filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = django_filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    email = django_filters.CharFilter(field_name="email", lookup_expr="icontains")
    phone_number = django_filters.CharFilter(field_name="phone_number", lookup_expr="icontains")
    # hire_date = django_filters.DateFilter(field_name="hire_date", lookup_expr="eq")
    salary = django_filters.NumberFilter(field_name="salary", lookup_expr="exact")
    commission_pct = django_filters.NumberFilter(field_name="commission_pct", lookup_expr="exact")
    department = django_filters.CharFilter(field_name="department", lookup_expr="icontains")
    comm = django_filters.CharFilter(field_name="comm", lookup_expr="icontains")


class DepartmentFilter(rest_framework.FilterSet):
    code = django_filters.CharFilter(field_name="code", lookup_expr="icontains")
    name = django_filters.CharFilter(field_name="code", lookup_expr="icontains")


# Представления


class EmployeeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend,)
    filterset_class = EmployeeFilter
    pagination_class = JSGridPagination
    ordering_fields = ("id", "first_name", "last_name", "email", "phone_number", "hire_date", "salary", "commision_pct",
                       "department", "comm")
    ordering = ('last_name', )


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = (JSGridOrderingFilter, rest_framework.DjangoFilterBackend)
    filterset_class = DepartmentFilter
    pagination_class = JSGridPagination
    ordering_fields = ("code", "name")
    ordering = "code"


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
