import express from "express";
const userRoute = express.Router();

// MIDDLEWARE
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

// CONTROLLER
import { userAuthentication, getUserProfile, createUser, updateUser, getUsers, deleteUser } from "../controller/user.js";

userRoute.get("/all", auth, admin, getUsers);
userRoute.post("/", createUser);
userRoute.post("/login", userAuthentication);
userRoute.get("/profile", auth, getUserProfile);
userRoute.put("/profile", auth, updateUser);
userRoute.delete("/del", auth, admin, deleteUser);

// userRoute.get("/:id", fetchProductsById);

export default userRoute;
