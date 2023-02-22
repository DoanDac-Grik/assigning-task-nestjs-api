<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Assigning Task - Better team management and work progress 😋</p>
    <p align="center">

## Description

Apis of application that helps manage tasks and progress of members in team.
This application is constantly updated for learning purpose and showing experience to recruiters.

Swagger api documentation: `localhost:3000/documentation`

## Features

- Register/login/forgot and reset password for user
- Two factor authentication with QR Code
- Authorization manager and members using claim-base authorization
- CRUD work (bunch of tasks)
- CRUD task, assign/unassign task, assign reviewer for this task
- Send mail notification when member is assigned to task or assigned to review a task

`Updating: Bot Telegram, refactor to better authorization, upload document to S3,...`

## Tech Stack

- Language: TypeScript
- Framework: NestJS,
- Database: MongoDB
- ORM: Mongoose
- Queue/Cache: Redis
- API Documentation: Swagger
- AWS: S3 (update later)
- Others: NodeMailer (using Mailtrap to test send mail)

## Installation

Clone the repository

```bash
$ git clone https://github.com/DoanDac-Grik/assigning-task-nestjs-api
```

Install dependencies

```bash
$ npm install
```

## Running the app

Before running app, ensure that Redis is running and .env is setted properly

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Feedback and Help

If you have any questions or have suggestions about my application, do not hesitate to contact me via information below.

## Stay in touch

- Author - [Doan Van Dac](https://www.facebook.com/humanbeatbox.grik/)

## License

Nest is [MIT licensed](LICENSE).
