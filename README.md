<p align="center">
  Desafio MyCareforce
</p>

## Description

Criação de usuário e login.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app
```bash
# init
$ docker-compose up -d

# access terminal redis  (desafio_mycareforce_cache_1 is container name)
$ docker exec -it desafio_mycareforce_cache_1 redis-cli -a 12345 
$ KEYS *

```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Patrícia Silva Oliveira](https://www.linkedin.com/in/patricia-silva-oliveira-/)
