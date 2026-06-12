from sqlalchemy import func

from app.models.practitioner_model import Practitioner
from app.models.appointment_model import Appointment


def recommend_practitioner(db, specialty):

    practitioners = db.query(
        Practitioner
    ).filter(
        Practitioner.specialty == specialty
    ).all()

    if not practitioners:
        return {
            "message": "No practitioner found"
        }

    best_practitioner = None
    min_appointments = float("inf")

    for practitioner in practitioners:

        count = db.query(
            Appointment
        ).filter(
            Appointment.practitioner_id == practitioner.id,
            Appointment.status == "booked"
        ).count()

        if count < min_appointments:
            min_appointments = count
            best_practitioner = practitioner

    return {
        "recommended_practitioner": best_practitioner.name,
        "specialty": best_practitioner.specialty,
        "current_bookings": min_appointments
    }