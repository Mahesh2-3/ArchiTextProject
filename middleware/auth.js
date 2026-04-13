import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      // Ensure compatability between _id and user_id
      if (decoded.user_id && !decoded._id) {
        req.user._id = decoded.user_id;
      }
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
