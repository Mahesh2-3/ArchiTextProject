import express from "express";
import {
  updateProfile,
  changePassword,
  sendOtp,
  resetPasswordWithOtp,
} from "../controllers/User.js";

const router = express.Router();

router.put("/profile", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  const { success, data, message } = await updateProfile(req.user._id, name);
  if (!success) {
    return res.status(500).json({ success: false, message });
  }

  res
    .status(200)
    .json({ success: true, data, message: "Profile updated successfully" });
});

router.put("/password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Both passwords are required" });
  }

  const { success, message } = await changePassword(
    req.user._id,
    oldPassword,
    newPassword,
  );
  if (!success) {
    return res.status(400).json({ success: false, message });
  }

  res.status(200).json({ success: true, message });
});

router.post("/send-otp", async (req, res) => {
  console.log(req.user);
  const { success, message } = await sendOtp(req.body.email || req.user?.email);
  if (!success) {
    return res.status(500).json({ success: false, message });
  }

  res.status(200).json({ success: true, message });
});

router.post("/reset-password", async (req, res) => {
  const { otp, newPassword } = req.body;
  if (!otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "OTP and new password are required" });
  }

  const { success, message } = await resetPasswordWithOtp(
    req.body.email || req.user?.email,
    otp,
    newPassword,
  );
  if (!success) {
    return res.status(400).json({ success: false, message });
  }

  res.status(200).json({ success: true, message });
});

export default router;
