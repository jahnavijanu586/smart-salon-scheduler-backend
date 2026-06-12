from fastapi import FastAPI
from app.database import engine, Base

from app.models.user_model import User
from app.models.salon_model import Salon
from app.models.practitioner_model import Practitioner
from app.models.appointment_model import Appointment
from app.models.review_model import Review
from app.routes.booking_routes import router as booking_router
from app.routes.practitioner_routes import router as practitioner_router
from app.routes.review_routes import router as review_router
from app.routes.salon_routes import router as salon_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.analytics_routes import router as analytics_router
from app.models.log_model import AuditLog
from app.core.exception_handler import global_exception_handler
from app.core.logging_middleware import LoggingMiddleware
from app.routes.external_salon_routes import router as external_salon_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Salon Scheduler API",
    version="1.0.0"
)
app.include_router(booking_router)
app.include_router(practitioner_router)
app.include_router(review_router)
app.include_router(salon_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(external_salon_router)

@app.get("/")
def home():
    return {
        "message": "Smart Salon Scheduler Backend Running"
    }
app.add_exception_handler(
    Exception,
    global_exception_handler
)
app.add_middleware(LoggingMiddleware)

@app.get(
    "/health",
    tags=["System"],
    summary="Health Check"
)
def health():
    return {
        "status": "healthy",
        "message": "API is running"
    }
