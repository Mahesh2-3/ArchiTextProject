import { loginUser } from "../../Controllers/Auth.js";

// Login route
const loginRoute = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, data, message } = await loginUser(email, password);

    if (!success) {
      return res.status(401).json({ success: false, data: null, message });
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 1000,
      secure: false,
    });

    res
      .status(200)
      .json({ success: true, data: data.user, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
};

export default loginRoute;
