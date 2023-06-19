const express = require("express");
const { graphql, buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    description: String
    price: Float
  }
`);

//defulat values
const rootValue = { description: "Ear buds", price: 3.99 };

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
  })
);

app.listen(4000, () => console.log("server starting"));
