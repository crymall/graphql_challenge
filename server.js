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
  getOrganization: ({ id }) => orgQueries.getOrganization(id),
  addOrganization: ({ input }) => orgQueries.addOrganization(input),
  getLocation: ({ id }) => locQueries.getLocation(id),
  addLocation: ({ input }) => locQueries.addLocation(input),
  updateLocation: ({ input }) => locQueries.updateLocation(input),
  deleteLocation: ({ id }) => locQueries.deleteLocation(id),
  getEvent: ({ id }) => evQueries.getEvent(id),
  addEvent: ({ input }) => evQueries.addEvent(input),
  updateEvent: ({ input }) => evQueries.updateEvent(input),
  deleteEvent: ({ id }) => evQueries.deleteEvent(id)
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
