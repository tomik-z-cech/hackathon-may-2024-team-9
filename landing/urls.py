from django.urls import path
from landing import views

urlpatterns = [
    path("", views.LandingPageView.as_view(), name="home"),
]