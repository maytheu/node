const express = require("express");
const { graphql, buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");

// const schemas = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const schemas = loadFilesSync("**/*", { extensions: ["graphql"] });

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: {
    Query: {
      products: async(parent, args, context, info) => {
        console.log("product resolver");
        const product = await Promise.resolve(parent.products);
        return product
      },
      orders: (parent) => {
        return parent.orders;
      },
    },
  },
});

//defulat values
const rootValue = {
  products: require("./products/products.model"),
  orders: require("./orders/orders.model"),
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(4001, () => console.log("server starting"));
