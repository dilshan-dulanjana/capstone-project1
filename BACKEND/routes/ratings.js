// routes/ratings.js
const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingsModel');

// Get all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find().populate('userId');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
