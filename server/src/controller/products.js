import mongoose from "mongoose";

// MODELS
import Product from "../models/productModel.js";

// @desc   Fetch all products
// @route  GET /api/product
// @access Public

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Fetch Single Product
// @route  GET /api/product/:id
// @access Public

const fetchProductsById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ msg: "Product Not Found" });
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    res.status(404).json({ msg: "Product Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Delete Product by Id
// @route  DELETE /api/product/:id
// @access Private/Admin

const deleteProductsById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ msg: "Product Not Found" });
    const product = await Product.findById(req.params.id);
    await product.remove();
    if (product) return res.json({ msg: "delete product successfully" });
    res.status(404).json({ msg: "Product Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

export { fetchProducts, fetchProductsById, deleteProductsById };
