class IdeaDAO:
    def __init__(self, driver) -> None:
        self.driver = driver

    def all(self):
        def get_ideas(tx):
            cypher = "MATCH (n) RETURN n"
            result = tx.run(cypher)
            return [record["n"] for record in result]
        
        with self.driver.session() as session:
            return session.execute_read(get_ideas)