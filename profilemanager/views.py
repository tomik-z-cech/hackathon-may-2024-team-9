from django.db.models import F, ExpressionWrapper, fields
from django.contrib.auth.mixins import LoginRequiredMixin  
from django.shortcuts import render
from django.views import generic
from profilemanager.models import UserProfile

# Create your views here.
class ProfileManagerView(LoginRequiredMixin, generic.ListView):
    """
    Class generates view of users profile
    """

    model = UserProfile
    template_name = "profilemanager/profile.html"

    def get(self, request, *args, **kwargs):
        """
        This method generates view of profile page
        """
        # Get current user
        current_profile = UserProfile.objects.get(user=request.user)
        # Render template
        return render(
            request,
            self.template_name,
            {
                "userprofile": current_profile,
            }
        )

class TopPlayersView(generic.ListView):
    """
    Class generates view of best players
    """

    model = UserProfile
    template_name = "profilemanager/topplayers.html"

    def get(self, request, *args, **kwargs):
        """
        This method generates view of best players
        """
        # Get current user
        cummulative_players = UserProfile.objects.order_by('-cummulative_score')[:10]
        highest_players = UserProfile.objects.order_by('-highest_score')[:10]
        games_players = UserProfile.objects.order_by('-games_played')[:10]
        # Render template
        return render(
            request,
            self.template_name,
            {
                "cummulative_players": cummulative_players,
                "highest_players": highest_players,
                "games_players": games_players,
            }
        )
