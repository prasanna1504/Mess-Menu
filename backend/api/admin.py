from django.contrib import admin
from .models import Menu

@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('month_name', 'created_at')
    readonly_fields = ('json_data', 'created_at')
