import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import authMiddleware from "./middleware/auth.js";

import aiResponse from "./routes/aiResponse.js";
import loginRoute from "./routes/auth/login.js";
import logoutRoute from "./routes/auth/logout.js";
import registerRoute from "./routes/auth/Register.js";
import projectRoutes from "./routes/projects.js";
import conversationRoutes from "./routes/conversation.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Auth routes
app.post("/login", loginRoute);
app.post("/register", registerRoute);
app.post("/logout", logoutRoute);

// Ai-routes
app.use("/ai-chat", authMiddleware, aiResponse);

//Project routes
app.use("/project", authMiddleware, projectRoutes);

//conversation routes
app.use("/conversation", authMiddleware, conversationRoutes);

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
