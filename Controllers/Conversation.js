import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";

export const createConversation = async (projectId) => {
  try {
    const conversation = new Conversation({
      projectId,
      title: "New Conversation",
    });
    await conversation.save();
    return { success: true, data: conversation };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server error" };
  }
};

export const getConversationMessages = async (id) => {
  try {
    const messages = await Message.find({ conversationId: id })
      .sort({
        createdAt: 1,
      })
      .lean();
    return { success: true, data: messages };
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return { success: false, message: "Internal Server error" };
  }
};

export const getConversations = async (projectId) => {
  try {
    const conversations = await Conversation.find({ projectId }).sort({
      createdAt: -1,
    });
    return { success: true, data: conversations };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
export const updateConversationTitle = async (id, title) => {
  try {
    const updatedConvo = await Conversation.findByIdAndUpdate(
      id,
      { title },
      { new: true },
    );
    return { success: true, data: updatedConvo };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server error" };
  }
};
