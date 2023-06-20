const { getAllProducts } = require("./products.model");

module.exports = {
  Query: {
    products: (parent) => {
      return getAllProducts();
    },
  },
};
