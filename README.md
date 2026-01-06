# Mess Menu

## Tech Stack

### Backend 
- **Framework**: Django + Django REST Framework (DRF)
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **AI Integration**: Google Gemini (1.5 Flash) for menu image processing

### Frontend 
- **Framework**: Next.js (React)
- **Styling**: Modern CSS / Tailwind (Optional)
- **PWA**: Fully offline-capable Progressive Web App


## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- Gemini API Key

### Backend Setup
1. Navigate to the `backend` directory.
2. Create and activate a virtual environment.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

