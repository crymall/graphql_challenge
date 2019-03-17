# SQL/Express/GraphQL API Challenge

This API allows you to manage organizations with events and locations. It includes detailed API endpoints to handle any CRUD-type operation you'd like to perform on events and locations (full list found at `./graphql_utils/root`).

In order to run this project locally, perform the following operations:

- Clone the repo.
- In the root directory, `npm install`.
- In the `./db_queries` directory, with PostgreSQL installed and running, run `psql -f seed.sql`.
- If you'd like to automatically extract latitude and longitude from addresses inputted when a user adds a location, create a file called `secrets.json` in the root directory. Insert your Google Maps API key in the following format: `{"key": "MY_API_KEY"}`. Otherwise, navigate to the file `./db_queries/location_queries` and remove lines 4 and 23-36.
- Run `npm start`.
- Navigate to `http://localhost:4000/graphql`
