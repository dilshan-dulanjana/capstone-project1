const express = require('express');
const router = express.Router();
const TravelPlace = require('../models/TravelPlace');



// Route to search accommodations by name
router.get('/search', async (req, res) => {
    try {
      const { locationName } = req.query;
      const travelPlaces = await TravelPlace.find({ locationName: { $regex: new RegExp(locationName, 'i') } });
      res.status(200).json(travelPlaces);
    } catch (error) {
      console.error('Error searching TravelPlace:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });



// Route to get a travel place by its name
router.get('/search', async (req, res) => {
  const { locationName } = req.query;

  if (!locationName) {
      return res.status(400).json({ error: 'Location name is required' });
  }

  try {
      const travelPlace = await TravelPlace.findOne({ locationName });

      if (!travelPlace) {
          return res.status(404).json({ error: 'Travel place not found' });
      }

      res.json(travelPlace);
  } catch (error) {
      console.error('Error fetching travel place:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all travel places
router.get('/api/travelplaceroutes1', async (req, res) => {
  try {
    console.log('Fetching travel places...');
    const travelPlaces = await TravelPlace.find();
    console.log('Fetched travel places:', travelPlaces);
    res.json(travelPlaces);
  } catch (error) {
    console.error('Error fetching travel places:', error);
    res.status(500).json({ message: 'Error fetching travel places', error });
  }
});

module.exports = router;
