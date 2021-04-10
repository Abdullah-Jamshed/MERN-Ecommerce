const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// ROUTES
const productsRoute = require("./routes/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("port", process.env.PORT || 3001);

app.use("/products", productsRoute);

// app.get("/", (req, res) => {
//   res.json(products);
// });

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
