import express from "express";
import { askGroq } from "../services/groq.js";
import {
  getConversationMessages,
  getConversationStructure,
  saveMessage,
  updateConversationStructure,
  updateConversationTitle,
} from "../Controllers/Conversation.js";
import { checkConversationOwnership } from "../middleware/checkOwnership.js";

const router = express.Router();

// AI chat endpoint
router.post("/:id", checkConversationOwnership, async (req, res) => {
  try {
    const { userMsg } = req.body;
    const { id: conversationId } = req.params;

    // save user message to the DB
    const { success: msgStatus } = await saveMessage(
      conversationId,
      "user",
      userMsg,
    );

    if (!msgStatus) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Failed to save message" });
    }

    // get conversation messages
    const { success: convoStatus, data: conversation } =
      await getConversationMessages(conversationId);

    if (!convoStatus) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Failed to fetch messages" });
    }

    // If it's the first message, update the conversation title
    if (conversation.length === 1) {
      const truncatedTitle =
        userMsg.length > 30 ? userMsg.substring(0, 30) + "..." : userMsg;
      await updateConversationTitle(conversationId, truncatedTitle);
    }

    // get current project structure
    const { success: structureStatus, data: structure } =
      await getConversationStructure(conversationId);

    if (!structureStatus) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Failed to fetch structure" });
    }

    // calling ai service
    const response = await askGroq(conversation, structure);
    const parsedData = JSON.parse(response);
    const { message, architecture } = parsedData;

    // save assistant's conversational message to the DB
    const { success: aiMsgStatus } = await saveMessage(
      conversationId,
      "assistant",
      message,
    );

    if (!aiMsgStatus) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Failed to save AI message" });
    }

    // save the updated architecture to the Project
    const { success: updateStatus } = await updateConversationStructure(
      conversationId,
      architecture,
    );

    if (!updateStatus) {
      return res
        .status(500)
        .json({ success: false, data: null, message: "Failed to update structure" });
    }

    res.status(200).json({
      success: true,
      data: { message, architecture },
      message: "Prompt generated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

export default router;
