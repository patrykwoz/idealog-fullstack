# this is for generic node operations
class NodeDAO():
    def __init__(self, driver):
        self.driver = driver

    def all(self, search, sort, order, limit, skip):
        def get_nodes(tx, search, sort, order, limit, skip):
            cypher = f"""
                MATCH (n)
                WHERE toLower(n.name) CONTAINS toLower($search)
                OR toLower(n.description) CONTAINS toLower($search)
                OR toLower(n.summary) CONTAINS toLower($search)
                RETURN n {{.*, labels: labels(n), neo4j_id: id(n) }} AS node_with_labels
                ORDER BY n.{sort} {order}
                SKIP $skip LIMIT $limit
            """
            result = tx.run(cypher, search=search, limit=limit, skip=skip)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_read(get_nodes, search, sort, order, limit, skip)
    
    def get(self, name):
        def get_node(tx, name):
            cypher = f"""
                MATCH (n {{name: $name}})
                RETURN n {{.*, labels: labels(n) }} AS node_with_labels
            """
            result = tx.run(cypher, name=name)
            return result.single()

        with self.driver.session() as session:
            return session.execute_read(get_node, name)


    # TODO: actually change this to accept a dictionary of properties to update and a list of labels
    def update(self, name, label):
        def update_node(tx, name, label):
            cypher = f"""
                MATCH (n {{name: $name}})
                SET n:$label
                RETURN n
            """
            result = tx.run(cypher, name=name, label=label)
            return result.single()["n"]

        with self.driver.session() as session:
            return session.execute_write(update_node, name, label)

    def create(self, name, description, label):
        def create_node(tx, name, description, label):
            cypher = f"""
                CREATE (n:{label} {{name: $name, description: $description}})
                RETURN n
            """
            result = tx.run(cypher, name=name, description=description)
            return result.single()["n"]

        with self.driver.session() as session:
            return session.execute_write(create_node, name, description, label)