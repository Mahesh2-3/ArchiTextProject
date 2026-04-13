// Send message to AI if the message is first message it creates a new conversation
export const sendMessage = async (id, userMsg, projectId) => {
  try {
    let conversationId = id;
    if (!conversationId) {
      const convoRes = await createConversation(projectId);
      if (!convoRes.success) {
        return { success: false, data: null, conversationId: null, error: convoRes.error };
      }
      conversationId = convoRes.data._id;
    }

    const response = await fetch(
      `http://localhost:5000/ai-chat/${conversationId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMsg }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, data: null, conversationId, error: errorData.message || "Failed to fetch from AI" };
    }

    const result = await response.json();
    return { success: true, data: result.data, conversationId };
  } catch (error) {
    return { success: false, data: null, conversationId: id, error: error.message };
  }
};

// creates a new Conversation for a project
const createConversation = async (projectId) => {
  try {
    const response = await fetch("http://localhost:5000/conversation", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
      return { success: false, data: null, error: "Failed to create conversation" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// gets all conversations for a project
export const getConversations = async (projectId) => {
  try {
    if (!projectId) {
      return { success: false, data: [] };
    }

    const response = await fetch(
      `http://localhost:5000/conversation/${projectId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      return { success: false, data: [], error: "Failed to fetch conversations" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// gets all messages for a conversation
export const getConversationMessages = async (conversationId) => {
  try {
    if (!conversationId) {
      return { success: false, data: [] };
    }
    const response = await fetch(
      `http://localhost:5000/conversation/${conversationId}/messages`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      return { success: false, data: [], error: "Failed to fetch messages" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};
