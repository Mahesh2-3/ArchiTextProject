import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  metaData: {
    type: Object,
    required: true,
  },
  metaDataVersion: {
    type: String,
    required: true,
  },
  layoutType: {
    type: String,
    enum: ["tree", "timeline", "radial", "flowchart"],
    default: "tree",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
