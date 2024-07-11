from sqlmodel import Session

from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


# def create_random_idea(db: Session) -> Idea:
#     user = create_random_user(db)
#     owner_id = user.id
#     assert owner_id is not None
#     title = random_lower_string()
#     description = random_lower_string()
#     idea_in = IdeaCreate(title=title, description=description)
#     return idea_crud.create_idea(session=db, idea_in=idea_in, owner_id=owner_id)