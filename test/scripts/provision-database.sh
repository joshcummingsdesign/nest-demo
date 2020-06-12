#!/usr/bin/env sh

set -ex

# Postgres Variables
PG_CONNECTION_STRING=postgres://postgres:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE

# Run migrations
yarn build && yarn migration:run

# Add roles
psql $PG_CONNECTION_STRING -c "insert into role values (998, 'student')"
psql $PG_CONNECTION_STRING -c "insert into role values (999, 'teacher')"

# Add instruments
psql $PG_CONNECTION_STRING -c "insert into instrument values (996, 'guitar')"
psql $PG_CONNECTION_STRING -c "insert into instrument values (997, 'piano')"
psql $PG_CONNECTION_STRING -c "insert into instrument values (998, 'bass')"
psql $PG_CONNECTION_STRING -c "insert into instrument values (999, 'drums')"

# Add student
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (998, 'Josh', 'Cummings', 'joshcummingsdesign@gmail.com', 998, 996)"
psql $PG_CONNECTION_STRING -c "insert into auth values (998, '\$2b\$10\$cXgg5wDCGmVq6JMLNO4/pOm0V5NMKJW2RDoktJba4FFkpa.oxrHHe')"

# Add teacher
psql $PG_CONNECTION_STRING -c "insert into \"user\" values (999, 'Kurt', 'Rosenwinkel', 'kurtrosenwinkel@gmail.com', 999, 996)"
psql $PG_CONNECTION_STRING -c "insert into auth values (999, '\$2b\$10\$cXgg5wDCGmVq6JMLNO4/pOm0V5NMKJW2RDoktJba4FFkpa.oxrHHe')"

# Add availabilities
psql $PG_CONNECTION_STRING -c "insert into availability values (998, 999, '2020-06-20T16:00:00Z', false)"
psql $PG_CONNECTION_STRING -c "insert into availability values (999, 999, '2020-06-20T17:00:00Z', true)"

# Add lessons
psql $PG_CONNECTION_STRING -c "insert into lesson values (999, 998, 999, '2020-06-20T16:00:00Z')"
