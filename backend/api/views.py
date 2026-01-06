from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Menu
from .serializers import MenuSerializer

class CurrentMenuView(APIView):
    def get(self, request):
        # Get the most recently created menu
        recent_menu = Menu.objects.order_by('-created_at').first()
        if recent_menu:
            serializer = MenuSerializer(recent_menu)
            return Response(serializer.data)
        return Response({"error": "No menu found"}, status=404)
