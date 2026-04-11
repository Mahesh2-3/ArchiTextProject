import express from "express";
import { askGroq } from "../services/groq.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await askGroq(prompt);
    const parsedData = JSON.parse(response);

    res
      .status(200)
      .json({ message: "Prompted generated successfully!", data: parsedData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", data: error.message });
  }
});

export default router;
