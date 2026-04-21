import logger from "../lib/logger.js";
import express from "express";
import {
  createConversation,
  getConversationAndProjectTitle,
  getConversationMessages,
  getConversations,
  deleteConversation,
} from "../Controllers/Conversation.js";
import {
  checkProjectOwnership,
  checkConversationOwnership,
} from "../middleware/checkOwnership.js";

const router = express.Router();

// Create a new conversation
router.post("/", checkProjectOwnership, async (req, res) => {
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
    logger.error(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

// Get all conversations for a project
router.get("/:projectId", checkProjectOwnership, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { success, data, message } = await getConversations(projectId);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// Get all messages for a conversation
router.get(
  "/:conversationId/messages",
  checkConversationOwnership,
  async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { success, data, message } =
      await getConversationMessages(conversationId);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// get the title of the conversation and the Project name
router.get(
  "/:conversationId/titles",
  checkConversationOwnership,
  async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { success, data, message } =
      await getConversationAndProjectTitle(conversationId);

    if (!success) {
      return res.status(500).json({ success: false, data: null, message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

// Delete a conversation
router.delete(
  "/:conversationId",
  checkConversationOwnership,
  async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { success, message } = await deleteConversation(conversationId);

      if (!success) {
        return res.status(500).json({ success: false, message });
      }

      res.status(200).json({ success: true, message });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

export default router;
