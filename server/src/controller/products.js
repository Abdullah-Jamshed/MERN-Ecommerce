import mongoose from "mongoose";

// MODELS
import Product from "../models/productModel.js";

// @desc   Fetch all products
// @route  GET /api/product
// @access Public

const fetchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword }); // .populate("user") to get data through ref
    if (products.length === 0) return res.status(404).json({ msg: "Product Not Found" });
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
    const product = await Product.findById(req.params.id); // .populate("user") to get data through ref  // .populate("user reviews.user") multiple populate
    if (product) return res.json(product);
    res.status(404).json({ msg: "Product Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Delete Product by Id
// @route  DELETE /api/products/:id
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
// @route  POST /api/products/
// @access Private/Admin

const createProduct = async (req, res) => {
  try {
    const { name, image, description, brand, category, price, countInStock, user } = req.body;
    const product = await Product.create({ name, image, description, brand, category, price, countInStock, user });

    const newProduct = await product.save();

    if (newProduct) return res.status(201).json(newProduct);
    res.status(401).json({ msg: "Product Not Created" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", error: error.message });
  }
};

// @desc   Update Product
// @route  PUT /api/products/:id
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

// @desc   Add Product Review
// @route  POST /api/products/:id/review
// @access Private

const createReview = async (req, res) => {
  try {
    const { name, comment, rating, user } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id); // nested populate .populate("reviews.user");

    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === user.toString());
    if (alreadyReviewed) return res.status(400).json({ msg: "You Already Reviewed Product" });

    const review = {
      name,
      rating: Number(rating),
      comment,
      user,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ msg: "review added" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", m: error.message });
  }
};

export { fetchProducts, fetchProductsById, deleteProductsById, createProduct, updateProduct, createReview };
