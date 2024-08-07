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
    STACKHERO_RABBITMQ_AMQP_PORT_TLS: int
    STACKHERO_RABBITMQ_AMQP_URL_TLS: str
    STACKHERO_RABBITMQ_HOST: str
    STACKHERO_RABBITMQ_PASSWORD: str
    STACKHERO_RABBITMQ_USER: str


celery_settings = CelerySettings()