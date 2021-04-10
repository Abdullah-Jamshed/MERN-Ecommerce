const products = require("./dummyData/products");

const fetchProducts = (req, res) => {
  res.json(products);
};

module.exports = { fetchProducts };
