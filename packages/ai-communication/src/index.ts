/**
 * ChangeForge AI Communication Package
 *
 * TypeScript types and utilities for the LangGraph-based nudge agent.
 * The Python implementation lives in apps/nudge-engine.
 */

import type { ADKARStage, NudgeChannel, BehavioralProfile } from '@changeforge/shared';

// ──────────────────────────────────────────────
// Agent Input / Output Types
// ──────────────────────────────────────────────

export interface NudgeRequest {
  userId: string;
  initiativeId: string;
  adkarStage: ADKARStage;
  channel: NudgeChannel;
  profile: BehavioralProfile;
  context?: string;
}

export interface NudgeResponse {
  message: string;
  subject?: string;           // for email channel
  callToAction?: string;
  confidence: number;         // 0–1 (LLM confidence)
  generatedAt: string;        // ISO timestamp
  modelUsed: 'llm' | 'template';
}

// ──────────────────────────────────────────────
// Prompt Building Helpers
// ──────────────────────────────────────────────

const STAGE_GOALS: Record<ADKARStage, string> = {
  awareness: 'criar consciência sobre por que a mudança é necessária',
  desire: 'despertar o desejo pessoal de participar e apoiar a mudança',
  knowledge: 'fornecer o conhecimento sobre como a mudança funciona',
  ability: 'desenvolver a habilidade e confiança para executar',
  reinforcement: 'reforçar e celebrar o progresso para sustentar a mudança',
};

const PROFILE_TONE: Record<BehavioralProfile, string> = {
  early_adopter: 'entusiasmado, empoderador, focado em protagonismo',
  pragmatic: 'direto, focado em ROI pessoal e eficiência',
  vocal_skeptic: 'empático, reconhecendo preocupações legítimas, baseado em evidências',
  silent: 'gentil, de baixo atrito, com micro-comprometimento claro',
  influencer: 'estratégico, reconhecendo liderança, focado em impacto coletivo',
};

/**
 * Build a prompt for the nudge LLM agent.
 */
export function buildNudgePrompt(request: NudgeRequest): string {
  const goal = STAGE_GOALS[request.adkarStage];
  const tone = PROFILE_TONE[request.profile];

  return `Você é um especialista em Change Management e Behavioral Economics.
Escreva um ${request.channel === 'email' ? 'email' : 'mensagem curta'} para ${goal}.

Perfil do usuário: ${request.profile}
Tom desejado: ${tone}
Canal: ${request.channel}
${request.context ? `Contexto adicional: ${request.context}` : ''}

Requisitos:
- Máximo de ${request.channel === 'email' ? '200' : '80'} palavras
- Use a Nudge Theory (social proof, commitment, loss aversion quando apropriado)
- Inclua um call-to-action específico e de baixo atrito
- Não use jargões corporativos
- Seja genuíno e humano

Responda com JSON: { "message": "...", "subject": "...", "callToAction": "..." }`;
}

// ──────────────────────────────────────────────
// Fallback Templates
// ──────────────────────────────────────────────

export const FALLBACK_TEMPLATES: Record<ADKARStage, Record<NudgeChannel, string>> = {
  awareness: {
    email: 'Olá! Temos uma mudança importante chegando. Entender o porquê faz toda a diferença.',
    slack: '👋 Uma mudança está chegando. Saiba o porquê: [link]',
    teams: '📢 Informação importante sobre nossa próxima mudança organizacional.',
    in_app: 'Você sabia? Esta mudança vai impactar positivamente seu dia a dia.',
    push: 'Nova mudança chegando! Clique para saber mais.',
  },
  desire: {
    email: 'Seus colegas já estão percebendo os benefícios. Você também pode!',
    slack: '🌟 85% do time já aderiu. Que tal dar o próximo passo?',
    teams: '💡 Veja como esta mudança pode beneficiar diretamente você.',
    in_app: 'Junte-se ao seu time nesta jornada de transformação.',
    push: 'Seu time está avançando. Venha junto!',
  },
  knowledge: {
    email: 'Preparamos um guia rápido (5 min) para você dominar a nova ferramenta.',
    slack: '📚 Recurso de aprendizado disponível: [link] – leva menos de 5 minutos.',
    teams: '🎓 Novo tutorial disponível para você começar com o pé direito.',
    in_app: 'Aprenda o essencial em 3 passos simples.',
    push: 'Novo conteúdo de aprendizado disponível!',
  },
  ability: {
    email: 'Que tal praticar hoje? Um passo pequeno já conta.',
    slack: '💪 Pratique agora: [link]. Leva 2 minutos e já vale pontos!',
    teams: '🛠️ Hora de colocar em prática! Aqui está como começar.',
    in_app: 'Tente agora! Complete sua primeira ação e ganhe 50 pontos.',
    push: 'Hora de praticar! Ganhe pontos agora.',
  },
  reinforcement: {
    email: 'Incrível progresso! Continue assim e inspire seu time.',
    slack: '🎉 Parabéns! Você está entre os top adotantes da sua área!',
    teams: '🏆 Sua evolução é notável. Veja como você impactou o time.',
    in_app: 'Você está no top 10%! Continue e desbloqueie o próximo badge.',
    push: 'Você está arrasando! Veja seu progresso.',
  },
};
