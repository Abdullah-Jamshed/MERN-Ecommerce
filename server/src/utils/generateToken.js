import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "2d" });
};
 
export default generateToken;
