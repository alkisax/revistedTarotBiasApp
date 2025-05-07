// dao/query.dao.js

const Query = require('../models/query.models');

const createQuery = async ({ question, bias, response, userId }) => {
  const query = new Query({
    question,
    bias,
    response,
    user: userId
  });
  return await query.save();
};

const getAllQueriesByUser = async (userId) => {
  return await Query.find({}).sort({ createdAt: -1 });
};

const toggleImportant = async (queryId) => {
  const query = await Query.findById(queryId);
  if (!query) {
    throw new Error('Query not found');
  }
  query.important = !query.important;
  return await query.save();
};

const deleteQuery = async (queryId) => {
  return await Query.findByIdAndDelete(queryId);
};

module.exports = {
  createQuery,
  getAllQueriesByUser,
  toggleImportant,
  deleteQuery
};
