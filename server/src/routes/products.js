const productsRoute = require("express").Router();

// CONTROLLER
const { fetchProducts } = require("../controller/products");

productsRoute.get("/", fetchProducts);

module.exports = productsRoute;
