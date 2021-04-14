import mongoose from "mongoose";
import bycrypt from "bcryptjs";

// UTILS
import generateToken from "../utils/generateToken.js";

// MODELS
import User from "../models/userModel.js";

// @desc   Auth user & get token
// @route  POST /api/user/login
// @access Public

const userAuthentication = async (req, res) => {
  const { email, password } = req.body;
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

// @desc   Fetch User Profile
// @route  GET /api/profile/
// @access Private

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.sub._id).select("-password");
    res.json(user);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export { userAuthentication, getUserProfile };

// create user
// signIn user
