'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const DATA = [
  { subject: 'Awareness', score: 72 },
  { subject: 'Desire', score: 55 },
  { subject: 'Knowledge', score: 68 },
  { subject: 'Ability', score: 60 },
  { subject: 'Reinforcement', score: 45 },
];

export function AdkarRadar() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-gray-800">Score ADKAR Médio (Todas as Iniciativas)</h2>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={DATA}>
          <PolarGrid stroke="#f0f0f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="Score ADKAR"
            dataKey="score"
            stroke="#4d78ff"
            fill="#4d78ff"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v: number) => [`${v}/100`]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
