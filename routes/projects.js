import express from "express";
import {
  createProject,
  getProjects,
  getProjectStructure,
} from "../Controllers/Project.js";

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
router.get("/structure/:id", async (req, res) => {
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

export default router;
