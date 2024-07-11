from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app.core.config import settings
from app.core.db import engine, init_db
from app.core.neo4j_db import neo4j_driver

from app.main import app
from app.models_sql import User
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers


@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session)
        yield session
        statement = delete(User)
        session.exec(statement)
        session.commit()

# @pytest.fixture(scope="module", autouse=True)
# def db_neo4j():
#     neo4j_driver.init_driver(
#         uri=settings.NEO4J_URI,
#         username=settings.NEO4J_USERNAME,
#         password=settings.NEO4J_PASSWORD
#     )
#     print("Neo4j driver initiated")
#     try:
#         yield
#     finally:
#         neo4j_driver.close_driver()
#         print("Neo4j driver closed")


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )