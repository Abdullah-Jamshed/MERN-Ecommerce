import mongoose from "mongoose";

// MODELS
import Order from "../models/orderModel.js";

// @desc   Fetch All Orders by user
// @route  GET /api/order/myorders
// @access Private

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.sub._id });
    if (!orders) return res.status(404).json({ msg: "No Order Any Found" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

// @desc   Create new Order
// @route  POST /api/order
// @access Private

const createOrder = async (req, res) => {
  const { orderItems, paymentMethod, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  console.log(itemsPrice);
  try {
    if (orderItems && orderItems.length === 0) return res.status(400).json();
    const order = new Order({
      user: req.sub._id,
      orderItems,
      paymentMethod,
      shippingAddress,
      itemsPrice,
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

// @desc   Fetch Order By Id
// @route  GET /api/order/:id
// @access Private

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "Invalid Order Id" });
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ msg: "Order Not Found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

// @desc   Update Order Payment status
// @route  PUT /api/order/:id/pay
// @access Private

const updateOrderPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id: paymentId,
      status,
      update_time,
      payer: { email_address },
    } = req.body;

    const paymentResult = {
      id: paymentId,
      status,
      update_time,
      email_address,
    };

    const order = await Order.findOneAndUpdate({ _id: id }, { isPaid: true, paidAt: Date.now(), paymentResult }, { new: true });
    if (!order) return res.status(404).json({ msg: "Order Not Found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

export { createOrder, getOrderById, updateOrderPayment, getUserOrders };
