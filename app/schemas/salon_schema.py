from pydantic import BaseModel
class SalonCreate(BaseModel):
    name: str
    address: str
    city: str
    rating: float
    phone: str
    image_url: str