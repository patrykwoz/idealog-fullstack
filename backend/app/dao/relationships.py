class RelDAO:
    def __init__(self, driver):
        self.driver = driver

    def all(self, sort, order, limit, skip):
        def get_relationships(tx, sort, order, limit, skip):
            cypher = f"""
                MATCH (n)-[r]->(m)
                RETURN n, r, m
                ORDER BY n.{sort} {order}
                SKIP $skip LIMIT $limit
            """
            result = tx.run(cypher, limit=limit, skip=skip)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_read(get_relationships, sort, order, limit, skip)

    def create(self, node1, node2, rel_type, name):
        def create_relationship(tx, node1, node2, rel_type, name):
            rel_type = rel_type.upper()
            cypher = f"""
                MATCH (n {{name: $node1}}), (m {{name: $node2}})
                MERGE (n)-[r:{rel_type}]->(m)
                ON CREATE SET r.created_at = timestamp(), r.name = $name
                ON MATCH SET r.updated_at = timestamp(), r.name = $name
                RETURN n, r, m
            """
            result = tx.run(
                cypher,
                node1=node1,
                node2=node2,
                rel_type=rel_type,
                name=name)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_write(
                create_relationship,
                node1,
                node2,
                rel_type,
                name)

    def delete(self, node1, node2, rel_type):
        def delete_relationship(tx, node1, node2, rel_type):
            cypher = f"""
                MATCH (n)-[r:{rel_type}]->(m)
                WHERE n.name = $node1 AND m.name = $node2
                DELETE r
                RETURN n, r, m
            """
            result = tx.run(
                cypher,
                node1=node1,
                node2=node2)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_write(
                delete_relationship,
                node1,
                node2,
                rel_type)