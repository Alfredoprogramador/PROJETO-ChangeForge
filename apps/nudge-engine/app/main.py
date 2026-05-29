"""ChangeForge Nudge Engine – LangGraph-powered AI communication motor."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import nudge_router

app = FastAPI(
    title="ChangeForge Nudge Engine",
    description="AI communication motor using LangGraph for behavioural nudges",
    version="0.1.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nudge_router.router, prefix="/nudges", tags=["nudges"])


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "changeforge-nudge-engine"}
