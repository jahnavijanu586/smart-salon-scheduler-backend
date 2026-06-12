from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.appointment_model import Appointment
from app.core.security import get_current_user
from app.models.review_model import Review
from app.models.practitioner_model import Practitioner
from app.models.appointment_model import Appointment
router = APIRouter()

@router.get("/dashboard/stats")
def dashboard_stats(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    total = db.query(Appointment).count()

    booked = db.query(Appointment).filter(
        Appointment.status == "booked"
    ).count()

    cancelled = db.query(Appointment).filter(
        Appointment.status == "cancelled"
    ).count()

    completed = db.query(Appointment).filter(
        Appointment.status == "completed"
    ).count()

    return {
        "total_appointments": total,
        "booked": booked,
        "cancelled": cancelled,
        "completed": completed
    }

@router.get("/dashboard/analytics")
def dashboard_analytics(
    db: Session = Depends(get_db)
):

    total_appointments = db.query(
        Appointment
    ).count()

    booked = db.query(
        Appointment
    ).filter(
        Appointment.status == "booked"
    ).count()

    cancelled = db.query(
        Appointment
    ).filter(
        Appointment.status == "cancelled"
    ).count()

    completed = db.query(
        Appointment
    ).filter(
        Appointment.status == "completed"
    ).count()

    average_rating = db.query(
        func.avg(Review.rating)
    ).scalar()

    return {
        "total_appointments": total_appointments,
        "booked": booked,
        "cancelled": cancelled,
        "completed": completed,
        "average_rating": round(average_rating or 0, 2)
    }

@router.get("/dashboard/top-practitioner")
def top_practitioner(
    db: Session = Depends(get_db)
):

    result = (
        db.query(
            Practitioner.name,
            func.count(Appointment.id).label("appointment_count")
        )
        .join(
            Appointment,
            Practitioner.id == Appointment.practitioner_id
        )
        .group_by(
            Practitioner.id,
            Practitioner.name
        )
        .order_by(
            func.count(Appointment.id).desc()
        )
        .limit(5)
        .all()
    )

    if not result:
        return {
            "message": "No appointments found"
        }

    return [
        {
            "practitioner": row.name,
            "appointments": row.appointment_count
        }
        for row in result
    ]