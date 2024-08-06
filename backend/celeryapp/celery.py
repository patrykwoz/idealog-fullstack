from celery import Celery

app = Celery('celeryapp',
             broker='amqp://',
             backend='rpc://',
             include=['celeryapp.tasks'])

app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    app.start()