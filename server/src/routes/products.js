import express from "express";
const productsRoute = express.Router();

// MIDDLEWARE
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

// CONTROLLER
import {
  fetchProducts,
  fetchProductsById,
  deleteProductsById,
  createProduct,
  updateProduct,
  createReview,
  getTopProduct,
} from "../controller/products.js";

productsRoute.get("/", fetchProducts);
productsRoute.post("/", auth, admin, createProduct);
productsRoute.put("/:id", auth, admin, updateProduct);
productsRoute.get("/top", getTopProduct);
productsRoute.get("/:id", fetchProductsById);
productsRoute.delete("/:id", deleteProductsById);
productsRoute.post("/:id/review", auth, createReview);

export default productsRoute;
