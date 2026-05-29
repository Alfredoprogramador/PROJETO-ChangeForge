"""Pydantic v2 schemas for ChangeForge API."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


# ──────────────────────────────────────────────
# ADKAR
# ──────────────────────────────────────────────


class ADKARScoreSchema(BaseModel):
    awareness: float = Field(ge=0, le=100)
    desire: float = Field(ge=0, le=100)
    knowledge: float = Field(ge=0, le=100)
    ability: float = Field(ge=0, le=100)
    reinforcement: float = Field(ge=0, le=100)


# ──────────────────────────────────────────────
# Initiative
# ──────────────────────────────────────────────


class InitiativeCreate(BaseModel):
    name: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=10)
    status: str = "draft"
    risk_level: str = "medium"
    start_date: datetime
    end_date: Optional[datetime] = None
    departments: list[str] = []
    technologies: list[str] = []


class InitiativeUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    risk_level: Optional[str] = None
    end_date: Optional[datetime] = None
    departments: Optional[list[str]] = None
    technologies: Optional[list[str]] = None
    adoption_rate: Optional[float] = None
    adkar_scores: Optional[ADKARScoreSchema] = None


class InitiativeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str
    status: str
    risk_level: str
    start_date: datetime
    end_date: Optional[datetime]
    owner_id: uuid.UUID
    departments: list[str]
    technologies: list[str]
    adoption_rate: float
    adkar_scores: dict[str, Any]
    created_at: datetime
    updated_at: datetime


# ──────────────────────────────────────────────
# Survey
# ──────────────────────────────────────────────


class SurveyQuestionSchema(BaseModel):
    id: str
    text: str
    type: str
    options: Optional[list[str]] = None
    adkar_stage: Optional[str] = None


class SurveyCreate(BaseModel):
    initiative_id: uuid.UUID
    title: str = Field(min_length=3, max_length=300)
    questions: list[SurveyQuestionSchema]
    target_departments: list[str]
    scheduled_at: Optional[datetime] = None


class SurveyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    initiative_id: uuid.UUID
    title: str
    questions: list[Any]
    target_departments: list[str]
    scheduled_at: Optional[datetime]
    completed_at: Optional[datetime]
    response_rate: float
    created_at: datetime


# ──────────────────────────────────────────────
# Nudge
# ──────────────────────────────────────────────


class NudgeGenerateRequest(BaseModel):
    initiative_id: uuid.UUID
    recipient_id: uuid.UUID
    channel: str
    adkar_stage: str
    context: Optional[dict[str, Any]] = None


class NudgeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    initiative_id: uuid.UUID
    recipient_id: uuid.UUID
    channel: str
    subject: Optional[str]
    body: str
    adkar_stage: str
    status: str
    scheduled_at: datetime
    sent_at: Optional[datetime]
    opened_at: Optional[datetime]
    created_at: datetime


# ──────────────────────────────────────────────
# Adoption Metrics
# ──────────────────────────────────────────────


class AdoptionMetricSchema(BaseModel):
    department_id: str
    tool_id: str
    tool_name: str
    active_users: int
    total_users: int
    adoption_rate: float
    weekly_growth: float


class ResistanceHeatmapSchema(BaseModel):
    department_id: str
    department_name: str
    resistance_score: float
    top_barriers: list[str]
    influencer_count: int


# ──────────────────────────────────────────────
# Gamification
# ──────────────────────────────────────────────


class LeaderboardEntrySchema(BaseModel):
    rank: int
    user_id: str
    user_name: str
    department: str
    points: int
    badges: int
    trend: str


# ──────────────────────────────────────────────
# Pagination
# ──────────────────────────────────────────────


class PaginatedResponse(BaseModel):
    data: list[Any]
    total: int
    page: int
    page_size: int
    total_pages: int
