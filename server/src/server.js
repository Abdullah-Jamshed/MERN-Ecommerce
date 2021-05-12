import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "server", ".env") });

// ROUTES
import productsRoute from "./routes/products.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import uploadRouter from "./routes/fileUploadRoute.js";

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

// static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/order", orderRoute);
app.use("/api/uploads", uploadRouter);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ msg: "hello from my shop server" });
  });
}

app.use("*", (req, res) => {
  res.status(404).json({ msg: "invalid Route" });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
