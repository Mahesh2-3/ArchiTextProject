export const sendMessage = async (id, userMsg, projectId) => {
  let conversationId = id;
  if (!conversationId) {
    const newConvo = await createConversation(projectId);
    conversationId = newConvo._id;
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
    throw new Error(errorData.message || "Failed to fetch from AI");
  }

  const result = await response.json();
  return { ...result, conversationId };
};

const createConversation = async (projectId) => {
  const response = await fetch("http://localhost:5000/conversation", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create conversation");
  }

  const result = await response.json();
  return result.data;
};

export const getConversations = async (projectId) => {
  const response = await fetch(
    `http://localhost:5000/conversation/${projectId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  const result = await response.json();
  return result.data;
};
