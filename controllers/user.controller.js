const bcrypt = require('bcrypt')
const userDAO = require('../daos/user.dao');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    
    const SaltOrRounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, SaltOrRounds)
    const userToSave = {
      ...userData,
      hashedPassword,
    };

    const newUser = await userDAO.createUser(userToSave);
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userDAO.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    if (updateData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
      updateData.hashedPassword = hashedPassword;
      delete updateData.password; // Remove plain password
    }

    const updatedUser = await userDAO.updateUser(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await userDAO.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ error: error.message });
  }
};
