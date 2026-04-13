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
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }
};

export const getProjects = async () => {
  try {
    const response = await fetch("http://localhost:5000/project", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error getting projects:", error);
    return { success: false, error: error.message };
  }
};
