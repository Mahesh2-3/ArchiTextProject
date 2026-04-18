import { registerUser } from "../../Controllers/Auth.js";
import {
  validateRegister,
  handleValidationErrors,
} from "../../middleware/validation.js";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */

// Register route
const registerRoute = [
  ...validateRegister,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const { success, data, message } = await registerUser(
        name,
        email,
        password,
      );

      if (!success) {
        return res.status(400).json({ success: false, data: null, message });
      }

      res.status(201).json({
        success: true,
        data,
        message: "User registered successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal server error" });
    }
  },
];

export default registerRoute;
