const {
  getAllProducts,
  getProductByPrice,
  getProductById,
  addNewProduct,
  addNewReview,
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

  Mutation: {
    addNewProduct: (_, args) => {
      return addNewProduct(args.id, args.description, args.price);
    },

    addNewReview: (_, args) => {
      return addNewReview(args.id, args.rating, args.comment);
    },
  },
};
