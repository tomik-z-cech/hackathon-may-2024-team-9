from django.contrib.auth.decorators import login_required
from django.urls import path
from profilemanager import views

urlpatterns = [
    path("profilemanager", login_required(views.ProfileManagerView.as_view()), name="profile_manager"),
    path("topplayers", views.TopPlayersView.as_view(), name="top_players"),
    path("about-us", views.AboutUsView.as_view(), name="about_us"),
    path("how-to-play", views.HowToPlayView.as_view(), name="how_to_play"),
    path("play", login_required(views.PlayView.as_view()), name="play"),
]