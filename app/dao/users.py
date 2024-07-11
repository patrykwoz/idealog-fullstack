class UserDAO:
    def __init__(self, driver) -> None:
        self.driver = driver
    
    def create(self, name, email):
        """
        Creates a new user in the neo4j database.
        """
        def create_user(tx, name, email):
            cypher = """
                CREATE (user:User {
                    email: $email,
                    name: $name,
                    created_at: timestamp(),
                    updated_at: timestamp()          
                })
                RETURN user
            """
            result = tx.run(cypher, name=name, email=email)
            return result.single()["user"]
        
        with self.driver.session() as session:
            return session.execute_write(create_user, name, email)

    
