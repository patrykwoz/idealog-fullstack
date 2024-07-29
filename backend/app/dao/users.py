class UserDAO:
    def __init__(self, driver) -> None:
        self.driver = driver
    
    def create(self, name, email, sql_id):
        def create_user(tx, name, email, sql_id):
            cypher = """
                CREATE (user:User {
                    email: $email,
                    name: $name,
                    sql_id: $sql_id,
                    created_at: timestamp(),
                    updated_at: timestamp()          
                })
                RETURN user
            """
            result = tx.run(cypher, name=name, email=email, sql_id=sql_id)
            return result.single()["user"]
        
        with self.driver.session() as session:
            return session.execute_write(create_user, name, email, sql_id)
    
    def update(self, name, email, sql_id):
        def update_user(tx, name, email, sql_id):
            cypher = """
                MATCH (user:User {sql_id: $sql_id})
                SET user.name = $name, user.email = $email, user.updated_at = timestamp()
                RETURN user
            """
            result = tx.run(cypher, name=name, email=email, sql_id=sql_id)
            return result.single()["user"]
        
        with self.driver.session() as session:
            return session.execute_write(update_user, name, email, sql_id)