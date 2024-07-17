## Tech Stack

**Client:** React, Typescript, Redux, TailwindCSS, React Hook Form, React Query

**Server:** Node, Express, Typescript

**Database:**
Mongodb, Elasticsearch

**Container:**
Docker

## Run the project

First of all, make .env file in both froentend and backend directory. Copy from .env.example or you can make your own one similar to that of example.

To run the project just run

`docker-compose up --build -d `

## Seed data

To seed data for admin , run the command

```bash
  docker exec -it backend sh
  npm run run:seed
```

## Client Side

Go to /register page and register user and then login.

## Things that can be improved

- Use redis cache for faster retrieval and not to overload database
- Use mongodb replica sets for backup/ distributed system
- Use microservice architecture if app keeps growing and have lot of services
