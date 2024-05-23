# Imports
import math
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    """
    User profile model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games_played = models.IntegerField(default=0)
    highest_score = models.IntegerField(default=0)
    cummulative_score = models.IntegerField(default=0)

    class Meta:
        verbose_name = "User Profile"

    def __str__(self):
        return self.user.username
    
    @property
    def average_score(self):
        if self.games_played > 0:
            return math.ceil(self.cummulative_score / self.games_played)
        else:
            return 0
    
# Signal to create UserProfile when a new User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
