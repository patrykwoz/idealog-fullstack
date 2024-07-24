from app.core.config import settings
from app.core.neo4j_db import neo4j_driver

def test_env_vars():
    assert "NEO4J_URI" in settings.model_dump()
    assert "NEO4J_USERNAME" in settings.model_dump()
    assert "NEO4J_PASSWORD" in settings.model_dump()

def test_driver_initiated():
    assert neo4j_driver is not None

def test_can_get_driver():
    driver = neo4j_driver.get_driver()
    assert driver is not None

# Run this test as last or reinitialize the driver in the test
# check with someone if this is the best way to do this
def test_can_close_driver():
    neo4j_driver.close_driver()
    driver = neo4j_driver.get_driver()
    assert driver is None
    neo4j_driver.init_driver(
        uri=settings.NEO4J_URI,
        username=settings.NEO4J_USERNAME,
        password=settings.NEO4J_PASSWORD
    )