# LearnHub backend

The backend is a Flask REST API connected to PostgreSQL.

## Requirements

- Python 3.11 or newer
- Pipenv
- PostgreSQL

## Setup

From the `backend` directory:

```bash
pipenv install
cp .env.example .env
```

Update `DATABASE_URL` in `.env` with your PostgreSQL credentials and make sure a database named `learnhub` exists.

Run the development server:

```bash
pipenv run python run.py
```

The API health endpoint is available at:

```text
http://localhost:5000/api/health
```

## Database migrations

Initialize migrations once:

```bash
pipenv run flask db init
pipenv run flask db migrate -m "Initial LearnHub models"
pipenv run flask db upgrade
```
