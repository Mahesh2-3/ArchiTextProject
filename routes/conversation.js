import express from "express";
import {
  createConversation,
  getConversationMessages,
  getConversations,
} from "../Controllers/Conversation.js";

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
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { success, data } = await getConversations(projectId);
    if (!success) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

router.get("/:conversationId/messages", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { success, data } = await getConversationMessages(conversationId);
    if (!success) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

export default router;
