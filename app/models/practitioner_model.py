from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Practitioner(Base):
    __tablename__ = "practitioners"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)

    specialty = Column(String, nullable=False)

    experience = Column(Integer)

    rating = Column(Float)

    is_available = Column(Boolean, default=True)

    salon_id = Column(Integer, ForeignKey("salons.id"))

    salon = relationship("Salon", back_populates="practitioners")

    appointments = relationship("Appointment", back_populates="practitioner")