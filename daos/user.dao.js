const User = require('../models/user.models');

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

module.exports = {
  createUser,
  getUserById,
  updateUser,
  findUserByUsername,
  deleteUser
};
