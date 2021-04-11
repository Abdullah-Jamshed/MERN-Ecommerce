import mongoose from "mongoose";

// MODELS
import Product from "../models/productModel.js";

import dotenv from "dotenv";
dotenv.config();

// @desc   Fetch all products
// @route  GET /api/product
// @access Public

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Fetch Single Product
// @route  GET /api/product/:id
// @access Public

const fetchProductsById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(404).json({ msg: "Product Not Found" });
    console.log("data");
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    res.status(404).json({ msg: "Product Not Found" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Something Went Wrong" });
  }
};

export { fetchProducts, fetchProductsById };
