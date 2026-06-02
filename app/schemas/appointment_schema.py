from pydantic import BaseModel
from datetime import date, time

class AppointmentCreate(BaseModel):
    customer_name: str
    service_name: str
    appointment_date: date
    appointment_time: time
    duration_minutes: int
    practitioner_id: int