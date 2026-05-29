"""Pydantic v2 schemas for ChangeForge API."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any

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
    end_date: datetime | None = None
    departments: list[str] = []
    technologies: list[str] = []


class InitiativeUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None
    risk_level: str | None = None
    end_date: datetime | None = None
    departments: list[str] | None = None
    technologies: list[str] | None = None
    adoption_rate: float | None = None
    adkar_scores: ADKARScoreSchema | None = None


class InitiativeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str
    status: str
    risk_level: str
    start_date: datetime
    end_date: datetime | None
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
    options: list[str] | None = None
    adkar_stage: str | None = None


class SurveyCreate(BaseModel):
    initiative_id: uuid.UUID
    title: str = Field(min_length=3, max_length=300)
    questions: list[SurveyQuestionSchema]
    target_departments: list[str]
    scheduled_at: datetime | None = None


class SurveyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    initiative_id: uuid.UUID
    title: str
    questions: list[Any]
    target_departments: list[str]
    scheduled_at: datetime | None
    completed_at: datetime | None
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
    context: dict[str, Any] | None = None


class NudgeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    initiative_id: uuid.UUID
    recipient_id: uuid.UUID
    channel: str
    subject: str | None
    body: str
    adkar_stage: str
    status: str
    scheduled_at: datetime
    sent_at: datetime | None
    opened_at: datetime | None
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
