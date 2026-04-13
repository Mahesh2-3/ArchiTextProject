// Gets architecture for a project using projectId
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
      return { success: false, data: null, error: "Failed to fetch architecture" };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};
