from neo4j import GraphDatabase
from app.core.config import settings

class Neo4jDriver:
    def __init__(self):
        self.driver = None

    def init_driver(self, uri: str, username: str, password: str):
        self.driver = GraphDatabase.driver(uri, auth=(username, password))
        self.driver.verify_connectivity()

    def get_driver(self):
        return self.driver

    # I'm not really closing this driver anywhere other than in the tests
    # TODO: Talk to someone whether I just setup a lifespan for the driver and inject it as a dependency
    def close_driver(self):
        if self.driver is not None:
            self.driver.close()
            self.driver = None

neo4j_driver = Neo4jDriver()
neo4j_driver.init_driver(
    uri=settings.NEO4J_URI,
    username=settings.NEO4J_USERNAME,
    password=settings.NEO4J_PASSWORD
)