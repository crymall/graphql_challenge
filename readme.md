# SQL/Express/GraphQL API Challenge

This API allows you to manage organizations with events and locations. It includes detailed API endpoints to handle any CRUD-type operation you'd like to perform on events and locations (full list found at `./graphql_utils/root`).

In order to start run this project locally, perform the following operations:

- Clone the repo.
- In the root directory, `npm install`.
- In the `./db_queries` directory, with PostgreSQL installed and running, run `psql -f seed.sql`.
- `npm start`.
- Navigate to `http://localhost:4000/graphql`
