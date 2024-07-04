# IdeaLog API Project

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
    - 🛜 [Neo4j](https://neo4j.com/) as the graph database.
- 🚀 [React](https://react.dev) for the frontend (separate repo).
    - 💃 Built using Next.js framework.
    - 🦇 Dark mode support.
    - ▶️ Goto [IdeaLog Frontend](https://github.com/patrykwoz/idealog-frontend) for details.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔒 Secure password hashing.
- 🔑 JWT (JSON Web Token) authentication.
- 📫 Email based password recovery.
- ✅ Tests with [Pytest](https://pytest.org).
- 🚢 Deployment instructions using Docker Compose proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.
