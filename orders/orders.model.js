const orders = [
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
];

function getAllOrders() {
  return orders;
}

module.exports = { getAllOrders };
