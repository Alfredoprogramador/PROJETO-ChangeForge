import { Zap } from 'lucide-react';
import type { Nudge } from '@changeforge/shared';

const RECENT_NUDGES: Nudge[] = [
  {
    id: 'n1',
    initiativeId: 'init-001',
    recipientId: 'user-001',
    channel: 'slack',
    subject: 'Seu time está quase lá!',
    body: 'Oi Ana! Seu departamento está a 12% de atingir a meta de adoção. Aqui estão 3 dicas rápidas para acelerar.',
    adkarStage: 'ability',
    status: 'opened',
    scheduledAt: '2026-05-28T09:00:00Z',
    sentAt: '2026-05-28T09:01:00Z',
    openedAt: '2026-05-28T09:15:00Z',
  },
  {
    id: 'n2',
    initiativeId: 'init-001',
    recipientId: 'user-002',
    channel: 'email',
    subject: 'Conhecimento é poder 🚀',
    body: 'Carlos, separamos um tutorial de 5 min sobre a nova ferramenta. 92% dos usuários que o assistiram melhoraram a produtividade.',
    adkarStage: 'knowledge',
    status: 'sent',
    scheduledAt: '2026-05-28T10:00:00Z',
    sentAt: '2026-05-28T10:00:00Z',
  },
  {
    id: 'n3',
    initiativeId: 'init-002',
    recipientId: 'user-003',
    channel: 'teams',
    subject: 'Por que essa mudança importa',
    body: 'Oi Mariana! Esta transformação vai reduzir em 30% o tempo do seu processo de onboarding. Saiba mais.',
    adkarStage: 'awareness',
    status: 'clicked',
    scheduledAt: '2026-05-27T14:00:00Z',
    sentAt: '2026-05-27T14:00:00Z',
    openedAt: '2026-05-27T14:30:00Z',
  },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  opened: 'bg-yellow-100 text-yellow-700',
  clicked: 'bg-green-100 text-green-700',
  dismissed: 'bg-red-100 text-red-600',
};

const CHANNEL_ICONS: Record<string, string> = {
  slack: '💬',
  email: '📧',
  teams: '🟦',
  in_app: '🔔',
};

export function RecentNudges() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-4 w-4 text-purple-500" />
        <h2 className="font-semibold text-gray-800">Últimos Nudges</h2>
      </div>
      <div className="space-y-4">
        {RECENT_NUDGES.map((nudge) => (
          <div key={nudge.id} className="rounded-xl border border-gray-100 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm">
                <span>{CHANNEL_ICONS[nudge.channel]}</span>
                <span className="font-medium text-gray-800 line-clamp-1">{nudge.subject}</span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  STATUS_COLORS[nudge.status]
                }`}
              >
                {nudge.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">{nudge.body}</p>
            <p className="mt-2 text-xs text-gray-400">
              ADKAR: <span className="capitalize font-medium">{nudge.adkarStage}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
