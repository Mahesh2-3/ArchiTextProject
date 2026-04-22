import logger from "../lib/logger.js";
import express from "express";
import {
  getProjectMessages
} from "../Controllers/Message.js";
import { checkProjectOwnership } from "../middleware/checkOwnership.js";

const router = express.Router();

// Get all messages for a project
router.get(
  "/:projectId",
  checkProjectOwnership,
  async (req, res) => {
  try {
    const { projectId } = req.params;
    const { success, data, message } = await getProjectMessages(projectId);

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

export default router;
