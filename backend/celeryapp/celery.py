from celery import Celery
import os
from celeryapp.celeryconfig import celery_settings

# broker_url = os.getenv('CELERY_BROKER_URL', 'amqp://rabbitmq:5672//')
# backend_url = os.getenv('CELERY_RESULT_BACKEND', 'rpc://')

# broker='amqp://',
# backend='rpc://',

broker_url = celery_settings.CELERY_BROKER_URL
backend_url = celery_settings.CELERY_RESULT_BACKEND

app = Celery('celeryapp',
             broker=broker_url,
             backend=backend_url,
             include=['celeryapp.tasks', 'celeryapp.ml_tasks'])

app.conf.update(
    result_expires=3600,
    worker_prefetch_multiplier=1,
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    worker_max_tasks_per_child=1,
    worker_max_memory_per_child=6000000,
    task_time_limit=300,  
    task_soft_time_limit=270,  
    worker_send_task_events=True,
)

if __name__ == '__main__':
    app.start()