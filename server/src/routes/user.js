import express from "express";
const userRoute = express.Router();

// CONTROLLER
import { userAuthentication } from "../controller/user.js";

userRoute.post("/login", userAuthentication);
// userRoute.get("/:id", fetchProductsById);

export default userRoute;
