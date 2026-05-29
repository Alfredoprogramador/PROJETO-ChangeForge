# Change Management Framework – ChangeForge

## Visão Geral

O ChangeForge adota o **modelo ADKAR** (Prosci) como espinha dorsal metodológica para todas as iniciativas de mudança. Esta estrutura, combinada com **Behavioral Economics** e **Organizational Network Analysis (ONA)**, forma a base científica da plataforma.

---

## 1. Modelo ADKAR

O ADKAR descreve as cinco condições que cada indivíduo precisa cumprir para que uma mudança seja sustentada com sucesso:

| Estágio            | Descrição                                                                          | Métricas-chave no ChangeForge                     |
|--------------------|------------------------------------------------------------------------------------|----------------------------------------------------|
| **A**wareness      | Consciência de **por que** a mudança é necessária                                  | Score de awareness (0–100), taxa de abertura de comunicados |
| **D**esire         | Motivação e **desejo** pessoal de participar e apoiar a mudança                    | NPS da iniciativa, engajamento em surveys          |
| **K**nowledge      | **Conhecimento** de como mudar (habilidades, processos, ferramentas)               | Taxa de conclusão de treinamentos, score de quiz   |
| **A**bility        | **Capacidade** de implementar as habilidades e comportamentos necessários          | Taxa de adoção da ferramenta, eventos de uso       |
| **R**einforcement  | **Reforço** para manter a mudança; evitar regressão                                | Streak de uso, badge conquistado, pontos acumulados |

### Cálculo do Score ADKAR

Cada estágio recebe uma pontuação de **0 a 100** com base em:
- Respostas às **Pulse Surveys** (peso: 60%)
- **Eventos de comportamento** rastreados (peso: 40%)

```
Score_ADKAR[estágio] = (score_survey * 0.6) + (score_comportamento * 0.4)
```

Um score abaixo de **50** em qualquer estágio ativa automaticamente a geração de nudges para aquele segmento.

---

## 2. Processo de Gestão de Mudança

### 2.1 Cadastro de Iniciativa

1. O Change Manager cria uma iniciativa no ChangeForge
2. Define: nome, descrição, departamentos impactados, tecnologias, datas, nível de risco
3. O sistema calcula automaticamente o **Risk Score** inicial baseado em:
   - Número de pessoas impactadas
   - Complexidade tecnológica
   - Histórico de adoção de mudanças anteriores

### 2.2 Ciclo de Pulse Surveys

- Surveys são **geradas automaticamente** a cada 2 semanas por iniciativa
- Questões são mapeadas aos estágios ADKAR
- Análise de sentimento via IA nas respostas abertas
- Response rate alvo: ≥ 70%

### 2.3 Geração de Nudges

O motor de nudges é ativado quando:
- Score ADKAR de qualquer estágio < 50
- Taxa de adoção < meta definida (default 70%)
- Resistência detectada em análise de sentimento

### 2.4 Análise de Rede Organizacional (ONA)

O ChangeForge identifica automaticamente:
- **Influenciadores** (alto betweenness centrality no grafo)
- **Clusters de resistência** (grupos densamente conectados com baixo score ADKAR)
- **Embaixadores de mudança** (early adopters com alto engajamento)

---

## 3. Boas Práticas Prosci

### 3.1 Patrocínio Ativo

O sponsor executivo deve:
- Comunicar pessoalmente o "porquê" da mudança (impacto no Awareness)
- Ser visível e acessível durante toda a iniciativa

### 3.2 Rede de Change Agents

- Recomendado: 1 change agent por 10–20 pessoas impactadas
- O ChangeForge identifica candidatos baseado no ONA
- Change agents recebem nudges diferenciados e dashboard de progresso do time

### 3.3 Resistência como Dado

A resistência **não é um problema a ser suprimido**, mas um sinal a ser entendido.
O ChangeForge transforma dados de resistência em:
- Barreiras específicas por departamento
- Perguntas prioritárias para o próximo Pulse Survey
- Conteúdo de comunicação personalizado

---

## 4. KPIs de Mudança

| KPI                          | Fórmula                                            | Meta Padrão |
|------------------------------|----------------------------------------------------|-------------|
| Taxa de Adoção               | Usuários ativos / Total impactado × 100            | ≥ 70%       |
| Score ADKAR Médio            | Média dos 5 estágios                               | ≥ 65        |
| Taxa de Resposta Survey      | Respostas / Enviados × 100                         | ≥ 70%       |
| Score de Resistência         | Índice composto (0–100, menor = melhor)            | ≤ 40        |
| Nudge Open Rate              | Nudges abertos / Nudges enviados × 100             | ≥ 35%       |
| Change Velocity              | Dias para atingir 70% de adoção                    | Benchmark   |

---

## 5. Referências

- Hiatt, J.M. (2006). *ADKAR: A Model for Change in Business, Government, and Our Community*. Prosci Learning Center.
- Kotter, J.P. (1996). *Leading Change*. Harvard Business Review Press.
- Fogg, B.J. (2019). *Tiny Habits: The Small Changes That Change Everything*. Houghton Mifflin Harcourt.
- Thaler, R., & Sunstein, C. (2008). *Nudge: Improving Decisions About Health, Wealth, and Happiness*. Yale University Press.
