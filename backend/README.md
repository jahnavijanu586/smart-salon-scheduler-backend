# Smart Salon Scheduler Backend

## Overview

Smart Salon Scheduler is a production-style FastAPI backend designed for salon appointment management. The platform enables customers to discover salons, view practitioners, book appointments, leave reviews, and receive intelligent practitioner recommendations.

The system also provides analytics dashboards, revenue tracking, role-based access control, and external salon discovery integration.

---

## Features

### Authentication & Authorization

* JWT Authentication
* User Registration & Login
* Role-Based Access Control (Admin / Customer)

### Salon Management

* Create Salon
* View Salons
* Update Salon
* Delete Salon

### Practitioner Management

* Add Practitioners
* View Practitioners
* Practitioner-Salon Mapping

### Appointment Booking

* Book Appointment
* Appointment Scheduling
* Appointment Status Tracking

### Recommendation Engine

* Smart Practitioner Recommendation
* Service-Based Matching

### Reviews & Ratings

* Submit Reviews
* View Reviews
* Rating Analytics

### Analytics Dashboard

* Revenue Analytics
* Top Practitioner Analytics
* Booking Statistics

### External Salon Discovery

* Mock External Salon Search
* Search Salons by City
* Simulated Third-Party Salon Integration

### Production Features

* Docker Support
* Environment Variables
* Centralized Logging
* Exception Handling
* Modular Architecture

---

## Tech Stack

* FastAPI
* PostgreSQL
* SQLAlchemy
* Pydantic
* JWT Authentication
* Docker
* Python

---

## Project Structure

backend/

├── app/

│ ├── ai/

│ ├── core/

│ ├── data/

│ ├── models/

│ ├── routes/

│ ├── schemas/

│ ├── services/

│ ├── utils/

│ └── workers/

├── Dockerfile

├── requirements.txt

├── README.md

└── .env

---

## API Endpoints

### Authentication

POST /register

POST /login

---

### Salons

GET /salons

POST /salons

GET /salons/{id}

PUT /salons/{id}

DELETE /salons/{id}

---

### Practitioners

GET /practitioners

POST /practitioners

GET /practitioners/{id}

---

### Appointments

POST /book-appointment

GET /appointments

PUT /appointments/{id}

---

### Reviews

POST /reviews

GET /reviews

---

### Analytics

GET /analytics/dashboard/revenue

GET /analytics/top-practitioners

---

### External Salon Discovery

GET /external-salons

GET /external-salons/search?city=Hyderabad

---

## Environment Variables

Create a .env file:

DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

---

## Running Locally

Install dependencies:

pip install -r requirements.txt

Run server:

uvicorn app.main:app --reload

Swagger Documentation:

http://localhost:8000/docs

---

## Docker

Build:

docker build -t smart-salon-backend .

Run:

docker run -p 8000:8000 smart-salon-backend

---

## Future Improvements

* Google Places API Integration
* Foursquare API Integration
* Payment Gateway
* Redis Caching
* Celery Background Jobs
* Email Notifications
* SMS Notifications
* AI Demand Forecasting
* Multi-Salon Network Support

---

## Author

Jahnavi

Smart Salon Scheduler Backend Project


Built using FastAPI, PostgreSQL, JWT Authentication, and SQLAlchemy.
