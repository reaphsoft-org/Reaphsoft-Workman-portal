# Reaphsoft Workmen Backend
## Database
### Setup
1. Download and install [PostgreSQL](https://www.postgresql.org/download/windows/) on your machine (or server)
2. While installing, you would be prompted to input a password for a default `postgres` superuser.
3. After installing, start `pg_ctl` by running
    ```
    pg_ctl start -l logfile -D "C:\<FullPathTo>\PostgreSQL\15\data"   
    ```
   or
   ```
    pg_ctl start -l logfile -D "C:\Program Files\PostgreSQL\16\data"    
   ```
4. The above command needs to be run whenever you restart your machine. Or when you notice the database is not connecting. 
5. Create a user via the command below. When prompted, enter `reaphsoft` as password.
    ```
    createuser -s -P -e --username=postgres reaphsoft
    ```
6. Type `psql --username=postgres` and enter your `postgres` password. Then input `\du` to confirm that the account was successfully created.
7. Create database using the command below, also create `reaphsoft_workmen_test.db` if you will be running automated tests.
    ```
    createdb -e -U reaphsoft reaphsoft_workmen.db "an optional comment"
    ```
8. You can see the list of created databases using
    ```
    psql --username=postgres
    ```
    Then enter the command below and confirm `reaphsoft_workmen.db` is amongst the databases.
    ```
    \l
    ```
9. To delete database, 
   ```
   dropdb -e -U reaphsoft reaphsoft_workmen.db
   ```

### Packages
Run 
```
npm install --save @nestjs/typeorm typeorm pg
```

### Creating controllers and services
```
nest generate controller users
```
```
nest generate service users
```

1. Create a `dto` dir in the created folder (`users`) in the above case.
2. Define a DTO name the file `user.dto.ts` for example. See samples.
3. Implement endpoint in `user.controller.ts`.

### Saving Images
Install Multer Types, and see sample codes.
```
npm install --save-dev @types/multer
```

Add test cases in `app.e2e-spec.ts` and run the command below from the CMD (backend)
```
npm run test:e2e
```

### Testing
```
npm install --save-dev @nestjs/testing jest @types/jest ts-jest
npm install --save-dev supertest @types/supertest
```
Install `cross-env` for setting environment variables
```
npm install --save-dev cross-env
```
#### References
1. [Jest](https://jestjs.io/)
2. [Super Test](https://github.com/ladjs/supertest)
3. [Super Agent](https://ladjs.github.io/superagent/#test-documentation)

### Create PDFs
[Details](https://github.com/chaitanyamogal/pdf-master)
Install package
```
npm install pdf-master --save
```
See also
1. [Puppeteer](https://pptr.dev/guides/pdf-generation)
2. [pdf-master generatePDF](https://github.com/chaitanyamogal/pdf-master/blob/main/src/index.js)
3. [Loading static assets to setContent](https://stackoverflow.com/a/69035580)

Added a `pdf-master.d.ts`, remember to remove it when uninstalling `pdf-master`.

### [Mail Gun](https://www.npmjs.com/package/mailgun.js)
```
npm install mailgun.js
```
Set the environment variable
`MAILGUN_USERNAME` to your mailgun username and `MAILGUN_USERNAME` to the API key if you want to send live emails.

### [Serve Static](https://docs.nestjs.com/recipes/serve-static)
```
npm install --save @nestjs/serve-static
```
[StackTip for junior devs](https://stackoverflow.com/questions/77173918/how-to-serve-static-files-on-nestjs), read the docs above preferably.

# NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## GIT
To remove a file you had previously committed, use
```
git rm --cached backend
```

Then commit this change. 