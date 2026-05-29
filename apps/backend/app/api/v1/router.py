"""Top-level API v1 router."""

from fastapi import APIRouter

from app.api.v1.endpoints import adoption, gamification, initiatives, nudges, network, surveys

api_router = APIRouter()

api_router.include_router(initiatives.router, prefix="/initiatives", tags=["initiatives"])
api_router.include_router(surveys.router, prefix="/surveys", tags=["surveys"])
api_router.include_router(nudges.router, prefix="/nudges", tags=["nudges"])
api_router.include_router(adoption.router, prefix="/adoption", tags=["adoption"])
api_router.include_router(gamification.router, prefix="/gamification", tags=["gamification"])
api_router.include_router(network.router, prefix="/network", tags=["network"])
