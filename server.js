const express = require("express");
const { graphql, buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }

  type Product{
    id: ID!
    description: String!
    price:Float!
    reviews: [Review]
  }

  type Review{
    rating: Int!
    comment: String
  }

  type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]
  }

  type OrderItem {
    product: Product
    quantity: Int!
  }
`);

//defulat values
const rootValue = {
  products: [
    {
      id: "redShoe",
      description: "Red Shoe",
      price: 23.55,
    },
    {
      id: "blueShoe",
      description: "Blue Shoe",
      price: 13.55,
    },
  ],

  orders: [
    {
      date: "today",
      subtotal: 54.66,
      items: [
        {
          product: {
            id: "redShoe",
            description: "Red Shoe",
            price: 23.55,
          },
          quantity: 2, 
        },
      ],
    },
  ],
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

app.listen(4000, () => console.log("server starting"));
