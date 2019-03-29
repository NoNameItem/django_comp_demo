from django.urls import path
from blog import views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('entries', login_required(views.entries), name="entries"),
    path('entries/<int:entry_id>', login_required(views.edit_entry)),
    path('entries/<int:entry_id>/save', login_required(views.save_entry)),
]