import os
import json
import google.generativeai as genai
from django.conf import settings
from PIL import Image

def process_menu_image(image_path):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment variables.")
        return None
    
    api_key = api_key.strip()

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-flash-latest')
        
        # Open the image using Pillow
        img = Image.open(image_path)
        
        prompt = """
        You are an AI that digitizes mess menus.
        Extract the menu from this image and return it as a structured JSON.
        The structure should be:
        {
           "month": "Month Name",
           "days": [
              {
                 "day": "Monday",
                 "meals": [
                    {"type": "Breakfast", "items": ["Item 1", "Item 2"]},
                    {"type": "Lunch", "items": ["Item 1", "Item 2"]},
                    {"type": "Dinner", "items": ["Item 1", "Item 2"]}
                 ]
              }
           ]
        }
        Return ONLY JSON. No markdown formatting.
        """
        
        response = model.generate_content([prompt, img])
        
        content = response.text
        # Strip markdown code blocks if present
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        if content.startswith("```"): # Handle just ``` without json
             content = content[3:]

        return json.loads(content.strip())
        
    except Exception as e:
        print(f"Error processing image with Gemini: {e}")
        return None
