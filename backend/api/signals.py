from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Menu
from .services import process_menu_image

@receiver(post_save, sender=Menu)
def menu_post_save(sender, instance, created, **kwargs):
    if instance.image and not instance.json_data:
        try:
            print(f"Processing menu image: {instance.image.path}")
            data = process_menu_image(instance.image.path)
            if data:
                instance.json_data = data
                instance.save()
                print("Menu processed and saved successfully.")
        except Exception as e:
            print(f"Error in signal: {e}")

