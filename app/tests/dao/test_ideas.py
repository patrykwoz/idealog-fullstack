from app.core.neo4j_db import neo4j_driver
from app.dao.ideas import IdeaDAO
from fastapi.encoders import jsonable_encoder

def test_can_get_ideas():

    dao = IdeaDAO(neo4j_driver.get_driver())

    # import pdb
    # pdb.set_trace()

    output = dao.all()

    # Return as JSON
    jsonified_output = jsonable_encoder(output)

    assert jsonified_output is not None