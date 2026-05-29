"""Gamification endpoints: leaderboard and badges."""

from fastapi import APIRouter

from app.schemas.schemas import LeaderboardEntrySchema

router = APIRouter()


@router.get("/leaderboard", response_model=list[LeaderboardEntrySchema])
async def get_leaderboard() -> list[LeaderboardEntrySchema]:
    """Return top users by gamification points."""
    return [
        LeaderboardEntrySchema(rank=1, user_id="u1", user_name="Ana Souza", department="TI", points=4850, badges=6, trend="up"),
        LeaderboardEntrySchema(rank=2, user_id="u2", user_name="Carlos Lima", department="RH", points=4200, badges=5, trend="stable"),
        LeaderboardEntrySchema(rank=3, user_id="u3", user_name="Maria Ferreira", department="Vendas", points=3900, badges=4, trend="up"),
        LeaderboardEntrySchema(rank=4, user_id="u4", user_name="Pedro Costa", department="Operações", points=3400, badges=3, trend="down"),
        LeaderboardEntrySchema(rank=5, user_id="u5", user_name="Lúcia Mendes", department="TI", points=3100, badges=4, trend="up"),
    ]
