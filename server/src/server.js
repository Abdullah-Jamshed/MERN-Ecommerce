// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cors = require("cors");
// const productsRoute = require("./routes/products");

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES
import productsRoute from "./routes/products.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.json({ msg: "hello from my shop server" });
});
app.use("/products", productsRoute);

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
