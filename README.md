<p align="center">
  Desafio MyCareforce
</p>

## Description

Criação de usuário e login.

## 

- Api prod - [Prod - Api](https://desafio-mycareforce.onrender.com/api)

- Api dev - [Dev - Api](http://localhost:3000/api)

- Front prod - [Prod - Front](https://desafio-mycareforce-front.onrender.com/)


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
