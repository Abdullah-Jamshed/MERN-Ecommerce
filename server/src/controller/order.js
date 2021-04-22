import mongoose from "mongoose";

// MODELS
import Order from "../models/orderModel.js";

// @desc   Create new Order
// @route  POST /api/order
// @access Private

const createOrder = async (req, res) => {
  const { orderItems, paymentMethod, shippingAddress, itemPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  try {
    if (orderItems && orderItems.length === 0) return res.status(400).json();
    const order = new Order({
      user: req.sub._id,
      orderItems,
      paymentMethod,
      shippingAddress,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ msg: "Order Not Found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

export { createOrder, getOrderById };
