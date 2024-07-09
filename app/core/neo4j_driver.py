from app.core.config import settings
from neo4j import GraphDatabase

class Neo4jDriver:
    def __init__(self):
        self.driver = None

    def init_driver(self, uri: str, username: str, password: str):
        self.driver = GraphDatabase.driver(uri, auth=(username, password))
        self.driver.verify_connectivity()

    def get_driver(self):
        return self.driver

    def close_driver(self):
        if self.driver is not None:
            self.driver.close()
            self.driver = None