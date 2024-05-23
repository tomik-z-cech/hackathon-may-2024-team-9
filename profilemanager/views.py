import math
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
        # Count average score if player had played at least one game
        if current_profile.games_played > 0 :
            average_score = current_profile.cummulative_score / current_profile.games_played
        else:
            average_score = 0
        # Rounding of score
        average_score = math.ceil(average_score)
        print(average_score)
        # Render template
        return render(
            request,
            self.template_name,
            {
                "username": current_profile,
                "games_played": current_profile.games_played,
                "highest_score": current_profile.highest_score,
                "cummulative_score": current_profile.cummulative_score,
                "average_score": average_score
            }
        )
