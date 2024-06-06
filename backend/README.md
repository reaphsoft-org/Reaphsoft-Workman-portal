# Reaphsoft Workmen Backend
## Table of Contents
- [Reaphsoft Workmen Backend](#reaphsoft-workmen-backend)
  - [Table of Content](#table-of-content)
  - [Database](#database)
    - [Setup](#setup)
    - [Packages](#packages)
  - [Creating controllers and services](#creating-controllers-and-services)
  - [Saving Images](#saving-images)
  - [Testing](#testing)
    - [References](#references)
  - [Create PDFs](#create-pdfs)
  - [Mail Gun](#mail-gun)
  - [Serve Static](#serve-static)
  - [Password Hashing](#password-hashing)
    - [References](#references-1)
  - [NestJS Authentication](#nestjs-authentication)
    - [References](#references-2)
  - [Fixtures](#fixtures)
  - [Create SuperUser](#create-superuser)
  - [Endpoints](#endpoints)
  - [Auth and Account](#auth-and-account)
    - [Individual \& Estate Login](#individual--estate-login)
      - [Input Parameters](#input-parameters)
      - [Output](#output)
    - [Admin Login](#admin-login)
      - [Input Parameters](#input-parameters-1)
      - [Output](#output-1)
    - [Sign Up Individual](#sign-up-individual)
      - [Input Parameters](#input-parameters-2)
      - [Output](#output-2)
    - [Get User (auth-required)](#get-user-auth-required)
      - [Output Parameters Individual](#output-parameters-individual)
      - [Output Parameters Estate](#output-parameters-estate)
    - [Update User (Individual) (auth-required)](#update-user-individual-auth-required)
      - [Input Parameters](#input-parameters-3)
      - [Output](#output-3)
    - [Update User (Estate) (auth-required)](#update-user-estate-auth-required)
      - [Input Parameters](#input-parameters-4)
      - [Output](#output-4)
    - [Change Password (Individual or Estate) (auth required)](#change-password-individual-or-estate-auth-required)
      - [Input Parameters](#input-parameters-5)
      - [Output](#output-5)
  - [Estate (auth required for all)](#estate-auth-required-for-all)
    - [Sign Up Estate](#sign-up-estate)
      - [Input Parameters](#input-parameters-6)
      - [Output](#output-6)
    - [Add Estate House](#add-estate-house)
      - [Input Parameters](#input-parameters-7)
      - [Output](#output-7)
    - [Update Estate House](#update-estate-house)
      - [Input Parameters](#input-parameters-8)
      - [Output](#output-8)
    - [Get Estate House](#get-estate-house)
      - [Output](#output-9)
    - [Delete Estate House](#delete-estate-house)
      - [Output](#output-10)
    - [Get Estate Houses](#get-estate-houses)
      - [Output](#output-11)
  - [Workmen (auth required for all)](#workmen-auth-required-for-all)
    - [Get All Available Services](#get-all-available-services)
      - [Output](#output-12)
    - [Get Services Workers](#get-services-workers)
      - [Output](#output-13)
    - [Request Service](#request-service)
      - [Input Parameters](#input-parameters-9)
      - [Output](#output-14)
    - [Get Requested Service](#get-requested-service)
      - [Output](#output-15)
    - [Get Requested Services](#get-requested-services)
      - [Output](#output-16)
  - [Admin (Auth \& Admin Required)](#admin-auth--admin-required)
    - [Get Admin](#get-admin)
      - [Output](#output-17)
    - [Update Admin](#update-admin)
      - [Input Parameters](#input-parameters-10)
        - [Output](#output-18)
    - [Get Users](#get-users)
      - [Output](#output-19)
    - [Create User (Individual)](#create-user-individual)
      - [Input Parameters](#input-parameters-11)
      - [Output](#output-20)
    - [Update User (Individual)](#update-user-individual)
      - [Input Parameters](#input-parameters-12)
      - [Output](#output-21)
    - [Get User](#get-user)
      - [Output Parameters Individual](#output-parameters-individual-1)
    - [Delete User](#delete-user)
      - [Output Parameters](#output-parameters)
    - [Get Estate Managers](#get-estate-managers)
      - [Output](#output-22)
    - [Create User (Estate Manager)](#create-user-estate-manager)
      - [Input Parameters](#input-parameters-13)
      - [Output](#output-23)
    - [Update User (Estate Manager)](#update-user-estate-manager)
      - [Input Parameters](#input-parameters-14)
      - [Output](#output-24)
    - [Get Estate Manager](#get-estate-manager)
      - [Output Parameters Individual](#output-parameters-individual-2)
    - [Delete User (Estate Manager)](#delete-user-estate-manager)
      - [Output Parameters](#output-parameters-1)
    - [Get Workmen](#get-workmen)
      - [Output](#output-25)
    - [Create Workman](#create-workman)
      - [Input Parameters](#input-parameters-15)
      - [Output](#output-26)
    - [Update Workman](#update-workman)
      - [Input Parameters](#input-parameters-16)
      - [Output](#output-27)
    - [Get Workman](#get-workman)
      - [Output](#output-28)
    - [Delete Workman](#delete-workman)
      - [Output](#output-29)
    - [Get Work Requests](#get-work-requests)
      - [Output](#output-30)
    - [Update Work Request](#update-work-request)
      - [Input Parameters](#input-parameters-17)
      - [Output](#output-31)
    - [Get Work Request](#get-work-request)
      - [Output](#output-32)
    - [Delete Work Request](#delete-work-request)
      - [Output](#output-33)
    - [Get Services](#get-services)
      - [Output](#output-34)
    - [Create Service](#create-service)
      - [Input Parameters](#input-parameters-18)
      - [Output](#output-35)
    - [Update Service](#update-service)
      - [Input Parameters](#input-parameters-19)
      - [Output](#output-36)
    - [Get Service](#get-service)
      - [Output](#output-37)
    - [Delete Service](#delete-service)
      - [Output](#output-38)
  - [Firebase Admin SDK](#firebase-admin-sdk)
  - [Deployment](#deployment)
- [NestJS](#nestjs)
  - [Description](#description)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
  - [Support](#support)
  - [Stay in touch](#stay-in-touch)
  - [License](#license)
  - [GIT](#git)

## Database
### Setup
1. Download and install PostgreSQL [Windows](https://www.postgresql.org/download/windows/)/[Ubuntu](https://www.postgresql.org/download/linux/ubuntu/) on your machine (or server)
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
10. See [StackOverflow link](https://stackoverflow.com/a/26735105) when working on linux for initial setup.

### Packages
[TypeORM](https://github.com/typeorm/typeorm?tab=readme-ov-file#step-by-step-guide)

Run 
```
npm install --save @nestjs/typeorm typeorm pg
```
To use the typeorm tools, run from the _backend_ folder
```
npx typeorm-ts-node-commonjs schema:log -d ./src/data-source.ts
```
This works for **Nest.js** apps.

Use `npx typeorm-ts-node-commonjs -h` to see available commands. 

Migration Command
```
npx typeorm-ts-node-commonjs migration:create src\migrations\migration
```
```
npx typeorm-ts-node-commonjs migration:generate src\migrations\migration -d src/data-source.ts -p true 
```

## Creating controllers and services
```
nest generate controller users
```
```
nest generate service users
```

1. Create a `dto` dir in the created folder (`users`) in the above case.
2. Define a DTO name the file `user.dto.ts` for example. See samples.
3. Implement endpoint in `user.controller.ts`.

## Saving Images
Install Multer Types, and see sample codes.
```
npm install --save-dev @types/multer
```

## Testing
Add test cases in `app.e2e-spec.ts` and run the command below from the CMD (backend)
```
npm run test:e2e
```

```
npm install --save-dev @nestjs/testing jest @types/jest ts-jest
npm install --save-dev supertest @types/supertest
```
Install `cross-env` for setting environment variables
```
npm install --save-dev cross-env
```
### References
1. [Jest](https://jestjs.io/)
2. [Super Test](https://github.com/ladjs/supertest)
3. [Super Agent](https://ladjs.github.io/superagent/#test-documentation)
4. [Authentication in Tests](https://ladjs.github.io/superagent/#authentication)

## [Create PDFs](https://github.com/chaitanyamogal/pdf-master)
Install package
```
npm install pdf-master --save
```
See also
1. [Puppeteer](https://pptr.dev/guides/pdf-generation)
2. [pdf-master generatePDF](https://github.com/chaitanyamogal/pdf-master/blob/main/src/index.js)
3. [Loading static assets to setContent](https://stackoverflow.com/a/69035580)

Added a `pdf-master.d.ts`, remember to remove it when uninstalling `pdf-master`.

## [Mail Gun](https://www.npmjs.com/package/mailgun.js)
```
npm install mailgun.js
```
Set the environment variable
`MAILGUN_USERNAME` to your mailgun username and `MAILGUN_USERNAME` to the API key if you want to send live emails.

## [Serve Static](https://docs.nestjs.com/recipes/serve-static)
```
npm install --save @nestjs/serve-static
```
[StackTip for junior devs](https://stackoverflow.com/questions/77173918/how-to-serve-static-files-on-nestjs), read the docs above preferably.

## Password Hashing
### References
1. [Encryption and Hashing](https://docs.nestjs.com/security/encryption-and-hashing)
2. [Stackoverflow bcrypt alternatives](https://stackoverflow.com/a/28572710)
3. [Reddit Hashing Algorithms](https://www.reddit.com/r/node/comments/17m8b4p/best_node_hashing_algorithm_option/)
4. [Node:Crypto Scrypt](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)

## [NestJS Authentication](https://docs.nestjs.com/security/authentication)
Install `jwt`
```
npm install --save @nestjs/jwt
```
**Important**

Set the `JWT_SECRET` environment variable in production

### References
1. [SignOptions](https://github.com/auth0/node-jsonwebtoken#usage)
2. [See Also Supertest Authentication](https://ladjs.github.io/superagent/#authentication)

## Fixtures
I created the code for loading fixtures. 
```
npm build
```
or 
```
nest build
```
Then pass the services fixtures file path.
```
node dist/loaddata test/services.json
```

## Create SuperUser
```
npm run create_superuser <email> <password> <firstname> <lastnam>
```

## Image Resizing
1. [Magic Number](https://www.ibm.com/support/pages/what-magic-number)
## Endpoints
| No | Description                            | Form                                   | Example                                       | Method |
|----|----------------------------------------|----------------------------------------|-----------------------------------------------|--------|
| 01 | Log in individual or estate            | `/auth/login/ `                        | `/auth/login/`                                | POST   |
| 02 | Log in admin                           | `/auth/admin/login/`                   | `/auth/admin/login/`                          | POST   |
| 03 | Sign up Individual                     | `/account/sign/up/i/`                  | `/account/sign/up/i/`                         | POST   |
| 04 | Get User (Individual or Estate)        | `/account/user/`                       | `/account/user/`                              | GET    |
| 05 | Update User (Individual)               | `/account/update/user/i/`              | `/account/update/user/i/`                     | PUT    |
| 06 | Update User (Estate)                   | `/account/update/user/e/`              | `/account/update/user/e/`                     | PUT    |
| 07 | Change Password (Individual or Estate) | `/account/change/password/`            | `/account/change/password/`                   | POST   |
| 08 | Sign up Estate                         | `/account/sign/up/e/`                  | `/account/sign/up/e/`                         | POST   |
| 09 | Add Estate House                       | `/estate/add/house/`                   | `/estate/add/house/`                          | POST   |
| 10 | Update Estate House                    | `/estate/house/:id/`                   | `/estate/house/1/`                            | PUT    |
| 11 | Get Estate House                       | `/estate/house/:id/`                   | `/estate/house/4/`                            | GET    |
| 12 | Delete Estate House                    | `/estate/house/:id/`                   | `/estate/house/12/`                           | DELETE |
| 13 | Get Estate Houses                      | `/estate/houses/:page/`                | `/estate/houses/1/`                           | GET    |
| 14 | Get Services                           | `/workmen/services/`                   | `/workmen/services/`                          | GET    |
| 15 | Get Service Workers                    | `/workmen/services/workers/?id=&name=` | `/workmen/services/workers/id=1&name=painter` | GET    |
| 16 | Request Service                        | `/workmen/request/service/`            | `/workmen/request/service/`                   | POST   |
| 17 | Get Requested Service                  | `/workmen/request/service/:id/`        | `/workmen/request/service/1/`                 | GET    |
| 18 | Get Requested Services                 | `/workmen/requested/services/`         | `/workmen/requested/services/`                | GET    |
| 19 | Get Admin                              | `/admin/m/`                            | `/admin/m/`                                   | GET    |
| 20 | Update Admin                           | `/admin/m/`                            | `/admin/m/`                                   | PUT    |
| 21 | Get Users (Individuals)                | `/admin/users/:page/`                  | `/admin/users/1/`                             | GET    |
| 22 | Create User (Individual)               | `/admin/user/`                         | `/admin/user/`                                | POST   |
| 23 | Update User (Individual)               | `/admin/user/:email/`                  | `/admin/user/user@reaphsoft.com/`             | PUT    |
| 24 | Get User (Individual)                  | `/admin/user/:email/`                  | `/admin/user/user@reaphsoft.com/`             | GET    |
| 25 | Delete User (Individual)               | `/admin/user/:email/`                  | `/admin/user/user@reaphsoft.com/`             | DELETE |
| 26 | Get Users (Estates)                    | `/admin/estate/managers/:page/`        | `/admin/estate/managers/1/`                   | GET    |
| 27 | Create User (Estate)                   | `/admin/estate/manager/`               | `/admin/estate/manager/`                      | POST   |
| 28 | Update User (Estate)                   | `/admin/estate/manager/:email/`        | `/admin/estate/manager/user@reaphsoft.com/`   | PUT    |
| 29 | Get User (Estate)                      | `/admin/estate/manager/:email/`        | `/admin/estate/manager/user@reaphsoft.com/`   | GET    |
| 30 | Delete User (Estate)                   | `/admin/estate/manager/:email/`        | `/admin/estate/manager/user@reaphsoft.com/`   | DELETE |
| 31 | Get Workmen                            | `/admin/workmen/:page/`                | `/admin/workmen/1/`                           | GET    |
| 32 | Create Workman                         | `/admin/workman/:email/`               | `/admin/workman/user@reaphsoft.com/`          | POST   |
| 33 | Update Workman                         | `/admin/workman/:email/`               | `/admin/workman/user@reaphsoft.com/`          | PUT    |
| 34 | Get Workman                            | `/admin/workman/:email/`               | `/admin/workman/user@reaphsoft.com/`          | GET    |
| 35 | Delete Workman                         | `/admin/workman/:email/`               | `/admin/workman/user@reaphsoft.com/`          | DELETE |
| 36 | Get Work Requests                      | `/admin/work/requests/:type/:page/`    | `/admin/work/requests/1/1/`                   | GET    |
| 37 | Update Work Request                    | `/admin/work/request/:type/:id/`       | `/admin/work/request/1/1/`                    | PUT    |
| 38 | Get Work Request                       | `/admin/work/request/:type/:id/`       | `/admin/work/request/1/1/`                    | GET    |
| 39 | Delete Work Request                    | `/admin/work/request/:type/:id/`       | `/admin/work/request/1/1/`                    | DELETE |
| 40 | Get Services                           | `/admin/services/:page/`               | `/admin/services/1/`                          | GET    |
| 41 | Create Service                         | `/admin/service/`                      | `/admin/service/`                             | POST   |
| 42 | Update Service                         | `/admin/service/:id/`                  | `/admin/service/1/`                           | PUT    |
| 43 | Get Service                            | `/admin/service/:id/`                  | `/admin/service/1/`                           | GET    |
| 44 | Delete Service                         | `/admin/service/:id/`                  | `/admin/service/1/`                           | DELETE |

## Auth and Account
### Individual & Estate Login
#### Input Parameters
`email: string` \
`password: string` \
`account: 1 | 2` 1 for individual, 2 for estate
#### Output
`{ access_token: string; resp: string; status: boolean }` if `status` is `true`, the `access_token` is included, else check `resp` for the response or error message.

### Admin Login
#### Input Parameters
`email: string` \
`password: string`
#### Output
`{ access_token: string; resp: string; status: boolean }` if `status` is `true`, the `access_token` is included, else check `resp` for the response or error message.

### Sign Up Individual
#### Input Parameters
`email: string`\
`password: string`\
`fullname: string`\
`apartment: string`\
`address: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`photo: file` optional
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get User (auth-required)
#### Output Parameters Individual
`accountType: number`\
`address: string`\
`email: string`\
`fullname: string`\
`photoURL: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`apartment: string`
#### Output Parameters Estate
`accountType: number`\
`address: string`\
`email: string`\
`fullname: string`\
`photoURL: string`\
`serviceType: number` 1 for priority, 2 for priority plus\
`estate: string`\
`houses: { number: string; name: string; id: string }[]` containing houses this user has added

### Update User (Individual) (auth-required)
#### Input Parameters
`address: string`\
`fullname: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`apartment: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Update User (Estate) (auth-required)
#### Input Parameters
`address: string`\
`fullname: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`estate: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Change Password (Individual or Estate) (auth required)
#### Input Parameters
`new_password: string`\
`old_password: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

## Estate (auth required for all)
### Sign Up Estate
#### Input Parameters
`email: string`\
`password: string`\
`fullname: string`\
`estate: string`\
`address: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`photo: file` optional
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Add Estate House
#### Input Parameters
`number: string`\
`occupant_name: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Update Estate House
#### Input Parameters
`number: string`\
`occupant_name: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get Estate House
#### Output
`{ status: boolean, resp: string, data: null | { number: string, name: string } }` 

A `status` of `true` indicates success, and `data` is set to the non-null object,\
Else, `data` is set to `null`, check `resp` for the particular issue.

### Delete Estate House
#### Output
`{ status: boolean, resp: string }` 

A `status` of `true` indicates success, else, check `resp` for the particular issue.

### Get Estate Houses
`page` must start from 1 and should not exceed the number of pages. Data is paginated by **50** at the moment.
#### Output
`{ pages: number, data: {id: number, number: string, name: string }[]`

`pages` is the number of pages of houses, while `data` is an array of objects, giving each house' `id`, `number` and occupant's `name`.

## Workmen (auth required for all)
### Get All Available Services
#### Output
`{ id: number, name: string, description: string }[]`

Return an array containing each service's id, name and description. Empty if no service is available.

### Get Services Workers
All workers for a particular service, service `id` and `name` are obtained from the Get Services call.
#### Output
`{ status: boolean, resp: string, data: { id: number, fullname: string, availability: string }[] }`

A `status` of `true` includes an array containing each worker's id, name and availability. Empty if no worker is found.

### Request Service
#### Input Parameters
`workerID: number`\
`workerName: string`\
`date: Date`
#### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Requested Service
#### Output
```
{ 
   status: boolean, 
   resp: string, 
   data: null | { 
      accepted: boolean, // service requested was accepted or declined
      date_required: Date, // date & time service is required by client
      date_created: Date, // date & time, service request was created by client
      date_accepted: null | Date, // date & time service request was accepted by worker
      date_completed: null | Date, // date & time service was completed by worker
      worker: string // worker's fullname
   }
}
```
 A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Requested Services
#### Output
```
{ 
      id: number // request id which can be used to get the service request's details.
      accepted: boolean // service requested was accepted or declined
      date_created: Date // date & time, service request was created by client
      service: string // service's name
}[]
```
 A `status` will usually be `true`. Array might be empty.

## Admin (Auth & Admin Required)
### Get Admin
#### Output
```
null | 
{
   email: string,
   fullname: string,
   is_active: boolean,
   photoURL: string,
   date_joined: date,
   last_visited: string,
}
```
`null` if user is not found, or the mentioned fields.

### Update Admin
#### Input Parameters
```
fullname: string
old_password: string,
new_password: string,
```
##### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Users
#### Output
`{ pages: number, data: { email: string, name: string, address: string }[] }`\
`data` is an array. `pages` has the number of pages of users. It is set to 0 when no users are found.\
Pagination starts from 50 as usual. 

### Create User (Individual)
#### Input Parameters
`email: string`\
`password: string`\
`fullname: string`\
`apartment: string`\
`address: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`photo: file` optional
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Update User (Individual)
#### Input Parameters
`address: string`\
`fullname: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`apartment: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get User
#### Output Parameters Individual
`null` if user not found, else
`email: string`\
`fullname: string`\
`apartment: string`\
`address: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`photoURL: string`

### Delete User
#### Output Parameters
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Estate Managers
#### Output
`{ pages: number, data: { email: string, name: string, address: string }[] }`\
`data` is an array. `pages` has the number of pages of users. It is set to 0 when no users are found.\
Pagination starts from 50 as usual. 

### Create User (Estate Manager)
#### Input Parameters
`email: string`\
`password: string`\
`fullname: string`\
`estate: string`\
`address: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`photo: file` optional
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Update User (Estate Manager)
#### Input Parameters
`address: string`\
`fullname: string`\
`serviceType: number` 1 for priority, 2 for priority plus \
`apartment: string`
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get Estate Manager
#### Output Parameters Individual
`null` if user not found, else
```
{
   email: string
   fullname: string
   estate: string
   address: string
   serviceType: number 1 for priority, 2 for priority plus 
   photoURL: string
}
```

### Delete User (Estate Manager)
#### Output Parameters
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Workmen
Paginated by 50
#### Output
```
{
   pages: number,
   data: {
      email: string, 
      name: string,
      service: string // title of the service for this worker
   }[]
}
```

### Create Workman
#### Input Parameters
`email: string`\
`password: string`\
`fullname: string`\
`address: string`\
`phone: string` optional\
`availability: string`\
`service: number` id of the service
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Update Workman
#### Input Parameters
`fullname: string`\
`address: string`\
`phone: string` optional\
`availability: string` \
`service: number` id of the service
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get Workman
#### Output
`null` if not found, else  
```
{
   email: string,
   fullname: string,
   address: string,
   phone: string,
   service: string // service name,
   availability: string,
   photoURL: string,
}
```

### Delete Workman
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get Work Requests
`type` refers to the work request type, `1` for individual user work requests, while `2` is for work requests made by estate accounts.\
`page` starts from 1, and output is paginated by 50 as usual.
#### Output
```
{
   pages: number,
   data: {
      id: number,       // work request id
      created_at: Date, // date time the work request was created
      client: string,   // full name of the client who made the request
      service: string   // name of the service, e.g painting, carpentry, etc
   }[]
}
```

### Update Work Request
#### Input Parameters
`date_required: Date`\
`accepted: boolean` work accepted or not\
`worker: number` id of the workman who you want to (re)assign the work to.
#### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Work Request
#### Output
`null` or\
```
{
   accepted: boolean,
   date_created: Date,
   date_required: Date,
   date_accepted: Date | null,
   date_completed: Date | null,
   worker_name: string, // worker assigned to this task 
   worker_email: string,
   client: string // user who requested this task.
   client_email: string,
   service: string, // name of service
   service_description: string, // description of service
}
```

### Delete Work Request
#### Output
`{ status: boolean, resp: string }` A status of `true` indicates success, else check the resp for the particular issue.

### Get Services
`page` starts from 1, and output is paginated by 50 as usual.
#### Output
```
{
   pages: number, // total number of pages that services can be paginated into
   data: {
      id: number,
      name: string,
      description: string,
   }[]
}
```

### Create Service
#### Input Parameters
`name: string`\
`description: string` brief description of the service.
#### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Update Service
#### Input Parameters
`name: string`\
`description: string` brief description of the service.
#### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

### Get Service
#### Output
`null` if not found, else\
```
{
   name: string,
   description: string,
}
```

### Delete Service
#### Output
`{ status: boolean, resp: string }` A `status` of `true` indicates success, else check the `resp` for the particular issue.

## [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup?authuser=0)
On linux, install make and g++
```
sudo apt install make && sudo apt install g++
```
Then
```
npm install firebase-admin --save
```
See [initialize](https://firebase.google.com/docs/admin/setup?authuser=0#initialize_the_sdk_in_non-google_environments) 
for initializing the SDK in non-Google environments.

Download the sdk keys and keep it private, don't commit it.

[See Link](https://firebase.google.com/docs/cloud-messaging/send-message?authuser=0) for building and sending messages.
[See Link](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging?authuser=0) for message package reference.

## Deployment
1. Copy credential file to a location on the server and set its path below
2. Set GOOGLE_APPLICATION_CREDENTIALS path 
3. Set JWT_SECRET

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