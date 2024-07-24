# from unittest.mock import patch

# from fastapi.testclient import TestClient
# from sqlmodel import Session, select

# from app.crud import user_crud
# from app.core.config import settings
# from app.core.security import verify_password
# from app.models import User, UserCreate
# from app.tests.utils.utils import random_email, random_lower_string


# def test_get_users_superuser_me(
#     client: TestClient, superuser_token_headers: dict[str, str]
# ) -> None:
#     r = client.get(f"{settings.API_V1_STR}/users/me", headers=superuser_token_headers)
#     current_user = r.json()
#     assert current_user
#     assert current_user["is_active"] is True
#     assert current_user["is_superuser"]
#     assert current_user["email"] == settings.FIRST_SUPERUSER