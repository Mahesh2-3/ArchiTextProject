import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";

// Create a new conversation
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
    return {
      success: false,
      data: null,
      message: "Failed to create conversation",
    };
  }
};

// Get all messages for a conversation
export const getConversationMessages = async (id) => {
  try {
    const messages = await Message.find({ conversationId: id })
      .sort({ createdAt: 1 })
      .lean();
    return { success: true, data: messages };
  } catch (error) {
    console.log(error);
    return { success: false, data: [], message: "Failed to fetch messages" };
  }
};

// Save a message to a conversation
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
    return { success: false, data: null, message: "Failed to save message" };
  }
};

// Get architecture structure linked to a conversation's project
export const getConversationStructure = async (id) => {
  try {
    const convo = await Conversation.findById(id);
    if (!convo) {
      return { success: false, data: null, message: "Conversation not found" };
    }

    const project = await Project.findById(convo.projectId).select(
      "metaData layoutType",
    );
    return {
      success: true,
      data: {
        metaData: project?.metaData || null,
        layoutType: project?.layoutType || "tree",
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, data: null, message: "Failed to fetch structure" };
  }
};

// Update architecture structure for a conversation's project
export const updateConversationStructure = async (id, structure) => {
  try {
    const convo = await Conversation.findById(id);
    if (!convo) {
      return { success: false, data: null, message: "Conversation not found" };
    }

    await Project.findByIdAndUpdate(convo.projectId, { metaData: structure });
    return { success: true, data: null };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      message: "Failed to update structure",
    };
  }
};

// Get all conversations for a project
export const getConversations = async (projectId) => {
  try {
    const conversations = await Conversation.find({ projectId }).sort({
      createdAt: -1,
    });
    return { success: true, data: conversations };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: "Failed to fetch conversations",
    };
  }
};

// Update conversation title
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
    return { success: false, data: null, message: "Failed to update title" };
  }
};

// get the title of the conversation and the Project name
export const getConversationAndProjectTitle = async (id) => {
  try {
    const convo = await Conversation.findById(id);
    if (!convo) {
      return { success: false, data: null, message: "Conversation not found" };
    }

    const project = await Project.findById(convo.projectId).select("title");
    return {
      success: true,
      data: { conversationTitle: convo.title, projectTitle: project.title },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch titles",
    };
  }
};

// Delete a conversation and its messages
export const deleteConversation = async (id) => {
  try {
    await Message.deleteMany({ conversationId: id });
    await Conversation.findByIdAndDelete(id);
    return { success: true, data: null, message: "Conversation deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      message: "Failed to delete conversation",
    };
  }
};
