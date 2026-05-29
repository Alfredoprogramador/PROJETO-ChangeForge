import { AdoptionChart } from '@/components/dashboard/AdoptionChart';
import { ResistanceHeatmap } from '@/components/dashboard/ResistanceHeatmap';
import { AdkarRadar } from '@/components/dashboard/AdkarRadar';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { RecentNudges } from '@/components/dashboard/RecentNudges';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Adoção</h1>
          <p className="text-sm text-gray-500">Visão geral de todas as iniciativas de mudança</p>
        </div>

        {/* KPI Cards row */}
        <KpiCards />

        {/* Charts grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AdoptionChart />
          <AdkarRadar />
        </div>

        {/* Heatmap + Nudges */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResistanceHeatmap />
          </div>
          <div>
            <RecentNudges />
          </div>
        </div>
      </main>
    </div>
  );
}
