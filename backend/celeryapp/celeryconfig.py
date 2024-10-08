import os
from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpUrl,
    PostgresDsn,
    computed_field,
    model_validator,
)
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Annotated, Any, Literal
from typing_extensions import Self

class CelerySettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str

celery_settings = CelerySettings()