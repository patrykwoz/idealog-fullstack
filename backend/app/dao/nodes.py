# this is for generic node operations
class NodeDAO():
    def __init__(self, driver):
        self.driver = driver

    def all(self, sort, order, limit, skip):
        def get_nodes(tx, sort, order, limit, skip):
            cypher = f"""
                MATCH (n)
                RETURN n
                ORDER BY n.{sort} {order}
                SKIP $skip LIMIT $limit
            """
            result = tx.run(cypher, limit=limit, skip=skip)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_read(get_nodes, sort, order, limit, skip)
    
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