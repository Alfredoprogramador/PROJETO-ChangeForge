"""Initial schema

Revision ID: 001_initial
Revises:
Create Date: 2026-05-29
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID

revision: str = "001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "initiatives",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("description", sa.Text, nullable=False),
        sa.Column("status", sa.String(20), server_default="draft"),
        sa.Column("risk_level", sa.String(20), server_default="medium"),
        sa.Column("start_date", sa.DateTime, nullable=False),
        sa.Column("end_date", sa.DateTime),
        sa.Column("owner_id", UUID(as_uuid=True), nullable=False),
        sa.Column("departments", ARRAY(sa.String)),
        sa.Column("technologies", ARRAY(sa.String)),
        sa.Column("adoption_rate", sa.Float, server_default="0"),
        sa.Column("adkar_scores", JSONB, server_default="{}"),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now(), onupdate=sa.func.now()),
    )

    op.create_table(
        "surveys",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("initiative_id", UUID(as_uuid=True), sa.ForeignKey("initiatives.id"), nullable=False),
        sa.Column("title", sa.String(300), nullable=False),
        sa.Column("questions", JSONB, server_default="[]"),
        sa.Column("target_departments", ARRAY(sa.String)),
        sa.Column("scheduled_at", sa.DateTime),
        sa.Column("completed_at", sa.DateTime),
        sa.Column("response_rate", sa.Float, server_default="0"),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "survey_responses",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("survey_id", UUID(as_uuid=True), sa.ForeignKey("surveys.id"), nullable=False),
        sa.Column("user_id", UUID(as_uuid=True), nullable=False),
        sa.Column("answers", JSONB, server_default="{}"),
        sa.Column("sentiment_score", sa.Float),
        sa.Column("submitted_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "nudges",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("initiative_id", UUID(as_uuid=True), sa.ForeignKey("initiatives.id"), nullable=False),
        sa.Column("recipient_id", UUID(as_uuid=True), nullable=False),
        sa.Column("channel", sa.String(20), nullable=False),
        sa.Column("subject", sa.String(300)),
        sa.Column("body", sa.Text, nullable=False),
        sa.Column("adkar_stage", sa.String(30), nullable=False),
        sa.Column("status", sa.String(20), server_default="pending"),
        sa.Column("scheduled_at", sa.DateTime, nullable=False),
        sa.Column("sent_at", sa.DateTime),
        sa.Column("opened_at", sa.DateTime),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "user_adoption_events",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", UUID(as_uuid=True), nullable=False),
        sa.Column("initiative_id", UUID(as_uuid=True), nullable=False),
        sa.Column("tool_id", sa.String(100), nullable=False),
        sa.Column("event_type", sa.String(50), nullable=False),
        sa.Column("event_metadata", JSONB, server_default="{}"),
        sa.Column("occurred_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "gamification_points",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", UUID(as_uuid=True), unique=True, nullable=False),
        sa.Column("total_points", sa.Integer, server_default="0"),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )

    # Indexes for common query patterns
    op.create_index("ix_initiatives_status", "initiatives", ["status"])
    op.create_index("ix_nudges_recipient_id", "nudges", ["recipient_id"])
    op.create_index("ix_nudges_status", "nudges", ["status"])
    op.create_index("ix_user_adoption_events_user_id", "user_adoption_events", ["user_id"])
    op.create_index("ix_user_adoption_events_occurred_at", "user_adoption_events", ["occurred_at"])


def downgrade() -> None:
    op.drop_table("gamification_points")
    op.drop_table("user_adoption_events")
    op.drop_table("nudges")
    op.drop_table("survey_responses")
    op.drop_table("surveys")
    op.drop_table("initiatives")
