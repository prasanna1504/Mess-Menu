from django.urls import path
from .views import CurrentMenuView

urlpatterns = [
    path('menu/current/', CurrentMenuView.as_view(), name='current-menu'),
]
