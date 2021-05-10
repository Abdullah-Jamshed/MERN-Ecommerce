import { Router } from "express";

// MIDDLEWARE
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

// controllers
import { createOrder, getOrderById, updateOrderPayment, getUserOrders, getAllOrders, updateOrdeDeliver } from "../controller/order.js";

const orderRoute = Router();

orderRoute.post("/", auth, createOrder);
orderRoute.get("/all", auth, admin, getAllOrders);
orderRoute.get("/myorders", auth, getUserOrders);
orderRoute.get("/:id", auth, getOrderById);
orderRoute.put("/:id/pay", auth, updateOrderPayment);
orderRoute.put("/:id/deliver", auth, admin, updateOrdeDeliver);

export default orderRoute;
