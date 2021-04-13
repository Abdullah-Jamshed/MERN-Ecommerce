import express from "express";
const productsRoute = express.Router();

// CONTROLLER
import { fetchProducts, fetchProductsById } from "../controller/products.js";

productsRoute.get("/", fetchProducts);
productsRoute.get("/:id", fetchProductsById);

export default productsRoute;
