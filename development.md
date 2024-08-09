# IdeaLog Project - Development
Before starting development, ensure you rename the example `.env` files by removing the `.example` suffix and populating the placeholders with your specific configuration data.

## Development with Docker Compose
Using Docker Compose for development can be slower due to the significant performance requirements of the IdeaLog setup, but it is valuable for collaborative work and consistent environment setup. I also use it for deployment to platforms like Heroku.

Ensure Docker Desktop is installed before running the following command:

```
docker compose up --build
```
Docker Compose will build and start all necessary services, serving the backend at http://localhost:8000 and the frontend at http://localhost:3000. Once everything is up and running, you can begin interacting with the application.

## Local development using native functions
For faster development, I recommend running the individual services in separate terminals. This approach is particularly effective for Next.js, as running the development server natively is faster than using Docker.

Before starting the backend, make sure to set up your database properly.

### Fastapi
Create a development environment by running the following command:
```
python -m venv venv
```

Activate the development environment from the root directory:
```
source backend/venv/bin/activate
```
Start the FastAPI development server:
```
fastapi dev backend/app/main.py
```
### RabbitMQ
Ensure RabbitMQ is installed and running. RabbitMQ is used as a message broker for background tasks managed by Celery.

### Celery Worker
From the root directory, you may need to set the Python path before starting the Celery worker. Run the following command:
```
export PYTHONPATH="$PYTHONPATH:/path/to/your/idealog-backend/backend"
```
Replace /path/to/your/idealog-backend/backend with the actual path to your project.
Then, start the Celery worker:
```
celery -A backend.celeryapp.celery worker --pool threads -l INFO
```

### Next.js

Navigate to the /frontend folder in a terminal and run the following command to start the Next.js development server:
```
npm run dev
```
This will launch the frontend development server, typically accessible at http://localhost:3000.