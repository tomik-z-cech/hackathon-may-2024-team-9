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
        average_players = UserProfile.objects.annotate(
            average_score_counted=ExpressionWrapper(
                F('cummulative_score') / F('games_played'),
                output_field=fields.FloatField()
            )
        ).filter(games_played__gt=0).order_by('-average_score_counted')[:10]
        # Render template
        return render(
            request,
            self.template_name,
            {
                "cummulative_players": cummulative_players,
                "highest_players": highest_players,
                "games_players": games_players,
                "average_players": average_players,
            }
        )

class HowToPlayView(generic.ListView):
    """
    Class generates view of how to play page
    """

    template_name = "profilemanager/howto.html"

    def get(self, request, *args, **kwargs):
        """
        This method generates view of how to play page
        """
        # Render template
        return render(
            request,
            self.template_name,
        )
        
class AboutUsView(generic.ListView):
    """
    Class generates view of about us page
    """

    template_name = "profilemanager/aboutus.html"

    def get(self, request, *args, **kwargs):
        """
        This method generates view of about us page
        """
        # Render template
        return render(
            request,
            self.template_name,
        )
        
class PlayView(LoginRequiredMixin, generic.ListView):
    """
    Class generates view of game page
    """

    template_name = "profilemanager/play.html"

    def get(self, request, *args, **kwargs):
        """
        This method generates view of game page
        """
        # Render template
        return render(
            request,
            self.template_name,
        )