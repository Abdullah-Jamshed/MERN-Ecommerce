import { Router } from "express";

// MIDDLEWARE
import auth from "../middleware/auth.js";

// controllers
import { createOrder, getOrderById, updateOrderPayment } from "../controller/order.js";

const orderRoute = Router();

orderRoute.post("/", auth, createOrder);
orderRoute.get("/:id", auth, getOrderById);
orderRoute.put("/:id/pay", auth, updateOrderPayment);

export default orderRoute;
