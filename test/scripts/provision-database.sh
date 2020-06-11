#!/usr/bin/env sh

set -ex

# Postgres Variables
PG_CONNECTION_STRING=postgres://postgres:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE

# Run migrations
yarn build && yarn migration:run

# Add student
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (998, 'Josh', 'Cummings', 'joshcummingsdesign@gmail.com', 'Bass', 'student')"
psql $PG_CONNECTION_STRING -c "insert into auth values (998, '\$2b\$10\$3o9PNc10tKhMHuU9gcxnYeOs2Bpr9LMqefjnqiREWUkOqGLLzVL52')"

# Add teacher
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (999, 'Victor', 'Wooten', 'victorwooten@gmail.com', 'Bass', 'teacher')"
psql $PG_CONNECTION_STRING -c "insert into auth values (999, '\$2b\$10\$3o9PNc10tKhMHuU9gcxnYeOs2Bpr9LMqefjnqiREWUkOqGLLzVL52')"

# Add availabilities
psql $PG_CONNECTION_STRING -c "insert into availability values (998, 999, '2020-06-20', '09:00:00', false)"
psql $PG_CONNECTION_STRING -c "insert into availability values (999, 999, '2020-06-20', '10:00:00', true)"

# Add lessons
psql $PG_CONNECTION_STRING -c "insert into lesson values (999, 998, 999, '2020-06-20', '09:00:00')"
