import { Sidebar } from '@/components/Sidebar';
import { NudgeList } from '@/components/nudges/NudgeList';

export default function NudgesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Central de Nudges</h1>
            <p className="text-sm text-gray-500">Comunicações personalizadas geradas por IA</p>
          </div>
          <button className="rounded-lg bg-forge-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forge-700 transition">
            Gerar Nudge com IA
          </button>
        </div>
        <NudgeList />
      </main>
    </div>
  );
}
