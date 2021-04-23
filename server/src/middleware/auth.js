// UTLIS
import { verifyToken } from "../utils/jwtTokenUtils.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "unauthorized user" }); // no token 
  try {
    const decodedData = await verifyToken(token);
    req.sub = decodedData;
    next();
  } catch (error) {
    res.status(400).json({ msg: "unauthorized user" });  // invalid token 
  }
};

export default auth;
