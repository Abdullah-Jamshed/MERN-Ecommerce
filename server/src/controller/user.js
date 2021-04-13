import mongoose from "mongoose";
import bycrypt from "bcryptjs";

// MODELS
import User from "../models/userModel.js";

// @desc   Auth user & get token
// @route  POST /api/user/login
// @access Public

const userAuthentication = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  //   const hashPassword = await bycrypt.hash(password,10)
  if (user && await user.matchPassword(password)) res.json("login");
  res.json({
    name,
    email,
  });
};

// @desc   Fetch Single Product
// @route  GET /api/product/:id
// @access Public

export { userAuthentication };

// create user
// signIn user
