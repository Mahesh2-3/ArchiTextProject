import jwt from "jsonwebtoken";
import logger from "../lib/logger.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    logger.warn("Unauthorized access attempt: No token provided");
    return res
      .status(401)
      .json({ success: false, data: null, message: "Unauthorized" });
  }

  try {
    if (!process.env.JWT_SECRET) return res.status(500).json({ success: false, data: null, message: "Server misconfiguration: missing JWT_SECRET" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Ensure compatibility between _id and user_id
    if (decoded.user_id && !decoded._id) {
      req.user._id = decoded.user_id;
    }

    return next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return res
      .status(401)
      .json({ success: false, data: null, message: "Invalid token" });
  }
};

export default authMiddleware;
