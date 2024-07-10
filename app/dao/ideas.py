class IdeaDAO:
    """Data Access Object for Idea nodes in the graph database.
    This constsructor takes a Neo4j driver as an argument, which will be
    used to interact with the Neo4j database.
    """
    def __init__(self, driver) -> None:
        self.driver = driver

    """
    This method returns all the ideas in the database. It takes the following
    arguments:
    - sort: the property to sort the ideas by
    - order: the order to sort the ideas by
    - limit: the maximum number of ideas to return
    - owner_id: the ID of the user to filter the ideas by (optional)
    """
    def all(self, sort, order, limit=10, skip=0, owner_id=None):
        def get_ideas(tx, sort, order, limit, skip, owner_id):
            cypher = """
                MATCH (idea:Idea)
                WHERE idea.`{0}` IS NOT NULL
                RETURN idea {{
                    .*
                }} AS idea
                ORDER BY idea.`{0}` {1}
                SKIP $skip
                LIMIT $limit
            """.format(sort, order)

            result = tx.run(cypher,
                            limit=limit,
                            skip=skip,
                            owner_id=owner_id)
            return [record["idea"] for record in result]
        
        with self.driver.session() as session:
            return session.execute_read(get_ideas, sort, order, limit, skip, owner_id)
    
    
    def get(self, idea_id):
        """
        This method returns a single idea by its ID. It takes the following arguments:
        - idea_id: the ID of the idea to return
        If the idea is not found, this method will return None.
        """
        def get_idea(tx):
            cypher = "MATCH (n) WHERE ID(n) = $idea_id RETURN n"
            result = tx.run(cypher, idea_id=idea_id)
            return result.single()["n"]
        
        with self.driver.session() as session:
            return session.execute_read(get_idea)
    
    def create(self, label, description, owner_id):
        """
        Creates a new idea in the database. It takes the following arguments:
        - label: the label of the idea
        - description: the description of the idea
        - owner_id: the ID of the user creating the idea
        """
        def create_idea(tx, label, description, owner_id):
            cypher = """
                CREATE (idea:Idea {
                    label: $label,
                    description: $description,
                    owner_id: $owner_id,
                    created_at: timestamp(),
                    updated_at: timestamp()          
                })
                WITH idea
                MATCH (user:User {id: $owner_id})
                MERGE (user)-[:OWNS]->(idea)
                RETURN idea
            """
            result = tx.run(cypher, label=label, description=description, owner_id=owner_id)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_write(create_idea, label, description, owner_id)
        