"""Nudge engine HTTP router."""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.nudge_agent import NudgeState, _fallback_nudge, build_nudge_graph

router = APIRouter()

# Build the graph once at startup (may be None if deps unavailable)
_graph = build_nudge_graph()


class GenerateNudgeRequest(BaseModel):
    adkar_stage: str
    channel: str
    recipient_profile: dict[str, Any] = {}
    initiative_context: dict[str, Any] = {}


class GeneratedNudge(BaseModel):
    subject: str
    body: str
    cta_text: str = "Saiba mais"
    cta_url: str = ""
    adkar_stage: str
    channel: str
    ai_generated: bool


@router.post("/generate", response_model=GeneratedNudge)
async def generate_nudge(payload: GenerateNudgeRequest) -> GeneratedNudge:
    """Generate a personalised nudge via LangGraph or template fallback."""
    if _graph is not None:
        initial_state = NudgeState(
            adkar_stage=payload.adkar_stage,
            channel=payload.channel,
            recipient_profile=payload.recipient_profile,
            initiative_context=payload.initiative_context,
            generated_nudge={},
            error=None,
        )
        final_state = _graph.invoke(initial_state)
        content = final_state["generated_nudge"]
        ai_generated = final_state.get("error") is None
    else:
        content = _fallback_nudge(payload.adkar_stage, payload.channel)
        ai_generated = False

    return GeneratedNudge(
        subject=content.get("subject", ""),
        body=content.get("body", ""),
        cta_text=content.get("cta_text", "Saiba mais"),
        cta_url=content.get("cta_url", ""),
        adkar_stage=payload.adkar_stage,
        channel=payload.channel,
        ai_generated=ai_generated,
    )
