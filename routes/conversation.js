import express from "express";
import {
  createConversation,
  getConversationAndProjectTitle,
  getConversationMessages,
  getConversations,
} from "../Controllers/Conversation.js";

const router = express.Router();

// Create a new conversation
router.post("/", async (req, res) => {
  try {
    const { projectId } = req.body;
    const { success, data, message } = await createConversation(projectId);

    if (!success) {
      return res.status(500).json({ success: false, data: null, message });
    }

    res.status(201).json({
      success: true,
      data,
      message: "Conversation created successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

// Get all conversations for a project
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { success, data, message } = await getConversations(projectId);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// Get all messages for a conversation
router.get("/:conversationId/messages", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { success, data, message } =
      await getConversationMessages(conversationId);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// get the title of the conversation and the Project name
router.get("/:conversationId/titles", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { success, data, message } =
      await getConversationAndProjectTitle(conversationId);

    if (!success) {
      return res.status(500).json({ success: false, data: null, message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

export default router;
