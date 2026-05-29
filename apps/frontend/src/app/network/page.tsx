import { Sidebar } from '@/components/Sidebar';
import { OrgNetworkGraph } from '@/components/network/OrgNetworkGraph';

export default function NetworkPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Análise de Rede Organizacional</h1>
          <p className="text-sm text-gray-500">
            Mapeamento de influenciadores e clusters de resistência (ONA)
          </p>
        </div>
        <OrgNetworkGraph />
      </main>
    </div>
  );
}
