// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cors = require("cors");
// const productsRoute = require("./routes/products");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ROUTES
import productsRoute from "./routes/products.js";
import userRoute from "./routes/user.js";

// MODELS
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

// DUMMY DATA
import users from "./dummyData/users.js";
import products from "./dummyData/products.js";

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.json({ msg: "hello from my shop server" });
});

// app.post("/user", async (req, res) => {
//   try {

//     await User.deleteMany();
//     await Product.deleteMany();

//     const createdUsers = await User.insertMany(users);
//     const adminUserId = createdUsers[0]._id;
//     const sampleData = products.map((product) => ({ ...product, user: adminUserId }));
//     // Product
//     await Product.insertMany(sampleData);
//     res.json({ msg: "Data Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ msg: "Error" });
//   }
// });

app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);

app.use("*", (req, res) => {
  res.json({ msg: "invalid Route" });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
