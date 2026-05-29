import type { Nudge } from '@changeforge/shared';
import { MOCK_NUDGES } from '@/lib/mock-data';
import { Zap } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
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

export function NudgeList() {
  return (
    <div className="space-y-3">
      {MOCK_NUDGES.map((nudge) => (
        <NudgeRow key={nudge.id} nudge={nudge} />
      ))}
    </div>
  );
}

function NudgeRow({ nudge }: { nudge: Nudge }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <Zap className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">{CHANNEL_ICONS[nudge.channel]}</span>
            <h3 className="font-semibold text-gray-900 truncate">{nudge.subject}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[nudge.status]}`}
            >
              {nudge.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{nudge.body}</p>
          <div className="mt-2 flex gap-4 text-xs text-gray-400">
            <span>
              Canal: <span className="font-medium capitalize">{nudge.channel}</span>
            </span>
            <span>
              ADKAR: <span className="font-medium capitalize">{nudge.adkarStage}</span>
            </span>
            <span>
              Agendado: <span className="font-medium">{new Date(nudge.scheduledAt).toLocaleDateString('pt-BR')}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
