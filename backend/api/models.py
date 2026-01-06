from django.db import models

class Menu(models.Model):
    image = models.ImageField(upload_to='menus/')
    month_name = models.CharField(max_length=50)
    json_data = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Menu for {self.month_name}"
