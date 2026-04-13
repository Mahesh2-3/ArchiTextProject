// Creates a new project
export const createProject = async (title, description) => {
  try {
    const response = await fetch("http://localhost:5000/project", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await fetch("http://localhost:5000/project", {
      method: "GET",
      credentials: "include",
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
