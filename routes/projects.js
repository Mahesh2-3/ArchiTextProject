import express from "express";
import {
  createProject,
  getProjects,
  getProjectStructure,
  getHistory,
  deleteProject
} from "../Controllers/Project.js";
import { checkProjectOwnership } from "../middleware/checkOwnership.js";

const router = express.Router();

// Create a new project
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { success, data, message } = await createProject(
      req.user._id,
      title,
      description,
    );

    if (!success) {
      return res.status(500).json({ success: false, data: null, message });
    }

    res
      .status(201)
      .json({ success: true, data, message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

// Get all projects for the logged-in user
router.get("/", async (req, res) => {
  try {
    const { success, data, message } = await getProjects(req.user._id);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// Get architecture (metaData) for a project
router.get("/structure/:id", checkProjectOwnership, async (req, res) => {
  try {
    const { id } = req.params;
    const { success, data, message } = await getProjectStructure(id);

    if (!success) {
      return res.status(404).json({ success: false, data: null, message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: null, message: "Internal server error" });
  }
});

// Get all history (Projects and their Conversations)
router.get("/history", async (req, res) => {
  try {
    const { success, data, message } = await getHistory(req.user._id);

    if (!success) {
      return res.status(500).json({ success: false, data: [], message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: [], message: "Internal server error" });
  }
});

// Delete a project
router.delete("/:id", checkProjectOwnership, async (req, res) => {
  try {
    const { id } = req.params;
    const { success, message } = await deleteProject(id);

    if (!success) {
      return res.status(500).json({ success: false, message });
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
