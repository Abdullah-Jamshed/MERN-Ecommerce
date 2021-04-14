import mongoose from "mongoose";
import bycrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

// MODELS
import User from "../models/userModel.js";

// @desc   Auth user & get token
// @route  POST /api/user/login
// @access Public

const userAuthentication = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
        name: user.name,
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      res.status(401).json({
        msg: "invalid email or password",
      });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// @desc   Fetch Single Product
// @route  GET /api/product/:id
// @access Public

export { userAuthentication };

// create user
// signIn user
