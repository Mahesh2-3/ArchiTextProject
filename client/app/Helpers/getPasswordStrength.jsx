// this function is used to check the strength of the password it returns the color of the text and message
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, message: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 1) return { color: "red", message: "Weak" };
  if (score <= 2) return { color: "#b9b963", message: "Medium" };
  if (score <= 3) return { color: "green", message: "Strong" };
  return { color: "green", message: "Very Strong" };
};
