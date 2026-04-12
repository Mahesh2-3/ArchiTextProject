import express from "express";
import { askGroq } from "../services/groq.js";
import {
  getConversationMessages,
  getConversationStructure,
  saveMessage,
  updateConversationStructure,
} from "../Controllers/Conversation.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const { userMsg } = req.body;
    const { id: conversationId } = req.params;

    // save user message to the DB
    const { success: msgStatus } = await saveMessage(
      conversationId,
      "user",
      userMsg,
    );

    const { success: convoStatus, data: conversation } =
      await getConversationMessages(conversationId);
    const { success: structureStatus, data: structure } =
      await getConversationStructure(conversationId);

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

    // save the updated architecture to the Project
    const { success: updateStatus } = await updateConversationStructure(
      conversationId,
      architecture,
    );

    if (
      !convoStatus ||
      !msgStatus ||
      !aiMsgStatus ||
      !structureStatus ||
      !updateStatus
    ) {
      return res.status(500).json({ message: "Internal Server error" });
    }

    res.status(200).json({
      message: "Prompt generated successfully!",
      data: { message, architecture },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", data: error.message });
  }
});

export default router;
