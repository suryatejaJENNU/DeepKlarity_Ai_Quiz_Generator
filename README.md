DeepKlarity AI Quiz Generator

A full-stack project that generates quizzes from Wikipedia articles using Google Gemini, FastAPI, MySQL, and a React (Vite) frontend.

⭐ Features
✅ Backend (FastAPI)

Scrapes Wikipedia content

Generates quizzes using Gemini API

Stores quiz history in MySQL

Provides REST API endpoints

Ready for Render deployment

✅ Frontend (React + Vite)

Enter Wikipedia URL

Display AI-generated quiz

View previous quiz history

Connects directly to FastAPI backend

📂 Project Structure
DeepKlarity_Ai_Quiz_Generator/
│
├── backend/
│   ├── main.py
│   ├── models_db.py
│   ├── scraper.py
│   ├── llm_quiz_generator.py
│   ├── database.py
│   ├── requirements.txt
│   └── .env  (You will create this)
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js

⚙️ Backend Setup Guide
### Step 1 — Move into backend folder
cd backend

Step 2 — Create & activate virtual environment
python -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows

Step 3 — Install backend dependencies
pip install -r requirements.txt

🔐 Backend .env Configuration (Important)

Create a .env file inside the backend folder with the following:

GEMINI_API_KEY="enter your key here"
GOOGLE_API_KEY="enter your key here"

MYSQL_ROOT_PASSWORD="enter your password here"
MYSQL_HOST="your host name"
MYSQL_PORT="3306"
MYSQL_DB="your db name"
MYSQL_USER="your user name"

Notes:

These variables are required for API + MySQL connection.

On Render, add these values in Environment Variables panel.

▶️ Run Backend Server
uvicorn main:app --reload


Server runs on:

👉 http://localhost:8000

📘 Frontend Setup Guide
Step 1 — Move into frontend folder
cd frontend

Step 2 — Install frontend dependencies
npm install

Step 3 — Start frontend server
npm run dev


Frontend runs on:

👉 http://localhost:5173

🔌 Backend API Endpoints
✔ POST /generate_quiz

Generate a quiz from a Wikipedia URL.

✔ GET /history

Fetch previously generated quiz list.

✔ GET /quiz/{id}

Fetch a specific quiz using its ID.

🗄️ Database Table Structure
Table Name: quizzes
Column	Type	Description
id	INT	Primary Key
url	VARCHAR	Wikipedia URL
title	VARCHAR	Scraped page title
scraped_content	TEXT	Raw content
full_quiz_data	TEXT	JSON quiz data
date_generated	TIMESTAMP	Auto timestamp
🌍 Deploy Backend on Render
### Build Command:
pip install --upgrade pip && pip install -r requirements.txt

Start Command:
uvicorn main:app --host 0.0.0.0 --port $PORT

Set Environment Variables:

Add all variables from your .env file (backend section).

👨‍💻 How System Works (Flow)

User enters Wikipedia URL in frontend

Frontend sends URL → FastAPI backend

Backend scrapes the page

Backend sends text to Gemini model

Gemini generates quiz questions

Quiz stored in MySQL

Result sent back to frontend

User can view history and quiz details
