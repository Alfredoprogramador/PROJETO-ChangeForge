# ChangeForge

**Plataforma de Gestão de Mudança Organizacional e Adoção Tecnológica**

[![CI](https://github.com/Alfredoprogramador/PROJETO-ChangeForge/actions/workflows/ci.yml/badge.svg)](https://github.com/Alfredoprogramador/PROJETO-ChangeForge/actions/workflows/ci.yml)

---

## O que é o ChangeForge?

O ChangeForge é uma plataforma enterprise de **Change Management** que combina IA generativa, gamificação e análise de rede organizacional (ONA) para monitorar, entender e influenciar o comportamento humano durante transformações digitais.

### Problema que Resolve

A resistência cultural à mudança é um dos maiores obstáculos na transformação digital. Quando novas tecnologias e processos são implementados, há baixa adesão, frustração e alto risco de fracasso. O ChangeForge torna visível e gerenciável o lado humano da mudança.

---

## Arquitetura

```
changeforge/
├── apps/
│   ├── frontend/          # Next.js 15 + TypeScript + Tailwind + shadcn/ui
│   ├── backend/           # Python + FastAPI + PostgreSQL + Redis
│   └── nudge-engine/      # LangGraph + Llama 3 (motor de comunicação IA)
├── packages/
│   ├── shared/            # TypeScript types compartilhados
│   ├── gamification/      # Engine de pontos, badges e leaderboard
│   ├── network-analysis/  # Utilidades ONA + Cypher queries (Neo4j)
│   └── ai-communication/  # Types e prompts para o agente de nudges
├── infra/
│   ├── terraform/         # AWS EKS + VPC + RDS
│   └── kubernetes/        # Manifestos K8s + Kustomize
├── docs/
│   ├── change-management-framework.md
│   └── behavioral-models.md
└── docker-compose.yml
```

### Stack Tecnológica

| Camada              | Tecnologia                                               |
|---------------------|----------------------------------------------------------|
| **Frontend**        | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Recharts, React Flow |
| **Backend**         | Python 3.12, FastAPI, SQLAlchemy, Alembic               |
| **IA / Behavioral** | LangGraph, Llama 3, OpenAI (fallback), Prompt Engineering |
| **Análise de Rede** | Neo4j (Organizational Network Analysis)                  |
| **Banco de Dados**  | PostgreSQL, Redis, Neo4j                                 |
| **Gamificação**     | Engine customizado: pontos, badges, missões, leaderboard |
| **Infra**           | Kubernetes, Terraform (AWS EKS), ArgoCD                  |
| **Observabilidade** | OpenTelemetry, PostHog, Grafana                          |

---

## Quick Start (Desenvolvimento Local)

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Python 3.12+
- Docker + Docker Compose

### 1. Clone e instale dependências

```bash
git clone https://github.com/Alfredoprogramador/PROJETO-ChangeForge.git
cd PROJETO-ChangeForge
pnpm install
```

### 2. Configure variáveis de ambiente

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
# Edite apps/backend/.env com suas configurações de banco

# Nudge Engine
cp apps/nudge-engine/.env.example apps/nudge-engine/.env
# Adicione OPENAI_API_KEY (opcional — fallback usa templates)
```

### 3. Suba a stack local com Docker Compose

```bash
docker-compose up -d
```

Serviços disponíveis:

| Serviço        | URL                     |
|----------------|-------------------------|
| Frontend       | http://localhost:3000   |
| Backend API    | http://localhost:8000   |
| Nudge Engine   | http://localhost:8001   |
| API Docs       | http://localhost:8000/docs |
| Neo4j Browser  | http://localhost:7474   |

### 4. Inicie em modo de desenvolvimento

```bash
# Todos os apps em paralelo
pnpm dev

# Ou individualmente
pnpm --filter @changeforge/frontend dev
pnpm --filter @changeforge/backend dev
```

---

## Desenvolvimento

### Rodando os testes

```bash
# Backend (Python)
cd apps/backend
python -m pytest tests/ -v

# Frontend (TypeScript)
pnpm --filter @changeforge/frontend type-check
```

### Linting

```bash
# Backend
cd apps/backend && ruff check .

# Frontend
pnpm --filter @changeforge/frontend lint
```

### Migrations (Alembic)

```bash
cd apps/backend
alembic upgrade head           # Aplica migrations
alembic revision --autogenerate -m "description"  # Cria nova migration
```

---

## Funcionalidades MVP (Fase 1)

- **Dashboard de Adoção**: KPIs em tempo real, gráfico de adoção por departamento, radar ADKAR
- **Heatmap de Resistência**: Visualização por departamento com scores de resistência
- **Gestão de Iniciativas**: Cadastro e acompanhamento de iniciativas de mudança com ADKAR scores
- **Pulse Surveys**: Pesquisas automáticas de sentimento com análise de resultados
- **Gamificação**: Pontos, badges, leaderboard e missões comportamentais
- **Nudges por IA**: Comunicação personalizada por perfil, canal e estágio ADKAR
- **Rede Organizacional**: Visualização de influenciadores e clusters de resistência

---

## Modelos Comportamentais

O ChangeForge aplica ciência comportamental para maximizar a efetividade das intervenções:

- **BJ Fogg Behavior Model**: Motivação × Facilidade × Gatilho
- **Nudge Theory** (Thaler & Sunstein): Social proof, defaults, commitment
- **EAST Framework**: Easy, Attractive, Social, Timely
- **ADKAR Model** (Prosci): Awareness, Desire, Knowledge, Ability, Reinforcement

📖 Detalhes: [docs/behavioral-models.md](docs/behavioral-models.md)
📖 Framework: [docs/change-management-framework.md](docs/change-management-framework.md)

---

## Roadmap

| Fase | Duração  | Destaques                                              |
|------|----------|--------------------------------------------------------|
| MVP  | 8 semanas | Dashboard, surveys, nudges básicos, gamificação        |
| Fase 2 | 12 sem | ONA completo, IA personalizada, nudges automáticos    |
| Fase 3 | 12 sem | Multi-tenancy, previsão de resistência, ROI da mudança |

---

## Contribuindo

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

MIT – veja [LICENSE](LICENSE) para detalhes.
