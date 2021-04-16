import express from "express";
const userRoute = express.Router();

// MIDDLEWARE
import auth from "../middleware/auth.js";

// CONTROLLER
import { userAuthentication, getUserProfile, createUser, updateUser } from "../controller/user.js";

userRoute.post("/", createUser);
userRoute.post("/login", userAuthentication);
userRoute.get("/profile", auth, getUserProfile);
userRoute.put("/profile", auth, updateUser);

// userRoute.get("/:id", fetchProductsById);

export default userRoute;
