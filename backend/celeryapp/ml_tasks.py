from app.core.config import settings


from .celery import app
from app.dao.knowledgeSources import KnowledgeDAO
if settings.ENVIRONMENT == "local":
    from celeryapp.ml.class_kb import from_text_to_kb
from app.models_neo4j import KnowledgeCreate

from app.core.neo4j_db import neo4j_driver

driver = neo4j_driver.get_driver()
#try conditional imports to optimize for deployment
@app.task
def createKnowledgeSource(
    current_user_id,
    current_user_email,
    knowledge_data):
    """Create a knowledge_source."""
    dao = KnowledgeDAO(driver)
    if 'entities' not in knowledge_data or knowledge_data['entities'] is None:
        knowledge_data['entities'] = {}
    if 'relations' not in knowledge_data or knowledge_data['relations'] is None:
        knowledge_data['relations'] = []
    knowledge_in = KnowledgeCreate(**knowledge_data)
    ks_name = "initialize"
    try:
        if knowledge_in.use_ml:
            #use ml model to process the text and extract entities and relations

            if settings.ENVIRONMENT == "local":
                kb = from_text_to_kb(
                    text=knowledge_in.full_text,
                    article_url=knowledge_in.url,
                    article_title=knowledge_in.name)
                kb_data = kb.to_json()
                knowledge_in.entities = kb_data.get('entities', {})
                knowledge_in.relations = kb_data.get('relations', [])
            else:
                knowledge_in.entities = {}
                knowledge_in.relations = []

            
        output = dao.create(
            knowledge_in.name,
            knowledge_in.summary,
            knowledge_in.full_text,
            knowledge_in.url,
            current_user_email,
            current_user_id,
            knowledge_in.entities,
            knowledge_in.relations,
        )

        ks_name = output['name']

    except Exception as e:
        raise Exception(f"Error creating knowledge source: {e}")
    return ks_name