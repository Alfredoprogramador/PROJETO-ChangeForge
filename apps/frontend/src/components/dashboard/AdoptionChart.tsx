'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const DATA = [
  { month: 'Jan', Vendas: 42, TI: 68, RH: 35, Operações: 55 },
  { month: 'Fev', Vendas: 48, TI: 72, RH: 40, Operações: 58 },
  { month: 'Mar', Vendas: 52, TI: 78, RH: 45, Operações: 62 },
  { month: 'Abr', Vendas: 58, TI: 80, RH: 52, Operações: 65 },
  { month: 'Mai', Vendas: 65, TI: 85, RH: 60, Operações: 70 },
  { month: 'Jun', Vendas: 72, TI: 88, RH: 65, Operações: 74 },
];

const COLORS = ['#4d78ff', '#22c55e', '#f59e0b', '#ef4444'];
const DEPTS = ['Vendas', 'TI', 'RH', 'Operações'];

export function AdoptionChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-gray-800">Taxa de Adoção por Departamento (%)</h2>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            {DEPTS.map((d, i) => (
              <linearGradient key={d} id={`color${d}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[i]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v: number) => [`${v}%`]}
          />
          <Legend iconType="circle" iconSize={8} />
          {DEPTS.map((d, i) => (
            <Area
              key={d}
              type="monotone"
              dataKey={d}
              stroke={COLORS[i]}
              fill={`url(#color${d})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
