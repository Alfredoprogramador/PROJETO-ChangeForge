"""Tests for the NudgeService template fallback (no AI key required)."""

import pytest

from app.services.nudge_service import NudgeService


@pytest.mark.asyncio
async def test_nudge_service_fallback_awareness() -> None:
    service = NudgeService()
    result = service._template_fallback("awareness", "email")
    assert "subject" in result
    assert "body" in result
    assert len(result["body"]) > 10


@pytest.mark.asyncio
async def test_nudge_service_fallback_all_stages() -> None:
    service = NudgeService()
    stages = ["awareness", "desire", "knowledge", "ability", "reinforcement"]
    for stage in stages:
        result = service._template_fallback(stage, "slack")
        assert result["subject"], f"Missing subject for stage {stage}"
        assert result["body"], f"Missing body for stage {stage}"


@pytest.mark.asyncio
async def test_nudge_service_generate_uses_fallback_without_key() -> None:
    """Without an API key the service should fall back to templates gracefully."""
    import os

    # Temporarily clear the key
    original = os.environ.get("OPENAI_API_KEY", "")
    os.environ["OPENAI_API_KEY"] = ""

    service = NudgeService()
    result = await service.generate("desire", "slack", {"department": "TI"})
    assert "body" in result

    os.environ["OPENAI_API_KEY"] = original
