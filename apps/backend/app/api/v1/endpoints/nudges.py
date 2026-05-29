"""Nudge generation and management endpoints."""

import uuid
from datetime import datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.models import Nudge
from app.schemas.schemas import NudgeGenerateRequest, NudgeResponse
from app.services.nudge_service import NudgeService

router = APIRouter()

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.get("/", response_model=list[NudgeResponse])
async def list_nudges(db: DbDep) -> list[Nudge]:
    result = await db.execute(select(Nudge).order_by(Nudge.scheduled_at.desc()))
    return list(result.scalars().all())


@router.post(
    "/generate",
    response_model=NudgeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def generate_nudge(payload: NudgeGenerateRequest, db: DbDep) -> Nudge:
    """Use the AI nudge service to generate a personalised nudge."""
    service = NudgeService()
    content = await service.generate(
        adkar_stage=payload.adkar_stage,
        channel=payload.channel,
        context=payload.context or {},
    )

    nudge = Nudge(
        initiative_id=payload.initiative_id,
        recipient_id=payload.recipient_id,
        channel=payload.channel,
        subject=content.get("subject"),
        body=content["body"],
        adkar_stage=payload.adkar_stage,
        status="pending",
        scheduled_at=datetime.now(tz=timezone.utc),
    )
    db.add(nudge)
    await db.commit()
    await db.refresh(nudge)
    return nudge


@router.patch("/{nudge_id}/status", response_model=NudgeResponse)
async def update_nudge_status(
    nudge_id: uuid.UUID,
    new_status: str,
    db: DbDep,
) -> Nudge:
    nudge = await db.get(Nudge, nudge_id)
    if not nudge:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nudge not found")
    nudge.status = new_status
    if new_status == "sent":
        nudge.sent_at = datetime.now(tz=timezone.utc)
    elif new_status == "opened":
        nudge.opened_at = datetime.now(tz=timezone.utc)
    await db.commit()
    await db.refresh(nudge)
    return nudge
