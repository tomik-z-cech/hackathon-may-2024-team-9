from django.contrib.auth.decorators import login_required
from django.urls import path
from profilemanager import views

urlpatterns = [
    path("profilemanager", login_required(views.ProfileManagerView.as_view()), name="profile_manager"),
    path("topplayers", views.TopPlayersView.as_view(), name="top_players"),
]