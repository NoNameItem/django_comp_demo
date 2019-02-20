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

urlpatterns = [
  # Тестовое представление
  path('hello_world', views.hello_world),
  # Главная страница раздела Grids
  path('', TemplateView.as_view(template_name="demo_grid/main.html"), name='grid_main'),
  # Простой jsGrid
  path('jsgrid-simple', TemplateView.as_view(template_name="demo_grid/jsgrid-simple.html"), name='jsgrid-simple'),
  # Список сотрудников + создание нового
  path('employee', views.EmployeeList.as_view()),
  # Просмотр, редактирование и удаление сотрудника
  path('employee/<int:pk>', views.EmployeeDetail.as_view())
  path('employee/<int:pk>', views.EmployeeDetail.as_view()),
  path('jsgrid-simple-1', TemplateView.as_view(template_name="demo_grid/jsgrid-simple-1.html"), name='jsgrid-simple-1'),
  path('department', views.DepartmentList.as_view()),
  path('department/<str:pk>', views.DepartmentDetail.as_view())
]
