import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// ROUTES
import productsRoute from "./routes/products.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import uploadRouter from "./routes/fileUploadRoute.js";

// import Product from "./models/productModel.js";

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

app.get("/", async (req, res) => {
  // const product = await Product.create({
  //   name: "Amazon Echo Dot 3rd Generation",
  //   image: "/images/alexa.jpg",
  //   description:
  //     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  //   brand: "Amazon",
  //   category: "Electronics",
  //   price: 29.99,
  //   countInStock: 0,
  //   rating: 4,
  //   numReviews: 12,
  //   user: "60720236d887333716d74889",
  // });
  res.json({ msg: "hello from my shop server" });
});

// static folder
// app.use('/public', express.static(__dirname + '/public'));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/order", orderRoute);
app.use("/api/upload", uploadRouter);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use("*", (req, res) => {
  res.status(404).json({ msg: "invalid Route" });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
