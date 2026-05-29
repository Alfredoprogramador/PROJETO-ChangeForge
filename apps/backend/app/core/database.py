"""SQLAlchemy async database setup – lazy engine initialisation."""

from __future__ import annotations

from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

# Engine and session factory are created lazily on first DB access so that
# importing the app module in tests (without a running PostgreSQL) does not fail.
_engine = None
_AsyncSessionLocal = None


def _get_engine():  # type: ignore[return]
    global _engine  # noqa: PLW0603
    if _engine is None:
        _engine = create_async_engine(
            settings.DATABASE_URL,
            pool_size=settings.DATABASE_POOL_SIZE,
            max_overflow=settings.DATABASE_MAX_OVERFLOW,
            echo=settings.APP_ENV == "development",
        )
    return _engine


def _get_session_factory() -> async_sessionmaker[AsyncSession]:
    global _AsyncSessionLocal  # noqa: PLW0603
    if _AsyncSessionLocal is None:
        _AsyncSessionLocal = async_sessionmaker(
            bind=_get_engine(),
            class_=AsyncSession,
            expire_on_commit=False,
        )
    return _AsyncSessionLocal


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with _get_session_factory()() as session:
        yield session
