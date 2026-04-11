import Groq from "groq-sdk";
import structurePrompt from "../prompts/structure.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askGroq = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    max_tokens: 4000,
    response_format: { type: "json_object" }, // 🔥
    messages: [
      { role: "system", content: structurePrompt },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
};
