import Project from "../models/Project.js";

export const checkProjectOwnership = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId || req.query.projectId || req.body.projectId;
    const userId = req.user._id;

    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this project" });
    }

    next();
  } catch (error) {
    console.error("Ownership check error:", error);
    res.status(500).json({ success: false, message: "Internal server error during ownership check" });
  }
};

