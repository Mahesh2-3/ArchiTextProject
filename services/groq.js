import Groq from "groq-sdk";
import structurePrompt from "../prompts/structure.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askGroq = async (convo, structure) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Updated from decommissioned llama3-70b-8192
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: structurePrompt },
      { role: "user", content: `Current Structure: ${JSON.stringify(structure)}` },
      ...convo.map(({ role, content }) => ({ role, content })),
    ],
  });

  return response.choices[0].message.content;
};
