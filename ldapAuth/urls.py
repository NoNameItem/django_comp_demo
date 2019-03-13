from django.urls import path
from ldapAuth import views


urlpatterns = [
    path('auth', views.auth)
]