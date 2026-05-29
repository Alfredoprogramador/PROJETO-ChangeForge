"""Adoption metrics and resistance heatmap endpoints."""

from fastapi import APIRouter

from app.schemas.schemas import AdoptionMetricSchema, ResistanceHeatmapSchema

router = APIRouter()


@router.get("/metrics", response_model=list[AdoptionMetricSchema])
async def get_adoption_metrics() -> list[AdoptionMetricSchema]:
    """Return adoption metrics aggregated by department and tool.

    In production this is computed from UserAdoptionEvent records.
    """
    return [
        AdoptionMetricSchema(
            department_id="dept-001",
            tool_id="ms365",
            tool_name="Microsoft 365",
            active_users=856,
            total_users=1280,
            adoption_rate=66.9,
            weekly_growth=2.1,
        ),
        AdoptionMetricSchema(
            department_id="dept-002",
            tool_id="salesforce",
            tool_name="Salesforce CRM",
            active_users=124,
            total_users=295,
            adoption_rate=42.0,
            weekly_growth=3.5,
        ),
        AdoptionMetricSchema(
            department_id="dept-003",
            tool_id="sap",
            tool_name="SAP S/4HANA",
            active_users=88,
            total_users=252,
            adoption_rate=34.9,
            weekly_growth=1.2,
        ),
    ]


@router.get("/heatmap", response_model=list[ResistanceHeatmapSchema])
async def get_resistance_heatmap() -> list[ResistanceHeatmapSchema]:
    """Return resistance scores per department for the heatmap."""
    return [
        ResistanceHeatmapSchema(
            department_id="dept-001",
            department_name="Vendas",
            resistance_score=72.0,
            top_barriers=["Falta de treinamento", "Sobrecarga de trabalho"],
            influencer_count=3,
        ),
        ResistanceHeatmapSchema(
            department_id="dept-002",
            department_name="TI",
            resistance_score=28.0,
            top_barriers=["Burocracia de aprovação"],
            influencer_count=8,
        ),
        ResistanceHeatmapSchema(
            department_id="dept-003",
            department_name="RH",
            resistance_score=55.0,
            top_barriers=["Mudança de processos", "Falta de clareza"],
            influencer_count=2,
        ),
        ResistanceHeatmapSchema(
            department_id="dept-004",
            department_name="Operações",
            resistance_score=45.0,
            top_barriers=["Resistência à tecnologia"],
            influencer_count=5,
        ),
        ResistanceHeatmapSchema(
            department_id="dept-005",
            department_name="Financeiro",
            resistance_score=62.0,
            top_barriers=["Mudança de KPIs", "Novo sistema"],
            influencer_count=2,
        ),
    ]
