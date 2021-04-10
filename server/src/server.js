const express = require("express");
require("dotenv").config();

console.log(process.env.PORT);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
