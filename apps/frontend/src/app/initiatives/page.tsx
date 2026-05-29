import { Sidebar } from '@/components/Sidebar';
import { InitiativeCard } from '@/components/initiatives/InitiativeCard';
import { MOCK_INITIATIVES } from '@/lib/mock-data';

export default function InitiativesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Iniciativas de Mudança</h1>
            <p className="text-sm text-gray-500">
              {MOCK_INITIATIVES.length} iniciativas cadastradas
            </p>
          </div>
          <button className="rounded-lg bg-forge-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forge-700 transition">
            + Nova Iniciativa
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_INITIATIVES.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </main>
    </div>
  );
}
