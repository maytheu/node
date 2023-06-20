const {
  getAllProducts,
  getProductByPrice,
  getProductById,
} = require("./products.model");

module.exports = {
  Query: {
    products: (parent) => {
      return getAllProducts();
    },

    productByPrice: (_, args) => {
      return getProductByPrice(args.min, args.max);
    },

    product: (_, args) => {
      return getProductById(args.id);
    },
  },
};
