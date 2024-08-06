class RelDAO:
    def __init__(self, driver):
        self.driver = driver

    def all(self, sort, order, limit, skip):
        def get_relationships(tx, sort, order, limit, skip):
            cypher = f"""
                MATCH (n)-[r]->(m)
                RETURN n{{.name, labels:labels(n), neo4j_id: elementId(n)}}, {{name: r.name, type: type(r)}} AS relationship_details, m{{.name, labels:labels(m), neo4j_id: elementId(m)}}
                SKIP $skip LIMIT $limit
            """
            result = tx.run(cypher, limit=limit, skip=skip)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_read(get_relationships, sort, order, limit, skip)

    def create(self, head, tail, rel_type, name):
        def create_relationship(tx, head, tail, rel_type, name):
            rel_type = rel_type.upper()
            cypher = f"""
                MATCH (n {{name: $head}}), (m {{name: $tail}})
                MERGE (n)-[r:{rel_type}]->(m)
                ON CREATE SET r.created_at = timestamp(), r.name = $name
                ON MATCH SET r.updated_at = timestamp(), r.name = $name
                RETURN n, r, m
            """
            result = tx.run(
                cypher,
                head=head,
                tail=tail,
                rel_type=rel_type,
                name=name)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_write(
                create_relationship,
                head,
                tail,
                rel_type,
                name)

    def delete(self, head, tail, rel_type):
        def delete_relationship(tx, head, tail, rel_type):
            cypher = f"""
                MATCH (n)-[r:{rel_type}]->(m)
                WHERE n.name = $head AND m.name = $tail
                DELETE r
                RETURN n, r, m
            """
            result = tx.run(
                cypher,
                head=head,
                tail=tail)
            return [record for record in result]

        with self.driver.session() as session:
            return session.execute_write(
                delete_relationship,
                head,
                tail,
                rel_type)