import "dotenv/config";
import express from "express";
import cors from "cors";
import aiResponse from "./routes/aiResponse.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Ai-routes
app.use("/ai-chat", aiResponse);

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "ArchiText API is running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(
    `\x1b[32m%s\x1b[0m`,
    `🚀 Server running at http://localhost:${PORT}`,
  );
  console.log(`\x1b[36m%s\x1b[0m`, `Press Ctrl+C to stop`);
});
