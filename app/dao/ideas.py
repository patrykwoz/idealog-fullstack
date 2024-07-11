class IdeaDAO:
    """Data Access Object for Idea nodes in the graph database.
    This constructor takes a Neo4j driver as an argument, which will be
    used to interact with the Neo4j database.
    """
    def __init__(self, driver) -> None:
        self.driver = driver

    def all(self, sort, order, limit=10, skip=0, owner_email=None):
        def get_ideas(tx, sort, order, limit, skip, owner_email):
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
                            owner_email=owner_email)
            return [record["idea"] for record in result]
        
        with self.driver.session() as session:
            return session.execute_read(get_ideas, sort, order, limit, skip, owner_email)
        
    def get(self, name):
        def get_idea(tx):
            cypher = """
                MATCH (idea:Idea {name: $name})
                RETURN idea"""
            result = tx.run(cypher, name=name)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_read(get_idea)
    
    def create(self, name, description, owner_email, owner_sql_id):
        def create_idea(tx, name, description, owner_email, owner_sql_id):
            cypher = """
                CREATE (idea:Idea {
                    name: $name,
                    description: $description,
                    owner_email: $owner_email,
                    owner_sql_id: $owner_sql_id,
                    created_at: timestamp(),
                    updated_at: timestamp()          
                })
                WITH idea
                MATCH (user:User {email: $owner_email})
                MERGE (user)-[:OWNS]->(idea)
                RETURN idea
            """
            result = tx.run(
                cypher,
                name=name,
                description=description,
                owner_email=owner_email,
                owner_sql_id=owner_sql_id)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_write(
                create_idea,
                name,
                description,
                owner_email,
                owner_sql_id)
    
    def update(self, name, description):
        def update_idea(tx, name, description):
            cypher = """
                MATCH (idea:Idea {name: $name})
                SET idea.description = $description,
                    idea.updated_at = timestamp()
                RETURN idea
            """
            result = tx.run(
                cypher,
                name=name,
                description=description)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_write(
                update_idea,
                name,
                description)
    
    def delete(self, name):
        def delete_idea(tx, name):
            cypher = """
                MATCH (idea:Idea {name: $name})
                DETACH DELETE idea
                RETURN COUNT(idea) AS deleted_count
            """
            result = tx.run(cypher, name=name)
            return result.single()["deleted_count"]
        
        with self.driver.session() as session:
            success = session.execute_write(delete_idea, name)
            if success:
                return {"message": "Idea deleted"}
            else:
                return {"message": "Idea not found"}