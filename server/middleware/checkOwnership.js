import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";

export const checkProjectOwnership = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId || req.body.projectId;
    const userId = req.user._id;

    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this project" });
    }

    next();
  } catch (error) {
    console.error("Ownership check error:", error);
    res.status(500).json({ success: false, message: "Internal server error during ownership check" });
  }
};

export const checkConversationOwnership = async (req, res, next) => {
  try {
    const conversationId = req.params.id || req.params.conversationId;
    const userId = req.user._id;

    if (!conversationId) {
      return res.status(400).json({ success: false, message: "Conversation ID is required" });
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    const project = await Project.findById(conversation.projectId);

    if (!project || project.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this conversation" });
    }

    next();
  } catch (error) {
    console.error("Ownership check error:", error);
    res.status(500).json({ success: false, message: "Internal server error during ownership check" });
  }
};
