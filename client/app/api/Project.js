import { getAuthHeaders } from "./utils";

// Creates a new project
export const createProject = async (title, description) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, data: null, error: errorData.message || "Failed to create project" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Gets all projects for the logged-in user
export const getProjects = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
      method: "GET",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      return { success: false, data: [], error: "Failed to fetch projects" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

export const getHistory = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/history`, {
      method: "GET",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      return { success: false, data: [], error: "Failed to fetch history" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`, {
      method: "DELETE",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
