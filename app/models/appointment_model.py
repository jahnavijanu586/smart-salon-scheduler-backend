from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String)

    service_name = Column(String)

    appointment_date = Column(Date)

    appointment_time = Column(Time)

    duration_minutes = Column(Integer)

    status = Column(String, default="booked")

    practitioner_id = Column(Integer, ForeignKey("practitioners.id"))

    practitioner = relationship("Practitioner", back_populates="appointments")
    service_price = Column(Float, default=0)