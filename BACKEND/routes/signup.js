const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, category } = req.body;
  
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user object
    const newUser = new User({ name, email, password: hashedPassword, category });

    // Save the new user to the database
    await newUser.save();

    // If successful, return a success message
    return res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error signing up:', error);

    // Return an internal server error message
    return res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
});

module.exports = router;
