import type { PulseSurvey } from '@changeforge/shared';
import { MOCK_SURVEYS } from '@/lib/mock-data';
import { ClipboardList } from 'lucide-react';

export function SurveyList() {
  return (
    <div className="space-y-4">
      {MOCK_SURVEYS.map((survey) => (
        <SurveyRow key={survey.id} survey={survey} />
      ))}
    </div>
  );
}

function SurveyRow({ survey }: { survey: PulseSurvey }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
        <ClipboardList className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{survey.title}</h3>
        <p className="text-sm text-gray-500">
          {survey.questions.length} perguntas · {survey.targetDepartments.join(', ')}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-gray-800">{survey.responseRate}%</p>
        <p className="text-xs text-gray-400">Taxa de resposta</p>
      </div>
      <div className="h-12 w-12 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="4"
            strokeDasharray={`${(2 * Math.PI * 14 * survey.responseRate) / 100} ${2 * Math.PI * 14}`}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
