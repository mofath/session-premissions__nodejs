# Introduction

This repo was built as POF for managing user with different roles and resourses with different acessability levels (read and write). In our case, we have used databade as a presistent layer to store session state. The following table show the properties we store about each session.

| Column | Description |
| :--- | :--- |
| user_id | FK reference user |
|  scope | Premissions given to user over different resources  |
| token_hash| refresh token hash |
| valid_until | session expiry time |
| user_agent | user agent used when creating the session |
|  revoked | is a flag shows if the user was revoked |

Sesseion are corelated using hash of the refreshtoken as it's not recomeneded to expose session id further operations like logging.
See: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html

Scope is array of strings descripe user permissions. Scope is stored both in the session for logging and stats and stored in accesstoken to be checked using middleware. The middleware will check a decoded JWT token to see if a token has permissions to make a certain request.

User agent is also stored in the session and accesstoken and to be checked if user is using another agent than the one used when session is created.

# Getting started
- Clone the repository
```
git clone  git@github.com:mofath/session-premissions__nodejs.git
```
- Install dependencies
```
cd session-premissions__nodejs

npm install
```
- Build and run the project
```
npm run start:dev
```

- Run tests
```
npm run test
```
 
 
 | Name            | Group    | Method | Endpoint                        | Scope            | Body              |
|-----------------|----------|--------|---------------------------------|------------------|-------------------|
| Register        | Auth     | POST   | /api/v1/auth/register           | Public           | username password |
| Login           | Auth     | POST   | /api/v1/auth/login              | Public           | username password |
| Token           | Auth     | POST   | /api/v1/auth/login/access_token | Public           | refreshToken      |
| Get Resources   | Resource | GET    | /api/v1/resource                | [resource:read]  |                   |
| Create Resource | Resource | POST   | /api/v1/resource                | [resource:write] | title             |
