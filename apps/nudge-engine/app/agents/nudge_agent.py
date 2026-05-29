"""LangGraph-based nudge generation agent."""

from __future__ import annotations

import json
import logging
from typing import Any, TypedDict

logger = logging.getLogger(__name__)


class NudgeState(TypedDict):
    adkar_stage: str
    channel: str
    recipient_profile: dict[str, Any]
    initiative_context: dict[str, Any]
    generated_nudge: dict[str, str]
    error: str | None


def build_nudge_graph():  # type: ignore[return]
    """Build and return a compiled LangGraph for nudge generation.

    Returns None when LangGraph / OpenAI dependencies are not available.
    """
    try:
        from langgraph.graph import END, StateGraph  # noqa: PLC0415
        from langchain_openai import ChatOpenAI  # noqa: PLC0415
        from langchain.schema import HumanMessage, SystemMessage  # noqa: PLC0415

        from app.prompts.adkar_prompts import (  # noqa: PLC0415
            CHANNEL_INSTRUCTIONS,
            OUTPUT_FORMAT,
            SYSTEM_PROMPTS,
        )

        def generate_node(state: NudgeState) -> NudgeState:
            """Call the LLM to generate the nudge content."""
            import os  # noqa: PLC0415

            api_key = os.environ.get("OPENAI_API_KEY", "")
            if not api_key:
                state["generated_nudge"] = _fallback_nudge(state["adkar_stage"], state["channel"])
                return state

            system_prompt = SYSTEM_PROMPTS.get(state["adkar_stage"], SYSTEM_PROMPTS["awareness"])
            channel_instr = CHANNEL_INSTRUCTIONS.get(state["channel"], CHANNEL_INSTRUCTIONS["email"])
            user_message = (
                f"Channel guidelines: {channel_instr}\n"
                f"Recipient profile: {json.dumps(state['recipient_profile'])}\n"
                f"Initiative context: {json.dumps(state['initiative_context'])}\n"
                f"{OUTPUT_FORMAT}"
            )

            llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key, temperature=0.7)
            response = llm.invoke([
                SystemMessage(content=system_prompt),
                HumanMessage(content=user_message),
            ])

            try:
                state["generated_nudge"] = json.loads(response.content)
            except json.JSONDecodeError:
                state["generated_nudge"] = {
                    "subject": "Update on your change journey",
                    "body": response.content,
                    "cta_text": "Learn more",
                    "cta_url": "",
                }
            return state

        def validate_node(state: NudgeState) -> NudgeState:
            """Validate the generated nudge has required fields."""
            nudge = state.get("generated_nudge", {})
            required = ["subject", "body"]
            if not all(k in nudge for k in required):
                state["error"] = "Generated nudge missing required fields"
                state["generated_nudge"] = _fallback_nudge(state["adkar_stage"], state["channel"])
            return state

        graph = StateGraph(NudgeState)
        graph.add_node("generate", generate_node)
        graph.add_node("validate", validate_node)
        graph.set_entry_point("generate")
        graph.add_edge("generate", "validate")
        graph.add_edge("validate", END)

        return graph.compile()

    except ImportError as exc:
        logger.warning("LangGraph not available (%s), using template-only mode.", exc)
        return None


def _fallback_nudge(adkar_stage: str, channel: str) -> dict[str, str]:
    """Return a template nudge when AI generation is unavailable."""
    from app.prompts.adkar_prompts import SYSTEM_PROMPTS  # noqa: PLC0415

    fallbacks: dict[str, dict[str, str]] = {
        "awareness": {
            "subject": "Por que essa mudança é importante para você",
            "body": "Esta transformação impactará positivamente sua rotina. Entender o 'porquê' é o primeiro passo para uma transição bem-sucedida.",
            "cta_text": "Saiba mais",
            "cta_url": "",
        },
        "desire": {
            "subject": "Seu time está avançando – junte-se a eles! 🚀",
            "body": "72% do seu departamento já começou a jornada. Colaboradores que adotaram cedo relatam 30% mais produtividade.",
            "cta_text": "Começar agora",
            "cta_url": "",
        },
        "knowledge": {
            "subject": "Tutorial rápido: aprenda em 5 minutos 📚",
            "body": "Preparamos um guia passo-a-passo para o seu perfil. São apenas 5 minutos para você dominar a ferramenta.",
            "cta_text": "Ver tutorial",
            "cta_url": "",
        },
        "ability": {
            "subject": "Micro-desafio de hoje: experimente agora! ⚡",
            "body": "Sua missão: complete UMA ação na nova ferramenta hoje. Você ganha 50 pontos ao completar! Simples e rápido.",
            "cta_text": "Aceitar desafio",
            "cta_url": "",
        },
        "reinforcement": {
            "subject": "Parabéns! Você está fazendo a diferença 🎉",
            "body": "Você está entre os top 25% de adotantes do seu departamento. Continue assim – seu engajamento inspira seu time!",
            "cta_text": "Ver meu progresso",
            "cta_url": "",
        },
    }
    return fallbacks.get(adkar_stage, fallbacks["awareness"])
