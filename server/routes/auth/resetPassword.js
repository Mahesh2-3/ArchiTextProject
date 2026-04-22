import express from "express";
import { resetPasswordWithOtp } from "../../Controllers/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Email, OTP, and new password are required" });
  }

  const { success, message } = await resetPasswordWithOtp(
    email,
    otp,
    newPassword,
  );
  if (!success) {
    return res.status(400).json({ success: false, message });
  }

  res.status(200).json({ success: true, message });
});

export default router;
