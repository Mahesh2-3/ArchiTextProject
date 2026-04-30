import logger from "../lib/logger.js";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Login
export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { success: true, data: { user, token } };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};

// Send Registration OTP
export const sendRegistrationOtp = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    // Generate a 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete existing OTPs for this email to prevent spam/confusion
    await Otp.deleteMany({ email });

    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "Verify your email for ArchiText",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Welcome to ArchiText!</h2>
          <p style="font-size: 16px; color: #555;">Hi there,</p>
          <p style="font-size: 16px; color: #555;">Thank you for signing up for ArchiText. To complete your registration, please verify your email address by entering the following One-Time Password (OTP):</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #4a90e2; padding: 10px 20px; border: 2px dashed #4a90e2; border-radius: 5px; letter-spacing: 5px;">${otp}</span>
          </div>
          <p style="font-size: 16px; color: #555;">This OTP is valid for <strong>10 minutes</strong>. If you did not request this verification, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          <p style="font-size: 14px; color: #888; text-align: center;">The ArchiText Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "OTP sent to your email" };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Failed to send OTP to email." };
  }
};

// Register
export const registerUser = async (name, email, password, otp) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return { success: false, message: "OTP not found or has expired" };
    }

    if (otpRecord.otp !== otp) {
      return { success: false, message: "Invalid OTP" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Delete OTP record after successful registration
    await Otp.deleteMany({ email });

    // Send professional welcome email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "Welcome to ArchiText - Registration Successful!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Registration Successful!</h2>
          <p style="font-size: 16px; color: #555;">Hi ${name},</p>
          <p style="font-size: 16px; color: #555;">Welcome to <strong>ArchiText</strong>! Your account has been successfully created.</p>
          <p style="font-size: 16px; color: #555;">With ArchiText, you can effortlessly design system architectures by simply describing them in natural language. Our AI-powered engine translates your ideas into interactive, intuitive diagrams.</p>
          <p style="font-size: 16px; color: #555;"><strong>Key Features:</strong></p>
          <ul style="font-size: 16px; color: #555; padding-left: 20px;">
            <li>Natural language to Architecture Diagram</li>
            <li>Interactive Drag-and-Drop Editor</li>
            <li>Real-time Modifications via AI</li>
            <li>Easy Exporting Options</li>
          </ul>
          <p style="font-size: 16px; color: #555; text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" style="background-color: #4a90e2; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Log in to get started</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          <p style="font-size: 14px; color: #888; text-align: center;">We're excited to see what you build!</p>
          <p style="font-size: 14px; color: #888; text-align: center;">The ArchiText Team</p>
        </div>
      `,
    };

    // Send welcome email asynchronously without blocking registration response
    transporter.sendMail(mailOptions).catch((err) => {
      logger.error(`Failed to send welcome email to ${email}: ${err.message}`);
    });

    return { success: true, data: newUser };
  } catch (error) {
    logger.error(error);
    return { success: false, message: "Internal server error" };
  }
};
