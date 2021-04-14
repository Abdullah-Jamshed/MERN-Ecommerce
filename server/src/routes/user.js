import express from "express";
const userRoute = express.Router();

// MIDDLEWARE
import auth from "../middleware/auth.js";

// CONTROLLER
import { userAuthentication, getUserProfile,createUser } from "../controller/user.js";

userRoute.post("/", createUser);
userRoute.post("/login", userAuthentication);
userRoute.get("/profile", auth, getUserProfile);

// userRoute.get("/:id", fetchProductsById);

export default userRoute;
