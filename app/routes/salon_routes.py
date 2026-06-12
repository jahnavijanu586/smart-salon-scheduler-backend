from fastapi import Depends
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.salon_model import Salon
from app.schemas.salon_schema import SalonCreate
from app.core.permissions import admin_required
from app.core.security import get_current_user

router = APIRouter()

@router.post("/salons",
             tags=["Salons"],
    summary="Create Salon")
def create_salon(
    salon: SalonCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    admin_required(current_user)

    new_salon = Salon(
        name=salon.name,
        address=salon.address,
        city=salon.city,
        rating=salon.rating,
        phone=salon.phone,
        image_url=salon.image_url
    )

    db.add(new_salon)
    db.commit()
    db.refresh(new_salon)

    return {
        "message": "Salon created successfully",
        "data": new_salon
    }


@router.get("/salons",
          tags=["Salons"],
    summary="Get All Salons"
  )
def get_salons(
    db: Session = Depends(get_db)
):
    return db.query(Salon).all()


@router.get("/salons/{salon_id}",
             tags=["Salons"],
    summary="Get Salon By ID")
def get_salon(
    salon_id: int,
    db: Session = Depends(get_db)
):
    salon = db.query(Salon).filter(
        Salon.id == salon_id
    ).first()

    if not salon:
        return {
            "message": "Salon not found"
        }

    return salon