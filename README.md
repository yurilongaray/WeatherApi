<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Obs.: Configure your local mongo according to "mongo.connection.ts"

## Available Apis

### Health
method: GET
path: '/'
authentication: none
Request:
```bash
  curl --location --request GET 'https://weather-backend-yxlc.herokuapp.com/'
```

### Register User
Method: POST
Path: '/user/register'
Authentication: none
Request:
```bash
  curl --location --request POST 'https://weather-backend-yxlc.herokuapp.com/user/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "name": "Your Name",
      "email": "email@domain.com",
      "password": "passwordExample"
  }'
```

### Login
Method: POST
Path: '/auth/login'
Authentication: none
Request:
```bash
  curl --location --request POST 'https://weather-backend-yxlc.herokuapp.com/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "email@domain.com",
      "password": "passwordExample"
  }'
```

### Weather
Method: POST
Path: '/weather'
Authentication: JWT
Request:
```bash
  curl --location --request GET 'https://weather-backend-yxlc.herokuapp.com/weather?city=Vancouver' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWW91ciBOYW1lIiwiZW1haWwiOiJlbWFpbEBkb21haW4uY29tIiwiaWQiOiI2MDU3ZjFmM2U0NmJhNjAwMTUwMzQ4NzciLCJpYXQiOjE2MTYzNzYzNzgsImV4cCI6MTYxNjQxMjM3OH0.liSm-2LVZwaMSPnPp5_919VKB6dTm0ux-mpJtNyh6qw'
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
#build
$ npm run build

# development
$ npm start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm test
```