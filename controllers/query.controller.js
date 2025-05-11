// query.controller.js

const queryDAO = require('../daos/query.dao')
const userDAO = require('../daos/user.dao')

// Create a new query
exports.createQuery = async (req, res) => {
  const { question, bias, response } = req.body;
  // const userId = req.user._id; // να προσέξω στο front πως στέλνει το Id
  const userId = req.user.full._id;

  try {
    // Πρώτα το δημιουργώ στα queries
    const newQuery = await queryDAO.createQuery({
      question,
      bias,
      response,
      userId
    });

    // και μετά το προσθέτο στον user
    const updatedUser = await userDAO.addQueryToUser(userId, newQuery._id);
    console.log('User after adding query:', updatedUser);

    res.status(201).json({
      message: 'Query created successfully',
      query: newQuery
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all queries by user ID
exports.getAllQueriesByUser = async (req, res) => {
  const { userId } = req.params; // εδώ το στέλνει ως params? γιατι διαφορετικα

  try {
    const queries = await queryDAO.getAllQueriesByUser(userId);
    res.status(200).json(queries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Toggle the "important" status of a query
exports.toggleImportant = async (req, res) => {
  const { queryId } = req.params; // να έρθει το queryId στα params

  try {
    const updatedQuery = await queryDAO.toggleImportant(queryId);
    res.status(200).json({ message: 'Query updated successfully', updatedQuery });
  } catch (error) {
    console.error(error);
    if (error.message === 'Query not found') {
      res.status(404).json({ error: 'Query not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Delete a query by ID
exports.deleteQuery = async (req, res) => {
  const { queryId } = req.params; // να έρθει το queryId στα params

  try {
    await queryDAO.deleteQuery(queryId);
    res.status(200).json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.message === 'Query not found') {
      res.status(404).json({ error: 'Query not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
