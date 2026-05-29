/**
 * ChangeForge Gamification Engine
 *
 * Handles point calculation, badge awarding, and leaderboard management.
 */

import type { Badge, BadgeType, LeaderboardEntry, UserBadge } from '@changeforge/shared';

// ──────────────────────────────────────────────
// Point Rules
// ──────────────────────────────────────────────

export const POINT_RULES = {
  surveyCompleted: 100,
  toolAdoptionEvent: 50,
  loginStreak7Days: 250,
  loginStreak30Days: 1000,
  nudgeOpened: 20,
  nudgeClicked: 50,
  trainingCompleted: 300,
  adkarScoreImprovement10pts: 200,
} as const;

export type PointEventType = keyof typeof POINT_RULES;

// ──────────────────────────────────────────────
// Badge Definitions
// ──────────────────────────────────────────────

export const BADGE_DEFINITIONS: Record<BadgeType, Omit<Badge, 'id'>> = {
  early_adopter: {
    type: 'early_adopter',
    name: 'Early Adopter',
    description: 'Primeiro do departamento a adotar a nova ferramenta',
    iconUrl: '/badges/early-adopter.svg',
    pointsValue: 500,
  },
  survey_champion: {
    type: 'survey_champion',
    name: 'Survey Champion',
    description: 'Respondeu 10 Pulse Surveys consecutivas',
    iconUrl: '/badges/survey-champion.svg',
    pointsValue: 300,
  },
  knowledge_seeker: {
    type: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Completou todos os treinamentos disponíveis',
    iconUrl: '/badges/knowledge-seeker.svg',
    pointsValue: 400,
  },
  change_ambassador: {
    type: 'change_ambassador',
    name: 'Change Ambassador',
    description: 'Influenciou positivamente 5+ colegas na adoção',
    iconUrl: '/badges/change-ambassador.svg',
    pointsValue: 800,
  },
  streak_7_days: {
    type: 'streak_7_days',
    name: '7-Day Streak',
    description: 'Utilizou a ferramenta por 7 dias consecutivos',
    iconUrl: '/badges/streak-7.svg',
    pointsValue: 250,
  },
  team_motivator: {
    type: 'team_motivator',
    name: 'Team Motivator',
    description: 'Seu time atingiu 80% de adoção',
    iconUrl: '/badges/team-motivator.svg',
    pointsValue: 600,
  },
};

// ──────────────────────────────────────────────
// Point Calculator
// ──────────────────────────────────────────────

export function calculatePoints(event: PointEventType, multiplier = 1): number {
  return POINT_RULES[event] * multiplier;
}

// ──────────────────────────────────────────────
// Badge Eligibility
// ──────────────────────────────────────────────

export interface UserStats {
  consecutiveSurveys: number;
  loginStreakDays: number;
  trainingsCompleted: number;
  trainingsTotal: number;
  influencedColleagues: number;
  teamAdoptionRate: number;
  isFirstInDepartment: boolean;
}

export function evaluateBadges(stats: UserStats, existing: BadgeType[]): BadgeType[] {
  const awarded: BadgeType[] = [];

  if (stats.isFirstInDepartment && !existing.includes('early_adopter')) {
    awarded.push('early_adopter');
  }
  if (stats.consecutiveSurveys >= 10 && !existing.includes('survey_champion')) {
    awarded.push('survey_champion');
  }
  if (
    stats.trainingsCompleted >= stats.trainingsTotal &&
    stats.trainingsTotal > 0 &&
    !existing.includes('knowledge_seeker')
  ) {
    awarded.push('knowledge_seeker');
  }
  if (stats.influencedColleagues >= 5 && !existing.includes('change_ambassador')) {
    awarded.push('change_ambassador');
  }
  if (stats.loginStreakDays >= 7 && !existing.includes('streak_7_days')) {
    awarded.push('streak_7_days');
  }
  if (stats.teamAdoptionRate >= 80 && !existing.includes('team_motivator')) {
    awarded.push('team_motivator');
  }

  return awarded;
}

// ──────────────────────────────────────────────
// Leaderboard Sorting
// ──────────────────────────────────────────────

export function buildLeaderboard(entries: Omit<LeaderboardEntry, 'rank'>[]): LeaderboardEntry[] {
  return entries
    .sort((a, b) => b.points - a.points)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
