"""AI-powered nudge generation service using LangGraph / LangChain."""

from __future__ import annotations

import logging
from typing import Any, cast

from pydantic import SecretStr

logger = logging.getLogger(__name__)

ADKAR_PROMPTS: dict[str, str] = {
    "awareness": (
        "You are an expert change management communicator. Write a compelling message that "
        "builds AWARENESS about why this organizational change matters. Focus on the business "
        "rationale, risks of not changing, and what success looks like. Be concise and empathetic."
    ),
    "desire": (
        "Write a message that builds DESIRE and personal motivation to embrace this change. "
        "Focus on personal benefits, team success stories, and emotional connection to the change. "
        "Use behavioural nudge theory (BJ Fogg) principles."
    ),
    "knowledge": (
        "Write an educational message that improves KNOWLEDGE about how to adopt the new tool or "
        "process. Include a practical tip or micro-learning step. Keep it actionable and brief."
    ),
    "ability": (
        "Write a message that builds ABILITY by encouraging practice. "
        "Suggest a specific micro-task "
        "the recipient can do in the next 5 minutes to apply their knowledge. Celebrate small wins."
    ),
    "reinforcement": (
        "Write a REINFORCEMENT message that celebrates progress and sustains the change. "
        "Acknowledge achievements, share social proof, and remind recipients why this matters "
        "long-term. Use gamification language where appropriate."
    ),
}

CHANNEL_TONE: dict[str, str] = {
    "slack": "casual, emoji-friendly, short (max 3 sentences)",
    "email": "professional, structured, up to 5 sentences with a CTA",
    "teams": "semi-formal, concise, max 3 sentences",
    "in_app": "micro-copy, 1-2 sentences, action-oriented",
}


class NudgeService:
    """Generates personalised nudges using OpenAI via LangChain.

    Falls back to template-based nudges when the API key is not configured.
    """

    async def generate(
        self,
        adkar_stage: str,
        channel: str,
        context: dict[str, Any],
    ) -> dict[str, str]:
        """Return a dict with 'subject' and 'body' for the nudge."""
        try:
            return await self._generate_with_ai(adkar_stage, channel, context)
        except Exception as exc:  # noqa: BLE001
            logger.warning("AI nudge generation failed (%s), using template fallback.", exc)
            return self._template_fallback(adkar_stage, channel)

    async def _generate_with_ai(
        self,
        adkar_stage: str,
        channel: str,
        context: dict[str, Any],
    ) -> dict[str, str]:
        from langchain.schema import HumanMessage, SystemMessage  # noqa: PLC0415
        from langchain_openai import ChatOpenAI  # noqa: PLC0415

        from app.core.config import settings  # noqa: PLC0415

        if not settings.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY not configured")

        system_prompt = ADKAR_PROMPTS.get(adkar_stage, ADKAR_PROMPTS["awareness"])
        tone = CHANNEL_TONE.get(channel, "professional")
        user_prompt = (
            f"Channel tone: {tone}.\n"
            f"Context: {context}.\n"
            "Respond with JSON: {{\"subject\": \"...\", \"body\": \"...\"}}"
        )

        llm = ChatOpenAI(model=settings.OPENAI_MODEL, api_key=SecretStr(settings.OPENAI_API_KEY))
        response = await llm.ainvoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt),
        ])
        import json  # noqa: PLC0415
        content = response.content if isinstance(response.content, str) else str(response.content)
        return cast(dict[str, str], json.loads(content))

    def _template_fallback(self, adkar_stage: str, channel: str) -> dict[str, str]:
        templates: dict[str, dict[str, str]] = {
            "awareness": {
                "subject": "Por que essa mudança é importante para você",
                "body": (
                    "Esta transformação vai impactar positivamente sua rotina diária. "
                    "Entender o 'porquê' é o primeiro passo. Saiba mais clicando aqui."
                ),
            },
            "desire": {
                "subject": "Seu time está avançando – junte-se a eles!",
                "body": (
                    "72% do seu departamento já começou a jornada. "
                    "Colaboradores que adotaram cedo relatam 30% mais produtividade. "
                    "Que tal dar o primeiro passo hoje?"
                ),
            },
            "knowledge": {
                "subject": "Tutorial rápido: aprenda em 5 minutos",
                "body": (
                    "Preparamos um guia passo-a-passo especialmente para seu perfil. "
                    "São apenas 5 minutos e você estará pronto para usar a ferramenta."
                ),
            },
            "ability": {
                "subject": "Micro-desafio de hoje: experimente agora!",
                "body": (
                    "Sua missão de hoje: complete UMA ação na nova ferramenta. "
                    "Sugestão: agende sua próxima reunião pelo novo sistema. "
                    "Você ganha 50 pontos ao completar!"
                ),
            },
            "reinforcement": {
                "subject": "Parabéns! Você está fazendo a diferença 🎉",
                "body": (
                    "Você está entre os top 25% de adotantes do seu departamento. "
                    "Continue assim – seu engajamento inspira seu time!"
                ),
            },
        }
        return templates.get(adkar_stage, templates["awareness"])
