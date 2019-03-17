const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const { schemaString } = require("./graphql_utils/schema");
const rootUtils = require("./graphql_utils/root");

const app = express();

const schema = buildSchema(schemaString);

const root = { ...rootUtils };

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
