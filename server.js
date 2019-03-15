const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const { schemaString } = require("./schema");

const app = express();

const schema = buildSchema(schemaString);

const root = {};

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
