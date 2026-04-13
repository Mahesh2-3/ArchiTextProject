// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, data: null, error: result.message || "Login failed" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Register function
export const register = async (name, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, data: null, error: result.message || "Registration failed" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      return { success: false, data: null, error: "Logout failed" };
    }

    return { success: true, data: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};
