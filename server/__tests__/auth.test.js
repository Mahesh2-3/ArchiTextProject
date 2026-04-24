import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { registerUser, loginUser } from "../Controllers/Auth.js";
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from "../middleware/validation.js";

const app = express();
app.use(express.json());

// Mock routes for testing with validation
app.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  async (req, res) => {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    if (result.success) {
      // Remove password from response
      const { password: _, ...userWithoutPassword } = result.data.toObject();
      return res.status(201).json({ ...result, data: userWithoutPassword });
    }
    res.status(400).json(result);
  },
);

app.post("/login", validateLogin, handleValidationErrors, async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  if (result.success) {
    res.cookie("token", result.data.token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ success: true, data: result.data.user, token: result.data.token });
  }
  res.status(401).json(result);
});

describe("Authentication", () => {
  beforeEach(async () => {
    // Clear users before each test
    await User.deleteMany({});
  });

  describe("POST /register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "TestPass123!",
      };

      const response = await request(app)
        .post("/register")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data).not.toHaveProperty("password"); // Password should not be returned
    });

    it("should fail registration with invalid email", async () => {
      const userData = {
        name: "Test User",
        email: "invalid-email",
        password: "TestPass123!",
      };

      const response = await request(app)
        .post("/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("should fail registration with weak password", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "weak",
      };

      const response = await request(app)
        .post("/register")
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /login", () => {
    beforeEach(async () => {
      // Create a test user
      await registerUser("Test User", "test@example.com", "TestPass123!");
    });

    it("should login successfully with correct credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "TestPass123!",
      };

      const response = await request(app)
        .post("/login")
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.email).toBe(loginData.email);
    });

    it("should fail login with incorrect password", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const response = await request(app)
        .post("/login")
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should fail login with non-existent email", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "TestPass123!",
      };

      const response = await request(app)
        .post("/login")
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
