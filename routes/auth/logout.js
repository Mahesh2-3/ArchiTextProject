// Logout route
const logoutRoute = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res
      .status(200)
      .json({ success: true, data: null, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
};

export default logoutRoute;
