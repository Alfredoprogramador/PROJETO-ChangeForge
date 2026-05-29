"""Organizational Network Analysis (ONA) endpoints via Neo4j."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class NodeSchema(BaseModel):
    id: str
    label: str
    node_type: str  # influencer | adopter | resistant | neutral
    department: str
    resistance_score: float


class EdgeSchema(BaseModel):
    source: str
    target: str
    weight: float = 1.0


class NetworkGraphSchema(BaseModel):
    nodes: list[NodeSchema]
    edges: list[EdgeSchema]


@router.get("/graph", response_model=NetworkGraphSchema)
async def get_org_network() -> NetworkGraphSchema:
    """Return the organizational influence graph.

    In production this queries Neo4j for the real ONA graph.
    """
    nodes = [
        NodeSchema(
            id="n1",
            label="Ana Souza",
            node_type="influencer",
            department="TI",
            resistance_score=15.0,
        ),
        NodeSchema(
            id="n2",
            label="Carlos Lima",
            node_type="resistant",
            department="Vendas",
            resistance_score=78.0,
        ),
        NodeSchema(
            id="n3",
            label="Maria Ferreira",
            node_type="adopter",
            department="Vendas",
            resistance_score=20.0,
        ),
        NodeSchema(
            id="n4",
            label="Pedro Costa",
            node_type="neutral",
            department="Operações",
            resistance_score=45.0,
        ),
        NodeSchema(
            id="n5",
            label="Lúcia Mendes",
            node_type="adopter",
            department="TI",
            resistance_score=12.0,
        ),
        NodeSchema(
            id="n6",
            label="João Alves",
            node_type="resistant",
            department="Financeiro",
            resistance_score=65.0,
        ),
        NodeSchema(
            id="n7",
            label="Sofia Rocha",
            node_type="influencer",
            department="Marketing",
            resistance_score=18.0,
        ),
    ]
    edges = [
        EdgeSchema(source="n1", target="n2", weight=0.8),
        EdgeSchema(source="n1", target="n3", weight=0.9),
        EdgeSchema(source="n1", target="n4", weight=0.6),
        EdgeSchema(source="n1", target="n5", weight=0.95),
        EdgeSchema(source="n7", target="n3", weight=0.7),
        EdgeSchema(source="n7", target="n6", weight=0.5),
        EdgeSchema(source="n2", target="n4", weight=0.4),
        EdgeSchema(source="n5", target="n6", weight=0.3),
    ]
    return NetworkGraphSchema(nodes=nodes, edges=edges)
