from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.practitioner_model import Practitioner
from app.schemas.practitioner_schema import PractitionerCreate
from app.core.permissions import admin_required
from app.core.security import get_current_user
from app.services.recommendation_service import recommend_practitioner

router = APIRouter()

@router.post("/add-practitioner",
              tags=["Practitioners"],
    summary="Add Practitioner")
def add_practitioner(
    practitioner: PractitionerCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    admin_required(current_user)

    new_practitioner = Practitioner(
        name=practitioner.name,
        specialty=practitioner.specialty,
        experience=practitioner.experience
    )

    db.add(new_practitioner)
    db.commit()
    db.refresh(new_practitioner)

    return {
        "message": "Practitioner added successfully",
        "data": new_practitioner
    }

@router.get("/practitioners",
            tags=["Practitioners"],
    summary="Get All Practitioners")
def get_practitioners(
    db: Session = Depends(get_db)
):
    return db.query(Practitioner).all()

@router.get("/practitioners/{practitioner_id}",
            tags=["Practitioners"],
    summary="Get Practitioner By ID")
def get_practitioner(
    practitioner_id: int,
    db: Session = Depends(get_db)
):
    practitioner = (
        db.query(Practitioner)
        .filter(Practitioner.id == practitioner_id)
        .first()
    )

    if not practitioner:
        return {"message": "Practitioner not found"}

    return practitioner

@router.get("/recommend-practitioner")
def recommend_practitioner_endpoint(
    specialty: str,
    db: Session = Depends(get_db)
):
    return recommend_practitioner(db, specialty)