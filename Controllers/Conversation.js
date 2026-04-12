import Message from "../models/Message.js";

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
