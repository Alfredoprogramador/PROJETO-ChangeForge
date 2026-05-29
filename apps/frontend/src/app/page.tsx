import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-forge-900 via-forge-700 to-forge-500 p-8 text-white">
      <div className="max-w-4xl text-center">
        {/* Logo / Brand */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
              <path
                d="M16 3L3 9v14l13 6 13-6V9L16 3z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path d="M16 3v22M3 9l13 6 13-6" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">ChangeForge</h1>
        </div>

        <p className="mb-4 text-xl font-medium text-white/90">
          Plataforma de Gestão de Mudança Organizacional e Adoção Tecnológica
        </p>
        <p className="mb-10 text-base text-white/70">
          Monitore adoção em tempo real, identifique resistências, gere nudges comportamentais com
          IA e acompanhe KPIs de mudança.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-forge-900 shadow-lg transition hover:bg-white/90"
          >
            Acessar Dashboard
          </Link>
          <Link
            href="/initiatives"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Iniciar Mudança
          </Link>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/10 p-6 text-left backdrop-blur-sm"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-1 font-semibold">{f.title}</h3>
              <p className="text-sm text-white/70">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const FEATURES = [
  {
    icon: '📊',
    title: 'Dashboard de Adoção',
    description:
      'Visualize taxas de adoção por departamento, ferramenta e período com gráficos interativos.',
  },
  {
    icon: '🔥',
    title: 'Heatmap de Resistência',
    description:
      'Identifique clusters de resistência e influenciadores-chave na sua organização.',
  },
  {
    icon: '🤖',
    title: 'Nudges com IA',
    description:
      'Motor LangGraph gera mensagens personalizadas baseadas em perfil ADKAR e ciência comportamental.',
  },
  {
    icon: '🏆',
    title: 'Gamificação',
    description:
      'Pontos, badges, missões e leaderboards para aumentar o engajamento nas mudanças.',
  },
  {
    icon: '🔗',
    title: 'Análise de Rede',
    description:
      'Mapeamento de influenciadores com Neo4j e Organizational Network Analysis (ONA).',
  },
  {
    icon: '📋',
    title: 'Pulse Surveys',
    description:
      'Pesquisas automáticas de pulso com análise de sentimento e scores ADKAR.',
  },
];
