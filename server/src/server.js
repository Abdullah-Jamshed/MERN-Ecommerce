import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ROUTES
import productsRoute from "./routes/products.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

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

app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/order", orderRoute);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use("*", (req, res) => {
  res.json({ msg: "invalid Route" });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
