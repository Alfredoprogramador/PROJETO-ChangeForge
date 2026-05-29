import type { Badge } from '@changeforge/shared';

const BADGES: Badge[] = [
  {
    id: 'b1',
    type: 'early_adopter',
    name: 'Early Adopter',
    description: 'Primeiro a adotar a nova ferramenta no departamento',
    iconUrl: '',
    pointsValue: 500,
  },
  {
    id: 'b2',
    type: 'survey_champion',
    name: 'Survey Champion',
    description: 'Respondeu 10 pesquisas de pulso consecutivas',
    iconUrl: '',
    pointsValue: 300,
  },
  {
    id: 'b3',
    type: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Completou todos os treinamentos disponíveis',
    iconUrl: '',
    pointsValue: 400,
  },
  {
    id: 'b4',
    type: 'change_ambassador',
    name: 'Change Ambassador',
    description: 'Influenciou positivamente 5+ colegas',
    iconUrl: '',
    pointsValue: 800,
  },
  {
    id: 'b5',
    type: 'streak_7_days',
    name: '7-Day Streak',
    description: 'Utilizou a ferramenta por 7 dias consecutivos',
    iconUrl: '',
    pointsValue: 250,
  },
  {
    id: 'b6',
    type: 'team_motivator',
    name: 'Team Motivator',
    description: 'Seu time atingiu 80% de adoção',
    iconUrl: '',
    pointsValue: 600,
  },
];

const BADGE_ICONS: Record<string, string> = {
  early_adopter: '🚀',
  survey_champion: '📋',
  knowledge_seeker: '📚',
  change_ambassador: '🌟',
  streak_7_days: '🔥',
  team_motivator: '👑',
};

export function BadgeShowcase() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-gray-800">Badges Disponíveis</h2>
      <div className="space-y-3">
        {BADGES.map((badge) => (
          <div key={badge.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <span className="text-2xl">{BADGE_ICONS[badge.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm">{badge.name}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{badge.description}</p>
            </div>
            <span className="shrink-0 text-xs font-bold text-amber-600">+{badge.pointsValue}pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
