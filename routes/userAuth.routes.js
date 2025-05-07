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
 *     summary: Login with username and password
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                         roles:
 *                           type: array
 *                           items:
 *                             type: string
 *                         id:
 *                           type: string
 *       400:
 *         description: Missing input or bad request
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

// Optional: If you later add register, refresh token, logout, etc.
// router.post('/register', authController.register);
// router.post('/refresh-token', authController.refreshToken);

module.exports = router;