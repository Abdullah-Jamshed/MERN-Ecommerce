// UTLIS
import User from "../models/userModel.js";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.sub);
    if (!user) return res.status(404).json({ msg: "user not found" });
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).json({ msg: "unauthorized user" });
    }
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" }); // invalid token
  }
};

export default admin;
