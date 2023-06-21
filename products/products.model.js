const products = [
  {
    id: "redShoe",
    description: "Red Shoe",
    price: 23.55,
    reviews: [],
  },
  {
    id: "blueShoe",
    description: "Blue Shoe",
    price: 13.55,
    reviews: [],
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

const addNewProduct = (id, description, price) => {
  const product = { id, description, price, reviews: [] };
  products.push(product);
  return product;
};

const addNewReview = (id, rating, comment) => {
  const newReview = { rating, comment };
  const product = getProductById(id);
  if (product) {
    product.reviews.push(newReview);
    return newReview;
  }
};

module.exports = {
  getAllProducts,
  getProductByPrice,
  getProductById,
  addNewProduct,
  addNewReview,
};
