import type { LeaderboardEntry } from '@changeforge/shared';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/lib/mock-data';

export function Leaderboard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-gray-800">Ranking de Adoção</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase text-gray-400">
            <th className="pb-2 pr-4">#</th>
            <th className="pb-2 pr-4">Colaborador</th>
            <th className="pb-2 pr-4">Departamento</th>
            <th className="pb-2 pr-4 text-right">Pontos</th>
            <th className="pb-2 text-right">Badges</th>
            <th className="pb-2 text-right">Tendência</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_LEADERBOARD.map((entry) => (
            <LeaderboardRow key={entry.userId} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const TrendIcon =
    entry.trend === 'up' ? TrendingUp : entry.trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    entry.trend === 'up'
      ? 'text-green-500'
      : entry.trend === 'down'
        ? 'text-red-500'
        : 'text-gray-400';

  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="py-3 pr-4 font-bold text-gray-400">
        {entry.rank <= 3 ? (
          <span>{['🥇', '🥈', '🥉'][entry.rank - 1]}</span>
        ) : (
          entry.rank
        )}
      </td>
      <td className="py-3 pr-4 font-medium text-gray-800">{entry.userName}</td>
      <td className="py-3 pr-4 text-gray-500">{entry.department}</td>
      <td className="py-3 pr-4 text-right font-semibold text-gray-800">
        {entry.points.toLocaleString('pt-BR')}
      </td>
      <td className="py-3 text-right text-gray-600">{entry.badges} 🏅</td>
      <td className="py-3 text-right">
        <TrendIcon className={`inline h-4 w-4 ${trendColor}`} />
      </td>
    </tr>
  );
}
