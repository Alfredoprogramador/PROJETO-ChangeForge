"""Backend integration tests using FastAPI TestClient."""

import pytest
from fastapi.testclient import TestClient


@pytest.fixture(scope="module")
def client() -> TestClient:
    from app.main import app

    return TestClient(app)


def test_health(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "changeforge-backend"


def test_adoption_metrics(client: TestClient) -> None:
    response = client.get("/api/v1/adoption/metrics")
    assert response.status_code == 200
    metrics = response.json()
    assert isinstance(metrics, list)
    assert len(metrics) > 0
    assert "adoption_rate" in metrics[0]


def test_resistance_heatmap(client: TestClient) -> None:
    response = client.get("/api/v1/adoption/heatmap")
    assert response.status_code == 200
    heatmap = response.json()
    assert isinstance(heatmap, list)
    assert len(heatmap) > 0
    assert "resistance_score" in heatmap[0]


def test_gamification_leaderboard(client: TestClient) -> None:
    response = client.get("/api/v1/gamification/leaderboard")
    assert response.status_code == 200
    leaderboard = response.json()
    assert isinstance(leaderboard, list)
    assert len(leaderboard) > 0
    assert leaderboard[0]["rank"] == 1


def test_network_graph(client: TestClient) -> None:
    response = client.get("/api/v1/network/graph")
    assert response.status_code == 200
    graph = response.json()
    assert "nodes" in graph
    assert "edges" in graph
    assert len(graph["nodes"]) > 0
