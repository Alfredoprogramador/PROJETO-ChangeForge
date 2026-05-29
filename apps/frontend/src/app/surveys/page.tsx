import { Sidebar } from '@/components/Sidebar';
import { SurveyList } from '@/components/surveys/SurveyList';

export default function SurveysPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pulse Surveys</h1>
            <p className="text-sm text-gray-500">
              Pesquisas de pulso automáticas por iniciativa
            </p>
          </div>
          <button className="rounded-lg bg-forge-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forge-700 transition">
            + Nova Pesquisa
          </button>
        </div>
        <SurveyList />
      </main>
    </div>
  );
}
