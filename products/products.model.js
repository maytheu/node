const products = [
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
];

const getAllProducts = () => {
  return products;
};

module.exports = { getAllProducts };
