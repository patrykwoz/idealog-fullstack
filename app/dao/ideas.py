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
        
    def get(self, label):
        def get_idea(tx):
            cypher = """
                MATCH (idea:Idea {label: $label})
                RETURN idea"""
            result = tx.run(cypher, label=label)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_read(get_idea)
    
    def create(self, label, description, owner_email, owner_sql_id):
        def create_idea(tx, label, description, owner_email, owner_sql_id):
            cypher = """
                CREATE (idea:Idea {
                    label: $label,
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
                label=label,
                description=description,
                owner_email=owner_email,
                owner_sql_id=owner_sql_id)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_write(
                create_idea,
                label,
                description,
                owner_email,
                owner_sql_id)
    
    def update(self, label, description):
        def update_idea(tx, label, description):
            cypher = """
                MATCH (idea:Idea {label: $label})
                SET idea.description = $description,
                    idea.updated_at = timestamp()
                RETURN idea
            """
            result = tx.run(
                cypher,
                label=label,
                description=description)
            return result.single()["idea"]
        
        with self.driver.session() as session:
            return session.execute_write(
                update_idea,
                label,
                description)
    
    def delete(self, label):
        def delete_idea(tx, label):
            cypher = """
                MATCH (idea:Idea {label: $label})
                DETACH DELETE idea
                RETURN COUNT(idea) AS deleted_count
            """
            result = tx.run(cypher, label=label)
            return result.single()["deleted_count"]
        
        with self.driver.session() as session:
            success = session.execute_write(delete_idea, label)
            if success:
                return {"message": "Idea deleted"}
            else:
                return {"message": "Idea not found"}