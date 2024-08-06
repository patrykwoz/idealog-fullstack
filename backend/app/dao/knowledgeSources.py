class KnowledgeDAO:
    def __init__(self, driver):
        self.driver = driver

    def all(self, sort, order, limit=10, skip=0, owner_email=None):
        def get_knowledge_sources(tx, sort, order, limit, skip, owner_email):
            cypher = """
                MATCH (knowledge_source:KnowledgeSource)
                WHERE knowledge_source.`{0}` IS NOT NULL
                RETURN knowledge_source {{
                    .*
                }} AS knowledge_source
                ORDER BY knowledge_source.`{0}` {1}
                SKIP $skip
                LIMIT $limit
            """.format(sort, order)

            result = tx.run(cypher,
                            limit=limit,
                            skip=skip,
                            owner_email=owner_email)
            return [record["knowledge_source"] for record in result]
        
        with self.driver.session() as session:
            return session.execute_read(get_knowledge_sources, sort, order, limit, skip, owner_email)
    
    def get(self, name):
        def get_knowledge_source(tx):
            cypher = """
                MATCH (knowledge_source:KnowledgeSource {name: $name})
                RETURN knowledge_source"""
            result = tx.run(cypher, name=name)
            return result.single()["knowledge_source"]
        
        with self.driver.session() as session:
            return session.execute_read(get_knowledge_source)
        
    def create(self,
               name,
               summary,
               full_text, url,
               owner_email,
               owner_sql_id,
               entities,
               relations):
        def create_knowledge_source(tx,
                                    name,
                                    summary,
                                    full_text,
                                    url,
                                    owner_email,
                                    owner_sql_id,
                                    entities,
                                    relations):
            cypher = """
                CREATE (knowledge_source:KnowledgeSource {
                    name: $name,
                    summary: $summary,
                    full_text: $full_text,
                    url: $url,
                    owner_email: $owner_email,
                    owner_sql_id: $owner_sql_id,
                    created_at: timestamp(),
                    updated_at: timestamp()          
                })
                WITH knowledge_source
                MATCH (user:User {email: $owner_email})
                MERGE (user)-[:OWNS]->(knowledge_source)
                RETURN knowledge_source
            """
            result = tx.run(
                cypher,
                name=name,
                summary=summary,
                full_text=full_text,
                url=url,
                owner_email=owner_email,
                owner_sql_id=owner_sql_id)
            knowledge_source =  result.single()["knowledge_source"]

            # Create entities
            for entity_name, entity_data in entities.items():
                entity_cypher = """
                    MATCH (knowledge_source:KnowledgeSource {name: $name})
                    CREATE (entity:Entity {
                        name: $entity_name,
                        url: $entity_data.url,
                        summary: $entity_data.summary,
                        created_at: timestamp(),
                        updated_at: timestamp() 
                    })
                    MERGE (knowledge_source)-[:HAS_ENTITY]->(entity)
                """
                tx.run(
                    entity_cypher,
                    name=name,
                    entity_name=entity_name,
                    entity_data=entity_data)
            
            # Create relations
            for relation in relations:
                relation_cypher = """
                    MATCH (head:Entity {name: $head}), (tail:Entity {name: $tail})
                    MERGE (head)-[r:%s]->(tail)
                """ % relation["type"].replace(" ", "_").upper()
                tx.run(
                    relation_cypher,
                    head=relation["head"],
                    tail=relation["tail"])
            
            return knowledge_source
        
        with self.driver.session() as session:
            return session.execute_write(
                create_knowledge_source,
                name,
                summary,
                full_text,
                url,
                owner_email,
                owner_sql_id,
                entities,
                relations)
        