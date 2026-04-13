import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = new Project({
      userId: req.user._id,
      title: title,
      description: description,
      metaData: {},
      metaDataVersion: "1.0.0",
    });
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/structure/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    console.log(project.metaData);
    res.status(200).json({ success: true, data: project.metaData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

export default router;
