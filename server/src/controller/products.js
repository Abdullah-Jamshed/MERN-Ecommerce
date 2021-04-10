import products from "../dummyData/products.js";

const fetchProducts = (req, res) => {
  res.json(products);
};

const fetchProductsById = (req, res) => {
  console.log("id ==>>> ", req.params.id);
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
};

export { fetchProducts, fetchProductsById };
