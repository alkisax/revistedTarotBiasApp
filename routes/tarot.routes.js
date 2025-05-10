// tarot.routes.js

const express = require('express');
const tarotController = require('../controllers/tarot.controller');
const { optionalVerifyToken } = require('../middlewares/verification.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/tarot/tarot-reading:
 *   post:
 *     summary: Get a Tarot reading and GPT interpretation.
 *     description: Returns 3 drawn tarot cards and a GPT-based interpretation based on user's question, language, and bias.
 *     tags:
 *       - Tarot
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userQuestion:
 *                 type: string
 *                 example: "What should I focus on in my career?"
 *               bias:
 *                 type: string
 *                 example: "optimistic"
 *               lang:
 *                 type: string
 *                 example: "en"
 *     responses:
 *       200:
 *         description: Success - Tarot reading and GPT interpretation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drawnCards:
 *                   type: object
 *                   properties:
 *                     drawnCards:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The Lovers", "Three of Cups", "The Tower"]
 *                 gptResponse:
 *                   type: string
 *                   example: "The cards suggest a powerful emotional connection..."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/tarot-reading', optionalVerifyToken, tarotController.getTarotReading);

module.exports = router;
