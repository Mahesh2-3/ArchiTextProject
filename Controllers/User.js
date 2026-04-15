import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// Update Profile Name
export const updateProfile = async (userId, newName) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: newName },
      { new: true }
    );
    if (!updatedUser) {
      return { success: false, message: "User not found" };
    }
    return { success: true, data: { name: updatedUser.name, email: updatedUser.email } };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};

// Change Password using Old Password
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Incorrect old password" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};

// Generate and Send OTP
export const sendOtp = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Generate a 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    user.resetOtp = otp;
    user.resetOtpExpiry = expiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or another service based on ENV variables
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: user.email,
      subject: "Password Reset OTP - ArchiText",
      text: `Your OTP to reset the password is: ${otp}\n\nIt is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "OTP sent to your email" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send OTP to email. Check server configuration." };
  }
};

// Reset Password with OTP
export const resetPasswordWithOtp = async (userId, otp, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.resetOtp !== otp) {
      return { success: false, message: "Invalid OTP" };
    }

    if (new Date() > user.resetOtpExpiry) {
      return { success: false, message: "OTP has expired" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Clear OTP and set new password
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
};
