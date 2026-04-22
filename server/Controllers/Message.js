import logger from "../lib/logger.js";
import Message from "../models/Message.js";
import Project from "../models/Project.js";

// Get all messages for a project
export const getProjectMessages = async (projectId) => {
  try {
    const messages = await Message.find({ projectId })
      .sort({ createdAt: 1 })
      .lean();
    return { success: true, data: messages };
  } catch (error) {
    logger.error(error);
    return { success: false, data: [], message: "Failed to fetch messages" };
  }
};

// Save a message to a project
export const saveMessage = async (projectId, role, content) => {
  try {
    const message = new Message({
      projectId,
      role,
      content,
    });
    await message.save();
    return { success: true, data: message };
  } catch (error) {
    logger.error(error);
    return { success: false, data: null, message: "Failed to save message" };
  }
};

// Get architecture structure linked to a project
export const getProjectStructure = async (projectId) => {
  try {
    const project = await Project.findById(projectId).select(
      "metaData layoutType",
    );
    if (!project) {
      return { success: false, data: null, message: "Project not found" };
    }

    return {
      success: true,
      data: {
        metaData: project?.metaData || null,
        layoutType: project?.layoutType || "tree",
      },
    };
  } catch (error) {
    logger.error(error);
    return { success: false, data: null, message: "Failed to fetch structure" };
  }
};

// Update architecture structure for a project
export const updateProjectStructure = async (projectId, structure) => {
  try {
    const project = await Project.findByIdAndUpdate(projectId, { metaData: structure });
    if (!project) {
      return { success: false, data: null, message: "Project not found" };
    }
    return { success: true, data: null };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      data: null,
      message: "Failed to update structure",
    };
  }
};
