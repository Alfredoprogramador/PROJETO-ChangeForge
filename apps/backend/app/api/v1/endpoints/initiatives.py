"""Initiatives CRUD endpoints."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.models import Initiative
from app.schemas.schemas import InitiativeCreate, InitiativeResponse, InitiativeUpdate

router = APIRouter()

DbDep = Annotated[AsyncSession, Depends(get_db)]


@router.get("/", response_model=list[InitiativeResponse])
async def list_initiatives(db: DbDep) -> list[Initiative]:
    result = await db.execute(select(Initiative).order_by(Initiative.created_at.desc()))
    return list(result.scalars().all())


@router.get("/{initiative_id}", response_model=InitiativeResponse)
async def get_initiative(initiative_id: uuid.UUID, db: DbDep) -> Initiative:
    obj = await db.get(Initiative, initiative_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found")
    return obj


@router.post("/", response_model=InitiativeResponse, status_code=status.HTTP_201_CREATED)
async def create_initiative(
    payload: InitiativeCreate,
    db: DbDep,
) -> Initiative:
    # Placeholder owner – in production this comes from the auth token
    obj = Initiative(
        **payload.model_dump(),
        owner_id=uuid.uuid4(),
    )
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj


@router.patch("/{initiative_id}", response_model=InitiativeResponse)
async def update_initiative(
    initiative_id: uuid.UUID,
    payload: InitiativeUpdate,
    db: DbDep,
) -> Initiative:
    obj = await db.get(Initiative, initiative_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    await db.commit()
    await db.refresh(obj)
    return obj


@router.delete("/{initiative_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_initiative(initiative_id: uuid.UUID, db: DbDep) -> None:
    obj = await db.get(Initiative, initiative_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Initiative not found")
    await db.delete(obj)
    await db.commit()
