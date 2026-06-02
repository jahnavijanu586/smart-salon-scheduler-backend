from pydantic import BaseModel

class PractitionerCreate(BaseModel):
    name: str
    specialty: str
    experience: int
    specialization: str

class PractitionerResponse(BaseModel):
    id: int
    name: str
    specialty: str
    experience: int

    class Config:
        from_attributes = True

