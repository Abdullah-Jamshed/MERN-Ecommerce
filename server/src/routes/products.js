import express from "express";
const productsRoute = express.Router();

// CONTROLLER
import { fetchProducts, fetchProductsById, deleteProductsById } from "../controller/products.js";

productsRoute.get("/", fetchProducts);
productsRoute.get("/:id", fetchProductsById);
productsRoute.delete("/:id", deleteProductsById);

export default productsRoute;
