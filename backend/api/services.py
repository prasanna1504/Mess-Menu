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
        IMPORTANT: Use full English day names (e.g., "Monday", "Tuesday") exactly as they appear in the image, but fully spelled out.
        If the menu starts on a day other than Monday, respect that order in the JSON but ensure the day name is correct.
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

        data = json.loads(content.strip())
        
        # Sort days to ensure Monday starts first if possible, or at least ordered correctly
        days_order = {
            "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3,
            "Friday": 4, "Saturday": 5, "Sunday": 6,
            "Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5, "Sun": 6 # Fallback
        }
        
        if "days" in data and isinstance(data["days"], list):
            # Normalize day names to Title Case to match keys
            for d in data["days"]:
                if "day" in d:
                    d["day"] = d["day"].strip().title()

            data["days"].sort(key=lambda x: days_order.get(x.get("day", ""), 99))

        return data
        
    except Exception as e:
        print(f"Error processing image with Gemini: {e}")
        return None
