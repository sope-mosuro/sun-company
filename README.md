<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

# Sun Harvesters CRM

A CRM system for managing sales, agents, commissions, and users, built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/).

## Features

- User authentication with JWT
- Role-based access control (Admin, Sales Rep)
- Agent management
- Sales and commission tracking
- RESTful API endpoints

## Tech Stack

- Node.js
- NestJS
- TypeORM
- PostgreSQL (or your configured database)
- Passport JWT


## Project Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and set:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## Running the Project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Overview

- `POST /auth/register` — Register a new user (admin only)
- `POST /auth/login` — Login and receive JWT (stored in cookie)
- `POST /sales/:salesRepId` — Create a sale for a sales rep
- `GET /agents/my-agents` — Get agents for the logged-in sales rep
- `GET /agents/by-rep/:id` — Get agents by sales rep ID


## License

MIT
