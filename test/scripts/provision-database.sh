#!/usr/bin/env sh

set -ex

# Run migrations
yarn build && yarn migration:run

# Add roles
psql $DATABASE_URL -c "insert into role values (998, 'student')"
psql $DATABASE_URL -c "insert into role values (999, 'teacher')"

# Add instruments
psql $DATABASE_URL -c "insert into instrument values (996, 'guitar')"
psql $DATABASE_URL -c "insert into instrument values (997, 'piano')"
psql $DATABASE_URL -c "insert into instrument values (998, 'bass')"
psql $DATABASE_URL -c "insert into instrument values (999, 'drums')"

# Add student
psql $DATABASE_URL -c "insert into \"user\" values (998, 'Josh', 'Cummings', 'joshcummingsdesign@gmail.com', 998, 996)"
psql $DATABASE_URL -c "insert into auth values (998, '\$2b\$10\$cXgg5wDCGmVq6JMLNO4/pOm0V5NMKJW2RDoktJba4FFkpa.oxrHHe')"

# Add teacher
psql $DATABASE_URL -c "insert into \"user\" values (999, 'Kurt', 'Rosenwinkel', 'kurtrosenwinkel@gmail.com', 999, 996)"
psql $DATABASE_URL -c "insert into auth values (999, '\$2b\$10\$cXgg5wDCGmVq6JMLNO4/pOm0V5NMKJW2RDoktJba4FFkpa.oxrHHe')"

# Add availabilities
psql $DATABASE_URL -c "insert into availability values (998, 999, '2020-06-20T09:00:00-07:00', false)"
psql $DATABASE_URL -c "insert into availability values (999, 999, '2020-06-20T10:00:00-07:00', true)"

# Add lessons
psql $DATABASE_URL -c "insert into lesson values (999, 998, 999, '2020-06-20T09:00:00-07:00')"
