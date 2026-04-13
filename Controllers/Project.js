import Project from "../models/Project.js";

// Create a new project
export const createProject = async (userId, title, description) => {
  try {
    const newProject = new Project({
      userId,
      title,
      description,
      metaData: {},
      metaDataVersion: "1.0.0",
    });
    await newProject.save();
    return { success: true, data: newProject };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};

// Get all projects for a user
export const getProjects = async (userId) => {
  try {
    const projects = await Project.find({ userId });
    return { success: true, data: projects };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};

// Get architecture (metaData) for a project
export const getProjectStructure = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return { success: false, message: "Project not found" };
    }
    return { success: true, data: project.metaData };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};
