// userController.js
const User = require('../models/userModel');

exports.getUserById = async (req, res) => {
  try {
    // Use userID for the query
    const user = await User.findOne({ userID: parseInt(req.params.id, 10) }).select('name email category');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user data. Please try again.' });
  }
};
