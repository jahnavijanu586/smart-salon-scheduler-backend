from datetime import datetime, timedelta
from app.models.appointment_model import Appointment
from app.services.log_service import create_log


def create_appointment(db, appointment):

    # Appointment start time
    start_time = datetime.combine(
        appointment.appointment_date,
        appointment.appointment_time
    )

    # Appointment end time
    end_time = start_time + timedelta(
        minutes=appointment.duration_minutes
    )

    # Existing appointments for same practitioner
    existing_appointments = db.query(Appointment).filter(
        Appointment.practitioner_id == appointment.practitioner_id,
        Appointment.appointment_date == appointment.appointment_date,
        Appointment.status == "booked"
    ).all()

    # Check overlap
    for existing in existing_appointments:

        existing_start = datetime.combine(
            existing.appointment_date,
            existing.appointment_time
        )

        existing_end = existing_start + timedelta(
            minutes=existing.duration_minutes
        )

        if start_time < existing_end and end_time > existing_start:
            return {
                "success": False,
                "message": "Slot already booked"
            }

    # Create appointment
    new_appointment = Appointment(
        customer_name=appointment.customer_name,
        service_name=appointment.service_name,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
        duration_minutes=appointment.duration_minutes,
        practitioner_id=appointment.practitioner_id,
        status="booked"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    create_log(
    db,
    "BOOK_APPOINTMENT",
    appointment.customer_name
)

    return {
        "success": True,
        "message": "Appointment booked successfully",
        "appointment": {
            "id": new_appointment.id,
            "customer_name": new_appointment.customer_name,
            "service_name": new_appointment.service_name,
            "appointment_date": str(new_appointment.appointment_date),
            "appointment_time": str(new_appointment.appointment_time),
            "duration_minutes": new_appointment.duration_minutes,
            "practitioner_id": new_appointment.practitioner_id,
            "status": new_appointment.status
        }
    }