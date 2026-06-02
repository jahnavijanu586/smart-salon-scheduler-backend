from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String)

    comment = Column(String)

    rating = Column(Float)

    salon_id = Column(Integer, ForeignKey("salons.id"))

    salon = relationship("Salon", back_populates="reviews")