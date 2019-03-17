const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const { schemaString } = require("./schema");
const orgQueries = require("./db_queries/org_queries");
const locQueries = require("./db_queries/location_queries");
const evQueries = require("./db_queries/event_queries");

const app = express();

const schema = buildSchema(schemaString);

const root = {
  addOrganization: ({ input }) => orgQueries.addOrganization(input.name),
  getOrganization: ({ id }) => orgQueries.getOrganization(id),
  addLocation: ({ input }) => locQueries.addLocation(input),
  getLocation: ({ id }) => locQueries.getLocation(id),
  addEvent: ({ input }) => evQueries.addEvent(input),
  getEvent: ({ id }) => evQueries.getEvent(id)
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
console.log("Server running on port 4000...");
