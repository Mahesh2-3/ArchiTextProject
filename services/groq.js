import Groq from "groq-sdk";
import treePrompt from "../prompts/tree.js";
import timelinePrompt from "../prompts/timeline.js";
import radialPrompt from "../prompts/radial.js";
import flowchartPrompt from "../prompts/flowchart.js";
import deciderPrompt from "../prompts/decider.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getPromptForLayout = (layoutType) => {
  switch (layoutType) {
    case "timeline":
      return timelinePrompt;
    case "radial":
      return radialPrompt;
    case "flowchart":
      return flowchartPrompt;
    case "tree":
    default:
      return treePrompt;
  }
};

export const decideLayout = async (title, description) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: deciderPrompt },
      { role: "user", content: `Title: ${title}\nDescription: ${description}` },
    ],
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed.layoutType || "tree";
};

export const generateInitialStructure = async (title, description, layoutType) => {
  const prompt = getPromptForLayout(layoutType);
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: `Current Structure: null. Generate the initial architecture based on Title: ${title} and Description: ${description}.` },
    ],
  });

  return response.choices[0].message.content;
};

export const askGroq = async (convo, structure, layoutType = "tree") => {
  const prompt = getPromptForLayout(layoutType);
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Updated from decommissioned llama3-70b-8192
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: prompt },
      {
        role: "user",
        content: `Current Structure: ${JSON.stringify(structure)}`,
      },
      ...convo.map(({ role, content }) => ({ role, content })),
    ],
  });

  return response.choices[0].message.content;
};
