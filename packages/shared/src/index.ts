// ─────────────────────────────────────────────
// ADKAR Model Types
// ─────────────────────────────────────────────

export type ADKARStage = 'awareness' | 'desire' | 'knowledge' | 'ability' | 'reinforcement';

export interface ADKARScore {
  awareness: number;   // 0–100
  desire: number;
  knowledge: number;
  ability: number;
  reinforcement: number;
}

// ─────────────────────────────────────────────
// Change Initiative
// ─────────────────────────────────────────────

export type InitiativeStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type InitiativeRisk = 'low' | 'medium' | 'high' | 'critical';

export interface ChangeInitiative {
  id: string;
  name: string;
  description: string;
  status: InitiativeStatus;
  riskLevel: InitiativeRisk;
  startDate: string;          // ISO 8601
  endDate?: string;
  ownerId: string;
  departments: string[];
  technologies: string[];
  adkarScores: ADKARScore;
  adoptionRate: number;        // 0–100 percent
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// User & Role
// ─────────────────────────────────────────────

export type UserRole = 'admin' | 'change_manager' | 'department_lead' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  jobTitle?: string;
  avatarUrl?: string;
  adkarScore?: ADKARScore;
  resistanceLevel?: number;   // 0–100
  gamificationPoints?: number;
  createdAt: string;
}

// ─────────────────────────────────────────────
// Department
// ─────────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  parentId?: string;
  headUserId?: string;
  memberCount: number;
  adoptionRate: number;
  resistanceScore: number;
}

// ─────────────────────────────────────────────
// Pulse Survey
// ─────────────────────────────────────────────

export type SurveyQuestionType = 'likert' | 'nps' | 'multiple_choice' | 'open_text';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: SurveyQuestionType;
  options?: string[];
  adkarStage?: ADKARStage;
}

export interface PulseSurvey {
  id: string;
  initiativeId: string;
  title: string;
  questions: SurveyQuestion[];
  targetDepartments: string[];
  scheduledAt?: string;
  completedAt?: string;
  responseRate: number;       // 0–100 percent
  createdAt: string;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId: string;
  answers: Record<string, string | number | string[]>;
  sentimentScore?: number;    // -1 to 1
  submittedAt: string;
}

// ─────────────────────────────────────────────
// Adoption Metrics
// ─────────────────────────────────────────────

export interface AdoptionMetric {
  departmentId: string;
  toolId: string;
  toolName: string;
  activeUsers: number;
  totalUsers: number;
  adoptionRate: number;
  weeklyGrowth: number;       // percentage points
  lastActivityAt?: string;
}

export interface ResistanceHeatmapEntry {
  departmentId: string;
  departmentName: string;
  resistanceScore: number;    // 0–100 (100 = max resistance)
  topBarriers: string[];
  influencerCount: number;
}

// ─────────────────────────────────────────────
// Gamification
// ─────────────────────────────────────────────

export type BadgeType =
  | 'early_adopter'
  | 'survey_champion'
  | 'knowledge_seeker'
  | 'change_ambassador'
  | 'streak_7_days'
  | 'team_motivator';

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  iconUrl: string;
  pointsValue: number;
}

export interface UserBadge {
  userId: string;
  badge: Badge;
  earnedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  department: string;
  points: number;
  badges: number;
  trend: 'up' | 'down' | 'stable';
}

// ─────────────────────────────────────────────
// Nudge / Communication
// ─────────────────────────────────────────────

export type NudgeChannel = 'email' | 'slack' | 'teams' | 'in_app' | 'push';
export type NudgeStatus = 'pending' | 'sent' | 'opened' | 'clicked' | 'dismissed';
export type BehavioralProfile =
  | 'early_adopter'
  | 'pragmatic'
  | 'vocal_skeptic'
  | 'silent'
  | 'influencer';

export interface Nudge {
  id: string;
  initiativeId: string;
  recipientId: string;
  channel: NudgeChannel;
  subject?: string;
  body: string;
  adkarStage: ADKARStage;
  status: NudgeStatus;
  scheduledAt: string;
  sentAt?: string;
  openedAt?: string;
}

// ─────────────────────────────────────────────
// API Response wrappers
// ─────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
