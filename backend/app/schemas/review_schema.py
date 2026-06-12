from pydantic import BaseModel

class ReviewCreate(BaseModel):
    customer_name: str
    rating: int
    comment: str
    salon_id: int