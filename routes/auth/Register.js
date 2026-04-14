import { registerUser } from "../../Controllers/Auth.js";

// Register route
const registerRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { success, data, message } = await registerUser(
      name,
      email,
      password,
    );

    if (!success) {
      return res.status(400).json({ success: false, data: null, message });
    }

    res.status(201).json({
      success: true,
      data,
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
};

export default registerRoute;
