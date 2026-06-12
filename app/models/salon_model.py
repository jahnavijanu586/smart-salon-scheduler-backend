from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Salon(Base):
    __tablename__ = "salons"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    address = Column(String)

    city = Column(String)

    rating = Column(Float)

    phone = Column(String)

    image_url = Column(String)

    practitioners = relationship("Practitioner", back_populates="salon")

    reviews = relationship("Review", back_populates="salon")