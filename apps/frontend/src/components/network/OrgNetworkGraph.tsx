'use client';

const NODES = [
  { id: 'n1', label: 'Ana (Influenciadora)', x: 300, y: 150, type: 'influencer' },
  { id: 'n2', label: 'Carlos', x: 150, y: 80, type: 'resistant' },
  { id: 'n3', label: 'Maria', x: 450, y: 80, type: 'adopter' },
  { id: 'n4', label: 'Pedro', x: 100, y: 220, type: 'neutral' },
  { id: 'n5', label: 'Lúcia', x: 250, y: 280, type: 'adopter' },
  { id: 'n6', label: 'João', x: 400, y: 260, type: 'resistant' },
  { id: 'n7', label: 'Sofia (Influenciadora)', x: 500, y: 180, type: 'influencer' },
];

const EDGES = [
  { source: 'n1', target: 'n2' },
  { source: 'n1', target: 'n3' },
  { source: 'n1', target: 'n4' },
  { source: 'n1', target: 'n5' },
  { source: 'n7', target: 'n3' },
  { source: 'n7', target: 'n6' },
  { source: 'n2', target: 'n4' },
  { source: 'n5', target: 'n6' },
];

const NODE_COLORS: Record<string, string> = {
  influencer: '#4d78ff',
  adopter: '#22c55e',
  resistant: '#ef4444',
  neutral: '#9ca3af',
};

const NODE_LABELS: Record<string, string> = {
  influencer: 'Influenciador',
  adopter: 'Adepto',
  resistant: 'Resistente',
  neutral: 'Neutro',
};

export function OrgNetworkGraph() {
  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Grafo de Rede Organizacional</h2>
        <div className="flex gap-3 text-xs">
          {Object.entries(NODE_LABELS).map(([type, label]) => (
            <span key={type} className="flex items-center gap-1">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: NODE_COLORS[type] }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      <svg className="w-full" viewBox="0 0 600 360" style={{ height: 360 }}>
        {/* Edges */}
        {EDGES.map((edge, i) => {
          const s = getNode(edge.source);
          const t = getNode(edge.target);
          return (
            <line
              key={i}
              x1={s.x}
              y1={s.y}
              x2={t.x}
              y2={t.y}
              stroke="#e5e7eb"
              strokeWidth={2}
            />
          );
        })}
        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'influencer' ? 22 : 14}
              fill={NODE_COLORS[node.type]}
              opacity={0.85}
            />
            <text
              x={node.x}
              y={node.y + (node.type === 'influencer' ? 36 : 28)}
              textAnchor="middle"
              fontSize={10}
              fill="#374151"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-xs text-gray-400 text-center">
        Visualização simplificada · Powered by Neo4j ONA (Organizational Network Analysis)
      </p>
    </div>
  );
}
