const User = require('../models/user.models');

const populateUser = async (req, res, next) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(400).json({ error: 'User ID missing from token' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user.full = user; // attach full user document
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = populateUser;
