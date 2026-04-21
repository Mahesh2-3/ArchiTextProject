import logger from "../lib/logger.js";
import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { decideLayout, generateInitialStructure } from "../services/groq.js";

// Create a new project
export const createProject = async (userId, title, description) => {
  try {
    const layoutType = await decideLayout(title, description);
    const initialStructureStr = await generateInitialStructure(
      title,
      description,
      layoutType,
    );
    let metaData = {};

    try {
      const parsed = JSON.parse(initialStructureStr);
      metaData = parsed.architecture || {};
    } catch (e) {
      console.log("Failed to parse initial architecture:", e);
    }

    const newProject = new Project({
      userId,
      title,
      description,
      metaData,
      layoutType,
      metaDataVersion: "1.0.0",
    });
    await newProject.save();
    return { success: true, data: newProject };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// Get all projects for a user with pagination
export const getProjects = async (userId, skip = 0, limit = 10) => {
  try {
    const projects = await Project.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-metaData"); // Exclude large metaData from list view

    const total = await Project.countDocuments({ userId });

    return {
      success: true,
      data: {
        projects,
        total,
      },
    };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// Get architecture (metaData) for a project
export const getProjectStructure = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return { success: false, message: "Project not found" };
    }
    return { success: true, data: project.metaData };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// Get history (Projects with Conversations)
export const getHistory = async (userId) => {
  try {
    const projects = await Project.find({ userId }).lean();
    for (let project of projects) {
      const conversations = await Conversation.find({ projectId: project._id })
        .select("title _id")
        .sort({ createdAt: -1 })
        .lean();
      project.conversations = conversations;
    }
    return { success: true, data: projects };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// Delete Project and its cascade data
export const deleteProject = async (projectId) => {
  try {
    const conversations = await Conversation.find({ projectId });
    for (let convo of conversations) {
      await Message.deleteMany({ conversationId: convo._id });
    }
    await Conversation.deleteMany({ projectId });
    await Project.findByIdAndDelete(projectId);
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};
