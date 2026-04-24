import { getAuthHeaders } from "./utils";

// Send message to AI
export const sendMessage = async (projectId, userMsg) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ai-chat/${projectId}`,
      {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ userMsg }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        data: null,
        error: errorData.message || "Failed to fetch from AI",
      };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

// gets all messages for a project
export const getProjectMessages = async (projectId) => {
  try {
    if (!projectId) {
      return { success: false, data: [] };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/${projectId}`,
      {
        method: "GET",
        credentials: "include",
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        data: [],
        error: errorData.message || "Failed to fetch messages",
      };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};
