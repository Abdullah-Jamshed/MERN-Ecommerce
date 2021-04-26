import mongoose from "mongoose";
import bycrypt from "bcryptjs";

// UTILS
import { generateToken } from "../utils/jwtTokenUtils.js";
import hashPassword from "../utils/hashPassword.js";

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
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc   Fetch User Profile
// @route  GET /api/user/profile/
// @access Private

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.sub._id).select("-password");
    if (user) return res.json(user);
    res.status(404).json({ msg: "User Not Found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc   Create New User
// @route  POST /api/user/profile/
// @access Public

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ msg: "user already register" });
    // HASHING PASSWORD
    const hashPass = await hashPassword(password);
    // CREATING USER
    const user = await User.create({ name, email, password: hashPass });
    // GENERATING TOKEN
    const token = await generateToken(user._id);

    if (user)
      return res.status(201).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
    res.status(400).json({ msg: "Invalid user data" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();

    // GENERATING TOKEN
    // const token = await generateToken(user._id);

    if (user) {
      return res.json({
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
    res.status(404).json({ msg: "user not found" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

// @desc   Fetch All users
// @route  GET /api/users
// @access Private/Admin

const getUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};



// @desc   delete user by id
// @route  DELETE /api/user/:id
// @access Private/Admin


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = User.findById(id);
    if (!exists) return res.status.json({ msg: "user not found" });
    await exists.remove()
    // await User.findOneAndDelete({ _id: id });
    res.json({ msg: "delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", errorMessage: error.message });
  }
};

export { userAuthentication, getUserProfile, createUser, updateUser, getUsers, deleteUser };
