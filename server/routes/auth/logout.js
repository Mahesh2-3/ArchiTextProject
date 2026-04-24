import logger from "../../lib/logger.js";
// Logout route
const logoutRoute = async (req, res) => {
  try {
    logger.info("Logout attempt received");
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    logger.info("User logged out successfully");
    res
      .status(200)
      .json({ success: true, data: null, message: "Logged out successfully" });
  } catch (error) {
    logger.error(`Logout failed: ${error.message}`);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
};

export default logoutRoute;
