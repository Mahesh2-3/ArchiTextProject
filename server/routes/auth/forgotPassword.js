import express from "express";
import { sendOtp } from "../../Controllers/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const { success, message } = await sendOtp(email);
  if (!success) {
    return res.status(500).json({ success: false, message });
  }

  res.status(200).json({ success: true, message });
});

export default router;
