from datetime import datetime, timedelta, time
from app.models.appointment_model import Appointment


def get_available_slots(
    db,
    appointment_date,
    practitioner_id,
    duration_minutes
):

    opening_time = time(10, 0)
    closing_time = time(20, 0)

    slot_duration = 30
    slots = []

    current_datetime = datetime.combine(
        appointment_date,
        opening_time
    )

    closing_datetime = datetime.combine(
        appointment_date,
        closing_time
    )

    existing_appointments = db.query(Appointment).filter(
        Appointment.practitioner_id == practitioner_id,
        Appointment.appointment_date == appointment_date,
        Appointment.status == "booked"
    ).all()

    while current_datetime < closing_datetime:

        requested_start = current_datetime

        requested_end = requested_start + timedelta(
            minutes=duration_minutes
        )

        overlap = False

        for appointment in existing_appointments:

            existing_start = datetime.combine(
                appointment.appointment_date,
                appointment.appointment_time
            )

            existing_end = existing_start + timedelta(
                minutes=appointment.duration_minutes
            )

            if (
                requested_start < existing_end
                and requested_end > existing_start
            ):
                overlap = True
                break

        if not overlap:
            slots.append(
                requested_start.strftime("%H:%M")
            )

        current_datetime += timedelta(
            minutes=slot_duration
        )

    return slots