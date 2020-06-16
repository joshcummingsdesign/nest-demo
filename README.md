# BookLesson API (REST)

[![joshcummingsdesign](https://circleci.com/gh/joshcummingsdesign/booklesson-api-rest.svg?style=svg)](https://circleci.com/gh/joshcummingsdesign/booklesson-api-rest)

A demo music lesson booking REST API built with [NestJS](https://nestjs.com/).

## Documentation

[Check out the API documentation.](https://documenter.getpostman.com/view/5657753/SzzhdJ6t)

## Requirements

- Node ^13.12.0
- Yarn ^1.22.4

## Getting Started

1.  Install the project dependencies

        yarn

2.  Copy `.env.example` to `.env` and make sure to export the variables to your environment

        cp .env.example .env

3. Export the test keys

        export JWT_PRIVATE_KEY=`cat test/keys/private.pem`
        export JWT_PUBLIC_KEY=`cat test/keys/public.pem`

4.  Start the [Docker](https://docs.docker.com/get-docker/) services

        docker-compose -f docker/docker-compose.yaml up

5.  Run the database provisioning script

        ./test/scripts/provision-database.sh

6.  Start the local development server

        yarn start:dev
