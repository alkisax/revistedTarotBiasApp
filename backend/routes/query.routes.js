// query.routes.js

const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller')
const { verifyToken } = require('../middlewares/verification.middleware');
const populateUser = require('../middlewares/populateUser.middleware');

/**
 * @swagger
 * /api/query:
 *   post:
 *     summary: Submit a query
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [question, bias, response]
 *             properties:
 *               question:
 *                 type: string
 *               bias:
 *                 type: string
 *               response:
 *                 type: string
 *               important:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Query created
 *       500:
 *         description: Server error
 */
router.post('/', verifyToken, populateUser, queryController.createQuery); 

/**
 * @swagger
 * /api/query/{userId}:
 *   get:
 *     summary: Get queries by user ID
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of queries
 *       500:
 *         description: Server error
 */
router.get('/:userId', verifyToken, populateUser, queryController.getAllQueriesByUser);

/**
 * @swagger
 * /api/query/{queryId}/important:
 *   patch:
 *     summary: Toggle important status of a query
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: queryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Query updated
 *       404:
 *         description: Query not found
 *       500:
 *         description: Server error
 */
router.patch('/:queryId/important', verifyToken, populateUser, queryController.toggleImportant);

/**
 * @swagger
 * /api/query/{queryId}:
 *   delete:
 *     summary: Delete a query by ID
 *     description: Deletes a query by its ID.
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: queryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the query to delete.
 *     responses:
 *       200:
 *         description: Query deleted successfully
 *       404:
 *         description: Query not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:queryId', verifyToken, populateUser, queryController.deleteQuery);

module.exports = router;
