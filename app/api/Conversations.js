export const sendMessage = async (conversation) => {
  const response = await fetch("http://localhost:5000/ai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: conversation }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from AI");
  }

  return await response.json();
};
