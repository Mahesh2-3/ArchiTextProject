export const getArchitecture = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/project/structure/${projectId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (!response.ok) {
      return { success: false, error: "Failed to fetch architecture" };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch architecture:", error);
    return { success: false, error: error.message };
  }
};
