import { getAuthHeaders } from "./utils";

export const updateProfile = async (name) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "PUT",
      credentials: "include",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/password`, {
      method: "PUT",
      credentials: "include",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/send-otp`, {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPasswordWithOtp = async (otp, newPassword) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`, {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ otp, newPassword }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteAllUserData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/data`, {
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
