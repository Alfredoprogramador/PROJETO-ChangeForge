import type { ResistanceHeatmapEntry } from '@changeforge/shared';

const HEATMAP_DATA: ResistanceHeatmapEntry[] = [
  {
    departmentId: 'dept-001',
    departmentName: 'Vendas',
    resistanceScore: 72,
    topBarriers: ['Falta de treinamento', 'Sobrecarga de trabalho'],
    influencerCount: 3,
  },
  {
    departmentId: 'dept-002',
    departmentName: 'TI',
    resistanceScore: 28,
    topBarriers: ['Burocracia de aprovação'],
    influencerCount: 8,
  },
  {
    departmentId: 'dept-003',
    departmentName: 'RH',
    resistanceScore: 55,
    topBarriers: ['Mudança de processos', 'Falta de clareza'],
    influencerCount: 2,
  },
  {
    departmentId: 'dept-004',
    departmentName: 'Operações',
    resistanceScore: 45,
    topBarriers: ['Resistência à tecnologia'],
    influencerCount: 5,
  },
  {
    departmentId: 'dept-005',
    departmentName: 'Financeiro',
    resistanceScore: 62,
    topBarriers: ['Mudança de KPIs', 'Novo sistema'],
    influencerCount: 2,
  },
  {
    departmentId: 'dept-006',
    departmentName: 'Marketing',
    resistanceScore: 38,
    topBarriers: ['Aprendizado de ferramenta'],
    influencerCount: 4,
  },
];

function resistanceColor(score: number): string {
  if (score >= 70) return 'bg-red-500';
  if (score >= 50) return 'bg-orange-400';
  if (score >= 30) return 'bg-yellow-400';
  return 'bg-green-400';
}

function resistanceLabel(score: number): string {
  if (score >= 70) return 'Crítica';
  if (score >= 50) return 'Alta';
  if (score >= 30) return 'Média';
  return 'Baixa';
}

export function ResistanceHeatmap() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Heatmap de Resistência por Departamento</h2>
        <div className="flex gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-400" /> Baixa
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-400" /> Média
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-400" /> Alta
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Crítica
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {HEATMAP_DATA.map((entry) => (
          <div key={entry.departmentId} className="flex items-center gap-4">
            <span className="w-24 shrink-0 text-sm font-medium text-gray-700">
              {entry.departmentName}
            </span>
            <div className="flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-4 rounded-full transition-all ${resistanceColor(entry.resistanceScore)}`}
                style={{ width: `${entry.resistanceScore}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-sm font-semibold text-gray-700">
              {entry.resistanceScore}/100
            </span>
            <span
              className={`w-14 shrink-0 rounded-full px-2 py-0.5 text-center text-xs font-medium text-white ${resistanceColor(
                entry.resistanceScore,
              )}`}
            >
              {resistanceLabel(entry.resistanceScore)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
