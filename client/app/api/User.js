export const updateProfile = async (name) => {
  try {
    const response = await fetch("http://localhost:5000/user/profile", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await fetch("http://localhost:5000/user/password", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const sendOtp = async () => {
  try {
    const response = await fetch("http://localhost:5000/user/send-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPasswordWithOtp = async (otp, newPassword) => {
  try {
    const response = await fetch("http://localhost:5000/user/reset-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, newPassword }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
