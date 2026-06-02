from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.review_schema import ReviewCreate

from app.models.review_model import Review

from app.services.review_service import create_review

router = APIRouter()


@router.post("/reviews",
             tags=["Reviews"],
    summary="Add Review"
    )
def add_review(
    review: ReviewCreate,
    db: Session = Depends(get_db)
):
    return create_review(db, review)


@router.get("/reviews",
             tags=["Reviews"],
    summary="Get All Reviews"
    )
def get_reviews(
    db: Session = Depends(get_db)
):
    return db.query(Review).all()


@router.get("/reviews/{salon_id}")
def get_salon_reviews(
    salon_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Review).filter(
        Review.salon_id == salon_id
    ).all()