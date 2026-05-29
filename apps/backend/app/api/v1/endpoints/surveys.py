"""Surveys endpoints."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.models import Survey
from app.schemas.schemas import SurveyCreate, SurveyResponse

router = APIRouter()

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.get("/", response_model=list[SurveyResponse])
async def list_surveys(db: DbDep) -> list[Survey]:
    result = await db.execute(select(Survey).order_by(Survey.created_at.desc()))
    return list(result.scalars().all())


@router.get("/{survey_id}", response_model=SurveyResponse)
async def get_survey(survey_id: uuid.UUID, db: DbDep) -> Survey:
    obj = await db.get(Survey, survey_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Survey not found")
    return obj


@router.post("/", response_model=SurveyResponse, status_code=status.HTTP_201_CREATED)
async def create_survey(payload: SurveyCreate, db: DbDep) -> Survey:
    obj = Survey(
        **payload.model_dump(),
        questions=[q.model_dump() for q in payload.questions],
    )
    # questions already set above; clear duplicates from model_dump
    obj.questions = [q.model_dump() for q in payload.questions]
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
