const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingsModel');

// GET all ratings sorted by rank
router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find().sort({ rank: 1 });
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
