ARG PYTHON_VERSION=3.10.12
FROM python:${PYTHON_VERSION} as base

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN python --version

COPY ./app /code/app
COPY ./celeryapp /code/celeryapp

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
