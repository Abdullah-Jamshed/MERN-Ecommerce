// MODELS
import Product from "../models/productModel.js";

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {}
  res.status(404).json({ msg: "Something Went Wrong" });
};

const fetchProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ msg: "Something Went Wrong" });
  }
};

export { fetchProducts, fetchProductsById };
