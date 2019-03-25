"""demogrid URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.views.generic import TemplateView

from demo_grid import views
from ldapAuth import views as ldap_views

from django.contrib.auth.decorators import login_required


urlpatterns = [
  # Тестовое представление
  path('hello_world', login_required(views.hello_world)),
  # Главная страница раздела Grids
  path('', login_required(TemplateView.as_view(template_name="demo_grid/main.html")), name='grid_main'),
  # Простой jsGrid
  path('jsgrid-simple', login_required(TemplateView.as_view(template_name="demo_grid/jsgrid-simple.html")), name='jsgrid-simple'),
  # Список сотрудников + создание нового
  path('employee', login_required(views.EmployeeList.as_view())),
  # Просмотр, редактирование и удаление сотрудника
  path('employee/<int:pk>', login_required(views.EmployeeDetail.as_view())),
  path('jsgrid-simple-1', login_required(TemplateView.as_view(template_name="demo_grid/jsgrid-simple-1.html")), name='jsgrid-simple-1'),
  path('department', login_required(views.DepartmentList.as_view())),
  path('department/<int:pk>', login_required(views.DepartmentFilteredList.as_view())),
  path('department/<int:pk>/employees', login_required(views.EmployeeFilteredList.as_view())),
  path('auth', ldap_views.auth),
  path('user_login', ldap_views.user_login),
  path('user_logout', ldap_views.user_logout)
]

