import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";

export const createConversation = async (projectId) => {
  try {
    const conversation = new Conversation({
      projectId,
    });
    await conversation.save();
    return { success: true, data: conversation };
  } catch (error) {
    return { success: false, message: "Internal Server error" };
  }
};

export const getConversationMessages = async (id) => {
  try {
    const messages = await Message.find({ conversationId: id }).sort({
      createdAt: 1,
    });
    return { success: true, data: messages };
  } catch (error) {
    return { success: false, message: "Internal Server error" };
  }
};

export const saveMessage = async (conversationId, role, content) => {
  try {
    const message = new Message({
      conversationId,
      role,
      content,
    });
    await message.save();
    return { success: true, data: message };
  } catch (error) {
    return { success: false, message: "Internal Server error" };
  }
};

export const getConversationStructure = async (id) => {
  try {
    const convo = await Conversation.findById(id);
    if (!convo) return { success: false, message: "Conversation not found" };

    const project = await Project.findById(convo.projectId).select("metaData");
    return { success: true, data: project?.metaData || null };
  } catch (error) {
    return { success: false, message: "Internal Server error" };
  }
};

export const updateConversationStructure = async (id, structure) => {
  try {
    const convo = await Conversation.findById(id);
    if (!convo) return { success: false, message: "Conversation not found" };

    await Project.findByIdAndUpdate(convo.projectId, { metaData: structure });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Internal Server error" };
  }
};
