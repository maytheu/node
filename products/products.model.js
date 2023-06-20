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

const getProductByPrice = (min, max) => {
  return products.filter(
    (product) => product.price >= min && product.price <= max
  );
};

function getProductById(id) {
  return products.find((product) => product.id === id);
}

module.exports = { getAllProducts, getProductByPrice, getProductById };
