import express from "express";
import { createConversation } from "../Controllers/Conversation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectId } = req.body;
    const { success, data } = await createConversation(projectId);
    if (!success) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

export default router;
