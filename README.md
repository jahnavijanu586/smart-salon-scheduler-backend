# Smart Salon Scheduler

## Overview

Smart Salon Scheduler is a professional appointment management platform built using FastAPI and PostgreSQL.

The system allows customers to book salon appointments, view practitioner availability, receive practitioner recommendations, submit reviews, and manage appointments. Administrators can monitor revenue, practitioner performance, and booking analytics through secured dashboards.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)
* Admin Protected Endpoints

### Appointment Management

* Book Appointment
* View Appointments
* Get Appointment by ID
* Cancel Appointment
* Reschedule Appointment
* Prevent Double Booking
* Slot Availability Checking

### Practitioner Management

* Add Practitioner
* View All Practitioners
* View Practitioner by ID

### Salon Management

* Add Salon
* View All Salons
* View Salon by ID

### Review System

* Add Customer Reviews
* View Salon Reviews

### Recommendation Engine

* Recommend Practitioners based on:

  * Service Type
  * Experience
  * Ratings

### Analytics Dashboard

* Revenue Dashboard
* Booking Analytics
* Top Practitioner Analytics
* Recommendation Analytics

### System Monitoring

* Health Check Endpoint

---

## Tech Stack

### Backend

* FastAPI
* Python
* SQLAlchemy ORM
* Pydantic

### Database

* PostgreSQL

### Security

* JWT Authentication
* OAuth2 Password Flow
* Password Hashing (bcrypt)

### API Documentation

* Swagger UI
* OpenAPI

### Deployment

* Docker

---

## Project Structure

smart-salon-scheduler/

backend/

app/

models/

routes/

schemas/

services/

core/

main.py

requirements.txt

Dockerfile

README.md

---

## Database Models

### User

* id
* name
* email
* password
* role

### Salon

* id
* name
* address
* city
* rating
* phone
* image_url

### Practitioner

* id
* name
* specialty
* experience
* salon_id

### Appointment

* id
* customer_name
* service_name
* appointment_date
* appointment_time
* duration_minutes
* practitioner_id
* status
* service_price

### Review

* id
* customer_name
* comment
* rating
* salon_id

---

## API Endpoints

### Authentication

POST /signup

POST /login

GET /profile

---

### Appointments

POST /book-appointment

GET /appointments

GET /appointments/{id}

PUT /cancel-appointment/{id}

PUT /reschedule-appointment/{id}

GET /available-slots

---

### Practitioners

POST /add-practitioner

GET /practitioners

GET /practitioners/{id}

---

### Salons

POST /salons

GET /salons

GET /salons/{id}

---

### Reviews

POST /reviews

GET /reviews

---

### Analytics

GET /analytics/dashboard/revenue

GET /analytics/dashboard/bookings

GET /analytics/dashboard/top-practitioners

---

### System

GET /health

---

## Installation

### Clone Repository

git clone <repository-url>

cd smart-salon-scheduler

---

### Create Virtual Environment

python -m venv venv

---

### Activate Environment

Windows

venv\Scripts\activate

Linux/Mac

source venv/bin/activate

---

### Install Dependencies

pip install -r requirements.txt

---

### Configure Environment Variables

Create a .env file

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

DATABASE_URL=postgresql://username:password@localhost/salon_db

---

### Run Server

uvicorn app.main:app --reload

---

## API Documentation

Swagger UI

http://127.0.0.1:8000/docs

ReDoc

http://127.0.0.1:8000/redoc

---

## Health Check

GET /health

Response

{
"status": "healthy",
"message": "API is running"
}

---

## Future Enhancements

* React Frontend
* Customer Dashboard
* Admin Dashboard UI
* Online Payments
* Notification Service
* Email Reminders
* SMS Reminders
* AI-Based Scheduling
* Docker Compose Deployment
* Cloud Deployment

---

## Author

Jahnavi

Smart Salon Scheduler Project

Built using FastAPI, PostgreSQL, JWT Authentication, and SQLAlchemy.
