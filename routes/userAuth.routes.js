const express = require('express');
const router = express.Router();
const authController = require('../controllers/userAuth.controller'); // Rename your controller file to match if needed

/**
 * @swagger
 * tags:
 *   name: User Authentication
 *   description: User login and authentication
 */

/**
 * @swagger
 * /api/userAuth/login:
 *   post:
 *     summary: User login
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Missing input
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

// Optional: If you later add register, refresh token, logout, etc.
// router.post('/register', authController.register);
// router.post('/refresh-token', authController.refreshToken);

module.exports = router;