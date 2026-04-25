import { getAuthHeaders } from "./utils";

// Gets architecture for a project using projectId
export const getArchitecture = async (projectId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/structure/${projectId}`,
      {
        method: "GET",
        credentials: "include",
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        data: null,
        error: errorData.message || "Failed to load project design",
      };
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};
