// query.routes.js

const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller')

/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Create a new query
 *     description: Creates a new query based on the provided question, bias, and response.
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - bias
 *               - response
 *             properties:
 *               question:
 *                 type: string
 *               bias:
 *                 type: string
 *               response:
 *                 type: string
 *     responses:
 *       201:
 *         description: Query created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 query:
 *                   $ref: '#/components/schemas/Query'
 *       500:
 *         description: Internal server error
 */
router.post('/', queryController.createQuery);

/**
 * @swagger
 * /queries/{userId}:
 *   get:
 *     summary: Get all queries by user ID
 *     description: Retrieves all queries for a specific user by their user ID.
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose queries to retrieve.
 *     responses:
 *       200:
 *         description: A list of queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Query'
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', queryController.getAllQueriesByUser);

/**
 * @swagger
 * /queries/{queryId}/important:
 *   patch:
 *     summary: Toggle the important status of a query
 *     description: Toggles the "important" flag of a specific query.
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: queryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the query to toggle the important status.
 *     responses:
 *       200:
 *         description: Query updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedQuery:
 *                   $ref: '#/components/schemas/Query'
 *       404:
 *         description: Query not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:queryId/important', queryController.toggleImportant);

/**
 * @swagger
 * /queries/{queryId}:
 *   delete:
 *     summary: Delete a query by ID
 *     description: Deletes a query by its ID.
 *     tags: [Queries]
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
router.delete('/:queryId', queryController.deleteQuery);

module.exports = router;
