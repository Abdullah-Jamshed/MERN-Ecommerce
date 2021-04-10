// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cors = require("cors");
// const productsRoute = require("./routes/products");

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

// ROUTES
import productsRoute from "./routes/products.js";

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("<<<<<======== Connection is Established....========>>>>>>>>");
  })
  .on("error", (err) => {
    console.log("Err: ", err);
  });

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
