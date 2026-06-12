from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.appointment_model import Appointment
from app.dependencies import admin_required

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/dashboard/revenue",
            tags=["Analytics"],
    summary="Revenue Dashboard",
    description="Get total revenue from completed appointments"
    )
def revenue_dashboard(
    current_user=Depends(admin_required),
    db: Session = Depends(get_db)
):
    revenue = db.query(
        func.sum(Appointment.service_price)
    ).filter(
        Appointment.status == "completed"
    ).scalar()

    return {
        "total_revenue": revenue or 0
    }