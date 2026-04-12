export const getArchitecture = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/project/structure/${projectId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch architecture:", error);
  }
};
