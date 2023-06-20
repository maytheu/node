const { getAllOrders } = require("./orders.model");

module.exports = {
  Query: {
    orders: (parent) => {
      return getAllOrders();
    },
  },
};
