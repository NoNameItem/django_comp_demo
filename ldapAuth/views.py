from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect


def user_login(request):
    username = request.POST['user-name']
    password = request.POST['user-password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(request.GET.get("main", default="/"))
    else:
        return HttpResponseRedirect(request.GET.get("auth", default="/"))


def user_logout(request):
    logout(request)
    return HttpResponseRedirect(request.GET.get("auth", default="/"))


def auth(request):
    return render(request, 'auth/login.html')


