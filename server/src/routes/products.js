const productsRoute = require("express").Router();

// CONTROLLER
const { fetchProducts,fetchProductsById } = require("../controller/products");

productsRoute.get("/", fetchProducts);
productsRoute.get("/:id", fetchProductsById);

module.exports = productsRoute;
