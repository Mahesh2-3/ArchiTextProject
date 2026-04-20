import React, { useState } from "react";
import { createProject } from "../api/Project";
import { toast } from "react-toastify";
import { toastOptions } from "../Helpers/toast";
import { Loading } from "../Helpers/icons";

const CreateProject = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await createProject(
        formData.title.trim(),
        formData.description.trim(),
      );

      if (res.error) {
        toast.error(res.error || "Error creating project.", toastOptions());
        return;
      }

      if (res.success) {
        toast.success("Project created successfully!", toastOptions());

        if (onSuccess) onSuccess(res.data);
        else if (onClose) onClose();
      }
    } catch (error) {
      toast.error("Internal Server Error", toastOptions());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md bg-black/20 p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-(--color-main) rounded-lg shadow-2xl border-2 border-(--color-secondary) p-6 md:p-8 flex flex-col gap-6 transform transition-all animate-in zoom-in duration-300">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-(--text-main)">
            Create New Project
          </h1>
          {onClose && !isLoading && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-(--color-secondary)/20 text-(--text-main) transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--text-main) opacity-70 ml-1">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Modern E-commerce"
              required
              disabled={isLoading}
              className={`w-full p-3 rounded-md border-2 outline-none focus:ring-4 dark:bg-black/20 text-(--text-normal) transition-all ${
                errors.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-(--color-secondary) focus:border-(--color-normal) focus:ring-(--color-secondary)/30"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.title && (
              <span className="text-sm text-red-500 ml-1">{errors.title}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--text-main) opacity-70 ml-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your thoughts in detail..."
              rows={4}
              disabled={isLoading}
              className={`w-full p-3 rounded-md border-2 outline-none focus:ring-4 dark:bg-black/20 text-(--text-normal) transition-all resize-none ${
                errors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-(--color-secondary) focus:border-(--color-normal) focus:ring-(--color-secondary)/30"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.description && (
              <span className="text-sm text-red-500 ml-1">
                {errors.description}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className={`flex-1 p-3 rounded-md border-2 border-(--color-secondary) text-(--text-main) font-bold transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-(--color-secondary)/10 cursor-pointer"}`}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-2 p-3 rounded-md bg-(--color-last) text-(--text-main) font-bold shadow-lg transition-all flex justify-center items-center gap-2 ${isLoading ? "opacity-70 cursor-wait" : "hover:opacity-90 active:scale-95 cursor-pointer"}`}
            >
              {isLoading ? (
                <>
                  <Loading
                    stroke="4"
                    className="animate-spin text-(--text-main)"
                  />
                  Processing...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
