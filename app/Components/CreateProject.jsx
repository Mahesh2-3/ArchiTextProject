import React, { useState } from "react";
import { createProject } from "../api/Project";

const CreateProject = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProject(formData.title, formData.description);
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md bg-black/20 p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-(--color-main) rounded-lg shadow-2xl border-2 border-(--color-secondary) p-6 md:p-8 flex flex-col gap-6 transform transition-all animate-in zoom-in duration-300">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-last)">
            Create New Project
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-(--color-secondary)/20 text-(--color-last) transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--color-last) opacity-70 ml-1">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Modern E-commerce"
              required
              className="w-full p-3 rounded-md border-2 border-(--color-secondary) outline-none focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal) transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--color-last) opacity-70 ml-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the architecture goals..."
              rows={4}
              className="w-full p-3 rounded-md border-2 border-(--color-secondary) outline-none focus:border-(--color-normal) focus:ring-4 focus:ring-(--color-secondary)/30 dark:bg-black/20 text-(--text-normal) transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3 rounded-md border-2 border-(--color-secondary) text-(--color-last) font-bold hover:bg-(--color-secondary)/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-2 p-3 rounded-md bg-(--color-last) text-(--color-main) font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
