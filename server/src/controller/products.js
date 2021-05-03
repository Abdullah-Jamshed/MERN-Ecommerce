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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ msg: "Product Not Found" });
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ msg: "Product Not Found" });
    const product = await Product.findById(req.params.id);
    await product.remove();
    if (product) return res.json({ msg: "delete product successfully" });
    res.status(404).json({ msg: "Product Not Found" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Create Product
// @route  POST /api/product/
// @access Private/Admin

const createProduct = async (req, res) => {
  const { name, image, description, brand, category, price, countInStock, user } = req.body;
  try {
    // const product = Product.create({
    // name: "Sample Name",
    // image: "/images/sample.jpg",
    // description: "sample Description",
    // brand: "Sample Brand",
    // category: "Sample category",
    // price: 0,
    // countInStock: 0,
    // rating: 0,
    // numReviews: 0,
    // user: "60720236d887333716d74889",
    // });

    const product = await Product.create({ name, image, description, brand, category, price, countInStock, user });

    const newProduct = await product.save();

    if (newProduct) return res.status(201).json(newProduct);
    res.status(401).json({ msg: "Product Not Created" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", error: error.message });
  }
};

// @desc   Update Product
// @route  PUT /api/product/:id
// @access Private/Admin

const updateProduct = async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } = req.body;
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ msg: "Product Not Found" });
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

export { fetchProducts, fetchProductsById, deleteProductsById, createProduct, updateProduct };
