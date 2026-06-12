from fastapi import APIRouter
from app.data.mock_salons import mock_salons

router = APIRouter(tags=["External Salons"])


@router.get("/external-salons")
def get_external_salons():
    return mock_salons


@router.get("/external-salons/search")
def search_external_salons(city: str):

    return [
        salon
        for salon in mock_salons
        if salon["city"].lower() == city.lower()
    ]