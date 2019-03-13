from django.shortcuts import render
from django import forms


def auth(request):
    return render(request, 'auth/login.html')
