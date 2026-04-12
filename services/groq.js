import Groq from "groq-sdk";
import structurePrompt from "../prompts/structure.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askGroq = async (convo, structure) => {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192", // Using a valid high-performance model
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: structurePrompt },
      { role: "user", content: `Current Structure: ${JSON.stringify(structure)}` },
      ...convo,
    ],
  });

  return response.choices[0].message.content;
};
