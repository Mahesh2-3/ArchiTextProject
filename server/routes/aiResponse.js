import logger from "../lib/logger.js";
import express from "express";
import { askGroq } from "../services/groq.js";
import {
  getProjectMessages,
  getProjectStructure,
  saveMessage,
  updateProjectStructure,
} from "../Controllers/Message.js";
import { updateProjectTitle } from "../Controllers/Project.js";
import { checkProjectOwnership } from "../middleware/checkOwnership.js";

const router = express.Router();

// AI chat endpoint
router.post("/:id", checkProjectOwnership, async (req, res) => {
  try {
    const { userMsg } = req.body;
    const { id: projectId } = req.params;
    console.log("user msg details", userMsg, projectId);
    // save user message to the DB
    const { success: msgStatus } = await saveMessage(
      projectId,
      "user",
      userMsg,
    );

    if (!msgStatus) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to save message",
      });
    }

    // get conversation messages
    const { success: convoStatus, data: conversation } =
      await getProjectMessages(projectId);

    if (!convoStatus) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to fetch messages",
      });
    }

    // // If it's the first message, update the conversation title
    // if (conversation.length === 1) {
    //   const truncatedTitle =
    //     userMsg.length > 30 ? userMsg.substring(0, 30) + "..." : userMsg;
    //   await updateProjectTitle(projectId, truncatedTitle);
    // }

    // get current project structure
    const { success: structureStatus, data: structureData } =
      await getProjectStructure(projectId);

    if (!structureStatus) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to fetch structure",
      });
    }

    // calling ai service
    const response = await askGroq(
      conversation,
      structureData.metaData,
      structureData.layoutType,
    );
    const parsedData = JSON.parse(response);
    const { message: rawMessage, architecture } = parsedData;
    const message = rawMessage || "Done.";

    console.log("ai response", message, architecture);

    // save assistant's conversational message to the DB
    const { success: aiMsgStatus } = await saveMessage(
      projectId,
      "assistant",
      message,
    );

    if (!aiMsgStatus) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to save AI message",
      });
    }

    // save the updated architecture to the Project
    const { success: updateStatus } = await updateProjectStructure(
      projectId,
      architecture,
    );

    if (!updateStatus) {
      return res.status(500).json({
        success: false,
        data: null,
        message: "Failed to update structure",
      });
    }

    res.status(200).json({
      success: true,
      data: { message, architecture },
      message: "Prompt generated successfully",
    });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

export default router;
