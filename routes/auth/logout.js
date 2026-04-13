const Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ success: true, message: "Logged Out successful" });
};

export default Logout;
