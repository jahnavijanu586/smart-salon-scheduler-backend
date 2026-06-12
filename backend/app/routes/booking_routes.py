from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import date, time

from app.database import get_db

from app.schemas.appointment_schema import AppointmentCreate
from app.schemas.user_schema import UserCreate

from app.models.appointment_model import Appointment

from app.services.booking_service import create_appointment
from app.services.slot_service import get_available_slots
from app.services.auth_service import create_user, login_user
from app.core.security import get_current_user
from app.services.log_service import create_log


router = APIRouter()

@router.post("/book-appointment",
             tags=["Appointments"],
    summary="Book Appointment",
    description="Create a new salon appointment"
    )
def book_appointment(
    appointment: AppointmentCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_appointment(db, appointment)


@router.get("/available-slots")
def available_slots(
    appointment_date: date,
    practitioner_id: int,
    duration_minutes: int,
    db: Session = Depends(get_db)
):
    slots = get_available_slots(
        db,
        appointment_date,
        practitioner_id,
        duration_minutes
    )

    return {
        "available_slots": slots
    }


@router.put("/cancel-appointment/{appointment_id}")
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {
            "message": "Appointment not found"
        }

    appointment.status = "cancelled"

    db.commit()
    create_log(
    db,
    "CANCEL_APPOINTMENT",
    appointment.customer_name
)

    return {
        "message": "Appointment cancelled successfully"
    }


@router.put("/reschedule-appointment/{appointment_id}",
          tags=["Appointments"],
    summary="Reschedule Appointment"   )
def reschedule_appointment(
    appointment_id: int,
    appointment_date: date,
    appointment_time: time,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {
            "message": "Appointment not found"
        }

    existing_appointment = db.query(Appointment).filter(
        Appointment.practitioner_id == appointment.practitioner_id,
        Appointment.appointment_date == appointment_date,
        Appointment.appointment_time == appointment_time,
        Appointment.status == "booked",
        Appointment.id != appointment_id
    ).first()

    if existing_appointment:
        return {
            "message": "Slot already booked"
        }

    appointment.appointment_date = appointment_date
    appointment.appointment_time = appointment_time

    db.commit()
    create_log(
    db,
    "RESCHEDULE_APPOINTMENT",
    appointment.customer_name
)

    return {
        "message": "Appointment rescheduled successfully"
    }


@router.get("/appointments",
            tags=["Appointments"],
    summary="Get All Appointments")
def get_appointments(
    db: Session = Depends(get_db)
):
    return db.query(Appointment).all()


@router.get("/appointments/{appointment_id}",tags=["Appointments"],
    summary="Get Appointment By ID")
def get_appointment(
    appointment_id: int,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {
            "message": "Appointment not found"
        }

    return appointment


@router.post("/signup",
           tags=["Authentication"],
    summary="User Registration"
  )
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)


@router.post("/login",
             tags=["Authentication"],
    summary="User Login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(
        db,
        form_data.username,
        form_data.password
    )

@router.get("/profile",
            tags=["Authentication"],
    summary="Current User Profile"
    )
def profile(
    current_user=Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

@router.put("/complete-appointment/{appointment_id}")
def complete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db)
):

    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {
            "message": "Appointment not found"
        }

    appointment.status = "completed"

    db.commit()

    return {
        "message": "Appointment completed successfully"
    }
@router.get("/dashboard-stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total = db.query(Appointment).count()

    completed = db.query(Appointment).filter(
        Appointment.status == "completed"
    ).count()

    cancelled = db.query(Appointment).filter(
        Appointment.status == "cancelled"
    ).count()

    booked = db.query(Appointment).filter(
        Appointment.status == "booked"
    ).count()

    return {
        "total": total,
        "completed": completed,
        "cancelled": cancelled,
        "booked": booked
    }