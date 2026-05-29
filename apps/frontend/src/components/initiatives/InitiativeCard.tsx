import type { ChangeInitiative } from '@changeforge/shared';

interface Props {
  initiative: ChangeInitiative;
}

const RISK_STYLES: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  active: 'bg-blue-100 text-blue-700',
  paused: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

export function InitiativeCard({ initiative }: Props) {
  const adkarAvg = Math.round(
    Object.values(initiative.adkarScores).reduce((a, b) => a + b, 0) / 5,
  );

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 leading-tight">{initiative.name}</h3>
        <div className="flex shrink-0 gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[initiative.status]}`}>
            {initiative.status}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${RISK_STYLES[initiative.riskLevel]}`}>
            {initiative.riskLevel}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500 line-clamp-2">{initiative.description}</p>

      {/* Adoption bar */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>Adoção</span>
          <span className="font-semibold text-gray-800">{initiative.adoptionRate}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-forge-500 transition-all"
            style={{ width: `${initiative.adoptionRate}%` }}
          />
        </div>
      </div>

      {/* ADKAR avg */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>Score ADKAR médio</span>
          <span className="font-semibold text-gray-800">{adkarAvg}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-purple-400 transition-all"
            style={{ width: `${adkarAvg}%` }}
          />
        </div>
      </div>

      {/* Departments */}
      <div className="flex flex-wrap gap-1">
        {initiative.departments.map((dept) => (
          <span
            key={dept}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
          >
            {dept}
          </span>
        ))}
      </div>
    </div>
  );
}
