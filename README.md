# Nest Demo

A demo application built with [NestJS](https://nestjs.com/).

## Requirements

- Node ^13.12.0
- Yarn ^1.22.4

## Getting Started

1.  Install the project dependencies

        yarn

2.  Copy `.env.sample` to `.env`

        cp .env.sample .env

3. Export the test keys

        export JWT_PRIVATE_KEY=`cat test/keys/private.pem`
        export JWT_PUBLIC_KEY=`cat test/keys/public.pem`

4.  Start the [Docker](https://docs.docker.com/get-docker/) services

        docker-compose -f docker/docker-compose.yaml up

5.  Run the database provisioning script

        ./test/scripts/provision-database.sh

6.  Start the local development server

        yarn start:dev
