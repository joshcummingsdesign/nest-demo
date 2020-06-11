#!/usr/bin/env sh

set -ex

# Postgres Variables
PG_CONNECTION_STRING=postgres://postgres:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE

# Run migrations
yarn build && yarn migration:run

# Add student
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (1, 'Josh', 'Cummings', 'joshcummingsdesign@gmail.com', 'Bass', 'student')"
psql $PG_CONNECTION_STRING -c "insert into auth values (1, '\$2b\$10\$3o9PNc10tKhMHuU9gcxnYeOs2Bpr9LMqefjnqiREWUkOqGLLzVL52')"

# Add teacher
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (2, 'Victor', 'Wooten', 'victorwooten@gmail.com', 'Bass', 'teacher')"
psql $PG_CONNECTION_STRING -c "insert into auth values (2, '\$2b\$10\$3o9PNc10tKhMHuU9gcxnYeOs2Bpr9LMqefjnqiREWUkOqGLLzVL52')"

# Add availabilities
psql $PG_CONNECTION_STRING -c "insert into availability values (1, 2, '2020-06-20', '09:00:00', false)"
psql $PG_CONNECTION_STRING -c "insert into availability values (2, 2, '2020-06-20', '10:00:00', true)"

# Add lessons
psql $PG_CONNECTION_STRING -c "insert into lesson values (1, 1, 2, '2020-06-20', '09:00:00')"
