const User = require('../models/user.models');
const Query = require('../models/query.models'); // βάζω και του query γιατι πρέπει να κανω Push το νεο query στον user

// Create a new user
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId).populate('query'); // populate queries if needed
};

// Find user by username
const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

// Update user by ID
const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Delete user by ID
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// Add a query to a user
const addQueryToUser = async (userId, queryId) => {
  console.log(`Adding query ${queryId} to user ${userId} (from addQueryToUser user.dao)`);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { query: queryId } }, // Push the query ID into the user's query array
    { new: true }
  );
  console.log('Updated user query array:', updatedUser.query);
  return updatedUser;
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  findUserByUsername,
  deleteUser,
  addQueryToUser
};
