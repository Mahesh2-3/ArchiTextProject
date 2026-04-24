import logger from "../../lib/logger.js";
import { loginUser } from "../../Controllers/Auth.js";
import {
  validateLogin,
  handleValidationErrors,
} from "../../middleware/validation.js";

// Login route
const loginRoute = [
  ...validateLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      logger.info(`Login attempt for email: ${email}`);
      const { success, data, message } = await loginUser(email, password);

      if (!success) {
        logger.warn(`Login failed for email: ${email} - ${message}`);
        return res.status(401).json({ success: false, data: null, message });
      }

      logger.info(`Login successful for user ID: ${data.user._id}`);

      res.cookie("token", data.token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 24 * 1000,
        secure: process.env.NODE_ENV === "production",
      });

      res
        .status(200)
        .json({ success: true, data: data.user, token: data.token, message: "Login successful" });
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal server error" });
    }
  },
];

export default loginRoute;
