const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');
const TravelPlace = require('../models/TravelPlace');
// Get accommodations by category
router.get('/', async (req, res) => {
    try {
      const category = req.query.category;
      console.log('Category received:', category);
  
      if (category) {
        const accommodations = await Accommodation.find({ category: category });
        console.log('Accommodations found:', accommodations);
        res.json(accommodations);
      } else {
        res.status(400).json({ message: 'Category is required' });
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      res.status(500).json({ message: error.message });
    }
  });



// Get accommodation by ID
router.get('/:id', async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json(accommodation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




router.get('/api2/accommodations/:province', async (req, res) => {
  try {
    const { province } = req.params;
    console.log(`Fetching accommodations for province: ${province}`);
    const accommodations = await Accommodation.find({ province });
    console.log(`Found accommodations: ${accommodations}`);
    res.json(accommodations);
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    res.status(500).json({ message: 'Failed to fetch accommodations' });
  }
});

module.exports = router; // Ensure the router is exported correctly
