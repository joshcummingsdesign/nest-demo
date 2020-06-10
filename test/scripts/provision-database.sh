#!/usr/bin/env sh

set -ex

# Postgres Variables
PG_HOST=postgres://postgres:$DB_PASSWORD@$DB_HOST:$DB_PORT
PG_CONNECTION_STRING=$PG_HOST/$DB_DATABASE

# Create database
psql $PG_HOST -c "create database $DB_DATABASE"

# Run migrations
yarn build && yarn migration:run

# Add users
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (1, 'Josh', 'Cummings', 'joshcummingsdesign@gmail.com', 'Bass', 'student')"
psql $PG_CONNECTION_STRING -c "insert into auth values (1, '\$2b\$10\$3o9PNc10tKhMHuU9gcxnYeOs2Bpr9LMqefjnqiREWUkOqGLLzVL52')"
