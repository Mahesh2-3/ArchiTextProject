import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      userId: req.user._id,
      title: name,
      description: description,
      metaData: {},
      metaDataVersion: "1.0.0",
    });
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

export default router;
