from app.models.review_model import Review
from app.services.log_service import create_log

def create_review(db, review):
    new_review = Review(
        customer_name=review.customer_name,
        rating=review.rating,
        comment=review.comment,
        salon_id=review.salon_id
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    create_log(
    db,
    "ADD_REVIEW",
    review.customer_name
)
    return new_review