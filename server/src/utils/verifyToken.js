import jwt from "jsonwebtoken";

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.TOKEN_SECRET);
};

export default verifyToken;
