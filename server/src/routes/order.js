import { Router } from "express";

// MIDDLEWARE
import auth from "../middleware/auth.js";

// controllers
import { createOrder } from "../controller/order.js";

const orderRoute = Router();

orderRoute.post("/",auth,createOrder);

export default orderRoute;
