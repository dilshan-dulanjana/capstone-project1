const express = require('express');
const router = express.Router();
const TravelPlace = require('../models/TravelPlace');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// Route to search travel places
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const travelPlaces = await TravelPlace.find({ locationName: { $regex: query, $options: 'i' } });
    res.json(travelPlaces);
  } catch (error) {
    console.error('Error searching travel places:', error);
    res.status(400).json({ message: 'Error searching travel places', error: error.message });
  }
});

router.get('/api/travel-places', async (req, res) => {
  try {
    const category = req.query.category;
    const travelPlaces = await TravelPlace.find({ category });
    res.json(travelPlaces);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});










// Route to add a new trip
router.post('/add-trip', auth, async (req, res) => {
  try {
    const {  beforeYouGo, packingEssentials, duringYourVisit, afterYourVisit, travelPlaceId } = req.body;

    if (!search || !beforeYouGo || !packingEssentials || !duringYourVisit || !afterYourVisit || !travelPlaceId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const travelPlace = await TravelPlace.findById(travelPlaceId);
    if (!travelPlace) {
      return res.status(404).json({ message: 'Travel place not found' });
    }

    const newTrip = new Trip({
    
      beforeYouGo,
      packingEssentials,
      duringYourVisit,
      afterYourVisit,
      travelPlace: travelPlaceId
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip added successfully', newTrip });
  } catch (error) {
    console.error('Error adding trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
