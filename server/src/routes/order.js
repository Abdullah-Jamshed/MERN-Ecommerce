import { Router } from "express";

// MIDDLEWARE
import auth from "../middleware/auth.js";

// controllers
import { createOrder,getOrderById } from "../controller/order.js";

const orderRoute = Router();

orderRoute.post("/",auth,createOrder);
orderRoute.get("/:id",auth,getOrderById);

export default orderRoute;
