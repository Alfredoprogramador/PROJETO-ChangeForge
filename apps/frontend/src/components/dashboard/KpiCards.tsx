import { TrendingUp, TrendingDown, Users, AlertTriangle, Zap, CheckCircle } from 'lucide-react';

const KPIS = [
  {
    title: 'Taxa de Adoção Geral',
    value: '67%',
    change: '+5%',
    positive: true,
    icon: TrendingUp,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Usuários Ativos',
    value: '1.284',
    change: '+142',
    positive: true,
    icon: Users,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Score de Resistência',
    value: '38/100',
    change: '-4pts',
    positive: true,
    icon: AlertTriangle,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Nudges Enviados',
    value: '4.521',
    change: '+890',
    positive: true,
    icon: Zap,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Surveys Respondidas',
    value: '73%',
    change: '-2%',
    positive: false,
    icon: CheckCircle,
    color: 'bg-teal-50 text-teal-600',
  },
  {
    title: 'Iniciativas Ativas',
    value: '8',
    change: '+2',
    positive: true,
    icon: TrendingDown,
    color: 'bg-indigo-50 text-indigo-600',
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.title} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className={`mb-3 inline-flex rounded-xl p-2 ${kpi.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium text-gray-500">{kpi.title}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{kpi.value}</p>
            <p
              className={`mt-1 text-xs font-medium ${
                kpi.positive ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {kpi.change} vs mês ant.
            </p>
          </div>
        );
      })}
    </div>
  );
}
