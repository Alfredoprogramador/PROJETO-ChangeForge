const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  initiatives: {
    list: () => request('/api/v1/initiatives'),
    get: (id: string) => request(`/api/v1/initiatives/${id}`),
    create: (body: unknown) => request('/api/v1/initiatives', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) =>
      request(`/api/v1/initiatives/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  surveys: {
    list: () => request('/api/v1/surveys'),
    get: (id: string) => request(`/api/v1/surveys/${id}`),
    create: (body: unknown) => request('/api/v1/surveys', { method: 'POST', body: JSON.stringify(body) }),
  },
  nudges: {
    list: () => request('/api/v1/nudges'),
    generate: (body: unknown) => request('/api/v1/nudges/generate', { method: 'POST', body: JSON.stringify(body) }),
  },
  adoption: {
    metrics: () => request('/api/v1/adoption/metrics'),
    heatmap: () => request('/api/v1/adoption/heatmap'),
  },
  gamification: {
    leaderboard: () => request('/api/v1/gamification/leaderboard'),
    badges: (userId: string) => request(`/api/v1/gamification/users/${userId}/badges`),
  },
  network: {
    graph: () => request('/api/v1/network/graph'),
  },
};
