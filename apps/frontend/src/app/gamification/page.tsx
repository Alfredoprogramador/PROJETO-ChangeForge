import { Sidebar } from '@/components/Sidebar';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { BadgeShowcase } from '@/components/gamification/BadgeShowcase';

export default function GamificationPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gamificação</h1>
          <p className="text-sm text-gray-500">
            Engajamento através de pontos, badges e missões
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Leaderboard />
          </div>
          <div>
            <BadgeShowcase />
          </div>
        </div>
      </main>
    </div>
  );
}
