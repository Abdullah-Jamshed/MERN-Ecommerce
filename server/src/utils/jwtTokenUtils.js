import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "2d" });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.TOKEN_SECRET);
};

export { generateToken, verifyToken };
