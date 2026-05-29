# Modelos Comportamentais – ChangeForge

## Visão Geral

O ChangeForge incorpora princípios de **Behavioral Economics** e **Ciência Comportamental** para aumentar a efetividade das intervenções de mudança. Em vez de comunicação genérica, cada nudge é projetado com base em modelos científicos comprovados.

---

## 1. BJ Fogg Behavior Model (Tiny Habits)

**Princípio:** Um comportamento ocorre quando três elementos se encontram simultaneamente:
- **Motivation** (Motivação): Querer fazer
- **Ability** (Capacidade): Poder fazer com facilidade
- **Prompt** (Gatilho): Um sinal para agir agora

**Aplicação no ChangeForge:**

```
Comportamento = Motivação × Facilidade × Gatilho
```

| Elemento   | Implementação                                                               |
|------------|-----------------------------------------------------------------------------|
| Motivação  | Nudges de DESIRE – benefícios pessoais, histórias de sucesso, FOMO saudável |
| Facilidade | Nudges de ABILITY – micro-tarefas de 2 min, tutoriais contextuais           |
| Gatilho    | Timing inteligente – notificações após login, início de semana, pós-reunião |

---

## 2. Nudge Theory (Thaler & Sunstein)

**Princípio:** Pequenas mudanças na arquitetura de escolhas ("choice architecture") influenciam decisões sem restringir opções.

### 2.1 Nudges Implementados no ChangeForge

| Nudge Type          | Descrição                                                          | Exemplo                                               |
|---------------------|--------------------------------------------------------------------|-------------------------------------------------------|
| **Social Proof**    | Mostrar que os outros estão fazendo                                | "82% do seu time já usa o Teams diariamente"          |
| **Default Effect**  | Pré-selecionar a opção desejada                                    | Reuniões criadas automaticamente pelo Teams            |
| **Saliência**       | Tornar o comportamento desejado mais visível                       | Badge destacado no perfil de early adopters            |
| **Commitment**      | Fazer as pessoas se comprometerem publicamente                     | "Eu me comprometo a usar X por 7 dias"                |
| **Loss Aversion**   | Enfatizar o que se perde ao não agir                               | "Seu time está perdendo 2h/semana sem este processo"  |
| **Implementação**   | Guiar o planejamento concreto ("quando/onde/como")                 | "Quando você abrir o email amanhã, use o Teams"       |

---

## 3. EAST Framework (Behavioural Insights Team)

Para que um comportamento seja adotado, deve ser:

| Princípio | Descrição                                      | Aplicação                                              |
|-----------|------------------------------------------------|--------------------------------------------------------|
| **E**asy  | Reduza o esforço cognitivo e físico            | Onboarding em 3 cliques, micro-tutoriais, atalhos      |
| **A**ttractive | Torne a ação visualmente atraente        | Interface gamificada, badges visuais, progresso visível |
| **S**ocial | Mostre que outros estão fazendo               | Leaderboard, posts de celebração, ONA de adotantes     |
| **T**imely | Intervenção no momento certo                  | Nudge após falha de login, após nova funcionalidade    |

---

## 4. Economia Comportamental na Gamificação

### 4.1 Teoria dos Prospectos (Kahneman & Tversky)

- **Loss aversion**: Perder 100 pontos dói mais do que ganhar 100 pontos
- **Implementação**: Streaks com "perigo de perda" quando o usuário não acessa por 2 dias

### 4.2 Efeito Dotação

- Usuários tendem a valorizar mais o que já possuem
- **Implementação**: Exibir pontos e badges acumulados com destaque para "não perder o progresso"

### 4.3 Princípio de Zeigarnik (Tarefa Incompleta)

- Tarefas incompletas são melhor lembradas do que tarefas completas
- **Implementação**: Missões com progresso parcial visível ("você está a 60% de ganhar o badge X")

### 4.4 Flow State (Csikszentmihalyi)

- Engajamento máximo quando desafio e habilidade estão equilibrados
- **Implementação**: Sistema adaptativo de missões baseado no nível ADKAR do usuário

---

## 5. Segmentação Comportamental

O ChangeForge classifica usuários em perfis comportamentais baseados em dados:

| Perfil               | Características                                    | Estratégia de Nudge                              |
|----------------------|----------------------------------------------------|--------------------------------------------------|
| **Early Adopter**    | Alto awareness, alta ability, pró-ativo            | Recrutar como Change Ambassador                  |
| **Pragmático**       | Médio desire, alta knowledge – precisa de utilidade | Mostrar ROI pessoal, casos de uso práticos       |
| **Cético Vocal**     | Baixo desire, vocaliza resistência                 | Endereçar barreiras específicas, 1:1 com manager |
| **Silencioso**       | Baixo engajamento, não responde surveys            | In-app nudges, micro-compromissos                |
| **Influenciador**    | Alto betweenness centrality no ONA                 | Envolvimento no design da mudança, protagonismo  |

---

## 6. Métricas de Efetividade Comportamental

| Métrica                    | Fórmula                                    | Frequência  |
|----------------------------|--------------------------------------------|-------------|
| Nudge Open Rate            | Abertos / Enviados                         | Por campanha |
| Nudge Click-Through Rate   | Cliques / Abertos                          | Por campanha |
| Behavior Change Rate       | Usuários que mudaram comportamento após nudge | 7 dias pós-nudge |
| Survey Sentiment Trend     | Δ sentimento médio entre surveys           | Por ciclo   |
| ADKAR Velocity             | Δ score ADKAR por semana                   | Semanal     |

---

## 7. Referências

- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
- Thaler, R., & Sunstein, C. (2008). *Nudge*. Yale University Press.
- Fogg, B.J. (2019). *Tiny Habits*. Houghton Mifflin Harcourt.
- Csikszentmihalyi, M. (1990). *Flow: The Psychology of Optimal Experience*. Harper & Row.
- Service, O., & Gallagher, R. (2017). *Think Small*. Michael O'Mara Books.
- BIT (Behavioural Insights Team). (2014). *EAST: Four Simple Ways to Apply Behavioural Insights*.
