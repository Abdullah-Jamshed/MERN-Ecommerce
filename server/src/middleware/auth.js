// UTLIS
import { verifyToken } from "../utils/jwtTokenUtils.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "no token ,Unauthorization user" });
  try {
    const decodedData = await verifyToken(token);
    req.sub = decodedData;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not Valid" });
  }
};

export default auth;
