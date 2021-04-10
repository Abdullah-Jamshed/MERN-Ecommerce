// MODELS
import Product from "../models/productModel.js";

const fetchProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const fetchProductsById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export { fetchProducts, fetchProductsById };
