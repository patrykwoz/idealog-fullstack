#!/bin/bash
set -e

# Create the database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (
            SELECT FROM pg_database
            WHERE datname = '$POSTGRES_DB') THEN
            CREATE DATABASE "$POSTGRES_DB";
        END IF;
    END
    \$\$;
EOSQL

# Create the user and grant privileges
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO \$\$
    BEGIN
        IF NOT EXISTS (
            SELECT FROM pg_catalog.pg_roles
            WHERE rolname = 'beaver') THEN
            CREATE ROLE beaver LOGIN;
        END IF;
    END
    \$\$;

    GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO beaver;
EOSQL
