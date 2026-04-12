import express from "express";
import { askGroq } from "../services/groq.js";
import {
  getConversationMessages,
  saveMessage,
} from "../Controllers/Conversation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userMsg } = req.body;
    const { success: convoStatus, data: conversation } =
      await getConversationMessages(req.params.id);

    // save user message to the DB
    const { success: msgStatus } = await saveMessage(
      req.params.id,
      "user",
      userMsg,
    );

    // calling ai service
    const response = await askGroq({
      ...conversation,
      userMsg,
    });
    const parsedData = JSON.parse(response);

    // save ai response to the DB
    const { success: aiMsgStatus, data: aiMessage } = await saveMessage(
      req.params.id,
      "assistant",
      parsedData,
    );

    if (!convoStatus || !msgStatus || !aiMsgStatus) {
      return res.status(500).json({ message: "Internal Server error" });
    }

    res
      .status(200)
      .json({ message: "Prompted generated successfully!", data: parsedData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", data: error.message });
  }
});

export default router;
