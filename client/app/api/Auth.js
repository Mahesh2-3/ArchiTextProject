// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || "Login failed",
      };
    }

    return { success: true, data: result.data, token: result.token };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Send Registration OTP
export const sendRegisterOtp = async (email) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-register-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to send OTP",
      };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Register function
export const register = async (name, email, password, otp) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, otp }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || "Registration failed",
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });

    // Clear the document cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (!response.ok) {
      return { success: false, data: null, error: "Logout failed" };
    }

    return { success: true, data: null };
  } catch (error) {
    return { success: false, data: null, error: "Internal Server Error." };
  }
};
